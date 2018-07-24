const {ActivityIndicator, Button, TextView, ui, Page, NavigationView, Composite, CollectionView, RadioButton, ScrollView} = require('tabris');

module.exports = class KegiatanList extends CollectionView {

  	// Create loading indicator
  	constructor(properties) {
		super(Object.assign({id: 'kegiatanList', refreshEnabled: true}, properties));
	    this.getJSON().then(json => {
	    	this.kegiatan_arr = json;
	    	console.log('coba list : ' + this.kegiatan_arr[0].alias);
	    	this.itemCount = this.kegiatan_arr.length;
	    	console.log("ini data list kegiatan");
	    	
	    })
	}

	getJSON() {
		return fetch('http://192.168.43.2/restServer_transaksi/index.php/rest_server/kegiatan').then(response => response.json());
	}

	get kegiatan() {
	    return this.kegiatan_arr;
	}

	set kegiatan(kegiatan) {
	    this.kegiatan_arr = kegiatan;
	}

	createCell() {
		super.createCell()

		let cell = new Composite();

		new RadioButton({
		   	left: '5%', right: '5%', top: 'prev() 5'
		}).appendTo(cell);

		return cell;
	}

	updateCell(cell, index) {
		let t = this.kegiatan_arr[index];
	    cell.apply({
	    	RadioButton: {text: t.alias}
	    });

	}

}
