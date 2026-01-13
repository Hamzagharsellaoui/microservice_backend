import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class EventsService {
  private api = 'http://localhost:9000/evenements';

  constructor(private httpClient: HttpClient) {
  }

  getAllEvents(): Observable<any[]> {
    return this.httpClient.get<any[]>(this.api);
  }

  getEventById(id: number): Observable<any> {
    return this.httpClient.get<any>(`${this.api}/${id}`);
  }

  createEvent(body: any): Observable<any> {
    return this.httpClient.post<any>(this.api, body);
  }

  updateEvent(id: number, body: any): Observable<any> {
    return this.httpClient.put<any>(`${this.api}/${id}`, body);
  }

  deleteEvent(id: number): Observable<any> {
    return this.httpClient.delete<any>(`${this.api}/${id}`);
  }
}
