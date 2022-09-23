import { Entry } from "../../interfaces"
import { EntriesState } from "./EntriesProvider"

type EntriesActionType =
  | { type: "ENTRY_ADD_ENTRY"; payload: Entry }
  | { type: "ENTRY_UPDATE_ENTRY"; payload: Entry }

export const entriesReducer = (
  state: EntriesState,
  action: EntriesActionType
): EntriesState => {
  switch (action.type) {
    case "ENTRY_ADD_ENTRY":
      return {
        ...state,
        entries: [...state.entries, action.payload],
      }
    case "ENTRY_UPDATE_ENTRY":
      return {
        ...state,
        entries: state.entries.map((entry) => {
          if (entry.id === action.payload.id) {
            entry.status = action.payload.status
            entry.description = action.payload.description
          }
          return entry
        }),
      }
    default:
      return state
  }
}
