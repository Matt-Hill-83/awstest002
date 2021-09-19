import React, { useEffect, useState } from "react"

import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd"
import { Button, ButtonGroup } from "react-bootstrap"

import DragHandleIcon from "@material-ui/icons/DragHandle"
import css from "./DraggableTables2.module.scss"

import {
  createDialog,
  deleteDialog,
  updateDialog,
} from "../../graphql/mutations"
import { graphqlOperation } from "@aws-amplify/api-graphql"
import API from "@aws-amplify/api"

const addDialog = async ({ item, rowIndex }) => {
  const { frameId } = item
  const newDialog = { frameID: frameId, text: "new dialog-", order: rowIndex }
  API.graphql(graphqlOperation(createDialog, { input: newDialog }))
}

const editDialog = async (item) => {
  console.log("editDialog") // zzz
  API.graphql(graphqlOperation(updateDialog, { input: item }))
}

const getItems = (count, offset = 0) =>
  Array.from({ length: count }, (v, k) => k).map((k) => ({
    id: `item-${k + offset}-${new Date().getTime()}`,
    name: `item ${k + offset}`,
  }))

const reorder = (list, startIndex, endIndex) => {
  let result = Array.from(list)

  result.forEach((row, index) => {
    row.prevOrder = index
  })

  const [removed] = result.splice(startIndex, 1)
  result.splice(endIndex, 0, removed)

  // result = resetIndices(result)
  return result
}

const resetIndices = (list) => {
  // Todo: this should return a null if some indices have been reset?
  // Todo: this should return a null if some indices have been reset?
  console.log("resetIndices") // zzz
  console.log("list", list) // zzz

  list.forEach((row, index) => {
    if (row.order !== index) {
      row.order = index
      console.log("row", row) // zzz
      editDialog({
        id: row.dialogId,
        order: index,
        _version: row.dialogVersion,
      })
    }
  })

  return list
}

const move = (source, destination, droppableSource, droppableDestination) => {
  console.log("move") // zzz
  const sourceClone = Array.from(source)
  const destClone = Array.from(destination)
  const [removed] = sourceClone.splice(droppableSource.index, 1)

  destClone.splice(droppableDestination.index, 0, removed)

  const result = {}
  result[droppableSource.droppableId] = sourceClone
  result[droppableDestination.droppableId] = destClone

  console.log("source", source) // zzz
  return result
}

const getItemStyle = (isDragging, draggableStyle) => {
  const styles = {
    // some basic styles to make the items look a bit nicer
    userSelect: "none",

    // styles we need to apply on draggables
    ...draggableStyle,
  }

  if (isDragging) {
    styles.background = "lightgreen"
  }
  return styles
}

const getListStyle = (isDraggingOver) => ({
  background: isDraggingOver ? "lightblue" : "lightgrey",
})

function DraggableTables2(props) {
  const [frameSets, setFrameSets] = useState([])
  console.log("frameSets=============================", frameSets) // zzz

  useEffect(() => {
    console.log("props.frameSets", props.frameSets) // zzz

    const frameSets = props.frameSets || []
    frameSets.forEach((frameSet) => {
      const dialogs = frameSet.dialogs || []

      resetIndices(dialogs)
    })
    // TODO: if they are reset, don't set the inital data
    // TODO: if they are reset, don't set the inital data
    setFrameSets(frameSets)
  }, [props.frameSets])

  function onDragEnd(result) {
    const { source, destination } = result
    console.log("result", result) // zzz

    // dropped outside the list
    if (!destination) {
      return
    }
    const sInd = +source.droppableId
    const dInd = +destination.droppableId

    if (sInd === dInd) {
      const newState = [...frameSets]
      const thisFrame = newState[sInd]
      const dialogs = thisFrame.dialogs || []

      const items = reorder(dialogs, source.index, destination.index)
      thisFrame.dialogs = items
      setFrameSets(newState)

      resetIndices(thisFrame.dialogs)
    } else {
      const result = move(frameSets[sInd], frameSets[dInd], source, destination)
      const newState = [...frameSets]
      newState[sInd] = result[sInd]
      newState[dInd] = result[dInd]

      setFrameSets(newState.filter((group) => group.length))
    }
  }

  const addItem = () => {
    setFrameSets([...frameSets, getItems(1)])
  }

  const deleteItem = async (item) => {
    const { dialogId, dialogVersion } = item

    const input = { id: dialogId, _version: dialogVersion }

    console.log("input", input) // zzz
    const test = await API.graphql(graphqlOperation(deleteDialog, { input }))

    return test
  }

  const addGroup = () => {
    setFrameSets([...frameSets, []])
  }

  const renderHeaderButtons = () => {
    return (
      <ButtonGroup className={css.buttonGroup}>
        <Button onClick={addItem}>+ item</Button>
        <Button onClick={addGroup}>+ group</Button>
        <Button
          className={css.deleteButton}
          // onClick={() => {
          //   addRowBefore({ tableIndex, rowIndex })
          // }}
        >
          <i class="bi bi-plus" />
        </Button>
      </ButtonGroup>
    )
  }

  const getRow = ({ provided, snapshot, item, tableIndex, rowIndex }) => {
    return (
      <div
        ref={provided.innerRef}
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        style={getItemStyle(snapshot.isDragging, provided.draggableProps.style)}
        className={css.row}
      >
        <DragHandleIcon className={css.dragger} />
        <div className={css.rowContent}>
          <div className={css.cell} style={{ width: "20px" }}>
            {item.frame}
          </div>
          <div className={css.cell} style={{ width: "20px" }}>
            {item.order}
          </div>
          <div className={css.cell} style={{ width: "80px" }}>
            {item.critter}
          </div>
          <div className={css.cell} style={{ width: "120px" }}>
            {item.text}
          </div>
          <input></input>
          <ButtonGroup className={css.rowButtons}>
            <Button
              className={css.deleteButton}
              onClick={() => {
                deleteItem(item)
              }}
            >
              <i class="bi bi-trash" />
            </Button>

            <Button
              className={css.deleteButton}
              onClick={() => {
                addDialog({ item, tableIndex, rowIndex })
              }}
            >
              <i class="bi bi-plus" />
            </Button>
          </ButtonGroup>
        </div>
      </div>
    )
  }
  console.log("render draggable tables++++++++++++++++++++++++++++++++++++++++") // zzz
  return (
    <div className={css.main}>
      {renderHeaderButtons()}
      <div className={css.groupContainer}>
        <DragDropContext onDragEnd={onDragEnd}>
          {/* Create a Drop Zone for each FrameSet */}
          {frameSets.map((table, tableIndex) => {
            const table2 = table?.dialogs || []

            return (
              <Droppable key={tableIndex} droppableId={`${tableIndex}`}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    style={getListStyle(snapshot.isDraggingOver)}
                    className={css.group}
                    {...provided.droppableProps}
                  >
                    {/* Create a draggable item for each row in FrameSet */}
                    {table2.map((item, rowIndex) => {
                      const frameId = table.frameId

                      console.log(
                        "frameId----------------------------",
                        frameId
                      ) // zzz

                      return (
                        <Draggable
                          key={item.id}
                          draggableId={item.id}
                          index={rowIndex}
                        >
                          {(provided, snapshot) =>
                            getRow({
                              provided,
                              snapshot,
                              item,
                              tableIndex,
                              rowIndex,
                            })
                          }
                        </Draggable>
                      )
                    })}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            )
          })}
        </DragDropContext>
      </div>
    </div>
  )
}

export default DraggableTables2
