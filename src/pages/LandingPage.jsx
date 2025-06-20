// src/pages/LandingPage.jsx
import React from "react";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Hero from "../components/Hero";
import About from "../components/About";
import Mission from "../components/Mission";
import Events from "../components/Events";
import Speakers from "../components/Speakers";
import Gallery from "../components/Gallery";
import Meet from "../components/Meet";

export default function LandingPage() {
  return (
    <>
     {/* Hero */}
      <Hero />
      <div className="p-12 text-black bg-white">
        {/* About Section */}
        <About />
        {/* Mission */}
        <Mission />
        {/* Events */}
        <Events />
        {/* Speakers */}
        <Speakers />
        {/* Gallery */}
        <Gallery/>
        {/* Meet our President */}
       <Meet/>
      </div>
    </>
  );
}
