import { Header } from './header'
import { Footer } from './footer'
import {Helmet} from 'react-helmet';

const Content = (
  {
    children,
  },
) => {
  return (
    <main className={'main'}>
      {children}
    </main>
  );
};


const Page = ({
  children,
  pageDescription,
  pageTitle,
  pageUrl,
  pageClass,
  pageFooter,
  user,
  userIsAdmin,
}) => {
  const classes = ['page', pageClass].join(' ').trim();
  const displayName = user.displayName || 'IH';
  return (
    <>
      {pageTitle && (
        <Helmet>
          <title>{pageTitle}</title>
          <meta property="og:title" content={pageTitle} />
          {pageDescription && ( <meta name="description" content={pageDescription} /> )}
          {pageDescription && ( <meta property="og:description" content={pageDescription} /> )}
          {pageUrl && ( <link rel="canonical" href={pageUrl} /> )}
        </Helmet>
      )}
      <Header
        user={user}
        displayName={displayName}
        isAdmin={userIsAdmin}
      />
      <Content>
        <div className={classes}>
          {children}
        </div>
      </Content>
      {pageFooter && (
        <Footer />
      )}
    </>
  )
}

Page.defaultProps = {
  pageClass: '',
  pageFooter: false,
  isAdmin: false,
  displayName: '',
  user: {},
  pageTitle: '',
  pageDescription: '',
  pageUrl: '',
}


const BlankPage = ({ pageClass, children, pageTitle, pageDescription, pageUrl }) => {
  const classes = ['page', pageClass].join(' ').trim();
  return (
    <>
      {pageTitle && (
        <Helmet>
          <title>{pageTitle}</title>
          <meta property="og:title" content={pageTitle} />
          {pageDescription && ( <meta property="og:description" content={pageDescription} /> )}
          {pageUrl && ( <link rel="canonical" href={pageUrl} /> )}
        </Helmet>
      )}
      <Content>
        <div className={classes}>
          {children}
        </div>
      </Content>
    </>
  )
}

BlankPage.defaultProps = {
  pageClass: '',
  pageTitle: '',
  pageDescription: '',
  pageUrl: '',
}


const LandingPage = ({ pageClass, children, pageTitle, pageDescription, pageUrl }) => {
  const classes = ['page', pageClass].join(' ').trim();
  return (
    <>
      {pageTitle && (
        <Helmet>
          <title>{pageTitle}</title>
          <meta property="og:title" content={pageTitle} />
          {pageDescription && ( <meta property="og:description" content={pageDescription} /> )}
          {pageUrl && ( <link rel="canonical" href={pageUrl} /> )}
        </Helmet>
      )}
      <Content>
        <div className={classes}>
          {children}
        </div>
      </Content>
      <Footer footerClass="bg-grey-dk4 cl-grey-lt1" />
    </>
  )
}


LandingPage.defaultProps = {
  pageClass: '',
  pageTitle: '',
  pageDescription: '',
  pageUrl: '',
}

export { Page, BlankPage, LandingPage }
