import React from "react"
import TimeInput from 'react-time-input'
import moment from "moment"

export default class Time extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			startTime: this.props.startTime,
			endTime: this.props.endTime,
			durationInMinutes: 90,
			edited: false,
		}
		this.startTime = React.createRef()
		this.endTime = React.createRef()
		this.handleStartChange = this.handleStartChange.bind(this)
		this.handleEndChange = this.handleEndChange.bind(this)
		this.updateStartTime = this.updateStartTime.bind(this)
		this.updateEndTime = this.updateEndTime.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
		this.handleSave = this.handleSave.bind(this)
	}

	componentDidMount() {
		this.startTime.current.setState({time: this.state.startTime})
		this.endTime.current.setState({time: this.state.endTime})
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
		this.setState({startTime: value, edited: true})
		const newEnd = moment(value, 'HH:mm').add(this.state.durationInMinutes, 'minutes')
		this.updateEndTime(newEnd.format('HH:mm'))
	}

	handleEndChange(value) {
		this.setState({endTime: value, edited: true})
		const newStart = moment(value, 'HH:mm').subtract(this.state.durationInMinutes, 'minutes')
		this.updateStartTime(newStart.format('HH:mm'))
	}

	handleSubmit(event) {
		if (this.state.startTime !== '' && this.state.endTime !== '') {
			let knowledge = this.props.getKnowledge()
			if (knowledge['times'] == null) {
				knowledge['times'] = []
			}

			knowledge['times'] = knowledge['times'].filter(el => el.id !== this.props.id)
			this.props.setKnowledge(knowledge)
		}
		event.preventDefault()
	}

	handleSave(event) {
		event.preventDefault()
		let knowledge = this.props.getKnowledge()
		this.props.showError(false)
		// Check that times don't intersect
		const format = 'HH:mm'
		for (const time of knowledge['times']) {
			if (time.id === this.props.id) continue
			const compare = [moment(time.startTime, format), moment(time.endTime, format), undefined, '[]']
			if (moment(this.state.startTime, format).isBetween(...compare) || moment(this.state.endTime, format).isBetween(...compare)) {
				this.props.showError(true)
				return
			}
		}

		knowledge['times'] = knowledge['times'].map(el => el.id !== this.props.id ? el : {
			startTime: this.state.startTime,
			endTime: this.state.endTime,
			id: el.id,
		})
		this.setState({edited: false})
		this.props.setKnowledge(knowledge)
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
					className="uk-button uk-button-primary uk-margin-left uk-width-1-5" disabled={!this.state.edited}
					onClick={this.handleSave}>
					Сохранить
				</button>
				<button
					className="uk-button uk-button-danger uk-margin-left uk-width-1-5"
					onClick={this.handleSubmit}>
					Удалить
				</button>
			</div>
		)
	}
}