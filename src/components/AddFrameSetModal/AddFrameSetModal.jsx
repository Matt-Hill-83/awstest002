import React from "react"

import { Form, Field } from "formik"
import * as Yup from "yup"
import { API, graphqlOperation } from "aws-amplify"

import { createFrameSet } from "../../graphql/mutations"

import AddModal from "../AddModal/AddModal"
import SelectFormik from "../SelectFormik/SelectFormik"
import { FormGroup, FormLabel, Button } from "react-bootstrap"

const thisButtonLabel = "Frame Set"

export default function AddFrameSetModal(props) {
  const { buttonLabel = thisButtonLabel, className } = props

  const initialValues = { name: "" }
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Required"),
  })

  const renderForm = () => {
    return (
      <Form className="baseForm">
        <FormGroup controlId="name">
          <FormLabel htmlFor="name">Name</FormLabel>
          <Field name="name" className="form-control" type="text" />
        </FormGroup>

        <Button type="submit">Submit</Button>
      </Form>
    )
  }

  const onSubmit = async (formData) => {
    console.log("formData=======================", formData) // zzz
    const test = await API.graphql(
      graphqlOperation(createFrameSet, { input: formData })
    )
    return test
  }

  console.log("render AFSM dialog") // zzz

  const modalProps = {
    renderForm,
    className,
    validationSchema,
    initialValues,
    onSubmit,
    buttonLabel,
  }

  return <AddModal {...modalProps} />
}
