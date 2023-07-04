import type { MutableRefObject } from 'react'
import { useCallback, useRef } from 'react'

export type StoreCtxState = {
   first_name: string
   last_name: string
   age: number
   details: {
      address: string
   }
   counter: number
   formRef: MutableRefObject<HTMLDivElement | null>
   hiddenInput: string
}

type StoreCtxData = {
   get: () => StoreCtxState
   set: (value: StoreCtxState | ((state: StoreCtxState) => StoreCtxState), notify?: boolean) => void
   observe: (cb: () => void) => () => void
}

export default function getStoreCtxData(): StoreCtxData {
   const StoreData = useRef<StoreCtxState>({
      first_name: '',
      last_name: '',
      age: 20,
      details: { address: '' },
      counter: 0,
      formRef: { current: null },
      hiddenInput: 'default value',
   })
   const observers = useRef(new Set<() => void>())

   // get all store data
   const get = useCallback(() => {
      return StoreData.current
   }, [])

   // set all store data
   const set = useCallback(
      (value: StoreCtxState | ((state: StoreCtxState) => StoreCtxState), notify: boolean = true) => {
         if (typeof value != 'function') {
            StoreData.current = value
         } else {
            StoreData.current = value(StoreData.current)
         }
         if (notify) {
            // notifying all of the observers
            observers.current.forEach((observer) => observer())
         }
      },
      []
   )

   // add the observer to the list
   const observe = useCallback((cb: () => void) => {
      observers.current.add(cb)
      return () => observers.current.delete(cb)
   }, [])

   return { get, set, observe }
}
