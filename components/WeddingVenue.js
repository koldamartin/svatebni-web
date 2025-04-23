import { useEffect, useRef } from 'react';

export default function WeddingVenue() {
  const mapRef = useRef(null);

  useEffect(() => {
    // Initialize Google Maps when component mounts
    const initMap = () => {
      if (!mapRef.current || typeof google === 'undefined') return;
      
      // Coordinates for Poděbrady Lake area
      const location = { lat: 50.1425, lng: 15.1186 };
      
      const map = new google.maps.Map(mapRef.current, {
        center: location,
        zoom: 14,
        mapTypeId: 'roadmap',
        mapTypeControl: true,
        scrollwheel: false,
        draggable: true,
        styles: [
          {
            featureType: 'water',
            elementType: 'geometry',
            stylers: [{ color: '#e9e9e9' }, { lightness: 17 }]
          }
        ]
      });
      
      // Add marker for the venue
      new google.maps.Marker({
        position: location,
        map: map,
        title: 'Místo svatby'
      });
    };

    // Load Google Maps API script
    if (!window.google) {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&callback=initGoogleMap`;
      script.async = true;
      script.defer = true;
      window.initGoogleMap = initMap;
      document.head.appendChild(script);
    } else {
      initMap();
    }

    return () => {
      // Clean up
      window.initGoogleMap = null;
    };
  }, []);

  return (
    <section id="misto-svatby" className="section wedding-venue">
      <div className="container">
        <h2 className="section-title">Místo svatby</h2>
        
        <div className="venue-content">
          <div className="venue-info">
            <div className="venue-text">
              <p>
                Naše svatba se bude konat v krásném prostředí u Poděbradského jezera, které nabízí
                romantickou atmosféru obklopenou přírodou a klidnou vodní hladinou.
              </p>
              <p>
                Pro všechny hosty je k dispozici dostatek parkovacích míst přímo u objektu, takže
                se nemusíte obávat, kam zaparkovat.
              </p>
              <p>
                Svatební obřad i následná oslava se budou konat v rozlehlé budově s přístupem
                na venkovní terasu, která poskytuje nádherný výhled na jezero. Venkovní prostory
                jsou ideální pro letní oslavu a pořízení krásných fotografií.
              </p>
              <p>
                V případě nepříznivého počasí máme připravené vnitřní prostory, které jsou
                klimatizované a nabízejí stejně příjemnou atmosféru.
              </p>
            </div>
            
            <div className="venue-details">
              <div className="detail-item">
                <h3>Adresa</h3>
                <p>Jezerní 345, Poděbrady, 290 01</p>
              </div>
              
              <div className="detail-item">
                <h3>Parkování</h3>
                <p>Dostatek parkovacích míst přímo u objektu</p>
              </div>
              
              <div className="detail-item">
                <h3>Ubytování</h3>
                <p>Možnost ubytování přímo v areálu nebo v blízkém okolí</p>
              </div>
            </div>
          </div>
          
          <div className="venue-map">
  <iframe
    style={{ border: 'none', width: '100%', height: '100%' }}
    src="https://mapy.com/s/gegepafege"
    width="100%"
    height="100%"
    frameBorder="0"
    allowFullScreen
    title="Mapa svatebního místa"
  ></iframe>
</div>
        </div>
      </div>

      <style jsx>{`
        .wedding-venue {
          background-color: var(--light-color);
          padding: 5rem 0;
        }
        
        .venue-content {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 3rem;
          align-items: start;
        }
        
        .venue-text p {
          margin-bottom: 1.5rem;
          line-height: 1.8;
          font-size: 1.1rem;
        }
        
        .venue-details {
          margin-top: 2rem;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.5rem;
        }
        
        .detail-item {
          background-color: var(--primary-color);
          padding: 1.5rem;
          border-radius: 8px;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
        }
        
        .detail-item h3 {
          font-size: 1.2rem;
          margin-bottom: 0.5rem;
          color: var(--secondary-color);
        }
        
        .venue-map {
          width: 100%;
          height: 400px;
          max-width: 600px;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
          margin: 0 auto;
          display: flex;
        }
        
        .venue-map iframe {
          width: 100%;
          height: 100%;
          display: block;
          border: none;
        }
        
        @media (max-width: 768px) {
          .venue-content {
            grid-template-columns: 1fr;
          }
          
          .venue-details {
            grid-template-columns: 1fr;
          }
          
          .venue-map {
            margin-top: 2rem;
            height: 300px;
          }
        }
      `}</style>
    </section>
  );
}
