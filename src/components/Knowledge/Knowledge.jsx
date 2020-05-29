import React from "react"
import {Route, Switch} from "react-router-dom"
import Classrooms from "./Classroom/Classrooms"
import Disciplines from "./Discipline/Disciplines"
import Groups from "./Group/Groups"
import Teachers from "./Teacher/Teachers"
import Times from "./Time/Times"

export default class Knowledge extends React.Component {
	constructor(props) {
		super(props)

		let knowledge = JSON.parse(localStorage.getItem('knowledge'))
		if (knowledge == null) {
			knowledge = {}
		}
		this.state = {
			knowledge: knowledge,
		}

		this.setKnowledge = this.setKnowledge.bind(this)
		this.getKnowledge = this.getKnowledge.bind(this)
	}

	componentDidMount() {
		document.title = 'Редактор знаний'
	}

	getKnowledge() {
		return this.state.knowledge
	}

	setKnowledge(newKnowledge) {
		// this.setState({
		// 	knowledge: newKnowledge,
		// })
		const stringKnowledge = JSON.stringify(newKnowledge)
		localStorage.setItem('knowledge', stringKnowledge)
	}

	render() {
		return (
			<div className="uk-width-expand">
				<div>
					<form className="uk-flex uk-flex-center uk-flex-column tabContent">
						<Switch>
							<Route path="/knowledge/classrooms">
								<Classrooms
									classrooms={this.state.knowledge.classrooms}
									setKnowledge={this.setKnowledge}
									getKnowledge={this.getKnowledge}
								/>
							</Route>
							<Route path="/knowledge/disciplines">
								<Disciplines
									disciplines={this.state.knowledge.disciplines}
									setKnowledge={this.setKnowledge}
									getKnowledge={this.getKnowledge}
								/>
							</Route>
							<Route path="/knowledge/groups">
								<Groups
									disciplines={this.state.knowledge.disciplines}
									setKnowledge={this.setKnowledge}
									getKnowledge={this.getKnowledge}
								/>
							</Route>
							<Route path="/knowledge/teachers">
								<Teachers
									disciplines={this.state.knowledge.disciplines}
									setKnowledge={this.setKnowledge}
									getKnowledge={this.getKnowledge}
								/>
							</Route>
							<Route path="/knowledge/times">
								<Times
									times={this.state.knowledge.times}
									setKnowledge={this.setKnowledge}
									getKnowledge={this.getKnowledge}
								/>
							</Route>
						</Switch>
					</form>
				</div>
			</div>
		)
	}
}
