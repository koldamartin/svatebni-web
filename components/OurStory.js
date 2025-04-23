import Image from 'next/image';

export default function SvatebníInformace() {
  return (
    <section id="svatebni-informace" className="section svatebni-informace">
      <div className="container">
        <h2 className="section-title">Svatební informace</h2>
        
        <div className="story-content">
          <div className="story-text">
  <p>
    Počet hostů bude přibližně 80–100. Děti i pejsci jsou u nás srdečně vítáni (jen prosíme, aby si váš pejsek rozuměl s naším Edou). Pro děti bude připraven menší skákací hrad, takže o zábavu nebude nouze.
  </p>
  <p>
    Na místě se můžete těšit na polévku, guláš a bohatý raut. K ochutnání bude několik druhů piv, zejména svrchně kvašené speciály z okolních minipivovarů, ale také prosecco, víno a nealko nápoje.
  </p>
  <p>
    Profesionálního fotografa nemáme, a proto budeme moc rádi, když zachytíte pár momentek a podělíte se s námi. DJ jsme také nezajistili, ale hudba bude – k dispozici bude notebook se Spotify a možná dorazí i kapela.
  </p>
      </div>
      <div className="story-image">
        <Image
          src="/pictures/20231126_141728.jpg"
          alt="Naše společná fotografie"
          width={400}
          height={300}
          style={{ width: '100%', height: 'auto', maxWidth: '400px' }}
          className="fade-border"
          priority
        />
      </div>
    </div>
  </div>

      <style jsx>{`
        .our-story {
          background-color: var(--light-color);
        }
        
        .story-content {
          display: grid;
          grid-template-columns: 3fr 2fr;
          gap: 3rem;
          align-items: center;
        }
        .story-image {
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .fade-border {
          border-radius: 24px;
          border: 4px solid #fff;
          box-shadow: 0 4px 32px 0 rgba(0,0,0,0.12);
          position: relative;
          z-index: 1;
          /* Fading border using a mask */
          -webkit-mask-image: radial-gradient(circle at center, rgba(0,0,0,1) 85%, rgba(0,0,0,0) 100%);
          mask-image: radial-gradient(circle at center, rgba(0,0,0,1) 85%, rgba(0,0,0,0) 100%);
        }
        
        .story-text p {
          margin-bottom: 1.5rem;
          line-height: 1.8;
          font-size: 1.1rem;
        }
        
        .story-quote {
          padding: 2rem;
          background-color: var(--primary-color);
          border-radius: 8px;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
        }
        
        blockquote {
          font-family: var(--font-main);
          font-size: 1.5rem;
          line-height: 1.6;
          color: var(--text-color);
          font-style: italic;
          margin-bottom: 1rem;
          position: relative;
        }
        
        blockquote::before {
          content: '\u201C';
          font-size: 4rem;
          position: absolute;
          left: -1.5rem;
          top: -1rem;
          color: var(--secondary-color);
          opacity: 0.5;
        }
        
        cite {
          display: block;
          font-size: 1rem;
          margin-top: 1rem;
          text-align: right;
          font-style: normal;
          color: var(--secondary-color);
        }
        
        @media (max-width: 768px) {
          .story-content {
            grid-template-columns: 1fr;
          }
          .story-image {
            margin-top: 2rem;
          }
          .story-quote {
            margin-top: 1rem;
          }
        }
      `}</style>
    </section>
  );
}
