$(document).ready(init);

function init() {
  color_field = $('.color');
  color_field.change(refresh);
  color_field.change(update_location);

  init_history();
  color_field.change(to_history);

  window.setTimeout(init_color, 0);
}

function init_color() {
  set_color(document.location.hash == "" ? '99aa44' : document.location.hash);
  color_field[0].color.showPicker();
}

function set_color(color) {
  color_field[0].color.fromString(color);
  color_field.change();
}

function refresh() {
  set_bgrd(get_color());
}

function update_location() {
  document.location.hash = get_color();
}

function get_color() {
  return '' + color_field.attr('color')
}

function set_bgrd(color) {
  $('body').css('background-color', '#' + color);
}


function init_history() {
  $('#wrapper').append('<section><h1>History</h1><div id="history"/></section>');
  color_history = []
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
