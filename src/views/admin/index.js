import AdminHackCohorts from './admin-hack-cohorts';
import AdminHackExtensions from './admin-hack-extensions';
import AdminHackForum from './admin-hack-forum';
import AdminHackOverview from './admin-hack-overview';
import AdminHackRegistration from './admin-hack-registration';
import AdminHackResults from './admin-hack-results';
import AdminHackRules from './admin-hack-rules';
import AdminHackSettings from './admin-hack-settings';
import AdminHackSubmissionEdit from './admin-hack-submission-edit';
import AdminHackSubmissions from './admin-hack-submissions';
import AdminHackTaskEdit from './admin-hack-task-edit';
import AdminHackTaskNew from './admin-hack-task-new';
import AdminHackTasks from './admin-hack-tasks';
import AdminHackTutorial from './admin-hack-tutorial';
import { AdminUtilsMetrics } from './admin-utils-metrics';
import { AdminUtilsUsers } from './admin-utils-users';


const AdminHack = {
  Cohorts: AdminHackCohorts,
  Extensions: AdminHackExtensions,
  Forum: AdminHackForum,
  Overview: AdminHackOverview,
  Registration: AdminHackRegistration,
  Results: AdminHackResults,
  Rules: AdminHackRules,
  Settings: AdminHackSettings,
  SubmissionEdit: AdminHackSubmissionEdit,
  Submissions: AdminHackSubmissions,
  TaskEdit: AdminHackTaskEdit,
  TaskNew: AdminHackTaskNew,
  Tasks: AdminHackTasks,
  Tutorial: AdminHackTutorial,
}


const AdminUtils = {
  Users: AdminUtilsUsers,
  Metrics: AdminUtilsMetrics,
}

export { AdminHack, AdminUtils }
