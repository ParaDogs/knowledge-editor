import React from "react"
import Grid from '@material-ui/core/Grid'
import moment from "moment"
import MomentUtils from '@date-io/moment'
import {
	MuiPickersUtilsProvider,
	KeyboardDatePicker,
} from '@material-ui/pickers'
import "moment/locale/ru"

export default class Semester extends React.Component {
	constructor(props) {
		super(props)
		const data = this.props.getData()
		const start = data?.semester?.start
		const end = data?.semester?.end

		this.state = {
			start: moment(start),
			end: moment(end),
		}

		this.handleStartDateChange = this.handleStartDateChange.bind(this)
		this.handleEndDateChange = this.handleEndDateChange.bind(this)
		this.updateStorage = this.updateStorage.bind(this)
		moment.locale("ru")
	}

	handleStartDateChange(date) {
		this.setState({start: date}, this.updateStorage)
	}

	handleEndDateChange(date) {
		this.setState({end: date}, this.updateStorage)
	}

	updateStorage() {
		let data = this.props.getData()
		data['semester'] = {start: this.state.start, end: this.state.end}
		console.log(data)
		this.props.setData(data)
	}

	render() {
		const invalidDateMessage = 'Дата введена неправильно'
		return (
			<div className="uk-flex uk-child-width-1-2 uk-flex-center semester">
				<MuiPickersUtilsProvider utils={MomentUtils}>
					<Grid container justify="space-around">
						<KeyboardDatePicker
							variant="inline"
							format="DD.MM.yyyy"
							margin="normal"
							id="date-picker-inline"
							label="Начало семестра"
							value={this.state.start}
							onChange={this.handleStartDateChange}
							invalidDateMessage={invalidDateMessage}
							KeyboardButtonProps={{
								'aria-label': 'change date',
							}}
						/>
						<KeyboardDatePicker
							variant="inline"
							format="DD.MM.yyyy"
							margin="normal"
							id="date-picker-inline"
							label="Конец семестра"
							value={this.state.end}
							onChange={this.handleEndDateChange}
							invalidDateMessage={invalidDateMessage}
							KeyboardButtonProps={{
								'aria-label': 'change date',
							}}
						/>
					</Grid>
				</MuiPickersUtilsProvider>
			</div>
		)
	}
}