import React from 'react'
import {Link} from "react-router-dom"

export default function Sidebar() {
	return (
		<div className="uk-width-1-5 sidebar">
			<div className="uk-width-expand  uk-padding uk-padding-remove-right">
				<ul className="uk-nav-default uk-nav-parent-icon" data-uk-nav="multiple: true">
					<li className="uk-parent">
						{/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
						<a href="#">Редактор знаний</a>
						<ul className="uk-nav-sub" id="knowledgeEditor-switcher">
							<li><Link to="/knowledge/classrooms">Аудитории</Link></li>
							<li><Link to="/knowledge/disciplines">Дисциплины</Link></li>
							<li><Link to="/knowledge/groups">Группы</Link></li>
							<li><Link to="/knowledge/teachers">Преподаватели</Link></li>
							<li><Link to="/knowledge/lessonTime">Время занятий</Link></li>
						</ul>
					</li>
					<li className="uk-parent">
						{/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
						<a href="#">Редактор данных</a>
						<ul className="uk-nav-sub">
							<li><Link to="/data/semester">Семестр</Link></li>
							<li><Link to="/data/teachersDays">Дни преподавателей</Link></li>
						</ul>
					</li>
					<li className="uk-parent">
						{/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
						<a href="#">Решатель задач</a>
						<ul className="uk-nav-sub">
							{/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
							<li><a href="#">Составить расписание</a></li>
						</ul>
					</li>
				</ul>
			</div>
		</div>
	)
}