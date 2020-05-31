import React from 'react'
import DualListBox from 'react-dual-listbox'
import 'react-dual-listbox/lib/react-dual-listbox.css'
import '@fortawesome/fontawesome-free/css/all.min.css'
import ChooseTime from "./ChooseTime"
import syncscroll from 'sync-scroll/syncscroll'

export default class ChooseDiscipline extends React.Component {
	constructor(props) {
		super(props)

		// Need to remove disciplines that was deleted
		let onlyExistDisciplines = [], onlyExistTimes = []
		for (let i = 0; i < this.props.selected.length; i++) {
			if (this.props.allDisciplines.some(el => el.id === this.props.selected[i])) {
				onlyExistDisciplines.push(this.props.selected[i])
				onlyExistTimes.push(this.props.times[i])
			}
		}

		this.state = {
			selected: onlyExistDisciplines || [],
			times: onlyExistTimes || [],
		}

		this.onChange = this.onChange.bind(this)
		this.updateTimes = this.updateTimes.bind(this)
	}

	componentDidMount() {
		this.selectedRef.classList.add('syncscroll')
		this.selectedRef.name = this.props.name
		this.props.updateSelected(this.state.selected, this.state.times) // update deleted disciplines
	}

	onChange(selected) {
		this.setState({selected}, this.updateTimes)
	}

	updateTimes() {
		const times = document.getElementById(this.props.name)
		console.log(this.state.selected)
		let newTimes = this.state.selected.map(discipline => {
			let keyTimeNode = times.children[this.state.selected.findIndex(el => discipline === el)]
			console.log(discipline, keyTimeNode.value)
			return keyTimeNode.value
		})
		this.setState({times: newTimes}, () => this.props.updateSelected(this.state.selected, this.state.times))
	}

	render() {
		let selectTimeElements = this.state.selected.map((el, ind) => <ChooseTime
			key={el}
			disciplineName={el}
			updateTimes={this.updateTimes}
			value={this.props.name === 'newGroup' ? '' : this.state.times[ind]}
		/>)
		let allDisciplines = this.props.allDisciplines?.map(el => {
			return {value: el.id, label: el.name}
		})
		return (
			<React.Fragment>
				<div className="uk-width-1-1" onMouseEnter={() => syncscroll.reset()}>
					<DualListBox
						options={allDisciplines}
						selected={this.state.selected}
						onChange={this.onChange}
						selectedRef={c => {
							this.selectedRef = c
						}}/>
				</div>
				<div onMouseEnter={() => syncscroll.reset()}>
					<div className="groupDiscipline-box uk-flex uk-flex-column syncscroll"
						 name={this.props.name}
						 id={this.props.name}>
						{selectTimeElements}
					</div>
				</div>
			</React.Fragment>
		)
	}
}