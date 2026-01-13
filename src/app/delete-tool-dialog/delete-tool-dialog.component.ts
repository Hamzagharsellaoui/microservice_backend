import { Component } from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-delete-event',
  templateUrl: './delete-tool-dialog.component.html',
  styleUrls: ['./delete-tool-dialog.component.css']
})
export class DeleteToolDialogComponent {
  constructor(public dialogRef: MatDialogRef<DeleteToolDialogComponent>) { }

}
