import React from "react"
import Time from "./Time"
import NewTime from "./NewTime"
import './time.sass'
import MuiAlert from "@material-ui/lab/Alert"
import Snackbar from "@material-ui/core/Snackbar"

export default class Times extends React.Component {
	constructor(props) {
		super(props)
		this.state = {showError: false}
		this.handleCloseError = this.handleCloseError.bind(this)
		this.showError = this.showError.bind(this)
	}

	handleCloseError(event, reason) {
		if (reason === 'clickaway') {
			return
		}
		this.setState({showError: false})
	}

	showError(show) {
		this.setState({showError: show})
	}

	render() {
		let times = this.props.times?.sort((a, b) => a.startTime > b.startTime ? 1 : -1).map(el => (
			<Time key={el.id}
				  id={el.id}
				  endTime={el.endTime}
				  startTime={el.startTime}
				  showError={this.showError}
				  setKnowledge={this.props.setKnowledge}
				  getKnowledge={this.props.getKnowledge}/>))

		return (
			<React.Fragment>
				{times}
				<NewTime showError={this.showError}
						 setKnowledge={this.props.setKnowledge}
						 getKnowledge={this.props.getKnowledge}/>
				<Snackbar open={this.state.showError} autoHideDuration={6000} onClose={this.handleCloseError}>
					<MuiAlert onClose={this.handleCloseError} severity="error" elevation={6} variant="filled">
						Пары не могут пересекаться
					</MuiAlert>
				</Snackbar>
			</React.Fragment>
		)
	}
}