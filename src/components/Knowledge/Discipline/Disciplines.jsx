import React from "react"
import Discipline from "./Discipline"
import NewDiscipline from "./NewDiscipline"

export default class Disciplines extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			disciplines: props.disciplines,
		}

		this.setDisciplines = this.setDisciplines.bind(this)
	}

	setDisciplines(newDisciplines) {
		this.setState({
			disciplines: newDisciplines,
		})
	}

	render() {
		let disciplinesArray = []
		for (const key in this.state.disciplines) {
			disciplinesArray.push(<Discipline
				name={key}
				type={this.state.disciplines[key]}
				key={key + this.state.disciplines[key]}
				setKnowledge={this.props.setKnowledge}
				getKnowledge={this.props.getKnowledge}
			/>)
		}

		return (
			<React.Fragment>
				{disciplinesArray}
				<NewDiscipline
					setDisciplines={this.setDisciplines}
					setKnowledge={this.props.setKnowledge}
					getKnowledge={this.props.getKnowledge}
				/>
			</React.Fragment>
		)
	}
}