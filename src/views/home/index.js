import React from 'react';
// import { Page } from '../layouts/page';
import { LandingPage, Section } from '../../components/layout';
import { AboutSection } from './content/about-section';
import { ExamplesSection } from './content/examples-section';
import { FaqSection } from './content/faq-section';
import { FooterSection } from './content/footer-section';
import { HeroSection } from './content/hero-section';
import { ShowcaseSection } from './content/showcase-section';
import { RulesSection } from './content/rules-section';
import { StatsSection } from './content/stats-section';
import { UpcomingSection } from './content/upcoming-section';

class HomePage extends React.Component {
  render() {
    return (
      <LandingPage title="Home">
        <Section id="hero" align={true}
          sectionClass="full-height bg-primary"
          containerClass="">
          <HeroSection/>
        </Section>

        <Section id='home_faq'>
          <FaqSection/>
        </Section>

        <Section id="home_about" sectionClass="bg-primary py-4">
          <AboutSection/>
        </Section>

        <Section id="home_upcoming" sectionClass="py-4">
          <UpcomingSection />
        </Section>

        <Section sectionClass='bg-primary examples_section' id='home_examples'>
          <ExamplesSection/>
        </Section>

        <Section sectionClass='showcase_section' id='home_showcase'>
          <ShowcaseSection/>
        </Section>

        <Section id="home_rules" sectionClass='rules_section bg-primary'>
          <RulesSection/>
        </Section>

        <Section sectionClass='stats_section' id='home_stats'>
          <StatsSection/>
        </Section>

        <Section sectionClass='stats_section bg-black c-white' id='home_stats'>
          <FooterSection/>
        </Section>
      </LandingPage>
    )
  }
}

export default HomePage;
