Resume: Bob Yexley
==================

<a rel="license" href="http://creativecommons.org/licenses/by-nc-sa/4.0/"><img alt="Creative Commons License" style="border-width:0" src="https://i.creativecommons.org/l/by-nc-sa/4.0/88x31.png" /></a><br /><span xmlns:dct="http://purl.org/dc/terms/" property="dct:title">Resume</span> by <a xmlns:cc="http://creativecommons.org/ns#" href="http://bob.yexley.net" property="cc:attributionName" rel="cc:attributionURL">Bob Yexley</a> is licensed under a <a rel="license" href="http://creativecommons.org/licenses/by-nc-sa/4.0/">Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License</a>.

### Editing

```
npm run edit
```

Starts BrowserSync on port `7001` and runs `gulp watch`. Navigate to [http://localhost:7001](http://localhost:7001).

* Edit the following files to make updates:
  * Content: `src/resume.json` and `src/resume.enhancements.json` are merged together into a single JSON object which is fed to the main Handlebars layout file, `src/templates/resume-template.html`
  * Templates: `src/templates` - the Handlebars/HTML templates the Resume HTML is built from
  * CSS: `src/css` - modularized CSS structure is processed by PostCSS and generated to `assets/css`
  * JS: `assets/js/main.js` - the lone JS module that drives the rendered resume HTML in the browser
* Any change to any template or either of the content files will trigger a re-generation of `index.html` in the root, which is the rendered, resume output HTML
* Any changes to `index.html`, `assets/**/*.css` or `assets/**/*.js` will trigger a refresh of the browser via BrowserSync.
