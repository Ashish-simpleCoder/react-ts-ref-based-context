import { ReactNode, createContext, useContext } from 'react'
import getFormCtxData from './getStoreData'

const FormCtx = createContext<ReturnType<typeof getFormCtxData> | null>(null)

// hook for using the form context
export const useFormCtx = () => useContext(FormCtx)

export function FormCtxProvider({ children }: { children: ReactNode }) {
   return <FormCtx.Provider value={getFormCtxData()}>{children}</FormCtx.Provider>
}
