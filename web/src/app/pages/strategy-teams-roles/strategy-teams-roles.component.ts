import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { ApiService } from 'src/app/services/api.service';
import { NavigationService } from 'src/app/services/navigation.service';

@Component({
  selector: 'app-strategy-teams-roles',
  templateUrl: './strategy-teams-roles.component.html',
  styleUrls: ['./strategy-teams-roles.component.scss']
})
export class StrategyTeamsRolesComponent implements OnInit {

  strategyId: any;
  strategy: any;
  roles: Array<any> = [];
  customRoles: Array<any> = [];
  roleOptions: Array<any> = [];
  strategyTeams: Array<any> = [];
  rolesToUse: string = 'default';
  saver = new Subject();
  saving: boolean = false;
  crumbs: Array<{name: string, route: string | null}> = [
    {name: 'Equipos', route: '/mis-estrategias'},
    {name: 'Asigna roles a tus alumnos', route: '/mis-estrategias'},
  ];

  public get rolesText() {
    return this.roles.map(role => role.name).join(' / ');
  }

  constructor(
    private activatedRoute: ActivatedRoute,
    private api: ApiService,
    private nav: NavigationService
  ) { }

  ngOnInit(): void {
    this.saver.subscribe(() => {
      this.SaveAll();
    });
    this.GetRoles();
  }

  BuildStudentFullName(student: any): string {
    return `${student.name} ${student.fatherLastname} ${student.motherLastname}`;
  }

  AddCustomRole(role: string) {
    if(!!role) {
      this.api.Post(`/TeamRoles`, {role: {name: role, strategyId: this.strategyId}}).subscribe(newRole => {
        this.customRoles.push(newRole);
        if(this.rolesToUse == 'custom') {
          this.strategyTeams.forEach(team => team.roles.push(newRole));
        }
      });
    }
  }

  GetParams() {
    this.activatedRoute.params.subscribe(params => {
      this.strategyId = params['strategyId'];
      this.GetStrategy();
    });
  }

  async SaveAll(goToNextStep: boolean = false) {
    if (this.saving) return;
    try {
      this.saving = true;
      this.SaveStrategy();
      await this.SaveStrategyTeams();
      this.saving = false;
      if (goToNextStep) {
        this.nav.GoToUserRoute(
          `mis-estrategias/${this.strategyId}/progreso-equipos`
        );
      }
    } catch (err) {
      console.error("Error saving changes", err);
      this.saving = false;
    }
  }

  GetRoles() {
    this.api.Get(`/TeamRoles`).subscribe(roles => {
      this.roles = roles;

      this.GetParams();
    }, err => {
      console.error("Error getting roles", err);
    });
  }

  GetStrategy() {
    this.api.Get(`/Strategies/${this.strategyId}`).subscribe(
      (strategy) => {
        this.strategy = strategy;
        this.InitializeVariables();
      }, (err) => {
        console.error('Error getting strategy', err);
      }
      );
    }
    
    InitializeVariables() {
    this.rolesToUse = this.strategy.useCustomRoles ? 'custom' : 'default';
    if(!!this.strategy.customRoles?.length) this.customRoles = this.strategy.customRoles;
    this.strategyTeams = this.strategy?.teams || [];
    this.OnRolesToUseChange(false);
    this.strategyTeams.forEach(team => {
      team.members.forEach((member: any) => {
        this.OnTeamMemberRoleSelected(team, member.roleId, false);
      });
    });
  }

  SaveStrategy() {
    return new Promise<void>((res, rej) => {
      let strategy = {
        id: this.strategyId,
        useCustomRoles: this.rolesToUse == 'custom'
      }
      this.api.Patch(`/Strategies/${this.strategyId}/OnlyStrategy/1`, {strategy}).subscribe(strategySaved => {
        res();
      }, err => {
        console.error("Error saving strategy", err);
        rej(err);
      });
    });
  }

  SaveStrategyTeams() {
    return new Promise<void>((res, rej) => {
      this.api.Patch(`/Teams/MemebersRoles`, {teams: this.strategyTeams}).subscribe(teamsCreated => {
        res();
      }, err => {
        console.error("Error patching teams", err);
        rej(err);
      });
    });
  }

  OnRolesToUseChange(changeTriggerdeFromView: boolean = true) {
    switch (this.rolesToUse) {
      case 'default': this.roleOptions = this.roles; break;
      case 'custom': this.roleOptions = this.customRoles; break;
    }
    this.strategyTeams.forEach(team => {
      team.roles = Array.from(this.roleOptions);
      if(changeTriggerdeFromView) team.members.forEach((member: any) => member.roleId = null);
    });
    this.saver.next();
  }

  OnTeamMemberRoleSelected(team: any, roleId: number, save: boolean = true) {
    if(!!roleId) {
      const roleIdx = team.roles.findIndex((role: any) => role.id == roleId);
      if(roleIdx != -1) team.roles.splice(roleIdx, 1);
    }
    if(save) this.saver.next();
  }
  
  RemoveMemberRole(team: any, member: any) {
    team.roles.push(this.GetRoleById(member.roleId));
    member.roleId = null;
    this.saver.next();
  }

  GetRoleById(roleId: any) {
    return this.roleOptions.find((role: any) => role.id == roleId);
  }

}
