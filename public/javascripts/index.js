$(document).ready(init);

function init() {
  color_field = $('input');

  init_color_field();
  init_history();

  color_field.change(update_bgrd);
  color_field.change(update_location);
  color_field.change(to_history);
}

function init_color_field() {
  var bgrd_color = RGBToHex($('#wrapper').css('background-color'));
  picker = new jscolor.color(color_field[0], {
    pickerFaceColor: bgrd_color,
    pickerBorderColor: bgrd_color,
    pickerOnfocus: false,
    caps: false
  })
  picker.showPicker();
  window.setTimeout(function() {
    set_color(document.location.hash == "" ? '99aa44' : document.location.hash)
  }, 0)
}

function set_color(color) {
  picker.fromString(color);
  color_field.change();
}

function update_location() {
  document.location.hash = get_color();
}

function get_color() {
  return "" + picker
}

function update_bgrd(color) {
  $('body').css('background-color', '#' + get_color());
}


function init_history() {
  color_history = [];
  $('#wrapper').append('<section><h1>History</h1><div id="history"/></section>');
  $('section').delay(2000).fadeOut(1000);
  $('#wrapper').mouseover(show_history)
  $('#wrapper').mouseout(hide_history)
  $('body > div').mouseover(show_history)
}

function show_history() {
  $('section').show();
}
function hide_history() {
  $('section').hide();
}

function to_history() {
  var color = get_color();
  if (color_history.indexOf(color) > -1) {
    return;
  }
  color_history.push(color);

  $('#history').prepend('<div>#' + color + '</div>');

  var container = $('#history :first-child');
  container.css('background-color', '#' + color);
  container.css('color', color_field.css('color'));
  container.data('color', color);
  container.click(function() {
    set_color(container.data('color'));
  })
}

function RGBToHex(rgb) {
  function to_padded_hex(nr) {
    var result = new Number(nr).toString(16);
    return result.length == 1 ? "0" + result : result;
  }
  var rgb = rgb.replace(/rgb|\(|\)| /g, "").split(',')
  var hex = "#";
  for (var i = 0; i < rgb.length; i++) {
    hex += to_padded_hex(rgb[i]);
  }
  return hex;
}
