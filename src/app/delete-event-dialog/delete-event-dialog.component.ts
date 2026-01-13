import { Component } from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-delete-event',
  templateUrl: './delete-event-dialog.component.html',
  styleUrls: ['./delete-event-dialog.component.css']
})
export class DeleteEventDialogComponent {
  constructor(public dialogRef: MatDialogRef<DeleteEventDialogComponent>) { }

}
