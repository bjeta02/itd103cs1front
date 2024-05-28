import { BrowserRouter, Routes, Route} from 'react-router-dom'
import Users from './components/Users'
import CreateUser from './components/CreateUser'
import UpdateUser from './components/UpdateUser'
import DeleteUser from './components/DeleteUser'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Users />}></Route>
        <Route path='/create' element={<CreateUser/>}></Route>
        <Route path='/edit/:id' element={<UpdateUser />}></Route>
        <Route path='/deleteuser/:id' element={<DeleteUser />}></Route>
        </Routes>
    </BrowserRouter>
  )
}

export default App
