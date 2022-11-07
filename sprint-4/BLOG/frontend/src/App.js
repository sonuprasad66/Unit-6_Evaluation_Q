
import './App.css';
import {Routes,Route} from "react-router-dom"
import Navbar from './Components/Navbar';
import Home from './Routes/Home';
import Signup from './Routes/Signup';
import Login from './Routes/Login';
import Blogs from './Routes/Blogs';

function App() {
  return (
    <div className="App">
     <Navbar/>
     <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/blogs" element={<Blogs/>}/>
      </Routes>
    </div>
  );
}

export default App;