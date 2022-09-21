import { FC, useReducer } from 'react';
import { UIContext, uiReducer } from './';

export interface Props {
  children: React.ReactNode;
}

export interface UIState {
  sidemenuOpen: boolean;
}

const UI_INITIAL_STATE: UIState = {
  sidemenuOpen: false,
}

export const UIProvider: FC<Props> = ({ children }) => {

  const [state, dispatch] = useReducer(uiReducer, UI_INITIAL_STATE);

  const openSideMenu = () => {
    dispatch({ type: 'UI_OPEN_SIDEBAR' });
  }

  const closeSideMenu = () => {
    dispatch({ type: 'UI_CLOSE_SIDEBAR' });
  }

  return (
    <UIContext.Provider value={{
      ...state,
      openSideMenu,
      closeSideMenu
    }}>
      {children}
    </UIContext.Provider>
  )
}