const {ImageView, TextInput, Button, TextView, ui, Page, NavigationView} = require('tabris');

let navigationView = new NavigationView({
  id: 'mainNav',
	left: 0, top: 0, right: 0, bottom: 0,
  toolbarVisible: false
}).appendTo(ui.contentView);

let loginPage = new Page({
  title: 'Login'
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

//Memanggil halaman Home_page jika server menyatakan user ada dan mengambalikan user ID, kemudian jika user tidak ditemukan maka fungsi akan menampilkan peringatan. Fungsi mengirim input email dan password ke server dengan XMLHttpRequest() dengan metode request POST.
function goHome () {
  const Home_Page = require('./Home_Page');

  let http = new XMLHttpRequest();
  let url = 'http://kontrakangg.ddns.net:8635/restServer_transaksi/index.php/rest_server/user';

  let params = "key=SKRIPSI2018&email=" + loginPage.children('#email').first().text + "&pass=" + loginPage.children('#pass').first().text;
  http.open('POST', url, true);

  http.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

  http.onreadystatechange = function() {
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
  http.send(params);
}