const {ImageView, TextInput, Button, TextView, ui, Page, NavigationView} = require('tabris');

let navigationView = new NavigationView({
  id: 'mainNav',
	left: 0, top: 0, right: 0, bottom: 0,
  toolbarVisible: false
}).appendTo(ui.contentView);

let loginPage = new Page({
  title: 'Login'
  //backgroundImage: 'src/images/pool.png'
}).appendTo(navigationView);

new ImageView({
  top: '10%', height: 100, left: '10%', right: '10%',
  image: 'src/images/bps.png',
  scaleMode: 'auto'
}).appendTo(loginPage);

new TextView({
  top: 'prev() 20', left: '20%', right: '20%',
  text: 'Email',
  alignment: 'center'
}).appendTo(loginPage);

new TextInput({
	id: 'email',
  top: 'prev() 10', left: '20%', right: '20%',
  message: 'example@mail.com'
}).appendTo(loginPage);

new TextView({
  top: 'prev() 20', left: '20%', right: '20%',
  text: 'Password',
  alignment: 'center'
}).appendTo(loginPage);

new TextInput({
	id: 'pass',
  top: 'prev() 10', left: '20%', right: '20%',
  type: 'password',
  message: '********'
}).appendTo(loginPage);

new Button({
  id: 'loginButton',
  left: '20%', right: '20%', top: 'prev() 20',
  text: 'Login',
  background: '#5495ff',
  textColor: 'white'
}).on('select',() => { goHome()
}).appendTo(loginPage);

// new Button({
//   left: '20%', right: '20%', top: 'prev() 20',
//   text: 'coba',
//   background: '#5495ff',
//   textColor: 'white'
// }).on('select',() => { linkCoba()
// }).appendTo(loginPage);

// function linkCoba(){
//   let xhr = new XMLHttpRequest();
//   xhr.open('GET', 'https://www.google.com/', true);
//   xhr.onload = function () {
//     console.log(xhr.responseURL); // http://example.com/test
//   };
//   xhr.send(null);
// }

function goHome () {
  const Home_Page = require('./Home_Page');

  let http = new XMLHttpRequest();
  let url = 'http://192.168.43.2/restServer_transaksi/index.php/rest_server/user';

  let params = "email=" + loginPage.children('#email').first().text + "&pass=" + loginPage.children('#pass').first().text;
  http.open('POST', url, true);

  //Send the proper header information along with the request
  http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

  http.onreadystatechange = function() {//Call a function when the state changes.
      // console.log("server : " + http.readyState)
      // console.log("server status : " + http.status)
      if(http.readyState == 4) {
          if (http.status == 500) {
            new TextView({
              top: ['#loginButton', 10], left: '20%', right: '20%',
              text: 'Maaf terjadi kesalahan pada server atau server tidak dapat ditemukan',
              alignment: 'center',
              textColor: 'red'
            }).appendTo(loginPage);
          } else {
            if (http.responseText.length != 2) {
              let idk = http.responseText.split('"');
              new Home_Page({
                idKonsumen: idk[1]
              }).appendTo(navigationView);
            } else {
              new TextView({
                top: ['#loginButton', 10], left: '20%', right: '20%',
                markupEnabled: true,
                text: 'Maaf email atau password anda salah. <br/>Jika anda belum memiliki akun SILASTIK silahkan mendaftar di <a href="https://bps.go.id/konsumen/create.html">https://bps.go.id/konsumen/create.html</a>',
                alignment: 'center',
                textColor: 'red'
              }).appendTo(loginPage);
            }
          }
          
      }
  }
  http.send(params);
}