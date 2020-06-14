import React from 'react'
import Timeline, {DateHeader, SidebarHeader, TimelineHeaders} from 'react-calendar-timeline'
// make sure you include the timeline stylesheet or the timeline will not be styled
import 'react-calendar-timeline/lib/Timeline.css'
import moment from "moment"
import {v4 as uuid} from 'uuid'

export default class Schedule extends React.Component {
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
		const groups = this.props.knowledge.classrooms
		const items = Object.values(this.props.schedule.scheduledTasks).map((el, ind) => {
			let schedule = el.schedule[0]
			let obj = {
				id: uuid(),
				group: this.props.knowledge.classrooms.find(classroom => classroom.id === schedule.resources[0]).id,
				start_time: new Date(schedule.start),
				end_time: new Date(schedule.end),
				title: schedule.start,
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
						  defaultTimeStart={moment(this.props.data.semester.start)}
						  defaultTimeEnd={moment(this.props.data.semester.end)}>
					<TimelineHeaders className="sticky">
						<SidebarHeader>
							{({getRootProps}) => {
								return <div {...getRootProps()}>Аудитории</div>
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