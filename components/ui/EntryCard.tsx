import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material"
import { FC, DragEvent, useContext } from "react"
import { UIContext } from "../../context/ui"
import { Entry } from "../../interfaces"

interface Props {
  entry: Entry
}

export const EntryCard: FC<Props> = ({ entry }) => {
  const { startDragging, endDragging } = useContext(UIContext)

  const onDragStart = (e: DragEvent<HTMLDivElement>) => {
    e.dataTransfer.setData("text", entry.id)
    startDragging()
  }

  const onDragEnd = (e: DragEvent<HTMLDivElement>) => {
    endDragging()
  }

  return (
    <Card
      sx={{ marginBottom: "1rem" }}
      draggable
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
    >
      <CardActionArea>
        <CardContent>
          <Typography sx={{ whiteSpace: "pre-line" }}>
            {entry.description}
          </Typography>
        </CardContent>
        <CardActions
          sx={{ display: "flex", justifyContent: "end", paddingRight: "1rem" }}
        >
          <Typography variant="body2">Hace 5 minutos</Typography>
        </CardActions>
      </CardActionArea>
    </Card>
  )
}
