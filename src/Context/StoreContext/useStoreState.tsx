import { useEffect, useState } from 'react'
import { useStoreCtx } from './StoreContext'
import { StoreCtxState } from './getStoreData'

export function useStateSelector<SelectorOutput>(selector: (state: StoreCtxState) => SelectorOutput): SelectorOutput {
   const Store = useStoreCtx()

   if (!Store) throw new Error('no form store found.')

   const [state, setState] = useState(() => selector(Store.get()))

   useEffect(() => {
      return Store.observe(() => setState(() => selector(Store.get())))
   }, [])

   // returning state
   return state
}
export function useStateDispatch() {
   const FormStore = useStoreCtx()

   if (!FormStore) throw new Error('no form store found.')

   return FormStore.set
}
export function useContextActions() {
   const FormStore = useStoreCtx()
   if (!FormStore) throw new Error('no form store found.')

   return FormStore.actions
}