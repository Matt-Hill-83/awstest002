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

  const initialValues = { name: "", description: "" }
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Required"),
    description: Yup.string(),
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
        <FormGroup controlId="name">
          <FormLabel htmlFor="name">Name</FormLabel>
          <Field name="name" className="form-control" type="text" />
        </FormGroup>
        <FormGroup controlId="description">
          <FormLabel htmlFor="description">Description</FormLabel>
          <Field name="description" className="form-control" type="text" />
        </FormGroup>
        <Field
          name="firstName"
          component={CustomInputComponent}
          placeholder="First Name"
        />
        <SelectFormik name="courseAssignmentId" label="Course Assignment">
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </SelectFormik>
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
