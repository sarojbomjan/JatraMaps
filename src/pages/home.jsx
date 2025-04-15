import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import HeroSection from "../components/hero_section";
import FeaturedEvent from "../components/featured_event";
import UpcomingEvents from "../components/upcoming_event";
import AboutUs from "./about";

const SectionWrapper = ({ children }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, threshold: 0.2 });

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {children}
    </motion.section>
  );
};

const Home = () => {
  const upcomingRef = useRef(null);
  const aboutRef = useRef(null);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <HeroSection />
      </motion.div>

      <SectionWrapper>
        <FeaturedEvent />
      </SectionWrapper>

      <SectionWrapper>
        <section id="upcoming-section" ref={upcomingRef}>
          <UpcomingEvents />
        </section>
      </SectionWrapper>

      <SectionWrapper>
        <section id="about-section" ref={aboutRef}>
          <AboutUs />
        </section>
      </SectionWrapper>
    </>
  );
};

export default Home;
