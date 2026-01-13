import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({ providedIn: 'root' })
export class ToolsService {
  private api = 'http://localhost:9000/outils';
  constructor(private http: HttpClient) {}

  getAllTools(): Observable<any[]> { return this.http.get<any[]>(this.api); }
  getToolById(id: number): Observable<any> { return this.http.get<any>(`${this.api}/${id}`); }
  createTool(body: any): Observable<any> { return this.http.post<any>(this.api, body); }
  updateTool(id: number, body: any): Observable<any> { return this.http.put<any>(`${this.api}/${id}`, body); }
  deleteTool(id: number): Observable<any> { return this.http.delete<any>(`${this.api}/${id}`); }
}
