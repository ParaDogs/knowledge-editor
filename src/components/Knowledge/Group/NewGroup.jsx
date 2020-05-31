import React from "react"
import ChooseDiscipline from "./ChooseDiscipline"
import {v4 as uuid} from "uuid"

export default class NewGroup extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			name: '',
			disciplines: [],
			times: [],
		}

		this.handleChange = this.handleChange.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
		this.updateSelected = this.updateSelected.bind(this)
	}

	updateSelected(selected, times) {
		if (selected.length !== times.length) {
			throw new Error("Length might be the same")
		}
		this.setState({
			disciplines: selected,
			times: times,
		})
	}

	handleChange(event) {
		this.setState({[event.target.name]: event.target.value})
	}

	handleSubmit(event) {
		if (this.state.name !== '') {
			let knowledge = this.props.getKnowledge()
			if (knowledge['groups'] == null) {
				knowledge['groups'] = []
			}
			if (!knowledge['groups'].some(el => el.name === this.state.name)) {
				knowledge['groups'].push({
					id: uuid(),
					name: this.state.name,
					disciplines: this.state.disciplines,
					times: this.state.times,
				})
				this.props.setKnowledge(knowledge)
			}

			this.setState({
				name: '',
				disciplines: [],
				times: [],
			})
		}
		event.preventDefault()
	}

	render() {
		return (
			<div className="uk-flex uk-flex-column uk-flex-middle groups-row">
				<div className="uk-flex uk-flex-center uk-width-1-1">
					<div className="uk-width-1-2">
						<label>
							<input
								className="uk-input"
								type="text"
								placeholder="Введите название группы"
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
						allDisciplines={this.props.allDisciplines}
						selected={this.state.disciplines}
						updateSelected={this.updateSelected}
						name="newGroup"
					/>
				</div>
			</div>
		)
	}
}