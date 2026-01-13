import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { Publication } from '../../Models/Publication';
import { PublicationsService } from '../../Services/PublicationsService';
import {ModalPublicationComponent} from "../modal-publication/modal-publication.component";
import {DeletePublicationDialogComponent} from "../delete-publication-dialog/delete-publication-dialog.component";


@Component({
  selector: 'app-publication',
  templateUrl: './publication.component.html',
  styleUrls: ['./publication.component.css']
})
export class PublicationComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['id', 'titre', 'type', 'date', 'actions'];
  dataSource = new MatTableDataSource<Publication>([]);

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private PS: PublicationsService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.load();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  load(): void {
    this.PS.getAllPublications().subscribe({
      next: (data) => this.dataSource.data = data,
      error: (err) => console.error(err)
    });
  }

  applyFilter(event: Event): void {
    const v = (event.target as HTMLInputElement).value;
    this.dataSource.filter = v.trim().toLowerCase();
    if (this.dataSource.paginator) this.dataSource.paginator.firstPage();
  }

  // CREATE
  openCreate(): void {
    const ref = this.dialog.open(ModalPublicationComponent, { width: '520px' });

    ref.afterClosed().subscribe(payload => {
      if (!payload) return;

      this.PS.createPublication(payload).subscribe({
        next: () => this.load(),
        error: (err) => { console.error(err); alert('Create failed'); }
      });
    });
  }

  // EDIT
  openEdit(row: Publication): void {
    const ref = this.dialog.open(ModalPublicationComponent, {
      width: '520px',
      data: { id: row.id }
    });

    ref.afterClosed().subscribe(payload => {
      if (!payload) return;

      this.PS.updatePublication(payload.id, payload).subscribe({
        next: () => this.load(),
        error: (err) => { console.error(err); alert('Update failed'); }
      });
    });
  }

  // DELETE (same style as Member -> Dialog)
  deletePublication(row: Publication): void {
    const ref = this.dialog.open(DeletePublicationDialogComponent, {
      width: '420px',
      disableClose: true,
      data: { titre: row.titre }
    });

    ref.afterClosed().subscribe(result => {
      if (!result) return;

      this.PS.deletePublication(String(row.id)).subscribe({
        next: () => this.load(),
        error: (err) => { console.error(err); alert('Delete failed'); }
      });
    });
  }
}
