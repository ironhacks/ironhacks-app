import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom';

import { PageNotFound } from '../views/default/404';
import HomePage from '../views/home';
import ThreadViewWithRouter from '../views/forum/threadView/threadView';
import UserProfile from '../views/userProfile/user-profile';
import TutorialScreen from '../views/tutorial';
import Login from '../views/login';
import Admin from '../views/admin';
import AdminDashboard from '../views/admin/adminDashboard';
import Forum from '../views/forum/forum.js';
import HackSelectPage from '../views/hacks';
import NewHack from '../components/hacks/new-hack.js';
import NewThread from '../views/forum/newThread.js';
import ProjectEditor from  '../components/projectEditor/projectEditor.js';
import ProjectPreview from '../components/projectEditor/projectPreview.js';
import QuizForm from '../components/quizzes/quizForm.js';
import Quizzes from '../components/quizzes/quizzes.js';
import Task from '../views/task';
import Results from '../views/results';


const AppRoutes = [ {
    path: '/',
    component: HomePage
  }, {
    path: '404',
    component: PageNotFound
  }, {
    path: '/hacks',
    component: HackSelectPage
  }, {
    path: '/profile',
    component: UserProfile
  }, {
    path: '/tutorial',
    component: TutorialScreen
  }, {
    path: '/task',
    component: Task
  }, {
    path: '/login',
    component: Login
  }, {
    path: '/results',
    component: Results
  }, {
    path: '/quiz',
    component: QuizForm,
    routes: [{
        path: '/quiz/:quizName',
        component: QuizForm,
      }
    ]
  }, {
    path: '/forum',
    component: Forum,
    routes: [
      {
        path: '/forum/new',
        component: NewThread
      }, {
        path: '/forum/thread/:threadId',
        component: ThreadViewWithRouter
      }
    ]
  }, {
    path: '/admin',
    component: Admin,
    routes: [
      {
        path: '/admin/newHack',
        component: NewHack
      }, {
        path: '/admin/dashboard/:hackId',
        component: AdminDashboard
      }
    ]
  }, {
    path: '/project',
    component: ProjectEditor,
    routes: [
      {
        path: '/project/:projectid',
        component: ProjectEditor
      }, {
        path: '/project/:projectid/view',
        component: ProjectPreview
      },
    ]
  }
];


export { AppRoutes }
