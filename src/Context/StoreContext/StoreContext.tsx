import { ReactNode, createContext, useContext } from 'react'
import getFormCtxData from './getStoreData'

const FormCtx = createContext<(ReturnType<typeof getFormCtxData> & { actions: { resetState: () => void } }) | null>(
   null
)

// hook for using the form context
export const useFormCtx = () => useContext(FormCtx)

export function FormCtxProvider({ children }: { children: ReactNode }) {
   const state = getFormCtxData()
   const resetState = () => {
      state.set({ age: 0, counter: 1, details: { address: '' }, first_name: '', last_name: '' })
   }
   return <FormCtx.Provider value={{ ...state, actions: { resetState } }}>{children}</FormCtx.Provider>
}
