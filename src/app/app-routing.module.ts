import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsersComponent } from './users/users.component';
import { TicketsComponent } from './tickets/tickets.component';

const routes: Routes = [
	{
		path: 'users',
		component: UsersComponent
	},
	{
		path: 'tickets/:user',
		component: TicketsComponent
	}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
