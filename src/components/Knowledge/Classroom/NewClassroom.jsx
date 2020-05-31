import React from "react"
import {v4 as uuid} from 'uuid'

export default class NewClassroom extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			name: '',
			type: 'lecture', // первая в списке, выбрана по умолчанию
		}

		this.handleChange = this.handleChange.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
	}

	handleChange(event) {
		this.setState({[event.target.name]: event.target.value})
	}

	handleSubmit(event) {
		console.log("Submit")
		if (this.state.name !== '') {

			let knowledge = this.props.getKnowledge()
			if (knowledge['classrooms'] == null) {
				knowledge['classrooms'] = []
			}

			if (!knowledge['classrooms'].some(el => el.name === this.state.name)) {
				knowledge['classrooms'].push({id: uuid(), name: this.state.name, type: this.state.type})
				this.props.setKnowledge(knowledge)
			}

			this.setState({
				name: '',
				type: 'lecture',
			})
		}
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
						ref={this.textInput}
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
					className="uk-button uk-button-primary uk-margin-left"
					onClick={this.handleSubmit}
					type="submit"
				>Добавить
				</button>
			</div>
		)
	}
}