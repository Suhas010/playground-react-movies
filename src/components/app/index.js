import Header from './header';
import Footer from './footer';
import Master from '../master'
import './index.css';
import { MoviesProvider } from '../../context/movies';

function App() {
  return (
    <>
      <Header />
      <MoviesProvider>
        <Master />
      </MoviesProvider>
      <Footer />
     </>
  );
}

export default App;
