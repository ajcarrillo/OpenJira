import { Entry } from "../../interfaces"
import { EntriesState } from "./EntriesProvider"

type EntriesActionType = { type: "ENTRY_ADD_ENTRY"; payload: Entry }

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
    default:
      return state
  }
}
