import Form from './Context/Components/Form'
import { StoreCtxProvider } from './Context/StoreContext/StoreContext'

export default function App() {
   return (
      <div>
         <h2>Ref-Based Context in React</h2>
         <StoreCtxProvider>
            <Form />
         </StoreCtxProvider>
      </div>
   )
}
