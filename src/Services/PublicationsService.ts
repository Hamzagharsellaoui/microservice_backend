import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {Publication} from "../Models/Publication";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class PublicationsService {
  private api = 'http://localhost:9000/publications';

  constructor(private httpClient: HttpClient) {
  }

  getAllPublications(): Observable<any[]> {
    return this.httpClient.get<any[]>(this.api);
  }

  getPublicationById(id: number): Observable<any> {
    return this.httpClient.get<any>(`${this.api}/${id}`);
  }

  createPublication(body: any): Observable<any> {
    return this.httpClient.post<any>(this.api, body);
  }

  updatePublication(id: number, body: any): Observable<any> {
    return this.httpClient.put<any>(`${this.api}/${id}`, body);
  }

  deletePublication(id: string): Observable<any> {
    return this.httpClient.delete<any>(`${this.api}/${id}`);
  }
}
