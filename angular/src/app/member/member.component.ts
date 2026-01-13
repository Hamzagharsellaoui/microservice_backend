import { Component, OnInit } from '@angular/core';
// @ts-ignore
import { MemberService } from 'src/Services/member.service';

@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  styleUrls: ['./member.component.css']
})
export class MemberComponent implements OnInit{

  title = "Projet LAB";

  //injection de dep: cree un instance prive du service dans le composant/autre service dans le constructeur a condition le service a decorateur @Injectable
constructor(private MS:MemberService){}
  dataSource: any[] = [];

//injecter MemberService GETAllMembers
//a la reception =>remplir le tab dataSource

//lance automatiquement quand on charge le composant
ngOnInit(): void {
  //x:tableu de membre (var locale)
  this.MS.GETALLMembers().subscribe((x)=>{this.dataSource=x})
}

  displayedColumns: string[] = ['id', 'cin', 'name', 'type', 'cv', 'createdDate','actions'];

   editMember(member: any) {
    console.log('Edit member:', member);
    // You can open a dialog or navigate to an edit form here
  }

  deleteMember(member: any) {
    console.log('Delete member:', member);
    this.dataSource = this.dataSource.filter(m => m.id !== member.id);
  }
}
