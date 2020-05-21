import React from "react"
import {Route, Switch} from "react-router-dom"
import Classrooms from "./Classroom/Classrooms"
import Disciplines from "./Discipline/Disciplines"
import Groups from "./Group/Groups"

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
						</Switch>
					</form>
					{/*<ul className="uk-switcher" id="knowledgeEditor-tabs">
						<li>
							<form className="uk-flex uk-flex-center uk-flex-column tabContent" id="classroom">
								<Classrooms
									classrooms={this.state.knowledge.classrooms}
									setKnowledge={this.setKnowledge}
									getKnowledge={this.getKnowledge}
								/>
							</form>
						</li>
						<li>
							<form className="uk-flex uk-flex-center uk-flex-column tabContent" id="disciplines">
							</form>
						</li>
						<li>
							<form className="uk-flex uk-flex-center uk-flex-column tabContent" id="groups">

							</form>
						</li>
						<li>
							<form className="uk-flex uk-flex-center uk-flex-column tabContent">
								<div className="uk-flex uk-flex-center uk-child-width-1-4 teacher-row">
									<div className="uk-width-1-2">
										<input className="uk-input" type="text"
											   placeholder="Введите ФИО преподавателя"/>
									</div>

									<button className="uk-button uk-button-primary uk-margin-left">Добавить</button>

								</div>
								<div className="uk-flex uk-flex-center uk-child-width-1-4 teacher-row">
									<div className="uk-width-1-2">
										<input className="uk-input" type="text"
											   placeholder="Введите ФИО преподавателя"/>
									</div>

									<button className="uk-button uk-button-primary uk-margin-left">Добавить</button>

								</div>
							</form>
						</li>
						<li>
							<form className="uk-flex uk-flex-center uk-flex-column tabContent">
								<div className="uk-flex uk-flex-center uk-child-width-auto uk-flex-top">
									<div className="uk-margin uk-flex uk-child-width-auto uk-flex-middle">
										<label>
											<input className="uk-input lessonTime-input" type="text" placeholder="ЧЧ"/>
										</label><span
										className="lessonTime-text"> : </span>
										<label>
											<input className="uk-input lessonTime-input" type="text" placeholder="ММ"/>
										</label> <span
										className="lessonTime-text"> -- </span>
										<label>
											<input className="uk-input lessonTime-input" type="text" placeholder="ЧЧ"/>
										</label> <span
										className="lessonTime-text"> : </span>
										<label>
											<input className="uk-input lessonTime-input" type="text" placeholder="ММ"/>
										</label>
									</div>
									<div>
										<button className="uk-button uk-button-primary uk-margin-left">Добавить</button>
									</div>

								</div>
								<div className="uk-flex uk-flex-center uk-child-width-auto uk-flex-top">
									<div className="uk-margin uk-flex uk-child-width-auto uk-flex-middle">
										<label>
											<input className="uk-input lessonTime-input" type="text" placeholder="ЧЧ"/>
										</label><span
										className="lessonTime-text"> : </span>
										<label>
											<input className="uk-input lessonTime-input" type="text" placeholder="ММ"/>
										</label> <span
										className="lessonTime-text"> -- </span>
										<label>
											<input className="uk-input lessonTime-input" type="text" placeholder="ЧЧ"/>
										</label> <span
										className="lessonTime-text"> : </span>
										<label>
											<input className="uk-input lessonTime-input" type="text" placeholder="ММ"/>
										</label>
									</div>
									<div>
										<button className="uk-button uk-button-primary uk-margin-left">Добавить</button>
									</div>
								</div>
							</form>
						</li>
					</ul>*/}
				</div>
			</div>
		)
	}
}
