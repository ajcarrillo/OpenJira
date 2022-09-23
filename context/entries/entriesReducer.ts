import { EntriesState } from "./EntriesProvider"

type EntriesActionType = { type: "Entries_ActionName" }

export const entriesReducer = (
  state: EntriesState,
  action: EntriesActionType
): EntriesState => {
  switch (action.type) {
    case "Entries_ActionName":
      return { ...state }
    default:
      return state
  }
}
