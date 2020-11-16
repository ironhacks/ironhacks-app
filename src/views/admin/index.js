import AdminHackCohorts from './admin-hack-cohorts';
import AdminHackExtensions from './admin-hack-extensions';
import AdminHackForum from './admin-hack-forum';
import AdminHackOverview from './admin-hack-overview';
import AdminHackRegistration from './admin-hack-registration';
import AdminHackResults from './admin-hack-results';
import AdminHackResultsEditor from './admin-hack-results-editor';
import AdminHackRules from './admin-hack-rules';
import AdminHackSettings from './admin-hack-settings';
import AdminHackSubmissionEdit from './admin-hack-submission-edit';
import AdminHackSubmissionNew from './admin-hack-submission-new';
import AdminHackSubmissions from './admin-hack-submissions';
import AdminHackTaskEdit from './admin-hack-task-edit';
import AdminHackTaskNew from './admin-hack-task-new';
import AdminHackTasks from './admin-hack-tasks';
import AdminHackTutorials from './admin-hack-tutorials';
import AdminHackTutorialNew from './admin-hack-tutorial-new';
import AdminHackTutorialEdit from './admin-hack-tutorial-edit';
import { AdminUtilsMetrics } from './admin-utils-metrics';
import { AdminUtilsUsers } from './admin-utils-users';


const AdminHack = {
  Cohorts: AdminHackCohorts,
  Extensions: AdminHackExtensions,
  Forum: AdminHackForum,
  Overview: AdminHackOverview,
  Registration: AdminHackRegistration,
  Results: AdminHackResults,
  ResultsEditor: AdminHackResultsEditor,
  Rules: AdminHackRules,
  Settings: AdminHackSettings,
  SubmissionEdit: AdminHackSubmissionEdit,
  SubmissionNew: AdminHackSubmissionNew,
  Submissions: AdminHackSubmissions,
  TaskEdit: AdminHackTaskEdit,
  TaskNew: AdminHackTaskNew,
  Tasks: AdminHackTasks,
  Tutorials: AdminHackTutorials,
  TutorialEdit: AdminHackTutorialEdit,
  TutorialNew: AdminHackTutorialNew,
}


const AdminUtils = {
  Users: AdminUtilsUsers,
  Metrics: AdminUtilsMetrics,
}

export { AdminHack, AdminUtils }
