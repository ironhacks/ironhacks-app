import React from 'react';
import app1 from './images/screencapture-ironhacks-github-io-showcase-2018-spring-ialemusm-2020-05-25-02_43_33.png';

export default class AboutSection extends React.Component {
  render() {
    return (
      <>
        <div>
	  <h2>Winning App 4. Click Image to Access</h2>

	<p>This is winning app 3. You can click on it.</p>

	<img src={app1} alt="HTML tutorial"/>
          <p>
            IronHacks is an open data hacking program that combines experiential
            learning with real-world data-driven problem solving. During a
            5-stage virtual competition, students utilize open data to create
            novel and useful interactive visualizations and analytic "apps" that
            solve civic challenges.
          </p>
	  

        </div>
        <div>
          <img src='' alt='' />
        </div>
      </>
    );
  }
}
