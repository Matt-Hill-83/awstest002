import React from "react"

import { useField } from "formik"
import Select from "react-select"
import { FormLabel } from "react-bootstrap"

function SelectFormik({ label, ...props }) {
  const [field, meta, { setValue, setTouched }] = useField(props)
  const options = props.children.map((option) => ({
    value: option.props.value,
    label: option.props.children,
  }))

  const onChange = ({ value }) => {
    setValue(value)
  }

  return (
    <div className="mb-3">
      <FormLabel htmlFor={props.id || props.name}>{label}</FormLabel>
      <Select
        defaultValue={options.find((option) => option.value === field.value)}
        options={options}
        onChange={onChange}
        onBlur={setTouched}
      />
      {meta.touched && meta.error ? (
        <div className="form-text text-danger">{meta.error}</div>
      ) : null}
    </div>
  )
}
export default SelectFormik
