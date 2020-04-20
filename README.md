## spfx-covid-stats

This is sample SPFx React based webpart to show covid 19 data...
This is just for demostration usage of React Concept like

1. Calling External API(other than SharePoint)
2. Creating custom React component
3. Calling one or more component from a component
4. Conditional rendering of component/html elements.
5. Usage of Office UI fabric controls
6. Render Props Technique to pass data from child from parent.


Webpart uses public api avaialble at Rapid API to get covid-19 stat data

https://rapidapi.com/Gramzivi/api/covid-19-data  - Global

https://rapidapi.com/axisbits-axisbits-default/api/covid-19-statistics - Country data

To get data, you need to create acccount in rapidapi.com webpsite and subscribed to above 2 API(freemium).

Replace x-rapidapi-key for each Global and Country in Serviceprovider.ts file


### Building the code

```bash
git clone the repo
npm i
npm i -g gulp
gulp
```

This package produces the following:

* lib/* - intermediate-stage commonjs build artifacts
* dist/* - the bundled script, along with other resources
* deploy/* - all resources which should be uploaded to a CDN.

### Build options

gulp clean - TODO
gulp test - TODO
gulp serve - TODO
gulp bundle - TODO
gulp package-solution - TODO
