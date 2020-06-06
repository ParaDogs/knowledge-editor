import React from "react"
import {v4 as uuid} from 'uuid'
import MuiAlert from "@material-ui/lab/Alert"
import Snackbar from "@material-ui/core/Snackbar"

export default class NewDiscipline extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			name: '',
			type: 'lecture',
			showError: false,
		}

		this.handleChange = this.handleChange.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
		this.handleCloseError = this.handleCloseError.bind(this)
	}

	handleChange(event) {
		this.setState({[event.target.name]: event.target.value})
	}

	handleSubmit(event) {
		if (this.state.name !== '') {
			let knowledge = this.props.getKnowledge()
			if (knowledge['disciplines'] == null) {
				knowledge['disciplines'] = []
			}

			if (!knowledge['disciplines'].some(el => el.name === this.state.name)) {
				knowledge['disciplines'].push({id: uuid(), name: this.state.name, type: this.state.type})
				this.props.setKnowledge(knowledge)
			} else {
				this.setState({showError: true})
			}

			this.setState({
				name: '',
				type: 'lecture',
			})
		}
		event.preventDefault()
	}

	handleCloseError(event, reason) {
		if (reason === 'clickaway') {
			return
		}
		this.setState({showError: false})
	}

	render() {
		return (
			<div className="uk-flex uk-flex-center uk-child-width-1-4 discipline-row">
				<div>
					<label>
						<input className="uk-input" type="text" placeholder="Введите название дисциплины"
							   value={this.state.name}
							   onChange={this.handleChange}
							   name="name"
							   autoComplete="off"
						/>
					</label>
				</div>

				<div className="uk-margin-left">
					<label>
						<select className="uk-select" onChange={this.handleChange}
								value={this.state.type} name="type">
							<option value="lecture">Лекционная</option>
							<option value="physical">Физическая</option>
							<option value="chemical">Химическая</option>
							<option value="computer">Компьютерная</option>
						</select>
					</label>
				</div>

				<button className="uk-button uk-button-primary uk-margin-left" onClick={this.handleSubmit}>Добавить
				</button>
				<Snackbar open={this.state.showError} autoHideDuration={6000} onClose={this.handleCloseError}>
					<MuiAlert onClose={this.handleCloseError} severity="error" elevation={6} variant="filled">
						Дисциплина с таким именем уже есть
					</MuiAlert>
				</Snackbar>
			</div>
		)
	}
}