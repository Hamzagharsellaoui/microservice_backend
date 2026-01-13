import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MemberComponent } from './member/member.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatTableModule} from '@angular/material/table';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { MemberFormComponent } from './member-form/member-form.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import {MatDialogModule} from "@angular/material/dialog";
import { TemplateComponent } from './template/template.component';
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatListModule} from "@angular/material/list";
import {MatMenuModule} from "@angular/material/menu";
import { LoginComponent } from './login/login.component';
import {AngularFireModule} from "@angular/fire/compat";
import {AngularFireAuthModule} from "@angular/fire/compat/auth";
import {MatSortModule} from "@angular/material/sort";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule, MatOptionModule} from "@angular/material/core";
import {NgChartsModule} from "ng2-charts";
import { DashboardComponent } from './dashboard/dashboard.component';
import {MatCardModule} from "@angular/material/card";
import {MatSelectModule} from "@angular/material/select";
import {MatChipsModule} from "@angular/material/chips";
import { MemberDetailsComponent } from './member-details/member-details.component';
import {MatTabsModule} from "@angular/material/tabs";
import {ToolsComponent} from "./tools/tools.component";
import {PublicationComponent} from "./publication/publication.component";
import {EvntComponent} from "./events/events.component";
import {ModalEventComponent} from "./modal-event/modal-event.component";
import {DeleteEventDialogComponent} from "./delete-event-dialog/delete-event-dialog.component";
import {ModalToolsComponent} from './modal-tools/modal-tools.component';
import {DeleteToolDialogComponent} from "./delete-tool-dialog/delete-tool-dialog.component";
import { ModalPublicationComponent } from './modal-publication/modal-publication.component';
import { DeletePublicationDialogComponent } from './delete-publication-dialog/delete-publication-dialog.component';
import {firebaseConfig} from "./environement";

@NgModule({
  declarations: [
    AppComponent,
    MemberComponent,
    MemberFormComponent,
    ConfirmDialogComponent,
    TemplateComponent,
    LoginComponent,
    ModalEventComponent,
    DashboardComponent,
    MemberDetailsComponent,
    ToolsComponent,
    PublicationComponent,
    EvntComponent,
    DeleteEventDialogComponent,
    ModalToolsComponent,
    DeleteToolDialogComponent,
    ModalPublicationComponent,
    DeletePublicationDialogComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatMenuModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    MatSortModule,
    MatPaginatorModule,
    MatDatepickerModule,
    MatDatepickerModule,
    MatNativeDateModule,
    NgChartsModule,
    MatCardModule,
    MatOptionModule,
    MatSelectModule,
    MatChipsModule,
    MatTabsModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
