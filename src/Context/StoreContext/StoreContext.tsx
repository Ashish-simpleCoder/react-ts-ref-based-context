import { ReactNode, createContext, useContext } from 'react'
import getStoreCtxData from './getStoreData'

const StoreCtx = createContext<(ReturnType<typeof getStoreCtxData> & { actions: { resetState: () => void } }) | null>(
   null
)

// hook for using the form context
export const useStoreCtx = () => useContext(StoreCtx)

export function StoreCtxProvider({ children }: { children: ReactNode }) {
   const state = getStoreCtxData()
   const resetState = () => {
      // state.set({ age: 0, counter: 1, details: { address: '' }, first_name: '', last_name: '', formRef: {current: null} })
   }
   return <StoreCtx.Provider value={{ ...state, actions: { resetState } }}>{children}</StoreCtx.Provider>
}
