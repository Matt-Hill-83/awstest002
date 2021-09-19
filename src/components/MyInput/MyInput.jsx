import { useState, useEffect } from "react"
import { Input } from "@material-ui/core"

export default function MyInput(props) {
  const { onChange, onBlur } = props

  const [value, setValue] = useState("")

  useEffect(() => {
    setValue(props.value)
  }, [props.value])

  const localOnChange = (event, newValue) => {
    console.log("event", event) // zzz
    setValue(newValue)
    onChange?.(newValue)
  }

  console.log("value", value) // zzz
  return <Input value={value} onChange={localOnChange} onBlur={onBlur} />
}
