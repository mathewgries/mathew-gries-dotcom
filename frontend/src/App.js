import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { Home } from './app/Home'
import { Projects } from './app/Projects'
import { ConverterPage } from './features/converter/ConverterPage'
import { BorderPreview } from './features/borderPreview/BorderPreview'
import { CalculatorPage } from './features/calculator/CalculatorPage'
import { NotFound } from './app/NotFound'

import { Navbar } from './app/Navbar'

function App() {
  return (
    <div>
      <div className="nav-container">
        <Navbar />
      </div>
      <div className="app-container">
        <div>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/projects" component={Projects} />
            <Route exact path="/bin2dec" component={ConverterPage} />
            <Route exact path="/border-preview" component={BorderPreview} />
            <Route exact path="/calculator" component={CalculatorPage} />
            <Route>
              <NotFound />
            </Route>
            <Redirect to="/" />
          </Switch>
        </div>
      </div>
    </div>
  )
}

export default App
