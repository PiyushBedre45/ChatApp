import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Register from './Components/Authentication/Register.jsx'
import Avatar from './Components/Avatar.jsx';
import Login from './Components/Authentication/Login.jsx';
import { Toaster } from 'react-hot-toast'
import ProfilePic from './Components/ProfilePic.jsx';


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>

          {/*User Register*/}

          <Route path='/register' element={
            <>
              <Register />
            </>} />

          {/*User Login*/}

          <Route path='/login' element={
            <>
              <Login />
            </>} />

          {/* Set  Avatar */}
          <Route path='/avatar' element={
            <>
              <Avatar />
            </>} />

          <Route path='/pro' element={
            <>
              <ProfilePic />
            </>} />


        </Routes>
        <Toaster />
      </BrowserRouter>
    </>
  );
}

export default App;
