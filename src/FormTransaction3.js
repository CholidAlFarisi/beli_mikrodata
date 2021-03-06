const {Button, CheckBox, Composite, TextView, TextInput, Picker, RadioButton, ScrollView, Slider, Switch, ui, Page} = require('tabris');

module.exports = class FormTransaction3 extends Page {

  constructor(properties) {
    super(Object.assign({id: 'Form3', title:'FORM', autoDispose: false}, properties));
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
        text: 'Variabel : '
    }).appendTo(compositeView);

    let scrollView = new ScrollView ({
      left: '10%', right: '10%', top: 'prev() 5', height: 300,
      background: '#eaf2ff'
    }).appendTo(compositeView);

    let _data = this.publikasi[0].item;
    for (var i = 0; i < this.publikasi.length; i++) {
      let textPub = _data[i].split("-");
      let idData = textPub[0];
      fetch('http://kontrakangg.ddns.net:8635/restServer_transaksi/index.php/rest_server/variabel?key=SKRIPSI2018&id_rawdata=' + idData)
      .then(response => response.json())
      .then((json) => {
        for (var i = 0; i < json.length; i++) {
          new CheckBox ({
            id: 'varChoice' + checkBoxCount,
            left: '10%', right: '10%', top: 'prev() 5',
            text: json[i].id_var + '-' + json[i].label_var
          }).appendTo(scrollView);
          checkBoxCount = checkBoxCount + 1;
        }
      }).catch((err) => {
        console.log('Error: retrive gagal');
      });
    };

    new Button({
      left: '10%', right: '10%', top: 'prev() 10',
      text: 'Select All',
      background: '#5495ff',
      textColor: 'white'
    }).on('select', () => { selectAll();
    }).appendTo(compositeView);

    new Button({
      left: '10%', right: '10%', top: 'prev() 10',
      text: 'Unselect All',
      background: '#5495ff',
      textColor: 'white'
    }).on('select', () => { unselectAll();
    }).appendTo(compositeView);

    new Button({
      left: '10%', right: '10%', top: 'prev() 10',
      text: 'Next',
      background: '#5495ff',
      textColor: 'white'
    }).on('select', () => { nextForm(this.publikasi[0].item, this.publikasi[0].idKonsumen);
    }).appendTo(compositeView);

    function selectAll(){
      for (var i = 0; i < checkBoxCount; i++) {
        scrollView.children('#varChoice' + i).first().checked = true;
      }
    }

    function unselectAll(){
      for (var i = 0; i < checkBoxCount; i++) {
        scrollView.children('#varChoice' + i).first().checked = false;
      }
    }

    function nextForm(rawData, id) {
      const FormTransaction4 = require('./FormTransaction4');
      
      let item = [];
      let j = 0;
      for (var i = 0; i < checkBoxCount; i++) {
        let c = scrollView.children('#varChoice' + i).first().checked;
        if (c == true) {
          item[j] = scrollView.children('#varChoice' + i).first().text;
          j = j + 1;
        }
      };

      let requestData = [{
        'rawdata' : rawData,
        'variabel' : item,
        'idKonsumen': id
      }];

      new FormTransaction4({
        title: 'Form 4 ',
        requestData : requestData
      }).appendTo(ui.find('#nav').first());
    }

  };

  set publikasi(pub) {
      this._publikasi = pub;
  }

  get publikasi() {
      return this._publikasi;
  }

};