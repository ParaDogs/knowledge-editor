import React from "react"

export default class NewClassroom extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			classroomNumber: '',
			classroomType: 'lecture', // первая в списке, выбрана по умолчанию
		}

		this.textInput = React.createRef()
		this.handleChange = this.handleChange.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
	}

	handleChange(event) {
		this.setState({[event.target.name]: event.target.value})
	}

	handleSubmit(event) {
		if (this.state.classroomNumber !== '') {
			let knowledge = this.props.getKnowledge()
			if (knowledge['classrooms'] == null) {
				knowledge['classrooms'] = {}
			}
			knowledge['classrooms'][this.state.classroomNumber] = this.state.classroomType
			this.props.setClassrooms(knowledge['classrooms'])
			this.props.setKnowledge(knowledge)

			this.setState({
				classroomNumber: '',
				classroomType: 'lecture', // первая в списке, выбрана по умолчанию
			})

			this.textInput.current.focus()
		}

		// Чтобы страница не перезагружалась
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
						value={this.state.classroomNumber}
						onChange={this.handleChange}
						name="classroomNumber"
						autoComplete="off"
						ref={this.textInput}
					/>
				</div>

				<div className="uk-margin-left">
					<select
						className="uk-select"
						onChange={this.handleChange}
						value={this.state.classroomType}
						name="classroomType"
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