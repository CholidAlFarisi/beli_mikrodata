const {Composite, ImageView, TextView, ui} = require('tabris');
const TransactionsPage = require('./TransactionsPage');

const PAGE_DATA = [{
  title: 'Transactions',
  drawerIcon: 'images/page_all_books.png'
}];

module.exports = class PageSelector extends Composite {

  constructor(properties) {
    super(properties);
    this._createUI();
    this._applyLayout();
    this._applyStyles();
    let {title, filter} = PAGE_DATA[0];
    this._open(new TransactionsPage({title, filter}));
  }

  _createUI() {
    this.append(
      PAGE_DATA.map(data =>
        new Composite({class: 'pageEntry', highlightOnTouch: true}).append(
          new TextView({class: 'topik_forumLabel', text: data.topik_forum})
        ).on('tap', () => this._open(new TransactionsPage({title: data.topik_forum, filter: data.filter})))
      )
    );
  }

  _open(page) {
    let navigationView = ui.find('NavigationView').first();
    navigationView.pageAnimation = 'none';
    tabris.ui.drawer.close();
    navigationView.pages().dispose();
    page.appendTo(navigationView);
    navigationView.pageAnimation = 'default';
  }

  _applyLayout() {
    this.apply({
      '.pageEntry': {left: 0, top: 'prev()', right: 0, height: device.platform === 'iOS' ? 40 : 48},
      '.topik_forumLabel': {left: 72, centerY: 0}
    });
  }

  _applyStyles() {
    this.apply({
      '.topik_forumLabel': {
        font: device.platform === 'iOS' ? '17px .HelveticaNeueInterface-Regular' : 'medium 14px',
        textColor: device.platform === 'iOS' ? 'rgb(22, 126, 251)' : '#212121'
      }
    });
  }

};