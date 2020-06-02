import React from "react"
import {Redirect, Route, Switch} from "react-router-dom"
import Semester from "./Semester/Semester"
import Days from "./Days/Days"

export default class Data extends React.Component {
	constructor(props) {
		super(props)
		let data = JSON.parse(localStorage.getItem('data'))
		if (data == null) {
			data = {}
		}
		this.state = {
			data: data,
		}
		this.getData = this.getData.bind(this)
		this.setData = this.setData.bind(this)
		this.getKnowledge = this.getKnowledge.bind(this)
		this.setKnowledge = this.setKnowledge.bind(this)
	}

	getData() {
		return this.state.data
	}

	setData(newData) {
		this.setState({
			data: newData,
		})
		const stringData = JSON.stringify(newData)
		localStorage.setItem('data', stringData)
	}

	getKnowledge() {
		let knowledge = JSON.parse(localStorage.getItem('knowledge'))
		if (knowledge == null) {
			knowledge = {}
		}
		return knowledge
	}

	setKnowledge(newKnowledge) {
		const stringKnowledge = JSON.stringify(newKnowledge)
		localStorage.setItem('knowledge', stringKnowledge)
	}

	componentDidMount() {
		document.title = "Редактор данных"
	}

	render() {
		return (
			<div className="uk-width-expand">
				<div>
					<form className="uk-flex uk-flex-center uk-flex-column tabContent">
						<Switch>
							<Redirect exact from="/data" to="/data/semester"/>
							<Route path="/data/semester">
								<Semester getData={this.getData}
										  setData={this.setData}/>
							</Route>
							<Route path="/data/days">
								<Days days={this.state.data.days}
									  getData={this.getData}
									  setData={this.setData}
									  setKnowledge={this.setKnowledge}
									  getKnowledge={this.getKnowledge}/>
							</Route>
						</Switch>
					</form>
				</div>
			</div>
		)
	}
}