const {ActivityIndicator, Button, TextView, ui, Page, NavigationView, Composite, CollectionView} = require('tabris');
const TransactionDetails = require('./TransactionDetails');

module.exports = class TransactionsList extends CollectionView {

  	// Create loading indicator
  	constructor(properties) {
		super(Object.assign({id: 'transactionsList'}, properties));
	    this.getJSON().then(json => {
	    	this.transaksi_arr = json;
	    	this.itemCount = this.transaksi_arr.length;
	    	// console.log("json get: " + this.idKonsumen);
	    })
	}

	getJSON() {
		//console.log("json get data" + id_konsumen)
		return fetch('http://192.168.43.2/restServer_transaksi/index.php/rest_server/transaksi?id=' + this.idKonsumen).then(response => response.json());
	}

	get transaction() {
	    return this.transaksi_arr;
	}

	set transaction(transaction) {
	    this.transaksi_arr = transaction;
	}

	set idKonsumen(_idk) {
      this._idKonsumen = _idk;
	}

	get idKonsumen() {
	    return this._idKonsumen;
	}

	createCell() {
		console.log("tran" + this.idKonsumen);
		super.createCell()
		let cell = new Composite();
		let container = new Composite({
			id:"container",
			left: 0, right: 0, top: 0
		}).appendTo(cell)

		container.append(
			new TextView({
				left: '5%', right: '5%', top: 'prev() 10',
			}),
			new Button({
			    left: '1%', right: '1%', top: 'prev() 5',
			    background: 'white'
			}).on('select', ({target}) => this._showTransactionDetails(target))		
		)

		return cell;
	}

	updateCell(view, index) {
		
		super.updateCell(view, index);
		let t = this.transaksi_arr[index];
		view.find('#container').first().item = t;

		let _status = '';
		let text_color = 'black';

	    switch(t.status_transaksi){
	      case '1':
	        _status = 'Menunggu';
	        text_color = 'red';
	        break;
	      case '2':
	        _status = 'Diproses';
	        text_color = 'blue';
	        break;
	      case '3':
	        _status = 'Berkas Tersedia';
	        text_color = 'green';
	        break;
	      case '4':
	        _status = 'Selesai';
	        text_color = 'green';
	        break;
	      default:
	        _status = 'Menunggu';
	    };

		view.find('#container').first().apply({
			Button: {text: 'Details', textColor: text_color},
			TextView: {text: 'ID Transaksi : ' + t.id_transaksi + '\nTanggal Permintaan Dibuat : ' + t.tgl_minta + '\nStatus : ' + _status}
		});
	}

	_showTransactionDetails(target) {
		console.log(target.parent().item);
		console.log("ini ui lho :")
		console.log(ui.find('#nav').first());
		let transaction = target.parent().item
    	new TransactionDetails({
    		title: 'ID Transaksi : ' + target.parent().item.id_transaksi, 
    		transaction
    	}).appendTo(ui.find('#nav').first());
	}
}
