import * as Styles from './styles';
import * as Colors from './colors';

const Themes = Object.create({});

Themes.personalFeddback = Styles.personalFeddbackTheme;
Themes.Loader = Styles.LoaderTheme;
Themes.Landing = Styles.LandingTheme;

Themes.HeaderTheme = {
  backgroundColor: Colors.mainBgColor,
  textColor: Colors.mainTextColor,
  hoverTextColor: Colors.highlightedTextColor,
};

Themes.Footer = Styles.FooterTheme;
Themes.Section = Styles.SectionStyles;
Themes.Login = Styles.LoginTheme;
Themes.adminInnerSections = Styles.adminInnerSectionsTheme;
Themes.ThreadPreview = Styles.ThreadPreviewTheme;
Themes.CommentView = Styles.CommentViewTheme;
Themes.ReactionsView = Styles.ReactionsViewTheme;
Themes.SponsorBanner = Styles.SponsorBannerTheme;
Themes.QuizViewS = Styles.QuizViewStyles;
Themes.Error404 = Styles.Error404Theme;

export { Themes }
