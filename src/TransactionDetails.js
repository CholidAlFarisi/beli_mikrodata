const {ProgressBar, TextView, ui, Page, NavigationView, Composite, CollectionView, Button, ImageView, ScrollView} = require('tabris');

module.exports = class TransactionDetails extends Page {

	constructor(properties) {
    super(Object.assign({autoDispose: true}, properties));
    this.createUI();
  }

  createUI(){
    let _status = '';
    let _check = [];
    let textS = ['Menunggu', 'Diproses', 'Berkas Tersedia', 'Selesai'];
    switch(this.transaction.status_transaksi){
      case '1':
        _status = textS[0];
        _check = ['check', 'uncheck', 'uncheck', 'uncheck'];
        break;
      case '2':
        _status = textS[1];
        _check = ['check', 'check', 'uncheck', 'uncheck'];
        break;
      case '3':
        _status = textS[2];
        _check = ['check', 'check', 'check', 'uncheck'];
        break;
      case '4':
        _status = textS[3];
        _check = ['check', 'check', 'check', 'check'];
        break;
      default:
        _status = textS[0];
        _check = ['check', 'uncheck', 'uncheck', 'uncheck'];
    };

    let compositeView = this.append(
      new Composite({
        left: 0, top: 0, right: 0, bottom: 0
      })
    );

    let scrollView = new ScrollView ({
      left: 0, top: 0, right: 0, bottom: 0
    }).appendTo(compositeView);

    //this.append(
      new TextView({
        id: 'textStatus',
        left: '10%', right: '10%', top: 10,
        text: 'Status : ' + _status
      }).appendTo(scrollView);
    //);

    //this.append(
      new ImageView({
        id: 'imgStatus0',
        left: '10%', top: 'prev() 15', height: 40,
        image: 'src/images/' + _check[0] + '_black.png',
        scaleMode: 'auto'
      }).appendTo(scrollView);
    //);
    //this.append(
      new TextView({
        left: ['#imgStatus0', 10], right: '10%', top: ['#textStatus', 23],
        text: textS[0]
      }).appendTo(scrollView);
    //);

    for (var i = 0; i < 3; i++) {
      let j = i + 1;
      //this.append(
        new ImageView({
          id: 'imgStatus' + j,
          left: '10%', top: ['#imgStatus'+i, 5], height: 40,
          image: 'src/images/' + _check[j] + '_black.png',
          scaleMode: 'auto'
        }).appendTo(scrollView);
      //);
      //this.append(
        new TextView({
          left: ['#imgStatus'+j, 10], right: '10%', top: ['#imgStatus'+i, 13],
          text: textS[j]
        }).appendTo(scrollView);
      //);
    };

    //this.append(
      new TextView({
        left: '10%', right: '10%', top: ['#imgStatus3', 15],
        text: 'Tanggal Permintaan : '
      }).appendTo(scrollView);
    //);
    //this.append(
      new TextView({
        left: '10%', right: '10%', top: 'prev() 5',
        text: this.transaction.tgl_minta
      }).appendTo(scrollView);
    //);

    //this.append(
      new TextView({
        left: '10%', right: '10%', top: 'prev() 10',
        text: 'Tanggal Pemenuhan : '
      }).appendTo(scrollView);
    //);
    //this.append(
      new TextView({
        left: '10%', right: '10%', top: 'prev() 5',
        text: this.transaction.tgl_pemenuhan
      }).appendTo(scrollView);
    //);

    //this.append(
      new TextView({
        left: '10%', right: '10%', top: 'prev() 10',
        text: 'Biaya Transaksi : '
      }).appendTo(scrollView);
    //);
    //this.append(
      new TextView({
        left: '10%', right: '10%', top: 'prev() 5',
        text: 'Rp ' + this.transaction.biaya_total + ',-'
      }).appendTo(scrollView);
    //);

    //this.append(
      new TextView({
        left: '10%', right: '10%', top: 'prev() 10',
        text: 'Status Pembayaran : '
      }).appendTo(scrollView);
    //);
    //this.append(
      let sBayar = '';
      if (this.transaction.status_bayar == 'N') {
        sBayar = 'Belum Dibayar';
      } else {
        sBayar = 'Lunas'
      }

      new TextView({
        left: '10%', right: '10%', top: 'prev() 5',
        text: sBayar
      }).appendTo(scrollView);
    //);

    new TextView({
      left: '10%', right: '10%', top: 'prev() 10',
      text: 'Keterangan Transaksi : '
    }).appendTo(scrollView);

    new TextView({
      left: '10%', right: '10%', top: 'prev() 5', height: 100,
      text: this.transaction.ket_transaksi
    }).appendTo(scrollView);

    //this.append(
      // new Button({
      //   left: '5%', right: '5%', top: 'prev() 10',
      //   text: 'Download INVOICE',
      //   background: '#5495ff',
      //   textColor: 'white'
      // }).appendTo(scrollView);
    //);
  }

  set transaction(transaction) {
    this._transaction = transaction;
  }

  get transaction() {
    return this._transaction;
  }

};