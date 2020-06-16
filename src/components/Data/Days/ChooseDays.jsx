import React from "react"
import DualListBox from "react-dual-listbox"
import moment from "moment"

export default class ChooseDays extends React.Component {
	render() {
		moment.locale("ru")
		let weekdays = moment.weekdays(true)
			.slice(0, -1)
			.map(string => string.charAt(0).toUpperCase() + string.slice(1))
			.map(el => ({value: el, label: el}))
		return (
			<div className="uk-width-1-1">
				<DualListBox
					options={weekdays}
					selected={this.props.selected}
					onChange={this.props.updateSelected}
					selectedRef={c => {
						this.selectedRef = c
					}}/>
			</div>
		)
	}
}