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
import ZakupciPregled from './pages/zakupci/ZakupciPregled';
import ZakupciDodaj from './pages/zakupci/ZakupciDodaj';
import ZakupciPromjena from './pages/zakupci/ZakupciPromjena';
import NajmoviPregled from './pages/najmovi/NajmoviPregled';
import NajmoviDodaj from './pages/najmovi/NajmoviDodaj';
import NajmoviPromjena from './pages/najmovi/NajmoviPromjena';
import LoadingSpinner from './components/LoadingSpinner'


function App() {

  return (
    <>
    <LoadingSpinner />
    <Container>
      <NavBarNekretnine />
      <Routes>
        <Route path={RouteNames.HOME} element={<Pocetna/>} />

        <Route path={RouteNames.STANOVI_PREGLED} element={<StanoviPregled />} />
        <Route path={RouteNames.STANOVI_NOVI} element={<StanoviDodaj />} />
        <Route path="/stanovi/promjena/:idstanovi" element={<StanoviPromjena />} />
        
        <Route path={RouteNames.ZAKUPCI_PREGLED} element={<ZakupciPregled />} />  
        <Route path={RouteNames.ZAKUPCI_NOVI} element={<ZakupciDodaj />} />
        <Route path="/zakupci/promjena/:idzakupci" element={<ZakupciPromjena />} />
         
        <Route path={RouteNames.NAJMOVI_PREGLED} element={<NajmoviPregled />} />
        <Route path={RouteNames.NAJMOVI_NOVI} element={<NajmoviDodaj />} />
        <Route path="/najmovi/promjena/:idnajmovi" element={<NajmoviPromjena />} />
        
      </Routes>
      <hr/>
      &copy; Nekretnine Zell am See 2024
    </Container>
    
    </>
  )
}

export default App