import React from 'react';
import { Page } from '../layouts/page';
import { Section } from '../layouts/sections';
import HeroSection from './content/hero';
import FaqSection from './content/faq';
import RankingSection from './content/ranking';
import { ShowcaseSection } from './content/showcase-section';
import BenefitsSection from './content/benefits';

class HomePage extends React.Component {
  render() {
    return (
      <Page>
        <Section className={'full-height bg-primary'}>
          <HeroSection/>
        </Section>

        <Section className='FAQ'>
          <FaqSection/>
        </Section>

        <Section className='about bg-primary' id='about'>
          <ShowcaseSection/>
        </Section>

        <Section className='ranking' id='ranking'>
          <RankingSection/>
        </Section>

        <Section className='FAQ bg-primary'>
          <BenefitsSection/>
        </Section>
      </Page>
    )
  }
}

export default HomePage;
