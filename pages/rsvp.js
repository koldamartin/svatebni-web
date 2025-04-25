import Head from 'next/head';
import Link from 'next/link';

export default function RSVP() {
  return (
    <>
      <Head>
        <title>Potvrď účast | Svatba Báry a Martina</title>
      </Head>
      <section className="section">
        <div className="container">
          <h1 className="section-title">Potvrď účast</h1>
          <form
            name="rsvp"
            method="POST"
            data-netlify="true"
            data-netlify-honeypot="bot-field"
            action="/thank-you"
          >
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
