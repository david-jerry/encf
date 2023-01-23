// get bitcoin price
const api_url = 'https://api.cryptonator.com/api/ticker/btc-usd';

const time_interval = 2;
function addLeadingZero(num) {
  return (num <= 9) ? ("0" + num) : num;
}
function clientDateTime() {
  var date_time = new Date();
  // var weekday = date_time.getDay();
  // var today_date = date_time.getDate();
  // var month = date_time.getMonth();
  // var full_year = date_time.getFullYear();
  var curr_hour = date_time.getHours();
  var zero_added_curr_hour = addLeadingZero(curr_hour);
  var curr_min = date_time.getMinutes();
  var curr_sec = date_time.getSeconds();
  var curr_time = zero_added_curr_hour + ':' + curr_min + ':' + curr_sec;
  return curr_time
}
function makeHttpObject() {
  try { return new XMLHttpRequest(); }
  catch (error) { }
}
function bitcoinGetData() {
  var request = makeHttpObject();
  request.open("GET", api_url, false);
  request.send(null);
  return request.responseText;
}
function bitcoinDataHandler() {
  var raw_data_string = bitcoinGetData();
  var data = JSON.parse(raw_data_string);
  var base = data.ticker.base;
  var target = data.ticker.target;
  var price = data.ticker.price;
  var volume = data.ticker.volume;
  var change = data.ticker.change;
  var api_server_epoch_timestamp = data.timestamp;
  var api_success = data.success;
  var api_error = data.error;
  return price;
}


const btc_bal = document.getElementById("bal").innerHTML;

document.getElementById("btc_val").innerHTML = (Math.round(btc_bal) / Math.round(bitcoinDataHandler()));













//Fetch the price of Ethereum
const eth_api_url = 'https://api.cryptonator.com/api/ticker/eth-usd';

function ethereumHttpObject() {
  try { return new XMLHttpRequest(); }
  catch (error) { }
}
function ethereumGetData() {
  var request = ethereumHttpObject();
  request.open("GET", eth_api_url, false);
  request.send(null);
  console.log(request.responseText);
  return request.responseText;
}
function ethereumDataHandler() {
  var raw_data_string = ethereumGetData();

  var data = JSON.parse(raw_data_string);

  var base = data.ticker.base;
  var target = data.ticker.target;
  var price = data.ticker.price;
  var volume = data.ticker.volume;
  var change = data.ticker.change;
  var api_server_epoch_timestamp = data.timestamp;
  var api_success = data.success;
  var api_error = data.error;
  return price;
}

const eth_bal = document.getElementById("bal").innerHTML;

document.getElementById("eth_val").innerHTML = (Math.round(eth_bal) / Math.round(ethereumDataHandler()));


//Fetch the price of Litecoin
const ltc_api_url = 'https://api.cryptonator.com/api/ticker/usd-eur';
function litecoinHttpObject() {
  try { return new XMLHttpRequest(); }
  catch (error) { }
}
function litecoinGetData() {
  var request = litecoinHttpObject();
  request.open("GET", ltc_api_url, false);
  request.send(null);
  //console.log(request.responseText);	
  return request.responseText;
}
function litecoinDataHandler() {
  var raw_data_string = litecoinGetData();
  var data = JSON.parse(raw_data_string);
  var base = data.ticker.base;
  var target = data.ticker.target;
  var price = data.ticker.price;
  var volume = data.ticker.volume;
  var change = data.ticker.change;
  var api_server_epoch_timestamp = data.timestamp;
  var api_success = data.success;
  var api_error = data.error;
  return price;
}

const ltc_bal = document.getElementById("bal").innerHTML;

console.log(litecoinDataHandler())

document.getElementById("ltc_val").innerHTML = (litecoinDataHandler() * Math.round(ltc_bal));







$("#testimonial-slider").owlCarousel({
  items:3,
  itemsDesktop:[1000,3],
  itemsDesktopSmall:[979,2],
  itemsTablet:[768,2],
  itemsMobile:[650,1],
  pagination:true,
  autoPlay:true
});