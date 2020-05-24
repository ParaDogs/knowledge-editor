import React from "react"
import ChooseDiscipline from "./ChooseDiscipline"

export default class NewGroup extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			groupName: '',
			groupDisciplines: {},
			allDisciplines: this.props.disciplines,
		}

		this.handleChange = this.handleChange.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
		this.updateSelected = this.updateSelected.bind(this)
	}

	updateSelected(selected) {
		this.setState({
			groupDisciplines: selected,
		})
	}

	handleChange(event) {
		this.setState({[event.target.name]: event.target.value})
	}

	handleSubmit(event) {
		if (this.state.groupName !== '') {
			let knowledge = this.props.getKnowledge()
			if (knowledge['groups'] == null) {
				knowledge['groups'] = {}
			}
			knowledge['groups'][this.state.groupName] = this.state.groupDisciplines
			this.props.setGroups(knowledge['groups'])
			this.props.setKnowledge(knowledge)

			this.setState({
				groupName: '',
				groupDisciplines: {},
			})
		}

		// Чтобы страница не перезагружалась
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
								value={this.state.groupName}
								onChange={this.handleChange}
								name="groupName"
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
						selected={this.state.groupDisciplines}
						updateSelected={this.updateSelected}
						name="newGroup"
					/>
				</div>
			</div>
		)
	}
}