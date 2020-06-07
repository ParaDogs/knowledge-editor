import React from "react"
import Group from "./Group"
import NewGroup from "./NewGroup"
import './group.sass'
import Snackbar from "@material-ui/core/Snackbar"
import MuiAlert from "@material-ui/lab/Alert"

export default class Groups extends React.Component {
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
		let groupsArray = this.props.groups?.map(el => <Group
			name={el.name}
			disciplines={el.disciplines}
			times={el.times}
			allDisciplines={this.props.disciplines}
			key={el.id}
			id={el.id}
			showError={this.showError}
			setKnowledge={this.props.setKnowledge}
			getKnowledge={this.props.getKnowledge}
		/>)
		return (
			<React.Fragment>
				{groupsArray}
				<NewGroup
					allDisciplines={this.props.disciplines}
					setKnowledge={this.props.setKnowledge}
					getKnowledge={this.props.getKnowledge}
					showError={this.showError}
				/>
				<Snackbar open={this.state.showError} autoHideDuration={6000} onClose={this.handleCloseError}>
					<MuiAlert onClose={this.handleCloseError} severity="error" elevation={6} variant="filled">
						Группа с таким именем уже есть
					</MuiAlert>
				</Snackbar>
			</React.Fragment>
		)
	}
}
