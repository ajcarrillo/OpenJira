import { Box, Button, TextField } from "@mui/material"
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined"
import { ChangeEvent, useContext, useState } from "react"
import { EntriesContext } from "../../context/entries"
import { UIContext } from "../../context/ui"

export const NewEntry = () => {
  const [description, setDescription] = useState("")
  const [touched, setTouched] = useState(false)
  const { addNewEntry } = useContext(EntriesContext)
  const { isAddingEntry, addingEntry } = useContext(UIContext)

  const handleShowForm = () => {
    setDescription("")
    setTouched(false)
    addingEntry(!isAddingEntry)
  }

  const onDescriptionChanged = (e: ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value)
    setTouched(true)
  }

  const onSave = () => {
    addNewEntry(description)
    setTouched(false)
    setDescription("")
    addingEntry(false)
  }

  return (
    <Box sx={{ padding: "0 1rem" }}>
      {isAddingEntry ? (
        <>
          <TextField
            sx={{ marginBottom: "1rem" }}
            id="outlined-basic"
            label="Outlined"
            variant="outlined"
            value={description}
            onChange={onDescriptionChanged}
            error={touched && description.length === 0}
            helperText={
              touched &&
              description.length === 0 &&
              "La descripción es requerida"
            }
            autoFocus
            multiline
            fullWidth
          />
          <Box
            display="flex"
            justifyContent="space-between"
          >
            <Button
              variant="text"
              size="small"
              onClick={handleShowForm}
            >
              Cancelar
            </Button>
            <Button
              variant="outlined"
              size="small"
              disabled={description.length === 0}
              onClick={onSave}
            >
              Guardar
            </Button>
          </Box>
        </>
      ) : (
        <Button
          sx={{ marginBottom: "1rem" }}
          variant="outlined"
          fullWidth
          startIcon={<AddCircleOutlineOutlinedIcon />}
          onClick={handleShowForm}
        >
          Agregar tarea
        </Button>
      )}
    </Box>
  )
}
