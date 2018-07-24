const {Button, CheckBox, Composite, TextView, TextInput, Picker, RadioButton, ScrollView, Slider, Switch, ui, Page} = require('tabris');

module.exports = class FormTransaction5 extends Page {

  constructor(properties) {
    super(Object.assign({id: 'Form', title:'FORM', autoDispose: false, refreshEnabled: false}, properties));
    this.createUI();
    //this.applyLayout();
  }

  createUI(){
    console.log('form 5 : ' + this.requestDataF[0].rawdata);
  	let compositeView = this.append(
      new Composite({
        left: 0, top: 0, right: 0, bottom: 0
      })
    );

    let _scrollView = new ScrollView ({
      left: '5%', right: '5%', top: '5%', bottom: '5%'
    }).appendTo(compositeView);

    new TextView({
        left: '10%', right: '10%', top: 5,
        alignment: 'center',
        text: 'Abstraksi (Latar Belakang & Tujuan Penggunaan Data)'
    }).appendTo(_scrollView);

    new TextInput({
      id: 'abstraksi',
      left: '10%', right: '10%', top: 'prev() 5', height: 150,
      background: 'gray'
    }).appendTo(_scrollView);

    new TextView({
        left: '10%', right: '10%', top: 'prev() 5',
        alignment: 'center',
        text: 'Topik Permintaan'
    }).appendTo(_scrollView);

    new TextInput({
      id: 'topik',
      left: '10%', right: '10%', top: 'prev() 5'
    }).appendTo(_scrollView);

    new TextView({
        left: '10%', right: '10%', top: 'prev() 5',
        alignment: 'center',
        text: 'Kirim Pesan'
    }).appendTo(_scrollView);

    new TextInput({
      id: 'pesan',
      left: '10%', right: '10%', top: 'prev() 5', height: 150,
      background: '#eaf2ff'
    }).appendTo(_scrollView);

    new Button({
      left: '10%', right: '10%', top: 'prev() 10',
      text: 'Submit',
      background: '#5495ff',
      textColor: 'white'
    }).on('select', () => { submitForm(this.requestDataF);
    }).appendTo(_scrollView);

    function submitForm(dataRequest) {
      //blm ada login
      let id_konsumen = dataRequest[0].idKonsumen;

      let ket_transaksi = '' + _scrollView.children('#abstraksi').first().text + '|' + _scrollView.children('#topik').first().text + '|' + _scrollView.children('#pesan').first().text;

      console.log('keterangan : \n' + ket_transaksi);

      let a = dataRequest[0].rawdata;
      let b = dataRequest[0].variabel;

      let dataDiminta = '';
      for (var i = 0; i < a.length; i++) {
        let splitter = a[i].split("-");
        dataDiminta = dataDiminta + "|" + splitter[1] + " " + splitter[2];
        //console.log("ke-" + i + "=" + dataDiminta);
      }

      for (var i = 0; i < b.length; i++) {
        let splitter = b[i].split("-");
        dataDiminta = dataDiminta + "|" + splitter[0];
      }
      //console.log("data : \n" + dataDiminta);

      //send to server
      let http = new XMLHttpRequest();
      let url = 'http://192.168.43.2/restServer_transaksi/index.php/rest_server/transaksi';

      let params = "idMedia=M06&id=" + id_konsumen + "&jt=22212&kt=" + ket_transaksi + "&dataDiminta=" + dataDiminta + "&id_wilayah=0000";
      http.open('POST', url, true);
    
      //Send the proper header information along with the request
      http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

      http.onreadystatechange = function() {//Call a function when the state changes.
          // console.log("server : " + http.readyState)
          // console.log("server status : " + http.status)
          if(http.readyState == 4) {
              console.log("menunggu balasan");
              console.log(http.responseText);
          }
      }
      http.send(params);

      ui.find('#nav').dispose();
      const Home_Page = require('./Home_Page');

      new Home_Page({
        idKonsumen: id_konsumen
      }).appendTo(ui.find('#mainNav').first());

    }

  };

  set requestDataF(_rdf) {
      this._requestDataF = _rdf;
  }

  get requestDataF() {
      return this._requestDataF;
  }

};