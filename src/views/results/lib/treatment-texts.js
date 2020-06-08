import React from 'react';
const TreatmentTexts = {
  0: {
    header: (
      <div>
        <p>
          Below you can review the evaluation for your app in three categories:
          (1) Technology, (2) Analytics, and (3) Visualization.{' '}
          <strong>
            Remember that Visualization matters the most in this hack.
          </strong>
        </p>
        <p>
          There are two views: (1) Your peers and (2) Your personal feedback.
          You can select both views for the current phase and also past
          completed phases!
        </p>
      </div>
    ),
    ranking: {
      instructions: (
        <div>
          <p>
            Check out others work: Also, please take a look at your peers
            solutions.
          </p>
          <p>
            Below, you find a table with your peers: with a 1) a link to their
            app, and 1) a like button. We will describe each in more detail.
          </p>
          <ul>
            <li>
              The link in the first column takes you to their code. Click on the
              link to check out your fellow participants’ solutions.! You can
              inspect it, and also reuse it if you want to! We encourage you to
              re-use components from your peers!
            </li>
            <li>
              The like button in the third column should be used to select the
              top 3 that you consider reusing. Select those that you consider to
              inspect further because they are useful and you want to reuse
              them!{' '}
              <strong>
                It is very important that select them by 11.59 pm of evaluation
                day. Afterwards, none of the other apps will be available for
                inspection.
              </strong>
            </li>
          </ul>
          <p>
            <strong>
              Remember: Please do not forget to select and follow your top 3
              apps. They are not available anymore after 11.59 pm of the
              evaluation day.
            </strong>
            To make your app unique consider recombining your own ideas with
            those you find in other apps! Do not worry, you can reuse up to 50%
            of others code!
          </p>
        </div>
      ),
    },
  },
  1: {
    header: (
      <div>
        <p>
          On this page, you can review the evaluations for your app in a very
          detailed way for each category: Technology, Analytics, and
          Visualization. Below are the results for <strong>Phase 1</strong>.
        </p>
        <p>
          There are two views: (1) "your personal feedback" (private and
          confidential) and (2) ”Your peers" (showing what other's are doing).
          You can select the different views by clicking on the tabs below. Just
          click on the tap ”Your peers" below and you can see other's apps (the
          actual code) and <strong>pick your top 3 favorite app</strong> in the
          competition.
        </p>
      </div>
    ),
    ranking: {
      instructions: (
        <div>
          <p>
            Below, you find a table with your peers: with 1) a link to their
            app, 2) A similarity rating of how similar they are compared to you
            on scale <strong>from 0 (not similar at all)</strong> to{' '}
            <strong>10 (very similar)</strong> and 3) a like button. We will
            describe each in more detail.
          </p>
          <ul>
            <li>
              The link in the first column takes you to their code. Click on the
              link to check out your fellow participants’ solutions.! You can
              inspect it, and also reuse it if you want to! We encourage you to
              re-use components from your peers!
            </li>
            <li>
              The second column rates them in terms of similarity. We use
              similarity rating focused on the{' '}
              <strong>visual components</strong> of your and your peer’s app. A
              rating of 0 means that the other app is very similar. A rating of
              10 implies that the other app is very dissimilar.{' '}
              <strong>
                Keep in mind that more dissimilar can lead to greater
                excellence!
              </strong>
            </li>
            <li>
              The like button in the third column should be used to select the
              top 3 that you consider reusing. Select those that you consider to
              inspect further because they are useful and you want to reuse
              them!{' '}
              <strong>
                It is very important that select them by 11.59 pm of evaluation
                day. Afterwards, none of the other apps will be available for
                inspection.
              </strong>
            </li>
          </ul>
          <p>
            <strong>
              Remember: Please do not forget to select and follow your top 3
              apps. They are not available anymore after 11.59 pm of the
              evaluation day.{' '}
            </strong>{' '}
            To make your app unique consider recombining your own ideas with
            those you find in other apps! Do not worry, you can reuse up to 50%
            of others code!
          </p>
        </div>
      )
    }
  }
}


export { TreatmentTexts }
