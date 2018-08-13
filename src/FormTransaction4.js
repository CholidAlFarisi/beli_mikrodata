const {Button, CheckBox, Composite, TextView, TextInput, Picker, RadioButton, ScrollView, Slider, Switch, ui, Page} = require('tabris');

module.exports = class FormTransaction4 extends Page {

  constructor(properties) {
    super(Object.assign({id: 'Form', title:'FORM', autoDispose: false, refreshEnabled: false}, properties));
    this.createUI();
  }

  createUI(){

    let text_persyaratan = 
    "(1.)\nSurat Perjanjian Penggunaan Data yang direkam dalam media komputer, dibuat oleh BPS sebagai penyedia data dan pengguna data sebagai penerima data dalam media komputer. Pada butir-butir selanjutnya, data dalam media komputer disebut rekaman data.\n(2.)\nBPS, menyetujui untuk menyediakan rekaman data :\n- Mikro Data / Peta Digital yang dibeli kepada penerima data dengan syarat-syarat seperti yang dirinci pada butir 3.\n(3.)\nPenerima data menyetujui bahwa pemakaian rekaman akan mengikuti syarat-syarat yang ditentukan oleh BPS yaitu :\na. Penerima data tidak akan membuat salinan dari rekaman tersebut untuk keperluan orang lain atau organisasi lain.\nb. Penerima data akan memakai rekaman tersebut hanya untuk keperluan penelitian dan analisis bagi pengguna data dengan tujuan utama memperdalam pengertian tentang keadaan Indonesia.\nc. Penggunaan rekaman untuk keperluan lain yang menyimpang dari syarat- syarat di atas perlu mendapat persetujuan teknis terlebih dahulu dari Kepala BPS.\nd. Penerima data diharapkan menyerahkan hasil penelitiannya kepada BPS.\n(4.)\nSyarat perjanjian ini ditanda tangani oleh kedua belah pihak sebagai bukti ikatan resmi. Semua data dan keterangan yang ada didalam rekaman tersebut di atas adalah rahasia dan tetap menjadi milik BPS.";

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
        text: 'Persyaratan Pembelian Data Mikro'
    }).appendTo(_scrollView);

    new TextView({
        left: '10%', right: '10%', top: 'prev() 10',
        alignment: 'center',
        text: text_persyaratan
    }).appendTo(_scrollView);

    new CheckBox ({
      id: 'syarat',
      left: '10%', right: '10%', top: 'prev() 5',
      text: 'Saya Setuju Dengan Surat Perjanjian Data*'
    }).appendTo(_scrollView);

    new Button({
      id: 'syaratButton',
      left: '10%', right: '10%', top: 'prev() 35',
      text: 'Next',
      background: '#5495ff',
      textColor: 'white'
    }).on('select', () => { nextForm(this.requestData);
    }).appendTo(_scrollView);

    function nextForm(data) {
      const FormTransaction5 = require('./FormTransaction5');
      
      if (_scrollView.children('#syarat').first().checked == true) {
        new FormTransaction5({
          title: 'Form 5 ',
          requestDataF: data
        }).appendTo(ui.find('#nav').first());
      } else {
        createText();
      };

    }

    function createText(){
      new TextView({
        left: '5%', right: '5%', top: ['#syarat', 5],
        alignment: 'center',
        textColor: 'red',
        text: "Maaf anda harus mensetujui persyaratan di atas"
      }).appendTo(_scrollView);
    }

  };

  set requestData(_rd) {
      this._requestData = _rd;
  }

  get requestData() {
      return this._requestData;
  }

};