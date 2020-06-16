import React from "react"
import Grid from '@material-ui/core/Grid'
import moment from "moment"
import MomentUtils from '@date-io/moment'
import {
	MuiPickersUtilsProvider,
	KeyboardDatePicker,
} from '@material-ui/pickers'
import "moment/locale/ru"
import Snackbar from "@material-ui/core/Snackbar"
import MuiAlert from '@material-ui/lab/Alert'

export default class Semester extends React.Component {
	constructor(props) {
		super(props)
		const data = this.props.getData()
		const start = data?.semester?.start
		const end = data?.semester?.end

		this.state = {
			start: moment(start),
			end: moment(end),
			showError: false,
		}

		this.handleStartDateChange = this.handleStartDateChange.bind(this)
		this.handleEndDateChange = this.handleEndDateChange.bind(this)
		this.updateStorage = this.updateStorage.bind(this)
		this.handleSubmit = this.handleSubmit.bind(this)
		this.handleCloseError = this.handleCloseError.bind(this)
		moment.locale("ru")
	}

	handleStartDateChange(date) {
		this.setState({start: date, end: moment(date).add(18, 'weeks')})
	}

	handleEndDateChange(date) {
		this.setState({end: date, start: moment(date).subtract(18, 'weeks')})
	}

	handleSubmit(event) {
		if (moment(this.state.start).isBefore(this.state.end)) {
			this.updateStorage()
		} else {
			this.setState({showError: true}, () => console.log(this.state.showError))
		}
		event.preventDefault()
	}

	handleCloseError(event, reason) {
		if (reason === 'clickaway') {
			return
		}
		this.setState({showError: false})
	}

	updateStorage() {
		let data = this.props.getData()
		data['semester'] = {start: this.state.start, end: this.state.end}
		this.props.setData(data)
	}

	render() {
		const invalidDateMessage = 'Дата введена неправильно'
		return (
			<div className="uk-flex uk-child-width-1-2 uk-flex-center uk-flex-column uk-flex-middle semester">
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
				<button className="uk-button uk-button-primary uk-width-auto uk-margin-top"
						onClick={this.handleSubmit}>
					Сохранить
				</button>
				<Snackbar open={this.state.showError} autoHideDuration={6000} onClose={this.handleCloseError}>
					<MuiAlert onClose={this.handleCloseError} severity="error" elevation={6} variant="filled">
						Дата начала семестра должна быть до даты конца семестра
					</MuiAlert>
				</Snackbar>
			</div>
		)
	}
}