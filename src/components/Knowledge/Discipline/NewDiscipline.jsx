import React from "react"

export default class NewDiscipline extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			disciplineName: '',
			disciplineType: 'lecture',
		}

		this.handleChange = this.handleChange.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
	}

	handleChange(event) {
		this.setState({[event.target.name]: event.target.value})
	}

	handleSubmit(event) {
		if (this.state.disciplineName !== '') {
			let knowledge = this.props.getKnowledge()
			if (knowledge['disciplines'] == null) {
				knowledge['disciplines'] = {}
			}
			knowledge['disciplines'][this.state.disciplineName] = this.state.disciplineType
			this.props.setDisciplines(knowledge['disciplines'])
			this.props.setKnowledge(knowledge)

			this.setState({
				disciplineName: '',
				disciplineType: 'lecture',
			})
		}
		event.preventDefault()
	}

	render() {
		return (
			<div className="uk-flex uk-flex-center uk-child-width-1-4 discipline-row">
				<div>
					<label>
						<input className="uk-input" type="text" placeholder="Введите название дисциплины"
							   value={this.state.disciplineName}
							   onChange={this.handleChange}
							   name="disciplineName"
							   autoComplete="off"
						/>
					</label>
				</div>

				<div className="uk-margin-left">
					<label>
						<select className="uk-select" onChange={this.handleChange}
								value={this.state.disciplineType} name="disciplineType">
							<option value="lecture">Лекционная</option>
							<option value="physical">Физическая</option>
							<option value="chemical">Химическая</option>
							<option value="computer">Компьютерная</option>
						</select>
					</label>
				</div>

				<button className="uk-button uk-button-primary uk-margin-left" onClick={this.handleSubmit}>Добавить
				</button>
			</div>
		)
	}
}