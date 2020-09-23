import AdminHackPage from './admin-hack-page';
import AdminHackSelectPage from './admin-hack-select-page';
import AdminNewHackPage from './admin-new-hack-page';
import AdminUtilsPage from './admin-utils-page';
import HackPage from './hack-page';
import HackSelectPage from './hack-select-page';
import HomePage from './home-page';
import HubPage from './hub-page';
import LoginPage from './login-page';
import LogoutPage from './logout-page';
import NotebookViewer from './notebook-page';
import ProfileEditPage from './profile-edit-page';
import ProfilePage from './profile-page';
import ShowcasePage from './showcase-page';
import UpcomingHackPage from './covid19-hack-page';

const Pages = {
  AdminNewHack: AdminNewHackPage,
  AdminHack: AdminHackPage,
  AdminHackSelect: AdminHackSelectPage,
  AdminUtils: AdminUtilsPage,
  Hack: HackPage,
  HackSelect: HackSelectPage,
  Home: HomePage,
  Hub: HubPage,
  Notebook: NotebookViewer,
  Login: LoginPage,
  Logout: LogoutPage,
  ProfileEdit: ProfileEditPage,
  Profile: ProfilePage,
  Showcase: ShowcasePage,
  UpcomingHack: UpcomingHackPage,
};

export { Pages }
