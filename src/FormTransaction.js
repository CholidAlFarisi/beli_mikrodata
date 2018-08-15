const {Button, CheckBox, Composite, TextView, TextInput, Picker, RadioButton, ScrollView, Slider, Switch, ui, Page, fs} = require('tabris');

module.exports = class FormTransaction extends Page {

  constructor(properties) {
    super(Object.assign({id: 'Form1', title:'FORM', autoDispose: false}, properties));
    this.createUI();
    this.applyLayout();
  }

  createUI(){
    
    let indexYear_selected = 0;
    let year_selected = 0;

    let tahunArr = [2000];
    let objKegiatan = [
      {
        'kode_kegiatan' : 1,
        'kegiatan': 'kosong',
        'tahun': tahunArr
      }
    ]

    let compositeView = this.append(
      new Composite({
        left: 0, top: 0, right: 0, bottom: 0
      })
    );

    let mainScroll = new ScrollView({
      left: 0, top: 0, right: 0, bottom: 0
    }).appendTo(compositeView);

    new TextView({
        left: '10%', right: '10%', top: 5,
        text: 'Kegiatan : '
    }).appendTo(mainScroll);

    let scrollView = new ScrollView ({
      left: '10%', right: '10%', top: 'prev() 5', height: 150,
      background: '#eaf2ff'
    }).appendTo(mainScroll);

    fetch('http://kontrakangg.ddns.net:8635/restServer_transaksi/index.php/rest_server/kegiatan?key=SKRIPSI2018')
    .then(response => response.json())
    .then((json) => {
      for (var i = 0; i < json.length; i++) {
        createRadioButton(json[i].kode_kegiatan, json[i].nama_kegiatan);
      };

    }).catch((err) => {
      console.log('Error: retrive gagal');
    });

    new TextView({
        left: '10%', right: '10%', top: 'prev() 10',
        text: 'Tahun : '
    }).appendTo(mainScroll);

    let compositeView2 = new Composite({
      left: '10%', right: '10%', top: 'prev() 5',
    }).appendTo(mainScroll);

    fetch('http://kontrakangg.ddns.net:8635/restServer_transaksi/index.php/rest_server/tahun?key=SKRIPSI2018')
    .then(response => response.json())
    .then((json) => {

      createPicker(json);

    }).catch((err) => {
      console.log('Error: retrive gagal');
    });

    function createPicker(yearArr){
      new Picker({
        left: '5%', right: '5%', top: 'prev() 5',
        id: 'yearPicker',
        itemCount: yearArr.length,
        itemText: index => yearArr[index].tahun + ''
      }).on('select', (target, value) => {
        indexYear_selected = target.index
      }).appendTo(compositeView2);

      year_selected = yearArr[indexYear_selected].tahun;
    }

    new Button({
      left: '10%', right: '10%', top: 'prev() 10',
      text: 'Pilih Kegiatan',
      background: '#5495ff',
      textColor: 'white'
    }).on('select', () => { updateMessage(this.idKonsumen);
    }).appendTo(mainScroll);

    new TextView({
        left: '10%', right: '10%', top: 'prev() 10',
        text: 'Kegiatan Terpilih : '
    }).appendTo(mainScroll);

    let scrollView2 = new ScrollView ({
      id: 'scr_selected',
      left: '10%', right: '10%', top: 'prev() 5', height: 130,
      background: '#eaf2ff'
    }).appendTo(mainScroll);

    new TextView({
      id: 'text_selected',
      left: '10%', right: '10%', top: 'prev() 10',
      text: ''
    }).appendTo(scrollView2);

    new Button({
      left: '10%', right: '10%', top: 'prev() 10',
      id: "Next",
      text: 'Next',
      background: '#5495ff',
      textColor: 'white'
    }).on('select', () => { nextForm();
    }).appendTo(mainScroll);

    compositeView.apply({
      '#yearPicker': {left: '10%', right: '10%', top: 'prev() 10'},
    });

    function updateMessage(id) {
      let pickerValAll = pilihKegiatan();
      let pickerVal = pickerValAll.split("-");
      let scrVal = compositeView2.children('#yearPicker').first();
      for (var i = 0; i < objKegiatan.length; i++) {
        if (objKegiatan[i].kode_kegiatan == pickerVal[0] && objKegiatan[i].tahun == scrVal.itemText(scrVal.selectionIndex)) {
          console.log('sama');
          break;
        } else {
          if (objKegiatan[0].kegiatan == 'kosong') {
            objKegiatan[0] = {};
            objKegiatan[0].kode_kegiatan = pickerVal[0];
            objKegiatan[0].kegiatan = pickerVal[1];
            objKegiatan[0].tahun = scrVal.itemText(scrVal.selectionIndex);
            objKegiatan[0].idKonsumen = id;
            break;
          } else {
            if ((i+1) == objKegiatan.length) {
              objKegiatan[i+1] = {};
              objKegiatan[i+1].kode_kegiatan = pickerVal[0];
              objKegiatan[i+1].kegiatan = pickerVal[1];
              objKegiatan[i+1].tahun = scrVal.itemText(scrVal.selectionIndex);
              objKegiatan[i+1].idKonsumen = id;
              break;
            }
          }
        }
      }

      compositeView._objkeg = objKegiatan;

      let info = '';
      for (var i = 0; i < objKegiatan.length; i++) {
        info = info + objKegiatan[i].kegiatan + ' ' + objKegiatan[i].tahun + '\n';
      }

      return scrollView2.children('#text_selected').first().text = info;
    }

    function pilihKegiatan() {
      let _kegiatan = 'Pilih';
      scrollView.children('RadioButton').forEach((button) => {
        if (button.checked) {
          _kegiatan = button.text;
        }
      });

      return _kegiatan;
    }

    function nextForm() {
      const FormTransaction2 = require('./FormTransaction2');

      let c = new FormTransaction2({
        title: 'Form 2 ',
        kegiatan: compositeView._objkeg
      }).appendTo(ui.find('#nav').first());
    }

    function createRadioButton(kode, text) {
      new RadioButton({
        left: '5%', right: '5%', top: 'prev() 5',
        text: kode + "-" + text
      }).appendTo(scrollView);
    }

  };

  applyLayout() {
      this.find('#kegiatanList').set({left: 0, top: 0, right: 0, bottom: 0});
  };

  set idKonsumen(_idk) {
      this._idKonsumen = _idk;
  }

  get idKonsumen() {
      return this._idKonsumen;
  }

};