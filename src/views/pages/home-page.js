import React from 'react';
// import { Page } from '../layouts/page';
import { LandingPage, Section } from '../../components/layout';
import { AboutSection } from '../home/content/about-section';
import { ExamplesSection } from '../home/content/examples-section';
import { ProcessSection } from '../home/content/process-section';
import { FooterSection } from '../home/content/footer-section';
import { HeroSection } from '../home/content/hero-section';
import { ShowcaseSection } from '../home/content/showcase-section';
import { StatsSection } from '../home/content/stats-section';
import { SponsorsSection } from '../home/content/sponsors-section';
import { UpcomingSection } from '../home/content/upcoming-section';

class HomePage extends React.Component {
  render() {
    return (
      <LandingPage pageClass="home_page">
        <Section id="hero" sectionClass="full-height bg-primary">
          <HeroSection/>
        </Section>

        <Section id="home_about" sectionClass="py-4 depth-5">
          <AboutSection/>
        </Section>

        <Section id="home_upcoming" sectionClass="bg-primary">
          <UpcomingSection />
        </Section>

        <Section id='home_process' sectionClass='process_section' >
          <ProcessSection/>
        </Section>

        <Section id='home_examples' sectionClass='bg-primary examples_section' >
          <ExamplesSection/>
        </Section>

        <Section id='home_showcase' sectionClass='showcase_section' >
          <ShowcaseSection/>
        </Section>

        <Section id='home_stats' sectionClass='stats_section bg-primary' >
          <StatsSection/>
        </Section>

        <Section id='home_sponsors' sectionClass='stats_section' >
          <SponsorsSection/>
        </Section>

        <Section id='home_footer' sectionClass='stats_section bg-black c-white' >
          <FooterSection/>
        </Section>
      </LandingPage>
    )
  }
}

export default HomePage;
