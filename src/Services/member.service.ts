import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Member } from '../Models/Member';

@Injectable({ providedIn: 'root' })
export class MemberService {
  private baseUrl = 'http://localhost:9000/membres';

  constructor(private httpClient: HttpClient) {}

  getAllMembers(): Observable<Member[]> {
    return this.httpClient.get<Member[]>(`${this.baseUrl}`);
  }

  getMemberById(id: string): Observable<Member> {
    return this.httpClient.get<Member>(`${this.baseUrl}/${id}`);
  }

  addEtudiant(e: any): Observable<any> {
    return this.httpClient.post(`${this.baseUrl}/etudiant`, e);
  }

  addEnseignant(p: any): Observable<any> {
    return this.httpClient.post(`${this.baseUrl}/enseignant`, p);
  }

  updateEtudiant(id: string, e: any): Observable<any> {
    return this.httpClient.put(`${this.baseUrl}/etudiant/${id}`, e);
  }

  updateEnseignant(id: string, p: any): Observable<any> {
    return this.httpClient.put(`${this.baseUrl}/enseignant/${id}`, p);
  }

  deleteMember(id: string): Observable<void> {
    return this.httpClient.delete<void>(`${this.baseUrl}/${id}`);
  }
}
