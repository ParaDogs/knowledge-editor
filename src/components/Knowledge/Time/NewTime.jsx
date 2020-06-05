import React from "react"
import TimeInput from 'react-time-input'
import moment from "moment"
import {v4 as uuid} from "uuid"
import MuiAlert from "@material-ui/lab/Alert"
import Snackbar from "@material-ui/core/Snackbar"

export default class NewTime extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			startTime: '',
			endTime: '',
			durationInMinutes: 90,
			showError: false,
		}
		this.startTime = React.createRef()
		this.endTime = React.createRef()
		this.handleStartChange = this.handleStartChange.bind(this)
		this.handleEndChange = this.handleEndChange.bind(this)
		this.updateStartTime = this.updateStartTime.bind(this)
		this.updateEndTime = this.updateEndTime.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
		this.handleCloseError = this.handleCloseError.bind(this)
	}

	updateStartTime(newTime) {
		this.startTime.current.setState({time: newTime})
		this.setState({startTime: newTime})
	}

	updateEndTime(newTime) {
		this.endTime.current.setState({time: newTime})
		this.setState({endTime: newTime})
	}

	handleStartChange(value) {
		this.setState({startTime: value})
		const newEnd = moment(value, 'HH:mm').add(this.state.durationInMinutes, 'minutes')
		this.updateEndTime(newEnd.format('HH:mm'))
	}

	handleEndChange(value) {
		this.setState({endTime: value})
		const newStart = moment(value, 'HH:mm').subtract(this.state.durationInMinutes, 'minutes')
		this.updateStartTime(newStart.format('HH:mm'))
	}

	handleSubmit(event) {
		event.preventDefault()
		if (this.state.startTime !== '' && this.state.endTime !== '') {
			let knowledge = this.props.getKnowledge()
			if (knowledge['times'] == null) {
				knowledge['times'] = []
			}

			// Check that times don't intersect
			const format = 'HH:mm'
			for (const time of knowledge['times']) {
				const compare = [moment(time.startTime, format), moment(time.endTime, format), undefined, '[]']
				if (moment(this.state.startTime, format).isBetween(...compare) || moment(this.state.endTime, format).isBetween(...compare)) {
					this.setState({showError: true})
					this.updateStartTime('')
					this.updateEndTime('')
					return
				}
			}

			// Don't make duplicates
			if (!knowledge['times'].some(el => el.startTime === this.state.startTime)) {
				knowledge['times'].push({startTime: this.state.startTime, endTime: this.state.endTime, id: uuid()})
				this.props.setKnowledge(knowledge)
			}

			this.updateStartTime('')
			this.updateEndTime('')
		}
	}

	handleCloseError(event, reason) {
		if (reason === 'clickaway') {
			return
		}
		this.setState({showError: false})
	}

	render() {
		return (
			<div className="uk-flex uk-flex-center time-row">
				<TimeInput
					className="uk-input time-input"
					onTimeChange={this.handleStartChange}
					ref={this.startTime}
					placeholder="ЧЧ:ММ"
				/>
				<span className="time-separator">-</span>
				<TimeInput
					className="uk-input time-input"
					onTimeChange={this.handleEndChange}
					ref={this.endTime}
					placeholder="ЧЧ:ММ"
				/>
				<button
					className="uk-button uk-button-primary uk-margin-left uk-width-1-4"
					onClick={this.handleSubmit}>
					Добавить
				</button>
				<Snackbar open={this.state.showError} autoHideDuration={6000} onClose={this.handleCloseError}>
					<MuiAlert onClose={this.handleCloseError} severity="error" elevation={6} variant="filled">
						Пары не могут пересекаться
					</MuiAlert>
				</Snackbar>
			</div>
		)
	}
}