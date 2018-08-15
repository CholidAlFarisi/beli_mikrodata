const {Button, CheckBox, Composite, TextView, TextInput, Picker, RadioButton, ScrollView, Slider, Switch, ui, Page} = require('tabris');

module.exports = class FormTransaction2 extends Page {

  constructor(properties) {
    super(Object.assign({id: 'Form2', title:'FORM', autoDispose: false}, properties));
    this.createUI();
  }

  createUI(){

    let checkBoxCount = 0;

    let compositeView = this.append(
      new Composite({
        left: 0, top: 0, right: 0, bottom: 0
      })
    );

    new TextView({
        left: '10%', right: '10%', top: 5,
        text: 'Nama Publikasi : '
    }).appendTo(compositeView);

    let scrollView = new ScrollView ({
      id: 'scrView',
      left: '10%', right: '10%', top: 'prev() 5', height: 300,
      background: '#eaf2ff'
    }).appendTo(compositeView);

    new TextView({
      id: 'warn',
      left: '10%', right: '10%', top: 'prev() 5'
    }).appendTo(scrollView);

    for (var i = 0; i < this.kegiatan.length; i++) {
      fetch('http://kontrakangg.ddns.net:8635/restServer_transaksi/index.php/rest_server/rawdata?key=SKRIPSI2018&kegiatan=' + this.kegiatan[i].kode_kegiatan + '&tahun=' + this.kegiatan[i].tahun)
      .then(response => response.json())
      .then((json) => {
        ui.find('#warn').dispose();
        for (var i = 0; i < json.length; i++) {
          new CheckBox ({
            id: 'pubChoice' + checkBoxCount,
            left: '10%', right: '10%', top: 'prev() 5',
            text: json[i].id_rawdata + '-' + json[i].nama_kegiatan + '-' + json[i].tahun
          }).appendTo(scrollView);
          checkBoxCount = checkBoxCount + 1;
        }
      }).catch((err) => {
        ui.find('#warn').dispose();
        new TextView({
          id: 'warn',
          left: '10%', right: '10%', top: 'prev() 5',
          text: 'Maaf kegiatan yang anda cari tidak tersedia atau tidak terdapat pada tahun yang bersangkutan',
          textColor: 'red'
        }).appendTo(scrollView);
      });
    }

    new Button({
      left: '10%', right: '10%', top: 'prev() 10',
      text: 'Next',
      background: '#5495ff',
      textColor: 'white'
    }).on('select', () => { nextForm(this.kegiatan[0].idKonsumen);
    }).appendTo(compositeView);

    function nextForm(id) {
      const FormTransaction3 = require('./FormTransaction3');
      let item = [];
      let j = 0;
      for (var i = 0; i < checkBoxCount; i++) {
        let c = scrollView.children('#pubChoice' + i).first().checked;
        if (c == true) {
          item[j] = scrollView.children('#pubChoice' + i).first().text;
          j = j + 1;
        }
      };

      let superItem = [{
        'idKonsumen' : id,
        'item' : item
      }];

      new FormTransaction3({
        title: 'Form 3 ',
        publikasi: superItem
      }).appendTo(ui.find('#nav').first());
    }

  };

  set kegiatan(keg) {
      this._kegiatan = keg;
  }

  get kegiatan() {
      return this._kegiatan;
  }


};