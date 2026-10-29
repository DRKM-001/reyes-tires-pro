#!/usr/bin/env python3
"""Builds index.html (English) and es/index.html (Spanish) from one template.
Run from the repo root:  python3 tools/build.py
Edit facts in FACTS and copy in T, never in the generated HTML."""
import json, math, os

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

FACTS = {
    "phone": "(442) 999-5014", "phone_e164": "+14429995014",
    "wa": "(619) 564-1742", "wa_num": "16195641742",
    "street": "260 N Juniper St", "city": "Escondido, CA 92025",
    "google_rating": "4.9", "google_count": "112",   # checked 2026-10-28; update in the monthly check
    "instagram": "https://www.instagram.com/reyestirespro/",
    "yelp": "https://www.yelp.com/biz/reyes-tires-pro-escondido",
    "dir": "https://www.google.com/maps/dir/?api=1&amp;destination=Reyes+Tires+Pro,+260+N+Juniper+St,+Escondido,+CA+92025",
    "reviews": "https://www.google.com/maps/search/?api=1&amp;query=Reyes+Tires+Pro,+260+N+Juniper+St,+Escondido,+CA+92025",
    "map_embed": "https://maps.google.com/maps?q=Reyes%20Tires%20Pro%2C%20260%20N%20Juniper%20St%2C%20Escondido%2C%20CA%2092025&amp;z=16&amp;output=embed",
}
# Short quotes from public Google reviews of the shop (seen on the Google listing 2026-10-28).
REVIEWS = [
    "This is the best place in town for the best customer service and price.",
    "Fair prices, clean shop, personable staff.",
    "Great dude, best prices, great services.",
]
BRANDS = ["Michelin", "BFGoodrich", "Pirelli", "Falken", "Milestar", "Forte"]

