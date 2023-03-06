'use strict';

module.exports = function(TeamRole) {

    TeamRole.GetAll = function(callback) {
        TeamRole.find((err, teamRoles) => {
            if(err) return callback(err);
            return callback(null, teamRoles);
        });
    }

};
