import React from "react"
import Schedule from "./Schedule"
import later from 'later'
import schedule from 'schedulejs'
import * as moment from "moment"
import {v4 as uuid} from 'uuid'

export default class Solver extends React.Component {
	constructor(props) {
		super(props)
		let knowledge = JSON.parse(localStorage.getItem('knowledge'))
		if (knowledge == null) {
			knowledge = {}
		}
		let data = JSON.parse(localStorage.getItem('data'))
		if (data == null) {
			data = {}
		}
		this.state = {knowledge, data}
	}

	componentDidMount() {
		// const schedule = require('schedulejs/schedule.js')
		// this.worker = new WebWorkerSetup(worker)
		// this.worker.addEventListener("message", event => {
		// 	console.log(event)
		// })
		// const {knowledge, data} = this.state
		// let s = moment(this.state.data.semester.start)
		// let e = moment(this.state.data.semester.end)
		// let NUM_WEEKS_IN_SEMESTER = moment.duration(e.diff(s)).asWeeks()
		// this.worker.postMessage({knowledge, data, NUM_WEEKS_IN_SEMESTER})

	}

	render() {
		const duration = 90
		const {groups} = this.state.knowledge
		const tasks = []
		groups.forEach(group => {
			const {disciplines, times} = group
			for (let i = 0; i < disciplines.length; i++) {
				// Добавляет столько пар сколько часов указано пополам
				// const numberOfLessons = Math.floor(times / 2)
				const numberOfLessons = 4
				const disciplineType = this.state.knowledge.disciplines.find(el => el.id === disciplines[i]).type
				const disciplineTypeClassrooms = this.state.knowledge.classrooms.filter(el => el.type === disciplineType).map(el => el.id)
				const disciplineTypeTeachers = this.state.knowledge.teachers.filter(el => el.disciplines.includes(disciplines[i])).map(el => el.id)
				for (let j = 0; j < numberOfLessons; j++) {
					let newTask = {
						id: uuid(),
						duration: duration,
						minLength: duration,
						resources: [disciplineTypeClassrooms, group.id, disciplineTypeTeachers],
					}
					tasks.push(newTask)
				}
			}
		})

		const availableTimeOfLessons = {schedules: []}
		for (const time of this.state.knowledge.times) {
			const format = 'HH:mm'
			const start = moment(time.startTime, format).diff(moment().startOf('day'), 'seconds')
			const end = moment(time.endTime, format).diff(moment().startOf('day'), 'seconds')
			availableTimeOfLessons.schedules.push({
				t_a: [start],
				t_b: [end],
			})
		}

		const classroomResources = this.state.knowledge.classrooms.map(el => ({
			...el,
			available: availableTimeOfLessons,
		}))
		const groupResources = this.state.knowledge.groups.map(el => ({
			...el,
			available: availableTimeOfLessons,
		}))
		const teacherResources = this.state.knowledge.teachers.map(teacher => {
			const localeData = moment.localeData()
			const availableDayOfWeeks = this.state.data.days.find(el => el.id === teacher.id).days.map(el => localeData.weekdaysParse(el)).map(el => el + 1)
			return {
				...teacher,
				available: later.parse.recur().on(...availableDayOfWeeks).dayOfWeek(),
			}
		})
		const resources = [...classroomResources, ...groupResources, ...teacherResources]

		schedule.date.localTime()
		const startDay = moment(this.state.data.semester.start).toDate()
		const semesterAvailableDays = later.parse.recur().on(2, 3, 4, 5, 6, 7).dayOfWeek()
		let sch = schedule.create(tasks, resources, semesterAvailableDays, startDay)
		console.log(sch)

		return (
			<div className="uk-width-expand">
				<div className="uk-flex uk-flex-center uk-flex-column tabContent">
					<Schedule knowledge={this.state.knowledge}
							  data={this.state.data}
							  schedule={sch}/>
				</div>
			</div>
		)
	}
}