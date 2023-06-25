import { useEffect, useState } from 'react'
import { useFormCtx } from './StoreContext'
import { StoreCtxState } from './getStoreData'

export function useStateSelector<SelectorOutput>(selector: (state: StoreCtxState) => SelectorOutput): SelectorOutput {
   const FormStore = useFormCtx()

   if (!FormStore) throw new Error('no form store found.')

   const [state, setState] = useState(() => selector(FormStore.get()))

   useEffect(() => {
      return FormStore.observe(() => setState(() => selector(FormStore.get())))
   }, [])

   // returning state
   return state
}
export function useStateDispatch() {
   const FormStore = useFormCtx()

   if (!FormStore) throw new Error('no form store found.')

   return FormStore.set
}
