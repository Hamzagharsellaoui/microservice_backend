import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-publication-dialog',
  templateUrl: './delete-publication-dialog.component.html',
  styleUrls: ['./delete-publication-dialog.component.css']

})
export class DeletePublicationDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
}
