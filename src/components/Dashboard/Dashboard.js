import API from "@aws-amplify/api"
import { graphqlOperation } from "@aws-amplify/api-graphql"
import { useEffect, useState } from "react"
import { ButtonGroup } from "react-bootstrap"

import { onCreateFrameSet } from "../../graphql/subscriptions"
import { listFrameSets2 } from "../../myQraphql/myQueries"

import AddFrameModal from "../AddFrameModal/AddFrameModal"
import AddFrameSetModal from "../AddFrameSetModal/AddFrameSetModal"
import DraggableTables2 from "../DraggableTables2/DraggableTables2"

import css from "./Dashboard.module.scss"

function Dashboard() {
  const [rowData, setRowData] = useState([])

  useEffect(() => {
    fetchFrameSets()
  }, [])

  useEffect(() => {
    const createFrameSet = API.graphql(
      graphqlOperation(onCreateFrameSet)
    ).subscribe({
      next: ({ _, value }) => {
        console.log("value", value) // zzz
        fetchFrameSets()
      },
    })

    return () => {
      createFrameSet.unsubscribe()
    }
  }, [])

  async function fetchFrameSets() {
    const { data } = await API.graphql(graphqlOperation(listFrameSets2))
    // const { data } = await API.graphql(graphqlOperation(listFrameSets))
    console.log("data", data) // zzz
    const items = data?.listFrameSets?.items || []
    console.log("items", items) // zzz
    const parsedFrameSets = parseFrameSets(items)
    console.log("parsedFrameSets", parsedFrameSets) // zzz
    setRowData(items)
  }

  // TODO : parse GQL into

  const parseFrameSets = (items = []) => {
    const output = []
    items.forEach((frameSet) => {
      const frames = frameSet.Frames?.items || []
      frames.forEach((frame) => {
        const newFrame = []
        const dialogs = frame?.Dialogs?.items || []

        console.log("frames?.Dialogs?.items", frame?.Dialogs?.items) // zzz
        dialogs.forEach((dialog) => {
          console.log("dialog.text", dialog.text) // zzz
          const newDialog = {
            frameSet: frameSet.name,
            frame: frame.name,
            text: dialog.text,
            critter: dialog?.Critter?.name,
          }
          newFrame.push(newDialog)
        })
        output.push(newFrame)
      })
    })
    console.log("output", output) // zzz
  }

  const renderRows = () => {
    return rowData.map((row) => {
      return <div>{row.name}</div>
    })
  }

  console.log("rowData", rowData) // zzz
  return (
    <div className={css.main}>
      <ButtonGroup>
        <AddFrameSetModal />
        <AddFrameModal />
      </ButtonGroup>
      {renderRows()}
      {/* <DraggableTables></DraggableTables> */}
      <DraggableTables2 frameSets={[rowData]}></DraggableTables2>
    </div>
  )
}

export default Dashboard
