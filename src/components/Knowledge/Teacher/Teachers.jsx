import React from "react"
import Teacher from "./Teacher"
import NewTeacher from "./NewTeacher"
import './teacher.sass'

export default class Teachers extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			teachers: this.props.teachers,
			disciplines: this.props.disciplines,
		}

		this.setTeachers = this.setTeachers.bind(this)
	}

	setTeachers(newTeachers) {
		this.setState({
			teachers: newTeachers,
		})
	}

	render() {
		let knowledge = this.props.getKnowledge()
		let teachersFromStorage = knowledge['teachers']
		let teachersArray = []
		for (const key in teachersFromStorage) {
			teachersArray.push(<Teacher
				name={key}
				teacherDisciplines={teachersFromStorage[key]}
				disciplines={this.state.disciplines}
				key={key + teachersFromStorage[key]}
				setKnowledge={this.props.setKnowledge}
				getKnowledge={this.props.getKnowledge}
			/>)
		}
		return (
			<React.Fragment>
				{teachersArray}
				<NewTeacher
					setTeachers={this.setTeachers}
					setKnowledge={this.props.setKnowledge}
					getKnowledge={this.props.getKnowledge}
					disciplines={this.state.disciplines}
				/>
			</React.Fragment>
		)
	}
}
