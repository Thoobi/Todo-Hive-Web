import { RouterProvider } from 'react-router-dom'
import './App.css'
import { mainRoute } from './Routes/mainRoute'

function App() {

  return (
    <>
      <RouterProvider router={mainRoute}>

      </RouterProvider>
    </>
  )
}

export default App
