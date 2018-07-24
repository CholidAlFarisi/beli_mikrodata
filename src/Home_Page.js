const {Action, TextInput, Button, TextView, ui, Page, NavigationView, Composite, CollectionView, ScrollView} = require('tabris');
const TransactionsList = require('./TransactionsList');

module.exports = class Home_page extends Page {

	constructor(properties) {
	    super(Object.assign({id: 'home', autoDispose: true}, properties));
	    //console.debug(this);
	    this.createUI();
	    this.applyLayout();
  	}

	createUI(){
		//console.log('home page : ' + this.idKonsumen);

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
		  title: 'Daftar Transaksi'
		}).appendTo(_navigationView);

		new Action({
			title: 'Permintaan Baru',
			placementPriority: 'high',
			image: 'src/images/page.png'
		}).on('select',() => { newForm(this.idKonsumen);
		}).appendTo(_navigationView);

		//call cell transaksi
		new TransactionsList({
			idKonsumen: this.idKonsumen
		}).appendTo(hPage);

		function newForm(id) {
		    const FormTransaction = require('./FormTransaction');
		    new FormTransaction({
		     	title: 'Form 1 ',
		     	idKonsumen: id
		    }).appendTo(_navigationView);
  		}

	}

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


