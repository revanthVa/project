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
export interface topSpenderGraph {
  Drinkersname: string;
  totalprice: number;
}
export interface topBeers{
  Quantity: number;
  beername: string;
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
  getTopSpenderGraph(bar: string){
    return this.http.get<topSpenderGraph[]>('api/bar/'+bar+'/top10spenders');
  }
  getTopBeers(bar: string, day: string){
    return this.http.get<topBeers[]>('/api/bar/'+bar+'/'+day+'/top10Beers');
  }
}
