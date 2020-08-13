import AdminHackExtensions from './admin-hack-extensions';
import AdminHackForum from './admin-hack-forum';
import AdminHackOverview from './admin-hack-overview';
import AdminHackRules from './admin-hack-rules';
import AdminHackRegistration from './admin-hack-registration';
import AdminHackSettings from './admin-hack-settings';
import AdminHackSubmissions from './admin-hack-submissions';
import AdminHackSubmissionEdit from './admin-hack-submission-edit';
import AdminHackSurveys from './admin-hack-surveys';
import AdminHackTask from './admin-hack-task';
import AdminHackTutorial from './admin-hack-tutorial';


const AdminHack = {
  Forum: AdminHackForum,
  Extensions: AdminHackExtensions,
  Overview: AdminHackOverview,
  Registration: AdminHackRegistration,
  Rules: AdminHackRules,
  Settings: AdminHackSettings,
  Submissions: AdminHackSubmissions,
  SubmissionEdit: AdminHackSubmissionEdit,
  Surveys: AdminHackSurveys,
  Task: AdminHackTask,
  Tutorial: AdminHackTutorial,
}

export { AdminHack }
