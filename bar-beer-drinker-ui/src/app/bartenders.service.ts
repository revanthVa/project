import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface Bartender {
    Bartendersname: string;
}
export interface BartendersHours{
  start: string;
  end: string;
}
export interface BartendersAnalytics{
  Bartendersname: string;
  sold: number;
}

@Injectable({
  providedIn: 'root'
})
export class BartendersService {

  constructor(
    public http: HttpClient
  ) { }

  getBartendersFromBars(name: string) {
    return this.http.get<Bartender[]>('/api/bartender/'+ name);
    }
  getBartendersHours(name: string){
    return this.http.get<BartendersHours[]>('/api/bartendersHours/' + name);
  }
  getBartendersAnalytics(name: string, start: string, end: string){
    return this.http.get<BartendersAnalytics[]>('/api/bartenderAnalytics/'+name+'/'+start+'/'+end)
  }
}