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

  IsUser() {
    const user = this.api.GetUser();
    if (user && user.role) {
      return user.role.name == "User";
    } else {
      return false;
    }
  }

  IsAdmin() {
    const user = this.api.GetUser();
    if (user && user.role) {
      return user.role.name == "Admin";
    } else {
      return false;
    }
  }
}
