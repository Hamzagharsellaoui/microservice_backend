import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({providedIn: 'root'})
export class ToolsService {
  private api = 'http://localhost:9000/outils';

  constructor(private http: HttpClient) {
  }

  getAll(): Observable<any[]> {
    return this.http.get<any[]>(this.api);
  }

  getById(id: number): Observable<any> {
    return this.http.get<any>(`${this.api}/${id}`);
  }

  create(body: any): Observable<any> {
    return this.http.post<any>(this.api, body);
  }

  update(id: number, body: any): Observable<any> {
    return this.http.put<any>(`${this.api}/${id}`, body);
  }

  delete(id: number): Observable<any> {
    return this.http.delete<any>(`${this.api}/${id}`);
  }
}

