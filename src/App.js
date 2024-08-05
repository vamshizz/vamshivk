 
import './App.css';
import Details from './Components/Details';
import DocList from './Components/DocList';
import Profile from './Components/Profile';
import Speacility from './Components/Speacility';
import Wrapper from './Components/Wrapper';
import{ Routes, Route} from 'react-router-dom';
import Signup from './Pages/Signup';
import Login from './Pages/Login';
import { AuthContext } from './Context/AuthProvider';
import { useContext } from 'react';
function App() {
  const {authState}=useContext(AuthContext);
  console.log(authState)
  return (
    <div className="App">
      <Routes>
      <Route path="/" element={  <Speacility />   } />
      <Route path="/appoitment" element={<Wrapper/> } />
        <Route path="/doclist/:departmentID" element={<DocList/>}/>
        <Route path="/appoitment/:DoctorId" element={<Wrapper/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/login" element={<Login/>}/>
       </Routes>
    </div>
  );
}

export default App;
