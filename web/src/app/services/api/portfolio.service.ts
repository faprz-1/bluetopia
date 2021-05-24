import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import Portfolio from '../../interfaces/portfolio.interface';
import { ApiService } from '../api.service';

@Injectable({
  providedIn: 'root'
})
export class PortfolioService {
  constructor(
    private api: ApiService,
  ) {}

  GetByUUID(uuid: string): Observable<Portfolio> {
    return this.api.Get(`/Portfolios/portfolio/${uuid}`);
  }
}
