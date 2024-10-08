import 'bootstrap/dist/css/bootstrap.min.css'
import Container from 'react-bootstrap/Container';
import './App.css'
import NavBarNekretnine from './Components/NavBarNekretnine';
import { Route, Routes } from 'react-router-dom';
import { RouteNames } from './constants';
import Pocetna from './pages/Pocetna';
import StanoviPregled from './pages/stanovi/StanoviPregled';
import StanoviDodaj from './pages/stanovi/StanoviDodaj';
import StanoviPromjena from './pages/stanovi/StanoviPromjena';


function App() {

  return (
    <>
    <Container>
      <NavBarNekretnine />
      <Routes>
        <Route path={RouteNames.HOME} element={<Pocetna/>} />

        <Route path={RouteNames.STANOVI_PREGLED} element={<StanoviPregled />} />
        <Route path={RouteNames.STANOVI_NOVI} element={<StanoviDodaj />} />
        <Route path="/stanovi/promjena/:idstanovi" element={<StanoviPromjena />} />
      </Routes>
      <hr/>
      &copy; Nekretnine Zell am See 2024
    </Container>
    
    </>
  )
}

export default App