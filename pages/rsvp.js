'use client';

import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';

export default function RSVP() {
  const router = useRouter();
  const [accommodationType, setAccommodationType] = useState('');
  const [drinks, setDrinks] = useState({
    pivo: false,
    vino: false,
    prosecco: false,
    nealko: false
  });

  const handleDrinkChange = (e) => {
    setDrinks({
      ...drinks,
      [e.target.name]: e.target.checked
    });
  };



  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    await fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams(formData).toString(),
    });
    router.push('/thank-you');
  };

  return (
    <>
      <Head>
        <title>Potvrď účast | Svatba Báry a Martina</title>
      </Head>
      <section className="section">
        <div className="container">
          <h1 className="section-title">Potvrď účast</h1>
          <form name="rsvp" onSubmit={handleFormSubmit}>
            <input type="hidden" name="form-name" value="rsvp" />
            <p hidden>
              <label>
                Don’t fill this out if you're human: <input name="bot-field" />
              </label>
            </p>
            <div className="form-group">
              <label htmlFor="name">Jméno hosta</label>
              <input type="text" id="name" name="name" required />
            </div>
            <div className="form-group">
              <label htmlFor="adults">Počet dospělých</label>
              <input type="number" id="adults" name="adults" min="0" required />
            </div>
            <div className="form-group">
              <label htmlFor="children">Počet dětí</label>
              <input type="number" id="children" name="children" min="0" />
            </div>
            <div className="form-group">
              <label htmlFor="accommodation">Ubytování</label>
              <select 
                id="accommodation" 
                name="accommodation" 
                required
                value={accommodationType}
                onChange={(e) => setAccommodationType(e.target.value)}
              >
                <option value="">Vyberte možnost...</option>
                <option value="vlastni-stan">Vlastní stan</option>
                <option value="spat-domu">Pojedeme spát domů</option>
                <option value="vlakem-domu">Pojedeme vlakem domů</option>
                <option value="penzion">Budeme spát v penzionu</option>
                <option value="jine">Jiné</option>
              </select>
            </div>
            
            <div className="form-group">
              <label>Budu pít</label>
              <div className="checkbox-group">
                <div className="checkbox-item">
                  <input 
                    type="checkbox" 
                    id="pivo" 
                    name="pivo" 
                    checked={drinks.pivo}
                    onChange={handleDrinkChange}
                  />
                  <label htmlFor="pivo">Pivo</label>
                </div>
                <div className="checkbox-item">
                  <input 
                    type="checkbox" 
                    id="vino" 
                    name="vino" 
                    checked={drinks.vino}
                    onChange={handleDrinkChange}
                  />
                  <label htmlFor="vino">Víno</label>
                </div>
                <div className="checkbox-item">
                  <input 
                    type="checkbox" 
                    id="prosecco" 
                    name="prosecco" 
                    checked={drinks.prosecco}
                    onChange={handleDrinkChange}
                  />
                  <label htmlFor="prosecco">Prosecco</label>
                </div>
                <div className="checkbox-item">
                  <input 
                    type="checkbox" 
                    id="nealko" 
                    name="nealko" 
                    checked={drinks.nealko}
                    onChange={handleDrinkChange}
                  />
                  <label htmlFor="nealko">Nealko</label>
                </div>
              </div>
            </div>
            <button type="submit" className="btn">Odeslat</button>
          </form>
        </div>
      </section>
      <style jsx>{`
        form {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          max-width: 600px;
          margin: 0 auto;
        }

        .checkbox-group {
          display: flex;
          flex-wrap: wrap;
          gap: 1rem;
          margin-top: 0.5rem;
        }

        .checkbox-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
          margin: 0 auto;
        }

        .form-group {
          display: flex;
          flex-direction: column;
        }

        .form-group label {
          margin-bottom: 0.5rem;
          font-weight: 500;
        }

        .form-group input {
          padding: 0.5rem;
          border: 1px solid #ccc;
          border-radius: 4px;
        }

        button {
          width: max-content;
        }
      `}</style>
    </>
  );
}

export const getStaticProps = async () => ({ props: {} });