T = {
 "en": {
  "lang": "en", "path": "/", "alt_path": "/es/", "alt_label": "Español", "alt_lang": "es",
  "title": "Reyes Tires Pro | Used and New Tires &amp; Wheels in Escondido, CA",
  "desc": "Used and new tires and wheels at Juniper and Pennsylvania in Escondido. Installation, balancing, repair, rotation and TPMS. Send your tire size on WhatsApp or call (442) 999-5014.",
  "og_title": "Reyes Tires Pro | Used and New Tires &amp; Wheels in Escondido",
  "og_desc": "Send your tire size on WhatsApp for a quote, or call (442) 999-5014. 260 N Juniper St, Escondido.",
  "locale": "en_US", "skip": "Skip to content", "nav_label": "Main",
  "nav": [("/tire-size-guide/", "Size guide"), ("/tire-basics/", "Tire basics")],
  "status_default": "Open 7 days. WhatsApp answered anytime.",
  "h1": "Used and new tires in Escondido",
  "lede": "Read the size off the side of your tire, send it to us, and we'll tell you what we have and what it costs.",
  "size_label": "Your tire size", "size_hint": "It's printed on the sidewall, like 225/45R17 or LT265/70R17.", "size_hint_link": ("/tire-size-guide/", "Where to find it"),
  "qty": "How many", "type": "Type", "used": "Used", "new": "New", "either": "Either",
  "wa_btn": "Send size on WhatsApp", "call_btn": "Call",
  "anytime": "We answer WhatsApp anytime, even after the shop closes.",
  "wa_plain": "Hi, I would like to get a quote on tires.",
  "proof": [("star", "<strong>{r} on Google</strong>From {c} reviews"), ("clock", "<strong>Open 7 days</strong>Sunday until 3 pm"),
            ("chat", "<strong>English y español</strong>At the counter and on WhatsApp"), ("pin", "<strong>Juniper &amp; Pennsylvania</strong>Look for the RT sign")],
  "shop_h": "The shop on Juniper", "shop_p": "Walk in, pull into a bay, and leave on new rubber.",
  "photos": [("shop-corner", 447, 447, "The corner of Juniper and Pennsylvania with the RT pole sign", "Juniper &amp; Pennsylvania"),
             ("shop-bay", 382, 510, "The Tire Service bay with tire machines and racks of tires", "The tire service bay"),
             ("shop-amg", 382, 510, "A Mercedes in the bay getting new tires", "In the bay"),
             ("shop-truck", 680, 510, "A red pickup on black off-road wheels and tires outside the shop", "Wheels and tires, done here")],
  "svc_h": "What we do", "svc_p": "Ask for a price on WhatsApp or by phone.",
  "services": [("tire", "Used and new tires", "Every size except large farm and agricultural tires."),
               ("wheel", "Wheels", "Forte wheels, and wheel and tire packages."),
               ("mount", "Tire installation", "Mounted on your wheels."),
               ("balance", "Balancing", "So the ride stays smooth at speed."),
               ("patch", "Tire repair", "Flats and punctures."),
               ("rotate", "Rotation", "Even wear, longer life."),
               ("tpms", "TPMS repair", "Tire pressure sensors.")],
  "rev_h": "What customers say", "rev_count": "{c} Google reviews", "rev_src": "Google review", "rev_link": "Read all {c} reviews on Google",
  "brands_h": "Brands we carry", "brands_p": "Used and new tires in these brands, plus Forte wheels.",
  "visit_h": "Visit the shop", "corner": "Corner of Juniper and Pennsylvania.",
  "phone_l": "Phone", "wa_l": "WhatsApp", "wa_any": "answered anytime", "dir_btn": "Get directions", "map_title": "Map to Reyes Tires Pro",
  "days": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"], "h_week": "8 am to 6 pm", "h_sun": "8 am to 3 pm", "hours_label": "Opening hours",
  "faq_h": "Questions people ask",
  "faq": [("Do you sell both used and new tires?", "Yes. We sell quality used and new tires, and wheels."),
          ("What brands do you carry?", "Michelin, BFGoodrich, Pirelli, Falken and Milestar tires, plus Forte wheels."),
          ("Do you have my size?", "We carry all sizes except large farm and agricultural tires. Send your size on WhatsApp or call (442) 999-5014 to check what's in stock today."),
          ("How do I get a price?", "Type your tire size at the top of this page and send it on WhatsApp, or call (442) 999-5014. Prices depend on the size, the brand, and whether you want used or new."),
          ("Can I message you after hours?", "Yes. We answer WhatsApp at (619) 564-1742 anytime, even when the shop is closed."),
          ("Where are you?", "260 N Juniper St, Escondido, CA 92025, on the corner of Juniper and Pennsylvania. Open Monday to Saturday 8 am to 6 pm and Sunday 8 am to 3 pm.")],
  "guides_h": "Before you buy",
  "guides": [("/tire-size-guide/", "How to read a tire size", "What 225/45R17 means, and where to find it on your car."),
             ("/tire-basics/", "Tire basics", "Used or new, how much tread is enough, and how old is too old.")],
  "slogan": "We perform better.",
  "foot_hours": "Monday to Saturday 8 am to 6 pm, Sunday 8 am to 3 pm.",
  "thumb": ["Call", "WhatsApp", "Directions"], "thumb_label": "Quick contact",
 },
 "es": {
  "lang": "es", "path": "/es/", "alt_path": "/", "alt_label": "English", "alt_lang": "en",
  "title": "Reyes Tires Pro | Llantas usadas y nuevas en Escondido, CA",
  "desc": "Llantas y rines usados y nuevos en Juniper y Pennsylvania, Escondido. Montaje, balanceo, reparación, rotación y TPMS. Mándenos su medida por WhatsApp o llame al (442) 999-5014.",
  "og_title": "Reyes Tires Pro | Llantas usadas y nuevas en Escondido",
  "og_desc": "Mándenos su medida por WhatsApp y le damos precio, o llame al (442) 999-5014. 260 N Juniper St, Escondido.",
  "locale": "es_US", "skip": "Ir al contenido", "nav_label": "Principal",
  "nav": [("/es/medidas-de-llantas/", "Medidas"), ("/es/llantas-basico/", "Lo básico")],
  "status_default": "Abierto los 7 días. WhatsApp a toda hora.",
  "h1": "Llantas usadas y nuevas en Escondido",
  "lede": "Lea la medida en el costado de su llanta, mándenosla y le decimos qué tenemos y cuánto cuesta.",
  "size_label": "La medida de su llanta", "size_hint": "Viene impresa en el costado, por ejemplo 225/45R17 o LT265/70R17.", "size_hint_link": ("/es/medidas-de-llantas/", "Dónde encontrarla"),
  "qty": "Cuántas", "type": "Tipo", "used": "Usadas", "new": "Nuevas", "either": "Cualquiera",
  "wa_btn": "Mandar medida por WhatsApp", "call_btn": "Llamar",
  "anytime": "Contestamos WhatsApp a toda hora, aunque la tienda esté cerrada.",
  "wa_plain": "Hola, quisiera un precio de llantas.",
  "proof": [("star", "<strong>{r} en Google</strong>Con {c} reseñas"), ("clock", "<strong>Abierto los 7 días</strong>Domingo hasta las 3 p. m."),
            ("chat", "<strong>Se habla español</strong>En la tienda y por WhatsApp"), ("pin", "<strong>Juniper y Pennsylvania</strong>Busque el letrero de RT")],
  "shop_h": "La tienda en Juniper", "shop_p": "Llegue, métase a una bahía y váyase con llantas nuevas.",
  "photos": [("shop-corner", 447, 447, "La esquina de Juniper y Pennsylvania con el letrero de RT", "Juniper y Pennsylvania"),
             ("shop-bay", 382, 510, "La bahía de servicio con máquinas y racks de llantas", "La bahía de servicio"),
             ("shop-amg", 382, 510, "Un Mercedes en la bahía cambiando llantas", "En la bahía"),
             ("shop-truck", 680, 510, "Una pickup roja con rines negros todoterreno afuera de la tienda", "Rines y llantas, hechos aquí")],
  "svc_h": "Lo que hacemos", "svc_p": "Pida precio por WhatsApp o por teléfono.",
  "services": [("tire", "Llantas usadas y nuevas", "Todas las medidas menos llantas grandes agrícolas."),
               ("wheel", "Rines", "Rines Forte, y paquetes de rin con llanta."),
               ("mount", "Montaje de llantas", "Montadas en sus rines."),
               ("balance", "Balanceo", "Para que no vibre en carretera."),
               ("patch", "Reparación de llantas", "Ponchaduras y pinchazos."),
               ("rotate", "Rotación", "Desgaste parejo, más vida."),
               ("tpms", "Reparación de TPMS", "Sensores de presión de llantas.")],
  "rev_h": "Lo que dicen los clientes", "rev_count": "{c} reseñas en Google", "rev_src": "Reseña de Google", "rev_link": "Lea las {c} reseñas en Google",
  "brands_h": "Marcas", "brands_p": "Llantas usadas y nuevas de estas marcas, y rines Forte.",
  "visit_h": "Visite la tienda", "corner": "Esquina de Juniper y Pennsylvania.",
  "phone_l": "Teléfono", "wa_l": "WhatsApp", "wa_any": "a toda hora", "dir_btn": "Cómo llegar", "map_title": "Mapa a Reyes Tires Pro",
  "days": ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"], "h_week": "8 a. m. a 6 p. m.", "h_sun": "8 a. m. a 3 p. m.", "hours_label": "Horario",
  "faq_h": "Preguntas frecuentes",
  "faq": [("¿Venden llantas usadas y nuevas?", "Sí. Vendemos llantas usadas y nuevas de calidad, y rines."),
          ("¿Qué marcas manejan?", "Llantas Michelin, BFGoodrich, Pirelli, Falken y Milestar, y rines Forte."),
          ("¿Tienen mi medida?", "Manejamos todas las medidas menos llantas grandes agrícolas. Mándenos su medida por WhatsApp o llame al (442) 999-5014 para ver qué hay hoy."),
          ("¿Cómo pido un precio?", "Escriba la medida arriba y mándela por WhatsApp, o llame al (442) 999-5014. El precio depende de la medida, la marca y si la quiere usada o nueva."),
          ("¿Puedo escribirles fuera de horario?", "Sí. Contestamos WhatsApp al (619) 564-1742 a toda hora, aunque la tienda esté cerrada."),
          ("¿Dónde están?", "260 N Juniper St, Escondido, CA 92025, en la esquina de Juniper y Pennsylvania. Lunes a sábado de 8 a. m. a 6 p. m. y domingo de 8 a. m. a 3 p. m.")],
  "guides_h": "Antes de comprar",
  "guides": [("/es/medidas-de-llantas/", "Cómo leer la medida", "Qué significa 225/45R17 y dónde encontrarla en su carro."),
             ("/es/llantas-basico/", "Lo básico de las llantas", "Usadas o nuevas, cuánto dibujo es suficiente y qué tan vieja es demasiado vieja.")],
  "slogan": "We perform better.",
  "foot_hours": "Lunes a sábado de 8 a. m. a 6 p. m., domingo de 8 a. m. a 3 p. m.",
  "thumb": ["Llamar", "WhatsApp", "Cómo llegar"], "thumb_label": "Contacto rápido",
 },
}

