import logo from './logo.svg';
import './App.css';
import Login from './components/Login';
import Signup from './components/Signup';
import { BrowserRouter,Route,Routes } from 'react-router-dom';
import Homepage from './components/Homepage';
import signup from './components/Signup';
import TrackingPage from './components/TrackingPage';
import BackgroundImage from './Assets/background.jpg'
import { MyContext } from "./contextapi/Context_api"
function App() {

  return (
    <MyContext.Provider value={BackgroundImage}>
    <div className="App">
     <BrowserRouter>
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route exact path='/login' element={<Login/>}/>
      <Route exact path="/signup" element={<Signup/>}/>
      <Route exact path='/trackingpage' element={<TrackingPage/>}/>
    
    </Routes>
    
  </BrowserRouter>
   
    </div>
    </MyContext.Provider>
  );
}

export default App;
