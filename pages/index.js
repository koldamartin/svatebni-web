import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import SvatebníInformace from '../components/OurStory';
import Gallery from '../components/Gallery';
import Timeline from '../components/Timeline';
import WeddingVenue from '../components/WeddingVenue';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <div className="wedding-diary">
      <Navbar />
      <main>
        <Hero />
        <SvatebníInformace />
        <Gallery />
        <Timeline />
        <WeddingVenue />
      </main>
      <Footer />
    </div>
  );
}
