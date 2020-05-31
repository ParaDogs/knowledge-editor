import React from "react"
import ChooseDiscipline from "./ChooseDiscipline"

export default class Teacher extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			name: props.name,
			prevName: props.name,
			disciplines: props.disciplines,
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
			disciplines: selected,
		}, this.updateKnowledge)
	}

	handleChange(event) {
		this.setState({[event.target.name]: event.target.value}, this.updateKnowledge)
	}

	updateKnowledge() {
		let knowledge = this.props.getKnowledge()
		knowledge['teachers'] = knowledge['teachers'].map(el => el.name === this.state.prevName ? {
			name: this.state.name,
			disciplines: this.state.disciplines,
			id: el.id,
		} : el)
		this.props.setKnowledge(knowledge)
		this.setState({prevName: this.state.name})
	}

	handleSubmit(event) {
		let knowledge = this.props.getKnowledge()
		knowledge['teachers'] = knowledge['teachers'].filter(el => el.name !== this.state.name)
		this.props.setKnowledge(knowledge)
		event.preventDefault()
	}

	render() {
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
								value={this.state.name}
								name="name"
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
						name={this.state.name}
						selected={this.state.disciplines}
						updateSelected={this.updateSelected}
						allDisciplines={this.props.allDisciplines}
					/>
					}
				</div>
			</div>
		)
	}
}
