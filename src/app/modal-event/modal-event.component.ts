import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { EventsService } from '../../Services/eventsService';

@Component({
  selector: 'app-modal-evnt',
  templateUrl: './modal-event.component.html',
  styleUrls: ['./modal-event.component.css']
})
export class ModalEventComponent implements OnInit {

  form!: FormGroup;
  isEdit = false;

  constructor(
    private ES: EventsService,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<ModalEventComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.isEdit = !!(this.data && this.data.id);

    this.form = this.fb.group({
      titre: ['', Validators.required],
      date: [null, Validators.required],
      lieu: ['', Validators.required],
    });

    if (this.isEdit) {
      this.ES.getEventById(this.data.id).subscribe(evnt => {
        this.form.patchValue({
          titre: evnt.titre,
          date: evnt.date ? new Date(evnt.date) : null,
          lieu: evnt.lieu
        });
      });
    }
  }

  save(): void {
    if (this.form.invalid) return;

    const v = this.form.value;

    const payload = {
      titre: this.form.value.titre,
      date: new Date(this.form.value.date).toISOString(),
      lieu: this.form.value.lieu
    };

    this.dialogRef.close(
      this.isEdit ? { id: this.data.id, ...payload } : payload
    );
  }



  close(): void {
    this.dialogRef.close(null);
  }
}