ICON = {
 "phone": '<path d="M6.6 10.8a15.2 15.2 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25 11.4 11.4 0 0 0 3.6.57 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.25.2 2.45.57 3.57a1 1 0 0 1-.25 1z" fill="currentColor"/>',
 "chat": '<path d="M12 3C6.9 3 3 6.6 3 11c0 2 .8 3.8 2.2 5.2L4.5 21l4.4-1.8c1 .3 2 .4 3.1.4 5.1 0 9-3.6 9-8.3S17.1 3 12 3z" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="8" cy="11" r="1.2" fill="currentColor"/><circle cx="12" cy="11" r="1.2" fill="currentColor"/><circle cx="16" cy="11" r="1.2" fill="currentColor"/>',
 "pin": '<path d="M12 2a7 7 0 0 0-7 7c0 5.2 7 13 7 13s7-7.8 7-13a7 7 0 0 0-7-7zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5z" fill="currentColor"/>',
 "star": '<path d="M12 2.5l2.9 6 6.6.9-4.8 4.6 1.2 6.5L12 17.4l-5.9 3.1 1.2-6.5L2.5 9.4l6.6-.9z" fill="currentColor"/>',
 "clock": '<circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" stroke-width="2"/><path d="M12 7v5l3.5 2" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>',
 "tire": '<circle cx="12" cy="12" r="9.5" fill="none" stroke="currentColor" stroke-width="2.4"/><circle cx="12" cy="12" r="4.5" fill="none" stroke="currentColor" stroke-width="2"/><path d="M12 2.5v3M12 18.5v3M2.5 12h3M18.5 12h3M5.3 5.3l2.1 2.1M16.6 16.6l2.1 2.1M5.3 18.7l2.1-2.1M16.6 7.4l2.1-2.1" stroke="currentColor" stroke-width="1.6"/>',
 "wheel": '<circle cx="12" cy="12" r="9.5" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="12" cy="12" r="2.2" fill="currentColor"/><path d="M12 9.8V3.5M14.1 12.7l6-1.9M13.3 14.3l3.7 5.1M10.7 14.3L7 19.4M9.9 12.7l-6-1.9" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>',
 "mount": '<circle cx="12" cy="13" r="7.5" fill="none" stroke="currentColor" stroke-width="2.2"/><circle cx="12" cy="13" r="2.5" fill="none" stroke="currentColor" stroke-width="2"/><path d="M4 4l5 5" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/>',
 "balance": '<path d="M12 4v16M5 20h14M4 9h16" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><path d="M4 9l-2.5 5h5zM20 9l-2.5 5h5z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/>',
 "patch": '<rect x="4" y="9" width="16" height="6" rx="3" transform="rotate(-35 12 12)" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="10.5" cy="12.5" r=".9" fill="currentColor"/><circle cx="13.5" cy="11.5" r=".9" fill="currentColor"/>',
 "rotate": '<path d="M20 12a8 8 0 1 1-2.3-5.7" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/><path d="M20 4v5h-5" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>',
 "tpms": '<path d="M7 18.5A8 8 0 1 1 17 18.5" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/><path d="M12 13l3.5-4" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/><circle cx="12" cy="13.5" r="1.6" fill="currentColor"/>',
}
def icon(name, cls="ico"):
    return f'<svg class="{cls}" viewBox="0 0 24 24" aria-hidden="true">{ICON[name]}</svg>'

