import { BrowserRouter, Route, Switch } from "react-router-dom"
import { Container } from "semantic-ui-react"

import { AmplifyAuthenticator, AmplifySignOut } from "@aws-amplify/ui-react"
import Amplify from "aws-amplify"
import awsConfig from "../../aws-exports"

import MainHeader from "../../components/headers/MainHeader"
import Dashboard from "../Dashboard/Dashboard"

import css from "./Main.module.scss"

Amplify.configure(awsConfig)

function DashBoard() {
  return (
    <AmplifyAuthenticator>
      <Container style={{ height: "100vh" }}>
        <AmplifySignOut />

        <div className={css.main}>
          <MainHeader />
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
