import { useEffect } from "react";
import Hero from "../components/Hero";
import About from "../components/About";
import Mission from "../components/Mission";
import Events from "../components/Events";
import Gallery from "../components/Gallery";
import Meet from "../components/Meet";
import SEO from "../components/SEO";
import { organizationJsonLd, mmcEventJsonLd } from "../config/siteConfig";

export default function LandingPage() {
  useEffect(() => {
    document.title = "Aroma Worshippers Music Ministry International";
  }, []);

  return (
    <>
      <SEO path="/" jsonLd={[organizationJsonLd(), mmcEventJsonLd()]} />
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