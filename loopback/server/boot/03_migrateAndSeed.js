'use strict';

module.exports = function(app) {
  /*
   * The `app` object provides access to a variety of LoopBack resources such as
   * models (e.g. `app.models.YourModelName`) or data sources (e.g.
   * `app.datasources.YourDataSource`). See
   * https://loopback.io/doc/en/lb3/Working-with-LoopBack-objects.html
   * for more info.
   */

  // Seed
  var seedUsers = function() {
    var Role = app.models.Role;
    var RoleMapping = app.models.RoleMapping;
    var usuarios = app.models.Usuario;
    // Seed Admin
    usuarios.find({
      where:{
        username: "templateAdmin"
      }
    }, function(err, user) {
      if (err) throw err;
      // if user doesn't exists
      if(user.length == 0){
        usuarios.create({
          realm: "Admintrator",
          username: "templateAdmin",
          password: "j4r4b3s0",
          email: "admin@test.com",
          emailVerified: true
        },
        function(err, user) {
          if (err) throw err;
          if(user){
            console.log("created User: "+user.username);
            //create the admin role
            Role.find({
              where:{
                name: "Admin"
              }
            }, function(err, res) {
              if (err) throw err;
              // If user doesn't exist
              if(res.length == 0){
                // create it
                Role.create({
                  name: "Admin",
                  description: 'platform administrator'
                }, function(err, role) {
                  // assing role to admin user
                  if (err) throw err;
                  console.log('Created role:', role.name);
                  role.principals.create({
                    principalType: RoleMapping.USER,
                    principalId: user.id
                  }, function(err, principal) {
                    if (err) throw err;
                    console.log('Assinged Admin role to user: templateAdmin');
                    console.log("Seeding Admin complete.");
                  });
                });
                // If exist asing role to admin user
              }else if(res[0].name == "Admin"){
                var role = res[0];
                role.principals.create({
                  principalType: RoleMapping.USER,
                  principalId: user.id
                }, function(err, principal) {
                  if (err) throw err;
                  console.log('Assinged Admin role to user: templateAdmin');
                  console.log("Seeding Admin complete.");
                });
              }
            })
          }
        })
      } else
        console.log("Seeding Admin complete.");
    }) 
    // Seer Simple User
    usuarios.find({
      where:{
        username: "templateUser"
      }
    }, function(err, user) {
      if (err) throw err;
      // if user doesn't exists
      if(user.length == 0){
        usuarios.create({
          realm: "Simple User",
          username: "templateUser",
          password: "j4r4b3s0",
          email: "user@test.com",
          emailVerified: true
        },
        function(err, user) {
          if (err) throw err;
          if(user){
            console.log("created User: "+user.username);
            //create the admin role
            Role.find({
              where:{
                name: "User"
              }
            }, function(err, res) {
              if (err) throw err;
              // If user doesn't exist
              if(res.length == 0){
                // create it
                Role.create({
                  name: "User",
                  description: 'platform user'
                }, function(err, role) {
                  // assing role to admin user
                  if (err) throw err;
                  console.log('Created role:', role.name);
                  role.principals.create({
                    principalType: RoleMapping.USER,
                    principalId: user.id
                  }, function(err, principal) {
                    if (err) throw err;
                    console.log('Assinged User role to user: templateUser');
                    console.log("Seeding User complete.");
                  });
                });
                // If exist asing role to admin user
              }else if(res[0].name == "User"){
                var role = res[0];
                role.principals.create({
                  principalType: RoleMapping.USER,
                  principalId: user.id
                }, function(err, principal) {
                  if (err) throw err;
                  console.log('Assinged User role to user: templateUser');
                  console.log("Seeding User complete.");
                });
              }
            })
          }
        })
      } else
        console.log("Seeding User complete.");
    }) 
  }

  var seedRoles = function () {
    var appRoles = [
      {
        name: "User",
        description: 'platform user'
      },
      {
        name: "Admin",
        description: 'platform administrator'
      }
    ]

    // console.log("Seeding Model: Role");
    sequentialSeed(appRoles, "name", app.models.Role);  
  }

  var seedUploadContainers = function(){
    var Upload = app.models.Upload;
    var containers = [
      {
        name: "profileImages"
      }
    ]

    var sequentialConteinerSeed = function(containers, uploadAppModel){
      if(containers.length == 0){
        console.log("Seeded Model: ",uploadAppModel.modelName);
        return;
      }
      let container = containers[0];
      uploadAppModel.getContainer(container.name, function(err, cont){
        containers.shift();
        if(err){
          if (err.code == "ENOENT"){
            uploadAppModel.createContainer(container, function(err, cont){
              if (err) throw err;
              if(cont)
                console.log("Created  "+uploadAppModel.modelName+": ",container.name)
              else
                console.log("Could not create  "+appModel.modelName+": ",container.name)

              sequentialConteinerSeed(containers, uploadAppModel);
            })
          }else
            throw err
        }else{
          sequentialConteinerSeed(containers, uploadAppModel);
        }
      })
    }

    sequentialConteinerSeed(containers, Upload);
  }

  var sequentialSeed = function (modelsSeedsArray, key, appModel){
    if(modelsSeedsArray.length == 0){
      console.log("Seeded Model: ",appModel.modelName);
      return;
    }
    var modelSeed = modelsSeedsArray[0];
    var query = {};
    query["where"] = {};
    query["where"][key] = modelSeed[key];

    // Find seed object
    appModel.find(query, function(err, res){
        if (err) throw err;

        // Remove actual seed model from array
        modelsSeedsArray.shift();
        // If seed object is not created
        if (res.length == 0) {
          appModel.create(modelSeed, function(err, res){
            if (err) throw err;

            if(res)
              console.log("Created  "+appModel.modelName+": ",modelSeed[key])
            else
              console.log("Could not create  "+appModel.modelName+": ",modelSeed[key])

            // pass to next modelSeed
            sequentialSeed(modelsSeedsArray, key, appModel)
          });
        }else{
          // pass to next modelSeed
          sequentialSeed(modelsSeedsArray, key, appModel)
        }
      });
  }

  var Seeders = [
    seedUsers,
    seedRoles,
    seedUploadContainers
  ]

  // Migrate
  var migrateAndUpdate = function () {
    // set datdsource listeners to prevent memory leaks
    const numModels = Object.keys(app.models).length
    for (let dataSource of Object.values(app.dataSources)) {
      dataSource.setMaxListeners(numModels)
    }
    // get database to seed
    var db = app.dataSources.mysqlDev;
    var appModels = Object.keys(db.connector._models)
    // check if database is up to date with models
    db.isActual(appModels, function (err, actual) {
      if (!actual) {
        db.autoupdate(appModels, function (err, result) {
          if (err) throw err;
          console.log("Updated Models: " + appModels.join() + " Seeding...")
          Seeders.forEach(seeder => seeder())
        });
      } else {
        console.log("Already Up to date, Seeding...")
        Seeders.forEach(seeder => seeder())
      }
    });
  }

  migrateAndUpdate()
};
