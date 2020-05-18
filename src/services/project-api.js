import { fireApi } from './fire-api';

const firestore = window.firebase.firestore();

// Query all the hacks objects from the db.
const getProjects = async (userid) => {
  console.log('%c getProjects', 'color: teal; font-weight: bold');
  const projects = [];
  var querySnapshot = [];

  try {
    querySnapshot = await firestore.collection('users')
    querySnapshot = await window.firebase.firestore()
      .collection('users')
      .doc(userid)
      .collection('projects')
      .get();

    console.log('querySnapshot', querySnapshot);

    await querySnapshot.forEach((doc) => {
      const projectData = doc.data();
      projectData.name = doc.id;
      projects.push(projectData);
    })


  } catch (e) {
    console.error('Error getting documents: ', e);
  } finally {
    return projects;
  }
};




const createNewProject = (name) => {
  this.setState({ loading: true, status: 'Creatring project...' });
  const templateFiles = [
    // TemplateFiles.indexBlob,
    // TemplateFiles.jsBlob,
    // TemplateFiles.cssBlob,
  ];
  Promise.all(
    templateFiles.map((file) => this.putStorageFile(file, name))
  )
  .then(() => {
    this.createGitHubRepository(name);
  })
  .catch((error) => {
    console.log('Something failed: ', error.message);
  });
};

/// they should fork a public repo from the main
/// account instead of creating one with arbritrar files
/// we can also track forks and changes better this way
const  createGitHubRepository = (name) => {
  this.setState({ status: 'Creating repository...' });

  const templateFiles = [
    // { name: 'index.html', content: TemplateFiles.index },
    // { name: 'js/main.js', content: TemplateFiles.js },
    // { name: 'css/main.css', content: TemplateFiles.css },
  ];

  const projectName = this.state.user.isAdmin
  ? `admin-${this.state.user.uid}-${name}`
  : `${this.state.currentHack}-${this.state.user.uid}-${name}`;

  const _this = this;

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
          _this.setState({
            loading: false,
            navigateToCreatedProject: true,
            newProjectName: _result.name,
          });
        });
      }
    });
}

const putStorageFile = (file, projectName) => {
  // Uploading each template file to storage
  const storageRef = window.firebase.storage().ref();
  const pathRef = storageRef.child(
    `${this.state.user.uid}/${projectName}/${file.path}${file.name}`
  );

  const _this = this;

  // the return value will be a Promise
  return pathRef
  .put(file.blob)
  .then((snapshot) => {
    // Get the download URL
    pathRef
    .getDownloadURL()
    .then(function(url) {
      const fileURL = url;
      const fileJson = {};
      const fullPath = file.path + file.name;
      fileJson[fullPath] = { url: fileURL };
      const firestore = window.firebase.firestore();
      firestore
      .collection('users')
      .doc(_this.state.user.uid)
      .collection('projects')
      .doc(projectName)
      .set(fileJson, { merge: true })
      .then(function(doc) {
        _this.setState({ projectList: {} });
      });
    })
    .catch(function(error) {
      console.error('Error getting documents: ', error);
    });
  })
  .catch(function(error) {})
  .catch((error) => {
    console.log('One failed:', file, error.message);
  });
};


const getCurrentHackInfo = () => {
  const _this = this;
  this.firestore
  .collection('hacks')
  .doc(this.state.currentHack)
  .get()
  .then((doc) => {
    _this.setState({ hackData: doc.data() });
  })
  .catch(function(error) {
    console.error('Error getting documents: ', error);
  });
};


const projectApi = {
  getProjects: getProjects,
  new: createNewProject,
  getInfo: getCurrentHackInfo,
  createRepo: createGitHubRepository,
  saveFile: putStorageFile,
};

export { projectApi }
