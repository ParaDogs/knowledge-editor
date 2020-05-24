import React from "react"

export default class ChooseTime extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			availableTime: [36, 72, 108, 144],
			selectedTime: this.props.value || undefined,
		}

		this.handleChange = this.handleChange.bind(this)
	}

	componentDidMount() {
		if (this.state.selectedTime === undefined) {
			this.setState({
				selectedTime: this.state.availableTime[0],
			})
		}
	}

	handleChange(event) {
		this.setState({[event.target.name]: event.target.value})
		this.props.updateGroupDisciplines()
	}

	render() {
		let options = this.state.availableTime.map(el => <option value={el} key={el}>{el}</option>)
		return (
			<select className="uk-select groupDiscipline-select"
					name="selectedTime"
					onChange={this.handleChange}
					value={this.state.selectedTime}
					data-key={this.props.disciplineName}
			>
				{options}
			</select>
		)
	}
}