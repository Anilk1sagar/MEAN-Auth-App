import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../../services/validate.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
	selector: 'app-register',
	templateUrl: './register.component.html',
	styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

	name: String;
	username: String;
	email: String;
	password: String;

	constructor(private validateService: ValidateService, private flashMessage: FlashMessagesService, private authService: AuthService, private router: Router) { }

	ngOnInit() {
	}

	onRegisterSubmit() {
		const user = {
			name: this.name,
			email: this.email,
			username: this.username,
			password: this.password
		}

		// Required Fields
		if(!this.validateService.validateRegister(user)) {
			this.flashMessage.show('Please fill in all fields', {cssClass: 'flashMeassage-danger', timeout: 3000});
			return false;
		}

		// Validate Email
		if(!this.validateService.validateEmail(user.email)) {
			this.flashMessage.show('Please use a valid email', {cssClass: 'flashMeassage-danger', timeout: 3000});
			return false;
		}

		// Register User
		this.authService.registerUser(user).subscribe(data => {
			if(data.success) {
				this.flashMessage.show('You are now registered and you can login', {cssClass: 'flashMeassage-success', timeout: 3000});
				//console.log(data.msg);
				this.router.navigate(['/login']);
			} else {
				this.flashMessage.show(data.msg, {cssClass: 'flashMeassage-danger', timeout: 3000});
				//console.log(data.msg);
				this.router.navigate(['/register']);
			}
		});
	}

}
