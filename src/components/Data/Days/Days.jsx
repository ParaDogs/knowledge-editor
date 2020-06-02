import React from "react"
import Teacher from "./Teacher"

export default class Days extends React.Component {
	render() {
		const teachers = this.props.getKnowledge().teachers
		const teachersComponents = teachers?.map(el => <Teacher id={el.id}
																key={el.id}
																name={el.name}
																days={this.props.getData().days?.find(day => day.id === el.id)?.days}
																setData={this.props.setData}
																getData={this.props.getData}
																setKnowledge={this.props.setKnowledge}
																getKnowledge={this.props.getKnowledge}/>)
		return (
			<React.Fragment>
				{teachersComponents || <p>Сначала необходимо добавить преподавателей</p>}
			</React.Fragment>
		)
	}
}