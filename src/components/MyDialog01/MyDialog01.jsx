import React from "react"
import Button from "@material-ui/core/Button"
import Dialog from "@material-ui/core/Dialog"
import DialogActions from "@material-ui/core/DialogActions"
import DialogContent from "@material-ui/core/DialogContent"
import DialogTitle from "@material-ui/core/DialogTitle"

import { Formik, Form, Field, ErrorMessage } from "formik"
import * as Yup from "yup"
import Amplify, { API, graphqlOperation } from "aws-amplify"

import { createFrameSet } from "../../graphql/mutations"

import css from "./MyDialog01.module.scss"

export default function MyDialog01() {
  const [open, setOpen] = React.useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    // onSubmit()
    setOpen(false)
  }

  const initialValues = { name: "", description: "" }
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Required"),
    description: Yup.string().required("Required"),
  })

  const onSubmit = async (formData, b) => {
    console.log("formData", formData) // zzz
    console.log("b", b) // zzz

    const test = await API.graphql(
      graphqlOperation(createFrameSet, { input: {} })
      // graphqlOperation(createFrameSet, { input: formData })
    )
    console.log("test", test) // zzz
    setOpen(false)
  }

  const renderForm = () => {
    return (
      <Form className="baseForm">
        <Field
          type="text"
          id="name"
          className=""
          name="name"
          placeholder={"Name"}
        />
        <Field
          type="text"
          id="description"
          className=""
          name="description"
          placeholder={"Description"}
        />
        <button type="submit">Submit</button>
      </Form>
    )
  }

  console.log("render dialog") // zzz
  return (
    <div className={css.main}>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        New ToolType
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
        <DialogContent>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
            // onSubmit={(values, actions) => {
            //   onSubmit(values, actions)
            // }}
          >
            {renderForm}
          </Formik>
        </DialogContent>
        <DialogActions>
          {/* <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClose} color="primary">
            Subscribe
          </Button> */}
        </DialogActions>
      </Dialog>
    </div>
  )
}
