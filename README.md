# Stormrose Hub HTML Frontend

This project repository contains all code of the Stormrose Hub HTML front end, i. e. graphics,
style sheets, HTML templates and corresponding libraries and dependencies.

## Development Process

The hub frontend is built using gulp and node-sass. The easiest way to get started is to follow these steps (make sure you have Node.js and npm installed and are in the checked out project root folder):


    npm install --only=prod
    npm install --only=dev
    gulp

This will launch the build process, of which the output may be found within the `dist` subfolder. Furthermore, running `gulp` will also launch a serve process, serving the files within `dist`, and open a browser displaying what's served by gulp.
