import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { delay } from 'rxjs/operators';
import { User } from '../app/Model/ITicketType';
import { Status } from '../app/Model/ITicketType';
import { Task } from '../app/Model/ITicketType';
import { Ticket } from '../app/Model/ITicketType';

@Injectable({
	providedIn: 'root'
})
export class TicketService {

	constructor(private http: HttpClient) { }

	getTicketList(): Observable<[User[], Ticket[], Task[], Status[]]> {

		let response1 = this.http.get<User[]>('http://localhost:3000/user');
		let response2 = this.http.get<Ticket[]>('http://localhost:3000/ticket');
		let response3 = this.http.get<Task[]>('http://localhost:3000/type');
		let response4 = this.http.get<Status[]>('http://localhost:3000/status');
		return forkJoin([response1, response2, response3, response4]).pipe(delay(100));
	}
}
