import React from "react"
import MultiSelectBox from 'react-multiselect-box'
import 'react-multiselect-box/build/css/index.css'

export default class NewGroup extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			groupName: '',
			groupDisciplines: [],
			selectedOne: [],
			selectedTwo: [],
		}

		this.handleChange = this.handleChange.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
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
				groupDisciplines: [],
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

				<MultiSelectBox
					options={[
						{desc: 'Item 1', value: '1'},
						{desc: 'Item 2', value: '2'},
						{desc: 'Item 3', value: '3'},
					]}
					labelKey="desc"
					valueKey="value"
					onAdd={selectedItem => {
						this.setState({
							selectedOne: [...this.state.selectedOne, selectedItem.value],
						})
					}}
					onRemove={(removedItem, index) => {
						this.setState({
							selectedOne: [
								...this.state.selectedOne.filter(
									item => item !== removedItem.value,
								),
							],
						})
					}}
					onSelectAll={selectedItems => {
						this.setState({
							selectedOne: [
								...this.state.selectedOne,
								...selectedItems.map(item => item.value),
							],
						})
					}}
					onRemoveAll={() =>
						this.setState({
							selectedOne: [],
						})
					}
					valueArray={this.state.selectedOne}
				/>
			</div>
		)
	}
}