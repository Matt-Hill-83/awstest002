import { useState, useEffect } from "react"
import TextField from "@material-ui/core/TextField"
import Autocomplete from "@material-ui/lab/Autocomplete"

export default function MyMultiSelect(props) {
  const {
    listItems,
    className,
    initialValue,
    onChange,
    inputWidth = 200,
  } = props
  const options = listItems.map((item) => item.title)

  const [value, setValue] = useState("")

  useEffect(() => {
    setValue(initialValue)
  }, [initialValue])

  const localOnChange = (event, newValue) => {
    setValue(newValue)
    onChange?.(newValue)
  }

  return (
    <Autocomplete
      value={value}
      onChange={localOnChange}
      options={options}
      style={{ width: inputWidth }}
      renderInput={(params) => (
        <TextField {...params} variant="outlined" className={className} />
      )}
    />
  )
}
