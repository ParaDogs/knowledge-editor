import React from "react"
import './discipline.sass'

export default class Disciplines extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			name: props.name,
			prevName: props.name,
			type: props.type,
		}

		this.handleChange = this.handleChange.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
	}

	handleChange(event) {
		this.setState({[event.target.name]: event.target.value}, () => {
			let knowledge = this.props.getKnowledge()
			knowledge['disciplines'] = knowledge['disciplines'].map(el => el.name === this.state.prevName ? {
				name: this.state.name,
				type: this.state.type,
				id: el.id,
			} : el)
			this.setState({prevName: this.state.name})
			this.props.setKnowledge(knowledge)
		})
	}

	handleSubmit(event) {
		let knowledge = this.props.getKnowledge()
		knowledge['disciplines'] = knowledge['disciplines'].filter(el => el.name !== this.state.prevName)
		this.props.setKnowledge(knowledge)
		event.preventDefault()
	}


	render() {
		return (
			<div className="uk-flex uk-flex-center uk-child-width-1-4 classroom-row">
				<div>
					<input
						className="uk-input"
						type="text"
						placeholder="Номер аудитории"
						value={this.state.name}
						onChange={this.handleChange}
						name="name"
					/>
				</div>

				<div className="uk-margin-left">
					<select
						className="uk-select"
						onChange={this.handleChange}
						value={this.state.type}
						name="type"
					>
						<option value="lecture">Лекционная</option>
						<option value="physical">Физическая</option>
						<option value="chemical">Химическая</option>
						<option value="computer">Компьютерная</option>
					</select>
				</div>

				<button
					className="uk-button uk-button-danger uk-margin-left"
					onClick={this.handleSubmit}
				>Удалить
				</button>
			</div>
		)
	}
}