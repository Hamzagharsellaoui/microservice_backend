import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';

import { EventModel } from '../../Models/EventModel';
import { EventsService } from '../../Services/eventsService';
import { ModalEventComponent } from '../modal-event/modal-event.component';
import {DeleteEventDialogComponent} from "../delete-event-dialog/delete-event-dialog.component";
import {ConfirmDialogComponent} from "../confirm-dialog/confirm-dialog.component";

@Component({
  selector: 'app-evnt',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EvntComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['id', 'titre', 'date', 'lieu', 'actions'];
  dataSource = new MatTableDataSource<EventModel>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private ES: EventsService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.load();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  load(): void {
    this.ES.getAllEvents().subscribe(events => {
      this.dataSource.data = events;
    });
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  // CREATE
  openCreate(): void {
    const ref = this.dialog.open(ModalEventComponent, { width: '520px' });

    ref.afterClosed().subscribe(payload => {
      if (!payload) return;

      this.ES.createEvent(payload).subscribe({
        next: () => this.load(),
        error: (err) => { console.error(err); alert('Create failed'); }
      });
    });
  }

  openEdit(row: EventModel): void {
    const ref = this.dialog.open(ModalEventComponent, {
      width: '520px',
      data: { id: row.id }
    });

    ref.afterClosed().subscribe(payload => {
      if (!payload) return;

      this.ES.updateEvent(payload.id, payload).subscribe({
        next: () => this.load(),
        error: (err) => { console.error(err); alert('Update failed'); }
      });
    });
  }

  delete(row: number): void {
    console.log('Deleting row:', row);
    const dialogRef = this.dialog.open(DeleteEventDialogComponent, {
      width: '420px',
      disableClose: true,
      }
    );

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.ES.deleteEvent(row).subscribe({
          next: () => this.load(),
          error: (err) => { console.error(err); alert('Delete failed'); }
        });
      }
    });
  }
}
