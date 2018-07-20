const {ActivityIndicator, Button, TextView, ui} = require('tabris');

function createTextView(text) {
  new TextView({
    left: 16, right: 16, top: 'prev() 12',
    text: text,
    markupEnabled: true,
    class: 'locationData'
  }).appendTo(ui.contentView);
}

function createReloadButton() {
  new Button({
    left: 16, right: 16, top: 'prev() 12',
    text: 'Reload Geo-Data',
    id: 'reloadButton'
  }).on('select', loadData).appendTo(ui.contentView);
}

function loadData() {
  // Dispose existing elements via the class selector
  ui.contentView.children('.locationData').dispose();
  ui.contentView.children('#reloadButton').dispose();

  // Create loading indicator
  let activityIndicator = new ActivityIndicator({
    centerX: 0, centerY: 0
  }).appendTo(ui.contentView);

  // Run async remote request with fetch
  fetch('http://192.168.43.2/restServer_transaksi/index.php/rest_server/kegiatan')
    .then(response => response.json())
    .then((json) => {
      // Dispose of the activity loader via direct reference
      activityIndicator.dispose();

      // Show the result location data
      for (var i = 0; i < json.length; i++) {
      	createTextView('Alias: ' + json[i].alias);
      }

      // Create the reload button
      createReloadButton();
    }).catch((err) => {

      // On error, show what went wrong and reload button
      createTextView('Failure: ' + (err || 'Error loading geo-data'));
      createReloadButton();
    });
}

loadData();