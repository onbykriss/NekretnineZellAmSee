import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import NavBarNekretnine from './Components/NavBarNekretnine'
import { Route, Routes } from 'react-router-dom'
import { RouteNames } from './constants'
import StanoviPregled from './pages/stanovi/StanoviPregled'
import StanoviDodaj from './pages/stanovi/StanoviDodaj'
import StanoviPromjena from './pages/stanovi/StanoviPromjena'
import { Container } from 'react-bootstrap'
import ZakupciPregled from './pages/zakupci/ZakupciPregled'
import ZakupciDodaj from './pages/zakupci/ZakupciDodaj'
import ZakupciPromjena from './pages/zakupci/ZakupciPromjena'
import NajmoviPregled from './pages/najmovi/NajmoviPregled'
import NajmoviDodaj from './pages/najmovi/NajmoviDodaj'
import NajmoviPromjena from './pages/najmovi/NajmoviPromjena'

import LoadingSpinner from './Components/LoadingSpinner'
import NAdzornaPloca from './pages/NAdzornaPloca'
import useError from "./hooks/useError"
import ErrorModal from "./components/ErrorModal"

// *********************************************************************************************************
function App() {

  const { errors, prikaziErrorModal, sakrijError } = useError();

  function godina(){
    const pocenta = 2024;
    const trenutna = new Date().getFullYear();
    if(pocenta===trenutna){
      return trenutna;
    }
    return pocenta + ' - ' + trenutna;
  }


  return (
    <>
    <LoadingSpinner />
    <ErrorModal show={prikaziErrorModal} errors={errors} onHide={sakrijError} />
    <Container className='aplikacija'>
      <NavBarNekretnine />
      <Routes>
        <Route path={RouteNames.HOME} element={<NAdzornaPloca/>} />
       
        <Route path={RouteNames.STANOVI_PREGLED} element={<StanoviPregled />} />
        <Route path={RouteNames.STANOVI_NOVI} element={<StanoviDodaj />} />
        <Route path={RouteNames.STANOVI_PROMJENA} element={<StanoviPromjena />} />
        
        <Route path={RouteNames.ZAKUPCI_PREGLED} element={<ZakupciPregled />} />  
        <Route path={RouteNames.ZAKUPCI_NOVI} element={<ZakupciDodaj />} />
        <Route path={RouteNames.ZAKUPCI_PROMJENA} element={<ZakupciPromjena />} />
         
        <Route path={RouteNames.NAJMOVI_PREGLED} element={<NajmoviPregled />} />
        <Route path={RouteNames.NAJMOVI_NOVI} element={<NajmoviDodaj />} />
        <Route path={RouteNames.NAJMOVI_PROMJENA} element={<NajmoviPromjena />} />
      
        
      </Routes>
      </Container>
    <Container>
      <hr/>
      &copy; Nekretnine Zell am See, {godina()}
    </Container>
    
    </>
  )
}

export default App