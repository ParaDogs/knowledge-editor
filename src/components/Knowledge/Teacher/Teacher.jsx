import React from "react"
import ChooseDiscipline from "./ChooseDiscipline"

export default class Teacher extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			teacherName: props.name,
			prevName: props.name,
			teacherDisciplines: props.teacherDisciplines,
			allDisciplines: this.props.disciplines,
			deleted: false,
			showDiscipline: false,
		}

		this.handleChange = this.handleChange.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
		this.showDisciplines = this.showDisciplines.bind(this)
		this.updateSelected = this.updateSelected.bind(this)
		this.updateKnowledge = this.updateKnowledge.bind(this)
	}

	showDisciplines(event) {
		this.setState(prevState => ({
			showDiscipline: !prevState.showDiscipline,
		}))
		event.preventDefault()
	}

	updateSelected(selected) {
		this.setState({
			teacherDisciplines: selected,
		}, this.updateKnowledge)
	}

	updateKnowledge() {
		let knowledge = this.props.getKnowledge()
		delete knowledge['teachers'][this.state.prevName]
		this.setState({prevName: this.state.teacherName})
		knowledge['teachers'][this.state.teacherName] = this.state.teacherDisciplines
		this.props.setKnowledge(knowledge)
	}

	handleChange(event) {
		this.setState({[event.target.name]: event.target.value}, this.updateKnowledge)
	}

	handleSubmit(event) {
		let knowledge = this.props.getKnowledge()
		delete knowledge['teachers'][this.state.teacherName]
		this.props.setKnowledge(knowledge)
		this.setState({
			deleted: true,
		})
		// Чтобы страница не перезагружалась
		event.preventDefault()
	}

	render() {
		if (this.state.deleted) {
			return ''
		}
		return (
			<div className="uk-flex uk-flex-column uk-flex-middle teachers-row">
				<div className="uk-width-3-4 uk-flex uk-flex-center uk-child-width-1-4">
					<div className="uk-width-1-2">
						<label>
							<input
								className="uk-input"
								type="text"
								placeholder="Введите ФИО преподавателя"
								onChange={this.handleChange}
								autoComplete="off"
								value={this.state.teacherName}
								name="teacherName"
							/>
						</label>
					</div>

					<button
						className="uk-button uk-margin-left uk-width-auto"
						onClick={this.showDisciplines}
					>
						Дисциплины
					</button>

					<button
						className="uk-button uk-button-danger uk-margin-left"
						onClick={this.handleSubmit}
					>
						Удалить
					</button>
				</div>
				<div className="uk-width-3-4 uk-flex uk-flex-center chooseDiscipline">
					{this.state.showDiscipline &&
					<ChooseDiscipline
						disciplines={this.state.allDisciplines}
						teacherDisciplines={this.state.teacherDisciplines}
						updateSelected={this.updateSelected}
						name={this.state.teacherName}
					/>
					}
				</div>
			</div>
		)
	}
}
