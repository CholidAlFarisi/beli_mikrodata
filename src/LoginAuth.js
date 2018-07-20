const {Action, TextInput, Button, TextView, ui, Page, NavigationView, Composite, CollectionView} = require('tabris');

module.exports = class LoginAuth extends Page {

	constructor(properties) {
	    super(properties);
	    this.getJSON().then(json => {
	    	this.akun = json;
	    	console.log(akun);
	    })
  	}

  	getJSON() {
		return fetch('http://localhost/restServer_transaksi/index.php/rest_server/user?email=14.0001@stis.ac.id&pass=12345678').then(response => response.json());
	}

	get akun() {
	    return this.akun;
	}

	set akun(akun) {
	    this.akun = akun;
	}

	authAkun(user_email, pass) {
		const Login = require('./Login');
		const Home_Page = require('./Home_Page');
		if (this.akun[0].email == user_email && this.akun[0].password == pass) {
		    new Home_Page({
		    }).appendTo(ui.find('NavigationView').first());
		} else {
			
		}
	}

};


