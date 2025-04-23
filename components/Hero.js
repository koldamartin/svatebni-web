import Image from 'next/image';

export default function Hero() {
  return (
    <section className="hero">
      <div className="container">
        <div className="hero-content">
          <h1>Svatba Báry a Martina</h1>
          <p>4. října na jezeře v Poděbradech</p>
          <div className="hero-buttons">
            <a href="#gallery" className="btn">Prohlédnout galerii</a>
            <a href="#svatebni-informace" className="btn btn-outline">Svatební informace</a>
          </div>
        </div>
        <div className="hero-image-container">
          <Image 
            src="/pictures/20220418_121058.jpg" 
            alt="Svatební fotografie" 
            width={400} 
            height={500}
            className="hero-image rounded-image"
            priority
          />
        </div>
      </div>

      <style jsx>{`
        .hero {
          padding: 5rem 0;
          background-color: var(--primary-color);
          position: relative;
          overflow: hidden;
        }

        .hero::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(135deg, rgba(245, 230, 224, 0.9) 0%, rgba(245, 230, 224, 0.4) 100%);
          z-index: 1;
        }

        .container {
          position: relative;
          z-index: 2;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 2rem;
        }

        .hero-content {
          flex: 1;
        }

        .hero-content h1 {
          font-size: 3rem;
          margin-bottom: 1rem;
          color: var(--text-color);
        }

        .hero-content p {
          font-size: 1.2rem;
          margin-bottom: 2rem;
          color: var(--text-color);
          max-width: 500px;
        }

        .hero-buttons {
          display: flex;
          gap: 1rem;
        }

        .btn-outline {
          background-color: transparent;
          border: 2px solid var(--secondary-color);
          color: var(--secondary-color);
        }

        .btn-outline:hover {
          background-color: var(--secondary-color);
          color: var(--light-color);
        }

        .hero-image-container {
          flex: 1;
          display: flex;
          justify-content: flex-end;
        }

        @media (max-width: 768px) {
          .container {
            flex-direction: column-reverse;
            text-align: center;
          }

          .hero-content h1 {
            font-size: 2.5rem;
          }

          .hero-content p {
            margin: 0 auto 2rem;
          }

          .hero-buttons {
            justify-content: center;
          }

          .hero-image-container {
            justify-content: center;
            margin-bottom: 2rem;
          }
        }
      `}</style>
    </section>
  );
}
