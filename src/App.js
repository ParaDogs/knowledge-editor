import React from 'react'
import {Switch, Route, Redirect} from 'react-router-dom'
import Sidebar from "./components/Sidebar/Sidebar.jsx"
import Knowledge from "./components/Knowledge/Knowledge.jsx"
import Solver from "./components/Solver/Solver"
import Data from "./components/Data/Data"
import 'uikit/dist/js/uikit.min'
import 'uikit/dist/css/uikit.min.css'
import './main.sass'

function App() {
	return (
		<React.Fragment>
			<Sidebar/>
			<Switch>
				<Redirect exact from="/" to="knowledge"/>
				<Route path='/knowledge' component={Knowledge}/>
				<Route path='/data' component={Data}/>
				<Route path='/solver' component={Solver}/>
			</Switch>
		</React.Fragment>
	)
}

export default App
