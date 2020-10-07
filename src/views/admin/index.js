import AdminHackExtensions from './admin-hack-extensions';
import AdminHackForum from './admin-hack-forum';
import AdminHackOverview from './admin-hack-overview';
import AdminHackRules from './admin-hack-rules';
import AdminHackRegistration from './admin-hack-registration';
import AdminHackResults from './admin-hack-results';
import AdminHackSettings from './admin-hack-settings';
import AdminHackSubmissions from './admin-hack-submissions';
import AdminHackSubmissionEdit from './admin-hack-submission-edit';
import AdminHackTask from './admin-hack-task';
import AdminHackTutorial from './admin-hack-tutorial';
import { AdminUtilsUsers } from './admin-utils-users';
import { AdminUtilsMetrics } from './admin-utils-metrics';


const AdminHack = {
  Forum: AdminHackForum,
  Extensions: AdminHackExtensions,
  Overview: AdminHackOverview,
  Registration: AdminHackRegistration,
  Results: AdminHackResults,
  Rules: AdminHackRules,
  Settings: AdminHackSettings,
  Submissions: AdminHackSubmissions,
  SubmissionEdit: AdminHackSubmissionEdit,
  Task: AdminHackTask,
  Tutorial: AdminHackTutorial,
}


const AdminUtils = {
  Users: AdminUtilsUsers,
  Metrics: AdminUtilsMetrics,
}

export { AdminHack, AdminUtils }
