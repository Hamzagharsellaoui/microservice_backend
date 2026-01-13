import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {MemberLinksService} from "../../Services/member-links-service.service";
import {MemberService} from "../../Services/member.service";

@Component({
  selector: 'app-member-details',
  templateUrl: './member-details.component.html',
  styleUrls: ['./member-details.component.css']
})
export class MemberDetailsComponent implements OnInit {
  memberId!: number;

  member: any = null;

  // lists
  events: any[] = [];
  outils: any[] = [];
  pubs: any[] = [];

  // attach controls
  attachEventId = new FormControl('', [Validators.required]);
  attachOutilId = new FormControl('', [Validators.required]);
  attachPubId   = new FormControl('', [Validators.required]);

  // create forms
  eventForm!: FormGroup;
  outilForm!: FormGroup;
  pubForm!: FormGroup;

  loading = false;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private links: MemberLinksService,
    private MS:MemberService,
  ) {}

  ngOnInit(): void {
    this.memberId = Number(this.route.snapshot.paramMap.get('id'));

    this.eventForm = this.fb.group({
      titre: ['', Validators.required],
      date: [null, Validators.required],
      lieu: ['']
    });

    this.outilForm = this.fb.group({
      source: ['', Validators.required],
      date: [null]
    });

    this.pubForm = this.fb.group({
      titre: ['', Validators.required],
      type: [''],
      dateApparition: [null],
      lien: ['']
    });

    this.loadAll();
  }

  loadAll(): void {
    this.loading = true;

    this.MS.getMemberById(String(this.memberId)).subscribe({
      next: (m) => (this.member = m),
      error: () => (this.member = null)
    });

    this.loadEvents();
    this.loadTools();
    this.loadPubs();

    this.loading = false;
  }

  // ---------- EVENTS ----------
  loadEvents(): void {
    this.links.getMemberEvents(this.memberId).subscribe({
      next: (data) => (this.events = data || []),
      error: (e) => console.error('events load error', e)
    });
  }

  attachEvent(): void {
    const eventId = Number(this.attachEventId.value);
    if (!eventId) return;

    this.links.attachEvent(this.memberId, eventId).subscribe({
      next: () => {
        this.attachEventId.reset('');
        this.loadEvents();
      },
      error: (e) => console.error('attachEvent error', e)
    });
  }

  createEvent(): void {
    if (this.eventForm.invalid) return;

    const v = this.eventForm.value;
    const payload = {
      titre: v.titre,
      date: new Date(v.date).toISOString(),
      lieu: v.lieu
    };

    this.links.createEventForMember(this.memberId, payload).subscribe({
      next: (list) => {
        this.events = list || [];
        this.eventForm.reset({ titre: '', date: null, lieu: '' });
      },
      error: (e) => console.error('createEvent error', e)
    });
  }

  deleteEvent(eventId: any): void {
    const id = Number(eventId);
    if (!id) return;

    // ⚠️ your backend deletes the event globally (not only detach)
    if (!confirm('This will delete the event (global). Continue?')) return;

    this.links.deleteMemberEvent(this.memberId, id).subscribe({
      next: () => this.loadEvents(),
      error: (e) => console.error('deleteEvent error', e)
    });
  }

  // ---------- TOOLS ----------
  loadTools(): void {
    this.links.getMemberTools(this.memberId).subscribe({
      next: (data) => (this.outils = data || []),
      error: (e) => console.error('tools load error', e)
    });
  }

  attachOutil(): void {
    const outilId = Number(this.attachOutilId.value);
    if (!outilId) return;

    this.links.attachTool(this.memberId, outilId).subscribe({
      next: () => {
        this.attachOutilId.reset('');
        this.loadTools();
      },
      error: (e) => console.error('attachOutil error', e)
    });
  }

  createOutil(): void {
    if (this.outilForm.invalid) return;

    const v = this.outilForm.value;
    const payload = {
      source: v.source,
      date: v.date ? new Date(v.date).toISOString() : null
    };

    this.links.createToolForMember(this.memberId, payload).subscribe({
      next: (list) => {
        this.outils = list || [];
        this.outilForm.reset({ source: '', date: null });
      },
      error: (e) => console.error('createOutil error', e)
    });
  }

  deleteOutil(outilId: any): void {
    const id = Number(outilId);
    if (!id) return;

    if (!confirm('This will delete the tool (global). Continue?')) return;

    this.links.deleteMemberTool(this.memberId, id).subscribe({
      next: () => this.loadTools(),
      error: (e) => console.error('deleteOutil error', e)
    });
  }

  // ---------- PUBLICATIONS ----------
  loadPubs(): void {
    this.links.getMemberPubs(this.memberId).subscribe({
      next: (data) => (this.pubs = data || []),
      error: (e) => console.error('pubs load error', e)
    });
  }

  attachPublication(): void {
    const pubId = Number(this.attachPubId.value);
    if (!pubId) return;

    this.links.attachPub(this.memberId, pubId).subscribe({
      next: () => {
        this.attachPubId.reset('');
        this.loadPubs();
      },
      error: (e) => console.error('attachPub error', e)
    });
  }

  createPublication(): void {
    if (this.pubForm.invalid) return;

    const v = this.pubForm.value;
    const payload = {
      titre: v.titre,
      type: v.type,
      dateApparition: v.dateApparition ? new Date(v.dateApparition).toISOString() : null,
      lien: v.lien
    };

    this.links.createPubForMember(this.memberId, payload).subscribe({
      next: (list) => {
        this.pubs = list || [];
        this.pubForm.reset({ titre: '', type: '', dateApparition: null, lien: '' });
      },
      error: (e) => console.error('createPublication error', e)
    });
  }

  deletePublication(pubId: any): void {
    const id = Number(pubId);
    if (!id) return;

    // ⚠️ deletes publication globally too
    if (!confirm('This will delete the publication (global). Continue?')) return;

    this.links.deleteMemberPub(this.memberId, id).subscribe({
      next: () => this.loadPubs(),
      error: (e) => console.error('deletePublication error', e)
    });
  }
}
