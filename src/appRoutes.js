import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PanelAdmin from './admin/components/panelAdmin';
import UserPanel from './users/components/userPanel';
import Home from './users/components/home';
import FreshFish from './users/components/freshFish';
import FrozenFish from './users/components/frozenFish';
import Spices from './users/components/spices';
import Recipes from './users/components/recipes';
import UserFooter from './users/components/userFooter';
import Login from './admin/components/login';
import AdminControll from './admin/components/adminControll';
import UserOrder from './users/components/userOrder';
import CategoriesListAdmin from './admin/components/categories/categoriesListAdmin';
import ProductsListAdmin from './admin/components/products/productsListAdmin';
import OrdersListAdmin from './admin/components/orders/ordersListAdmin';
import CategoriesList from './users/components/categoriesList';
import Wines from './users/components/wines';
import ProductsList from './users/components/productsList';
import Faq from './users/components/faq';


export default function AppRoutes() {
    return (
        <div>
            <BrowserRouter>
                <Routes> 
                    <Route path='/admin/*' element={<PanelAdmin />} />
                    <Route path='/*' element={<UserPanel />} />
                </Routes>
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/categories' element={<CategoriesList />} />
                    <Route path='/freshFish' element={<FreshFish />} />
                    <Route path='/frozenFish' element={<FrozenFish />} />
                    <Route path='/spices' element={<Spices />} />
                    <Route path='/recipes' element={<Recipes />} />
                    <Route path='/wines' element={<Wines />} />
                    <Route path='/order' element={<UserOrder />} />
                    <Route path='/products' element={<ProductsList />} />
                    <Route path='/faq' element={<Faq />} />


                    <Route path='/login' element={<Login />} />
                    <Route path='/admin' element={<AdminControll />} />
                    <Route path='/admin/categories' element={<CategoriesListAdmin/>} />
                    <Route path='/admin/products' element={<ProductsListAdmin/>} />
                    <Route path='/admin/orders' element={<OrdersListAdmin/>} />

                    
                </Routes>
                <Routes>
                    <Route path='/*' element={<UserFooter />} />
                </Routes>
            </BrowserRouter>
        </div>
    )
}
