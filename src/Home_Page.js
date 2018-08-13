const {Action, TextInput, Button, TextView, ui, Page, NavigationView, Composite, CollectionView, ScrollView} = require('tabris');
const TransactionsList = require('./TransactionsList');

module.exports = class Home_page extends Page {

	//Membuat indikator pada halaman baru
	constructor(properties) {
	    super(Object.assign({id: 'home', autoDispose: true}, properties));
	    this.createUI();
	    this.applyLayout();
  	}

  	//Membuat UI halaman 'Daftar Transaksi'
	createUI(){

		let _compositeView = this.append(
			new Composite({
		        left: 0, top: 0, right: 0, bottom: 0
		    })
		)

		let _navigationView = new NavigationView({
			id: 'nav',
			left: 0, top: 0, right: 0, bottom: 0,
		}).appendTo(_compositeView);

		let hPage = new Page({
		  title: 'Daftar Permintaan'
		}).appendTo(_navigationView);

		new Action({
			title: 'Permintaan Baru',
			placementPriority: 'low',
			image: 'src/images/page.png'
		}).on('select',() => { newForm(this.idKonsumen);
		}).appendTo(_navigationView);

		//Memanggil cell pada file TransactionsList
		new TransactionsList({
			idKonsumen: this.idKonsumen
		}).appendTo(hPage);

		//Memanggil dan memberikan indikator pada file FormTransaction
		function newForm(id) {
		    const FormTransaction = require('./FormTransaction');
		    new FormTransaction({
		     	title: 'Form 1 ',
		     	idKonsumen: id
		    }).appendTo(_navigationView);
  		}

	}

	//Memberikan indikator layout pada object
	applyLayout() {
	    this.find('#transactionsList').set({left: 0, top: 0, right: 0, bottom: 0});
	}

	set idKonsumen(_idk) {
      this._idKonsumen = _idk;
	}

	get idKonsumen() {
	    return this._idKonsumen;
	}

};


