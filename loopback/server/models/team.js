'use strict';

module.exports = function(Team) {

    Team.CreateOne = function(team, callback) {
        let teamInstance = {
            name: team.name,
            strategyId: team.strategyId
        }
        Team.create(teamInstance, (err, newTeam) => {
            if(err) return callback(err);

            let cont = 0, limit = team.members.length;
            if(!limit) return callback(null, newTeam);
            team.members.forEach(member => {
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

    Team.AddTeams = function(teams, strategyId, callback) {
        let cont = 0, limit = teams.length;
        if(!limit) return callback(null, []);
        teams.forEach(team => {
            team.strategyId = strategyId;
            Team.CreateOne(team, (err, newTeam) => {
                if(err) return callback(err);

                if(++cont == limit) return callback(null, teams);
            });
        });
    }

    Team.UpsertStrategyTeams = function(teams, strategyId, callback) {
        Team.destroyAll({strategyId}, (err, destroyed) => {
            if(err) return callback(err);
            
            teams = teams.map((team, idx) => {
                team.name = `Equipo ${idx+1}`;
                return team;
            });
            Team.AddTeams(teams, strategyId, (err, teamsCreated) => {
                if(err) return callback(err);
                return callback(null, teamsCreated);
            });
        });
    }
};
