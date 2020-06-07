import React from "react"
import Time from "./Time"
import NewTime from "./NewTime"
import './time.sass'

export default class Times extends React.Component {
	render() {
		let times = this.props.times?.sort((a, b) => a.startTime > b.startTime ? 1 : -1).map(el => (
			<Time
				key={el.id}
				id={el.id}
				endTime={el.endTime}
				startTime={el.startTime}
				setKnowledge={this.props.setKnowledge}
				getKnowledge={this.props.getKnowledge}
			/>))

		return (
			<React.Fragment>
				{times}
				<NewTime
					setKnowledge={this.props.setKnowledge}
					getKnowledge={this.props.getKnowledge}
				/>
			</React.Fragment>
		)
	}
}