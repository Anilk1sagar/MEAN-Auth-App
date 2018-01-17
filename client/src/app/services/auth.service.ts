import { Injectable } from '@angular/core';
import { Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import { tokenNotExpired } from 'angular2-jwt';

@Injectable()
export class AuthService {

	authToken: any;
	user: any;

	constructor(private http:Http) { }

	// Register User
	registerUser(user) {
		let headers = new Headers();
		headers.append('Content-Type', 'application/json');
		return this.http.post('http://localhost:3000/users/register', user, {headers: headers})
		.map(res => res.json());
	}

	// User Login
	authenticateUser(user) {
		let headers = new Headers();
		headers.append('Content-Type', 'application/json');
		return this.http.post('http://localhost:3000/users/authenticate', user, {headers: headers})
		.map(res => res.json());
	}

	// Get User Data
	getProfile() {
		let headers = new Headers();
		this.loadToken();
		headers.append('Authorization', this.authToken);
		headers.append('Content-Type', 'application/json');
		return this.http.get('http://localhost:3000/users/profile', {headers: headers})
		.map(res => res.json());
	}

	// Store User Data
	storeUserData(token, user) {
		localStorage.setItem('id_token', token);
		localStorage.setItem('user', JSON.stringify(user));
		this.authToken = token;
		this.user = user;
	}

	// LOad Token
	loadToken() {
		const token = localStorage.getItem('id_token');
		this.authToken = token;
	}

	// Check is user logged in
	loggedIn() {
		return tokenNotExpired('id_token');
	}

	// Logout
	logout() {
		this.authToken = null;
		this.user = null;
		localStorage.clear();
	}

}
