import Head from 'next/head';
import Link from 'next/link';

export default function ThankYou() {
  return (
    <>
      <Head>
        <title>Děkujeme | Svatba Báry a Martina</title>
      </Head>
      <section className="section">
        <div className="container text-center">
          <h1 className="section-title">Děkujeme za potvrzení</h1>
          <p>Vaše odpověď byla úspěšně odeslána. Těšíme se na vás!</p>
          <Link href="/"><a className="btn">Zpět na hlavní stránku</a></Link>
        </div>
      </section>
    </>
  );
}

export const getStaticProps = async () => ({ props: {} });
