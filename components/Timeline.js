export default function Timeline() {
  const timelineEvents = [
    {
      date: 'Červenec 2013',
      title: 'První setkání',
      description: 'Poprvé jsme se viděli na sportovním kurzu ČVUT na Orlíku'
    },
    {
      date: '2021',
      title: 'První rande Na tý Louce Zelený',
      description: 'Martin vzal Baru s bezlepkovou dietou na tamní sekanou v housce'
    },
    {
      date: '28. října 2024',
      title: 'Narození 1. potomka',
      description: 'Na výročí republiky se nám narodil malý Isildur'
    },
    {
      date: '22. března 2025',
      title: 'Zasnoubení u hromady hnoje',
      description: 'Martin požádal báru o ruku při západu slunce u hromady hnoje a ani nepočkal jestli Bára řekne ano."'
    },
    {
      date: '4. října 2025',
      title: 'Svatební den',
      description: 'Svatba ve velkém stylu, kdy i Jiří Kára zbledne závistí'
    }
  ];

  return (
    <section id="timeline" className="section timeline-section">
      <div className="container">
        <h2 className="section-title">Naše cesta</h2>
        
        <div className="timeline">
          {timelineEvents.map((event, index) => (
            <div key={index} className="timeline-item">
              <div className="timeline-content">
                <div className="timeline-date">{event.date}</div>
                <h3 className="timeline-title">{event.title}</h3>
                <p className="timeline-description">{event.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .timeline-section {
          background-color: var(--light-color);
        }
        
        .timeline-date {
          font-size: 0.9rem;
          color: var(--secondary-color);
          font-weight: 500;
          margin-bottom: 0.5rem;
        }
        
        .timeline-title {
          margin-bottom: 0.75rem;
          color: var(--text-color);
        }
        
        .timeline-description {
          line-height: 1.6;
        }
        
        .timeline-item::before {
          content: '';
          position: absolute;
          width: 20px;
          height: 20px;
          background-color: var(--secondary-color);
          border-radius: 50%;
          top: 15px;
          z-index: 1;
        }
        
        .timeline-item:nth-child(odd)::before {
          right: -10px;
        }
        
        .timeline-item:nth-child(even)::before {
          left: -10px;
        }
        
        @media (max-width: 768px) {
          .timeline-item::before {
            left: 21px;
          }
        }
      `}</style>
    </section>
  );
}