def logo(cls="logo"):
    # Redrawn from the shop's pole sign: red tire-profile crescent, blue R, red T.
    return (f'<svg class="{cls}" viewBox="0 0 100 52" aria-hidden="true">'
            '<path d="M24 4 A22 22 0 0 0 24 48 L30 48 A30 30 0 0 1 30 4 Z" fill="#e0262b"/>'
            '<text x="28" y="44" font-family="Barlow Condensed, Arial Narrow, sans-serif" font-style="italic" font-weight="800" font-size="50" fill="#1f63b0">R</text>'
            '<text x="56" y="44" font-family="Barlow Condensed, Arial Narrow, sans-serif" font-style="italic" font-weight="800" font-size="50" fill="#e0262b">T</text></svg>')

def tire_svg():
    """Hero sidewall. The size on the lower arc is live: it follows what the customer types."""
    c, out = 400, []
    blocks = []
    for i in range(72):
        a = i * 5
        w = 13 if i % 2 else 9
        blocks.append(f'<rect x="{c - w/2:.1f}" y="6" width="{w}" height="{30 if i % 2 else 24}" rx="2" transform="rotate({a} {c} {c})"/>')
    spokes = []
    for i in range(6):
        a = i * 60
        spokes.append(f'<path d="M{c-16} {c-60} L{c-34} {c-188} L{c+34} {c-188} L{c+16} {c-60} Z" transform="rotate({a} {c} {c})"/>')
    bolts = "".join(f'<circle cx="{c + 34*math.cos(math.radians(i*72-90)):.1f}" cy="{c + 34*math.sin(math.radians(i*72-90)):.1f}" r="5"/>' for i in range(5))
    return f'''<svg class="tire" viewBox="0 0 800 800" role="img" aria-labelledby="tire-t">
        <title id="tire-t">A tire with your size on the sidewall</title>
        <defs>
          <radialGradient id="sw" cx="50%" cy="50%" r="50%"><stop offset="55%" stop-color="#2b2e34"/><stop offset="80%" stop-color="#202328"/><stop offset="100%" stop-color="#16181b"/></radialGradient>
          <radialGradient id="rim" cx="45%" cy="40%" r="60%"><stop offset="0" stop-color="#e9ebee"/><stop offset=".6" stop-color="#a9aeb6"/><stop offset="1" stop-color="#6d727a"/></radialGradient>
          <path id="arcTop" d="M 120 400 A 280 280 0 0 1 680 400"/>
          <path id="arcBot" d="M 105 400 A 295 295 0 0 0 695 400"/>
          <filter id="raised" x="-5%" y="-5%" width="110%" height="110%"><feDropShadow dx="0" dy="2" stdDeviation="0" flood-color="#000" flood-opacity=".7"/></filter>
        </defs>
        <g class="tire-spin">
          <circle cx="{c}" cy="{c}" r="394" fill="#141619"/>
          <g fill="#0d0e10">{"".join(blocks)}</g>
          <circle cx="{c}" cy="{c}" r="352" fill="url(#sw)"/>
          <circle cx="{c}" cy="{c}" r="352" fill="none" stroke="#3a3e45" stroke-width="2"/>
          <circle cx="{c}" cy="{c}" r="228" fill="none" stroke="#3a3e45" stroke-width="2"/>
          <g filter="url(#raised)" fill="#f3f3ef" font-family="Barlow Condensed, Arial Narrow, sans-serif" font-weight="800">
            <text font-size="58" letter-spacing="6"><textPath href="#arcTop" startOffset="50%" text-anchor="middle">REYES TIRES PRO</textPath></text>
            <text font-size="66" letter-spacing="5"><textPath href="#arcBot" startOffset="50%" text-anchor="middle" data-tire-size>225/45R17</textPath></text>
          </g>
          <circle cx="{c}" cy="{c}" r="214" fill="url(#rim)"/>
          <circle cx="{c}" cy="{c}" r="196" fill="#1b1d21"/>
          <g fill="url(#rim)">{"".join(spokes)}</g>
          <circle cx="{c}" cy="{c}" r="64" fill="url(#rim)"/>
          <g fill="#2a2d33">{bolts}</g>
          <circle cx="{c}" cy="{c}" r="20" fill="#e0262b"/>
        </g>
      </svg>'''

