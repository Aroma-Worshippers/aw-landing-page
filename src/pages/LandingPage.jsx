// LandingPage.jsx - Added SEO-friendly titles
import { useEffect } from "react";
import Hero from "../components/Hero";
import About from "../components/About";
import Mission from "../components/Mission";
import Events from "../components/Events";
// import Speakers from "../components/Speakers";
import Gallery from "../components/Gallery";
import Meet from "../components/Meet";

export default function LandingPage() {
  // Update document title for SEO
  useEffect(() => {
    document.title = "Aroma Worshippers Music Ministry International";
  }, []);

  return (
    <>
      <Hero />
      <div className="text-black bg-white">
        <About />
        <Mission />
        <Events />
        {/* <Speakers /> */}
        <Gallery />
        <Meet />
      </div>
    </>
  );
}