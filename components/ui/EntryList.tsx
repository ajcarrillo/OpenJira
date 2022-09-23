import { List, Paper } from "@mui/material"
import { FC, useContext, useMemo, DragEvent } from "react"
import { EntryCard } from "."
import { EntriesContext } from "../../context/entries"
import { UIContext } from "../../context/ui"
import { EntryStatus } from "../../interfaces"
import styles from "./EntryList.module.css"

interface Props {
  status: EntryStatus
}

export const EntryList: FC<Props> = ({ status }) => {
  const { entries, updateEntry } = useContext(EntriesContext)
  const { isDragging, endDragging } = useContext(UIContext)

  const entriesByStatus = useMemo(
    () => entries.filter((entry) => entry.status === status),
    [entries]
  )

  const allowDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault()
  }

  const onDropEntry = (e: DragEvent<HTMLDivElement>) => {
    const id = e.dataTransfer.getData("text")
    const entry = entries.find((entry) => entry.id === id)!
    updateEntry({ ...entry, status })
    endDragging()
  }

  return (
    <div
      onDrop={onDropEntry}
      onDragOver={allowDrop}
      className={isDragging ? styles.dragging : ""}
    >
      <Paper
        sx={{
          height: "calc(100vh - 190px)",
          overflow: "scroll",
          backgroundColor: "transparent",
          padding: "0 1rem",
          paddingTop: "1rem",
        }}
      >
        <List sx={{ opacity: isDragging ? 0.2 : 1 }}>
          {entriesByStatus.map((entry) => (
            <EntryCard
              key={entry.id}
              entry={entry}
            />
          ))}
        </List>
      </Paper>
    </div>
  )
}
