// components/OurStory.js

import Image from 'next/image';


export default function SvatebníInformace() {

  return (

    <section id="svatebni-informace" className="section svatebni-informace">

      <div className="container">

        <h2 className="section-title">Svatební informace</h2>


        {/* Removed the story-image div as the image is now the background */}

        <div className="story-text-columns"> {/* New container for two-column text */}

            <div className="info-block" style={{ 
              backgroundColor: '#fff5e6',
              border: '2px solid #1e90ff',
              boxShadow: '0 0 0 1px rgba(30, 144, 255, 0.4)'
            }}>
              <p>
                <strong>Aktualita 8.7.2025</strong><br />
                Budeme rádi pokud na svatbu můžete připravit třeba něco dobrého na zub. Aby se nám nesešlo to samé, kontaktuje prosím Báru.
              </p>
            </div>

            <div className="info-block">

              <p>

                Jsme nadšení, že s námi chcete oslavit náš velký den! Prosíme, <strong>co nejdříve <a href="/rsvp" className="underline">potvrďte svoji účast</a></strong>, abychom měli přehled.

              </p>

            </div>

            <div className="info-block">

              <p>

                <strong>Děti jsou srdečně vítány!</strong> Pro malé hosty bude připraven menší skákací hrad, takže o zábavu nebude nouze.

              </p>

              <p>

                Pokud byste rádi vzali s sebou svého <strong>čtyřnohého parťáka (pejska)</strong>, dejte nám prosím vědět předem.

              </p>

            </div>

            <div className="info-block">

              <p>

                <strong>Svatební dary:</strong> Vaše přítomnost je pro nás tím největším darem. Na místě bude zajištěn raut, domácí guláš, polévka a grilovaná kýta. Případné finanční příspěvky s vděčností využijeme na naši svatební cestu.

              </p>

            </div>

            <div className="info-block">

              <p>

                <strong>Fotografie:</strong> Profesionálního fotografa mít nebudeme. O to více oceníme, když sami zachytíte momentky z celého dne a večera! Fotky pak prosím sdílejte s námi ve sdíleném albu (odkaz dodáme později).

              </p>

              <p>

                <strong>Hudba:</strong> O hudební doprovod se postará sdílený playlist na Spotify (přispět může kdokoliv!) a možná dorazí i živá kapela jako překvapení.

              </p>

            </div>

            <div className="info-block">

              <p>

                <strong>Ubytování:</strong> V objektu je k dispozici omezený počet lůžek (cca 20) primárně pro nejbližší rodinu. Dále je možné přespat ve vlastním stanu na přilehlém pozemku. Další možnosti ubytování jsou v penzionech či ubytovnách v centru Poděbrad. Prosíme, <strong>vyplňte své preference ohledně ubytování</strong> v <a href="/rsvp" className="underline">formuláři pro potvrzení účasti</a>. Bližší informace k ubytování poskytneme brzy.

              </p>

            </div>

           {/* The quote div is removed as it was part of the story-grid structure */}

        </div>

      </div>


      <style jsx>{`

        .svatebni-informace {
          padding: 4rem 0;
          color: var(--text-color);
        }

        .container {
          position: relative;
        }

        .section-title {

          text-align: center;

          margin-bottom: 2rem;

          color: #333; /* Changed to dark color for better readability without background */
          position: relative;

          text-shadow: 0 1px 4px rgba(0, 0, 0, 0.7); /* Add shadow for readability */
          z-index: 2;

        }


        /* Removed .story-grid as image is now background */


        .story-text-columns {

          display: grid;

          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); /* Two columns, responsive */

          gap: 1.5rem; /* Gap between columns and rows */

        }


        .info-block {
          background-color: rgba(255, 255, 255, 0.9); /* White background with slight transparency */
          border-radius: 8px;
          padding: 1.25rem; /* Slightly increased padding */
          margin-bottom: 0; /* Remove margin-bottom as gap handles spacing */
          box-shadow: 0 2px 12px rgba(0,0,0,0.1); /* Slightly more visible shadow */
          transition: all 0.3s ease;
        }

        .info-block:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 16px rgba(0,0,0,0.15);
        }

        .info-block p {

          margin-bottom: 0.75rem;

          line-height: 1.6;

          font-size: 1rem;

        }


        .info-block p:last-child {

          margin-bottom: 0;

        }


        /* Quote styles removed as the quote div was removed */


        @media (max-width: 768px) {

          .story-text-columns {

            grid-template-columns: 1fr; /* Stack columns on smaller screens */

          }

          .svatebni-informace {

             padding: 3rem 0; /* Adjust padding on mobile */

          }

        }

      `}</style>

    </section>

  );

}