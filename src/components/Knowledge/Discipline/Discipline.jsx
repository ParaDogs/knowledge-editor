import React from "react"
import './discipline.sass'

export default class Disciplines extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			disciplineName: props.name,
			prevName: props.name,
			disciplineType: props.type,
			deleted: false,
		}

		this.handleChange = this.handleChange.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
	}

	handleChange(event) {
		this.setState({[event.target.name]: event.target.value}, () => {
			let knowledge = this.props.getKnowledge()
			delete knowledge['disciplines'][this.state.prevName]
			this.setState({prevName: this.state.disciplineName})
			knowledge['disciplines'][this.state.disciplineName] = this.state.disciplineType
			this.props.setKnowledge(knowledge)
		})
	}

	handleSubmit(event) {
		let knowledge = this.props.getKnowledge()
		delete knowledge['disciplines'][this.state.classroomNumber]
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
			<div className="uk-flex uk-flex-center uk-child-width-1-4 classroom-row">
				<div>
					<input
						className="uk-input"
						type="text"
						placeholder="Номер аудитории"
						value={this.state.disciplineName}
						onChange={this.handleChange}
						name="disciplineName"
					/>
				</div>

				<div className="uk-margin-left">
					<select
						className="uk-select"
						onChange={this.handleChange}
						value={this.state.disciplineType}
						name="disciplineType"
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