import React from "react"

export default class Check extends React.Component {
	constructor(props) {
		super(props)
		const knowledge = this.props.getKnowledge()
		const {classrooms = [], disciplines, groups, times, teachers} = knowledge
		const validClassrooms = this.checkClassrooms(classrooms)
		const validDisciplines = this.checkDisciplines(disciplines || [])
		const validGroups = this.checkGroups(groups || [])
		const validTimes = this.checkTimes(times || [])
		const validTeachers = this.checkTeachers(teachers || [])
		const valids = [validClassrooms, validDisciplines, validGroups, validTimes, validTeachers].filter(el => {
			console.log('el', el)
			return el.value === false
		})
		console.log('valids', valids)
		if (valids.length === 0) {
			this.props.validate(true)
		}
		this.state = {
			validTeachers, validTimes, validGroups, validClassrooms, validDisciplines, valids,
		}
	}

	checkClassrooms = classrooms => {
		return {
			value: classrooms.length !== 0,
			cause: 'Аудитории',
		}
	}

	checkDisciplines = disciplines => {
		return {
			value: disciplines?.length !== 0,
			cause: 'Дисциплины',
		}
	}

	checkGroups = groups => {
		const isEmpty = groups?.length === 0
		const hasDisciplines = groups?.reduce((accum, group) => accum && group.disciplines.length !== 0, true)
		let result = {
			value: !isEmpty && hasDisciplines,
			cause: '',
		}
		if (isEmpty) {
			result.cause = 'Группы'
		} else if (!hasDisciplines) {
			result.cause = `Дисциплины группы ${groups?.find(group => group.disciplines.length === 0).name}`
		}
		return result
	}

	checkTimes = times => {
		return {
			value: times?.length !== 0,
			cause: 'Время занятий',
		}
	}

	checkTeachers = teachers => {
		const isEmpty = teachers.length === 0
		const hasDisciplines = teachers.reduce((accum, teacher) => accum && teacher.disciplines.length !== 0, true)
		let result = {
			value: !isEmpty && hasDisciplines,
			cause: '',
		}
		if (isEmpty) {
			result.cause = 'Преподаватели'
		} else if (!hasDisciplines) {
			result.cause = `Дисциплины преподавателя ${teachers.find(teacher => teacher.disciplines.length === 0).name}`
		}
		return result
	}

	present = valid => {
		return valid.value ? <i className="fas fa-check-circle fa-lg" style={{color: '#1e87f0'}}/> :
			<i className="fas fa-times-circle fa-lg" style={{color: '#f0506e'}}/>
	}

	render() {
		return (
			<React.Fragment>
				<table className="uk-table  uk-table-divider uk-table-middle">
					<thead>
					<tr>
						<th>Название</th>
						<th>Статус</th>
					</tr>
					</thead>
					<tbody>
					<tr>
						<td>Аудитории</td>
						<td>{this.present(this.state.validClassrooms)}</td>
					</tr>
					<tr>
						<td>Дисциплины</td>
						<td>{this.present(this.state.validDisciplines)}</td>
					</tr>
					<tr>
						<td>Группы</td>
						<td>{this.present(this.state.validGroups)}</td>
					</tr>
					<tr>
						<td>Преподаватели</td>
						<td>{this.present(this.state.validTeachers)}</td>
					</tr>
					<tr>
						<td>Время занятий</td>
						<td>{this.present(this.state.validTimes)}</td>
					</tr>
					</tbody>
				</table>
				{this.state.valids.length !== 0 &&
				<div>
					<span>Необходимо заполнить следующие пункты</span>
					<ul>
						{this.state.valids.map((el, ind) => <li key={ind}>{el.cause}</li>)}
					</ul>
				</div>
				}
			</React.Fragment>
		)
	}
}