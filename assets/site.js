/* Reyes Tires Pro: open-now status, size-to-WhatsApp quote, contact tap tracking. No dependencies. */
(function () {
  var lang = (document.documentElement.lang || 'en').slice(0, 2);
  var T = {
    en: {
      openUntil: function (h) { return 'Open now, closes at ' + h; },
      opensAt: function (d, h) { return 'Closed, opens ' + d + ' at ' + h + '. WhatsApp is answered anytime.'; },
      today: 'today', tomorrow: 'tomorrow',
      days: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      msgSize: function (n, cond, size) { return 'Hi, I would like a quote for ' + n + ' ' + cond + ' tire' + (n === '1' ? '' : 's') + ', size ' + size + '.'; },
      msgPlain: 'Hi, I would like to get a quote on tires.',
      cond: { used: 'used', new: 'new', either: 'used or new' }
    },
    es: {
      openUntil: function (h) { return 'Abierto ahora, cierra a las ' + h; },
      opensAt: function (d, h) { return 'Cerrado, abre ' + d + ' a las ' + h + (h.slice(-1) === '.' ? ' ' : '. ') + 'WhatsApp se contesta a toda hora.'; },
      today: 'hoy', tomorrow: 'mañana',
      days: ['el domingo', 'el lunes', 'el martes', 'el miércoles', 'el jueves', 'el viernes', 'el sábado'],
      msgSize: function (n, cond, size) { return 'Hola, quisiera un precio para ' + n + ' llanta' + (n === '1' ? '' : 's') + ' ' + cond + ', medida ' + size + '.'; },
      msgPlain: 'Hola, quisiera un precio de llantas.',
      cond: { used: 'usadas', new: 'nuevas', either: 'usadas o nuevas' }
    }
  }[lang] || null;
  if (!T) return;

  // Posted hours (Pacific time). 0 = Sunday. [open, close] in hours.
  var HOURS = { 0: [8, 15], 1: [8, 18], 2: [8, 18], 3: [8, 18], 4: [8, 18], 5: [8, 18], 6: [8, 18] };
  var WA = '16195641742';

  function fmtHour(h) {
    if (lang === 'es') return h > 12 ? (h - 12) + ' p. m.' : h + ' a. m.';
    return h > 12 ? (h - 12) + ' pm' : h + ' am';
  }
  function pacificNow() {
    var parts = new Intl.DateTimeFormat('en-US', { timeZone: 'America/Los_Angeles', weekday: 'short', hour: 'numeric', minute: 'numeric', hour12: false })
      .formatToParts(new Date());
    var o = {}; parts.forEach(function (p) { o[p.type] = p.value; });
    var day = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].indexOf(o.weekday);
    return { day: day, hour: (parseInt(o.hour, 10) % 24) + parseInt(o.minute, 10) / 60 };
  }
  var now = pacificNow();

  var status = document.querySelector('[data-status]');
  if (status) {
    var h = HOURS[now.day];
    if (now.hour >= h[0] && now.hour < h[1]) {
      status.textContent = T.openUntil(fmtHour(h[1]));
      status.classList.add('open');
    } else {
      var d = now.hour < h[0] ? now.day : (now.day + 1) % 7;
      var when = d === now.day ? T.today : (d === (now.day + 1) % 7 ? T.tomorrow : T.days[d]);
      status.textContent = T.opensAt(when, fmtHour(HOURS[d][0]));
      status.classList.add('closed');
    }
  }
  var row = document.querySelector('[data-day="' + now.day + '"]');
  if (row) row.classList.add('today');

  // Quote: build the WhatsApp message from the size the customer typed.
  var form = document.querySelector('[data-quote]');
  if (form) {
    var input = form.querySelector('[name=size]');
    var wa = form.querySelector('[data-wa-quote]');
    var tireText = document.querySelector('[data-tire-size]');
    function normalize(s) {
      return s.toUpperCase().replace(/\s+/g, '').replace(/^P(?=\d)/, '').replace(/[^0-9A-Z\/.\-]/g, '');
    }
    function update() {
      var size = normalize(input.value);
      var n = (form.querySelector('[name=qty]:checked') || {}).value || '4';
      var c = (form.querySelector('[name=cond]:checked') || {}).value || 'either';
      var msg = size.length >= 5 ? T.msgSize(n, T.cond[c], size) : T.msgPlain;
      if (tireText) tireText.textContent = size.length >= 3 ? size.slice(0, 14) : '225/45R17';
      wa.href = 'https://wa.me/' + WA + '?text=' + encodeURIComponent(msg);
    }
    input.addEventListener('input', function () {
      var pos = input.selectionStart, before = input.value;
      input.value = before.toUpperCase();
      try { input.setSelectionRange(pos, pos); } catch (e) {}
      update();
    });
    form.addEventListener('change', update);
    form.addEventListener('submit', function (e) { e.preventDefault(); update(); wa.click(); });
    update();
  }

  // Count contact taps. Uses Cloudflare Zaraz when it is turned on; does nothing otherwise.
  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('[data-track]');
    if (!a) return;
    try { if (window.zaraz && zaraz.track) zaraz.track(a.getAttribute('data-track'), { page: location.pathname, lang: lang }); } catch (err) {}
  });
})();
