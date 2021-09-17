import API from "@aws-amplify/api"
import { graphqlOperation } from "@aws-amplify/api-graphql"
import { useEffect, useState } from "react"
import { ButtonGroup } from "react-bootstrap"

import {
  onCreateDialog,
  onCreateFrameSet,
  onUpdateDialog,
} from "../../graphql/subscriptions"
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
        fetchFrameSets()
      },
    })

    const updateDialog = API.graphql(
      graphqlOperation(onUpdateDialog)
    ).subscribe({
      next: ({ _, value }) => {
        console.log("onUpdateDialog") // zzz
        // fetchFrameSets()
      },
    })

    const createDialog = API.graphql(
      graphqlOperation(onCreateDialog)
    ).subscribe({
      next: ({ _, value }) => {
        console.log("createDialog") // zzz
        fetchFrameSets()
      },
    })

    return () => {
      createFrameSet.unsubscribe()
      updateDialog.unsubscribe()
      createDialog.unsubscribe()
    }
  }, [])

  async function fetchFrameSets() {
    const { data } = await API.graphql(graphqlOperation(listFrameSets2))
    const items = data?.listFrameSets?.items || []
    const parsedFrameSets = parseFrameSets(items)
    setRowData(parsedFrameSets)
  }

  const parseFrameSets = (items = []) => {
    const output = []
    console.log("items", items) // zzz
    items.forEach((frameSet) => {
      const frames = frameSet.Frames?.items || []
      frames.forEach((frame) => {
        const newFrame = []
        const dialogs = frame?.Dialogs?.items || []

        dialogs.forEach((dialog) => {
          const newDialog = {
            id: dialog.id,
            order: dialog.order,
            dialogId: dialog.id,
            dialogVersion: dialog._version,
            frameSet: frameSet.name,
            frame: frame.name,
            frameId: frame.id,
            text: dialog.text,
            critter: dialog?.Critter?.name,
          }
          newFrame.push(newDialog)
        })
        newFrame.sort(function (a, b) {
          return a.order - b.order
        })
        output.push(newFrame)
      })
    })
    console.log("output", output) // zzz

    const test = output.filter((item) => {
      return item.length > 0
    })
    return test
  }

  console.log("rowData", rowData) // zzz
  return (
    <div className={css.main}>
      <ButtonGroup>
        <AddFrameSetModal />
        <AddFrameModal />
      </ButtonGroup>
      <DraggableTables2 frameSets={rowData}></DraggableTables2>
    </div>
  )
}

export default Dashboard
