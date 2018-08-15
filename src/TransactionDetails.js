const {TextView, ui, Page, NavigationView, Composite, CollectionView, Button, ImageView, ScrollView} = require('tabris');

module.exports = class TransactionDetails extends Page {

	constructor(properties) {
    super(Object.assign({autoDispose: true}, properties));
    this.createUI();
  }

  createUI(){
    let _status = '';
    let _check = ['process', 'dot-green', 'dot-green', 'dot-green'];
    let _color = ['green', 'black', 'black', 'black'];
    let textS = ['Menunggu', 'Diproses', 'Berkas Tersedia', 'Selesai'];
    switch(this.transaction.status_transaksi){
      case '1':
        _status = textS[0];
        _check = ['process', 'dot-green', 'dot-green', 'dot-green'];
        _color = ['green', 'black', 'black', 'black'];
        break;
      case '2':
        _status = textS[1];
        _check = ['dot-green', 'process', 'dot-green', 'dot-green'];
        _color = ['', 'green', 'black', 'black'];
        break;
      case '3':
        _status = textS[2];
        _check = ['dot-green', 'dot-green', 'process', 'dot-green'];
        _color = ['', '', 'green', 'black'];
        break;
      case '4':
        _status = textS[3];
        _check = ['dot-green', 'dot-green', 'dot-green', 'check_black'];
        _color = ['', '', '', ''];
        break;
      default:
        _status = textS[0];
        _check = ['process', 'dot-green', 'dot-green', 'dot-green'];
        _color = ['green', 'black', 'black', 'black'];
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

    fetch('http://kontrakangg.ddns.net:8635/restServer_transaksi/index.php/rest_server/statusTransaksi?key=SKRIPSI2018&id=' + this.transaction.id_transaksi)
    .then(response => response.json())
    .then((json) => {

      let date1 = new Date(json[0]['tgl_minta']+"");
      let date2 = new Date();
      var timeDiff = Math.abs(date2.getTime() - date1.getTime());
      var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));

      new TextView({
        left: '10%', right: '10%', top: 'prev() 10',
        alignment: 'center',
        text: 'Menunggu'
      }).appendTo(scrollView);

      new ImageView({
        left: '10%', right: '10%', top: 'prev() 5', height: 40,
        image: 'src/images/'+_check[0]+'.png',
        tintColor: _color[0],
        scaleMode: 'auto'
      }).appendTo(scrollView);

      new TextView({
        left: '10%', right: '10%', top: 'prev() 5',
        alignment: 'center',
        text: json[0]['tgl_minta']
      }).appendTo(scrollView);

      new ImageView({
        left: '10%', right: '10%', top: 'prev() 5', height: 80,
        image: 'src/images/line-dash.png',
        scaleMode: 'auto'
      }).appendTo(scrollView);

      new TextView({
        left: '10%', right: '10%', top: 'prev() 5',
        alignment: 'center',
        text: 'Diproses'
      }).appendTo(scrollView);

      new ImageView({
        left: '10%', right: '10%', top: 'prev() 5', height: 40,
        image: 'src/images/'+_check[1]+'.png',
        tintColor: _color[1],
        scaleMode: 'auto'
      }).appendTo(scrollView);

      new TextView({
        left: '10%', right: '10%', top: 'prev() 5',
        alignment: 'center',
        text: json[0]['tgl_diproses']
      }).appendTo(scrollView);

      new ImageView({
        left: '10%', right: '10%', top: 'prev() 5', height: 80,
        image: 'src/images/line-dash.png',
        scaleMode: 'auto'
      }).appendTo(scrollView);

      new TextView({
        left: '10%', right: '10%', top: 'prev() 5',
        alignment: 'center',
        text: 'Berkas Tersedia'
      }).appendTo(scrollView);

      new ImageView({
        left: '10%', right: '10%', top: 'prev() 5', height: 40,
        image: 'src/images/'+_check[2]+'.png',
        tintColor: _color[2],
        scaleMode: 'auto'
      }).appendTo(scrollView);

      new TextView({
        left: '10%', right: '10%', top: 'prev() 5',
        alignment: 'center',
        text: json[0]['tgl_berkas_tersedia']
      }).appendTo(scrollView);

      new ImageView({
        left: '10%', right: '10%', top: 'prev() 5', height: 80,
        image: 'src/images/line-dash.png',
        scaleMode: 'auto'
      }).appendTo(scrollView);

      new TextView({
        left: '10%', right: '10%', top: 'prev() 5',
        alignment: 'center',
        text: 'Selesai'
      }).appendTo(scrollView);

      new ImageView({
        left: '10%', right: '10%', top: 'prev() 5', height: 40,
        image: 'src/images/'+_check[3]+'.png',
        tintColor: _color[3],
        scaleMode: 'auto'
      }).appendTo(scrollView);

      new TextView({
        left: '10%', right: '10%', top: 'prev() 5',
        alignment: 'center',
        text: json[0]['tgl_pemenuhan']
      }).appendTo(scrollView);



      new TextView({
        left: '10%', right: '10%', top: 'prev() 20',
        text: 'Total Waktu Transaksi : ' + diffDays + ' Hari'
      }).appendTo(scrollView);

      new TextView({
        left: '10%', right: '10%', top: 'prev() 10',
        text: 'Biaya Data : '
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

      let ket = this.transaction.ket_transaksi.split("|");
      new TextView({
        left: '10%', right: '10%', top: 'prev() 2',
        text: "Abstraksi : " + ket[0] + "\nTopik : " + ket[1] + "\nPesan : " + ket[2]
      }).appendTo(scrollView);

    }).catch((err) => {
      console.log('Error: retrive gagal');
    });

  }

  set transaction(transaction) {
    this._transaction = transaction;
  }

  get transaction() {
    return this._transaction;
  }

};