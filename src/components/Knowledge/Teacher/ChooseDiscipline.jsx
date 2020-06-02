import React from 'react'
import DualListBox from 'react-dual-listbox'
import 'react-dual-listbox/lib/react-dual-listbox.css'
import '@fortawesome/fontawesome-free/css/all.min.css'
import syncscroll from 'sync-scroll/syncscroll'

export default class ChooseDiscipline extends React.Component {
	constructor(props) {
		super(props)

		// Need to remove disciplines that was deleted
		let onlyExistDisciplines = []
		for (let i = 0; i < this.props.selected.length; i++) {
			if (this.props.allDisciplines.some(el => el.id === this.props.selected[i])) {
				onlyExistDisciplines.push(this.props.selected[i])
			}
		}

		this.state = {
			selected: onlyExistDisciplines || [],
		}

		this.onChange = this.onChange.bind(this)
	}

	componentDidMount() {
		this.selectedRef.classList.add('syncscroll')
		this.selectedRef.name = this.props.name
		this.props.updateSelected(this.state.selected) // update deleted disciplines
	}

	onChange(selected) {
		this.setState({selected}, () => this.props.updateSelected(this.state.selected))
	}

	render() {
		let allDisciplines = this.props.allDisciplines?.map(el => {
			return {value: el.id, label: el.name}
		})
		return (
			<div className="uk-width-1-1" onMouseEnter={() => syncscroll.reset()}>
				<DualListBox
					options={allDisciplines || []}
					selected={this.state.selected}
					onChange={this.onChange}
					selectedRef={c => {
						this.selectedRef = c
					}}/>
			</div>
		)
	}
}