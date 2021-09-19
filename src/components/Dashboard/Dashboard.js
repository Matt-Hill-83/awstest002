import API from "@aws-amplify/api"
import { graphqlOperation } from "@aws-amplify/api-graphql"
import { useEffect, useState } from "react"
import { ButtonGroup } from "react-bootstrap"

import {
  onCreateDialog,
  onCreateFrameSet,
  onDeleteDialog,
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
        fetchFrameSets()
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

    const deleteDialog = API.graphql(
      graphqlOperation(onDeleteDialog)
    ).subscribe({
      next: ({ _, value }) => {
        console.log("deleteDialog") // zzz
        fetchFrameSets()
      },
    })

    return () => {
      createFrameSet.unsubscribe()
      updateDialog.unsubscribe()
      createDialog.unsubscribe()
      deleteDialog.unsubscribe()
    }
  }, [])

  async function fetchFrameSets() {
    const { data } = await API.graphql(graphqlOperation(listFrameSets2))
    const items = [data?.listFrameSets?.items[0] || []]
    console.log("items", items) // zzz
    const parsedFrameSets = parseFrameSets(items)
    console.log("parsedFrameSets", parsedFrameSets) // zzz
    setRowData(parsedFrameSets)
  }

  const parseFrameSets = (items = []) => {
    const output = []
    console.log("items", items) // zzz
    items.forEach((frameSet) => {
      const frames = frameSet.Frames?.items || []
      frames.forEach((frame) => {
        const newFrame = {
          frameId: frame.id,
          frameSetId: frameSet.id,
          dialogs: [],
        }
        let dialogs = frame?.Dialogs?.items || []

        dialogs = dialogs.filter((item) => !item._deleted)

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
          newFrame.dialogs.push(newDialog)
        })
        newFrame.dialogs.sort(function (a, b) {
          return a.order - b.order
        })
        output.push(newFrame)
      })
    })
    console.log("output", output) // zzz

    const test = output.filter((item) => {
      return item?.dialogs.length > 0
    })
    console.log("test", test) // zzz
    return test
  }

  console.log("rowData", rowData) // zzz
  return (
    <div className={css.main}>
      <ButtonGroup>
        <AddFrameSetModal />
        <AddFrameModal />
      </ButtonGroup>
      <DraggableTables2 frameSet={rowData}></DraggableTables2>
    </div>
  )
}

export default Dashboard
