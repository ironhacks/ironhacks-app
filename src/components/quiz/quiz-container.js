function QuizContainer({quizId, userEmail }) {
  const quizUrls = {
    bootstrap: 'https://purdue.ca1.qualtrics.com/jfe/form/SV_ai47Laj9EM1n433',
    html_css: 'https://purdue.ca1.qualtrics.com/jfe/form/SV_0l9UUOmgB2TCZ1P',
    javascript_jquery: 'https://purdue.ca1.qualtrics.com/jfe/form/SV_1Xkpq23Qu5j7P01',
    d3: 'https://purdue.ca1.qualtrics.com/jfe/form/SV_0ep4CDeW4BYTckR',
    google_maps: 'https://purdue.ca1.qualtrics.com/jfe/form/SV_eEe3JnzCkS2ppnn',
  };

  let quizUrl = '';

  if (Object.keys(quizUrls).indexOf(quizId) >= 0){
    quizUrl = quizUrls[`${quizId}`]
  }

  if (!quizUrl){
    return (
      <div>
        <h3>Select a quiz from the menu</h3>
      </div>
    )
  }

  return (
    <div className="quiz_container">
      <iframe
        className="quiz_container__iframe"
        title='Quiz Form'
        src={`${quizUrl}?user_email=${userEmail}`}
      />
    </div>
  )
}

export { QuizContainer }
