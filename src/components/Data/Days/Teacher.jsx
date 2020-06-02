import React from "react"
import ChooseDays from "./ChooseDays"

export default class Teacher extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			days: props.days || [],
			showDays: false,
		}

		this.showDays = this.showDays.bind(this)
		this.updateSelected = this.updateSelected.bind(this)
		this.updateStorage = this.updateStorage.bind(this)
	}

	showDays(event) {
		this.setState(prevState => ({
			showDays: !prevState.showDays,
		}))
		event.preventDefault()
	}

	updateSelected(selected) {
		this.setState({
			days: selected,
		}, this.updateStorage)
	}

	updateStorage() {
		let data = this.props.getData()
		if (data['days'] == null) {
			data['days'] = []
		}
		if (!data['days']?.some(el => el.id === this.props.id)) {
			data['days'].push({days: this.state.days, id: this.props.id})
		} else {
			data['days'] = data['days']?.map(el => el.id === this.props.id ? {
				days: this.state.days,
				id: el.id,
			} : el)
		}
		this.props.setData(data)
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
								autoComplete="off"
								value={this.props.name}
								name="name"
								readOnly
							/>
						</label>
					</div>

					<button
						className="uk-button uk-margin-left uk-width-1-3"
						onClick={this.showDays}
					>
						{this.state.showDays ? 'Скрыть' : 'Показать'} дни
					</button>

				</div>
				<div className="uk-width-3-4 uk-flex uk-flex-center chooseDiscipline">
					{this.state.showDays && <ChooseDays selected={this.state.days}
														updateSelected={this.updateSelected}/>
					}
				</div>
			</div>
		)
	}
}
