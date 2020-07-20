import AdminHackExtensions from './admin-hack-extensions';
import AdminHackForum from './admin-hack-forum';
import AdminHackOverview from './admin-hack-overview';
import AdminHackRules from './admin-hack-rules';
import AdminHackSettings from './admin-hack-settings';
import AdminHackSubmissions from './admin-hack-submissions';
import AdminHackSurveys from './admin-hack-surveys';
import AdminHackTask from './admin-hack-task';
import AdminHackTutorial from './admin-hack-tutorial';


const AdminHack = {
  Forum: AdminHackForum,
  Extensions: AdminHackExtensions,
  Overview: AdminHackOverview,
  Rules: AdminHackRules,
  Settings: AdminHackSettings,
  Submissions: AdminHackSubmissions,
  Surveys: AdminHackSurveys,
  Task: AdminHackTask,
  Tutorial: AdminHackTutorial,
}

export { AdminHack }
