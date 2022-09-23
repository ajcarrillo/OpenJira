import { createContext } from "react"

interface ContextProps {
  sidemenuOpen: boolean
  isAddingEntry: boolean
  openSideMenu: () => void
  closeSideMenu: () => void
  addingEntry: (isAdding: boolean) => void
}

export const UIContext = createContext({} as ContextProps)
