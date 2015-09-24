var React = require('react');
var i18n = require('i18next-client');

var Home = React.createClass({
  render: function(){
    var txt = i18n.t('home_sample');
    return (
      <div className="container">
        <div className="row">
          {txt}<br/>
          {i18n.t('home_sample2')}
        </div>
        <div className="row">
          Features:
          <ul>
            <li>Full React-Flux application, with React Components &gt; Actions &gt; Dispatcher &gt; Stores &gt; Components flux.</li>
            <li>Sample Server interaction, with Server Mocking.</li>
            <li>Gulp build/watch; Service on BrowserSync.</li>
            <li>Jasmine Unit Tests.</li>
          </ul>
        </div>
        <div className="row">
          Technologies:
          <ul>
            <li>ReactJS, Flux, React-Router</li>
            <li>superagent for Server interaction, with superagent-mock.</li>
            <li>i18next-client for internationalization.</li>
            <li>Gulp -- browserify, reactify, vinyl-source-stream.</li>
            <li>Runs from dist/ with BrowserSync.</li>
            <li>Jasmine for Unit Tests.</li>
            <li>Karma with rewirify and babelify preprocessing as test runner, phantomJS browser.</li>
          </ul>
        </div>
      </div>
    )
  }
});

module.exports = Home;
