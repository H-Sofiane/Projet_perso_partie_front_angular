export class Contact { 

	id: number;
	nom: string;
	prenom: string;
	dateNaissance: Date;
	email: string;
	tel: string;
	photo: string;

	constructor(id: number, nom: string, prenom: string, dateNaissance: Date, email: string, tel: string, photo: string) {
		this.id = id;
		this.nom = nom;
		this.prenom = prenom;
		this.dateNaissance = dateNaissance;
		this.email = email;
		this.tel = tel;
		this.photo = photo;
	}
}