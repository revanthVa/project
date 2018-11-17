import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface Drinker {
  name: string;
  addr: string;
  city: string;
  phone: string;
  state: string;
}

export interface Beer {
  name: string;
  manf: string;
}
export interface top10Bars{
  Barsname: string;
  BeersSold: number;
}
export interface top10Drinkers{
  Drinkersname: string;
  amountBought: number;
}

@Injectable({
  providedIn: 'root'
})
export class DrinkersService {

  constructor(
    public http: HttpClient
  ) { }

  getDrinkers() {
    return this.http.get<Drinker[]>('/api/drinker');
  }
  getDrinker(drinker: string){
    return this.http.get<Drinker>('api/drinker/' + drinker);
  }
  
  getBeers() {
    return this.http.get<Beer[]>('/api/beer');
  }
  getBeer(beer: string){
    return this.http.get<Beer>('api/beer/' + beer);
  }
  getTop10Bars(beer: string){
    return this.http.get<top10Bars[]>('api/beer/'+beer+'/top10Bars')
  }
  getTop10Drinkers(beer: string){
    return this.http.get<top10Drinkers[]>('api/beer/'+beer+'/top10Drinkers')
  }
}