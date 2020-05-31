import React from "react"
import Time from "./Time"
import NewTime from "./NewTime"
import './time.sass'

export default class Times extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			times: this.props.times || [],
		}

		this.setTimes = this.setTimes.bind(this)
	}

	setTimes(newTimes) {
		this.setState({
			times: newTimes,
		})
	}

	render() {
		let times = this.state.times.sort((a, b) => a.startTime > b.startTime ? 1 : -1).map(key => (
			<Time
				startTime={key.startTime}
				endTime={key.endTime}
				key={key.startTime + key.endTime}
				setKnowledge={this.props.setKnowledge}
				getKnowledge={this.props.getKnowledge}
				setTimes={this.setTimes}
			/>))

		return (
			<React.Fragment>
				{times}
				<NewTime
					setTimes={this.setTimes}
					setKnowledge={this.props.setKnowledge}
					getKnowledge={this.props.getKnowledge}
				/>
			</React.Fragment>
		)
	}
}