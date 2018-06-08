'use strict';

var loopback = require('loopback');
var boot = require('loopback-boot');

var app = module.exports = loopback();

app.start = function() {
  // Migrate
  var db = app.dataSources.mysqlDev;
  var appModels = [
    'ACL', 
    'RoleMapping', 
    'Role', 
    'Usuario',
    'UsuarioAccessToken'
  ];
  db.isActual(appModels, function(err, actual) {
    if (!actual) {
      db.autoupdate(appModels, function(err) {
        if (err){
          throw (err);
        }
      });
    }
  });
  db.disconnect();
  console.log("Migrated: " + appModels.join());
  // start the web server
  return app.listen(function() {
    app.emit('started');
    var baseUrl = app.get('url').replace(/\/$/, '');
    console.log('Web server listening at: %s', baseUrl);
    if (app.get('loopback-component-explorer')) {
      var explorerPath = app.get('loopback-component-explorer').mountPath;
      console.log('Browse your REST API at %s%s', baseUrl, explorerPath);
    }
  });
};

// Bootstrap the application, configure models, datasources and middleware.
// Sub-apps like REST API are mounted via boot scripts.
boot(app, __dirname, function(err) {
  if (err) throw err;

  // start the server if `$ node server.js`
  if (require.main === module)
    app.start();
});
