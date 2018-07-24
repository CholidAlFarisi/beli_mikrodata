const {Page} = require('tabris');
const list_transaksi = require('./list_transaksi');

module.exports = class TransactionsPage extends Page {

  constructor(properties) {
    super(Object.assign({autoDispose: false}, properties));
    this.createUI();
    this.applyLayout();
  }

  set filter(filter) {
    this._filter = filter;
  }

  get filter() {
    return this._filter;
  }

  createUI() {
    this.append(
      new list_transaksi({filter: this.filter})
    );
  }

  applyLayout() {
    this.find('#transactionsList').set({left: 0, top: 0, right: 0, bottom: 0});
  }

};