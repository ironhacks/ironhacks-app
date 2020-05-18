import React from 'react';
import { ThemeProvider } from 'styled-components';
import { Theme } from '../../theme';
import { Page } from '../layouts/page';
import { Section } from '../layouts/sections';
import HeroSection from './content/hero';
import FaqSection from './content/faq';
import RankingSection from './content/ranking';
import AboutSection from './content/about';
import BenefitsSection from './content/benefits';

const styles = Theme.STYLES.AppSectionTheme;

class HomePage extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <ThemeProvider theme={styles}>
        <Page theme={styles}>
          <Section className={'full-height bg-primary'}>
            <HeroSection/>
          </Section>

          <Section className='FAQ'>
            <FaqSection/>
          </Section>

          <Section className='about bg-primary' id='about'>
            <AboutSection/>
          </Section>

          <Section className='ranking' id='ranking'>
            <RankingSection/>
          </Section>

          <Section className='FAQ bg-primary'>
            <BenefitsSection/>
          </Section>
        </Page>
      </ThemeProvider>
    );
  }
}

export default HomePage;
