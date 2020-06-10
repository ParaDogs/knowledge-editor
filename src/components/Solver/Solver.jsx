import React from "react"
import $ from 'jquery'
import skedTape from 'jquery-sked-tape'
import 'jquery-sked-tape/dist/jquery.skedTape.css'
import {get_correct_schedules} from './shedule'
import moment from "moment"

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
		let s = moment(this.state.data.semester.start)
		let e = moment(this.state.data.semester.end)
		let durationInWeeks = moment.duration(e.diff(s)).asWeeks()
		setTimeout(() => {
			console.log(get_correct_schedules(durationInWeeks))
		}, 0)
	}

	componentDidMount() {
		const locations = this.state.knowledge.classrooms.map(el => ({...el, id: el.name, _id: el.id}))
		const events = [
			{
				name: 'Meeting',
				location: '1',
				start: today(0, 0),
				end: today(1, 30),
			},
			{
				name: 'Meeting',
				location: '5',
				start: today(0, 0),
				end: today(1, 30),
			},
			{
				name: 'Meeting',
				location: '1',
				start: today(10, 0),
				end: today(11, 30),
			},
			{
				name: 'Meeting with custom class',
				location: '2',
				start: yesterday(22, 0),
				end: today(1, 30),
				class: 'custom-class',
			},
			{
				name: 'Meeting just after the previous one',
				location: '2',
				start: today(1, 45),
				end: today(2, 45),
				class: 'custom-class',
			},
			{
				name: 'And another one...',
				location: '2',
				start: today(3, 10),
				end: today(5, 30),
				class: 'custom-class',
			},
			{
				name: 'Disabled meeting',
				location: '3',
				start: yesterday(22, 15),
				end: yesterday(23, 30),
				disabled: true,
			},
			{
				name: 'Meeting',
				location: '3',
				start: yesterday(23, 45),
				end: today(1, 30),
			},
			{
				name: 'Meeting that started early',
				location: '6',
				start: yesterday(21, 45),
				end: today(0, 45),
				userData: 'ASDASDASD',
			},
			{
				name: 'Late meeting',
				location: '5',
				start: today(11, 15),
				end: today(13, 45),
			},
		]

		function today(hours, minutes) {
			var date = new Date()
			date.setHours(hours, minutes, 0, 0)
			return date
		}

		function yesterday(hours, minutes) {
			var date = today(hours, minutes)
			date.setTime(date.getTime() - 24 * 60 * 60 * 1000)
			return date
		}

		function tomorrow(hours, minutes) {
			var date = today(hours, minutes)
			date.setTime(date.getTime() + 24 * 60 * 60 * 1000)
			return date
		}

		var $sked1 = $('#sked1').skedTape({
			caption: 'Аудитории',
			start: new Date(this.state.data.semester.start),
			end: new Date(this.state.data.semester.end),
			showEventTime: true,
			scrollWithYWheel: true,
			locations: locations.slice(),
			events: events.slice(),
			maxTimeGapHi: 60 * 1000, // 1 minute
			minGapTimeBetween: 60 * 1000,
			snapToMins: 1,
			timeIndicatorSerifs: true,
			showIntermission: true,
			formatters: {
				date: function (date) {
					return $.fn.skedTape.format.date(date, 'l', '.')
				},
			},
		})
	}

	render() {
		return (
			<div className="uk-width-expand">
				<div className="uk-flex uk-flex-center uk-flex-column tabContent">
					<div id="sked1"/>
				</div>
			</div>
		)
	}
}