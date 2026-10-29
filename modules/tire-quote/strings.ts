import type { Lang } from "./core";

export const quoteStrings: Record<Lang, {
  title: string; sub: string; size: string; sizeHint: string; sizeHelp: string;
  qty: string; type: string; used: string; new: string; either: string;
  vehicle: string; optional: string; vehiclePh: string; name: string; namePh: string;
  send: string; sendWith: (size: string) => string; opens: (num: string) => string;
  preview: string; photo: string; photoLink: string; sendShort: (size: string) => string;
  readAs: (size: string) => string; check: string;
}> = {
  en: {
    title: "Get a Fast Quote", sub: "Send your size on WhatsApp. We answer anytime.",
    size: "Tire size", sizeHint: "It's on the sidewall. Type it any way: 2254517 or 225 45 17 works", sizeHelp: "Where to find it",
    qty: "How many", type: "Type", used: "Used", new: "New", either: "Either",
    vehicle: "Vehicle", optional: "(optional)", vehiclePh: "e.g. 2019 Honda Civic", name: "Name", namePh: "Your name",
    send: "Send on WhatsApp", sendWith: (s) => `Send ${s} on WhatsApp`, opens: (n) => `Opens WhatsApp to ${n}`,
    preview: "Your message", photo: "No size handy?", photoLink: "Send us a photo of your tire instead",
    sendShort: (s) => `Send ${s}`,
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
    readAs: (s) => `Leído como ${s}`, check: "Revise la medida. Normalmente se ve así: 225/45R17, LT265/70R17 o 35X12.50R17. La mandamos como la escribió.",
  },
};
