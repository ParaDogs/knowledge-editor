import React from "react"
import Group from "./Group"
import NewGroup from "./NewGroup"
import './group.sass'

export default class Groups extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			groups: this.props.groups,
			disciplines: this.props.disciplines,
		}

		this.setGroups = this.setGroups.bind(this)
	}

	setGroups(newGroups) {
		this.setState({
			groups: newGroups,
		})
	}

	render() {
		let knowledge = this.props.getKnowledge()
		let groupsFromStorage = knowledge['groups']
		let groupsArray = []
		for (const key in groupsFromStorage) {
			groupsArray.push(<Group
				name={key}
				groupDisciplines={groupsFromStorage[key]}
				disciplines={this.state.disciplines}
				key={key + groupsFromStorage[key]}
				setKnowledge={this.props.setKnowledge}
				getKnowledge={this.props.getKnowledge}
			/>)
		}
		return (
			<React.Fragment>
				{groupsArray}
				<NewGroup
					setGroups={this.setGroups}
					setKnowledge={this.props.setKnowledge}
					getKnowledge={this.props.getKnowledge}
					disciplines={this.state.disciplines}
				/>
			</React.Fragment>
		)
	}
}
