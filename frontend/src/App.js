import React, { useState } from 'react';
import Account from './pages/Account';
import ItemListPage from './pages/ItemListPage';
import ItemDetailPage from './pages/ItemDetailPage';
import Home from './pages/Home';
import { Routes, Route, useNavigate } from 'react-router-dom';

function App() {

  const [userData, setUserData] = useState(null);

  const navigate = useNavigate();

  const handleLoginUser = (userData) => {
    setUserData(userData);
    console.log(userData);
    navigate('/user-home');
  }


  const handleLoginStaff = (userData) => {
    setUserData(userData);
    console.log(userData);
    navigate('/staff-home');
  }

  return (
    <div>
      <div>
        <Routes>
          <Route path='/' element={<Home />}/>
          <Route path="/account" element={<Account onLoginUser={handleLoginUser} onLoginStaff={handleLoginStaff} />} />
          <Route path="/staff-home" element={<ItemListPage />} />
          <Route path="/details" element={<ItemDetailPage />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
