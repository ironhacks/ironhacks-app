//CSS color constants
export const mainBgColor = '#FFCE35';
export const buttonHighlightedBgColor = '#E6B92F'
export const mainTextColor = 'black';
export const invertedTextColor = 'white';
export const highlightedTextColor = 'white';
export const invertedHighlightedTextColor = 'black';

export const universalBorderRadius = "4px";

export const LoaderTheme = {
  loaderFrontColor: mainBgColor,
  loaderBackgroundColor: '#C7C3B7',
  sectionBackgroundColor: '#EEEDE9',
}
//LANDING
export const LandingTheme = {
  containerHeight: "100vh",
  backgroundColor: mainBgColor,
  textColor: "black",
};
//HEADER
export const HeaderTheme = {
  // Header Container:
  containerHeight: '50px',
  backgroundColor: mainBgColor,
  textColor: mainTextColor,
  hoverTextColor: highlightedTextColor
}
//FOOTER
export const FooterTheme = {
  // Header Container:
  containerHeight: '50px',
  backgroundColor: mainBgColor,
  textColor: mainTextColor,
  hoverTextColor: highlightedTextColor
}
//MAIN SECTION THEME
export const AppSectionTheme = {
  containerHeight: "calc(100vh - " + HeaderTheme.containerHeight + " - " + FooterTheme.containerHeight + ")",
  backgroundColor: "white",
  textColor: "black",
  hoverTextColor: highlightedTextColor
};
//LOGIN
export const LoginTheme = {
  containerHeight:'100vh;',
  backgroundColor: "white",
  textColor: "black"
};
//ADMIN
export const adminInnerSectionsTheme = {
  containerHeight: "100%",
  backgroundColor: "white",
  textColor: "black",
  hoverTextColor: highlightedTextColor
}
//FORUM
export const forumHeaderColor = '#D2DDC9';
export const threadPreviewBgColor = '#FEF8ED';
export const threadPreviewHighlightedBgColor = '#fff1c7';
export const threadPreviewBottomMargin = '5px';
export const commentViewBottomMargin = '5px';

export const ThreadPreviewTheme = {
  backgroundColor: threadPreviewBgColor,
  highlightedTextBgColor: threadPreviewHighlightedBgColor,
  separatorBgColor: '#808080',
  containerHeight: "110px",
}

export const CommentViewTheme = {
  backgroundColor: threadPreviewBgColor,
  highlightedTextBgColor: threadPreviewHighlightedBgColor,
  separatorBgColor: '#808080',
  containerHeight: 'auto',
}

export const ReactionsViewTheme = {
  backgroundColor: '#E6E6E6',
}

//Sponsor banner
export const SponsorBannerTheme = {
  backgroundColor: 'white',
  containerHeight: "125px",
}

//QUIZZES
export const QuizzesTheme = {
  backgroundColor: 'white',
  containerHeight: "125px",
}
// Error 404
export const Error404Theme = {
  containerHeight:'100vh;',
  backgroundColor: "white",
  textColor: "black"
}
//Proyect Editor
export const cloudFunctionsDevEndPoint = 'localhost:5000';
export const cloudFunctionsProdEndPoint = 'https://us-central1-ironhacks-platform-dev.cloudfunctions.net';