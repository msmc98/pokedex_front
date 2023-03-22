import Pokedex from '../pages/Pokedex';
import Pokemon from '../pages/Pokemon';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Region from '../pages/Regions';
import { regions } from './../interfaces/regions';

const regs = regions.map((region) => {
  return {
    path: 'regions'+region.path,
    name: region.name,
    component: <Region />,
    visible: true,
    redirection: '/',
  };
});


const routes = [
    {
      path: '/',
      name: 'Login',
      component: <Login />,
      visible: false,
      redirection: '/pokedex',
    },
    {
      path: '/register',
      name: 'Register',
      component: <Register />,
      visible: false,
      redirection: '/pokedex',
    },
    {
      path: '/pokedex',
      name: 'Pokedex',
      component: <Pokedex />,
      visible: true,
      redirection: '/',
    },
    {
      path: '/pokemon/:id',
      name: 'Pokemon',
      component: <Pokemon />,
      visible: false,
      redirection: '/',
    },
    ...regs,
    {
      path: '*',
      name: '404',
      component: <h1>404</h1>,
      visible: false,
    },
  ]
  
  export default routes;