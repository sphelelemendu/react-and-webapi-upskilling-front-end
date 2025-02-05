
import './App.css';
import { Home } from './Components/Home';
import { Department } from './Components/Department';
import { Navigation } from './Components/Navigation';

import { Employee } from './Components/Employee';
import { BrowserRouter, Router, Route, Routes } from 'react-router-dom';


function App() {
  return (
    <BrowserRouter>
    <div className="container">
      <h3 className='m-3 d-flex justify-content-center'>This is a Demo App</h3>
      <h5 className='m-3 d-flex justify-content-center'>Employee Management Portal</h5>
        <Navigation/>
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
