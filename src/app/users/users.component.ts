import { Component, OnInit } from '@angular/core';
import { TicketService } from '../ticket.service'

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
	users = [];
	user = '';
  constructor(
		private _ticketService: TicketService) { }

  ngOnInit() {
		this._ticketService.getTicketList().subscribe( users => {
			this.users = users[0];
		}
			)
  }

}
