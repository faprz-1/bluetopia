'use strict';
const moment = require("moment");
const loopback = require("loopback");
const path = require("path");
module.exports = (app) => {
  console.log("app.dataSource")
  console.log(Object.keys(app.dataSource("germanMailDatasource",  
  {"name": "germanMailDatasource",
  "connector": "mail",
  "transports": [
    {
      "type": "smtp",
      "host": "mail.jarabesoft.com",
      "secure": true,
      "port": 465,
      "auth": {
        "user": "germancruz@jarabesoft.com",
        "pass": "Brokas0pro!"
      },
      "tls": {
        "rejectUnauthorized": false
      }
    }
  ]}
  )))
  console.table(Object.keys(app.dataSources))
   let ActionLogger=  app.registry.createModel(
      "germanMail"
   )
    app.model(ActionLogger,
      {
        "dataSource": "germanMailDatasource",
        "public": false
      }
      
    )

    var testEmail="german@jarabesoft.com"
    var params = {};
    params.title = "test title";
    params.message = "vamos a revisar si funciona esto!";

    var renderer = loopback.template(path.resolve(__dirname, '../emails/template-email.ejs'));
    var html_body = renderer(params);

    app.models.adminMail.CheckDomainAvailability(testEmail.split('@')[1], (err, domainValid) => {
      if (err) return console.log(err);
      if (domainValid) {
        app.models.germanMail.send({
          to: testEmail,
          from: 'germancruz@jarabesoft.com',
          subject: 'iniciando',
          html: html_body,
        }, function(err, res) {
          if (err) return console.log(err);

          return console.log(null, {msg: 'success'});
        });
      } else {
        return console.log('Dominio no valido');
      }
    });
};

