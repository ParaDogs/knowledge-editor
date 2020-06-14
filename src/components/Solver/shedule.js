const knowledge = JSON.parse(localStorage.getItem('knowledge'))
const data = JSON.parse(localStorage.getItem('data'))
const WEEK_DAYS = ["Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"]
const NUM_WEEKS_IN_SEMESTER = "ПОСЧИТАТЬ СКОЛЬКО НЕДЕЛЬ В СЕМЕСТРЕ"
const CLASS_TIMES = knowledge["times"]

function get_groups() {
	return knowledge["groups"]
}

// Возвращает дисциплины группы
function get_disciplines_for_group(group) {
	return group["disciplines"]
}

function get_teachers() {
	return knowledge["teachers"]
}

// Возвращает массив ID дисциплин преподавателя
function get_disciplines_for_teacher(teacher) {
	const chosenTeacher = knowledge["teachers"].find(el => el.id === teacher.id)
	return chosenTeacher["disciplines"]
}

function filter_teachers_for_discipline(teachers, discipline) {
	return teachers.filter(teacher => {
		return get_disciplines_for_teacher(teacher).includes(discipline)
	})
}

function get_classrooms() {
	return knowledge["classrooms"]
}

function get_classroom_type(classroom) {
	const chosenClassroom = knowledge["classrooms"].find(el => el.id === classroom.id)
	return chosenClassroom["type"]
}

// Возвращает тип аудитории по её ID
function get_classroom_types_for_discipline(disciplineId) {
	const chosenDiscipline = knowledge["disciplines"].find(el => el.id === disciplineId)
	return chosenDiscipline["type"]
}

// Возвращает аудитории в которых можно проводить дисциплину
function filter_classrooms_for_discipline(classrooms, disciplineId) {
	return classrooms.filter(classroom => get_classroom_types_for_discipline(disciplineId) === classroom.type)
}

function get_days_for_teacher(teacher) {
	const result = data["days"].find(el => el.id === teacher.id)
	if (!result) {
		throw new Error('Не указаны дни для преподавателя')
	}
	return result.days
}

//на выходе все возможные проекты расписания
function get_lessons() {
	//расписание - это (day, ?multiplicity?, time, classroom) -> (teacher, discipline, group)
	let lessons = [] //все возможные пары, без проверки на конфликты и пересечения
	//для каждой группы
	get_groups().forEach(group => {
		//для каждой дисциплины группы
		get_disciplines_for_group(group).forEach(disciplineId => {
			//для каждого преподавателя (подходящего)
			filter_teachers_for_discipline(get_teachers(), disciplineId).forEach(teacher => {
				//для каждой аудитории (подходящей по типу)
				filter_classrooms_for_discipline(get_classrooms(), disciplineId).forEach(classroom => {
					//для каждого дня недели (подходящего для преподавателя)
					get_days_for_teacher(teacher).forEach(day => {
						//для каждого времени пары (не занятого)
						CLASS_TIMES.forEach(time => {
							let discipline = knowledge.disciplines.find(el => el.id === disciplineId)
							//находим возможную пару
							lessons.push({day, time, classroom, teacher, discipline, group})
						})
					})
				})
			})
		})
	})
	return lessons
}

// ОНТОЛОГИЧЕСКИЕ СОГЛАШЕНИЯ
// ниже по lesson понимается шестёрка [day,time,classroom,teacher,discipline,group]

// Время начала занятия меньше времени конца занятия (вроде проверяется при вводе данных)
// Конец занятия наступает по прошествии длительности занятия от начала занятия (вроде проверяется при вводе данных)
// Время занятий не пересекается (если начала занятий не совпадают)
function is_intersect_lessons(lessonA, lessonB) {
	return lessonA.time === lessonB.time
}

// Дата начала семестра раньше даты конца семестра (вроде проверяется при вводе данных)
// Даты начала семестра и конца семестра корректны {високосность, февраль, всё такое} (вроде проверяется при вводе данных)
// Группа должна слушать только свои предметы (учитывается в переборе get_lessons, когда дисциплины фильтруются для группы)
// Преподаватель должен вести только свои предметы (учитывается в переборе get_lessons)
// Дисциплины проходят в соответствующих по типу аудиториях (учитывается в переборе get_lessons)
// Преподаватель не может вести в разных аудиториях в одно время
function is_intersect_teacher(lessonA, lessonB) {
	return (lessonA.time === lessonB.time) && (lessonA.classroom !== lessonB.classroom) && (lessonA.teacher === lessonB.teacher)
}

// Группа не может присутствовать в разных аудиториях в одно время
function is_intersect_group(lessonA, lessonB) {
	return (lessonA.time === lessonB.time) && (lessonA.classroom !== lessonB.classroom) && (lessonA.group === lessonB.group)
}

// Преподаватель ведёт дисциплины в удобные для него дни недели (учитывается в переборе get_lessons)
// ДОПОЛНИТЕЛЬНО - НЕТ В ОТЧЁТЕ Группа слушает столько часов дисциплины в неделю, сколько положено ей по плану
function correct_hours_for_discipline(group, discipline, schedule, NUM_WEEKS_IN_SEMESTER) {
	let hours = knowledge["groups"].find(el => el.id === group.id)["times"]
	let curr_hours = 0
	schedule.forEach(lesson => {
		if (lesson.group === group && lesson.discipline === discipline) {
			curr_hours += 2 // в паре пара (2) часов
		}
	})
	return hours / NUM_WEEKS_IN_SEMESTER === curr_hours
}

// Итого, нужно проверить только 3 + 1 соглашения

// проверка, что расписание непротиворечивое
function is_correct_schedule(schedule) {
	if (schedule === []) {
		return true
	}
	schedule.forEach(lessonA => {
		schedule.forEach(lessonB => {
			if (lessonA !== lessonB) {
				if (is_intersect_teacher(lessonA, lessonB) || is_intersect_lessons(lessonA, lessonB) || is_intersect_group(lessonA, lessonB)) {
					return false
				}
			}
		})
	})
	return true
}

// часы на дисциплины стоят корректно (последняя проверка)
function is_correct_hours(schedule, NUM_WEEKS_IN_SEMESTER) {
	let groups = get_groups()
	groups.forEach(group => {
		get_disciplines_for_group(group).forEach(discipline => {
			if (!correct_hours_for_discipline(group, discipline, schedule, NUM_WEEKS_IN_SEMESTER)) {
				return false
			}
		})
	})
	return true
}

// предрасписание - это кусок будущего корректного расписания, где не учитываются часы на дисциплины
function get_preschedule(preschedule, lessons, num_lesson) {
	if (lessons.length > num_lesson + 1) {
		if (is_correct_schedule([...preschedule, lessons[num_lesson]])) {
			return get_preschedule([...preschedule, lessons[num_lesson]], lessons, num_lesson + 1)
		} else {
			return get_preschedule(preschedule, lessons, num_lesson + 1)
		}
	} else {
		return preschedule
	}
}

function get_correct_schedules(NUM_WEEKS_IN_SEMESTER) {
	let lessons = get_lessons()
	let correct_schedules = []
	for (let i = 0; i < lessons.length; i++) {
		let preschedule = get_preschedule([], lessons, i)
		if (is_correct_hours(preschedule, NUM_WEEKS_IN_SEMESTER)) {
			correct_schedules.push(preschedule)
			// хз как выводить при этом ошибки (формировать объяснения, почему не сформировано расписание)
		}
	}
	return correct_schedules
}