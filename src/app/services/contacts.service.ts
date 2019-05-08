import { Injectable } from '@angular/core'; 
import { Contact } from '../models/contact';
import { User } from '../models/user';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, Subject, pipe } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { throwError, of } from 'rxjs';
import {
   debounceTime, distinctUntilChanged, switchMap
 } from 'rxjs/operators';
import { AuthenticationService } from './authentication.service';

@Injectable(/*{
  providedIn: 'root'
}*/)
export class ContactsService {

	 apiUrl = 'http://localhost:8080/';
   meteoUrl = 'http://api.wunderground.com/api/Your_Key/conditions/q/CA/San_Francisco.json';
   offreEmploiUrl = 'api.emploi-store.fr/partenaire/offresdemploi';
   testUrl = 'http://jsonplaceholder.typicode.com/';
   hearthStoneUrl= 'https://omgvamp-hearthstone-v1.p.rapidapi.com/cards/classes/Paladin';
   youtubeUrl = 'https://coolguruji-youtube-to-mp3-download-v1.p.rapidapi.com/?id=lF-jPBnZ098';
   footballUrl = 'https://free-football-soccer-videos.p.rapidapi.com/';


   headers = new HttpHeaders({'authorization':'Bearer '+this.authService.jwt});
   headersTest = new HttpHeaders({'authorization':'Bearer '+this.authService.jwt}&&{'X-RapidAPI-Host':'omgvamp-hearthstone-v1.p.rapidapi.com'}&&{'X-RapidAPI-Key':'007d794ec6msh7b0dd4f382a5f78p15c3e7jsn3bf8f28ab3d4'});
   headersYoutube = new HttpHeaders({'authorization':'Bearer '+this.authService.jwt}&&{'X-RapidAPI-Host':'coolguruji-youtube-to-mp3-download-v1.p.rapidapi.com'}&&{'X-RapidAPI-Key':'007d794ec6msh7b0dd4f382a5f78p15c3e7jsn3bf8f28ab3d4'});
   headersFootball = new HttpHeaders({'authorization':'Bearer '+this.authService.jwt}&&{'X-RapidAPI-Host':'free-football-soccer-videos.p.rapidapi.com.com'}&&{'X-RapidAPI-Key':'007d794ec6msh7b0dd4f382a5f78p15c3e7jsn3bf8f28ab3d4'});
   headerhs1 = new HttpHeaders({'X-RapidAPI-Host':'omgvamp-hearthstone-v1.p.rapidapi.com'});  
   headerhs2 = new HttpHeaders({'X-RapidAPI-Key':'007d794ec6msh7b0dd4f382a5f78p15c3e7jsn3bf8f28ab3d4'});

  constructor(private http: HttpClient, private authService: AuthenticationService) { }

  findAll(): Observable<Contact[]> {
    //let headers = new HttpHeaders({'authorization':'Bearer '+this.authService.jwt});
  	return this.http.get<Contact[]>(this.apiUrl+"contacts",{headers:this.headers})
  	.pipe(catchError((error:any)=>Observable.throw(error.json().error || "Server error")));
  	
  }

  /*findAll() {
    let headers = new HttpHeaders({'authorization':'Bearer '+this.authService.jwt});
    return this.http.get(this.apiUrl+"contacts",{headers:headers});
  }*/

  findById(id: number): Observable<any> { 
    return this.http.get<Contact>(this.apiUrl + "contacts/" + id,{headers:this.headers})
  .pipe(catchError(val => of("Serveur erreur :"+val)));
   }

   /*saveContact(contact: Contact): Observable<any> { 
     let headers = new HttpHeaders({'authorization':'Bearer '+this.authService.jwt});
    return this.http.post<Contact>(this.apiUrl+"addcontacts", contact)
    .pipe(catchError(val => of("Serveur erreur :"+val)));

     }*/

     saveContact(contact: Contact) {
       /*let headers = new HttpHeaders({'authorization':'Bearer '+this.authService.jwt});*/
       return this.http.post(this.apiUrl+"addcontacts",contact,{headers:this.headers});
     }

     updateContact(contact: Contact): Observable<any> {
    return this.http.put<Contact>(this.apiUrl + "contacts/"+ contact.id, contact,{headers:this.headers})
     .pipe(catchError(val => of("Serveur erreur :"+val)));

  }

    deleteContactById(id: number): Observable<any> { 
    return this.http.delete<Contact>(this.apiUrl + "contacts/" + id,{headers:this.headers})
    .pipe(catchError(val => of("Serveur erreur :"+val)));
  //.pipe(catchError((error:any) => Observable.throw(error.json().error || 'Servor error')));
   
   }

   getContacts(motCle:string, page:number, size:number): Observable<Contact[]> {
   	/*if (!motCle.trim()) {
   		return of ([]);
   	}*/
  	return this.http.get<Contact[]>(this.apiUrl+"contacts/?nom="+motCle+"&size="+size+"&page="+page,{headers:this.headers})
  	.pipe(catchError((error:any)=>Observable.throw(error.json().error || "Server error")));



  	/*return this.http.get<Contact[]>(`${this.apiUrl}contacts/?nom=${motCle}`).pipe(
    tap(_ => this.getContacts(`found heroes matching "${motCle}"`)),
    catchError((error:any)=>Observable.throw(error.json().error || "Server error"))
  );*/
  	 console.log("bonjour");
  }
  /*getContacts(motCle:string,size:number,page:number) {
  	return this.http.get(this.apiUrl+"searchContacts?mc="+motCle+"&size="+size+"&page="+page);
  }*/

  contactSearch(motCLe: string): Observable<Contact[]> {
    return this.http.get<Contact[]>(
      this.apiUrl+'contacts/?nom=', { params: { motCle: motCLe }});
    
    
  }

  getOffreEmploi() {
    return this.http.get(this.offreEmploiUrl);
  }

  getTestUrl(): Observable<Contact[]> {
    //return this.http.get(this.testUrl+'posts/',{headers:this.headers});
    return this.http.get<Contact[]>(this.testUrl+'posts',{headers:this.headers})
    .pipe(catchError((error:any)=>Observable.throw(error.json().error || "Server error")));
  }

  getHearthStoneCard(): Observable<Contact[]> {
    //return this.http.get(this.testUrl+'posts/',{headers:this.headers});
    return this.http.get<Contact[]>(this.hearthStoneUrl,{headers:this.headersTest})
    .pipe(catchError((error:any)=>Observable.throw(error.json().error || "Server error")));
  }

  convertisseurYoutube(): Observable<Contact[]> {
    //return this.http.get(this.testUrl+'posts/',{headers:this.headers});
    return this.http.get<Contact[]>(this.youtubeUrl,{headers:this.headersYoutube})
    .pipe(catchError((error:any)=>Observable.throw(error.json().error || "Server error")));
  }

  getFootball(): Observable<Contact[]> {
    //return this.http.get(this.testUrl+'posts/',{headers:this.headers});
    return this.http.get<Contact[]>(this.footballUrl,{headers:this.headersFootball})
    .pipe(catchError((error:any)=>Observable.throw(error.json().error || "Server error")));
  }

  findUserById(id: number): Observable<any> { 
    return this.http.get<User>(this.apiUrl + "users/" + id,{headers:this.headers})
  .pipe(catchError(val => of("Serveur erreur :"+val)));
   }

}
