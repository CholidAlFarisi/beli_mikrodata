const {WebView, ProgressBar, TextView, ui, Page, NavigationView, Composite, CollectionView, Button, ImageView, ScrollView} = require('tabris');

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
    
    new TextView({
      id: 'textStatus',
      left: '10%', right: '10%', top: 10,
      text: 'Status : ' + _status
    }).appendTo(scrollView);

    fetch('http://192.168.43.2/restServer_transaksi/index.php/rest_server/statusTransaksi?id=' + this.transaction.id_transaksi)
    .then(response => response.json())
    .then((json) => {
      // Show the result location data
      let date1 = new Date(json[0]['tgl_minta']+"");
      let date2 = new Date();
      var timeDiff = Math.abs(date2.getTime() - date1.getTime());
      var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
      console.log("Jml hari : " + diffDays);

      new ProgressBar({
        left: '10%', right: '10%', top: 'prev() 5',
        tintColor: 'red',
        maximum: 100,
        selection: 100
      }).appendTo(scrollView);

      new TextView({
        //left: '10%', right: '10%', top: ['#imgStatus3', 15],
        left: '10%', right: '10%', top: 'prev() 5',
        text: 'Tanggal Permintaan : '
      }).appendTo(scrollView);

      new TextView({
        left: '10%', right: '10%', top: 'prev() 5',
        text: this.transaction.tgl_minta
      }).appendTo(scrollView);

      new TextView({
        left: '10%', right: '10%', top: 'prev() 10',
        text: 'Tanggal Pemenuhan : '
      }).appendTo(scrollView);

      new TextView({
        left: '10%', right: '10%', top: 'prev() 5',
        text: this.transaction.tgl_pemenuhan
      }).appendTo(scrollView);

      new TextView({
        left: '10%', right: '10%', top: 'prev() 10',
        text: 'Biaya Transaksi : '
      }).appendTo(scrollView);

      if (this.transaction.biaya_total == null) {
        new TextView({
          left: '10%', right: '10%', top: 'prev() 5',
          text: 'Harga Data Belum Tersedia'
        }).appendTo(scrollView);
      } else {
        new TextView({
          left: '10%', right: '10%', top: 'prev() 5',
          text: 'Rp ' + this.transaction.biaya_total + ',-'
        }).appendTo(scrollView);
      }

      new TextView({
        left: '10%', right: '10%', top: 'prev() 10',
        text: 'Status Pembayaran : '
      }).appendTo(scrollView);

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

      new TextView({
        left: '10%', right: '10%', top: 'prev() 10',
        text: 'Keterangan Transaksi : '
      }).appendTo(scrollView);

      new TextView({
        left: '10%', right: '10%', top: 'prev() 5', height: 100,
        text: this.transaction.ket_transaksi
      }).appendTo(scrollView);

    }).catch((err) => {
      console.log('Error: retrive gagal');
    });

    // new ImageView({
    //   id: 'imgStatus0',
    //   left: '10%', top: 'prev() 15', height: 40,
    //   image: 'src/images/' + _check[0] + '_black.png',
    //   scaleMode: 'auto'
    // }).appendTo(scrollView);

    // new TextView({
    //   left: ['#imgStatus0', 10], right: '10%', top: ['#textStatus', 23],
    //   text: textS[0]
    // }).appendTo(scrollView);

    // for (var i = 0; i < 3; i++) {
    //   let j = i + 1;

    //   new ImageView({
    //     id: 'imgStatus' + j,
    //     left: '10%', top: ['#imgStatus'+i, 5], height: 40,
    //     image: 'src/images/' + _check[j] + '_black.png',
    //     scaleMode: 'auto'
    //   }).appendTo(scrollView);

    //   new TextView({
    //     left: ['#imgStatus'+j, 10], right: '10%', top: ['#imgStatus'+i, 13],
    //     text: textS[j]
    //   }).appendTo(scrollView);
    // };



  }

  set transaction(transaction) {
    this._transaction = transaction;
  }

  get transaction() {
    return this._transaction;
  }

};