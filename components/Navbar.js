import Link from 'next/link';
import { useState } from 'react';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="container navbar-container">
        <Link href="/" className="navbar-logo" legacyBehavior>
          BÁRA & MARTIN
        </Link>

        <div className="navbar-toggle" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <span></span>
          <span></span>
          <span></span>
        </div>

        <ul className={`navbar-menu ${isMenuOpen ? 'active' : ''}`}>
          <li>
            <Link href="/" className="navbar-link" legacyBehavior>Úvod</Link>
          </li>
          <li>
            <Link href="/#svatebni-informace" className="navbar-link" legacyBehavior>Svatební informace</Link>
          </li>
          <li>
            <Link href="/#gallery" className="navbar-link" legacyBehavior>Galerie</Link>
          </li>
          <li>
            <Link href="/#timeline" className="navbar-link" legacyBehavior>Naše cesta</Link>
          </li>
          <li>
            <Link href="/#misto-svatby" className="navbar-link" legacyBehavior>Místo svatby</Link>
          </li>
        </ul>
      </div>
      <style jsx>{`
        .navbar {
          background-color: white;
          position: sticky;
          top: 0;
          z-index: 100;
          border-bottom: 1px solid #f0f0f0;
        }

        .navbar-container {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1rem 2rem;
        }

        .navbar-logo {
          font-family: var(--font-main);
          font-size: 1rem;
          font-weight: 500;
          color: #000;
          letter-spacing: 1px;
        }

        .navbar-menu {
          display: flex;
          list-style: none;
        }

        .navbar-menu li {
          margin: 0 1.5rem;
        }

        .navbar-link {
          padding: 0.5rem 1rem;
          margin: 0;
          color: #a8a8a8;
          font-weight: 400;
          font-size: 0.9rem;
          transition: color 0.3s ease;
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .navbar-link:hover {
          color: #000;
        }

        .navbar-toggle {
          display: none;
          flex-direction: column;
          justify-content: space-between;
          width: 30px;
          height: 21px;
          cursor: pointer;
        }

        .navbar-toggle span {
          display: block;
          height: 3px;
          width: 100%;
          background-color: var(--text-color);
          border-radius: 3px;
        }

        @media (max-width: 768px) {
          .navbar-toggle {
            display: flex;
          }

          .navbar-menu {
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            flex-direction: column;
            background-color: var(--light-color);
            box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);
            padding: 1rem 0;
            display: none;
          }

          .navbar-menu.active {
            display: flex;
          }

          .navbar-link {
            padding: 0.75rem 2rem;
            display: block;
            width: 100%;
          }
        }
      `}</style>
    </nav>
  );
}
