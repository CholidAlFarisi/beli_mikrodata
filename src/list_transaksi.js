const {CollectionView, Composite, ImageView, TextView, ui} = require('tabris');
const transactions = require('./transaksi');

module.exports = class TransactionsList extends CollectionView {

  constructor(properties) {
    super(Object.assign({id: 'transactionsList', cellHeight: 72}, properties));
    this._transactions = transactions.filter(this.filter);
    this.on('select', ({index}) => this._showTransactionDetailsPage(transactions[index]));
    this.itemCount = this.transactions.length;
  }

  get transactions() {
    return this._transactions;
  }

  set filter(filter) {
    this._filter = filter;
  }

  get filter() {
    return this._filter || (() => true);
  }

  _showTransactionDetailsPage(transaction) {
    const TransactionDetailsPage = require('./TransactionDetailsPage');
    new TransactionDetailsPage({title: transaction.topik_forum, transaction}).appendTo(ui.find('NavigationView').first());
  }

  createCell() {
    super.createCell();
    return new TransactionCell();
  }

  updateCell(view, index) {
    super.updateCell(view, index);
    let {id_transaksi, tgl, topik_forum} = transactions[index];
    Object.assign(view, {id_transaksi, tgl, topik_forum});
  }

};

class TransactionCell extends Composite {

  constructor(properties) {
    super(Object.assign({highlightOnTouch: true}, properties));
    this._createUI();
    this._applyLayout();
    this._applyStyles();
  }

  set id_transaksi(id_transaksi) {
    this.find('#id_transaksiLabel').first().id_transaksi = id_transaksi;
  }

  get id_transaksi() {
    return this.find('#id_transaksiLabel').first().text;
  }

  set tgl(tgl) {
    this.find('#tglLabel').first().text = tgl;
  }

  get tgl() {
    return this.find('#tglLabel').first().text;
  }

  set topik_forum(topik_forum) {
    this.find('#topik_forumLabel').first().text = topik_forum;
  }

  get topik_forum() {
    return this.find('#topik_forumLabel').first().text;
  }

  _createUI() {
    this.append(
      new TextView({id: 'id_transaksiLabel'}),
      new TextView({id: 'tglLabel'}),
      new TextView({id: 'topik_forumLabel'})
    );
  }

  _applyLayout() {
    this.apply({
      '#id_transaksiLabel': {left: 64, right: 16, top: 'prev() 16'},
      '#tglLabel': {left: 64, right: 16, top: 'prev() 16'},
      '#topik_forumLabel': {left: 64, right: 16, top: 'prev() 16'}
    });
  }

  _applyStyles() {
    this.apply({
      '#tglLabel': {textColor: '#4a4a4a'},
      '#topik_forumLabel': {textColor: '#7b7b7b'}
    });
  }

}
