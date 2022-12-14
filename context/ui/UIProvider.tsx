import { FC, useReducer } from "react"
import { UIContext, uiReducer } from "./"

export interface Props {
  children: React.ReactNode
}

export interface UIState {
  sidemenuOpen: boolean
  isAddingEntry: boolean
  isDragging: boolean
}

const UI_INITIAL_STATE: UIState = {
  sidemenuOpen: false,
  isAddingEntry: false,
  isDragging: false,
}

export const UIProvider: FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(uiReducer, UI_INITIAL_STATE)

  const openSideMenu = () => {
    dispatch({ type: "UI_OPEN_SIDEBAR" })
  }

  const closeSideMenu = () => {
    dispatch({ type: "UI_CLOSE_SIDEBAR" })
  }

  const addingEntry = (isAdding: boolean) => {
    dispatch({ type: "UI_ADD_ENTRY", payload: isAdding })
  }

  const startDragging = () => {
    dispatch({ type: "UI_START_DRAGGING" })
  }

  const endDragging = () => {
    dispatch({ type: "UI_END_DRAGGING" })
  }

  return (
    <UIContext.Provider
      value={{
        ...state,
        openSideMenu,
        closeSideMenu,
        addingEntry,
        startDragging,
        endDragging,
      }}
    >
      {children}
    </UIContext.Provider>
  )
}
