import React from "react"

import { Form, Field } from "formik"
import * as Yup from "yup"
import { API, graphqlOperation } from "aws-amplify"

import { createFrame } from "../../graphql/mutations"

import AddModal from "../AddModal/AddModal"
import SelectFormik from "../SelectFormik/SelectFormik"
import { FormGroup, FormLabel, Button } from "react-bootstrap"

import "bootstrap/dist/css/bootstrap.min.css"

const thisButtonLabel = "Frame"

export default function AddFrameModal(props) {
  const { buttonLabel = thisButtonLabel, className } = props

  const initialValues = { name: "" }
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Required"),
  })

  const options = [
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
  ]

  const CustomInputComponent = ({
    field, // { name, value, onChange, onBlur }
    form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
    ...props
  }) => (
    <div>
      <input type="text" {...field} {...props} />
      {touched[field.name] && errors[field.name] && (
        <div className="error">{errors[field.name]}</div>
      )}
    </div>
  )

  const renderForm = () => {
    return (
      <Form className="baseForm">
        <SelectFormik name="courseAssignmentId" label="Course Assignment">
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </SelectFormik>
        <FormGroup controlId="name">
          <FormLabel htmlFor="name">Name</FormLabel>
          <Field name="name" className="form-control" type="text" />
        </FormGroup>
        <Field
          name="firstName"
          component={CustomInputComponent}
          placeholder="First Name"
        />
        <Button type="submit">Submit</Button>
      </Form>
    )
  }

  const onSubmit = async (formData) => {
    console.log("formData=======================", formData) // zzz
    const test = await API.graphql(
      graphqlOperation(createFrame, { input: formData })
    )
    return test
  }

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
