import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface Beer {
  name: string;
  manf: string;
}

@Injectable({
  providedIn: 'root'
})
export class BeersService {

  constructor(
    public http: HttpClient
  ) { }
  getBeers() { 
    return this.http.get<Beer[]>('/api/beer');
  }
  getBeer(beer: string){
    return this.http.get<Beer>('api/beer/' + beer);
  }
}
