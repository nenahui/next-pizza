import './styles/App.css';
import { Route, Routes } from 'react-router-dom';
import { DishForm } from './features/DishForm/DishForm';
import { Header } from './components/Header/Header';
import { Layout } from './components/Layout/Layout';
import { Dishes } from './features/Dishes/Dishes';
import { Orders } from './features/Orders/Orders';

export const App = () => {
  return (
    <Layout>
      <Header />
      <Routes>
        <Route path={'/admin/dishes'} element={<Dishes />}>
          <Route path={'new-dish'} element={<DishForm formType={'create'} />} />
          <Route path={'edit-dish/:dishId'} element={<DishForm formType={'edit'} />} />
        </Route>
        <Route path={'/admin/orders'} element={<Orders />} />
      </Routes>
    </Layout>
  );
};
