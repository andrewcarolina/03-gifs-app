import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchResponse } from '../interfaces/gifs.interfaces';

const GIPHY_API_KEY = 'vhpLTrFKfRpvWQ90HStORSyxzaYzwo2S';

@Injectable({providedIn: 'root'})


export class GifsService {

  public gifList: Gif[] = [];
  private _tagsHistory : string[] = [];
  private _serviceUrl: string = 'https://api.giphy.com/v1/gifs';


  constructor( private http: HttpClient) {
    this.loadLocalStorage();
   }

  get tagsHistory() {

     return [...this._tagsHistory];

  }
  private organizedHistory( tag:string):void{

     tag.toLowerCase();

     if ( this._tagsHistory.includes(tag)){
           this._tagsHistory = this._tagsHistory.filter( (oldTag) => oldTag !== tag   )
     }

     this._tagsHistory.unshift(tag);
     this._tagsHistory = this._tagsHistory.splice(0,10);
     this.saveLocalStorage();

  }


  private saveLocalStorage():void{

      localStorage.setItem('history', JSON.stringify(this._tagsHistory));
  }

  private loadLocalStorage():void{

       if(!localStorage.getItem('history')) return;

       this._tagsHistory = JSON.parse(localStorage.getItem('history')!);

       if(this._tagsHistory.length ===0) return;

       this.searchTag(this._tagsHistory[0]);
  }

   searchTag( tag:string):void {

     if(tag.length === 0){
      return;
     }
     this.organizedHistory(tag);

     const params = new HttpParams()
     .set('api_key',GIPHY_API_KEY )
     .set('limit',10 )
     .set('q',tag )

     this.http.get<SearchResponse>(`${this._serviceUrl}/search`,{params})
          .subscribe( resp => {
            this.gifList =  resp.data;
            console.log(resp.data);
          })
  }



}
