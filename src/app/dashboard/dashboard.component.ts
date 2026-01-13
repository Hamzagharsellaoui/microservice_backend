import { Component, OnInit } from '@angular/core';
import { ChartDataset, ChartOptions } from 'chart.js';
import { MemberService } from "../../Services/member.service";
import { EventsService } from "../../Services/eventsService";
import { ToolsService } from "../tools.service";
import { PublicationsService } from "../../Services/PublicationsService";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  teachers: any[] = [];

  Nb_Members = 0;
  Nb_Events = 0;
  Nb_Tools = 0;
  Nb_Publications = 0;

  countStudents = 0;
  countTeachers = 0;

  namesArray: string[] = [];
  nameLengths: number[] = [];

  chartDataPie: ChartDataset[] = [];
  chartLabelsPie: string[] = ['Students', 'Teachers'];
  chartOptionsPie: ChartOptions = {
    responsive: true,
    plugins: { legend: { position: 'top' } }
  };

  chartDataLine: ChartDataset[] = [];
  chartLabelsLine: string[] = [];
  chartOptionsLine: ChartOptions = {
    responsive: true,
    plugins: { legend: { position: 'bottom' } }
  };

  constructor(
    private MS: MemberService,
    private ES: EventsService,
    private TS: ToolsService,
    private PS: PublicationsService
  ) {}

  ngOnInit(): void {
    this.loadMembers();
    this.loadStats();
  }

  // ================= MEMBERS =================
  loadMembers(): void {
    this.MS.getAllMembers().subscribe(res => {

      // reset
      this.Nb_Members = res.length;
      this.countStudents = 0;
      this.countTeachers = 0;
      this.namesArray = [];
      this.nameLengths = [];
      this.teachers = [];

      res.forEach(member => {
        const type = member?.type?.toString()?.toUpperCase();

        if (type === 'ETUDIANT' || type === 'ETD') {
          this.countStudents++;
        }

        if (type === 'ENSEIGNANT' || type === 'ENS') {
          this.countTeachers++;
          this.teachers.push(member);
        }

        this.namesArray.push(member.nom);
        this.nameLengths.push(member.nom.length);
      });

      // PIE
      this.chartDataPie = [
        {
          label: 'Members distribution',
          data: [this.countStudents, this.countTeachers]
        }
      ];

      // LINE
      this.chartLabelsLine = this.namesArray;
      this.chartDataLine = [
        {
          label: 'Name length',
          data: this.nameLengths
        }
      ];
    });
  }


  loadStats(): void {
    this.ES.getAllEvents().subscribe(res => this.Nb_Events = res.length);
    this.TS.getAllTools().subscribe(res => this.Nb_Tools = res.length);
    this.PS.getAllPublications().subscribe(res => this.Nb_Publications = res.length);
  }
}
