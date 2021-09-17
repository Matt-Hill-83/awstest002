import React, { useEffect, useState } from "react"

import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd"
import { Button, ButtonGroup } from "react-bootstrap"

import DragHandleIcon from "@material-ui/icons/DragHandle"
import css from "./DraggableTables2.module.scss"

import { createDialog, updateDialog } from "../../graphql/mutations"
import { graphqlOperation } from "@aws-amplify/api-graphql"
import API from "@aws-amplify/api"

const addDialog = async ({ item }) => {
  console.log("item", item) // zzz

  const { frameId } = item
  console.log("frameId", frameId) // zzz
  const newDialog = { frameID: frameId, text: "new dialog--x-" }

  const test = await API.graphql(
    graphqlOperation(createDialog, { input: newDialog })
  )
  return test
}

const editDialog = async (item) => {
  console.log("item", item) // zzz

  const test = await API.graphql(
    graphqlOperation(updateDialog, { input: item })
  )
  return test
}

const getItems = (count, offset = 0) =>
  Array.from({ length: count }, (v, k) => k).map((k) => ({
    id: `item-${k + offset}-${new Date().getTime()}`,
    name: `item ${k + offset}`,
  }))

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list)

  result.forEach((row, index) => {
    row.prevOrder = index
  })

  const [removed] = result.splice(startIndex, 1)
  result.splice(endIndex, 0, removed)

  result.forEach((row, index) => {
    console.log("row.order", row.order) // zzz
    // if (row.order === undefined || row.order === null || row.order === 2) {
    //   console.log("row", row) // zzz
    //   editDialog({
    //     id: row.dialogId,
    //     order: index,
    //     text: row.text + index,
    //     _version: row.dialogVersion,
    //   })
    // }
    if (row.prevOrder !== index) {
      console.log("row.prevOrder", row.prevOrder) // zzz
      console.log("index", index) // zzz
      console.log("row+++", row) // zzz

      editDialog({
        id: row.dialogId,
        order: index,
        text: row.text + index,
        _version: row.dialogVersion,
      })
    }
  })

  return result
}

const move = (source, destination, droppableSource, droppableDestination) => {
  const sourceClone = Array.from(source)
  const destClone = Array.from(destination)
  const [removed] = sourceClone.splice(droppableSource.index, 1)

  destClone.splice(droppableDestination.index, 0, removed)

  const result = {}
  result[droppableSource.droppableId] = sourceClone
  result[droppableDestination.droppableId] = destClone

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
  const [frameSets, setFrameSets] = useState([getItems(10), getItems(5, 10)])

  useEffect(() => {
    setFrameSets(props.frameSets)
  }, [props.frameSets])

  function onDragEnd(result) {
    const { source, destination } = result

    // dropped outside the list
    if (!destination) {
      return
    }
    const sInd = +source.droppableId
    const dInd = +destination.droppableId

    if (sInd === dInd) {
      const items = reorder(frameSets[sInd], source.index, destination.index)
      const newState = [...frameSets]
      newState[sInd] = items
      setFrameSets(newState)
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

  const addRowBefore = () => {
    setFrameSets([...frameSets, getItems(1)])
  }

  const addRowAfter = () => {
    setFrameSets([...frameSets, getItems(1)])
  }

  const deleteItem = ({ ind, index }) => {
    const newState = [...frameSets]
    newState[ind].splice(index, 1)
    setFrameSets(newState.filter((group) => group.length))
  }

  const addGroup = () => {
    setFrameSets([...frameSets, []])
  }

  const renderHeaderButtons = () => {
    return (
      <ButtonGroup className={css.buttonGroup}>
        <Button onClick={addItem}>+ item</Button>
        <Button onClick={addGroup}>+ group</Button>
      </ButtonGroup>
    )
  }

  const getRow = ({ provided, snapshot, item, ind, index }) => {
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
          {/* <i class="bi bi-justify"></i> */}
          {/* <div className={css.cell}>{item.frameSet}</div> */}
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
                deleteItem({ ind, index })
              }}
            >
              <i class="bi bi-trash" />
            </Button>
            <Button
              className={css.deleteButton}
              onClick={() => {
                addRowBefore({ ind, index })
              }}
            >
              <i class="bi bi-plus" />
            </Button>
            <Button
              className={css.deleteButton}
              onClick={() => {
                addDialog({ item, ind, index })
              }}
            >
              <i class="bi bi-alarm" />
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
          {frameSets.map((el, ind) => (
            <Droppable key={ind} droppableId={`${ind}`}>
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  style={getListStyle(snapshot.isDraggingOver)}
                  className={css.group}
                  {...provided.droppableProps}
                >
                  {el.map((item, index) => (
                    <Draggable
                      key={item.id}
                      draggableId={item.id}
                      index={index}
                    >
                      {(provided, snapshot) =>
                        getRow({ provided, snapshot, item, ind, index })
                      }
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
        </DragDropContext>
      </div>
    </div>
  )
}

export default DraggableTables2
