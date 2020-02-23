import React, { useEffect } from 'react';
import ReactGA from 'react-ga';
import { useLocation } from 'react-router-dom';

/**
 * Initialize Google Analytics
 */
export const initGA = () => {
  ReactGA.initialize(process.env.REACT_APP_GA_TRACKING_ID || '', {
    debug: process.env.NODE_ENV === 'production' ? false : true
  });
};

interface EventArgs {
  /**
   * Required. A top level category for these events. E.g. 'User',
   * 'Navigation', 'App Editing', etc.
   */
  category: string;
  /**
   * Required. A description of the behaviour. E.g. 'Clicked Delete',
   * 'Added a component', 'Deleted account', etc.
   */
  action: string;
  /**
   * Optional. More precise labelling of the related action. E.g.
   * alongside the 'Added a component' action, we could add the name
   * of a component as the label. E.g. 'Survey', 'Heading', 'Button', etc.
   */
  label?: string;
  /**
   * Optional. A means of recording a numerical value against an event.
   * E.g. a rating, a score, etc.
   */
  value?: number;
  /**
   * Optional. If an event is not triggered by a user interaction, but
   * instead by our code (e.g. on page load, it should be flagged as a
   * nonInteraction event to avoid skewing bounce rate data.
   */
  nonInteraction?: boolean;
}

/**
 * Track events
 *
 * @param EventArgs Event arguments
 */
export const trackEvent = (args: EventArgs) => {
  ReactGA.event(args);
};

interface ExceptionArgs {
  /**
   * Optional. Description of what happened.
   */
  description?: string;
  /**
   * Optional. Set to true if it was a fatal exception.
   */
  fatal?: boolean;
}

/**
 * Track exceptions
 *
 * @param EventArgs Exception arguments
 */
export const trackException = (args: ExceptionArgs) => {
  ReactGA.exception(args);
};

/**
 * Track page view
 *
 * @param path Path of the page
 * @param title Title of the page
 */
export const trackPageView = (path: string, title: string) => {
  ReactGA.pageview(path, [], title);
};

/**
 * Track the location of a page with this HOC
 *
 * @param WrappedComponent Component to be wrapped
 */
export const withTracker = (WrappedComponent: React.FC) => {
  return (props: any) => {
    const { pathname } = useLocation();

    useEffect(() => {
      trackPageView(pathname, document.title);
    }, [pathname]);

    return <WrappedComponent {...props} />;
  };
};
