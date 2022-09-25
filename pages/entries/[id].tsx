import { NextPage, GetServerSideProps } from "next"
import { useState, ChangeEvent, useMemo, useContext } from "react"
import { Layout } from "../../components/layouts"
import {
  Card,
  Grid,
  CardHeader,
  CardContent,
  TextField,
  CardActions,
  Button,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  capitalize,
  SelectChangeEvent,
} from "@mui/material"
import { EntryStatus } from "../../interfaces"
import { isValidObjectId } from "mongoose"
import { dbEntries } from "../../database"
import { IEntry } from "../../models"
import { EntriesContext } from "../../context/entries"
import { dateFunctions } from "../../utils"

interface Props {
  entry: IEntry
}

const validStatuses: EntryStatus[] = ["pending", "in-progress", "finished"]

const EntryPage: NextPage<Props> = ({ entry }) => {
  const { updateEntry } = useContext(EntriesContext)
  const [description, setDescription] = useState(entry.description)
  const [status, setStatus] = useState<EntryStatus>(entry.status)
  const [touched, setTouched] = useState(false)

  const isNotValid = useMemo(
    () => description.length === 0 && touched,
    [description, touched]
  )

  const onDescriptionChanged = (e: ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value)
    setTouched(true)
  }

  const handleStatusChange = (e: SelectChangeEvent) => {
    setStatus(e.target.value as EntryStatus)
  }

  const onSave = () => {
    updateEntry({ ...entry, description, status })
  }

  return (
    <Layout title={`${description.substring(0, 20)}...`}>
      <Grid
        container
        justifyContent="center"
        sx={{ marginTop: "1rem" }}
      >
        <Grid
          item
          xs={12}
          sm={8}
          md={6}
        >
          <Card>
            <CardHeader
              title={`Entrada`}
              subheader={`${dateFunctions.getFormatDistanceToNow(
                entry.createdAt
              )}`}
            />
            <CardContent>
              <TextField
                autoFocus
                fullWidth
                multiline
                placeholder="Task description"
                label="Description"
                value={description}
                onChange={onDescriptionChanged}
                onBlur={() => setTouched(true)}
                error={isNotValid}
                helperText={isNotValid && "La descripción es requerida"}
              />
            </CardContent>
            <CardContent>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Estado</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Estado"
                  value={status}
                  onChange={handleStatusChange}
                >
                  {validStatuses.map((status) => (
                    <MenuItem
                      value={status}
                      key={status}
                    >
                      {capitalize(status)}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </CardContent>
            <CardActions>
              <Button
                variant="contained"
                fullWidth
                onClick={onSave}
                disabled={description.length === 0}
              >
                Guardar
              </Button>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { id } = ctx.params as { id: string }

  if (!isValidObjectId(id)) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    }
  }

  const entry = await dbEntries.getEntryById(id)

  return {
    props: { id, entry },
  }
}

export default EntryPage
