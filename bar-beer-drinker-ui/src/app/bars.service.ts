import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface Bar {
  addr: string;
  city: string;
  license: string;
  name: string;
  phone: string;
  state: string;
}

@Injectable({
  providedIn: 'root'
})
export class BarsService {

  constructor(
    public http: HttpClient
  ) { }
  getBars() { 
    return this.http.get<Bar[]>('/api/bar');
  }
  getBar(bar: string){
    return this.http.get<Bar>('api/bar/' + bar);
  }
}
