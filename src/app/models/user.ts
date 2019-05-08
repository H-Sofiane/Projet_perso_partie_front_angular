export class User {

	id: number;
	username: string;
	photo: string;

	constructor(id: number, username: string, photo: string) {
		this.id = id;
		this.username = username;
		this.photo = photo;
	}
}