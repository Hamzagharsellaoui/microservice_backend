import {Component, OnInit} from '@angular/core';
import {ConfirmDialogComponent} from "../confirm-dialog/confirm-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {MemberService} from "../../Services/member.service";

@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.css']
})
export class MemberComponent implements OnInit {

  title = "Projet LAB";

  constructor(private MS: MemberService, private dialog: MatDialog) {
  }

  dataSource: any[] = [];

  ngOnInit(): void {
    this.MS.getAllMembers().subscribe((x) => {
      this.dataSource = x
    })
  }

  displayedColumns: string[] = ['id', 'cin', 'nom', 'type', 'cv', 'createdDate', 'actions'];




  delete(id: string) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '420px',
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.MS.deleteMember(id).subscribe(() => {
          this.MS.getAllMembers().subscribe((x) => {
            this.dataSource = x
          })
        })
      }
    });
  }
}
