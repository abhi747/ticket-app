import { Component, OnInit } from '@angular/core';
import { TicketService } from '../ticket.service';
import {User} from '../Model/ITicketType';
import {Status} from '../Model/ITicketType';
import {Task} from '../Model/ITicketType';
import {Ticket} from '../Model/ITicketType';



const statusConst = {
	Completed: 1,
	InProgress: 2,
	NotStarted: 3
}

@Component({
	selector: 'app-tickets',
	templateUrl: './tickets.component.html',
	styleUrls: ['./tickets.component.scss']
})
export class TicketsComponent implements OnInit {
	ticketOrStatusClicked: number;
	hideTickets = false;
	tickets: Array<any>;
	filteredTickets: Array<any>;
	tempStatus: number;
	determinationFlag: boolean;
	calledFromFunc: boolean = false;


	public responseDataUser: any;
	public responseDataTicket: any;
	public responseDataType: any;
	public responseDataStatus: any;
	public filter: any[] = [];

	userStatus = "None";
	constructor(private _ticketService: TicketService) {

		this.filter = [
			{ "type": 'Task', 'id': 1 },
			{ "type": 'Bug', 'id': 2 },
			{ "type": 'Completed', 'id': 3 },
			{ "type": 'In Progress', 'id': 4 },
			{ "type": 'Not Started', 'id': 5 }]
	}

	ngOnInit() {


		this._ticketService.getTicketList()
			.subscribe(([users, tickets, tasks, status]: [User[], Ticket[], Task[], Status[]]) => {
			this.responseDataUser = users;
			this.responseDataTicket = tickets;
			this.responseDataType = tasks;
			this.responseDataStatus = status;

			this.tickets = this.responseDataTicket;
			this.filteredTickets = [...this.tickets];

			this.CheckStatusEqualsTickets();
		})
	}

	/* Change status of select */
	changeStatus(status, id) {

		this.tempStatus = this.tickets.filter(item => item.id == id)[0].status;

		const targetIdx = this.tickets.map(item => item.id).indexOf(id);
		this.tickets[targetIdx].status = +status;

		if (this.determinationFlag == undefined)
			this.filteredTickets = this.tickets;
		else if (this.determinationFlag) {
			this.calledFromFunc = true;
			this.filterTickets(this.tickets.filter(item => item.id == id)[0].type);
		}
		else
			this.moveTickets(this.tempStatus);

		this.CheckStatusEqualsTickets();
	}

	/* To Move tickets to which were changed */
	moveTickets(status: number) {
		this.filteredTickets = this.tickets.filter(x => x.status == status);
	}

	/* To filter on click of Ticked Types or Ticket Status */
	filterTickets(type: number) {
		if (this.calledFromFunc) {
			this.filteration(type)
			this.calledFromFunc = false;
		}
		else if (this.ticketOrStatusClicked !== type) {
			this.filteration(type)
		} else {
			this.hideTickets = true;
		}

	}

	filteration(type: number) {
		this.hideTickets = false;
		this.ticketOrStatusClicked = type;
		this.determinationFlag = type <= 2 ? true : false;
		this.filteredTickets = type > 2 ? this.tickets.filter(x => x.status == type - 2) : this.tickets.filter(x => x.type == type);
		this.CheckStatusEqualsTickets();
	}

	/* To Check count of tickets based on status */
	CheckStatusEqualsTickets() {
		this.tickets.every(x => x.status == statusConst.Completed) ? this.userStatus = "Completed" :
			(this.tickets.every(x => x.status == statusConst.NotStarted) ? this.userStatus = "NotStarted" :
				(this.tickets.some(x => x.status == statusConst.NotStarted) ? this.userStatus = "Inprogress" : this.userStatus = "Inprogress"));
	}

	/* To get count of tickets based on Types/Status */
	getCount(type: number) {
		return type > 2 ? this.tickets.filter(x => x.status == type - 2).length : this.tickets.filter(x => x.type == type).length
	}
}

