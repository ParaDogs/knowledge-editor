import React from "react"
import Discipline from "./Discipline"
import NewDiscipline from "./NewDiscipline"
import Snackbar from "@material-ui/core/Snackbar"
import MuiAlert from "@material-ui/lab/Alert"

export default class Disciplines extends React.Component {
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
		let disciplinesArray = this.props.disciplines?.map(el => <Discipline
			name={el.name}
			type={el.type}
			key={el.id}
			id={el.id}
			showError={this.showError}
			setKnowledge={this.props.setKnowledge}
			getKnowledge={this.props.getKnowledge}
		/>)
		return (
			<React.Fragment>
				{disciplinesArray}
				<NewDiscipline
					setKnowledge={this.props.setKnowledge}
					getKnowledge={this.props.getKnowledge}
					showError={this.showError}
				/>
				<Snackbar open={this.state.showError} autoHideDuration={6000} onClose={this.handleCloseError}>
					<MuiAlert onClose={this.handleCloseError} severity="error" elevation={6} variant="filled">
						Дисциплина с таким именем уже есть
					</MuiAlert>
				</Snackbar>
			</React.Fragment>
		)
	}
}