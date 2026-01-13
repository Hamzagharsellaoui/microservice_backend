import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {ToolsService} from "../tools.service";

@Component({
  selector: 'app-modal-tool',
  templateUrl: './modal-tools.component.html',
  styleUrls: ['./modal-tools.component.css']
})
export class ModalToolsComponent implements OnInit {

  form!: FormGroup;
  isEdit = false;

  constructor(
    private TS: ToolsService,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<ModalToolsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.isEdit = !!(this.data && this.data.id);

    this.form = this.fb.group({
      source: ['', Validators.required],
      date: [null, Validators.required],
    });

    // EDIT MODE
    if (this.isEdit) {
      this.TS.getToolById(this.data.id).subscribe(tool => {
        this.form.patchValue({
          source: tool.source,
          date: tool.date ? new Date(tool.date) : null
        });
      });
    }
  }

  save(): void {
    if (this.form.invalid) return;

    const payload = {
      source: this.form.value.source,
      date: new Date(this.form.value.date).toISOString()
    };

    this.dialogRef.close(
      this.isEdit ? { id: this.data.id, ...payload } : payload
    );
  }

  close(): void {
    this.dialogRef.close(null);
  }
}
