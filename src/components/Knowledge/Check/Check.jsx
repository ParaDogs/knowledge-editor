import React from "react"

export default class Check extends React.Component {
	constructor(props) {
		super(props)
		const knowledge = this.props.getKnowledge()
		const {classrooms = [], disciplines = [], groups = [], times = [], teachers = []} = knowledge
		const validClassrooms = this.checkClassrooms(classrooms, disciplines)
		const validDisciplines = this.checkDisciplines(disciplines)
		const validGroups = this.checkGroups(groups)
		const validTimes = this.checkTimes(times)
		const validTeachers = this.checkTeachers(teachers, disciplines)
		const invalidArray = [validClassrooms, validDisciplines, validGroups, validTimes, validTeachers].filter(el => {
			console.log('el', el)
			return el.value === false
		})
		console.log('invalidArray', invalidArray)
		if (invalidArray.length === 0) {
			this.props.validate(true)
		}
		this.state = {
			validTeachers, validTimes, validGroups, validClassrooms, validDisciplines, invalidArray,
		}
	}

	checkClassrooms = (classrooms, disciplines) => {
		const isEmpty = classrooms.length === 0
		const classroomsTypes = new Set(classrooms.map(el => el.type))
		const disciplinesTypes = new Set(disciplines.map(el => el.type))
		let necessaryType = null
		for (const value of [...disciplinesTypes]) {
			if (!classroomsTypes.has(value)) {
				necessaryType = value
				break
			}
		}
		let result = {
			value: !isEmpty && necessaryType === null,
			cause: '',
		}
		if (isEmpty) {
			result.cause = 'Аудитории'
		} else if (necessaryType !== null) {
			let typeName = null
			switch (necessaryType) {
				case 'lecture':
					typeName = 'лекционная'
					break
				case 'chemical':
					typeName = 'химическая'
					break
				case 'computer':
					typeName = 'комьютерная'
					break
				case 'physical':
					typeName = 'физическая'
					break
				default:
					typeName = 'необходимая'
			}
			result.cause = `Для проведения занятий нужна ${typeName} аудитория`
		}
		return result
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

	checkTeachers = (teachers, disciplines) => {
		const isEmpty = teachers.length === 0
		const hasDisciplines = teachers.reduce((accum, teacher) => accum && teacher.disciplines.length !== 0, true)
		const teachersDisciplines = [...(new Set(teachers.map(teacher => teacher.disciplines).flat()))]
		console.log('teachersDisciplines', teachersDisciplines)
		const disciplinesWithoutTeachers = disciplines.filter(discipline => !teachersDisciplines.includes(discipline.id))
		console.log('disciplinesWithoutTeachers', disciplinesWithoutTeachers)
		const hasTeachers = disciplinesWithoutTeachers.length === 0
		let result = {
			value: !isEmpty && hasDisciplines && hasTeachers,
			cause: '',
		}
		if (isEmpty) {
			result.cause = 'Преподаватели'
		} else if (!hasDisciplines) {
			result.cause = `Дисциплины преподавателя ${teachers.find(teacher => teacher.disciplines.length === 0).name}`
		} else if (!hasTeachers) {
			result.cause = `Преподаватель для дисциплины ${disciplinesWithoutTeachers[0].name}`
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
				{this.state.invalidArray.length !== 0 &&
				<div>
					<span>Необходимо заполнить следующие пункты</span>
					<ul>
						{this.state.invalidArray.map((el, ind) => <li key={ind}>{el.cause}</li>)}
					</ul>
				</div>
				}
			</React.Fragment>
		)
	}
}