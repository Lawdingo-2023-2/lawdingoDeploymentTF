import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersComponent } from './users/users.component';
import { UsersCreaeditaComponent } from './users/users-creaedita/users-creaedita.component';
import { CategoryComponent } from './category/category.component';
import { CategoryCreaeditaComponent } from './category/category-creaedita/category-creaedita.component';
import { DistrictComponent } from './district/district.component';
import { DistrictCreaeditaComponent } from './district/district-creaedita/district-creaedita.component';
import { RoleComponent } from './role/role.component';
import { RoleCreaeditaComponent } from './role/role-creaedita/role-creaedita.component';
import { ConsultationComponent } from './consultation/consultation.component';
import { ConsultationCreaeditaComponent } from './consultation/consultation-creaedita/consultation-creaedita.component';
import { DocumentationComponent } from './documentation/documentation.component';
import { CreaeditaDocumentationComponent } from './documentation/creaedita-documentation/creaedita-documentation.component';
import { ProceedingComponent } from './proceeding/proceeding.component';
import { ProceedingCreaeditaComponent } from './proceeding/proceeding-creaedita/proceeding-creaedita.component';
import { CourtComponent } from './court/court.component';
import { CourtCreaeditaComponent } from './court/court-creaedita/court-creaedita.component';
import { CommentComponent } from './comment/comment.component';
import { CommentCreaeditaComponent } from './comment/comment-creaedita/comment-creaedita.component';
import { CertificationComponent } from './certification/certification.component';
import { CertificationCreaeditaComponent } from './certification/certification-creaedita/certification-creaedita.component';
import { SubscriptionCreaeditaComponent } from './subscription/subscription-creaedita/subscription-creaedita.component';
import { SubscriptionComponent } from './subscription/subscription.component';
import { NotificationComponent } from './notification/notification.component';
import { NotificationCreaeditaComponent } from './notification/notification-creaedita/notification-creaedita.component';
import { ProceedingSummaryComponent } from './proceeding/proceeding-summary/proceeding-summary.component';

const routes: Routes = [
  {
    path: 'users',
    component: UsersComponent,
    children: [
      { path: 'nuevo', component: UsersCreaeditaComponent },
      { path: 'ediciones/:id', component: UsersCreaeditaComponent },
    ],
  },
  {
    path: 'categories',
    component: CategoryComponent,
    children: [
      { path: 'nuevo', component: CategoryCreaeditaComponent },
      { path: 'ediciones/:id', component: CategoryCreaeditaComponent },
    ],
  },
  {
    path: 'districts',
    component: DistrictComponent,
    children: [
      { path: 'nuevo', component: DistrictCreaeditaComponent },
      { path: 'ediciones/:id', component: DistrictCreaeditaComponent },
    ],
  },
  {
    path: 'roles',
    component: RoleComponent,
    children: [
      { path: 'nuevo', component: RoleCreaeditaComponent },
      { path: 'ediciones/:id', component: RoleCreaeditaComponent },
    ],
  },
  {
    path: 'consultations',
    component: ConsultationComponent,
    children: [
      { path: 'nuevo', component: ConsultationCreaeditaComponent },
      { path: 'ediciones/:id', component: ConsultationCreaeditaComponent },
    ],
  },
  {
    path: 'documentations',
    component: DocumentationComponent,
    children: [
      { path: 'nuevo', component: CreaeditaDocumentationComponent },
      { path: 'ediciones/:id', component: CreaeditaDocumentationComponent },
    ],
  },

  {
    path: 'subscriptions',
    component: SubscriptionComponent,
    children: [
      { path: 'nuevo', component: SubscriptionCreaeditaComponent },
      { path: 'ediciones/:id', component: SubscriptionCreaeditaComponent },
    ],
  },


  {
    path: 'proceedings',
    component: ProceedingComponent,
    children: [
      { path: 'nuevo', component: ProceedingCreaeditaComponent },
      { path: 'ediciones/:id', component: ProceedingCreaeditaComponent },
      { path: 'summary', component: ProceedingSummaryComponent },
    ],
  },
  {
    path: 'courts',
    component: CourtComponent,
    children: [
      { path: 'nuevo', component: CourtCreaeditaComponent },
      { path: 'ediciones/:id', component: CourtCreaeditaComponent },

    ],
  },
  {
    path: 'comments',
    component: CommentComponent,
    children: [
      { path: 'nuevo', component: CommentCreaeditaComponent },
      { path: 'ediciones/:id', component: CommentCreaeditaComponent },
    ],
  },
  {
    path: 'certification',
    component: CertificationComponent,
    children: [
      { path: 'nuevo', component: CertificationCreaeditaComponent },
      { path: 'ediciones/:id', component: CertificationCreaeditaComponent },
    ],
  },

  {
    path: 'notification',
    component: NotificationComponent,
    children: [
      { path: 'nuevo', component: NotificationCreaeditaComponent },
      { path: 'ediciones/:id', component: NotificationCreaeditaComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ComponentRoutingModule { }
