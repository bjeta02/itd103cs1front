import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Users from './component/Users'
import CreateUser from './component/CreateUser'
import UpdateUser from './component/UpdateUser'
import DeleteUser from './component/DeleteUser'
import TableList from './component/TableList' // Import TableList component
import UserProfile from './component/UserProfile' // Import UserProfile component

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Users />}></Route>
        <Route path='/create' element={<CreateUser/>}></Route>
        <Route path='/edit/:id' element={<UpdateUser />}></Route>
        <Route path='/deleteuser/:id' element={<DeleteUser />}></Route>
        {/* Add the new route for UserProfile */}
        <Route path='/user-profile/:userId' element={<UserProfile />}></Route>
        {/* Add the new route for TableList */}
        <Route path='/table-list' element={<TableList />}></Route>
      </Routes>
    </Router>
  )
}

export default App
