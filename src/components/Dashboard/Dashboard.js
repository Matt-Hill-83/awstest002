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
        // console.log("value", value) // zzz
        fetchFrameSets()
      },
    })

    return () => {
      createFrameSet.unsubscribe()
    }
  }, [])

  async function fetchFrameSets() {
    const { data } = await API.graphql(graphqlOperation(listFrameSets2))
    const items = data?.listFrameSets?.items || []
    const parsedFrameSets = parseFrameSets(items)
    setRowData(parsedFrameSets)
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
          console.log("dialog.id", dialog.id) // zzz
          const newDialog = {
            id: dialog.id,
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

    const test = output.filter((item) => {
      return item.length > 0
    })
    return test
    return output
  }

  const renderRows = () => {
    return rowData[0].map((row) => {
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
      {/* {renderRows()} */}
      {/* <DraggableTables></DraggableTables> */}
      <DraggableTables2 frameSets={rowData}></DraggableTables2>
      {/* <DraggableTables2 frameSets={[rowData]}></DraggableTables2> */}
    </div>
  )
}

export default Dashboard
