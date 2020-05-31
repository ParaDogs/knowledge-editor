import React from "react"
import Teacher from "./Teacher"
import NewTeacher from "./NewTeacher"
import './teacher.sass'

export default class Teachers extends React.Component {
	render() {
		let teachersArray = this.props.teachers?.map(el => <Teacher
			name={el.name}
			disciplines={el.disciplines}
			allDisciplines={this.props.disciplines}
			key={el.id}
			setKnowledge={this.props.setKnowledge}
			getKnowledge={this.props.getKnowledge}
		/>)
		return (
			<React.Fragment>
				{teachersArray}
				<NewTeacher
					allDisciplines={this.props.disciplines}
					setKnowledge={this.props.setKnowledge}
					getKnowledge={this.props.getKnowledge}
				/>
			</React.Fragment>
		)
	}
}
