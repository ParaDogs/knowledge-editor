import React from "react"
import Discipline from "./Discipline"
import NewDiscipline from "./NewDiscipline"

export default class Disciplines extends React.Component {
	render() {
		let disciplinesArray = this.props.disciplines?.map(el => <Discipline
			name={el.name}
			type={el.type}
			key={el.id}
			id={el.id}
			setKnowledge={this.props.setKnowledge}
			getKnowledge={this.props.getKnowledge}
		/>)
		return (
			<React.Fragment>
				{disciplinesArray}
				<NewDiscipline
					setKnowledge={this.props.setKnowledge}
					getKnowledge={this.props.getKnowledge}
				/>
			</React.Fragment>
		)
	}
}