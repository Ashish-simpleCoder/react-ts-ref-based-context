import { ChangeEvent, InputHTMLAttributes, useEffect } from 'react'
import {
   useContextActions,
   useStateDispatch,
   useStateSelector
} from '../StoreContext/useStoreState'

export default function Form() {
   const setState = useStateDispatch()
   const formRef = useStateSelector((state) => state.formRef, false)
   const { resetState } = useContextActions()

   const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      // you can also set like this
      setState((old_state) => {
         const name = e.target.name
         // @ts-ignore
         old_state[name] = e.target.value
         return old_state
      })

      // you can also set like this -----
      // setState((old_state) => ({ ...old_state, [e.target.name]: e.target.value }))
   }

   const changeBorder = () => {
      formRef.current!.style.border = '2px solid red'
   }

   return (
      <div ref={formRef}>
         <button onClick={changeBorder}>change bg</button>
         <button style={{ padding: '10px 20px', background: '#4407a7', marginBottom: '20px' }} onClick={resetState}>
            Reset Context State
         </button>

         <div style={{ border: '1px solid purple', padding: '10px' }}>
            <label htmlFor='first_name'>First name input :-</label>
            <Input id='first_name' name='first_name' placeholder='first name' onChange={(e) => handleChange(e)} />
            <FirstNameDisplay />
            <LastNameDisplay />
            <FullNameDisplay />
         </div>
         <Address />
         <Counter />
      </div>
   )
}

function Input(props: InputHTMLAttributes<HTMLInputElement>) {
   return <input type='text' {...props} name='first_name' onChange={props.onChange} />
}

function FirstNameDisplay() {
   const first_name = useStateSelector((state) => state.first_name)
   return <div style={{ padding: '10px 0' }}>First Name Value:- {first_name}</div>
}
function LastNameDisplay() {
   const last_name = useStateSelector((state) => state.last_name)
   return <div style={{ padding: '10px 0' }}>Last Name Value:- {last_name}</div>
}
function FullNameDisplay() {
   const full_name = useStateSelector((state) => state.first_name + ' ' + state.last_name)
   return <div style={{ padding: '10px 0' }}>Full Name:- {full_name}</div>
}

function Address() {
   const address = useStateSelector((store) => store.details.address)
   const setState = useStateDispatch()

   console.log('address')

   return (
      <div style={{ border: '1px solid blue', padding: '20px', marginTop: '20px' }}>
         <p>address: {JSON.stringify(address)}</p>
         <div>
            <input
               type='text'
               name='first_name'
               placeholder={'type address'}
               onChange={(e) =>
                  setState((old_state) => {
                     old_state.details.address = e.target.value
                     return old_state
                  })
               }
            />
         </div>
      </div>
   )
}

function Counter() {
   const counter = useStateSelector((store) => store.counter)
   const setState = useStateDispatch()

   useEffect(() => {
      let timer: NodeJS.Timer
      timer = setInterval(
         () =>
            setState((s) => {
               s.counter++
               return s
            }),
         1000
      )
      return () => clearInterval(timer)
   }, [])

   return (
      <div style={{ border: '1px solid yellow', padding: '20px', marginTop: '20px' }}>
         <h3>Counter State</h3>
         <div>counter : {counter}</div>
      </div>
   )
}
