import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Member } from 'src/models/Member';
//le service accepte detre injecte sur toute la root du projet mais en peut faire des limites
@Injectable({
  providedIn: 'root'
})
export class MemeberService {
  constructor(private httpClient:HttpClient){}

  GETALLMembers():Observable<Member[]>{
    //generation de la requete http en mode GET
    return this.httpClient.get<Member[]>('http://localhost:3000/members')
  }
}
