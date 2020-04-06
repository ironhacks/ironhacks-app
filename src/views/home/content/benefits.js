import React from 'react';

export default class BenefitsSection extends React.Component {
  render() {
    return (
      <>
        <div>
          <i className='zmdi zmdi-comments' />
          <h3>WHY SHOULD I PARTICIPATE?</h3>
          <p>
            In IronHacks, you learn new skills, win prizes ($$$), get exposed to
            tech organizations, and win internships. Most importantly, you
            become part of a global movement of open data to make an impact in
            areas such as safety, health, or travel.
          </p>
        </div>

        <div>
          <i className='zmdi zmdi-settings' />
          <h3>WHAT IS IRONHACKS?</h3>
          <p>
            IronHacks is a unique one month, 5-stage innovative hacking program
            for individuals who want to create impact from open data. During the
            iterative hacking process, you will learn new skills, have the
            chance to learn from others, and receive feedback from IronHacks
            experts! Turn your ideas into web apps that make data actionable and
            useful!
          </p>
        </div>

        <div>
          <i className='zmdi zmdi-accounts' />
          <h3>HOW CAN I GET INVOLVED?</h3>
          <p>
            There are many ways to get involved: As hack participants, as
            industry sponsor, or as researcher. To learn more about upcoming
            hacks, please send an email to opendigital@purdue.edu.
          </p>
        </div>
      </>
    );
  }
}
