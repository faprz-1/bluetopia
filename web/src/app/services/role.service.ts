import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  constructor(
    private api: ApiService,
  ) {
  }
  
  GetRole() {
    const user = this.api.GetUser();
    if (user && user.role) {
      return user.role.name;
    }
    else return "NoRole";
  }

  IsUser() {
    return this.GetRole() == "User";
  }
  
  IsAdmin() {
    return this.GetRole() == "Admin";
  }

}