def page(L):
    t = T[L]; F = FACTS
    wa_plain = f'https://wa.me/{F["wa_num"]}?text=' + t["wa_plain"].replace(" ", "%20").replace(",", "%2C")
    alts = "".join(f'  <link rel="alternate" hreflang="{h}" href="https://reyestirespro.com{p}">\n' for h, p in [("en", "/"), ("es", "/es/"), ("x-default", "/")])
    nav = "".join(f'<a href="{h}" class="hide-sm">{l}</a>' for h, l in t["nav"])
    ld = {
      "@context": "https://schema.org", "@type": "TireShop", "@id": "https://reyestirespro.com/#business",
      "name": "Reyes Tires Pro", "slogan": "We perform better.",
      "description": "Quality used and new tires and wheels in Escondido, California, with tire installation, balancing, repair, rotation and TPMS repair.",
      "url": "https://reyestirespro.com/", "logo": "https://reyestirespro.com/assets/favicon.svg",
      "image": ["https://reyestirespro.com/assets/shop-corner.jpg", "https://reyestirespro.com/assets/shop-bay.jpg", "https://reyestirespro.com/assets/og.png"],
      "telephone": "+1-442-999-5014", "sameAs": [F["instagram"], F["yelp"]], "knowsLanguage": ["en", "es"],
      "hasMap": "https://www.google.com/maps/search/?api=1&query=260+N+Juniper+St,+Escondido,+CA+92025",
      "contactPoint": [
        {"@type": "ContactPoint", "telephone": "+1-442-999-5014", "contactType": "customer service", "availableLanguage": ["English", "Spanish"]},
        {"@type": "ContactPoint", "telephone": "+1-619-564-1742", "contactType": "customer service", "name": "WhatsApp", "availableLanguage": ["English", "Spanish"], "hoursAvailable": {"@type": "OpeningHoursSpecification", "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"], "opens": "00:00", "closes": "23:59"}}],
      "address": {"@type": "PostalAddress", "streetAddress": "260 N Juniper St", "addressLocality": "Escondido", "addressRegion": "CA", "postalCode": "92025", "addressCountry": "US"},
      "areaServed": {"@type": "City", "name": "Escondido"},
      "openingHoursSpecification": [
        {"@type": "OpeningHoursSpecification", "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"], "opens": "08:00", "closes": "18:00"},
        {"@type": "OpeningHoursSpecification", "dayOfWeek": "Sunday", "opens": "08:00", "closes": "15:00"}],
      "brand": [{"@type": "Brand", "name": b} for b in BRANDS],
      "makesOffer": [{"@type": "Offer", "itemOffered": {"@type": "Product", "name": n}} for n in ["Used tires", "New tires", "Wheels"]] +
                    [{"@type": "Offer", "itemOffered": {"@type": "Service", "name": n}} for n in ["Tire installation", "Tire balancing", "Tire repair", "Tire rotation", "Tire pressure monitoring system (TPMS) repair"]],
    }
    faq_ld = {"@context": "https://schema.org", "@type": "FAQPage", "inLanguage": L,
              "mainEntity": [{"@type": "Question", "name": q, "acceptedAnswer": {"@type": "Answer", "text": a}} for q, a in t["faq"]]}
    proof = "".join(f'<li>{icon(i)}<span>{s.format(r=F["google_rating"], c=F["google_count"])}</span></li>' for i, s in t["proof"])
    photos = "".join(f'''<figure class="ph ph-{i+1}"><picture><source srcset="/assets/{n}.webp" type="image/webp"><img src="/assets/{n}.jpg" width="{w}" height="{h}" alt="{alt}" loading="lazy" decoding="async"></picture><figcaption>{cap}</figcaption></figure>''' for i, (n, w, h, alt, cap) in enumerate(t["photos"]))
    services = "".join(f'<li>{icon(i, "svc-ico")}<div><h3>{n}</h3><p>{d}</p></div></li>' for i, n, d in t["services"])
    reviews = "".join(f'<blockquote><p>{q}</p><footer>{icon("star","stars")}{icon("star","stars")}{icon("star","stars")}{icon("star","stars")}{icon("star","stars")}<span>{t["rev_src"]}</span></footer></blockquote>' for q in REVIEWS)
    brands = "".join(f"<li>{b}</li>" for b in BRANDS)
    dmap = [1, 2, 3, 4, 5, 6, 0]
    hours = "".join(f'<tr data-day="{dmap[i]}"><th scope="row">{d}</th><td>{t["h_sun"] if i == 6 else t["h_week"]}</td></tr>' for i, d in enumerate(t["days"]))
    faq = "".join(f"<details><summary>{q}</summary><p>{a}</p></details>" for q, a in t["faq"])
    guides = "".join(f'<a class="guide" href="{h}"><strong>{a}</strong>{b}</a>' for h, a, b in t["guides"])
    chip = lambda n, v, l, chk=False: f'<label class="chip"><input type="radio" name="{n}" value="{v}"{" checked" if chk else ""}><span>{l}</span></label>'
    return f'''<!doctype html>
<html lang="{t["lang"]}">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
  <title>{t["title"]}</title>
  <meta name="description" content="{t["desc"]}">
  <meta name="robots" content="index, follow, max-image-preview:large">
  <link rel="canonical" href="https://reyestirespro.com{t["path"]}">
{alts}  <meta name="theme-color" content="#24272c">
  <link rel="icon" href="/assets/favicon.svg" type="image/svg+xml">
  <link rel="preload" href="/assets/fonts/barlow-condensed-latin-800-normal.woff2" as="font" type="font/woff2" crossorigin>
  <link rel="stylesheet" href="/assets/site.css">
  <meta property="og:type" content="website">
  <meta property="og:site_name" content="Reyes Tires Pro">
  <meta property="og:title" content="{t["og_title"]}">
  <meta property="og:description" content="{t["og_desc"]}">
  <meta property="og:url" content="https://reyestirespro.com{t["path"]}">
  <meta property="og:image" content="https://reyestirespro.com/assets/og.png">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta property="og:locale" content="{t["locale"]}">
  <meta name="twitter:card" content="summary_large_image">
  <script type="application/ld+json">{json.dumps(ld, ensure_ascii=False)}</script>
  <script type="application/ld+json">{json.dumps(faq_ld, ensure_ascii=False)}</script>
</head>
<body class="home">
  <a class="skip" href="#main">{t["skip"]}</a>
  <header class="top"><div class="wrap">
    <a class="brand" href="{t["path"]}" aria-label="Reyes Tires Pro">{logo()}<span class="brand-word">Reyes Tires Pro</span></a>
    <nav aria-label="{t["nav_label"]}">{nav}<a href="{t["alt_path"]}" hreflang="{t["alt_lang"]}" lang="{t["alt_lang"]}">{t["alt_label"]}</a><a class="top-call" href="tel:{F["phone_e164"]}" data-track="call">{icon("phone")}<span>{F["phone"]}</span></a></nav>
  </div></header>

  <section class="sidewall hero" aria-labelledby="title">
    <div class="tire-wrap" aria-hidden="false">{tire_svg()}</div>
    <div class="wrap hero-grid">
      <div class="hero-copy">
        <p class="status" data-status>{t["status_default"]}</p>
        <h1 id="title">{t["h1"]}</h1>
        <p class="lede">{t["lede"]}</p>
        <form class="quote" data-quote action="https://wa.me/{F["wa_num"]}" method="get">
          <label class="size-label" for="size">{t["size_label"]}</label>
          <input class="size-input" id="size" name="size" type="text" autocomplete="off" autocapitalize="characters" spellcheck="false" placeholder="225/45R17" maxlength="24">
          <p class="hint">{t["size_hint"]} <a href="{t["size_hint_link"][0]}">{t["size_hint_link"][1]}</a></p>
          <div class="opts">
            <fieldset><legend>{t["qty"]}</legend>{chip("qty","1","1")}{chip("qty","2","2")}{chip("qty","4","4",True)}</fieldset>
            <fieldset><legend>{t["type"]}</legend>{chip("cond","used",t["used"])}{chip("cond","new",t["new"])}{chip("cond","either",t["either"],True)}</fieldset>
          </div>
          <div class="actions">
            <a class="btn btn-wa" data-wa-quote data-track="whatsapp_quote" href="{wa_plain}">{icon("chat")} {t["wa_btn"]}</a>
            <a class="btn btn-ghost" href="tel:{F["phone_e164"]}" data-track="call">{icon("phone")} {t["call_btn"]} {F["phone"]}</a>
          </div>
          <p class="anytime">{t["anytime"]}</p>
        </form>
      </div>
    </div>
  </section>

  <section class="proof" aria-label="Reyes Tires Pro"><div class="wrap"><ul>{proof}</ul></div></section>

  <main id="main">
    <section class="wrap section shop" aria-labelledby="shop">
      <div class="sec-head"><h2 id="shop">{t["shop_h"]}</h2><p class="muted">{t["shop_p"]}</p></div>
      <div class="mosaic">{photos}</div>
    </section>

    <section class="wrap section" aria-labelledby="services">
      <div class="sec-head"><h2 id="services">{t["svc_h"]}</h2><p class="muted">{t["svc_p"]}</p></div>
      <ul class="svc">{services}</ul>
    </section>

    <section class="reviews" aria-labelledby="reviews"><div class="wrap">
      <div class="rev-head">
        <h2 id="reviews">{t["rev_h"]}</h2>
        <p class="rating"><span class="big">{F["google_rating"]}</span><span>{icon("star","stars")}{icon("star","stars")}{icon("star","stars")}{icon("star","stars")}{icon("star","stars")}<br>{t["rev_count"].format(c=F["google_count"])}</span></p>
      </div>
      <div class="quotes">{reviews}</div>
      <p><a class="rev-link" href="{F["reviews"]}" data-track="reviews">{t["rev_link"].format(c=F["google_count"])}</a></p>
    </div></section>

    <section class="wrap section" aria-labelledby="brands">
      <div class="sec-head"><h2 id="brands">{t["brands_h"]}</h2><p class="muted">{t["brands_p"]}</p></div>
      <ul class="brandwall">{brands}</ul>
    </section>

    <section class="wrap section" aria-labelledby="visit">
      <div class="visit2">
        <div class="visit-info">
          <h2 id="visit">{t["visit_h"]}</h2>
          <address>{F["street"]}<br>{F["city"]}</address>
          <p class="muted">{t["corner"]}</p>
          <ul class="contact-list">
            <li>{t["phone_l"]}: <a href="tel:{F["phone_e164"]}" data-track="call">{F["phone"]}</a></li>
            <li>{t["wa_l"]}: <a href="{wa_plain}" data-track="whatsapp">{F["wa"]}</a>, {t["wa_any"]}</li>
          </ul>
          <a class="btn btn-call" href="{F["dir"]}" data-track="directions">{icon("pin")} {t["dir_btn"]}</a>
          <table class="hours" aria-label="{t["hours_label"]}">{hours}</table>
        </div>
        <div class="map"><iframe title="{t["map_title"]}" src="{F["map_embed"]}" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe></div>
      </div>
    </section>

    <section class="wrap section faq" aria-labelledby="faq">
      <h2 id="faq">{t["faq_h"]}</h2>
      {faq}
    </section>

    <section class="wrap section" aria-labelledby="learn">
      <h2 id="learn">{t["guides_h"]}</h2>
      <div class="guides">{guides}</div>
    </section>
  </main>

  <footer class="site"><div class="wrap foot-grid">
    <div><a class="brand" href="{t["path"]}">{logo()}<span class="brand-word">Reyes Tires Pro</span></a><p class="slogan">{t["slogan"]}</p></div>
    <div><p>{F["street"]}, {F["city"]}</p><p>{t["foot_hours"]}</p></div>
    <div><p>{t["phone_l"]} <a href="tel:{F["phone_e164"]}" data-track="call">{F["phone"]}</a></p><p>WhatsApp <a href="{wa_plain}" data-track="whatsapp">{F["wa"]}</a></p><p><a href="{F["instagram"]}">Instagram</a>, <a href="{F["yelp"]}">Yelp</a>, <a href="{F["reviews"]}">Google</a></p></div>
  </div></footer>
  <nav class="thumbbar" aria-label="{t["thumb_label"]}">
    <a class="t-call" href="tel:{F["phone_e164"]}" data-track="call">{icon("phone")}{t["thumb"][0]}</a>
    <a class="t-wa" href="{wa_plain}" data-track="whatsapp">{icon("chat")}{t["thumb"][1]}</a>
    <a class="t-dir" href="{F["dir"]}" data-track="directions">{icon("pin")}{t["thumb"][2]}</a>
  </nav>
  <script src="/assets/site.js" defer></script>
</body>
</html>
'''

