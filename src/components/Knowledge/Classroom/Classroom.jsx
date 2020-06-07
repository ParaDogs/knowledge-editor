import React from "react"
import './classroom.sass'

export default class Classroom extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			name: props.name,
			type: props.type,
		}

		this.handleChange = this.handleChange.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
	}

	handleChange(event) {
		this.setState({[event.target.name]: event.target.value}, () => {
			let knowledge = this.props.getKnowledge()
			if (!knowledge['classrooms'].some(el => el.name === this.state.name)) {
				this.props.showError(false)
				knowledge['classrooms'] = knowledge['classrooms'].map(el => el.id === this.props.id ? {
					name: this.state.name,
					type: this.state.type,
					id: el.id,
				} : el)
				this.props.setKnowledge(knowledge)
			} else {
				this.props.showError(true)
			}
		})
	}

	handleSubmit(event) {
		let knowledge = this.props.getKnowledge()
		knowledge['classrooms'] = knowledge['classrooms'].filter(el => el.id !== this.props.id)
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
						autoComplete="off"
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