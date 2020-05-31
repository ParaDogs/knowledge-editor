import React from "react"
import Group from "./Group"
import NewGroup from "./NewGroup"
import './group.sass'

export default class Groups extends React.Component {
	render() {
		let groupsArray = this.props.groups?.map(el => <Group
			name={el.name}
			disciplines={el.disciplines}
			times={el.times}
			allDisciplines={this.props.disciplines}
			key={el.id}
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
				/>
			</React.Fragment>
		)
	}
}
