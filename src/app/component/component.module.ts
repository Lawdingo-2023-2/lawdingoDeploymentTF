import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {MatTableModule} from '@angular/material/table'
import {MatPaginatorModule} from '@angular/material/paginator'
import {FormsModule, ReactiveFormsModule} from '@angular/forms'
import {MatSelectModule} from '@angular/material/select'
import {MatDatepickerModule} from '@angular/material/datepicker'
import {MatNativeDateModule} from '@angular/material/core'
import {MatButtonModule} from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import{MatIconModule} from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatListModule } from '@angular/material/list';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatSidenavModule} from '@angular/material/sidenav';

import { ComponentRoutingModule } from './component-routing.module';
import { UsersComponent } from './users/users.component';
import { UsersCreaeditaComponent } from './users/users-creaedita/users-creaedita.component';
import { UsersListarComponent } from './users/users-listar/users-listar.component';
import { CategoryCreaeditaComponent } from './category/category-creaedita/category-creaedita.component';
import { CategoryComponent } from './category/category.component';
import { CategoryListarComponent } from './category/category-listar/category-listar.component';
import { RoleComponent } from './role/role.component';
import { RoleListarComponent } from './role/role-listar/role-listar.component';
import { RoleCreaeditaComponent } from './role/role-creaedita/role-creaedita.component';
import { ConsultationComponent } from './consultation/consultation.component';
import { ConsultationCreaeditaComponent } from './consultation/consultation-creaedita/consultation-creaedita.component';
import { ConsultationListarComponent } from './consultation/consultation-listar/consultation-listar.component';
import { SubscriptionComponent } from './subscription/subscription.component';
import { SubscriptionCreaeditaComponent } from './subscription/subscription-creaedita/subscription-creaedita.component';
import { SubscriptionListarComponent } from './subscription/subscription-listar/subscription-listar.component';
import { CommentComponent } from './comment/comment.component';
import { CommentCreaeditaComponent } from './comment/comment-creaedita/comment-creaedita.component';
import { CommentListarComponent } from './comment/comment-listar/comment-listar.component';
import { ProceedingComponent } from './proceeding/proceeding.component';
import { ProceedingCreaeditaComponent } from './proceeding/proceeding-creaedita/proceeding-creaedita.component';
import { ProceedingListarComponent } from './proceeding/proceeding-listar/proceeding-listar.component';
import { DistrictComponent } from './district/district.component';
import { DistrictListarComponent } from './district/district-listar/district-listar.component';
import { DistrictCreaeditaComponent } from './district/district-creaedita/district-creaedita.component';

import { DocumentationComponent } from './documentation/documentation.component';
import { ListarDocumentationComponent } from './documentation/listar-documentation/listar-documentation.component';
import { CreaeditaDocumentationComponent } from './documentation/creaedita-documentation/creaedita-documentation.component';
import { CourtComponent } from './court/court.component';
import { CourtListarComponent } from './court/court-listar/court-listar.component';
import { CourtCreaeditaComponent } from './court/court-creaedita/court-creaedita.component';
import { CertificationListarComponent } from './certification/certification-listar/certification-listar.component';
import { CertificationComponent } from './certification/certification.component';
import { CertificationCreaeditaComponent } from './certification/certification-creaedita/certification-creaedita.component';
import { LandingComponent } from './landing/landing.component';
import { NotificationComponent } from './notification/notification.component';
import { NotificationListarComponent } from './notification/notification-listar/notification-listar.component';
import { NotificationCreaeditaComponent } from './notification/notification-creaedita/notification-creaedita.component';
import { ProceedingSummaryComponent } from './proceeding/proceeding-summary/proceeding-summary.component';
import { NgChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [
    UsersComponent,
    UsersCreaeditaComponent,
    UsersListarComponent,
    CategoryCreaeditaComponent,
    CategoryComponent,
    CategoryListarComponent,
    RoleComponent,
    RoleListarComponent,
    RoleCreaeditaComponent,
    ConsultationComponent,
    ConsultationCreaeditaComponent,
    ConsultationListarComponent,
    SubscriptionComponent,
    SubscriptionCreaeditaComponent,
    SubscriptionListarComponent,
    CommentComponent,
    CommentCreaeditaComponent,
    CommentListarComponent,
    ProceedingComponent,
    ProceedingCreaeditaComponent,
    ProceedingListarComponent,
    DistrictComponent,
    DistrictListarComponent,
    DistrictCreaeditaComponent,
   
    DocumentationComponent,
    ListarDocumentationComponent,
    CreaeditaDocumentationComponent,
    CourtComponent,
    CourtListarComponent,
    CourtCreaeditaComponent,
    CertificationListarComponent,
    CertificationComponent,
    CertificationCreaeditaComponent,
    LandingComponent,
    NotificationComponent,
    NotificationListarComponent,
    NotificationCreaeditaComponent,
    ProceedingSummaryComponent,
  ],
  imports: [
    CommonModule,
    ComponentRoutingModule,
    MatTableModule,
    MatPaginatorModule,
    FormsModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    ReactiveFormsModule,

    MatIconModule,
    MatMenuModule,
    MatToolbarModule,
    MatInputModule,
    MatFormFieldModule,
    MatListModule,
    MatSidenavModule,
    MatSnackBarModule,
    NgChartsModule
  ]
})
export class ComponentModule { }
