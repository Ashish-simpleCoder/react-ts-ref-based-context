import Form from './Context/Components/Form'
import { FormCtxProvider } from './Context/StoreContext/StoreContext'

export default function App() {
   return (
      <div>
         <h2>Ref-Based Context in React</h2>
         <FormCtxProvider>
            <Form />
         </FormCtxProvider>
      </div>
   )
}
