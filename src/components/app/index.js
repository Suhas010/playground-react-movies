import Header from './header';
import Footer from './footer';
import Master from '../master'
import './index.css';
import { MoviesProvider } from '../../context/movies';
import { ThemeProvider } from '../../context/theme';

function App() {
  return (
    <ThemeProvider>
      <Header />
      <MoviesProvider>
        <Master />
      </MoviesProvider>
      <Footer />
     </ThemeProvider>
  );
}

export default App;