# Shared header and footer for the guide pages and the 404 page.
SUB = {
  "tire-size-guide/index.html": ("en", "/tire-size-guide/", "/es/medidas-de-llantas/"),
  "tire-basics/index.html": ("en", "/tire-basics/", "/es/llantas-basico/"),
  "es/medidas-de-llantas/index.html": ("es", "/es/medidas-de-llantas/", "/tire-size-guide/"),
  "es/llantas-basico/index.html": ("es", "/es/llantas-basico/", "/tire-basics/"),
  "404.html": ("en", None, "/es/"),
}
def header(L, cur, alt):
    t = T[L]; F = FACTS
    nav = "".join(f'<a class="hide-sm" href="{h}"{' aria-current="page"' if h == cur else ''}>{l}</a>' for h, l in t["nav"])
    return (f'<header class="top"><div class="wrap">\n    <a class="brand" href="{t["path"]}" aria-label="Reyes Tires Pro">{logo()}<span class="brand-word">Reyes Tires Pro</span></a>\n'
            f'    <nav aria-label="{t["nav_label"]}">{nav}<a href="{alt}" hreflang="{t["alt_lang"]}" lang="{t["alt_lang"]}">{t["alt_label"]}</a>'
            f'<a class="top-call" href="tel:{F["phone_e164"]}" data-track="call">{icon("phone")}<span>{F["phone"]}</span></a></nav>\n  </div></header>')
