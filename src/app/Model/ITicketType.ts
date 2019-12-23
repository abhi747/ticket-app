

export interface User {
	id: number,
    name: string,
    status: number
}
export interface Status {
	id: number,
    name: string,
    friendlyName: string
}
export interface Task {
	id: number,
    name: string,
    friendlyName: string
}
export interface Ticket {
	id: number,
	description:string,
	assignee:number,
	type:number,
	status:number
}








