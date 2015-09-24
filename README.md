# react-base
Skeleton ReactJS / Flux application base

Meetup ReactJS @ Anaplan, 24/09/2015
@author Philippe Martinou

Features:
    Full React-Flux application, with React Components > Actions > Dispatcher > Stores > Components flux.
    Sample Server interaction, with Server Mocking.
    Gulp build/watch; Service on BrowserSync.
    Jasmine Unit Tests.

Technologies:
    ReactJS, Flux, React-Router
    superagent for Server interaction, with superagent-mock.
    i18next-client for internationalization.
    Gulp -- browserify, reactify, vinyl-source-stream.
    Runs from dist/ with BrowserSync.
    Jasmine for Unit Tests.
    Karma with rewirify and babelify preprocessing as test runner, phantomJS browser.

Note: Do NOT take the React-Router usage as an example - it is not the latest version,
and is too basic for anything remotely like a real application.
