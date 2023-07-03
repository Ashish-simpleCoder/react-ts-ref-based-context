import { useSyncExternalStore } from 'react'
import { useStoreCtx } from './StoreContext'
import { StoreCtxState } from './getStoreData'

export function useStateSelector<SelectorOutput>(selector: (state: StoreCtxState) => SelectorOutput, watch: boolean = true): SelectorOutput {
   const Store = useStoreCtx()
   if (!Store) throw new Error('no form store found.')
   if (!watch) {
      const state = selector(Store.get())
      return state
   }
   const state = useSyncExternalStore(Store.observe, () => selector(Store.get()))
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
