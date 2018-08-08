//CSS color constants
export const mainBgColor = '#FFCE35';
export const mainTextColor = 'black';
export const invertedTextColor = 'white';
export const highlightedTextColor = 'white';

export const universalBorderRadious = "4px";

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
	// Header Container:
	containerHeight: "calc(100vh - " + HeaderTheme.containerHeight + " - " + FooterTheme.containerHeight + ")",
	backgroundColor: "white",
	textColor: "black",
	hoverTextColor: highlightedTextColor
}

//FORUM
export const forumHeaderColor = "#D2DDC9";
export const threadPreviewBgColor = "#FEF8ED";
export const threadPreviewBottomMargin = "5px";

export const ThreadPreviewTheme = {
	backgroundColor: threadPreviewBgColor,
	containerHeight: "200px",
}