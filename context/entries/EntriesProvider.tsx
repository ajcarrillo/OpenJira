import { FC, useReducer } from "react"
import { Entry } from "../../interfaces"
import { EntriesContext, entriesReducer } from "./"
import { v4 as uuid } from "uuid"

export interface Props {
  children: React.ReactNode
}

export interface EntriesState {
  entries: Entry[]
}

const Entries_INITIAL_STATE: EntriesState = {
  entries: [
    {
      id: uuid(),
      description:
        "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Earum amet debitis porro quos cum, sunt sed vitae molestias fuga blanditiis rem a vero placeat, repellendus temporibus quibusdam fugit perspiciatis harum.",
      createdAt: Date.now(),
      status: "pending",
    },
    {
      id: uuid(),
      description:
        "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Earum amet debitis porro quos cum,",
      createdAt: Date.now() - 1000000,
      status: "in-progress",
    },
    {
      id: uuid(),
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Asperiores molestiae quibusdam, culpa neque enim nam eius nostrum voluptatem et, excepturi repudiandae error corrupti nemo maiores, mollitia ex illo tempore veritatis?",
      createdAt: Date.now() - 100000,
      status: "finished",
    },
  ],
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

  return (
    <EntriesContext.Provider
      value={{
        ...state,
        addNewEntry,
      }}
    >
      {children}
    </EntriesContext.Provider>
  )
}
