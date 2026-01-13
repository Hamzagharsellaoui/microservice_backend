import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {ToolsService} from "../tools.service";
import {Outil} from "../../Models/Outil";
import {ModalEventComponent} from "../modal-event/modal-event.component";
import {ModalToolsComponent} from "../modal-tools/modal-tools.component";
import {EventModel} from "../../Models/EventModel";
import {DeleteEventDialogComponent} from "../delete-event-dialog/delete-event-dialog.component";
import {DeleteToolDialogComponent} from "../delete-tool-dialog/delete-tool-dialog.component"; // you already have Outil interface


@Component({
  selector: 'app-tools',
  templateUrl: './tools.component.html',
  styleUrls: ['./tools.component.css']
})
export class ToolsComponent implements OnInit {

  memberId!: number;
  displayedColumns: string[] = ['id', 'source', 'date', 'actions'];
  dataSource: Outil[] = [];

  constructor(
    private route: ActivatedRoute,
    private TS: ToolsService,
    private dialog: MatDialog
  ) {
  }

  ngOnInit(): void {
    this.memberId = Number(this.route.snapshot.paramMap.get('memberId'));
    this.load();
  }

  load(): void {
    this.TS.getAllTools().subscribe({
      next: (data) => this.dataSource = data,
      error: (err) => console.error(err)
    });
  }

  openCreate(): void {
    const ref = this.dialog.open(ModalToolsComponent, {width: '520px'});

    ref.afterClosed().subscribe(payload => {
      if (!payload) return;

      this.TS.createTool(payload).subscribe({
        next: () => this.load(),
        error: (err) => {
          console.error(err);
          alert('Create failed');
        }
      });
    });
  }

  openEdit(row: EventModel): void {
    const ref = this.dialog.open(ModalToolsComponent, {
      width: '520px',
      data: {id: row.id}
    });

    ref.afterClosed().subscribe(payload => {
      if (!payload) return;

      this.TS.updateTool(payload.id, payload).subscribe({
        next: () => this.load(),
        error: (err) => {
          console.error(err);
          alert('Update failed');
        }
      });
    });
  }

  delete(row: number): void {
    console.log('Deleting row:', row);
    const dialogRef = this.dialog.open(DeleteToolDialogComponent, {
        width: '420px',
        disableClose: true,
      }
    );

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.TS.deleteTool(row).subscribe({
          next: () => this.load(),
          error: (err) => {
            console.error(err);
            alert('Delete failed');
          }
        });
      }
    });
  }
}

