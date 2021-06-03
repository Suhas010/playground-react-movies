import { memo } from 'react';
import './footer.css';

const Footer = () => (
  <footer>
    <div className="footer-container">
    Made by
    <a href="https://suhas010.com" target="_blank" rel="noreferrer">Suhas010</a>
    &#129299;
    <div className="follow">
      <a href="https://twitter.com/suhas0101" target="_blank" rel="noreferrer">Twitter</a>
      <a href="https://linkedin.com/in/suhas-more" target="_blank" rel="noreferrer">LinkeIn</a>
      <a href="https://github.com/suhas010" target="_blank" rel="noreferrer">GitHub</a>
    </div>
    </div>
  </footer>
);

export default memo(Footer)