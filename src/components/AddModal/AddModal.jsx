import React from "react"
import Button from "@material-ui/core/Button"
import Dialog from "@material-ui/core/Dialog"
import DialogContent from "@material-ui/core/DialogContent"
import DialogTitle from "@material-ui/core/DialogTitle"

import { Formik } from "formik"
import cx from "classnames"

import css from "./AddModal.module.scss"

export default function AddModal(props) {
  const {
    buttonLabel,
    validationSchema,
    className,
    initialValues,
    onSubmit,
    renderForm,
  } = props
  const [open, setOpen] = React.useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const onSubmitClick = async (formData, b) => {
    console.log("formData", formData) // zzz
    console.log("b", b) // zzz

    const success = onSubmit(formData)

    if (success) {
      setOpen(false)
    }
  }

  const dialogTitle = `New ${buttonLabel}`
  console.log("render dialog -------base modal") // zzz

  return (
    <div className={cx(className, css.main)}>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        {`+ ${buttonLabel}`}
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title" className={cx(css.header)}>
          {dialogTitle}
        </DialogTitle>

        <DialogContent className={cx(css.content)}>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmitClick}
          >
            {renderForm}
          </Formik>
        </DialogContent>
      </Dialog>
    </div>
  )
}
