import React from "react"


export default class Group extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			groupName: props.name,
			prevName: props.name,
			groupDisciplines: props.disciplines,
			deleted: false,
		}

		this.handleChange = this.handleChange.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
	}

	handleChange(event) {
		this.setState({[event.target.name]: event.target.value}, () => {
			let knowledge = this.props.getKnowledge()
			delete knowledge['groups'][this.state.prevName]
			this.setState({prevName: this.state.groupName})
			knowledge['groups'][this.state.groupName] = this.state.groupDisciplines
			this.props.setKnowledge(knowledge)
		})
	}

	handleSubmit(event) {
		let knowledge = this.props.getKnowledge()
		delete knowledge['groups'][this.state.groupName]
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
			<div className="uk-flex uk-flex-center uk-child-width-1-4 groups-row">
				<div className="uk-width-1-2">
					<label>
						<input
							className="uk-input"
							type="text"
							placeholder="Введите название группы"
							onChange={this.handleChange}
							autoComplete="off"
							value={this.state.groupName}
							name="groupName"
						/>
					</label>
				</div>

				<button
					className="uk-button uk-button-danger uk-margin-left"
					onClick={this.handleSubmit}
				>
					Удалить
				</button>
			</div>
		)
	}
}
