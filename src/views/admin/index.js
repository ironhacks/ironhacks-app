import AdminHackCohorts from './admin-hack-cohorts'
import AdminHackExtensions from './admin-hack-extensions'
import AdminHackForum from './admin-hack-forum'
import AdminHackInfoBanners from './admin-hack-info-banners'
import AdminHackInfoBannersEdit from './admin-hack-info-banners-edit'
import AdminHackOverview from './admin-hack-overview'
import AdminHackRegistration from './admin-hack-registration'
import AdminHackResults from './admin-hack-results'
import AdminHackResultsEditor from './admin-hack-results-editor'
import AdminHackRules from './admin-hack-rules'
import AdminHackSettings from './admin-hack-settings'
import AdminHackSubmissionEdit from './admin-hack-submission-edit'
import AdminHackSubmissionNew from './admin-hack-submission-new'
import AdminHackSubmissions from './admin-hack-submissions'
import AdminHackTaskEdit from './admin-hack-task-edit'
import AdminHackTaskNew from './admin-hack-task-new'
import AdminHackTasks from './admin-hack-tasks'
import AdminHackTutorialEdit from './admin-hack-tutorial-edit'
import AdminHackTutorialNew from './admin-hack-tutorial-new'
import AdminHackTutorials from './admin-hack-tutorials'
import AdminHackNoteEdit from './admin-hack-notes-edit'
import AdminHackNoteNew from './admin-hack-notes-new'
import AdminHackNotes from './admin-hack-notes'
import { AdminUtilsMetrics } from './admin-utils-metrics'
import { AdminUtilsUsers } from './admin-utils-users'

const AdminHack = {
  Cohorts: AdminHackCohorts,
  Extensions: AdminHackExtensions,
  Forum: AdminHackForum,
  InfoBanners: AdminHackInfoBanners,
  InfoBannersEdit: AdminHackInfoBannersEdit,
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
  TutorialEdit: AdminHackTutorialEdit,
  TutorialNew: AdminHackTutorialNew,
  Tutorials: AdminHackTutorials,
  NotesEdit: AdminHackNoteEdit,
  NotesNew: AdminHackNoteNew,
  Notes: AdminHackNotes,
}

const AdminUtils = {
  Users: AdminUtilsUsers,
  Metrics: AdminUtilsMetrics,
}

export { AdminHack, AdminUtils }
