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

import MyInput from "../MyInput/MyInput"
import MyMultiSelect from "../MyMultiSelect/MyMultiSelect"

const addDialog = async ({ item, rowIndex }) => {
  const { frameId } = item
  const newDialog = { frameID: frameId, text: "new dialog-", order: rowIndex }
  API.graphql(graphqlOperation(createDialog, { input: newDialog }))
}

const editDialog = async (item) => {
  console.log("editDialog") // zzz
  const response = API.graphql(graphqlOperation(updateDialog, { input: item }))
  return response
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

let frameToDroppableIdMap = {}

function DraggableTables2(props) {
  const { refetchData } = props
  const [frameSet, setFrameSets] = useState([])
  console.log("frameSet=============================", frameSet) // zzz

  useEffect(() => {
    console.log("props.frameSet", props.frameSet) // zzz

    const frameSet = props.frameSet || []
    frameSet.forEach((frame) => {
      const dialogs = frame.dialogs || []

      resetIndices(dialogs)
      // TODO: if they are reset, don't set the inital data
      // TODO: if they are reset, don't set the inital data
    })

    setFrameSets(frameSet)
  }, [props.frameSet])

  async function onDragEnd(result) {
    const { source, destination } = result
    console.log("result", result) // zzz

    // dropped outside the list
    if (!destination) {
      return
    }
    const sourceTableInd = +source.droppableId
    const destTableInd = +destination.droppableId

    const sourceDialogInd = source.index
    const destDialogInd = destination.index

    if (sourceTableInd === destTableInd) {
      const newState = [...frameSet]
      const thisFrame = newState[sourceTableInd]
      const dialogs = thisFrame.dialogs || []

      thisFrame.dialogs = reorder(dialogs, sourceDialogInd, destDialogInd)
      setFrameSets(newState)

      resetIndices(thisFrame.dialogs)
    } else {
      // move item to new table
      const sourceObjClone = { ...frameSet[sourceTableInd] }
      const destObjClone = { ...frameSet[destTableInd] }
      const sourceDialogs = sourceObjClone.dialogs
      const destDialogs = destObjClone.dialogs

      const [removed] = sourceDialogs.splice(sourceDialogInd, 1)
      destDialogs.splice(destDialogInd, 0, removed)

      const newState = [...frameSet]
      newState[sourceTableInd] = sourceObjClone
      newState[destTableInd] = destObjClone

      removed.frameId = destObjClone.frameId

      const test = await editDialog({
        id: removed.dialogId,
        order: destDialogInd,
        frameID: destObjClone.frameId,
        _version: removed.dialogVersion,
      })

      console.log("test", test) // zzz

      // update dialogVersion to item will update again when you reset indices
      removed.dialogVersion = removed.dialogVersion + 1

      resetIndices(sourceDialogs)
      resetIndices(destDialogs)

      refetchData()
      // setFrameSets(newState)
    }
  }

  const addItem = () => {
    setFrameSets([...frameSet, getItems(1)])
  }

  const deleteItem = async (item) => {
    const { dialogId, dialogVersion } = item
    const input = { id: dialogId, _version: dialogVersion }
    await API.graphql(graphqlOperation(deleteDialog, { input }))
  }

  const addGroup = () => {
    setFrameSets([...frameSet, []])
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
    const onBlurText = (e) => {
      console.log("etarget", e.target.value) // zzz
      const { dialogId } = item
      console.log("item", item) // zzz
      editDialog({
        id: dialogId,
        text: e.target.value,
        _version: item.dialogVersion,
      })
    }

    const updateRestaurant = (newValue) => {
      console.log("newValue", newValue) // zzz
    }

    const RestaurantNames = {
      CHILLIS: "Chilli's",
      APPLEBEES: "Applebees",
      BURGERKING: "Burger King",
      DOUNTSHOPPE: "Donut Shoppe",
    }

    const restaurantList = [
      { title: RestaurantNames.APPLEBEES },
      { title: RestaurantNames.BURGERKING },
      { title: RestaurantNames.CHILLIS },
      { title: RestaurantNames.DOUNTSHOPPE },
    ]

    const multiSelectProps = {
      inputWidth: 200,
      initialValue: restaurantList[0].title,
      listItems: restaurantList,
      className: css.multiPicker,

      onChange: (newValue) => updateRestaurant({ newValue }),
    }

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
          <MyMultiSelect {...multiSelectProps} />
          <MyInput
            type="text"
            value={item.text}
            className={css.cell}
            style={{ width: "120px" }}
            onBlur={onBlurText}
          />
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
  frameToDroppableIdMap = {}

  frameSet.forEach((frame, index) => {
    frameToDroppableIdMap[index] = frame.frameId
  })
  console.log("frameToDroppableIdMap", frameToDroppableIdMap) // zzz
  return (
    <div className={css.main}>
      {renderHeaderButtons()}
      <div className={css.groupContainer}>
        <DragDropContext onDragEnd={onDragEnd}>
          {/* Create a Drop Zone for each FrameSet */}
          {frameSet.map((frame, tableIndex) => {
            console.log("frame", frame) // zzz
            const dialogs = frame?.dialogs || []

            return (
              // <Droppable key={tableIndex} droppableId={frame.frameId}>
              <Droppable key={tableIndex} droppableId={`${tableIndex}`}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    style={getListStyle(snapshot.isDraggingOver)}
                    className={css.group}
                    {...provided.droppableProps}
                  >
                    {/* Create a draggable item for each row in FrameSet */}
                    {dialogs.map((item, rowIndex) => {
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
