import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-logo">
            <h3>Created</h3>
            <p>Vibe coded in <span className="heart">❤️</span> <a href="https://windsurf.com" target="_blank" rel="noopener noreferrer">Windsurf.com</a></p>
            <p className="ai-credits">Made by <strong>Claude Sonnet 3.7</strong> with contributions from <strong>GPT-4.1</strong></p>
            <h3 style={{ marginTop: '1rem' }}>Webpage code</h3>
            <p><a href="https://github.com/koldamartin/svatebni-web" target="_blank" rel="noopener noreferrer">GitHub</a></p>
          </div>
          
          <div className="footer-links">
            <h4>Navigace</h4>
            <ul>
              <li><Link href="/" legacyBehavior>Domů</Link></li>
              <li><Link href="/#svatebni-informace" legacyBehavior>Svatební informace</Link></li>

              <li><Link href="/#timeline" legacyBehavior>Časová osa</Link></li>
              <li><Link href="/#memories" legacyBehavior>Vzpomínky</Link></li>
            </ul>
          </div>
          
          <div className="footer-contact">
            <h4>Kontakt</h4>
            <p>Email: mkko@seznam.cz</p>
            <p>Email: vesela.bara@seznam.cz</p>
            <p>Telefon: +420 721 769 674</p>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; {currentYear} Svatba Bára & Martin. Všechna práva vyhrazena.</p>

        </div>
      </div>
      <style jsx>{`
        .footer {
          background-color: var(--primary-color);
          padding: 4rem 0 1rem;
          margin-top: 3rem;
        }
        
        .footer-content {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 2rem;
          margin-bottom: 2rem;
        }
        
        .footer-logo h3 {
          color: var(--secondary-color);
          margin-bottom: 1rem;
        }
        
        .footer-links h4,
        .footer-contact h4 {
          margin-bottom: 1rem;
          color: var(--text-color);
        }
        
        .footer-links ul {
          list-style: none;
        }
        
        .footer-links li {
          margin-bottom: 0.5rem;
        }
        
        .footer-links a {
          color: var(--text-color);
          transition: color 0.3s ease;
        }
        
        .footer-links a:hover {
          color: var(--secondary-color);
        }
        
        .footer-contact p {
          margin-bottom: 0.5rem;
        }
        
        .footer-bottom {
          text-align: center;
          padding-top: 2rem;
          border-top: 1px solid rgba(92, 79, 61, 0.2);
        }
        
        .ai-credits {
          margin-top: 1rem;
          font-size: 1.1rem;
          color: var(--text-color);
        }
        
        @media (max-width: 768px) {
          .footer-content {
            grid-template-columns: 1fr;
            text-align: center;
          }
          
          .footer-links ul {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            gap: 1rem;
          }
          
          .footer-links li {
            margin-bottom: 0;
          }
        }
      `}</style>
    </footer>
  );
}
