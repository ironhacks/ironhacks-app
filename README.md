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

We assume you are familiarized with all these services, how they work and how to code using them. If you are not familiarized with them please check the Firebase documentation.

The platform also uses the following frameworks/third party libraries:

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
+ [react-treebeard](https://github.com/storybookjs/react-treebeard)

We assume you are familiarized with all these librarires, how they work and how to code using them. If you are not familiarized with them please check the documentation of each one.

# Project structure

The platform is as follows a react-create-app structure:

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

Here we have all the data related with the platform: user data, hacks data, etc. To get used to the inner structure please read the firebase docs. 

Strucure explanation: 

| collection     | description   | Document id | Doc data |
| ------------- |:-------------:| :-------------:|:-------------:| 
| admins        | The list of users that are administrators. | Random |  |
| adminHackData | This is the "sensible" hack data, this collection can only be accessed by admins. | Random | registered users, phase results, task document ( encoded on base64 encoded ascii), white list |
| comments | Each document on this collection represent a comment on a thread in the forum. | Random | Author UID, Author name, body (the comment itself, encoded on base64 encoded ascii), creation date (createdAt), thread id where the comment was posted |
| Forums | Each document represent a forum (which is the abstraction of a treatment) in a hack | Random | hack to which the forum belongs, the name of the forum (this is how the admin identifies the forum), list of participants' UIDs, treatment identifier |
| Hacks | This is the public data of a hack, every user can query this data. | Random | the name of the hack, the phases dates, and the tutorial document (encoded on base64 encoded ascii) |
| stats | You can store here any stat you want to collect from the platform, the current available list can be found on the stats section | Random | date, event (name of the stats), metadata (a json with the specific data of the stat, for example: name of a file,  type of a section, etc.), user UID (the user who performed the action) |
| Threads |   Each document on this collection represents a thread on a forum. | Random | author UID, author name, comments IDs ( the list of comments posted on the thread), creation date, forum ID, hackID, title |
| whitelists | Here we store all the hacks that a user can participate in | user Email | whitelist: hacks |

There is one additional collection that requires a bit more explanation: Users.

And its first level, the users collections contains the users documents, each document represents the data of a user: 

- email
- hacks (a list of hacks ids, these are the hacks where the user is currently participating on)
- forums (the forums where the participant belongs)
- name

And then, a user can have an additional collection, called projects, this collection is inside the user document, and contains the data of the user's projects. The Id of the document is the project name, and each document inside this colections represent a file path in the storage. We will talk more about this on the project editor section.

### Storage

Here we store the projects of the users, you can think of it as our massive storage unit.

Each user has a folder on the rootpath of the storage, the name of that folder is the user id. Inside of it you will find all the projects of that user, each one in its own folder, the name of the folder will be the name of the project. Inside the project folder are all the files of the project.

### Creating admins

In order to create an admin user, you first must register as a normal one, to do this just follow the sign up flow on the plaform. Once you register your admin (using any email and password) go to the firebase console and do the following:

+ Go to the "Authentication" tab
+ Find the user you want to make an admin and copy the user UID string (make sure yoy copy the full string)
+ Go to the database tab
+ Click on cloud firestore (if there is no db, follow the instructions to create an empty one)
+ go to the "admins" collection (if there is not, create one, be sure you name it "admins" without the quoutes"
+ Create a new document with the following configuration:
  + As document Id: the user UID that you copied before.
  + As first field: name - Type: string - value: the name of the admin
  + Click save.
  
Once you save the document, return to the platform and refresh the page, you now should be able to see the admin tab on the top of the page.

This is the only way to create admins.

***NOTE:*** We will go first through the non-admin user flow. Please go down to check the admin flow.

# Entry points

The entry points are the files that are called first in order to do something, although you should understand this as the normal flow on a react app, we are going to put it here as the entry point of the documentation.

Once you start the dev server using ```npm start```, the react app will start at the ```index.js``` file located on the src folder:

```javascript 
// DO NOT MODIFY THE CONTENT OR THE NAME OF THIS FILE.
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

// DO NOT MODIFY THE CONTENT OR THE NAME OF THIS FILE.
``` 

*This is the only time we are going to put a entire file here, just because this one is very small*

Here we just import bootstrap and the global css, then we just go to the IronhacksApp component, which is the actual entry point of the app.

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

isUserConnected will ask firebase auth object if there is a user currently logged in, if yes, we will check on the db if the user is an admin. (this function actually accesses to the admins collection directly, which could be seen as a security issue, but is not. Normal users are only able to read, a document in that collection if they are actually admins, otherwise the database will deny the query. To do that we use this rule:

``` javascript
match /admins/{userId} {
      allow read, write: if exists(/databases/$(database)/documents/admins/$(request.auth.uid));
      }
```

*To check the complete set of rules, please check the Database section.*

Now the important thing here is the routes, let's dive into that:

# Routes

We use react-router-dom in order to manage the routes and the context of the app, check their documentation if you feel rusty on that.

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
Here we have all the possible routes on the platform, we use 3 switches because the header and the footer are only shown when there is a user logged. We also hide them on the preview of a project.

In the second switch we find all the sections of the platform, from here we are going to explain every single route using its path and its file, starting with the login.

# Login - login.js
*full path: ./src/js/components/login/login.js*

On this view we create and display the firebaseAuthUI instance, we start on the initAuthUI function:

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
Make sure you read the docs of the firebaseAuthUI in order to understand the config object. Keep in mind we only allow users to log in using email and password, this is important to the hack white list feature.

Currently there is not a tos nor a pp web. We are working on that.

Once a normal user logs we redirect the user to a different place according to his/her role, if is an admin we redirect to the admin panel, if not, we redirect to the select hack view.

# Administrating the platform
*On ./src/js/components/admin/admin.js*

The task of an administrator is to create and maganage the hacks that are in the platform. A Hack is a cyclic coding contest, we call each cycle a phase. A phase is divided into 2 parts: coding and evaluation. The participants will try to solve the challenge during the coding stage and push their advances at the end of the stage. During the evaluation stage, the administrator will review the projects and provide a score for each participant, the participants will have access to that score at the start of the next phase, and so on til the end of the hack.

We pull the data of all hacks using ```getHacks```

```javascript
getHacks = () => {
  const firestore = window.firebase.firestore();
  const settings = {timestampsInSnapshots: true};
  firestore.settings(settings);
  const _this = this;
  var hacks = [];
  firestore.collection("hacks").get().then(function(querySnapshot) {
    querySnapshot.forEach(function(doc) {
      // doc.data() is never undefined for query doc snapshots
      const hackData = doc.data()
      hackData.id = doc.id;  
      firestore.collection('adminHackData').doc(doc.id)
      .get()
      .then(function(doc) {
        hackData['whiteList'] = doc.data().whiteList;
        hackData['task'] = doc.data().task;
        hacks.push(hackData);
        _this.setState({hacks: hacks});
      });
    });
  })
  .catch(function(error) {
      console.error("Error getting documents: ", error);
  });
};
```

We also merge the public hack data (that we pulled from the ```hacks``` collection) with the admin hack data (that we pulled from ```adminHackData```).

Let's start by the creation of a hack. When an admin login in the platform, is redirected to the ```admin``` view, this view displays the current hacks (if any) and allows the admin to start the creation process on a new hack.

## Creating a new hack
*On ./src/js/components/admin/newHack/newHack.js*
Once the admin clicks on "add hack" we redirect him to the ```newHack``` view, in this view we ask for the basic data of the hack:

+ The name of the hack
+ The dates of the phases (must be at least 1)
+ Forums names and treatments (Must be at least 1)

```javascript
constructor(props){
  super(props);
  this.state = {
    hackName : '',
    selectedPhase: 0,
    from: undefined,
    to: undefined,
    isCalendarManagingFocus: false,
    phases: [{coding: {start: new Date(), end: new Date()}, evaluation: {start: new Date(), end: new Date()}}],
    forums: [{name: '', treatment: 0, participants: []}],
    isCreateEnable: true,
    mustNavigate: false
  }
  //References
  this.calendarContainerRef = React.createRef();  
};
```

From the contructor of the component we can visualize all the data we are getting from the view: 

+ ```hackName```: Name of the hack, pulled from a normal input.
+ ```selectedPhase```: We we show the [```react-day-picker```](https://react-day-picker.js.org/), we bind the phase using this index, for example, if the index is 3, that means that the user is picking phase's 3 dates.
+ ```from```: The start date for a phase stage.
+ ```to```: The finish date for a phase stage.
+ ```isCalendarManagingFocus```: We use this to handle the opacity of the [```react-day-picker```](https://react-day-picker.js.org/) component.
+ ```phases```: Array of objects representing the phases of the hack.
+ ```forums```: Array of objects representing the forums of the hack.
+ ```isCreateEnable```: We set this to true when all the minimun data to create a hack is provided, so we enable the ```create hack``` button.

Then, we process al the data using the ```createHack``` function:

```javascript
createHack = () => {
  //Mapping phases object to create the json representation of it.
  const phases = this.state.phases.map((item, index) => {
    return {
      index: index,
      codingStartDate: item.coding.start,
      codingStartEnd: item.coding.end,
      evaluationStartDate: item.evaluation.start,
      evaluationStartend: item.evaluation.end,
    }
  })

  const hackInstance = {
    name: this.state.hackName,
    phases: phases,
    tutorial: {
      doc: '',
      start: new Date(),
      end: new Date(),
    },
  }

  const adminData = {
    task: {
      doc: '',
      releaseDate: new Date(),
    },
    whiteList: [],
  }

  this.setState({hack: hackInstance});
  //db Reference
  const firestore = window.firebase.firestore();
  const settings = {timestampsInSnapshots: true};
  firestore.settings(settings);
  const _this = this;
  //TODO: add forum id
  firestore.collection('hacks').add(hackInstance)
  .then(function(docRef) {
    const hackRef = docRef.id;
    _this.setState({hackId: hackRef});
    //Adding each forum to the hack:
    // Get a new write batch
    const batch = firestore.batch();
    _this.state.forums.forEach((forum) => {
      forum.hack = hackRef;
      const newForumRef = firestore.collection('forums').doc();
      batch.set(newForumRef, forum);
    })
    const adminDataRef = firestore.collection('adminHackData').doc(hackRef);
    batch.set(adminDataRef, adminData);
    // Commit the batch
    batch.commit().then(function () {
        //TODO: Update the UI to give feedback to the user
        _this.setState({mustNavigate: true})
    });
  })  
  .catch(function(error) {
    console.error("Error adding document: ", error);
  });
};
```

Here we merge all the data into one object: ```hackInstance``` and push it to Firebase, this process affects multiple collections: We first create the object on the ```hacks``` collection, then we create all the forums on the ```forums``` collection, once we obtain the reference of all the forums documents, we create an aditional document on ```adminHackData``` where we upload all the forums references.

Once this is done, we redirect the admin to the admis dashboard. Keep in mind that this is an 'empty' hack, it doesn't have a task or a tutorial document, neither a whitelist (a participant list). All this data must be added from the admin dashboard:

## The Admin Dashboard:
*On ./src/js/components/admin/adminDashboard.js*

There are 3 main actions that and admin can perform on the dashboard:

+ Manage the whitelist.
+ Create and publish the taks document.
+ Create and publish the turotial document.

Let's start by the whitelist:

### The Whitelist
*On ./src/js/components/admin/sections/settings/admSettingsSection.js*

The whitelist is composed by emails, each email bellongs to a participant, if a user's email matchs with an item on a whitelist, that hack will appear on the ```hackSelection``` section, and the user will be able to register in that hack.

```javascript
constructor(props){
  super(props);
  let whiteList = [''];
  if(this.props.hack.whiteList && this.props.hack.whiteList.length > 0){
    whiteList = this.props.hack.whiteList;
  }
    this.state = {
    whiteList: whiteList,
  }
}
```

The whitelist is just an array of strings, we pull the whitelist from the props, and if there is any item, we load it to the state.

When the user saves the list, we call the ```saveChanges``` function:

```javascript
saveChanges = () => {
  let normalizeWhiteList = this.state.whiteList;
  normalizeWhiteList = this.normalizeEmailArray(normalizeWhiteList);
  this.props.onSaveSettings(normalizeWhiteList);
  this.setState({whiteList: normalizeWhiteList});
};
```

We first normalized the email array, the ```normalizeEmailArray``` function first check that the email is a valid email and then remove the duplicates on the list. Then we call a function on the ```AdminDashboard``` component:

*On ./src/js/components/admin/adminDashboard.js*
```javascript
onSaveSettings = (whiteList) => {
  this.updateHackSettings(whiteList);
};

updateHackSettings = (whiteList) => {
  //db Reference
  const firestore = window.firebase.firestore();
  const settings = {timestampsInSnapshots: true};
  firestore.settings(settings);
  const _this = this;
  //Updating the whiteList collection:
  var batch = firestore.batch();
  whiteList.forEach((email) => {
    const data = {whiteList: window.firebase.firestore.FieldValue.arrayUnion(_this.state.hackId)}
    const whiteListDoc = firestore.collection('whiteLists').doc(email);
    batch.set(whiteListDoc, data, {merge: true});
  })
  // Adding whiteList cross reference to the hack object on firebase:
  const hackWhiteListObject = {
    whiteList:  whiteList
  }
  const hackRef = firestore.collection('adminHackData').doc(this.state.hackId);
  batch.set(hackRef, hackWhiteListObject, {merge: true});
  batch.commit()
  .then(() => {
    //TODO: update UI to provide feedback to the user.
    //Updating local stage
    this.setState((prevState, props) => {
      prevState.hack.whiteList = {whiteList: whiteList}
      return {hack: prevState.hack};
    })
  })  
  .catch(function(error) {
    console.error("Error adding document: ", error);
  });
};
```

```onSaveSettings``` call's ```updateHackSettings``` which actually updates the database. First we update the users whitelist object on the ```whitelists``` collection, then we update the ```adminHackData``` collection.

### The Task Document
*On ./src/js/components/admin/sections/task/admTaskSection.js*

The task document is a markdown document (just like this one), we use [```react-mde```](https://github.com/andrerpena/react-mde#readme) to provide an editor with a preview. 

```javascript
onEditorChange = (markdown) => {
  this.props.onTaskMarkdownUpdate(markdown);
};

render() {
  return (
    <ThemeProvider theme={theme}>
      <SectionContainer>
        <h2>Task document editor</h2>
        <p>Here you can edit and preview the Task document. You can also publish the document or schedule it (check bellow).</p>
        <EditorContainer>
          <MarkdownEditor editorLayout='horizontal' onEditorChange={this.onEditorChange} withContent={this.props.previousDocument}/>
        </EditorContainer>
        <p>Here you will find the instrictions to publish your task.</p>
        <AvailableActionsDiv>
          <Button 
            primary
            width='150px' 
            margin='0 0 0 15px'
            onClick={this.props.updateTaskDocument}>
            Publish Task
          </Button>
        </AvailableActionsDiv>
      </SectionContainer>
    </ThemeProvider>
  );
}
```
As you see, this is a pure presentational component, it just take the content of the [```react-mde```](https://github.com/andrerpena/react-mde#readme) editor and send it to the parent component (```AdminDashboard```), this will update the state of the ```AdminDashboard``` component and when the user saves the document we call ```updateTaksDocument```:

*On ./src/js/components/admin/adminDashboard.js*
```javascript
updateTaskDocument = () => {
  //db Reference
  const firestore = window.firebase.firestore();
  const settings = {timestampsInSnapshots: true};
  firestore.settings(settings);
  //Updating the current hack:
  const hackRef = firestore.collection('adminHackData').doc(this.state.hackId);
  const hackTask = this.state.hack.task;
  hackTask.doc = this.utoa(this.state.taskMarkdown)
  hackRef.update({
    task: hackTask,
  })
  ...
};
```

Here we encode the plain text of the task on base64 and then we update the document on the ```adminHackData``` collection.

### The Tutorial Document
*On ./src/js/components/admin/sections/tutorial/admTutorialSection.js*

The tutorial document works *almost in the same way* that the task document, the only difference being that we store the tutorial document on the ```hacks``` collection, rather than the ```adminHackData```:

*On ./src/js/components/admin/adminDashboard.js*
```javascript
onTutorialMarkdownUpdate = (markdown) => {
  this.setState({tutorialMarkdown: markdown});
};

updateTutorialDocument = () => {
  //db Reference
  const firestore = window.firebase.firestore();
  const settings = {timestampsInSnapshots: true};
  firestore.settings(settings);
  //Updating the current hack:
  const hackRef = firestore.collection('hacks').doc(this.state.hackId);
  var hackTutorial = this.state.hack.tutorial;
  hackTutorial.doc = this.utoa(this.state.tutorialMarkdown)
  hackRef.update({
    tutorial: hackTutorial,
  })
  .then(() => {
    //TODO: update UI to provide feedback to the user.
  })  
  .catch(function(error) {
    console.error("Error adding document: ", error);
  });
};
```

Now lest jump into the participant flow:

# hackSelection.js
*On ./src/js/components/login/hackSelection.js*

The hack selection allows the platform to display data according to the hack the users select, for example, the tutorial and task documents, the results, the projects, the contents of the forum, among with other stuff. In order to do this, we store in cookies the ID of the hack that is selected here, we call that hack the "selected hack".

In this view the user can do 2 things, register into a new available hack, or enter into hack he already register on. Before the user can do any of those, we first fetch the available hacks from the database:

``` javascript
//Query all the hacks objects from the db.
  getHacks = () => {
    ...
  }
```

the ```getHacks``` function will retrieve the hacks available for a specific user, that means, only the hacks in which the user is whitelisted will be retrieved. The hacks in which the user is already registered will be stored in the ```registeredHacks``` array, the rest will be stored in the ```availableHacks```.

### Selecting a hack:
  
When a user is already registered into a hack, the selecting process consists of setting a cookie on the browser, saving the selected hack data. This is done by the ```setHack``` function:

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

However, if the user is not registered in the hack, the ```goToPresurvey``` function is called instead:

### Registration process:

```javascript 
swal(Constants.preSurveyAlertContent('qualtrics-survey-url?user_email=' + this.props.user.email))
    .then((result) => {
      if(!result.dismiss) {
        this.callRegistrationFuncion(hackIndex);
      };
    });
```
To register in a hack, the user must first fill the registration survey, the content of this survey is defined by the researcher. Notice that we send thorugh the URL of the participant, we use this in order to identify each responce on the qualtrics dashboard. Please read the qualtrics integration documentation to see how to configure the qualtrics project in order to store the data.

The survey is displayed on an iframe, this is done to avoid the necessity to redirect the user to an external website. In order to detect when the survey is done, we set an event listener to the document: 

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

This listener captures a message sent by the qualtric iframe once the user reach the end of the survey and call the receiveMessage, this will trigger the ```swal.clickConfirm()``` functions, which closes the sweetAlert modal.

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
This function recieves as parameter the hackIndex, corresponding to the hackID within the ```registeredHacks``` array.

Once this is done, we start the creation of the users hack project. This is a project that is bind to a hack, specifically, to the hack that the user is registering on, this allow the user to push the project to evaluation. The user can create additional projects that are not binded to any hack in particullar from the ```UserProfile``` view.

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
  .then((url) => {
    this.createGitHubRepository(name, hackId, hackIndex);
  })
  ...
}
``` 
The process is divided in two steps, we first get the template files blobs from the ```Template``` object. The template files are pulled from:

```javascript
import * as TemplateFiles from './newHackTemplates/templates.js';
```

*Please check the file to undestand how the templates are done.*

Then we push the files to ```Firebase Storage``` using the ```putStorageFile``` function:

```javascript
putStorageFile = (file, projectName) => {
  //Uploading each template file to storage
  const storageRef = window.firebase.storage().ref();
  const pathRef = storageRef.child(`${this.state.user.uid}/${projectName}/${file.path}${file.name}`)   
  const _this = this;
  // the return value will be a Promise
  return pathRef.put(file.blob)
  .then((snapshot) => {
    // Get the download URL
    pathRef.getDownloadURL().then(function(url) {
      const fileURL = url;
      const fileJson = {};
      const fullPath = file.path + file.name;
      fileJson[fullPath] = {url: fileURL}
      const firestore = window.firebase.firestore();
      const settings = {timestampsInSnapshots: true};
      firestore.settings(settings);
      firestore.collection("users")
      .doc(_this.state.user.uid)
      .collection('projects')
      .doc(projectName)
      .set(fileJson, {merge: true})
      .then(function(doc) {
        _this.setState({projectList: {}});
      })
    })
  ...
}
 ```
Here we put the file on the storage and save de download URL on the user's project document, we will use that URL on the project editor in order to display the contents of the file on the editor.

Once we put all the files on the storage, we create the Github repository:

```javascript
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

This function will pull the templateFiles and specify the creation props. Please check the [Octonode documentation](https://github.com/pksunkara/octonode) to undestand the props structure. First we create an empty repo (auto initilized), and then we make a commit with the templeate files. Please refer to the [Backend docs](https://github.com/RCODI/the-ironhacks-platform-backend) to understant the cloud functions.

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

+ ```ThreadPreview``` Is a presentational component, it will show the preview data of a thread: title, author, create date, comment counter and reaction counter, when the user clicks a preview card, will be redirected to the ```ThreadView```.
+ ```SponsorsBanner``` component is also a presentational one, and is just the logos of the sponsors of your contest. 
+ ```ForumSelector``` is also a presentational compoment that shows the available forums (if any). When the user is an admin, we reuse this component to show also the available hacks. (So yes, it will be renamed in future updates)
+ ```registerStats``` is the utility we call to save a stat in the database.
+ ```DateFormatter``` is also a utility, we use it to translate javascript date objects to readable text, among other stuff.

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
To finally pull the threads using the selected forum (index 0 by default). If the user is an admin, we use ``` getThreadsAdmin = (forumIndex)```to pull the threads, other wise we use:

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

Once the state is updated with the threads, we display a preview of them using ```ThreadPreview```.

And that's it for the forum view. The user can also create a new thread by clicking the "Start a new topic" button, this will redirect the user to the ```NewThread``` view:

### Create a new thread - newThread.js
*on ./src/js/component/forum/newThread.js*

This view implements the ```MarkdownEditor``` component, this is a custom wrapper we do to implement the ```react-mde ``` . Please check the [react-mde docs](https://github.com/andrerpena/react-mde#readme) to undestand the library.

If the user is an admin, we display the admin controls, this is basically two selectors that allows the admin to select the hack and the forum in which the new thread will be posted, we handle that interaction using the same components we use in the forum view.

For both, the user and the admin, the submission process is the same:

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
    console.error("Error adding document: ", error);
  });
};
```
We encode the content of the thread (AKA the first comment / thread head) using base64 and then we push it to the DB, this creates first a document on the ```threads``` collection, then we create a second document on the ```comments``` collection, this is the only comment that will have a referece to the forum documment, we use this reference to identify it as the thread head. Finally we refresh the ```comments``` array of the thread documment. 

Finally we redirect the user to ```ThreadView```.

### Thread View - threadView.js
*on ./src/js/component/forum/threadView/threadView.js*

```threadView``` is a very simple component, it retrieve the data for a given thread (using the id on the url) and then proceed to dispaly all the comments on that thread:

```javascript
getThreadData = () => {
  const _this = this;
  this.firestore.collection('threads')
  .doc(this.props.match.params.threadId)
  .get()
  .then((doc) => { 
    const thread = doc.data();
    thread.id = doc.id;
    _this.setState({thread}, _this.getComments());
  })
  ...
};
```

```getThreadData``` get the ```threadId``` from the url and then ask to the database for the data, then calls ```getComments``` to obatain all the comments:

```javascript
getComments = () => {
  const _this = this;
  this.firestore.collection('comments')
  .where('threadId', '==', this.props.match.params.threadId)
  .orderBy('createdAt', 'asc')
  .get()
  .then(function(querySnapshot) { 
    let comments = [];
    let head;
    querySnapshot.forEach(function(doc) {
      const comment = doc.data();
      comment.id = doc.id;
      if (comment.forumId) { 
        head = comment
      }else {
        comments.push(comment);
      }
    });
    //updating the rest of the comments:
    _this.setState((prevState, props) => {
      return({
        head,
        comments,
      })
    });
  })
  ...
};
```

```getComments``` gets all the comments of a given thread, arrenged by date. It also identify the head of the thread and set everything in the state of the componente.

We show every comment (including the head) using the ```commentView``` component:

### Comment View - commentView.js
*on ./src/js/component/forum/threadView/commentView.js*

The main purpuse of this component is to display a the content of a comment, this is a very straigh forward taks that is done on the ```render``` function using props. However, this component also handles the "state" of the comments: the reactions and the delete process. 

Let's start by the delete process: an user can delete it's own comments and threads, this is handled by two functions:

#### Deleting a comment

```javascript
deleteSingleComment = (comment) => {
  const _this = this;
  const commentId = comment || this.props.commentData.id
  const threadRef = this.firestore.collection("threads").doc(this.props.commentData.threadId);
  return threadRef.get()
  .then((doc) => {
    const threadData = doc.data();
    threadData.comments = threadData.comments.filter((comment) => (comment !== commentId));
    threadRef.update(threadData);
    return _this.firestore.collection("comments")
    .doc(commentId)
    .delete()
    .then(() => {
      if ( !comment )
        _this.props.reloadComments();
    })
    ...
};
```

#### Deleting a thread

Here we first remove the commentID reference from the thread documment and then we delete the comment from the database. After this we reaload the comment to refresh the view.

To delete the whole thread we use ```deleteThread```:

```javascript
const threadRef = this.firestore.collection("threads").doc(this.props.commentData.threadId);
    threadRef.get()
    .then((doc) => {
      const threadData = doc.data();
      const comments = threadData.comments;
      Promise.all(
        // Array of Promises
        comments.map(commentId => this.deleteSingleComment(commentId))
      )
      .then(() => {
        threadRef.delete()
        .then(() => {
          this.setState({navigateToForum: true});
        });
      })
    ...
```

What we do here is call ```deleteSingleComment``` to delete all the comments on the thread, and then delete the thread document itself. At the end we redirect the user to the forum main page. 

*Note: An admin can delete all threads or comments.*

#### Reactions
*on ./src/js/component/forum/reactionView.js*

A user can "react" to a comment or a thread, this reaction are the "like" or "dislike" buttons. This is handle by the ```ReactionPicker``` component.

When a user clicks on a reaction button ```handleReactionClick``` is triggered:

```javascript
handleReactionClick = (event) => {
  const _this = this;
  const reactionType = event.target.id;
  const updatedData = {
    likes: this.state.likes,
    dislikes: this.state.dislikes,
  };
  if(updatedData[reactionType].includes(this.props.user.uid)) {
    updatedData[reactionType] = updatedData[reactionType].filter( element => element !== this.props.user.uid)
  } else {
    updatedData[reactionType].push(this.props.user.uid);
    updatedData[reverseReaction[reactionType]] = updatedData[reverseReaction[reactionType]].filter( element => element !== this.props.user.uid)
  }
  this.firestore.collection('comments')
  .doc(this.props.commentId)
  .update({
    'reactions.likes': updatedData.likes,
    'reactions.dislikes': updatedData.dislikes,
  })
  .then((response) => {
    const isLiked = updatedData.likes.includes(_this.props.user.uid);
    const isDisliked = updatedData.dislikes.includes(_this.props.user.uid);
    _this.setState({
      likes: updatedData.likes,
      dislikes: updatedData.dislikes,
      isLiked,
      isDisliked,
    });
  })
  .catch(function(error) {
      console.error("Error updating documents: ", error);
  });
} 
```

This function will add, remove or reverse a reaction, according with the user interaction.

---

Whit this we finish the main components of the forum.

We are going to proceed now with the project editor.

# The Project Editor

Before jump into the actual project editor, let's check how to create a new project:

### Creating a new project
*On: ./src/js/component/userProfile/userProfile.js*

The user can create a non-binded project by clicking the "Create new project" button. Once the user provides a name for the project, we just mimic the same process we do when a user is registered into a hack. Please refer to that section to check it.

Once the project is created, or when the user clicks in an already existing project, we redirect it to the ```ProjectEditor```.

## The Editor
*On: ./src/js/component/projectEditor/projectEditor.js*

The project editor is composed by 3 different components: The control section (where the user select files, save the project, push to evaulation, among other stuff), the text editor and the preview.

Before go into those sections, let's check the initialization of the component:

```javascript
constructor(props){
  super(props);
  const { cookies, user } = props;
  const hackerId = props.location.query ? props.location.query.hackerId : null;
  const readOnly = hackerId ? true : false;
  this.state = {
    user,
    readOnly,
    hackerId,
    editorKey: Math.random(),
    hidePreview: false,
    currentHack: cookies.get('currentHack') || null,
    editorContent: '',
    editorMode: 'xml',
    loadingFiles: true,
    selectedFile: 'index.html',
    projectFiles: [],
    currentAlert: null,
    creatingFile: false,
    projectName: this.props.match.params.proyectName,
    timer: {seconds: 0, minutes: 0, hours: 0, days: 0},
  }
  this.firestore = window.firebase.firestore();
}
```

The state of the component is quite large, let's breack it down: 

The first thing we do is to check if there is a hackerID on the props, if yes, that means that the user that is looking the project is not the owner, in this particular case, this beheaviour is due to the treatment we gave to the experiment, this is triggered when a user clicks on a specific link on the results page.

Then we set the state object:

+ ```user```: The user data pulled from the props
+ ```readOnly```: Explain above
+ ```hackerId```: Explain above
+ ```editorKey```: this is a random number generated everytime we change the currend file on the editor, this effectively re-render the codemirror component, erasing the text history, so even if the user hit ```control + z``` the previous file will not be rendered. 
+ ```hidePreview```: If this is true, the Preview component will be hide adn be opened on a new tab.
+ ```currentHack```: currentHackID, pulled from cookies if any, or setted later.
+ ```editorContent```: the text is going to be displayed on the editor.
+ ```editorMode```: specify the highlight plugin (xml, css, javascript),
+ ```loadingFiles```: if true, a spinner will be rendered on the FilesComponent.
+ ```selectedFile```: the name of the current selected file.
+ ```projectFiles```: and array with all the files objects.
+ ```creatingFile```: if true, the creating file flow is running.
+ ```projectName```: Just the project name.
+ ```timer```: count down to next phase.

After set the state, we initialize some data:

```javascript
componentDidMount() {
  this.getProjectPreviewPath();
  this.getProjectFilesUrls();
  this.getCurrentHackInfo();
  window.addEventListener("message", this.recieveMessage)
}
```

First we compose the preview URL, the preview URL is predictable, we "calculated" and the we put ir on the state.

```javascript
getProjectPreviewPath = () => {
  // Create a reference with an initial file path and name
  const userId = this.state.hackerId || this.state.user.uid;
  const proyectPath = `${Constants.cloudFunctionsProdEndPoint}/previewWebServer/${userId}/${this.state.projectName}/index.html`; 
  this.setState({proyectPath: proyectPath});
}
```

Then we pull the project data from firebase, first by getting the URLs from the firestore databes:

```javascript
getProjectFilesUrls = () => {
  const firestore = window.firebase.firestore();
  const settings = {timestampsInSnapshots: true};
  firestore.settings(settings);
  const _this = this;
  const userId = this.state.hackerId || this.state.user.uid;
  //Updating the current hack:
  firestore.collection('users')
  .doc(userId)
  .collection('projects')
  .doc(this.state.projectName)
  .get()
  .then(function(doc) {
    _this.setState({projectFiles: doc.data()})
    _this.getProjectFiles();
  }) 
  .catch(function(error) {
    console.error(error)
  });
}
```

And then pulling the files from the storage:

```javascript
getProjectFiles = () => {
  let remainingFiles = Object.keys(this.state.projectFiles).length
  const projectFiles = { ...this.state.projectFiles};
  const _this = this;
  for (const file in this.state.projectFiles){
    const xhr = new XMLHttpRequest();
    xhr.responseType = 'blob';
    xhr.onload = function() {
      projectFiles[file].blob = xhr.response;
      remainingFiles--;
      if(remainingFiles === 0) _this.readProjectFilesBlobs(projectFiles);
    };
    xhr.open('GET', this.state.projectFiles[file].url);
    xhr.send();
  };
}
```

We normalized the blobs by using ```readProjectFilesBlobs```, this chain of functions will read all the blobs we pulled here, create an array of objects that contains the parced data, the blob and the path of each file. Then we update the state to re-render the different componets that display this data.

Last thing we do is get the current hack info, we use this data to display the countdown timer for the next phase:

```javascript
getCurrentHackInfo = () => {
  const _this = this;
  this.firestore.collection('hacks')
  .doc(this.state.currentHack)
  .get()
  .then((doc) => {
    const hackData = doc.data();
    const currentPhase = DateFormater.getCurrentPhase(hackData.phases).index + 1 || -1;
    _this.setState({
      hackData,
      currentPhase,
    });
    if(currentPhase !== -1) 
      _this.getCountDown()
  })
  .catch(function(error) {
      console.error("Error getting documents: ", error);
  })
};
```

Know we can start with each of the 3 components that compose the Project editor, starting by the Control section:

### The Control Section
*On: ./src/js/component/projectEditor/projectEditor.js*

```jsx
<ProjectContent>
  <h2>{this.state.projectName.toUpperCase()}</h2>
  {!this.state.readOnly && 
    <div className="control">
      <Button primary onClick={this.saveProject}> Save and run </Button>
      {this.state.currentPhase !== -1 &&
        <Button primary onClick={this.startPushNavigation}> Push to evaluation </Button>
      }
      <Button primary onClick={this.startCreateNewFileFlow}>Create new file</Button>
    </div>
  }
  <h3>Files:</h3>
  {this.state.loadingFiles ? <Loader 
      backgroundColor={Constants.projectEditorBgColor}
      dark
      small
    /> : 
    <FilesContainer files={this.state.projectFiles}
      onFileSelection={this.onFileSelection}
      selectedFile={this.state.selectedFile}
      projectName={this.state.projectName.toUpperCase()}/>  
  }
  <div className="hack-status">
    <h3>Current phase: {this.state.currentPhase !== -1 ? this.state.currentPhase : 'Tutorial stage'}</h3>
    <p>
      Remaining time: <br/>
      {`${this.state.timer.days}:${this.state.timer.hours}:${this.state.timer.minutes}:${this.state.timer.seconds}`}
    </p>
  </div>
</ProjectContent>
```

There are some key action that the user can perform here:

- ```saveProject``` by clicking Save and run.
- ```startPushNavigation``` by clicking Push to evaluation.
- ```startCreateNewFileFlow``` by clicking Create new file.

There is also the ```FilesContainer``` component, which allows the user to navigate through the diferent files of the project.

Let's start by the Save and run button:

```javascript
saveProject = () => {
  this.saveStat({event: 'save-and-run', metadata: {action: 'click'}})
  // Raw string is the default if no format is provided
  const newBlobs = this.updateProjectBlobs();
  const _this = this;
  Promise.all(
    newBlobs.map(item => this.uploadBlogToFirebase(item))
  )
  .then((url) => {
    _this.setState((prevState, props) => {
      const proyectPath = prevState.proyectPath + ' ';
      const projectFiles = prevState.projectFiles;
      if(projectFiles[prevState.selectedFile].unSavedContent !== undefined) {
        projectFiles[prevState.selectedFile].content =  projectFiles[prevState.selectedFile].unSavedContent;
      }
      return {projectFiles, proyectPath};
    });
  })
  .catch((error) => {
    console.log(`Some failed: `, error.message)
  });
}
```

First, the function will save and stat on the db. Then we obtain the blobs of the modified files in the project using the ```uploadBlogToFirebase``` function: 

```javascript
updateProjectBlobs = () => {
  let newBlobs = [];
  for(const fileName in this.state.projectFiles){
    if(this.state.projectFiles[fileName].didChange){
      const path = `${this.state.user.uid}/${this.state.projectName}/${fileName}`
      const newContent = this.state.projectFiles[fileName].unSavedContent;
      const updatedBlob = new Blob([newContent], {
          type: this.state.projectFiles[fileName].blob.type
      });
      newBlobs.push({path: path, blob: updatedBlob});
    }
  }
  return newBlobs;
}
```

This function will take the modified file from the state of the component and then will compose an array of objects, each one with the updated blob and the path of each file.

Right after that we update the firebase storage usign ```uploadBlogToFirebase```:

```javascript
uploadBlogToFirebase = (blob) => {
  const indexRef = storageRef.child(blob.path);
  return indexRef.put(blob.blob).then(function(snapshot) {
  }).catch(function(error) {
      console.error("Error updating documents: ", error);
  });
}
```

And to finish we update the state of the component, reseting the updated blobs and forcing the iframe to reload the preview:

```javascript
.then((url) => {
  _this.setState((prevState, props) => {
    const proyectPath = prevState.proyectPath + ' ';
    const projectFiles = prevState.projectFiles;
    if(projectFiles[prevState.selectedFile].unSavedContent !== undefined) {
      projectFiles[prevState.selectedFile].content =  projectFiles[prevState.selectedFile].unSavedContent;
    }
    return {projectFiles, proyectPath};
  });
})
```
---

The next one is ```startPushNavigation```, before a user can push the project to evaluation, a phase survey must be filled, we do this using ```sweetalert``` as we did on the ```hackSelection``` section, please check it out to understant how we detect changes on the modal.

We load the 

```javascript
startPushNavigation = () => {
  const _this = this;
  this.saveProject();
   swal(Constants.surveyRedirecAlertContent)
  .then((result) => {
    if(!result.dismiss) {
      swal(Constants.pushSurveyAlertContent(`${commitSurveys[_this.state.currentPhase]}?email=${_this.state.user.email}&user_id=${_this.state.user.uid}`))
      .then((result) => {
        if(!result.dismiss) {
          swal(Constants.commitContentAlertContent)
          .then((result) => {
            const { value } = result;
            if (value) {
              this.pushToGitHub(value)
              swal(Constants.loadingAlertContent)
              .then((result) => {
                swal(Constants.onSuccessAlertContent)
              })
            };
          });
        }
      });
    };
  }); 
}
```

Once the user finish the survey, we ask him for a commit message, and then we call ```pushToGithub``` using the messagge as parameter.

```javascript
pushToGitHub = (commitMessage) => {
  const composedCommitMessage = commitMessage;
  const files = [];
  for (const key in this.state.projectFiles) {
    files.push({name: key, content: this.state.projectFiles[key].content})
  }
  let projectName = this.state.user.isAdmin ? 
    `admin-${this.state.user.uid}-${this.state.projectName}` : 
    `${this.state.currentHack}-${this.state.user.uid}-${this.state.projectName}`;
  const commitToGitHub = window.firebase.functions().httpsCallable('commitToGitHub');
  commitToGitHub({name: projectName, files:files, commitMessage: composedCommitMessage})
  .then((result) => {
    if(result.status === 500){
      console.error(result.error);
    }else{
      swal.clickConfirm();
    }
  })
}
```

Here we build the name of the repo, if is a user, we will use the current hack as prefix, if is an admin, we just use the userID. Then we call the ```commitToGitHub``` cloud function to finish the job. Check the backend repo to understand how it works.

---

The last button calls ```startCreateNewFileFlow```:

```javascript
startCreateNewFileFlow = async () => {
  this.saveProject();
  const {value: filePath} = await swal(Constants.createNewFileFlowAlertContent(this.fileNameValidator));
  if(filePath) {
    const file = this.createNewFile(filePath);
    this.putStorageFile(file, this.state.projectName);
  }
}
```

This will promt a ```sweetalert``` modal asking for the path of the file, we send the ```fileNameValidator``` function as a parameter to verify the path introduced is a valid one:

```javascript
fileNameValidator = (fileName) => {
  if (fileName) {
    const name = fileName.toLowerCase();
    const splitedFileName = name.split('/')
    if (splitedFileName.includes('file') || splitedFileName.includes('folder')) {
      return true && '"File" or "folder" are not valid names.';
    }
    if (this.state.projectFiles.hasOwnProperty(fileName)) {
      return true && 'File already exists.'
    }
    return false;
  } else {
    return !fileName && 'You need to write something!'
  }
}
```
Here we just check if the file already exist, we also set the words 'file' and 'folder' as not valid ones.

If the path is valid, we proceed with the file creation calling ```createNewFile```:

```javascript
createNewFile = (filePath) => {
  const splitedPath = filePath.split('/')
  const newFile = {
    name: splitedPath[splitedPath.length - 1],
    path: filePath,
    blob: new Blob([`${splitedPath[splitedPath.length - 1]} create by: ${this.state.user.displayName}`], {type: this.getMIME(splitedPath[splitedPath.length - 1])}),
  };
  return newFile;
}
```

The function will pop the file name from the path and create a new blob. The content of the blob is just the name of the file and the author, we match the extention of the file to determine the MIME type using ```getMIME```.

Once the file object is created, we return it and continue with the file creation process, the last step is to put the file into the Firebase storage, we do this using ```putStorageFile``` this is the same function we used on the registration process, you can check it out there.

---

Now we can talk about the files container:

#### Files container
*On: ./src/js/component/projectEditor/filesContainer.js*

```jsx
<FilesContainer files={this.state.projectFiles}
  onFileSelection={this.onFileSelection}
  selectedFile={this.state.selectedFile}
  projectName={this.state.projectName.toUpperCase()}
/>
```

The files container is our implementation of the [```react-treebeard```](https://github.com/storybookjs/react-treebeard) component.
This component will take all the file paths on the project and build the treebeard object representation of them, we then send this representation to create the instance of the treebeard component:

```jsx
<MainContainer>
  <Treebeard className='component'
    data={this.state.data}
    decorators={decorators}
    onToggle={this.onToggle}
    style={TreeStyles}
  />
</MainContainer>
```

We create our own styles and decorators, check the source file to understant them.

### The Text Editor

```jsx
<EditorContainer large={this.state.hidePreview}>
  {!this.state.loadingFiles && <Editor
    key={this.state.editorKey}
    value={this.state.projectFiles[this.state.selectedFile].content}
    options={{
        lineNumbers: true,
        mode: this.state.editorMode,
        lint: true,
        gutters: [
         'CodeMirror-lint-markers',
       ],
        theme: 'material',
        tabSize: 2,
        lineWrapping: true,
        matchBrackets: true,
        matchTags: true,
        autoCloseTags: true,
        autoCloseBrackets: true,
        readOnly: this.state.readOnly,
    }}
    onChange={this.onChangeEditor}
  />}
</EditorContainer>
```

The text editor is an implementation of the [```react-codemirror2```](https://github.com/scniro/react-codemirror2) component, please check their docs to understant how the component works.

### The Preview
*On ./src/js/components/projectEditor/projectPreview.js*

```jsx
<PreviewContainer hidden={this.props.hidden}>
  <div className="iframe-header">
    <button onClick={this.reloadFrame}>
      <img src={ReloadIcon} alt='reload-icon'/>
    </button>
    <input defaultValue={`www.ironhacks.com/projectEditor/${this.state.projectName}/preview`} readOnly />
    <a 
      href={this.state.projectURL}
      target='_blank'
      onClick={this.openInANewTab}
      >
      <img src={NewTabIcon} alt='reload-icon'/>
    </a>
  </div>
  <div className="smooth-borders">
    {this.props.projectURL && <iframe src={this.props.projectURL} title='The Project Preview'/>}
  </div>
</PreviewContainer>
```

The preview component is a simple presentational component that shows an Iframe pointing to the project preview URL, we handle that preview on the backend, serving all the files for a given project through cloud functions. Please check the backend repo to understand how we achieve that result. 

We update the preview iframe by adding an empty space on the url.

---

