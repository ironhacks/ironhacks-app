//CSS color constants
export const mainBgColor = '#FFCE35';
export const mainTextColor = 'black';
export const invertedTextColor = 'white';
export const highlightedTextColor = 'white';

export const universalBorderRadius = "4px";

//LANDING
export const LandingTheme  = {
  containerHeight: "100vh",
  backgroundColor: mainBgColor,
  textColor: "black",
}

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

//FORUM
export const forumHeaderColor = "#D2DDC9";
export const threadPreviewBgColor = "#FEF8ED";
export const threadPreviewBottomMargin = "5px";

export const ThreadPreviewTheme = {
  backgroundColor: threadPreviewBgColor,
  separatorBgColor: '#808080',
  containerHeight: "110px",
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