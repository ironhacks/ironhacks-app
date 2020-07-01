import * as Colors from './colors';


export const personalFeddbackTheme = {
  technology: {
    backgroundColor: '#9AC247',
    lightBackgroundColor: '#d3e4af',
  },
  analytics: {
    backgroundColor: '#40AA69',
    lightBackgroundColor: '#9acf93',
  },
  visualization: {
    backgroundColor: '#018B7D',
    lightBackgroundColor: '#7ac2ba',
  },
};


export const LoaderTheme = {
  loaderFrontColor: Colors.mainBgColor,
  loaderFrontColorDark: '#212529',
  loaderBackgroundColor: '#C7C3B7',
  sectionBackgroundColor: '#EEEDE9',
};


export const LandingTheme = {
  containerHeight: '100vh',
  backgroundColor: Colors.mainBgColor,
  textColor: 'black',
};

export const HeaderStyle = {
  height: '50px',
  backgroundColor: Colors.mainBgColor,
  color: Colors.mainTextColor,
};

export const FooterTheme = {
  containerHeight: '50px',
  backgroundColor: Colors.mainBgColor,
  textColor: Colors.mainTextColor,
  hoverTextColor: Colors.highlightedTextColor,
};

export const SectionStyles = {
  minHeight: 'calc(100vh - ' + HeaderStyle.height + ' - ' + FooterTheme.containerHeight + ')',
  backgroundColor: 'white',
  color: 'black',
};

export const AppSectionTheme = {
  containerHeight: 'calc(100vh - ' + HeaderStyle.height + ' - ' + FooterTheme.containerHeight + ')',
  backgroundColor: 'white',
  textColor: 'black',
  hoverTextColor: Colors.highlightedTextColor,
};

export const LoginTheme = {
  containerHeight: '100vh;',
  backgroundColor: 'white',
  textColor: 'black',
};

export const ThreadPreviewTheme = {
  backgroundColor: Colors.threadPreviewBgColor,
  highlightedTextBgColor: Colors.threadPreviewHighlightedBgColor,
  separatorBgColor: '#808080',
  containerHeight: '110px',
};

export const CommentViewTheme = {
  backgroundColor: Colors.threadPreviewBgColor,
  highlightedTextBgColor: Colors.threadPreviewHighlightedBgColor,
  separatorBgColor: '#808080',
  containerHeight: 'auto',
};

export const ReactionsViewTheme = {
  backgroundColor: '#E6E6E6',
};

export const SponsorBannerTheme = {
  backgroundColor: 'white',
  containerHeight: '125px',
};

export const QuizViewStyles = {
  backgroundColor: 'white',
  containerHeight: '125px',
};

export const Error404Theme = {
  containerHeight: '100vh;',
  backgroundColor: 'white',
  textColor: 'black',
};
