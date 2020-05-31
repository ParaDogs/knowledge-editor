import React from "react"
import ChooseDiscipline from "./ChooseDiscipline"
import {v4 as uuid} from "uuid"

export default class NewTeacher extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			name: '',
			disciplines: [],
		}

		this.handleChange = this.handleChange.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
		this.updateSelected = this.updateSelected.bind(this)
	}

	updateSelected(selected) {
		this.setState({
			disciplines: selected,
		})
	}

	handleChange(event) {
		this.setState({[event.target.name]: event.target.value})
	}

	handleSubmit(event) {
		if (this.state.name !== '') {
			let knowledge = this.props.getKnowledge()
			if (knowledge['teachers'] == null) {
				knowledge['teachers'] = []
			}
			if (!knowledge['teachers'].some(el => el.name === this.state.name)) {
				knowledge['teachers'].push({
					id: uuid(),
					name: this.state.name,
					disciplines: this.state.disciplines,
				})
				this.props.setKnowledge(knowledge)
			}

			this.setState({
				name: '',
				disciplines: [],
			})
		}
		event.preventDefault()
	}

	render() {
		return (
			<div className="uk-flex uk-flex-column uk-flex-middle teachers-row">
				<div className="uk-flex uk-flex-center uk-width-1-1">
					<div className="uk-width-1-2">
						<label>
							<input
								className="uk-input"
								type="text"
								placeholder="Введите ФИО преподавателя"
								value={this.state.name}
								onChange={this.handleChange}
								name="name"
								autoComplete="off"
							/>
						</label>
					</div>

					<button className="uk-button uk-button-primary uk-margin-left uk-width-1-4"
							onClick={this.handleSubmit}>Добавить
					</button>
				</div>
				<div className="uk-width-3-4 uk-flex chooseDiscipline">
					<ChooseDiscipline
						name="newTeacher"
						selected={this.state.disciplines}
						updateSelected={this.updateSelected}
						allDisciplines={this.props.allDisciplines}
					/>
				</div>
			</div>
		)
	}
}