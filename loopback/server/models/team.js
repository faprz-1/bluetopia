'use strict';

module.exports = function(Team) {

    Team.CreateOne = function(team, callback) {
        Team.create(team, (err, newTeam) => {
            if(err) return callback(err);

            let cont = 0, limit = team.members.length;
            members.forEach(member => {
                let teamStudent = {
                    teamId: newTeam.id,
                    studentId: member.id,
                    roleId: member.roleId
                }
                Team.app.models.TeamStudent.create(teamStudent, (err) => {
                    if(err) return callback(err);
                    if(++cont == limit) return callback(null, newTeam);
                });
            });
        });
    }

    Team.CreateTeams = function(teams, strategyId, callback) {
        let cont = 0, limit = teams.length;
        if(!limit) return callback(null, []);
        teams.forEach(team => {
            team.strategyId = strategyId;
            Team.CreateOne(team, (err, newTeam) => {
                if(err) return callback(err);

                if(++cont == limit) return callback(null, teams);
            });
        })
    }

};
