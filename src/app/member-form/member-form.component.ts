import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MemberService } from '../../Services/member.service';

@Component({
  selector: 'app-member-form',
  templateUrl: './member-form.component.html',
  styleUrls: ['./member-form.component.css']
})
export class MemberFormComponent implements OnInit {

  form!: FormGroup;
  idCourant?: string;

  // ✅ for template
  isEdit = false;
  submitting = false;

  // ✅ teachers list for select
  teachers: any[] = [];

  constructor(
    private MS: MemberService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.idCourant = this.activatedRoute.snapshot.params['id'];
    this.isEdit = !!this.idCourant;

    this.form = new FormGroup({
      cin: new FormControl('', [Validators.required]),
      nom: new FormControl('', [Validators.required]),
      type: new FormControl('ETUDIANT', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      createdDate: new FormControl(new Date().toISOString()),

      cv: new FormControl(''),
      dateInscription: new FormControl(''),
      diplome: new FormControl(''),
      grade: new FormControl(''),
      etablissement: new FormControl(''),

      encadrantId: new FormControl(null) // required only when ETUDIANT
    });

    this.loadTeachers();

    this.form.get('type')?.valueChanges.subscribe((t) => {
      const enc = this.form.get('encadrantId');
      if (!enc) return;

      if (t === 'ETUDIANT') {
        enc.setValidators([Validators.required]);
      } else {
        enc.clearValidators();
        enc.setValue(null);
      }
      enc.updateValueAndValidity();
    });

    if (this.idCourant) {
      this.MS.getMemberById(this.idCourant).subscribe((a: any) => {
        this.form.patchValue(a);

        // in case existing student => ensure validator applied
        if (this.form.value.type === 'ETUDIANT') {
          this.form.get('encadrantId')?.setValidators([Validators.required]);
          this.form.get('encadrantId')?.updateValueAndValidity();
        }
      });
    }
  }

  loadTeachers(): void {
    this.MS.getAllMembers().subscribe({
      next: (data: any[]) => {
        const all = data || [];
        this.teachers = all.filter(m =>
          (m?.type?.toString?.().toLowerCase?.() === 'ens')
        );
      },
      error: (err) => console.error('Teachers load error', err)
    });
  }



  sub(): void {
    if (this.form.invalid) return;

    this.submitting = true;

    const type = this.form.value.type;

    // ✅ payload: inclut encadrantId (id de l'enseignant choisi)
    const payload = {
      ...this.form.value,
      encadrantId: this.form.get('encadrantId')?.value
    };

    console.log('PAYLOAD SENT (ETUDIANT):', payload);

    // UPDATE
    if (this.idCourant) {
      const req$ = (type === 'ETUDIANT')
        ? this.MS.updateEtudiant(this.idCourant, payload)      // ✅ send encadrantId
        : this.MS.updateEnseignant(this.idCourant, payload);

      req$.subscribe({
        next: () => this.router.navigate(['/member']),
        error: (err) => { console.error(err); alert('Update failed'); },
        complete: () => this.submitting = false
      });
      return;
    }

    // CREATE
    const req$ = (type === 'ETUDIANT')
      ? this.MS.addEtudiant(payload)       // ✅ send encadrantId
      : this.MS.addEnseignant(payload);

    req$.subscribe({
      next: () => this.router.navigate(['/member']),
      error: (err) => { console.error(err); alert('Create failed'); },
      complete: () => this.submitting = false
    });
  }
}
