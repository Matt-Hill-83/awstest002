import { BrowserRouter, Route, Switch } from "react-router-dom"
import { Container } from "semantic-ui-react"

import { AmplifyAuthenticator, AmplifySignOut } from "@aws-amplify/ui-react"
import Amplify from "aws-amplify"
import awsConfig from "./aws-exports"

import Dashboard from "./components/Dashboard/Dashboard"

import css from "./App.module.scss"
import "bootstrap/dist/css/bootstrap.min.css"

Amplify.configure(awsConfig)

function DashBoard() {
  return (
    <AmplifyAuthenticator>
      <Container style={{ height: "100vh" }}>
        <AmplifySignOut />

        <div className={css.main}>
          <BrowserRouter>
            <Switch>
              <Route path="/">
                <Dashboard />
              </Route>
            </Switch>
          </BrowserRouter>
        </div>
      </Container>
    </AmplifyAuthenticator>
  )
}

export default DashBoard
