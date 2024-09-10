import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import { KEY_TOKEN } from '../../services/apiService';
import ListOutlinedIcon from '@mui/icons-material/ListOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import WidgetsIcon from '@mui/icons-material/Widgets';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';

export default function PanelAdmin() {
  const [selectedTab, setSelectedTab] = useState('home'); // Default tab is 'home'
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleTabClick = (tab) => {
    setSelectedTab(tab);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className='sticky top-0 z-50 text-white'>
      <header className='h-24 md:w-full items-center flex text-center text-xl bg-gradient-to-b from-black to-gray-700 md:justify-normal'>
        <button className='block md:hidden p-2 absolute right-6 border rounded-lg' onClick={toggleMenu}>
          <MenuIcon fontSize='large' />
        </button>

        {localStorage[KEY_TOKEN] ? (
          <React.Fragment>
            <h1 className='hidden md:block w-1/6 text-white'>שלום מנהל</h1>
            <nav className='hidden md:block w-4/6 text-center h-full'>
              <ul className='flex w-2/3 m-auto justify-between h-full items-center'>
                <li className={selectedTab === 'home' ? 'text-orange-500 font-bold' : 'hover:text-orange-500'}>
                  <Link to='/admin' onClick={() => handleTabClick('home')}>
                    <HomeOutlinedIcon /> דף הבית
                  </Link>
                </li> |
                <li className={selectedTab === 'categories' ? 'text-orange-500 font-bold' : 'hover:text-orange-500'}>
                  <Link to='/admin/categories' onClick={() => handleTabClick('categories')}>
                    <ListOutlinedIcon /> קטגוריות
                  </Link>
                </li> |
                <li className={selectedTab === 'products' ? 'text-orange-500 font-bold' : 'hover:text-orange-500'}>
                  <Link to='/admin/products' onClick={() => handleTabClick('products')}><WidgetsIcon/> מוצרים</Link>
                </li>|
                <li className={selectedTab === 'orders' ? 'text-orange-500 font-bold' : 'hover:text-orange-500'}>
                  <Link to='/admin/orders' onClick={() => handleTabClick('orders')}>
                    <ShoppingCartOutlinedIcon /> הזמנות
                  </Link>
                </li>
              </ul>
            </nav>
          </React.Fragment>
        ) : ''}

        {localStorage[KEY_TOKEN] ? (
          <Link
            onClick={() => {
              localStorage.removeItem(KEY_TOKEN);
              toast.info('!התנתקת בהצלחה');
            }}
            to='/'
            className='border p-2 rounded-xl hover:border-blue-600 hover:text-blue-600 hover:duration-1000 absolute left-7'
          >
            התנתק
          </Link>
        ) : (
          <p>
            <Link to='/login'>התחברות</Link>
          </p>
        )}
      </header>

      {isMenuOpen && (
        <div className='menu-container text-white absolute bg-gradient-to-t from-black to-gray-700 w-full p-3 text-xl bg-opacity-95'>
          <ul>
            <li style={{marginBottom:'16px'}} className={selectedTab === 'home' ? 'text-orange-500 font-bold' : 'hover:text-orange-500'}>
              <Link to='/admin' onClick={() => handleTabClick('home')}>
                <HomeOutlinedIcon /> דף הבית
              </Link>
            </li>
            <li style={{marginBottom:'16px'}} className={selectedTab === 'categories' ? 'text-orange-500 font-bold' : 'hover:text-orange-500'}>
              <Link to='/admin/categories' onClick={() => handleTabClick('categories')}>
                <ListOutlinedIcon /> קטגוריות
              </Link>
            </li>
            <li style={{marginBottom:'16px'}} className={selectedTab === 'products' ? 'text-orange-500 font-bold ' : 'hover:text-orange-500'}>
              <Link to='/admin/products' onClick={() => handleTabClick('products')}><WidgetsIcon/> מוצרים</Link>
            </li>
            <li style={{marginBottom:'16px'}} className={selectedTab === 'orders' ? 'text-orange-500 font-bold ' : 'hover:text-orange-500'}>
              <Link to='/admin/orders' onClick={() => handleTabClick('orders')}>
                <ShoppingCartOutlinedIcon /> הזמנות
              </Link>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
