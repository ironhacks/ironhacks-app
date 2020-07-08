import { TemplateFiles } from '../components/project';

const ProjectApi = {};


// const firestore = window.firebase.firestore();

// Query all the hacks objects from the db.

/// * ALTERNATIVE *
/// window.firebase.firestore()
///       .collection('users')
///       .doc('dvEbMRzWmrO9qYmRAGMwrf7VsGZ2')
///       .collection('projects')
///       .get()
///       .then((results)=>{
///         results.forEach((result)=>{
///           console.log(result.data());
///         })
///       })


ProjectApi.getProjects = async function(userid) {

  console.log('%c getProjects', 'color: teal; font-weight: bold');
  const projects = [];
  var querySnapshot = [];

  try {
    querySnapshot = await window.firebase.firestore()
      .collection('users')
      .doc(userid)
      .collection('projects')
      .get();

    console.log('querySnapshot', querySnapshot);

    await querySnapshot.forEach((doc) => {
      const projectData = doc.data();
      projectData.name = doc.id;
      projectData.ref = doc.ref;
      const { path } = doc.ref;
      projectData.path = path;

      projects.push(projectData);
    })

  } catch (e) {
    console.error('Error getting documents: ', e);
  } finally {
    return projects;
  }
};



ProjectApi.getCurrentHackInfo = async function(currentHack) {
  // const _this = this;
  try {
    const hacksDoc = await window.firebase.firestore()
      .collection('hacks')
      .doc(currentHack)
      .get();

    console.log('get current hack info', hacksDoc);
    if (hacksDoc.data){
      return hacksDoc.data();
    }
  } catch (e) {
    console.error('Error getting documents: ', e);
    return false;
  }

    // .then((doc) => {
    //   _this.setState({ hackData: doc.data() });
    //   return doc.data();
    // })
    // .catch(function(error) {
    //   console.error('Error getting documents: ', error);
    // });

};

ProjectApi.getProjectFiles = function(files) {
  return [
    TemplateFiles.IndexHtmlTemplate,
    TemplateFiles.ScriptJsTemplate,
    TemplateFiles.StyleCssTemplate,
  ]
};

/// they should fork a public repo from the main
/// account instead of creating one with arbritrary files
/// we can also track forks and changes better this way
ProjectApi.createGitHubRepository = function(name) {
  this.setState({ status: 'Creating repository...' });

  const templateFiles = [
    { name: 'index.html', content: TemplateFiles.IndexHtmlTemplate },
    { name: 'js/main.js', content: TemplateFiles.ScriptJsTemplate },
    { name: 'css/main.css', content: TemplateFiles.StyleCssTemplate },
  ];

  const projectName = this.state.user.isAdmin
  ? `admin-${this.state.user.uid}-${name}`
  : `${this.state.currentHack}-${this.state.user.uid}-${name}`;

  const newRepoConfig = {
    name: projectName,
    description: 'ironhacks-example-project',
    private: true,
    auto_init: true,
  };

  const createGitHubRepo = window.firebase.functions()
    .httpsCallable('createGitHubRepo');

    createGitHubRepo(newRepoConfig).then((result) => {
      if (result.status === 500) {
        console.error(result.data.error);
      } else {
        this.setState({ status: 'Uploading files...' });
        const commitToGitHub = window.firebase.functions()
        .httpsCallable('commitToGitHub');

        commitToGitHub({
          name: projectName,
          files: templateFiles,
          commitMessage: 'init commit',
        }).then((_result) => {

          if (_result.status === 500) {
            console.error(_result.error);
            return false
          }

          this.setState({
            loading: false,
            navigateToCreatedProject: true,
            newProjectName: _result.name,
          });
        });
      }
    })
}

ProjectApi.putStorageFile = function(file, userId, projectName) {
  // Uploading each template file to storage
  const storageRef = window.firebase.storage().ref();
  const pathRef = storageRef.child(
    `${userId}/${projectName}/${file.path}${file.name}`
  );

  // the return value will be a Promise
  return pathRef
  .put(file.blob)
  .then((snapshot) => {
    pathRef.getDownloadURL()
      .then((url)=>{
      const fileURL = url;
      const fileJson = {};
      const fullPath = file.path + file.name;

      fileJson[fullPath] = { url: fileURL };

      window.firebase.firestore()
        .collection('users')
        .doc(userId)
        .collection('projects')
        .doc(projectName)
        .set(fileJson, { merge: true })
        .then(function(doc) {
          // this.setState({ projectList: {} });

        });
    })
    .catch(function(error) {
      console.error('Error getting documents: ', error);
    });
  })
  .catch((error) => {
    console.log('One failed:', file, error.message);
  });
}


ProjectApi.createNewProject = function(projectName) {
  const templateFiles = this.getProjectFiles();
  Promise.all(
    templateFiles.map((file) => this.putStorageFile(file, projectName))
  )
  .then(() => {
    // this.createGitHubRepository(name);
    return true;
  })
  .catch((error) => {
    console.log('Something failed: ', error.message);
    return false;
  })
}


export { ProjectApi }
