import React from 'react'
import Timeline, {DateHeader, SidebarHeader, TimelineHeaders} from 'react-calendar-timeline'
// make sure you include the timeline stylesheet or the timeline will not be styled
import 'react-calendar-timeline/lib/Timeline.css'
import moment from "moment"
import {v4 as uuid} from 'uuid'

export default class Schedule extends React.Component {
	resourcesToNames = (resources) => {
		const [classroomId, groupId, teacherId, disciplineId] = resources
		const classroom = this.props.knowledge.classrooms.find(el => el.id === classroomId)
		const group = this.props.knowledge.groups.find(el => el.id === groupId)
		const teacher = this.props.knowledge.teachers.find(el => el.id === teacherId)
		const discipline = this.props.knowledge.disciplines.find(el => el.id === disciplineId)
		return {classroom, group, teacher, discipline}
	}
	itemRenderer = ({item, timelineContext, itemContext, getItemProps}) => {
		itemContext.dimensions.height = 50
		return (
			<div
				{...getItemProps({
					style: {
						height: 40,
						lineHeight: 20,
					},
					className: 'schedule-item',
					onMouseDown: () => {
						console.log("on item click", item)
					},
				})}
			>
				<div
					style={{
						overflow: "hidden",
						paddingLeft: 3,
						textOverflow: "ellipsis",
						whiteSpace: "nowrap",
						lineHeight: 'normal',
					}}
				>
					{itemContext.title.discipline.name}<br/>
					{itemContext.title.teacher.name}<br/>
					{itemContext.title.classroom.name}<br/>
				</div>
			</div>
		)
	}

	render() {
		const keys = {
			groupIdKey: 'id',
			groupTitleKey: 'name',
			itemIdKey: 'id',
			itemTitleKey: 'title',    // key for item div content
			itemDivTitleKey: 'title', // key for item div title (<div title="text"/>)
			itemGroupKey: 'group',
			itemTimeStartKey: 'start_time',
			itemTimeEndKey: 'end_time',
		}
		const groups = this.props.knowledge.groups.map(el => ({
			...el,
			height: 60,
		}))
		const items = Object.values(this.props.schedule.scheduledTasks || {}).map((el, ind) => {
			console.log('el', el)
			let schedule = el.schedule[0]
			let obj = {
				id: uuid(),
				group: this.props.knowledge.groups.find(group => group.id === schedule.resources[1]).id,
				start_time: new Date(schedule.start),
				end_time: new Date(schedule.end),
				title: this.resourcesToNames(schedule.resources),
			}
			return obj
		})

		return (
			<div>
				<Timeline keys={keys}
						  groups={groups}
						  items={items}
						  canMove={false}
						  canResize={false}
						  itemRenderer={this.itemRenderer}
						  defaultTimeStart={moment(this.props.data.semester.start)}
						  defaultTimeEnd={moment(this.props.data.semester.end)}>
					<TimelineHeaders className="sticky">
						<SidebarHeader>
							{({getRootProps}) => {
								return <div {...getRootProps()}>Группа</div>
							}}
						</SidebarHeader>
						<DateHeader unit="primaryHeader"/>
						<DateHeader/>
					</TimelineHeaders>
				</Timeline>
			</div>
		)
	}
}