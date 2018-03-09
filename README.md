# Radar 

Criado com Telegram


## Technical details

The app is based on the AngularJS JavaScript framework, and written in pure JavaScript. jQuery is used for DOM manipulations, and Bootstrap as the CSS-framework.


### Running locally


The project repository is based on angularjs-seed and includes gulp tasks, so it's easy to launch the app locally on your desktop.
Install [node.js](http://nodejs.org/) and run the following commands in the project directory

```
sudo npm install -g gulp
npm install
```

This will install all the needed dependencies.


#### Running web-server


Just run `gulp watch` to start the web server and the livereload task.
Open http://localhost:8000/app/index.html in your browser.

#### Running as Chrome Packaged App

To run this application in Google Chrome as a packaged app, open this URL (in Chrome): `chrome://extensions/`, then tick "Developer mode" and press "Load unpacked extension...". Select the downloaded `app` folder and Webogram should appear in the list.

Run `gulp watch` to watch for file changes and automatically rebuild the app.


#### Running as Firefox OS App

To run this application in Firefox as a packaged app, open "Menu" -> "Developer" -> "WebIDE" (or hit `Shift + F8`). Choose "Open packaged app" from the Project menu and select the `app` folder.

Run `gulp watch` to watch for file changes and automatically rebuild the app.

#### Running in production

Run `gulp clean`, then `gulp publish` to build the minimized production version of the app. Copy `dist` folder contents to your web server. Don't forget to set `X-Frame-Options SAMEORIGIN` header ([docs](https://developer.mozilla.org/en-US/docs/Web/HTTP/X-Frame-Options)).

### Third party libraries

Besides the frameworks mentioned above, other libraries are used for protocol and UI needs. Here is the short list:

* [JSBN](http://www-cs-students.stanford.edu/~tjw/jsbn/)
* [CryptoJS](https://code.google.com/p/crypto-js/)
* [zlib.js](https://github.com/imaya/zlib.js)
* [UI Bootstrap](http://angular-ui.github.io/bootstrap/)
* [jQuery Emojiarea](https://github.com/diy/jquery-emojiarea)
* [nanoScrollerJS](https://github.com/jamesflorentino/nanoScrollerJS)
* [gemoji](https://github.com/github/gemoji)
* [emoji-data](https://github.com/iamcal/emoji-data)

Many thanks to all these libraries' authors and contributors. A detailed list with descriptions and licenses is available [here](/app/vendor).

### [Contribute](CONTRIBUTING.md)
