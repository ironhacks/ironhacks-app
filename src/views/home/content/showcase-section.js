import React from 'react';
import { ShowcaseCard } from './showcase-card';
import './showcase-section.css';
import app1 from './images/screencapture-ironhacks-github-io-showcase-2018-spring-ialemusm-2020-05-25-02_43_33.png';
import app2 from './images/screencapture-ironhacks-github-io-showcase-2018-spring-juaccardenasgom-2020-05-25-02_42_01.png';
import app3 from './images/screencapture-ironhacks-github-io-showcase-2018-spring-nmcasasr-2020-05-25-02_45_04.png';
import app4 from './images/screencapture-ironhacks-github-io-showcase-2019-spring-crabaqueropi-2020-05-25-02_41_12.png';
import app5 from './images/screencapture-ironhacks-github-io-showcase-2019-spring-difcortesgu-2020-05-25-02_40_28.png';
import app6 from './images/screencapture-ironhacks-github-io-showcase-2019-spring-jdrodriguezrui-2020-05-25-02_37_56.png';


class ShowcaseSection extends React.Component {
  render() {
    return (
      <div class="cards">
        <ShowcaseCard
          image={app1}
          title={'Winner 2018'}
          description={'This is winning app 1. You can click on it. This app is so so so awesome. You know.'}
          url={'https://ironhacks.github.io/showcase-2018-spring-ialemusm'}
          likes={'1,993'} />

        <ShowcaseCard
          image={app2}
          title={'Winner 2018'}
          description={'This is winning app 2. You can click on it. This app is so so so awesome. You know.'}
          url={'https://ironhacks.github.io/showcase-2018-spring-juaccardenasgom/'}
          likes={'1,775'} />

        <ShowcaseCard
          image={app3}
          title={'Winner 2018'}
          description={'This is winning app 3. You can click on it. This app is so so so awesome. You know.'}
          url={'https://ironhacks.github.io/showcase-2018-spring-nmcasasr'}
          likes={'1,880'} />

        <ShowcaseCard
          image={app4}
          title={'Winner 2019'}
          description={'This is winning app 4. You can click on it. This app is so so so awesome. You know.'}
          url={'https://ironhacks.github.io/showcase-2019-spring-crabaqueropi'}
          likes={'2,002'} />

        <ShowcaseCard
          image={app5}
          title={'Winner 2019'}
          description={'This is winning app 5. You can click on it. This app is so so so awesome. You know.'}
          url={'https://ironhacks.github.io/showcase-2019-spring-difcortesgu'}
          likes={'2,002'} />

        <ShowcaseCard
          image={app6}
          title={'Winner 2019'}
          description={'This is winning app 6. You can click on it. This app is so so so awesome. You know.'}
          url={'https://ironhacks.github.io/showcase-2019-spring-jdrodriguezrui'}
          likes={'2,115'} />
      </div>
    );
  }
}

export { ShowcaseSection }
