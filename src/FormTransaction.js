const {ActivityIndicator, Button, CheckBox, Composite, TextView, TextInput, Picker, RadioButton, ScrollView, Slider, Switch, ui, Page, fs} = require('tabris');
const KegiatanList = require('./KegiatanList');

const YEAR = [2010, 2011, 2012, 2013, 2014, 2015];
const KEGIATAN = ['Kegiatan 1', 'Kegiatan 2', 'Kegiatan 3', 'Kegiatan 4', 'Kegiatan 5'];

module.exports = class FormTransaction extends Page {

  constructor(properties) {
    super(Object.assign({id: 'Form', title:'FORM', autoDispose: false, refreshEnabled: false}, properties));
    this.createUI();
    this.applyLayout();
  }

  createUI(){
    
    let indexYear_selected = 0;
    let year_selected = 0;
    let index_kegiatanArr = 0;
    let kegiatanArr = ['test'];
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

    new TextView({
        left: '10%', right: '10%', top: 5,
        text: 'Kegiatan : '
    }).appendTo(compositeView);

    let scrollView = new ScrollView ({
      left: '10%', right: '10%', top: 'prev() 5', height: 150,
      background: '#eaf2ff'
    }).appendTo(compositeView);

    //testing
    fetch('http://192.168.43.2/restServer_transaksi/index.php/rest_server/kegiatan')
    .then(response => response.json())
    .then((json) => {
      // Show the result location data
      for (var i = 0; i < json.length; i++) {
        createRadioButton(json[i].kode_kegiatan, json[i].alias);
      };

    }).catch((err) => {
      console.log('Error: retrive gagal');
    });

    new TextView({
        left: '10%', right: '10%', top: 'prev() 10',
        text: 'Tahun : '
    }).appendTo(compositeView);

    let compositeView2 = new Composite({
      left: '10%', right: '10%', top: 'prev() 5',
    }).appendTo(compositeView);

    fetch('http://192.168.43.2/restServer_transaksi/index.php/rest_server/tahun')
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
        console.log("onselect="+target.index)
        indexYear_selected = target.index
      }).appendTo(compositeView2);

      year_selected = yearArr[indexYear_selected].tahun;
      console.log('selected year: ' + year_selected);
    }

    new Button({
      left: '10%', right: '10%', top: 'prev() 10',
      text: 'Select',
      background: '#5495ff',
      textColor: 'white'
    }).on('select', () => { updateMessage(this.idKonsumen);
    }).appendTo(compositeView);

    new TextView({
        left: '10%', right: '10%', top: 'prev() 10',
        text: 'Kegiatan Terpilih : '
    }).appendTo(compositeView);

    let scrollView2 = new ScrollView ({
      id: 'scr_selected',
      left: '10%', right: '10%', top: 'prev() 5', height: 130,
      background: '#eaf2ff'
    }).appendTo(compositeView);

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
    }).appendTo(compositeView);

    compositeView.apply({
      '#yearPicker': {left: '10%', right: '10%', top: 'prev() 10'},
    });

    function updateMessage(id) {
      console.log("form 1 id : " + id);
      let pickerValAll = pilihKegiatan();
      let pickerVal = pickerValAll.split(" ");
      let scrVal = compositeView2.children('#yearPicker').first();
      console.log('testing :' + pickerVal + ' testing : ' + scrVal.itemText(scrVal.selectionIndex))
      for (var i = 0; i < objKegiatan.length; i++) {
        if (objKegiatan[i].kegiatan == pickerVal && objKegiatan[i].tahun == scrVal.itemText(scrVal.selectionIndex)) {
        //if (objKegiatan[i].kegiatan != pickerVal) {
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
      //let transaction = target.parent().item
      
      // console.log();

      let c = new FormTransaction2({
        title: 'Form 2 ',
        kegiatan: compositeView._objkeg
      }).appendTo(ui.find('#nav').first());
    }

    function createRadioButton(kode, text) {
      new RadioButton({
        left: '5%', right: '5%', top: 'prev() 5',
        text: kode + " " + text
        //class: 'locationData'
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