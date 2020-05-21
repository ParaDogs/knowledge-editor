import React from "react"
import Classroom from "./Classroom"
import NewClassroom from "./NewClassroom"

export default class Classrooms extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			classrooms: props.classrooms,
		}

		this.setClassrooms = this.setClassrooms.bind(this)
	}

	setClassrooms(newClassrooms) {
		this.setState({
			classrooms: newClassrooms,
		})
	}

	render() {
		let classroomsArray = []
		for (const key in this.state.classrooms) {
			classroomsArray.push(<Classroom
				number={key}
				type={this.state.classrooms[key]}
				key={key + this.state.classrooms[key]}
				setKnowledge={this.props.setKnowledge}
				getKnowledge={this.props.getKnowledge}
			/>)
		}

		return (
			<React.Fragment>
				{classroomsArray}
				<NewClassroom
					setClassrooms={this.setClassrooms}
					setKnowledge={this.props.setKnowledge}
					getKnowledge={this.props.getKnowledge}
				/>
			</React.Fragment>
		)
	}
}