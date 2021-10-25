import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import { Home } from './app/Home'
import { ProjectsList } from './app/ProjectsList'
import { ConverterPage } from './features/converter/ConverterPage'
import { BorderPreview } from './features/borderPreview/BorderPreview'
import { CalculatorPage } from './features/calculator/CalculatorPage'
import { ChristmasLights } from './features/christmasLights/ChristmasLights'
import { NotFound } from './app/NotFound'

export default function Routes() {
  return (
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>

      <Route exact path="/projects">
        <ProjectsList />
      </Route>

      <Route exact path="/bin2dec">
        <ConverterPage />
      </Route>

      <Route exact path="/border-preview">
        <BorderPreview />
      </Route>

      <Route exact path="/calculator">
        <CalculatorPage />
      </Route>

			<Route exact path="/christmas-lights">
				<ChristmasLights/>
			</Route>

      <Route>
        <NotFound />
      </Route>

      <Redirect to="/" />
    </Switch>
  )
}
