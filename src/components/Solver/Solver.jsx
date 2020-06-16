import React from "react"
import Schedule from "./Schedule"
import later from 'later'
import schedule from 'schedulejs'
import * as moment from "moment"

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
		this.state = {knowledge, data, schedule: []}
	}

	componentDidMount() {
		// const schedule = require('schedulejs/schedule.js')
		// this.worker = new WebWorkerSetup(worker)
		// this.worker.addEventListener("message", event => {
		// 	console.log(event)
		// })
		// const {knowledge, data} = this.state
		// this.worker.postMessage({knowledge, data, NUM_WEEKS_IN_SEMESTER})
		const duration = 90
		const groups = this.state.knowledge.groups

		const generateTeacherForGroupsDiscipline = function* (teachers) {
			console.log('generateTeacherForGroupsDiscipline', teachers)
			let teacherNumber = 0
			while (true) {
				yield teachers[teacherNumber]
				teacherNumber = (teacherNumber + 1) % teachers.length
			}
		}
		let tasks = []
		let disciplineTeachers = {} // содержит функции выдающие следующего пеподавателя по всем типам
		let teachersDiscipline = {} // содержит все дисциплиныы преподавателей
		for (const teacher of this.state.knowledge.teachers) {
			teachersDiscipline[teacher.id] = []
		}
		groups.forEach(group => {
			console.log('group', group)
			const {disciplines, times} = group
			const groupTasks = []
			for (let i = 0; i < disciplines.length; i++) {
				// Количество пар в две недели
				let s = moment(this.state.data.semester.start)
				let e = moment(this.state.data.semester.end)
				let NUM_WEEKS_IN_SEMESTER = moment.duration(e.diff(s)).asWeeks()
				let numberOfLessons = Math.floor(times[i] / 4)
				numberOfLessons = Math.floor(numberOfLessons / NUM_WEEKS_IN_SEMESTER) * 2
				numberOfLessons = numberOfLessons === 0 ? 1 : numberOfLessons
				console.log('NUM_WEEKS_IN_SEMESTER', numberOfLessons)
				const disciplineType = this.state.knowledge.disciplines.find(el => el.id === disciplines[i]).type
				const disciplineTypeClassrooms = this.state.knowledge.classrooms.filter(el => el.type === disciplineType).map(el => el.id)
				// Выбираем преподавателя
				const disciplineTypeTeachers = this.state.knowledge.teachers.filter(el => el.disciplines.includes(disciplines[i])).map(el => el.id)
				console.log('disciplineTypeTeachers', disciplineTypeTeachers)
				console.log('disciplineTeachers[disciplineType], disciplineTeachers[disciplineType]')
				if (!disciplineTeachers[disciplines[i]]) {
					disciplineTeachers[disciplines[i]] = generateTeacherForGroupsDiscipline(disciplineTypeTeachers)
				}
				let disciplineTeacher = disciplineTeachers[disciplines[i]].next().value
				for (let j = 0; j < numberOfLessons; j++) {
					let dependency = []
					let groupDependency = groupTasks.slice(-1)[0]
					dependency = groupDependency ? [...dependency, groupDependency.id] : dependency
					let teacherDependency = teachersDiscipline[disciplineTeacher].slice(-1)[0]
					dependency = teacherDependency ? [...dependency, teacherDependency.id] : dependency
					let newTask = {
						id: `${j}:${group.name}:${disciplines[i]}:${disciplineTeacher}`,
						duration: duration,
						minLength: duration,
						resources: [disciplineTypeClassrooms, group.id, disciplineTeacher, disciplines[i]],
						dependsOn: dependency,
					}
					teachersDiscipline[disciplineTeacher].push(newTask)
					console.log('teachersDiscipline', teachersDiscipline)
					console.log('newTask', newTask)
					groupTasks.push(newTask)
				}
			}
			tasks = [...tasks, ...groupTasks]
		})
		console.log('disciplineTeachers', disciplineTeachers)
		// Задачи только во вемя пар
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

		const disciplineResources = this.state.knowledge.disciplines.map(el => ({
			...el,
			isNotReservable: true,
		}))
		const classroomResources = this.state.knowledge.classrooms.map(el => ({
			...el,
			available: availableTimeOfLessons,
		}))
		const groupResources = this.state.knowledge.groups.map(el => ({
			...el,
		}))
		const teacherResources = this.state.knowledge.teachers.map(teacher => {
			const localeData = moment.localeData()
			const availableDayOfWeeks = this.state.data.days.find(el => el.id === teacher.id).days.map(el => localeData.weekdaysParse(el)).map(el => el + 1)
			return {
				...teacher,
				available: later.parse.recur().on(...availableDayOfWeeks).dayOfWeek(),
				isNotReservable: false,
			}
		})
		const resources = [...classroomResources, ...groupResources, ...teacherResources, disciplineResources]

		schedule.date.localTime()
		const startDay = moment(this.state.data.semester.start).toDate()
		console.log('tasks', tasks)
		console.log('start')
		let sch = schedule.create(tasks, resources, undefined, startDay)
		console.log(sch)
		this.setState({schedule: sch})

	}

	render() {
		return (
			<div className="uk-width-expand">
				<div className="uk-flex uk-flex-center uk-flex-column tabContent">
					<Schedule knowledge={this.state.knowledge}
							  data={this.state.data}
							  schedule={this.state.schedule}/>
				</div>
			</div>
		)
	}
}