import React from "react"
import Classroom from "./Classroom"
import NewClassroom from "./NewClassroom"

export default class Classrooms extends React.Component {
	render() {
		let classroomsArray = this.props.classrooms?.map(el => <Classroom
			name={el.name}
			type={el.type}
			key={el.id}
			setKnowledge={this.props.setKnowledge}
			getKnowledge={this.props.getKnowledge}
		/>)
		return (
			<React.Fragment>
				{classroomsArray}
				<NewClassroom
					setKnowledge={this.props.setKnowledge}
					getKnowledge={this.props.getKnowledge}
				/>
			</React.Fragment>
		)
	}
}