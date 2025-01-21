import logo from './logo.svg';
import './App.css';
import Button from 'react-bootstrap/Button'
import { Home } from './Components/Home';
import { Department } from './Components/Department';

import { Employee } from './Components/Employee';
import { BrowserRouter, Router, Route, Routes } from 'react-router-dom';


function App() {
  return (
    <BrowserRouter>
    <div className="container">
        <Routes>
          <Route path='/' Component={Home} exact/>
          <Route path='/Department' Component={Department}/>
          <Route path='/Employee' Component={Employee}/>
        </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
