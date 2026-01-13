import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {EventModel} from "../Models/EventModel";
import {Outil} from "../Models/Outil";
import {Publication} from "../Models/Publication";
import {FormControl, ɵFormGroupValue, ɵTypedOrUntyped} from "@angular/forms";

@Injectable({ providedIn: 'root' })
export class MemberRelationsService {
  private gateway = 'http://localhost:9000';

  constructor(private http: HttpClient) {}

  // EVENTS
  getEvents(memberId: string): Observable<EventModel[]> {
    return this.http.get<EventModel[]>(`${this.gateway}/membres/${memberId}/events`);
  }

  createEvent(memberId: string, payload: ɵTypedOrUntyped<{
    name: FormControl<string | null>;
    dateDebut: FormControl<string | null>;
    dateFin: FormControl<string | null>;
    lieu: FormControl<string | null>
  }, ɵFormGroupValue<{
    name: FormControl<string | null>;
    dateDebut: FormControl<string | null>;
    dateFin: FormControl<string | null>;
    lieu: FormControl<string | null>
  }>, any>): Observable<EventModel[]> {
    return this.http.post<EventModel[]>(`${this.gateway}/membres/${memberId}/events`, payload);
  }
  attachEvent(memberId: string, eventId: string): Observable<any> {
    return this.http.get(`${this.gateway}/membres/${memberId}/events/${eventId}`);
  }
  deleteEvent(memberId: string, eventId: string): Observable<any> {
    return this.http.delete(`${this.gateway}/membres/${memberId}/events/${eventId}`);
  }

  // OUTILS
  getOutils(memberId: string): Observable<Outil[]> {
    return this.http.get<Outil[]>(`${this.gateway}/membres/${memberId}/outils`);
  }

  createOutil(memberId: string, payload: ɵTypedOrUntyped<{
    source: FormControl<string | null>;
    date: FormControl<string | null>
  }, ɵFormGroupValue<{ source: FormControl<string | null>; date: FormControl<string | null> }>, any>): Observable<Outil[]> {
    return this.http.post<Outil[]>(`${this.gateway}/membres/${memberId}/outils`, payload);
  }
  attachOutil(memberId: string, outilId: string): Observable<any> {
    return this.http.get(`${this.gateway}/membres/${memberId}/outils/${outilId}`);
  }
  deleteOutil(memberId: string, outilId: string): Observable<any> {
    return this.http.delete(`${this.gateway}/membres/${memberId}/outils/${outilId}`);
  }

  // PUBLICATIONS
  getPublications(memberId: string): Observable<Publication[]> {
    return this.http.get<Publication[]>(`${this.gateway}/membres/${memberId}/publications`);
  }

  createPublication(memberId: string, payload: ɵTypedOrUntyped<{
    titre: FormControl<string | null>;
    type: FormControl<string | null>;
    dateApparition: FormControl<string | null>;
    lien: FormControl<string | null>
  }, ɵFormGroupValue<{
    titre: FormControl<string | null>;
    type: FormControl<string | null>;
    dateApparition: FormControl<string | null>;
    lien: FormControl<string | null>
  }>, any>): Observable<Publication[]> {
    return this.http.post<Publication[]>(`${this.gateway}/membres/${memberId}/publications`, payload);
  }
  attachPublication(memberId: string, pubId: string): Observable<any> {
    return this.http.get(`${this.gateway}/membres/${memberId}/publications/${pubId}`);
  }
  deletePublication(memberId: string, pubId: string): Observable<any> {
    return this.http.delete(`${this.gateway}/membres/${memberId}/publications/${pubId}`);
  }
}
