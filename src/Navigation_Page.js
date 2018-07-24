const {ImageView, TextInput, Button, TextView, ui, Page, NavigationView} = require('tabris');

module.exports = class Navigation_Page extends Page {

	constructor(properties) {
	  super(properties);
	  this.createUI();
	}

	createUI(){

		this.append(
			new Button({
				left: '10%', right: '10%', top: 10, height: 75,
				text: 'Lihat Permintaan',
			})
		);

		this.append(
			new Button({
				left: '10%', right: '10%', top: 'prev() 10', height: 75,
				text: 'Permintan Baru',
			})
		);

		this.append(
			new Button({
				left: '10%', right: '10%', top: 'prev() 10', height: 75,
				text: 'Log-Out',
			})
		);

	}

};