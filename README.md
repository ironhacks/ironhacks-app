# the-ironhacks-platform

-- Platform description wording --

# Preparation

The Ironhacks Platform (the platform) use the following firebase services: 

+ [Authentication](https://firebase.google.com/docs/auth)
+ [Cloud Firestore](https://firebase.google.com/docs/firestore)
+ [Storage](https://firebase.google.com/docs/storage)
+ [Hosting](https://firebase.google.com/docs/hosting)
+ [Cloud Functions](https://firebase.google.com/docs/functions)
+ [Firebase Auth UI](https://firebase.google.com/docs/auth/web/firebaseui) 

We assume you are familiarized with all these services, how they work, and how to code using them. If you are not familiarized with them please check the Firebase documentation.

The platform also use the following frameworks/third party libraries:

+ [React](https://reactjs.org/docs/getting-started.html)
+ [react-router-dom](https://reacttraining.com/react-router/)
+ [Styled-components](https://www.styled-components.com/)
+ [react-codemirror2](https://github.com/scniro/react-codemirror2)
+ [Bootstrap](https://getbootstrap.com/) *Deprecated - we are removing this library in future versions. If you are going to update the repo, __don't use it.__*
+ [Moment-js](https://momentjs.com/)
+ [react-moment](https://github.com/headzoo/react-moment#readme)
+ [react-day-picker](https://react-day-picker.js.org/)
+ [react-mde](https://github.com/andrerpena/react-mde#readme)
+ [sweetalert2](https://sweetalert2.github.io/)

We assume you are familiarized with all these librarires, how they work, and how to code using them. If you are not familiarized with them please check the documentation of each one.

# Project structure

The platform is a follow the react-creat-app structure:

- ./
- .gitignore
- firebase.json
- package.json
- readme.md
- public/
  - All the standard react-create-app files
- source/
  - img/ 
    - Global images
  - js/
    - source files and entry point.

We will get into details on the contents bellow.

# Setting up the dev environment

You must have installed [node.js](https://nodejs.org/en/) on your local machine. *We assume you already have a firebase project up with the platform*

The first thing you must do is clone this repository to you local machine and install all the npm packages:

```bash
git clone https://github.com/RCODI/the-ironhacks-platform.git
cd the-ironhacks-platform
npm i
```

Now yoy can start the local server via npm start:

```bash
npm start
```

## Database structure

The database is split in 2 services, the Cloud Firestore and the storage. 

### Cloud Store

Here we have all the data related with the platform: userdata, hacks data, etc. To get used to the inner structure please read the firebase docs. 

Strucure explanation: 

| colection     | description   | Document id | Doc data |
| ------------- |:-------------:| :-------------:|:-------------:| 
| admins        | The list of users that are administrators. | Random |  |
| adminHackData | This is the "sencible" hack data, this collection can only be accessed by admins. | Random | registered users, phase results, task document ( encoded on base64 encoded ascii), white list |
| comments | Each document on this collection represent a comment on a thread in the forum. | Random | Author UID, Author name, body (the comment itself, encoded on base64 encoded ascii), creation date (createdAt), thread id where the comment was posted |
| Forums | Each document represent a forum (which is the abstration of a treatment) in a hack | Random | hack to which the forum belongs, the name of the forum (this is how the admin identifies the forum), list of participants UIDs, treatment identifier |
| Hacks | This is the public data of a hack, every user can query this data. | Random | the name of the hack, the phases dates, and the tutorial document (encoded on base64 encoded ascii) |
| stats | You can store here any stat you want to collect from the platform, the current available list can be found on the stats section | Random | date, event (name of the stats), metadata (a json with the specific data of the stat, for example: a name of a file, the type of a section, etc.), user UID (the user who performed the action |
| Threads |   Each document on this collection represent a thread on a forum. | Random | author UID, author name, comments IDs ( the list of comments posted on the thread), creation date, forum ID, hackID, title |
| whitelists | Here we store all the hacks a give user can participate on | user Email | whitelist: hacks |

There is one additional collection that requires a bit more explanation: Users.

And its first level, the users collections contains the users documents, each document represents the data of a user: 

- email
- hacks (a list of hacks ids, these are the hacks where the user is currently participating on)
- forums (the forums where the participant belongs)
- name

And then, a user can have an aditional collection, called projects, this collection is inside the user document, and contains the data of the user's projects. The Id of the document is the project name, and each document inside this colections represent a file path in the storage. We will talk more about this on the project editor section.

### Storage

Here we store the projects of the users, you can think of it as our massive storage unit.

Each user has a folder on the rootpath of the storage, the name of that folder is the user id. Inside of it you will find all the projects of that user, each one in its own folder, the name of the folder will be the name of the project. Inside the project foldar are all the files of the project.

### Creating admins

In order to create an admin user, you first must register a normal one, to do this just follow the sign up flow on the plaform. Once you register your admin (using any email and password) got to the firebase console and do the following:

+ Go to the "Authentication" tab
+ Find the user you want to make an admin and copy the user UID string (make sure yoy copy the full string)
+ Go to the database tab
+ Click on cloud firestore (if there is no db, follow the instructions to create an empty one)
+ go to the "admins" collection (if there is not, create one, be sure you name it "admins" without the quoutes"
+ Create a new document with the following configuration:
  + As document Id: the user UID that you copyed before.
  + As first field: name - Type: string - value: the name of the admin
  + Click save.
  
Once you save the document, return to the platform and refresh the page, you know should be able to see the admin tab on the top of the page.

This is the only way to create admins.

***NOTE:*** We will go first through the non-admin user flow. Please go down to check the admin flow.

# Entry points

The entry points are the files that are called first in oder to do something, although you should understand this as the normal flow on a react app, we are going to put it here as the entry point of the documentation.

Once you start the dev server using ```npm start```, the react app will start at the ```index.js``` file located on the src folder:

```javascript 
// DO NOT MODIFY THE CONTENT NOR THE NAME OF THIS FILE.
// IronHacks Platform
// index.js - Main entry point
// Created by: Alejandro Díaz Vecchio - aldiazve@unal.edu.co

import React from 'react';
import ReactDOM from 'react-dom';
import { unregister } from './registerServiceWorker';

import IronHacksApp from './ironhackApp.js';

import { BrowserRouter } from 'react-router-dom' // Router

// Bootstrap 4
import 'bootstrap/dist/css/bootstrap-reboot.min.css';
import 'bootstrap/dist/css/bootstrap-grid.min.css';

//Main CSS
import './main.css';

ReactDOM.render((
  <BrowserRouter>
    <IronHacksApp/>
  </BrowserRouter>
), document.getElementById('root'));

unregister();

// DO NOT MODIFY THE CONTENT NOR THE NAME OF THIS FILE.
``` 

*This is the only time we are going to put a entire file here, just beacouse this one is very small*

Here the we just import bootstrap and the global css, then we just go to the IronhacksApp component, which is the actual entry point of the app.

### ironhackApp.js

This file is the root component of the platform, here we can find the user authentication handlers:

isUserConnected
``` javascript
// This funciton calls Firebase SDK to know if there is an active user session
  isUserConected = () => {
    const _this = this;
    window.firebase.auth().onAuthStateChanged((user) => {
      if(user){
        const splitedName = user.displayName.split(' ');
        const profileLetters = splitedName[0].slice(0, 1) + splitedName[1].slice(0, 1)
        user.profileLetters = profileLetters;
        _this.setState({user: user});
        _this.isAdmin(); //We only check this to display specific ui items.
      }else{
        _this.setState({user: false, mustNavigate: true});
      }
    });
  };
```
and isAdmin
``` javascript
  //check on the DB if the current user is admin.
  isAdmin = () => {
    //db Reference
    const firestore = window.firebase.firestore();
    const settings = {timestampsInSnapshots: true};
    firestore.settings(settings);
    const _this = this;
    //Updating the current hack:
    firestore.collection('admins').doc(this.state.user.uid)
    .get()
    .then(function(doc) {
      //Is admin.
        _this.setState((prevState, props) => {
        prevState.user.isAdmin = true;
        prevState.mustNavigate = true;
        return prevState;
      })
    }) 
    .catch(function(error) {
      // The user can't read the admins collection, therefore, is not admin.
        _this.setState((prevState, props) => {
        prevState.user.isAdmin = false;
        prevState.mustNavigate = true;
        return prevState;
      })
    });
  };
```

isUserConnected will ask to the firebase auth object if there is a user currently logged, if yes, we will check on the db if the user is and admin. (this function actually access to the admins collection directly, which could be seen as a security issue, but is not. Normal users are only able to read, a document in that colection if they are actually admins, otherwhise the database will deny the query. To do that we use this rule:

``` javascript
match /admins/{userId} {
      allow read, write: if exists(/databases/$(database)/documents/admins/$(request.auth.uid));
      }
```

*To check the complete set of rules, please check the Database section.*

Now the important thing here is the routes, let's dive into that:

# Routes

We use react-router-dom in order to manage the routes and the context of the app, check their docummentation if you feel rusty on that.

``` jsx
render() {
    //If this.user is null, means that we didn't receive response from firebase auth, therefore we show a loader:
    if(!this.state.mustNavigate){
      return(
        <LoaderContainer>
          <Loader/>
        </LoaderContainer>
      );
    }else{
      return (
        <CookiesProvider>
          <div className='App'>
            <Switch>
              <Route exact path='/' render={() => null}/> 
              <Route exact path='/login' render={() => null}/>
              <Route exact path='/404' render={() => null}/>
              <Route exact path='/projectEditor/:proyectName/preview' render={() => null}/>
              {!this.state.user && <Redirect to='/'/>}
              <Route render={(props) => (<Header user={this.state.user} {...props}/>)}/>
            </Switch>
            <Switch>
              <Route path='/login' component={Login}/>
              <Route path='/hackSelection' render={(props) => (<HackSelection user={this.state.user} {...props}/>)}/>
              <Route path='/profile' render={(props) => (<UserProfile user={this.state.user} {...props}/>)}/>
              <Route exact path='/forum' render={(props) => (<Forum user={this.state.user} {...props}/>)}/>
              <Route exact path='/forum/new' render={(props) => (<NewThread user={this.state.user} {...props}/>)}/>
              <Route path='/forum/thread/:threadId' render={(props) => (<ThreadViewWithRouter user={this.state.user} {...props}/>)}/>
              <Route exact path='/admin/newHack' component={NewHack}/>
              <Route path='/admin/dashboard/:hackId' component={AdminDashboard}/>
              <Route path='/admin' component={Admin}/>
              <Route path='/tutorial' render={(props) => (<Tutorial user={this.state.user} {...props}/>)}/>
              <Route path='/task' render={(props) => (<Task user={this.state.user} {...props}/>)}/>
              <Route exact path='/quizzes' component={Quizzes}/>
              <Route path='/quizzes/:quizName' render={(props) => (<QuizForm user={this.state.user} {...props}/>)}/>
              <Route path='/results' render={(props) => (<Results user={this.state.user} {...props}/>)}/>
              <Route exact path='/projectEditor/:proyectName' render={(props) => (<ProjectEditor user={this.state.user} {...props}/>)}/>
              <Route exact path='/projectEditor/:proyectName/preview' render={(props) => (<ProjectPreview user={this.state.user} {...props}/>)}/>
              <Route exact path='/404' component={NotFound}/> 
              {this.state.user.admin && <Redirect to='/admin'/>}
              <Route exact path='/' component={Landing}/>
              {this.state.user && <Redirect to='/404'/>}
              {<Redirect to='/'/>}
            </Switch>
            <Switch>
              <Route exact path='/' render={() => null}/>
              <Route exact path='/login' render={() => null}/>
              <Route exact path='/404' render={() => null}/>
              <Route exact path='/projectEditor/:proyectName/preview' render={() => null}/>
              <Route component={Footer}/>
            </Switch>
          </div>
        </CookiesProvider>
      );
    }
  };
```
Here we have all the posible routes on the platform, we use 3 switches becouse the header and the footer are only shown when there is a user logged. We also hide them on the preview of a project.

In the second switch we find all the sections of the platform, from here we are going to explain every single rounte using it path and it's file, starting with the login.

# Login - login.js
*full path: ./src/js/components/login/login.js

On this view we create and diplay the firebaseAuthUI instance, we start on the initAuthUI function:

``` javascript
initAuthUI(){ 
    //Config object
    const uiConfig = {
      signInFlow: 'redirect', 
      signInOptions: [
        window.firebase.auth.EmailAuthProvider.PROVIDER_ID
      ],
      callbacks : {
        signInSuccessWithAuthResult : (authResult, redirectUrl) => {
          var user = {
            name: authResult.user.displayName,
            email: authResult.user.email,
            uid: authResult.user.uid
          }
          this.setState({user: user});
          if(authResult.additionalUserInfo.isNewUser === true){
            this.saveUserOnDB(user);
            user.isAdmin = false;
            return false;
          }else{
            this.isAdmin(user);
            return false;
          }
        },
        signInFailure: function(error) {
          console.log(error);
        }
      },
      tosUrl: '/tos',
      privacyPolicyUrl: '/pp',
      credentialHelper: window.firebaseui.auth.CredentialHelper.NONE, // Disableing credentialHelper
    }
    //Making sure there is only one AuthUI instance
    if(window.firebaseui.auth.AuthUI.getInstance()) {
      const ui = window.firebaseui.auth.AuthUI.getInstance()
      ui.start('#firebaseui-auth-container', uiConfig)
    } else {
      const ui = new window.firebaseui.auth.AuthUI(window.firebase.auth())
      ui.start('#firebaseui-auth-container', uiConfig)
    }
  };
```
Make sure you read the docs of the firebaseAuthUI in order to undestand the config object. Keep in mind we only allow users to log in using email and password, this is important to the hack white list feature.

Currently there is not a tos nor a pp web. We are working on that.

Once a normal user logs we redirect the user to a different place accoding with its role, if is an admin we redirect to the admin panel, if not, we redirect to the select hack view.

# hackSelection.js
*On ./src/js/components/login/hackSelection.js*

The hack selection allows the platform to display data according with the hack the usesr select, for example, the tutorial and task documments, the results, the projects, the contents of the forum, among with other stuff. In order to do this, we store in cookies the ID of the hack that is selected here, we call that hack the "selected hack".

In this view the user can do 2 things, register into a new available hack, or enter into hack he already register on. Before the user can do any of those, we first we fetch the available hacks from the database:

``` javascript
//Query all the hacks objects from the db.
  getHacks = () => {
    ...
  }
```

the ```getHacks``` function will retrieve the hacks available for a specific user, that means that only the hacks in which the user is whitelisted will be retieved. The hacks in which the user is already registered will be store in the ```registeredHacks``` array, the rest will be store in the ```availableHacks```.

### Selecting a hack:
  
When a user is already registered into a hack, the selecting proccess consist on setting a cookie on the browser, saving the selected hack data. This is done by the ```setHack``` function:

```javasript
setHack = (hackIndex) => {
    this.setState({status: "Creating participant profile..."});
    const hackId = this.state.registeredHacks[hackIndex] ? this.state.registeredHacks[hackIndex].id : this.state.availableHacks[hackIndex].id;
    const _this = this;
    this.firestore.collection('users')
    .doc(this.props.user.uid)
    .get()
    .then((doc) => {
      const { cookies } = _this.props;
      cookies.set('currentHack', hackId);
      cookies.set('currentForum', doc.data().forums[hackId].id);
      _this.setState({mustNavigate: true});
    })
  }
```
The ```hackIndex``` parameter is a non negative int, which represents the index of the hack in the ```registeredHacks``` or the ```availableHacks``` arrays.

However, if the user is no registered in the hack, the ```goToPresurvey``` function is called instead:

### Registering process:

```javascript 
swal(Constants.preSurveyAlertContent('qualtrics-survey-url?user_email=' + this.props.user.email))
    .then((result) => {
      if(!result.dismiss) {
        this.callRegistrationFuncion(hackIndex);
      };
    });
```
To register in a hack, the user must first fill the registration survey, the content of this survey is defined by the researcher. Notice that we send thorugh the URL the of the participant, we use this in order to identify each responce on the qualtrics dashboard. Please read the qualtrics integration documentation to see how to configure the qualtrics project in order to store the data.

The survey is displayed on an iframe, this is done to avoid the necesity to redirect the user to an external website. In order to detect when the survey is done, we set an event listener to the document: 

``` javascript
componentDidMount() {
    this.getHacks()
    window.addEventListener("message", this.recieveMessage)
  }

  componentWillUnmount() {
    window.removeEventListener("message", this.recieveMessage); 
  }

  recieveMessage = (event) => {
    if(event.data === 'quizDone'){
      swal.clickConfirm();
    }
  }
```

This listener captures a message sended by the qualtric iframe once the user reach the end of the survey and call the receiveMessage, this will trigger the ```swal.clickConfirm()``` functions, which closes the sweetAlert modal.

Then, as it shows in the first function, once the modal is closed with a success status, we call the ```callRegistrationFunction``` function:

``` javascript
 callRegistrationFuncion = (hackIndex) => {
    this.setState({loading:true, status: "Starting registration process..."});
    const _this = this;
    const hackId = _this.state.availableHacks[hackIndex].id
    const registerUserFunc = window.firebase.functions().httpsCallable('registerUser');
    registerUserFunc({hackId: hackId}).then((result) => {
      const projectName = _this.state.availableHacks[hackIndex].data().name.replace(/\s/g, '');
      _this.createNewProject(projectName, hackId, hackIndex);
    });
  }
```
This function recieve as parameter the hackIndex, corresponding to the hackID within the ```registeredHacks``` array.

Once this is done, we start the creation of the users hack project. This is a project that is bind to a hack, specifically, to the hack that the user is registering on, this allow the user to push the project to evaluation. The user can create additional projects that are not binded to any hack in particullar.

This process starts with the ```createNewProject``` function:

```javascript
createNewProject = (name, hackId, hackIndex) => {
    this.setState({status: "Creating participant projects (1/2)..."});
    // Accesing to all the blob template variables:
    const files = TemplateFiles.files;
    Promise.all(
      // Array of "Promises"
      files.map(file => this.putStorageFile(file, name))
    )
    ...
  }

  createGitHubRepository = (name, hackId, hackIndex) => {
    this.setState({status: "Creating participant profile (2/2)..."});
    // Accesing to all the pain text template variables:
    const templateFiles = 
    [
       {
          name: 'index.html',
          content: TemplateFiles.indexContent,
        },
        ...
    ]
    let projectName = `${hackId}-${this.state.user.uid}-${name}`;
    const _this = this;
    const newRepoConfig = {
      name: projectName,
      description: 'Repo description',
      private: true,
      auto_init: true,
    }
    const createGitHubRepo = window.firebase.functions().httpsCallable('createGitHubRepo');
    createGitHubRepo(newRepoConfig)
    .then((result) => {
      if(result.status === 500){
        console.error(result.data.error);
      }else{
        _this.setState({status: "Uploading files..."});
        const commitToGitHub = window.firebase.functions().httpsCallable('commitToGitHub');
        commitToGitHub({name: projectName, files: templateFiles, commitMessage: 'init commit'})
        .then((result) => {
          if(result.status === 500){
            console.error(result.error);
          }else{
            _this.setHack(hackIndex);
          }
        })
      }
    });
  }
```

This function will pull the templateFiles and specify the creation props. Please check the [Octonode documentation](https://github.com/pksunkara/octonode) to undestand the props structure. First we create an empty repo (auto initilized), and then we make a commit with the templeate files. Please refer to the [Backend docs](https://github.com/RCODI/the-ironhacks-platform-backend) to undertant the cloud functions.

The template files are pulled from:

```javascript
import * as TemplateFiles from './newHackTemplates/templates.js';
```

*Please check the file to undestand how the templates are done.*

Once the Github project is created, we call the ```setHack``` function that will redirect the user to the forum.

# The Forum - forum.js
*on ./src/js/component/forum/forum.js*

The forum is the first view a user will see once logged. Here the user can read and post threads related with the task.

This component imports (among others) the following component:
```javascript
import ThreadPreview from './threadPreview.js'
import SponsorsBanner from '../sponsorsBanner/sponsorsBanner.js'
import ForumSelector from './forumSelector.js'
import { registerStats } from '../../utilities/registerStat.js';
import * as DateFormater from '../../utilities/dateFormater.js';
```

+ ```ThreadPreview``` Is a presentational component, it will show a the preview data of a thread: title, author, create date, comment counter and reaction counter, when the user clicks a preview card, will be redirected to the ```ThreadView```.
+ ```SponsorsBanner``` compomponet is also a presentational one, and is just the logos of the sponsors of your contest. 
+ ```ForumSelector``` is also a presentational compoment that shows the available forums (if any) when the user is an admin, we reuse this component to show also the available hacks. (So yes, it will be renamed in future updates)
+ ```registerStats``` is the utility we call to save a stat in the database.
+ ```DateFormater``` is also a utility, we use it to translate javascript date objects to readable text, among other stuff.

The initial state of the app set up the hack and forumID:
```javascript
constructor(props){
  ...
  this.state = {
    currentHack: cookies.get('currentHack') || null,
    forum: cookies.get('currentForum') || null,
    threads: [],
    selectedHack: 0,
  }
  ...
};
```
```threads``` array will store all the threads on the user forum, we obtain them via ```getThreads = ()```:

If the user is an admin, we first retrieve all the hacks that exist on the database:

```javascript
getHacks = () => {
    ...
    this.firestore.collection("hacks")
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        const hackData = doc.data()
        hackData.id = doc.id;  
        hacks.push(hackData);
      });
      _this.setState({hacks: hacks, selectedHack: 0});
      _this.getForums();
    })
    ...
  };
```

Then we pull the forums for that specific hack:

```javascript
getForums = (hackIndex) => {
  const _this = this;
  const forums = [];
  const index = hackIndex ? hackIndex : 0;
  this.firestore.collection('forums')
  .where('hack', '==', this.state.hacks[index].id)
  .get()
  .then((querySnapshot) => {
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      data.id = doc.id;
      forums.push(data);
    });
    _this.setState((prevState, props) => {
      prevState.hacks[index].forums = forums;
      return prevState;
    })
    _this.getThreadsAdmin(0);
  })
  .catch(function(error) {
      console.error("Error getting documents: ", error);
  });
};
```
To finally pull the threads using the selected forum (index 0 by defaut). If the user is an admin, we use ``` getThreadsAdmin = (forumIndex)```to pull the threads, other wise we use:

```javascript
getThreads = () => {
  const _this = this;
  let threads = [];
  this.firestore.collection('threads')
  .where('forumId', '==', this.state.forum)
  .get()
  .then(function(querySnapshot) {
    querySnapshot.forEach(function(doc) {
      const thread = doc.data();
      thread.id = doc.id;
      threads.push(thread);
    });
    threads = _this.sortThreads(threads);
    _this.setState({threads: threads});
  })
  .catch(function(error) {
      console.error("Error getting documents: ", error);
  });
};
```

Once the state us update with the threads, we display a preview of them using ```ThreadPreview```.

And that's it for the forum view. The user can also create a new thread by clicking the "Start a new topic" button, this will redirect the user to the ```NewThread``` view:

### Create a new thread - newThread.js
*on ./src/js/component/forum/newThread.js*

This view implements the ```MarkdownEditor``` component, this is a custom wrapper we do to implement the ```react-mde ``` . Please check the [react-mde docs](https://github.com/andrerpena/react-mde#readme) to undestant the library.

If the user is an admin, we display the admin controls, this is basically two selectors that allows the admin to select the hack and the forum in which the new thread will be posted, we handle that interaction using the same components we use in the forum view.

For both, the user and the admin, the submition process is the same:

```javascript
handleSubmit = (event) => {
    event.preventDefault();
    let hackId, forumId;
    if(this.props.user.isAdmin){
      hackId = this.state.hacks[this.state.selectedHack].id;
      forumId = this.state.hacks[this.state.selectedHack].forums[this.state.selectedForum].id
    }else{
      hackId = this.state.currentHack;
      forumId = this.state.forum;
    }
    const currentDate = new Date(); //We use the same date in both the thread and the comment, so on the db the stats show that they were created at the same time.
    const _this = this;
    const codedBody = this.utoa(this.state.markdown);
    //TODO: add forum id
    this.firestore.collection("threads").add({
      title: this.state.title,
      author: this.props.user.uid,
      authorName: this.props.user.displayName,
      createdAt: currentDate,
      hackId: hackId,
      forumId: forumId,
    })
    .then(function(docRef) {
      const threadRef = docRef.id;
      _this.firestore.collection("comments").add({
        author: _this.props.user.uid,
        authorName: _this.props.user.displayName,
        body: codedBody,
        createdAt: currentDate,
        threadId: docRef.id,
        forumId: forumId,  
      }) // Adding double reference on the thread.
      .then(function(docRef) {
        _this.firestore.collection("threads").doc(threadRef).update({
          comments: [docRef.id],
        })
        _this.setState({mustNavigate: true, threadRef: threadRef});
      })
    })  
    .catch(function(error) {
      ...
    });
  };
```
We encode the content of the thread (AKA the first comment / thread head) using base64 and then we push it to the DB, this creates first a document on the ```threads``` collection, then we create a second document on the ```comments``` collection, this is the only comment that will have a referece to the forum documment, we use this reference to identify it as the thread head. Finally we refresh the ```comments``` array of the thread documment. 

Finally we redirect the user to ```ThreadView```.

### Thread View - threadView.js
*on ./src/js/component/forum/threadView/threadView.js*

  