import logo from './logo.svg';
import './App.css';
import Register from './Register';
import Login from './Login';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Home';
function App() {
  return (
    <>
      <Routes>
        <Route>
          <Route path="/" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/Home" element={<Home />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
