import { FC, useEffect, useReducer } from "react"
import { Entry } from "../../interfaces"
import { EntriesContext, entriesReducer } from "./"
import { v4 as uuid } from "uuid"
import { entriesApi } from "../../api"
import { IEntry } from "../../models"

export interface Props {
  children: React.ReactNode
}

export interface EntriesState {
  entries: Entry[]
}

const Entries_INITIAL_STATE: EntriesState = {
  entries: [],
}

export const EntriesProvider: FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(entriesReducer, Entries_INITIAL_STATE)

  const addNewEntry = (description: string) => {
    const newEntry: Entry = {
      id: uuid(),
      description,
      createdAt: Date.now(),
      status: "pending",
    }

    dispatch({
      type: "ENTRY_ADD_ENTRY",
      payload: newEntry,
    })
  }

  const updateEntry = (entry: Entry) => {
    dispatch({
      type: "ENTRY_UPDATE_ENTRY",
      payload: entry,
    })
  }

  const refreshEntries = async () => {
    const { data } = await entriesApi.get<IEntry[]>("/entries")
    dispatch({ type: "ENTRY_REFRESH_ENTRY", payload: data })
  }

  useEffect(() => {
    refreshEntries()
  }, [])

  return (
    <EntriesContext.Provider
      value={{
        ...state,
        addNewEntry,
        updateEntry,
      }}
    >
      {children}
    </EntriesContext.Provider>
  )
}
