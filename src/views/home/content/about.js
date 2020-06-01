import React from 'react';
import './about.css';
import app1 from './images/screencapture-ironhacks-github-io-showcase-2018-spring-ialemusm-2020-05-25-02_43_33.png';
import app2 from './images/screencapture-ironhacks-github-io-showcase-2018-spring-juaccardenasgom-2020-05-25-02_42_01.png';
import app3 from './images/screencapture-ironhacks-github-io-showcase-2018-spring-nmcasasr-2020-05-25-02_45_04.png';
import app4 from './images/screencapture-ironhacks-github-io-showcase-2019-spring-crabaqueropi-2020-05-25-02_41_12.png';
import app5 from './images/screencapture-ironhacks-github-io-showcase-2019-spring-difcortesgu-2020-05-25-02_40_28.png';
import app6 from './images/screencapture-ironhacks-github-io-showcase-2019-spring-jdrodriguezrui-2020-05-25-02_37_56.png';
export default class AboutSection extends React.Component {
  render() {
    return (
      <>
        <div>
	<div class="cards">
  	<div class="card">
          <img src={app1} alt="HTML tutorial" class="card__image"/>
          <div class="card__content">
	  <h2>This is winning app 1. You can click on it.</h2>
	  </div>
	  <div class="card__info">
          </div>
          </div>
         <div class="card">
	  <img src={app2} alt="HTML tutorial" class="card__image"/>
          <div class="card__content">
          <h2>This is winning app 2. You can click on it.</h2>
	  </div>
	 </div>
	  <h2>This is winning app 3. You can click on it.</h2>

          <img src={app3} alt="HTML tutorial"/>

	  <h2>This is winning app 4. You can click on it.</h2>

          <img src={app4} alt="HTML tutorial"/>

	  <h2>This is winning app 5. You can click on it.</h2>

          <img src={app5} alt="HTML tutorial"/>

          <h2>This is winning app 6. You can click on it.</h2>

          <img src={app6} alt="HTML tutorial"/>
        </div>
	</div>
        <div>
          <img src='' alt='' />
        </div>
      </>
    );
  }
}
