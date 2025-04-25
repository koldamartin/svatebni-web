import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Hero() {
  // Countdown timer state
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  // Animation states
  const [isVisible, setIsVisible] = useState(false);

  // Calculate time until wedding date
  useEffect(() => {
    // Set wedding date - October 4th, 2025
    const weddingDate = new Date('2025-10-04T16:00:00');
    
    setIsVisible(true);
    
    const timer = setInterval(() => {
      const now = new Date();
      const difference = weddingDate - now;
      
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      } else {
        clearInterval(timer);
      }
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);

  // Parallax effect for background
  useEffect(() => {
    const handleScroll = () => {
      const scrollValue = window.scrollY;
      const heroElement = document.querySelector('.hero-background');
      if (heroElement) {
        heroElement.style.transform = `translateY(${scrollValue * 0.4}px)`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="hero">
      <div className="hero-background"></div>
      <div className="hero-overlay"></div>
      
      <div className="container">
        <div className={`hero-content ${isVisible ? 'fade-in' : ''}`}>
          <h1 className="title-animation">Svatba Báry a Martina</h1>
          <p className="subtitle-animation">4. října na jezeře v Poděbradech</p>
          
          <div className="countdown-container">
            <div className="countdown-item">
              <span className="countdown-value">{timeLeft.days}</span>
              <span className="countdown-label">Dní</span>
            </div>
            <div className="countdown-item">
              <span className="countdown-value">{timeLeft.hours}</span>
              <span className="countdown-label">Hodin</span>
            </div>
            <div className="countdown-item">
              <span className="countdown-value">{timeLeft.minutes}</span>
              <span className="countdown-label">Minut</span>
            </div>
            <div className="countdown-item">
              <span className="countdown-value">{timeLeft.seconds}</span>
              <span className="countdown-label">Sekund</span>
            </div>
          </div>
          
          <div className="hero-buttons">
            <Link href="/rsvp" legacyBehavior>
              <a className="btn btn-primary pulse-animation">Potvrď účast</a>
            </Link>
            <Link href="/info" legacyBehavior>
              <a className="btn btn-outline fade-in-delay">Informace</a>
            </Link>
          </div>
        </div>
        
        <div className={`hero-image-container ${isVisible ? 'slide-in' : ''}`}>
          <div className="image-frame">
            <Image 
              src="/pictures/20220418_121058.jpg" 
              alt="Svatební fotografie" 
              width={500} 
              height={600}
              className="hero-image rounded-image"
              priority
            />
          </div>
          <div className="decorative-element element-1"></div>
          <div className="decorative-element element-2"></div>
        </div>
      </div>
      
      <style jsx>{`
        .hero {
          min-height: 100vh;
          position: relative;
          overflow: hidden;
          display: flex;
          align-items: center;
          perspective: 1000px;
        }
        
        .hero-background {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-image: url('/pictures/20230903_145219.jpg');
          background-size: cover;
          background-position: center;
          z-index: 0;
          transform: translateZ(-10px) scale(2);
          filter: blur(2px);
        }
        
        .hero-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(135deg, rgba(245, 230, 224, 0.92) 0%, rgba(245, 230, 224, 0.85) 100%);
          z-index: 1;
        }

        .container {
          position: relative;
          z-index: 2;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 3rem;
          padding: 0 2rem;
          max-width: 1200px;
          margin: 0 auto;
        }

        .hero-content {
          flex: 1;
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 1s ease, transform 1s ease;
        }
        
        .fade-in {
          opacity: 1;
          transform: translateY(0);
        }
        
        .fade-in-delay {
          animation: fadeIn 1s ease 0.5s forwards;
          opacity: 0;
        }

        .title-animation {
          animation: slideInFromLeft 1s ease-out forwards;
        }
        
        .subtitle-animation {
          animation: slideInFromLeft 1s ease-out 0.3s forwards;
          opacity: 0;
          animation-fill-mode: forwards;
        }

        .hero-content h1 {
          font-size: 3.5rem;
          margin-bottom: 1rem;
          color: var(--text-color);
          font-weight: 700;
          letter-spacing: 1px;
          text-shadow: 1px 1px 2px rgba(0,0,0,0.1);
        }

        .hero-content p {
          font-size: 1.4rem;
          margin-bottom: 2.5rem;
          color: var(--text-color);
          max-width: 500px;
          line-height: 1.6;
        }
        
        .countdown-container {
          display: flex;
          gap: 1.5rem;
          margin-bottom: 2.5rem;
        }
        
        .countdown-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          background: rgba(255, 255, 255, 0.8);
          border-radius: 12px;
          padding: 1rem;
          min-width: 80px;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
          backdrop-filter: blur(5px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          transition: transform 0.3s ease;
        }
        
        .countdown-item:hover {
          transform: translateY(-5px);
        }
        
        .countdown-value {
          font-size: 2rem;
          font-weight: 700;
          color: var(--secondary-color);
        }
        
        .countdown-label {
          font-size: 0.9rem;
          color: var(--text-color);
          margin-top: 0.3rem;
        }

        .hero-buttons {
          display: flex;
          gap: 1.5rem;
        }
        
        .btn {
          padding: 0.8rem 2rem;
          font-size: 1.1rem;
          border-radius: 50px;
          transition: all 0.3s ease;
          font-weight: 600;
          letter-spacing: 0.5px;
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
        }
        
        .btn-primary {
          background-color: var(--secondary-color);
          color: white;
          border: none;
        }
        
        .btn-primary:hover {
          transform: translateY(-3px);
          box-shadow: 0 7px 20px rgba(0, 0, 0, 0.15);
        }

        .btn-outline {
          background-color: transparent;
          border: 2px solid var(--secondary-color);
          color: var(--secondary-color);
        }

        .btn-outline:hover {
          background-color: var(--secondary-color);
          color: white;
          transform: translateY(-3px);
        }
        
        .pulse-animation {
          animation: pulse 2s infinite;
        }

        .hero-image-container {
          flex: 1;
          display: flex;
          justify-content: center;
          position: relative;
          opacity: 0;
          transform: translateX(20px);
          transition: opacity 1s ease, transform 1s ease;
        }
        
        .slide-in {
          opacity: 1;
          transform: translateX(0);
        }
        
        .image-frame {
          position: relative;
          padding: 10px;
          background: rgba(255, 255, 255, 0.8);
          border-radius: 15px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
          transform: rotate(-3deg);
          transition: transform 0.5s ease;
          z-index: 2;
        }
        
        .image-frame:hover {
          transform: rotate(0deg) scale(1.03);
        }
        
        .hero-image {
          border-radius: 10px;
          transition: filter 0.5s ease;
        }
        
        .decorative-element {
          position: absolute;
          border-radius: 50%;
          z-index: 1;
        }
        
        .element-1 {
          width: 150px;
          height: 150px;
          background: rgba(var(--secondary-color-rgb), 0.2);
          top: -40px;
          right: -30px;
          animation: float 6s ease-in-out infinite;
        }
        
        .element-2 {
          width: 100px;
          height: 100px;
          background: rgba(var(--primary-color-rgb), 0.2);
          bottom: -20px;
          left: -30px;
          animation: float 8s ease-in-out infinite reverse;
        }
        
        @keyframes float {
          0% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
          100% { transform: translateY(0px) rotate(0deg); }
        }
        
        @keyframes pulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.05); }
          100% { transform: scale(1); }
        }
        
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slideInFromLeft {
          from { 
            opacity: 0;
            transform: translateX(-30px); 
          }
          to { 
            opacity: 1;
            transform: translateX(0); 
          }
        }

        @media (max-width: 992px) {
          .container {
            padding: 2rem;
          }
          
          .hero-content h1 {
            font-size: 3rem;
          }
          
          .countdown-container {
            gap: 1rem;
          }
          
          .countdown-item {
            min-width: 70px;
            padding: 0.8rem;
          }
        }

        @media (max-width: 768px) {
          .hero {
            min-height: auto;
            padding: 6rem 0;
          }
          
          .container {
            flex-direction: column-reverse;
            text-align: center;
            gap: 4rem;
          }

          .hero-content h1 {
            font-size: 2.5rem;
          }

          .hero-content p {
            margin: 0 auto 2rem;
            font-size: 1.2rem;
          }
          
          .countdown-container {
            justify-content: center;
          }

          .hero-buttons {
            justify-content: center;
          }
          
          .countdown-item {
            min-width: 60px;
            padding: 0.7rem;
          }
          
          .countdown-value {
            font-size: 1.5rem;
          }

          .hero-image-container {
            justify-content: center;
          }
          
          .image-frame {
            transform: rotate(0deg);
          }
          
          .element-1 {
            width: 100px;
            height: 100px;
            top: -20px;
            right: -10px;
          }
          
          .element-2 {
            width: 80px;
            height: 80px;
            bottom: -10px;
            left: -10px;
          }
        }
      `}</style>
    </section>
  );
}
