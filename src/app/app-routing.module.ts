import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MemberFormComponent} from './member-form/member-form.component';
import {MemberComponent} from './member/member.component';
import {LoginComponent} from "./login/login.component";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {AuthGuard} from "./AuthGuard";
import {MemberDetailsComponent} from "./member-details/member-details.component";
import {ToolsComponent} from "./tools/tools.component";
import {PublicationComponent} from "./publication/publication.component";
import {EvntComponent} from "./events/events.component";
import {ModalEventComponent} from "./modal-event/modal-event.component";
import {ModalToolsComponent} from "./modal-tools/modal-tools.component";

const routes: Routes = [

  {path: 'login', component: LoginComponent},
  {path: 'member', component: MemberComponent, canActivate: [AuthGuard]},
  {path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]},
  {path: 'events', component: EvntComponent, canActivate: [AuthGuard]},
  {path: 'publications', component: PublicationComponent, canActivate: [AuthGuard]},
  {path: 'createEvents', component: ModalEventComponent, canActivate: [AuthGuard]},
  {path: 'tools', component: ToolsComponent, canActivate: [AuthGuard]},
  {path: 'createTools', component: ModalToolsComponent, canActivate: [AuthGuard]},
  {path: 'create', component: MemberFormComponent, canActivate: [AuthGuard]},
  {path: ':id/edit', component: MemberFormComponent, canActivate: [AuthGuard]},
  {path: ':id/details', component: MemberDetailsComponent, canActivate: [AuthGuard]},
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: '**', redirectTo: 'login'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
