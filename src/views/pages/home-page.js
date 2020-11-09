import { LandingPage, Section } from '../../components/layout';
import { Home } from '../home';

// {
//   AboutSection,
//   ExamplesSection,
//   ProcessSection,
//   FeaturesSection,
//   FooterSection,
//   HeroSection,
//   ShowcaseSection,
//   StatsSection,
//   SponsorsSection,
//   UpcomingSection,
// }

const HomePage = () => {
  return (
    <LandingPage pageClass="home_page">
      <Section id="hero" sectionClass="full-height bg-primary">
        <Home.HeroSection/>
      </Section>

      <Section id="home_about" sectionClass="py-4">
        <Home.AboutSection/>
      </Section>

      <Section id='home_features' sectionClass='features_section'>
        <Home.FeaturesSection/>
      </Section>

      <Section id="home_upcoming" sectionClass="bg-primary depth-5">
        <Home.UpcomingSection />
      </Section>

      <Section id='home_process' sectionClass='process_section'>
        <Home.ProcessSection/>
      </Section>

      <Section id='home_examples' sectionClass='bg-primary examples_section' >
        <Home.ExamplesSection/>
      </Section>

      <Section id='home_showcase' sectionClass='showcase_section' >
        <Home.ShowcaseSection/>
      </Section>

      <Section id='home_stats' sectionClass='stats_section bg-primary' >
        <Home.StatsSection/>
      </Section>

      <Section id='home_sponsors' sectionClass='stats_section' >
        <Home.SponsorsSection/>
      </Section>

      <Section sectionClass='twitter_section' >
        <Home.TwitterSection/>
      </Section>

      <Section id='home_footer' sectionClass='stats_section bg-black c-white' >
        <Home.FooterSection/>
      </Section>
    </LandingPage>
  )
};

export default HomePage;
