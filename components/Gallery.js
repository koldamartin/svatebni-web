import Image from 'next/image';

export default function Gallery() {
  // In a real application, this would come from a database or API
  // For now, we'll use the single image we have multiple times
  const images = Array(6).fill('/pictures/20231126_141728.jpg');

  return (
    <section id="gallery" className="section gallery">
      <div className="container">
        <h2 className="section-title">Galerie</h2>
        
        <div className="gallery-grid">
          {images.map((src, index) => (
            <div key={index} className="gallery-item">
              <Image 
                src={src} 
                alt={`Svatební fotografie ${index + 1}`} 
                width={400} 
                height={300}
                className="gallery-image"
              />
            </div>
          ))}
        </div>
        
        <div className="gallery-cta">
          <p>Chcete vidět více fotografií?</p>
          <button className="btn">Zobrazit celou galerii</button>
        </div>
      </div>

      <style jsx>{`
        .gallery {
          background-color: var(--primary-color);
        }
        
        .gallery-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 1.5rem;
          margin-bottom: 3rem;
        }
        
        .gallery-item {
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
          transition: transform 0.3s ease;
        }
        
        .gallery-item:hover {
          transform: translateY(-5px);
        }
        
        .gallery-cta {
          text-align: center;
        }
        
        .gallery-cta p {
          margin-bottom: 1rem;
          font-size: 1.1rem;
        }
        
        @media (max-width: 768px) {
          .gallery-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        
        @media (max-width: 480px) {
          .gallery-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
}
