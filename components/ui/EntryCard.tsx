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
import { useRouter } from "next/router"
import { dateFunctions } from "../../utils"

interface Props {
  entry: Entry
}

export const EntryCard: FC<Props> = ({ entry }) => {
  const { startDragging, endDragging } = useContext(UIContext)
  const router = useRouter()

  const onDragStart = (e: DragEvent<HTMLDivElement>) => {
    e.dataTransfer.setData("text", entry.id)
    startDragging()
  }

  const onDragEnd = (e: DragEvent<HTMLDivElement>) => {
    endDragging()
  }

  const onCardClick = () => {
    router.push(`/entries/${entry.id}`)
  }

  return (
    <Card
      sx={{ marginBottom: "1rem" }}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      onClick={onCardClick}
      draggable
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
          <Typography variant="body2">
            {dateFunctions.getFormatDistanceToNow(entry.createdAt)}
          </Typography>
        </CardActions>
      </CardActionArea>
    </Card>
  )
}
