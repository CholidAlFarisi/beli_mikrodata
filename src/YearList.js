const {ActivityIndicator, Button, TextView, ui, Page, NavigationView, Composite, CollectionView, RadioButton, ScrollView} = require('tabris');

module.exports = class YearList extends CollectionView {

  	// Create loading indicator
  	constructor(properties) {
		super(Object.assign({id: 'kegiatanList', refreshEnabled: true}, properties));
	    this.getJSON().then(json => {
	    	this.year_arr = json;
	    	this.itemCount = this.year_arr.length;
	    	console.log("ini data list tahun");
	    	console.log(year_arr);
	    })
	}

	getJSON() {
		return fetch('http://192.168.43.2/restServer_transaksi/index.php/rest_server/tahun').then(response => response.json());
	}

	get year() {
	    return this.year_arr;
	}

	set year(year) {
	    this.year_arr = year;
	}

}
