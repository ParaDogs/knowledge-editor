import React from "react"
import ChooseDiscipline from "./ChooseDiscipline"

export default class NewTeacher extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			teacherName: '',
			teacherDisciplines: [],
			allDisciplines: this.props.disciplines,
		}

		this.handleChange = this.handleChange.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
		this.updateSelected = this.updateSelected.bind(this)
	}

	updateSelected(selected) {
		this.setState({
			teacherDisciplines: selected,
		})
	}

	handleChange(event) {
		this.setState({[event.target.name]: event.target.value})
	}

	handleSubmit(event) {
		if (this.state.teacherName !== '') {
			let knowledge = this.props.getKnowledge()
			if (knowledge['teachers'] == null) {
				knowledge['teachers'] = {}
			}
			knowledge['teachers'][this.state.teacherName] = this.state.teacherDisciplines
			this.props.setTeachers(knowledge['teachers'])
			this.props.setKnowledge(knowledge)

			this.setState({
				teacherName: '',
				teacherDisciplines: [],
			})
		}

		// Чтобы страница не перезагружалась
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
								value={this.state.teacherName}
								onChange={this.handleChange}
								name="teacherName"
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
						disciplines={this.state.allDisciplines}
						selected={this.state.teacherDisciplines}
						updateSelected={this.updateSelected}
						name="newTeacher"
					/>
				</div>
			</div>
		)
	}
}