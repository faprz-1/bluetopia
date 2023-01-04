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
    var attemptNewUserWithRole = function(user, roleToAssing) {
      var RoleMapping = app.models.RoleMapping;
      var Role = app.models.Role;
      var Usuario = app.models.Usuario;

      Usuario.find({where:{ or: [{email:user.email}, {username: user.username}] } }, function(err, res){
        if (err) throw err;

        // If seed object is not created
        if (res.length == 0) {
          Usuario.create(user, function(err, newU){
            if (err) throw err;

            Role.findOne({where:{name: roleToAssing}}, function(err, role) {
              if (err) throw err;

              role.principals.create({
                  principalType: RoleMapping.USER,
                  principalId: newU.id
                }, function(err, principal) {
                  if (err) throw err;

                  console.log("Created User: ",newU.email,", with role: ", roleToAssing)
              })
            })
          })
        }
      })
    }

    var users = [
      {
        User: {
          name: "SuperUser",
          username: "SuperUser",
          password: "j4r4b3s0",
          email: "superuser@jarabepruebas.com",
          emailVerified: true,
          active: true
        },
        Role: "SuperUser"
      },
      {
        User: {
          name: "Admin",
          username: "Admin",
          password: "j4r4b3s0",
          email: "admin@jarabepruebas.com",
          emailVerified: true,
          active: true
        },
        Role: "Admin"
      }
    ]

    users.forEach(u => {
      attemptNewUserWithRole(u.User, u.Role);
    });
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
      },
      {
        name:"SuperUser",
        description: 'the most powerful user'
      },
      {
        name:"School",
        description: 'escuela'
      },
      {
        name:"Teacher",
        description: 'maestro'
      },
    ]

    // console.log("Seeding Model: Role");
    sequentialSeed(appRoles, "name", app.models.Role, seedUsers);
    
  }

  var seedSubjects = function() {
    const subjects = [
      {
        name: "Español"
      },
      {
        name: "Matemáticas"
      },
      {
        name: "Biología"
      },
      {
        name: "Historia"
      },
      {
        name: "Geografía"
      },
      {
        name: "Educacion física"
      },
      {
        name: "Formación civica y ética"
      },
    ];

    let cont = 0, limit = subjects.length;
    subjects.forEach(subject => {
      app.models.Subject.CreateOneWithoutRepeat(subject, (err, newSubject) => {
        if(err) throw err;
        if(++cont == limit) console.log("Subjects seeded succesfully");
      });
    });
  }

  var seedTemplateTypes = function() {
    const templateTypes = [
      {
        id: 1,
        name: "Aprendizaje basado en"
      },
      {
        id: 2,
        name: "Exeperiencias Gamificadas"
      },
      {
        id: 3,
        name: "Actividades de Aprendizaje"
      },
    ];

    let cont = 0, limit = templateTypes.length;
    templateTypes.forEach(templateType => {
      app.models.TemplateType.CreateOne(templateType, (err, newTemplateType) => {
        if(err) throw err;
        if(++cont == limit) {
          seedTemplates();
        }
      });
    });
  }

  var seedTemplates = function() {
    let templates = require('./../helpers/templates.json');
    let cont = 0, limit = templates.length;
    templates.forEach(template => {
      console.log(template.name);
      app.models.Template.CreateOne(template, (err, newTemplate) => {
        if(err) throw err;
        if(++cont == limit) console.log("Templates seeded succesfully");
      });
    });
  }

  var seedSepObjectives = function() {
    const sepObjectives = [
      {
        name: "Que los alumnos puedan establecer prioridades"
      },
      {
        name: "Que los alumnos puedan autoevaluerase"
      },
      {
        name: "Que los alumnos puedan establecer metas"
      },
    ];

    let cont = 0, limit = sepObjectives.length;
    sepObjectives.forEach(sepObjective => {
      app.models.SepObjective.CreateOne(sepObjective, (err, newSepObjective) => {
        if(err) throw err;
        if(++cont == limit) console.log("SEP objectives seeded");
      });
    });
  }

  var seedSkills = function() {
    const skills = [
      {
        name: 'ADAPTABILIDAD',
      },
      {
        name: 'ANÁLISIS DE PROBLEMAS',
      },
      {
        name: 'ANÁLISIS NUMÉRICO',
      },
      {
        name: 'ASUNCIÓN DE RIESGOS',
      },
      {
        name: 'AUTOMOTIVACIÓN',
      },
      {
        name: 'CAPACIDAD CRÍTICA',
      },
      {
        name: 'CREATIVIDAD',
      },
      {
        name: 'COMUNICACIÓN VERBAL Y NO VERBAL PERSUASIVA',
      },
      {
        name: 'COMUNICACIÓN ESCRITA',
      },
      {
        name: 'COMPROMISO',
      },
      {
        name: 'DELEGACIÓN',
      },
      {
        name: 'DECISIÓN',
      },
      {
        name: 'TOLERANCIA AL ESTRÉS',
      },
      {
        name: 'ESCUCHA',
      },
      {
        name: 'FLEXIBILIDAD',
      },
      {
        name: 'INDEPENDENCIA',
      },
      {
        name: 'INTEGRIDAD',
      },
      {
        name: 'IMPACTO',
      },
      {
        name: 'INICIATIVA',
      },
      {
        name: 'LIDERAZGO',
      },
      {
        name: 'METICULOSIDAD',
      },
      {
        name: 'NIVELES DE TRABAJO',
      },
      {
        name: 'PLANIFICACIÓN Y ORGANIZACIÓN',
      },
      {
        name: 'RESISTENCIA',
      },
      {
        name: 'SENSIBILIDAD ORGANIZACIONAL',
      },
      {
        name: 'SENSIBILIDAD INTERPERSONAL',
      },
      {
        name: 'SOCIABILIDAD',
      },
      {
        name: 'TENACIDAD',
      },
      {
        name: 'TRABAJO EN EQUIPO',
      },
    ];

    let cont = 0, limit = skills.length;
    skills.forEach(skill => {
      app.models.Skill.CreateOne(skill, (err, newSkill) => {
        if(err) throw err;
        if(++cont == limit) console.log("Skills seeded");
      });
    });
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

  var sequentialSeed = function (modelsSeedsArray, key, appModel, afterFunction = null){
    if(modelsSeedsArray.length == 0){
      console.log("Seeded Model: ",appModel.modelName);
      if(afterFunction != null){
        console.log("Executing After Function: "+afterFunction.name+"...",);
        afterFunction();
      }
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
            sequentialSeed(modelsSeedsArray, key, appModel, afterFunction)
          });
        }else{
          // pass to next modelSeed
          sequentialSeed(modelsSeedsArray, key, appModel, afterFunction)
        }
      });
  }

  var Seeders = [
    seedRoles,
    seedUploadContainers,
    seedSubjects,
    seedTemplateTypes,
    seedSepObjectives,
    seedSkills
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
          RecursiveUserPolicyNodeSeeder()
        });
      } else {
        console.log("Already Up to date, Seeding...")
        Seeders.forEach(seeder => seeder())
        RecursiveUserPolicyNodeSeeder()
      }
    });
  }

  migrateAndUpdate()

  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  //+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ SEEDER PERMISOS +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++//
  ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  
  var userPermissionPolicyNodes = [
    //+++++++++++DASHBOARD+++++++++++
    {
      key : "dashboard",
      name : "Página principal",
      children : [
        {
          key : "Events",
          name : "Ver eventos"
        }
      ]
    }
  ]

  var RecursiveUserPolicyNodeSeeder = function() {
    let UserPermissionPolicyNode = app.models.UserPermissionPolicyNode

    console.log(`Seeding model ${UserPermissionPolicyNode.modelName}...`)

    let seedUserPolicyNode = function(node) {

      
      let preparedNode = {
        key : node.key,
        name : node.name,
        parentId : node.parentId
      }

      //console.log(`SEEDING ${preparedNode.key} of parent ${preparedNode.parentId}`)
      
      isNodeAlreadySeeded(preparedNode, function(err, isSeeded) {
        if (err) throw err;

        if (isSeeded) {
          //console.log(`ALREADYSEEDED ${preparedNode.key} of parent ${preparedNode.parentId}`)
          return
        }
        
        UserPermissionPolicyNode.create(preparedNode, function(err, UserPermissionPolicyNode) {
          if (err) throw err;
  
          //console.log(`SEEDED ${UserPermissionPolicyNode.key} of parent ${UserPermissionPolicyNode.parentId}`)
          if( Array.isArray(node.children) ) {
            for(let innerNode of node.children) {
              innerNode.parentId = UserPermissionPolicyNode.id
              //console.log(`CHILD ${innerNode.key} of parent ${innerNode.parentId}`)
              seedUserPolicyNode(innerNode)
            }
          }
        })
      })      
    }

    let isNodeAlreadySeeded = function(node, callback) {
      let filter = {
        where : {
          key : node.key,
          parentId : node.parentId
        }
      }

      UserPermissionPolicyNode.findOne(filter, function(err, existingNode) {
        if(err) return callback(err)

        return callback(null, existingNode != null)
      })
    }
    
    userPermissionPolicyNodes.forEach(seedUserPolicyNode)
  }
};
