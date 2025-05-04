// pages/rsvp.js
'use client';

import Head from 'next/head';
import Link from 'next/link'; // Keep Link in case you add navigation later
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
    await fetch('/__forms.html', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams(formData).toString(),
    });
    router.push('/thank-you'); // Assuming you have a thank-you page
  };

  return (
    <>
      <Head>
        <title>Potvrď účast | Svatba Báry a Martina</title>
        {/* Link a modern font, e.g., from Google Fonts */}
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700&family=Playfair+Display:wght@700&display=swap" rel="stylesheet" />
      </Head>
      <section className="rsvp-section"> {/* Renamed class for clarity */}
        <div className="container">
          <h1 className="section-title">Potvrď účast</h1>
          <form name="rsvp" onSubmit={handleFormSubmit} className="rsvp-form"> {/* Added form class */}
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
            <button type="submit" className="submit-btn">Odeslat</button> {/* Renamed button class */}
          </form>
        </div>
      </section>
      <style jsx>{`
        :root {
          /* Using variables from globals.css */
          --page-bg-color: #f5e6e0; /* global --primary-color (very light orange) */
          --form-bg-color: #ffffff; /* global --light-color */
          --text-color: #5c4f3d; /* global --text-color */
          --heading-color: #3887BE; /* global --secondary-color (darker blue) */
          --button-bg-color: #3887BE; /* global --secondary-color */
          --button-text-color: #ffffff; /* global --light-color */
          --button-hover-bg-color: #5c4f3d; /* global --text-color (consistent with .btn:hover) */
          --border-color: #dcdcdc; /* Lighter gray for borders */
          --focus-color: #e9c46a; /* global --accent-color */
          --font-main: 'Playfair Display', serif; /* global --font-main */
          --font-secondary: 'Montserrat', sans-serif; /* global --font-secondary */
        }

        .rsvp-section {
          padding: 4rem 1rem; /* More padding */
          background-color: var(--page-bg-color); /* Use light orange background */
          min-height: 100vh; /* Full height */
          display: flex;
          align-items: center; /* Center content vertically */
          justify-content: center; /* Center content horizontally */
          font-family: 'Montserrat', sans-serif; /* Modern sans-serif for body text */
          color: var(--text-color);
        }

        .container {
          max-width: 700px; /* Slightly wider form container */
          width: 100%;
          margin: 0 auto;
          background-color: var(--form-bg-color); /* White background for the form area */
          padding: 2rem;
          border-radius: 8px; /* Rounded corners for the container */
          box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1); /* Subtle shadow */
        }

        .section-title {
          font-family: 'Playfair Display', serif; /* Elegant serif for titles */
          font-size: 2.8rem; /* Slightly larger title */
          text-align: center;
          color: var(--heading-color); /* Use darker blue for heading */
          margin-bottom: 2.5rem; /* More space below title */
          text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.05); /* Subtle text shadow */
        }

        .rsvp-form { /* Styled the form itself */
          display: flex;
          flex-direction: column;
          gap: 1.5rem; /* Consistent spacing */
        }

        .form-group {
          display: flex;
          flex-direction: column;
        }

        .form-group label {
          margin-bottom: 0.6rem; /* Increased spacing */
          font-weight: 600; /* Bolder labels */
          color: var(--text-color); /* Use main text color, slightly bolder */
          font-size: 1rem;
        }

        .form-group input[type="text"],
        .form-group input[type="number"],
        .form-group select {
          padding: 0.8rem 1rem; /* More padding */
          border: 1px solid var(--border-color);
          border-radius: 4px; /* Slightly rounded inputs */
          font-size: 1rem;
          color: var(--text-color);
          transition: border-color 0.3s ease-in-out, box-shadow 0.3s ease-in-out;
          width: 100%; /* Full width inputs */
          box-sizing: border-box; /* Include padding and border in the element's total width */
        }

        .form-group input[type="text"]:focus,
        .form-group input[type="number"]:focus,
        .form-group select:focus {
          border-color: var(--focus-color); /* Highlight color on focus */
          box-shadow: 0 0 0 3px rgba(233, 196, 106, 0.3); /* Subtle glow on focus using accent color */
          outline: none; /* Remove default outline */
        }

        /* Custom Checkbox Styling (basic example) */
        .checkbox-group {
          display: flex;
          flex-wrap: wrap;
          gap: 1.5rem; /* Increased gap */
          margin-top: 0.5rem;
        }

        .checkbox-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          cursor: pointer; /* Indicate clickable */
        }

        .checkbox-item input[type="checkbox"] {
          /* Hide default checkbox */
          position: absolute;
          opacity: 0;
          cursor: pointer;
          height: 0;
          width: 0;
        }

        .checkbox-item label {
          position: relative;
          padding-left: 25px; /* Space for the custom checkbox */
          margin-bottom: 0; /* Override form-group label margin */
          cursor: pointer;
          font-weight: 400; /* Lighter weight for checkbox labels */
          color: var(--text-color); /* Standard text color */
        }

        .checkbox-item label::before {
          content: '';
          position: absolute;
          left: 0;
          top: 2px; /* Adjust alignment */
          width: 18px;
          height: 18px;
          border: 1px solid var(--border-color);
          border-radius: 3px;
          background-color: var(--form-bg-color);
          transition: all 0.3s ease-in-out;
        }

        .checkbox-item input[type="checkbox"]:checked + label::before {
          background-color: var(--button-bg-color); /* Use button blue for checked state */
          border-color: var(--primary-color);
        }

        .checkbox-item label::after {
          content: '✔'; /* Checkmark */
          position: absolute;
          left: 3px;
          top: 0px; /* Adjust alignment */
          font-size: 14px;
          color: var(--button-text-color); /* White checkmark */
          transition: all 0.3s ease-in-out;
          opacity: 0; /* Hide initially */
        }

        .checkbox-item input[type="checkbox"]:checked + label::after {
          opacity: 1; /* Show checkmark when checked */
        }

        .checkbox-item input[type="checkbox"]:focus + label::before {
            box-shadow: 0 0 0 3px rgba(233, 196, 106, 0.3); /* Use accent color glow */
            border-color: var(--focus-color);
        }


        .submit-btn { /* Styled the button */
          display: inline-block;
          background-color: var(--button-bg-color); /* Use button blue */
          color: var(--button-text-color); /* Use white text */
          padding: 0.8rem 2rem;
          border: none;
          border-radius: 4px;
          font-size: 1.1rem;
          cursor: pointer;
          transition: background-color 0.3s ease-in-out, transform 0.1s ease-in-out;
          align-self: center; /* Center the button */
          font-weight: 600;
        }

        .submit-btn:hover {
          background-color: var(--button-hover-bg-color); /* Use text color for hover, like global .btn */
          transform: translateY(-2px); /* Subtle lift effect */
        }

        .submit-btn:active {
          transform: translateY(0); /* Press effect */
        }

        /* Responsive adjustments */
        @media (max-width: 600px) {
          .container {
            padding: 1.5rem;
          }

          .section-title {
            font-size: 2rem;
          }

          .submit-btn {
            width: 100%; /* Full width button on small screens */
          }

          .checkbox-group {
              gap: 1rem; /* Reduce gap on smaller screens */
          }
        }
      `}</style>
    </>
  );
}

export const getStaticProps = async () => ({ props: {} });