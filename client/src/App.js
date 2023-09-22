import { Route, Routes } from 'react-router-dom';
import Cart from './pages/Cart';
import HomePage from './pages/HomePage';
import Login from './pages/Login';
import Register from './pages/Register';
import About from './pages/About';
import PageNotFound from './pages/PageNotFound';
import Contact from './pages/Contact';
import Private from './components/Routes/Private';
import Dashboard from './pages/User/Dashboard';
import Admin from './components/Routes/Admin';
import AdminDashboard from './pages/Admin/AdminDashboard';
import CreateCategory from './pages/Admin/CraeteCategory';
import CreateProduct from './pages/Admin/CreateProduct';
import Users from './pages/Admin/Users';
import UserOrder from './pages/User/UserOrder';

function App() {
  return (
    <>
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/user' element={<Private />} >
        <Route path='dashboard' element={<Dashboard />} />
        <Route path='orders' element={<UserOrder />} />
      </Route>
      <Route path='/admin' element={<Admin />} >
        <Route path='dashboard' element={<AdminDashboard />} />
        <Route path='create-category' element={<CreateCategory />} />
        <Route path='create-product' element={<CreateProduct />} />
        <Route path='users' element={<Users />} />
      </Route>
      <Route path='/register' element={<Register />} />
      <Route path='/login' element={<Login />} />
      <Route path='/cart' element={<Cart />} />
      <Route path='/about' element={<About />} />
      <Route path='/contact' element={<Contact />} />
      <Route path='/*' element={<PageNotFound />} />
    </Routes>
    </>
  )
}

export default App;
