'use strict';

module.exports = function(Usuario) {
    var app = require('../../server/server');
    /**
     * test
     * @param {object} objt objt
     * @param {Function(Error, object)} callback
     */

    Usuario.test = function(objt, callback) {
        var Role = app.models.Role;
        var RoleMapping = app.models.RoleMapping;
        var res;
        // TODO
        Usuario.find({}).then((res) =>{
            callback(null, res);
        });
    };   
};
