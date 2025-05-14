import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import Login from './pages/login';
import Signup from './pages/signup';
import Profile from './pages/profile';
import SearchPage from './pages/searchpage';
import Search_History from './pages/search_history';
import ProductsPage from './pages/productspage'; 
import Store_Admin from './pages/store'; 

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/search_history" element={<Search_History />} />
        <Route path="/product/:productId" element={<ProductsPage />} /> {}
        <Route path="/store_admin" element={<Store_Admin />}/> 
      </Routes>
    </Router>
  );
}

export default App;
