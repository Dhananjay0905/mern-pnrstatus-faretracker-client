import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import RegisterationPage from './RegistrationPage';
import LoginPage from './LoginPage';
import HomePage from './HomePage';
import PNRStatus from './PNRStatus';
import Fare from './Fare';

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<LoginPage />} />
          <Route path='/home' element={<HomePage />} />
          <Route path='/register' element={<RegisterationPage />} />
          <Route path='/pnr' element={<PNRStatus />} />
          <Route path='/fare' element={<Fare />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App;