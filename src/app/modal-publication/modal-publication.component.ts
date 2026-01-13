import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { PublicationsService } from '../../Services/PublicationsService';

@Component({
  selector: 'app-modal-publication',
  templateUrl: './modal-publication.component.html',
  styleUrls: ['./modal-publication.component.css']
})
export class ModalPublicationComponent implements OnInit {

  form!: FormGroup;
  isEdit = false;

  constructor(
    private PS: PublicationsService,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<ModalPublicationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.isEdit = !!(this.data && this.data.id);

    this.form = this.fb.group({
      titre: ['', Validators.required],
      type: ['', Validators.required],
      date: [null, Validators.required],
      lien: [''] // optional
    });

    if (this.isEdit) {
      this.PS.getPublicationById(this.data.id).subscribe(pub => {
        this.form.patchValue({
          titre: pub.titre ?? '',
          type: pub.type ?? '',
          date: pub.date ? new Date(pub.date) : null,
          lien: pub.lien ?? ''
        });
      });
    }
  }

  save(): void {
    if (this.form.invalid) return;

    const payload = {
      titre: this.form.value.titre,
      type: this.form.value.type,
      date: new Date(this.form.value.date).toISOString(),
      lien: this.form.value.lien
    };

    this.dialogRef.close(
      this.isEdit ? { id: this.data.id, ...payload } : payload
    );
  }

  close(): void {
    this.dialogRef.close(null);
  }
}
