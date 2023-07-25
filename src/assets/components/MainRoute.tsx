// MainRoute.tsx
import { Route, Routes } from 'react-router-dom';
//import Home from './pages/Home';
//import About from './pages/About';
//import Profile from './pages/Profile';
import PokemonDetails from './PokemonDetails'; // Import the new component
import InnerContent from './InnerContent';

const MainRoute = () => {
  return (
    <Routes>
      <Route path='/' element={<InnerContent />}>

        <Route path="/details/:id" element={<PokemonDetails id={parseInt(':id')} />} />
        </Route>
    </Routes>
  );
};

export default MainRoute;
