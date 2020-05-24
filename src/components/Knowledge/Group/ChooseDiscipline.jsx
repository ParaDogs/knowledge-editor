import React from 'react'
import DualListBox from 'react-dual-listbox'
import 'react-dual-listbox/lib/react-dual-listbox.css'
import '@fortawesome/fontawesome-free/css/all.min.css'
import ChooseTime from "./ChooseTime"
import syncscroll from 'sync-scroll/syncscroll'

export default class ChooseDiscipline extends React.Component {
	constructor(props) {
		super(props)
		let disciplines = []
		for (const key in this.props.disciplines) {
			disciplines.push({value: key, label: key})
		}

		let selectedDiscplines = []
		if (this.props.selected !== undefined) {
			selectedDiscplines = Object.keys(this.props.selected)
		}
		this.state = {
			selected: selectedDiscplines || [],
			groupDisciplines: {},
			disciplines: disciplines,
		}

		this.onChange = this.onChange.bind(this)
		this.updateGroupDisciplines = this.updateGroupDisciplines.bind(this)
	}

	componentDidMount() {
		this.selectedRef.classList.add('syncscroll')
		this.selectedRef.name = this.props.name
	}

	onChange(selected) {
		this.setState({selected}, this.updateGroupDisciplines)
	}

	updateGroupDisciplines() {
		let newGroupDiscplines = {}
		for (const key of this.state.selected) {
			const times = document.getElementById(this.props.name)
			let keyTimeNode = times.children[this.state.selected.findIndex(el => key === el)]
			newGroupDiscplines[key] = keyTimeNode.value
		}
		this.setState({groupDisciplines: newGroupDiscplines}, () => this.props.updateSelected(this.state.groupDisciplines))
	}

	render() {
		let selectTimeElements = []
		for (const key of this.state.selected) {
			selectTimeElements.push(<ChooseTime key={key}
												disciplineName={key}
												updateGroupDisciplines={this.updateGroupDisciplines}
												value={this.props.name === 'newGroup' ? '' : this.props.selected[key]}
			/>)
		}
		return (
			<React.Fragment>
				<div className="uk-width-1-1" onMouseEnter={() => syncscroll.reset()}>
					<DualListBox
						options={this.state.disciplines}
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