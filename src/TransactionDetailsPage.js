const {Composite, ImageView, Tab, TabFolder, TextView, Page, ui} = require('tabris');
const ReadDetailsPage = require('./ReadDetailsPage');
const TransactionsList = require('./list_transaksi');

const RELATED_TAB_TITLE = 'Related';

module.exports = class TransactionDetailsPage extends Page {

  constructor(properties) {
    super(properties);
    this._createUI();
    this._applyLayout();
    this._applyStyles();
  }

  _createUI() {
    this.append(
      new Composite({id: 'detailsView'}).on('tap', () => this._openReadDetailsPage())
        .append(
          new TextView({id: 'id_transaksiLabel', text: this.transaction.id_transaksi}),
          new TextView({id: 'tglLabel', text: this.transaction.tgl}),
          new TextView({id: 'topik_forumLabel', text: this.transaction.topik_forum})
        ),
    );
  }

  _openReadDetailsPage() {
    new ReadDetailsPage({title: this.topik_forum}).appendTo(ui.find('NavigationView').first());
  }

  set transaction(transaction) {
    this._transaction = transaction;
  }

  get transaction() {
    return this._transaction;
  }

  _applyLayout() {
    this.apply({
      '#detailsView': {top: 0, height: 192, left: 0, right: 0, elevation: 4},
      //'#tabFolder': {top: 'prev()', left: 0, right: 0, bottom: 0},
      //'#booksList': {left: 0, top: 0, right: 0, bottom: 0},
      '#id_transaksiLabel': {height: 160, width: 106, left: 16, top: 16},
      '#tglLabel': {left: '#id_transaksiLabel 16', top: 16, right: 16},
      '#topik_forumLabel': {left: '#id_transaksiLabel 16', top: 'prev() 8'},
    });
  }

  _applyStyles() {
    this.apply({
      '#detailsView': {highlightOnTouch: true, background: 'white'},
      '#topik_forumLabel': {font: 'bold 14px sans-serif'},
      '#tglLabel': {font: '14px'}
    });
  }

};