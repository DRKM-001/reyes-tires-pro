import type { Lang } from "./core";

export const quoteStrings: Record<Lang, {
  title: string; sub: string; size: string; sizeHint: string; sizeHelp: string;
  qty: string; type: string; used: string; new: string; either: string;
  vehicle: string; optional: string; vehiclePh: string; name: string; namePh: string;
  send: string; sendWith: (size: string) => string; opens: (num: string) => string;
  preview: string; photo: string; photoLink: string; sendShort: (size: string) => string;
  readAs: (size: string) => string; check: string;
  tabs: { tires: string; wheels: string; package: string };
  subs: { tires: string; wheels: string; package: string };
  wheelSize: string; wheelSizePh: string; style: string; stylePh: string;
  vehicleReq: string; vehicleReqPh: string; tireOptional: string; tireOptionalHint: string; other: string;
  noWa: string; phone: string; directSend: string; directHint: string; directSent: (p: string) => string; directError: string;
}> = {
  en: {
    title: "Get a Fast Quote", sub: "Send your size on WhatsApp. We answer anytime.",
    size: "Tire size", sizeHint: "It's on the sidewall. Type it any way: 2254517 or 225 45 17 works", sizeHelp: "Where to find it",
    qty: "How many", type: "Type", used: "Used", new: "New", either: "Either",
    vehicle: "Vehicle", optional: "(optional)", vehiclePh: "e.g. 2019 Honda Civic", name: "Name", namePh: "Your name",
    send: "Send on WhatsApp", sendWith: (s) => `Send ${s} on WhatsApp`, opens: (n) => `Opens WhatsApp to ${n}`,
    preview: "Your message", photo: "No size handy?", photoLink: "Send us a photo of your tire instead",
    sendShort: (s) => `Send ${s}`,
    tabs: { tires: "Tires", wheels: "Wheels", package: "Combo" },
    subs: { tires: "Send your size on WhatsApp. We answer anytime.", wheels: "Tell us your vehicle and the look you want.", package: "Wheel + tire combo, mounted and balanced, ready to go." },
    wheelSize: "Wheel size", wheelSizePh: "e.g. 20", style: "Style", stylePh: "Black, chrome, machined…",
    vehicleReq: "Vehicle", vehicleReqPh: "Year, make, model, e.g. 2018 Toyota Tacoma",
    tireOptional: "Tire size", tireOptionalHint: "Leave blank and we'll recommend one.", other: "Other",
    noWa: "No WhatsApp? Send the request from here", phone: "Your phone number", directSend: "Send request",
    directHint: "We'll text or call you back with a price.", directSent: (p) => `Got it. We'll get back to you at ${p}.`,
    directError: "That didn't go through. Please call (442) 999-5014 or use WhatsApp.",
    readAs: (s) => `Read as ${s}`, check: "Double-check the size. It usually looks like 225/45R17, LT265/70R17 or 35X12.50R17. We'll send it as typed.",
  },
  es: {
    title: "Precio Rápido", sub: "Mande su medida por WhatsApp. Contestamos a toda hora.",
    size: "Medida de la llanta", sizeHint: "Viene en el costado. Escríbala como sea: 2254517 o 225 45 17 funciona", sizeHelp: "Dónde encontrarla",
    qty: "Cuántas", type: "Tipo", used: "Usadas", new: "Nuevas", either: "Cualquiera",
    vehicle: "Vehículo", optional: "(opcional)", vehiclePh: "ej. Honda Civic 2019", name: "Nombre", namePh: "Su nombre",
    send: "Mandar por WhatsApp", sendWith: (s) => `Mandar ${s} por WhatsApp`, opens: (n) => `Abre WhatsApp al ${n}`,
    preview: "Su mensaje", photo: "¿No tiene la medida?", photoLink: "Mándenos una foto de su llanta",
    sendShort: (s) => `Mandar ${s}`,
    tabs: { tires: "Llantas", wheels: "Rines", package: "Combo" },
    subs: { tires: "Mande su medida por WhatsApp. Contestamos a toda hora.", wheels: "Díganos su vehículo y el estilo que quiere.", package: "Combo de rin + llanta, montado, balanceado y listo." },
    wheelSize: "Medida del rin", wheelSizePh: "ej. 20", style: "Estilo", stylePh: "Negro, cromado, maquinado…",
    vehicleReq: "Vehículo", vehicleReqPh: "Año, marca, modelo, ej. Toyota Tacoma 2018",
    tireOptional: "Medida de llanta", tireOptionalHint: "Déjela vacía y le recomendamos una.", other: "Otra",
    noWa: "¿No tiene WhatsApp? Mande la solicitud desde aquí", phone: "Su número de teléfono", directSend: "Mandar solicitud",
    directHint: "Le mandamos mensaje o le llamamos con el precio.", directSent: (p) => `Listo. Le contactamos al ${p}.`,
    directError: "No se pudo mandar. Llame al (442) 999-5014 o use WhatsApp.",
    readAs: (s) => `Leído como ${s}`, check: "Revise la medida. Normalmente se ve así: 225/45R17, LT265/70R17 o 35X12.50R17. La mandamos como la escribió.",
  },
};