def footer(L):
    t = T[L]; F = FACTS
    wa = f'https://wa.me/{F["wa_num"]}?text=' + t["wa_plain"].replace(" ", "%20").replace(",", "%2C")
    return (f'<footer class="site"><div class="wrap foot-grid">\n    <div><a class="brand" href="{t["path"]}">{logo()}<span class="brand-word">Reyes Tires Pro</span></a><p class="slogan">{t["slogan"]}</p></div>\n'
            f'    <div><p>{F["street"]}, {F["city"]}</p><p>{t["foot_hours"]}</p></div>\n'
            f'    <div><p>{t["phone_l"]} <a href="tel:{F["phone_e164"]}" data-track="call">{F["phone"]}</a></p><p>WhatsApp <a href="{wa}" data-track="whatsapp">{F["wa"]}</a></p><p><a href="{F["instagram"]}">Instagram</a>, <a href="{F["yelp"]}">Yelp</a>, <a href="{F["reviews"]}">Google</a></p></div>\n  </div></footer>')

def bust_cache():
    """Tag site.css and site.js with a content hash so browsers fetch the new version after every change."""
    import hashlib, re, glob
    tags = {}
    for a in ("site.css", "site.js"):
        h = hashlib.sha1(open(os.path.join(ROOT, "assets", a), "rb").read()).hexdigest()[:8]
        tags[a] = h
    for fp in glob.glob(os.path.join(ROOT, "**", "*.html"), recursive=True):
        s = open(fp).read()
        n = re.sub(r'/assets/(site\.(?:css|js))(\?v=[0-9a-f]+)?', lambda m: f"/assets/{m.group(1)}?v={tags[m.group(1)]}", s)
        if n != s:
            open(fp, "w").write(n)
    print("cache tags", tags)

if __name__ == "__main__":
    import re
    for p, (L, cur, alt) in SUB.items():
        fp = os.path.join(ROOT, p); s = open(fp).read()
        s = re.sub(r'<header class="top">.*?</header>', lambda m: header(L, cur, alt), s, count=1, flags=re.S)
        s = re.sub(r'<footer class="site">.*?</footer>', lambda m: footer(L), s, count=1, flags=re.S)
        open(fp, "w").write(s); print("patched", p)
    for L, out in [("en", "index.html"), ("es", "es/index.html")]:
        with open(os.path.join(ROOT, out), "w") as f:
            f.write(page(L))
        print("wrote", out)
    bust_cache()
