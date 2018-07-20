const {Button, CheckBox, Composite, TextView, TextInput, Picker, RadioButton, ScrollView, Slider, Switch, ui, Page} = require('tabris');

const COUNTRIES = ['Germany', 'Canada', 'USA', 'Bulgaria'];
const CLASSES = ['Business', 'Economy', 'Economy Plus'];

module.exports = class FormTransaction extends Page {
  constructor(properties) {
    super(Object.assign({id: 'Form', title:'FORM', autoDispose: false}, properties));
    this.createUI();
    //this.applyLayout();
  }

  createUI(){

    let scr_first = this.append(
      new ScrollView ({
        id: 'scrV',
        left: '5%', right: '5%', top: 10, height: 100,
        background: 'blue'
      })
    );

    let scr_second = this.append(
      new ScrollView ({
        left: '5%', right: '5%', top: 'prev() 5', height: 100,
        background: 'red'
      })
    );

    for (let i = 0; i <= 50; i++) {
      new CheckBox({
        left: '10%', right: '10%', top: 'prev() 10',
        checked: true,
        text: 'checked' + i
      }).on('checkedChanged', event => event.target.text = event.value ? 'checked' : 'unchecked')
      .appendTo(scr_first);
    }

    for (let i = 0; i <= 50; i++) {
      new CheckBox({
        left: '10%', right: '10%', top: 'prev() 10',
        checked: true,
        text: 'checked2' + i
      }).on('checkedChanged', event => event.target.text = event.value ? 'checked' : 'unchecked')
      .appendTo(scr_second);
    }

  }

};