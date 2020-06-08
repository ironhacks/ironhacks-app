import React from 'react';

const PersonalFeedbackContent = {
  title: 'Personal feedback',
  subTitle: (
    <div>
      <p>
        How to read your personal feedback. There are three rows that describe
        your apps performance in the three task dimensions: (1) Technology, (2)
        Analytics, (3) Visualization. The maximum requirements points that you
        can achieve <strong>74</strong>, the maximum excellence points are{' '}
        <strong>150</strong>. Keep in mind that Visualizations matters the most.
      </p>
      <p>
        <strong>
          Keep pushing to earn more points. The more points you more likely you
          earn more money, reputation, and also skills.
        </strong>
      </p>
      <p>
        Remember that your personal feedback are private and confidential. And
        you shouldn't share with others how many points you have earned.
      </p>
    </div>
  ),
  technology: {
    por: (
      <p>
        Here you can find out how well you master the minimum requirements! In
        this section, we measure the minimum technical requirements such as the
        creation of the map, charts ,the use of the parameters require, and the
        use of the datasets required. For more details go the the section of
        Technology in the section of excellence (www.ironhacks.com/task).
      </p>
    ),
    efe: (
      <p>
        As specified in the task (www.ironhacks.com/task), we evaluate if your
        current app was written successfully in the simplest manner.
      </p>
    ),
    weight: '15%',
  },
  analytics: {
    por: (
      <p>
        As specified in the task (www.ironhacks.com/task), you were asked to
        correctly rank the districts with respect to three parameters (distance,
        safety, afforability). The value describes how many correct ranks you
        have identified for all 4 ranking decision parameters. For more details
        go the the section of Analytics in the section of requirements
        (www.ironhacks.com/task).
      </p>
    ),
    efe: (
      <p>
        As specified in the task (www.ironhacks.com/task), we evaluate if your
        current app presents analyticas solutions by using the parameters and
        datasets required and beyond. Remember that this measure 'parameter'
        captures how many variables you have tried to use in relation to all
        variables available in the eligable datasets. For more details go the
        the section of Analytics in the section of excellence
        (www.ironhacks.com/task).
      </p>
    ),
    weight: '25%',
  },
  visualization: {
    por: (
      <p>
        As specified in the task (www.ironhacks.com/task), you were asked to
        visualize and rank correctly the districts with respect to three
        parameters (distance, safety, afforability). Here we considered the The
        value describes how many correct ranks you have identified for all 4
        ranking decision parameters. For more details go the the section of
        Analytics in the section of requirements (www.ironhacks.com/task).
      </p>
    ),
    efeA: (
      <p>
        The visualization component of your solution must inform the final user
        how to take a decision based on a processed and destiled data to
        trasnform in valuable information. Therfor, please take in consideration
        the lessons learnt in the usability training for the way of presenting
        the information, time that the final user will require to understand the
        data visualization, etc. For more details go the the section of
        Information visualization in the section of excellence
        (www.ironhacks.com/task).
      </p>
    ),
    efeB: (
      <p>
        Below, you can find out tackle the visualization of the data and
        analytics in your app. Remember, that there very creative ways to
        visualize metrics. Check out below how your app tackles the
        visualization task, and how advanced you are in visualization data. Our
        goal is to turn you into a visualization champion! <br />
        <br />
        There are varies ways to visualize data. From barcharts to more novel
        multidimensional charts. The more variety have the more advanced your
        visualization, the greater the value displayed.
        <br />
        <br />
        Representing the mandatory parameters in new ways on the map definitely
        makes your app standing out from the rest. We review how well you
        visualize the mandatory datasets (distance, safety, affordability) on
        your maps and charts. The more unique (e.g.interactive) the more
        advanced your app. For the implication score you can achieve a score
        from 0 to 100. For more details go the the section of Information
        visualization in the section of excellence (www.ironhacks.com/task).
      </p>
    ),
    weight: '60%',
  },
};


export { PersonalFeedbackContent }
