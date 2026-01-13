import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {EventModel} from "../Models/EventModel";
import {Outil} from "../Models/Outil";
import {Publication} from "../Models/Publication";

@Injectable({ providedIn: 'root' })
export class MemberLinksService {
  private base = 'http://localhost:9000'; // gateway

  constructor(private http: HttpClient) {}

  // EVENTS
  getMemberEvents(memberId: number) {
    return this.http.get<EventModel[]>(`${this.base}/membres/${memberId}/events`);
  }
  attachEvent(memberId: number, eventId: number) {
    return this.http.get(`${this.base}/membres/${memberId}/events/${eventId}`);
  }
  createEventForMember(memberId: number, payload: any) {
    return this.http.post<EventModel[]>(`${this.base}/membres/${memberId}/events`, payload);
  }
  deleteMemberEvent(memberId: number, eventId: number) {
    return this.http.delete(`${this.base}/membres/${memberId}/events/${eventId}`, { responseType: 'text' });
  }

  // TOOLS
  getMemberTools(memberId: number) {
    return this.http.get<Outil[]>(`${this.base}/membres/${memberId}/outils`);
  }
  attachTool(memberId: number, toolId: number) {
    return this.http.get(`${this.base}/membres/${memberId}/outils/${toolId}`);
  }
  createToolForMember(memberId: number, payload: any) {
    return this.http.post<Outil[]>(`${this.base}/membres/${memberId}/outils`, payload);
  }
  deleteMemberTool(memberId: number, toolId: number) {
    return this.http.delete(`${this.base}/membres/${memberId}/outils/${toolId}`, { responseType: 'text' });
  }

  // PUBLICATIONS
  getMemberPubs(memberId: number) {
    return this.http.get<Publication[]>(`${this.base}/membres/${memberId}/publications`);
  }
  attachPub(memberId: number, pubId: number) {
    return this.http.get(`${this.base}/membres/${memberId}/publications/${pubId}`);
  }
  createPubForMember(memberId: number, payload: any) {
    return this.http.post<Publication[]>(`${this.base}/membres/${memberId}/publications`, payload);
  }
  deleteMemberPub(memberId: number, pubId: number) {
    return this.http.delete(`${this.base}/membres/${memberId}/publications/${pubId}`, { responseType: 'text' });
  }
}

