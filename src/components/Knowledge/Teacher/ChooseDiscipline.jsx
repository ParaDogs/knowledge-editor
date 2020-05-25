import React from 'react'
import DualListBox from 'react-dual-listbox'
import 'react-dual-listbox/lib/react-dual-listbox.css'
import '@fortawesome/fontawesome-free/css/all.min.css'
import syncscroll from 'sync-scroll/syncscroll'

export default class ChooseDiscipline extends React.Component {
	constructor(props) {
		super(props)
		let disciplines = []
		for (const key in this.props.disciplines) {
			disciplines.push({value: key, label: key})
		}

		this.state = {
			teacherDisciplines: this.props.teacherDisciplines,
			disciplines: disciplines,
		}

		this.onChange = this.onChange.bind(this)
	}

	componentDidMount() {
		this.selectedRef.classList.add('syncscroll')
		this.selectedRef.name = this.props.name
	}

	onChange(teacherDisciplines) {
		this.setState({teacherDisciplines}, () => this.props.updateSelected(this.state.teacherDisciplines))
	}

	render() {
		return (
			<div className="uk-width-1-1" onMouseEnter={() => syncscroll.reset()}>
				<DualListBox
					options={this.state.disciplines}
					selected={this.state.teacherDisciplines}
					onChange={this.onChange}
					selectedRef={c => {
						this.selectedRef = c
					}}/>
			</div>
		)
	}
}