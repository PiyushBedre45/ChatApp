import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Register from './Components/Authentication/Register.jsx'
import Avatar from './Components/Avatar.jsx';


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>

          <Route path='/register' element={
            <>
              <Register />
            </>} />

          {/* Set  Avatar */}
          <Route path='/avatar' element={
            <>
              <Avatar />
            </>} />

        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
