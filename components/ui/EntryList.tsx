import { List, Paper } from "@mui/material"
import { FC, useContext, useMemo } from "react"
import { EntryCard } from "."
import { EntriesContext } from "../../context/entries"
import { EntryStatus } from "../../interfaces"

interface Props {
  status: EntryStatus
}

export const EntryList: FC<Props> = ({ status }) => {
  const { entries } = useContext(EntriesContext)
  const entriesByStatus = useMemo(
    () => entries.filter((entry) => entry.status === status),
    [entries]
  )

  return (
    <div>
      <Paper
        sx={{
          height: "calc(100vh - 190px)",
          overflow: "scroll",
          backgroundColor: "transparent",
          padding: "0 1rem",
          paddingTop: "1rem",
        }}
      >
        <List>
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
