import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setScrolled(scrollPosition > 50);

      // Determine active section based on scroll position
      const sections = ['svatebni-informace', 'timeline', 'misto-svatby'];

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section);
            break;
          } else if (scrollPosition < 100) {
            setActiveSection('');
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (isMenuOpen && !e.target.closest('.navbar-container')) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isMenuOpen]);

  // Handle smooth scrolling for anchor links
  const scrollToSection = (e, sectionId) => {
    e.preventDefault();
    const section = document.getElementById(sectionId);
    if (section) {
      window.scrollTo({
        top: section.offsetTop - 80,
        behavior: 'smooth'
      });
      setIsMenuOpen(false);
    } else {
      window.location.href = `/#${sectionId}`;
    }
  };

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="container navbar-container">
        <Link href="/" className="navbar-logo" legacyBehavior>
          <a className="navbar-logo-link">
            <span className="logo-text">BÁRA & MARTIN</span>
          </a>
        </Link>

        <div className="navbar-toggle" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <span className={isMenuOpen ? 'active' : ''}></span>
          <span className={isMenuOpen ? 'active' : ''}></span>
          <span className={isMenuOpen ? 'active' : ''}></span>
        </div>

        <ul className={`navbar-menu ${isMenuOpen ? 'active' : ''}`}>
          <li>
            <Link href="/" className={`navbar-link ${activeSection === '' && scrolled === false ? 'active' : ''}`} legacyBehavior>
              <a onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
                setIsMenuOpen(false);
              }}>Úvod</a>
            </Link>
          </li>
          <li>
            <Link href="/#svatebni-informace" className={`navbar-link ${activeSection === 'svatebni-informace' ? 'active' : ''}`} legacyBehavior>
              <a onClick={(e) => scrollToSection(e, 'svatebni-informace')}>Svatební informace</a>
            </Link>
          </li>
          <li>
            <Link href="/#timeline" className={`navbar-link ${activeSection === 'timeline' ? 'active' : ''}`} legacyBehavior>
              <a onClick={(e) => scrollToSection(e, 'timeline')}>Naše cesta</a>
            </Link>
          </li>
          <li>
            <Link href="/#misto-svatby" className={`navbar-link ${activeSection === 'misto-svatby' ? 'active' : ''}`} legacyBehavior>
              <a onClick={(e) => scrollToSection(e, 'misto-svatby')}>Místo svatby</a>
            </Link>
          </li>
        </ul>

        <Link href="/rsvp" legacyBehavior>
          <a className="navbar-confirm-button-container">
            <button className="navbar-confirm-button">
              <span>Potvrdit účast</span>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="button-icon">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </a>
        </Link>
      </div>
      <style jsx>{`
        .navbar {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 1000;
          transition: all 0.3s ease;
          background-color: rgba(255, 255, 255, 0.8);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          box-shadow: 0 0 0 rgba(0, 0, 0, 0);
        }

        .navbar.scrolled {
          background-color: rgba(255, 255, 255, 0.95);
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
        }

        .navbar-container {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1rem 2rem;
          max-width: 1400px;
          margin: 0 auto;
          height: 70px;
        }

        .navbar-logo-link {
          display: flex;
          align-items: center;
          text-decoration: none;
          cursor: pointer;
        }

        .logo-text {
          font-family: var(--font-main);
          font-size: 1.1rem;
          font-weight: 600;
          color: #333;
          letter-spacing: 1.5px;
          position: relative;
          transition: all 0.3s ease;
        }

        .logo-text:after {
          content: '';
          position: absolute;
          bottom: -5px;
          left: 0;
          width: 0;
          height: 2px;
          background: linear-gradient(90deg, #3b82f6, #60a5fa);
          transition: width 0.3s ease;
        }

        .navbar-logo-link:hover .logo-text:after {
          width: 100%;
        }

        .navbar-menu {
          display: flex;
          list-style: none;
          margin: 0;
          padding: 0;
          gap: 0.5rem;
        }

        .navbar-menu li {
          margin: 0 0.8rem;
          position: relative;
        }

        .navbar-link {
          padding: 0.5rem 0.8rem;
          margin: 0;
          color: #666;
          font-weight: 500;
          font-size: 0.9rem;
          transition: all 0.3s ease;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          position: relative;
          display: inline-block;
          text-decoration: none;
        }

        .navbar-link:after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 50%;
          width: 0;
          height: 2px;
          background: linear-gradient(90deg, #3b82f6, #60a5fa);
          transition: all 0.3s ease;
          transform: translateX(-50%);
        }

        .navbar-link:hover, .navbar-link.active {
          color: #333;
        }

        .navbar-link:hover:after, .navbar-link.active:after {
          width: 80%;
        }

        .navbar-toggle {
          display: none;
          flex-direction: column;
          justify-content: space-between;
          width: 30px;
          height: 21px;
          cursor: pointer;
          z-index: 100;
        }

        .navbar-toggle span {
          display: block;
          height: 3px;
          width: 100%;
          background-color: #333;
          border-radius: 3px;
          transition: all 0.3s ease;
        }

        .navbar-toggle span.active:nth-child(1) {
          transform: rotate(45deg) translate(5px, 6px);
        }

        .navbar-toggle span.active:nth-child(2) {
          opacity: 0;
        }

        .navbar-toggle span.active:nth-child(3) {
          transform: rotate(-45deg) translate(5px, -6px);
        }

        .navbar-confirm-button-container {
          text-decoration: none;
        }

        .navbar-confirm-button {
          background: linear-gradient(135deg, #3b82f6, #2563eb);
          color: white;
          border: none;
          padding: 0.6rem 1.6rem;
          border-radius: 9999px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          font-size: 0.85rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
          box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
        }

        .button-icon {
          width: 16px;
          height: 16px;
          transition: transform 0.3s ease;
        }
        
        @media (max-width: 768px) {
          .button-icon {
            width: 12px;
            height: 12px;
          }
        }

        .navbar-confirm-button:hover {
          background: linear-gradient(135deg, #2563eb, #1d4ed8);
          transform: translateY(-2px);
          box-shadow: 0 6px 16px rgba(59, 130, 246, 0.4);
        }

        .navbar-confirm-button:hover .button-icon {
          transform: translateX(3px);
        }

        @media (max-width: 1024px) {
          .navbar-menu li {
            margin: 0 0.5rem;
          }
          
          .navbar-link {
            font-size: 0.8rem;
            padding: 0.5rem 0.6rem;
          }
        }

        @media (max-width: 768px) {
          .navbar-container {
            padding: 0.8rem 1.5rem;
          }
          
          .navbar-toggle {
            display: flex;
          }

          .navbar-menu {
            position: fixed;
            top: 70px;
            left: 0;
            right: 0;
            flex-direction: column;
            background-color: rgba(255, 255, 255, 0.98);
            backdrop-filter: blur(10px);
            -webkit-backdrop-filter: blur(10px);
            box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
            padding: 1.5rem 0;
            height: 0;
            overflow: hidden;
            opacity: 0;
            transition: all 0.4s ease;
          }

          .navbar-menu.active {
            height: auto;
            opacity: 1;
            padding: 1.5rem 0;
          }

          .navbar-menu li {
            margin: 0.8rem 0;
            opacity: 0;
            transform: translateY(20px);
            transition: all 0.3s ease;
          }

          .navbar-menu.active li {
            opacity: 1;
            transform: translateY(0);
            transition-delay: calc(0.1s * var(--i, 0));
          }

          .navbar-menu li:nth-child(1) { --i: 1; }
          .navbar-menu li:nth-child(2) { --i: 2; }
          .navbar-menu li:nth-child(3) { --i: 3; }
          .navbar-menu li:nth-child(4) { --i: 4; }

          .navbar-link {
            padding: 0.75rem 2rem 0.75rem 4rem;
            display: block;
            width: 100%;
            text-align: left;
            font-size: 1rem;
            transition: padding 0.3s ease;
          }

          .navbar-link:after {
            bottom: 5px;
          }

          .navbar-confirm-button {
            margin: 1.2rem auto 0.5rem;
            padding: 0.5rem 1.2rem;
            font-size: 0.75rem;
            width: 70%;
            justify-content: center;
          }
        }
      `}</style>
    </nav>
  );
}
