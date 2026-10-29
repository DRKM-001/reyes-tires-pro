// Service pages. Only services the shop has confirmed (claimed Yelp listing + shop).
// No prices or job times are stated: those come from the shop on WhatsApp or by phone.
import type { Lang } from "./api-types";

export type ServiceIcon = "tires" | "wheels" | "install" | "balance" | "repair" | "rotate" | "tpms";
export interface ServiceCopy {
  title: string; h1: string; metaTitle: string; metaDesc: string; lede: string;
  sections: { h: string; p: string }[];
  signs?: { h: string; items: string[] };
  faq: { q: string; a: string }[];
}
export interface Service { id: string; icon: ServiceIcon; slug: Record<Lang, string>; copy: Record<Lang, ServiceCopy> }

export const services: Service[] = [
  {
    id: "used-tires", icon: "tires", slug: { en: "used-tires", es: "llantas-usadas" },
    copy: {
      en: {
        title: "Used Tires", h1: "Used tires in Escondido",
        metaTitle: "Used Tires in Escondido, CA | Reyes Tires Pro",
        metaDesc: "Quality used tires in every size except large farm tires, at Juniper & Pennsylvania in Escondido. Send your size on WhatsApp for a price. Se habla español.",
        lede: "A good used tire saves real money. We carry used tires in every size except large farm and agricultural tires, from brands like Michelin, BFGoodrich, Pirelli and Falken.",
        sections: [
          { h: "What to look for in a used tire", p: "Enough tread, no cuts or bulges in the sidewall, no badly placed patches, and a reasonable age. The DOT code on the sidewall tells you the week and year the tire was made. Ask us and we'll tell you the tread and age of the tires we have in your size." },
          { h: "Used or new?", p: "Used tires make sense when you want to keep costs down or need to match the tires already on the car. New tires make sense when you drive a lot of miles or want full tread and a known history. Tell us what you need and we'll quote both." },
        ],
        faq: [
          { q: "Do you have my size in used?", a: "We carry all sizes except large farm and agricultural tires. Stock changes daily, so send your size on WhatsApp and we'll tell you what we have today." },
          { q: "Do you install used tires?", a: "Yes. We mount and balance tires on your wheels." },
        ],
      },
      es: {
        title: "Llantas Usadas", h1: "Llantas usadas en Escondido",
        metaTitle: "Llantas usadas en Escondido, CA | Reyes Tires Pro",
        metaDesc: "Llantas usadas de calidad en todas las medidas menos agrícolas grandes, en Juniper y Pennsylvania, Escondido. Mande su medida por WhatsApp. Se habla español.",
        lede: "Una buena llanta usada ahorra dinero de verdad. Manejamos llantas usadas en todas las medidas menos llantas grandes agrícolas, de marcas como Michelin, BFGoodrich, Pirelli y Falken.",
        sections: [
          { h: "Qué revisar en una llanta usada", p: "Suficiente dibujo, sin cortes ni chipotes en el costado, sin parches mal puestos y que no sea muy vieja. El código DOT del costado dice la semana y el año en que se hizo. Pregúntenos y le decimos el dibujo y la edad de las llantas que tenemos en su medida." },
          { h: "¿Usadas o nuevas?", p: "Las usadas convienen cuando quiere gastar menos o necesita igualar las llantas que ya tiene el carro. Las nuevas convienen si maneja mucho o quiere todo el dibujo y una historia conocida. Díganos qué necesita y le damos precio de las dos." },
        ],
        faq: [
          { q: "¿Tienen mi medida en usada?", a: "Manejamos todas las medidas menos llantas grandes agrícolas. El inventario cambia cada día; mande su medida por WhatsApp y le decimos qué hay hoy." },
          { q: "¿Instalan llantas usadas?", a: "Sí. Montamos y balanceamos las llantas en sus rines." },
        ],
      },
    },
  },
  {
    id: "new-tires", icon: "tires", slug: { en: "new-tires", es: "llantas-nuevas" },
    copy: {
      en: {
        title: "New Tires", h1: "New tires in Escondido",
        metaTitle: "New Tires in Escondido, CA: Michelin, BFGoodrich, Pirelli, Falken, Milestar | Reyes Tires Pro",
        metaDesc: "New Michelin, BFGoodrich, Pirelli, Falken and Milestar tires at Reyes Tires Pro, Juniper & Pennsylvania, Escondido. Send your size for a quote.",
        lede: "New tires from Michelin, BFGoodrich, Pirelli, Falken and Milestar, installed and balanced at our shop on Juniper Street.",
        sections: [
          { h: "Picking the right tire", p: "Start with the size on your sidewall, then think about how you drive: daily commuting, highway miles, towing, or off-road. Tell us your vehicle and how you use it, and we'll suggest options in your size across brands and price points." },
          { h: "Stay with your vehicle's specs", p: "Your owner's manual and the sticker inside the driver's door list the size, load index and speed rating your vehicle needs. We match or exceed them." },
        ],
        faq: [
          { q: "Which brands do you carry?", a: "Michelin, BFGoodrich, Pirelli, Falken and Milestar tires, plus Forte wheels." },
          { q: "Can I get a price before I come in?", a: "Yes. Send your size on WhatsApp at (619) 564-1742, anytime, or call (442) 999-5014." },
        ],
      },
      es: {
        title: "Llantas Nuevas", h1: "Llantas nuevas en Escondido",
        metaTitle: "Llantas nuevas en Escondido, CA: Michelin, BFGoodrich, Pirelli, Falken, Milestar | Reyes Tires Pro",
        metaDesc: "Llantas nuevas Michelin, BFGoodrich, Pirelli, Falken y Milestar en Reyes Tires Pro, Juniper y Pennsylvania, Escondido. Mande su medida para un precio.",
        lede: "Llantas nuevas Michelin, BFGoodrich, Pirelli, Falken y Milestar, instaladas y balanceadas en nuestra tienda de la calle Juniper.",
        sections: [
          { h: "Cómo escoger la llanta correcta", p: "Empiece con la medida del costado y piense cómo maneja: diario, carretera, remolque o terracería. Díganos su vehículo y cómo lo usa, y le damos opciones en su medida de varias marcas y precios." },
          { h: "Respete las especificaciones", p: "El manual y la etiqueta dentro de la puerta del conductor indican la medida, el índice de carga y de velocidad que necesita su vehículo. Los igualamos o los superamos." },
        ],
        faq: [
          { q: "¿Qué marcas manejan?", a: "Llantas Michelin, BFGoodrich, Pirelli, Falken y Milestar, y rines Forte." },
          { q: "¿Me pueden dar precio antes de ir?", a: "Sí. Mande su medida por WhatsApp al (619) 564-1742, a toda hora, o llame al (442) 999-5014." },
        ],
      },
    },
  },
  {
    id: "wheels", icon: "wheels", slug: { en: "wheels", es: "rines" },
    copy: {
      en: {
        title: "Wheels", h1: "Wheels and wheel & tire packages",
        metaTitle: "Wheels in Escondido, CA: Forte Wheels & Tire Packages | Reyes Tires Pro",
        metaDesc: "Forte wheels and wheel-and-tire packages, mounted and balanced at Reyes Tires Pro in Escondido. Send your vehicle and size for a quote.",
        lede: "Forte wheels, and wheel-and-tire packages mounted and balanced here, so you roll out ready to go.",
        sections: [
          { h: "Getting the fitment right", p: "A wheel has to match your vehicle's bolt pattern, center bore, offset and size. Send us your vehicle (year, make, model) and the look you want, and we'll quote wheels that fit." },
          { h: "Wheel & tire packages", p: "Buying wheels and tires together means everything is mounted, balanced and checked in one visit." },
        ],
        faq: [
          { q: "What wheel brand do you carry?", a: "Forte wheels." },
          { q: "What do you need from me for a quote?", a: "Your vehicle's year, make and model, the wheel size you want, and your tire size if you're keeping your tires." },
        ],
      },
      es: {
        title: "Rines", h1: "Rines y paquetes de rin con llanta",
        metaTitle: "Rines en Escondido, CA: Rines Forte y paquetes | Reyes Tires Pro",
        metaDesc: "Rines Forte y paquetes de rin con llanta, montados y balanceados en Reyes Tires Pro, Escondido. Mande su vehículo y medida para un precio.",
        lede: "Rines Forte, y paquetes de rin con llanta montados y balanceados aquí, para que salga listo.",
        sections: [
          { h: "Que el rin quede bien", p: "El rin tiene que coincidir con el patrón de birlos, el centro, el offset y la medida de su vehículo. Mándenos su vehículo (año, marca, modelo) y el estilo que quiere, y le damos precio de rines que le queden." },
          { h: "Paquetes de rin con llanta", p: "Si compra rines y llantas juntos, todo se monta, se balancea y se revisa en una sola visita." },
        ],
        faq: [
          { q: "¿Qué marca de rines manejan?", a: "Rines Forte." },
          { q: "¿Qué necesitan para darme precio?", a: "Año, marca y modelo del vehículo, la medida de rin que quiere y la medida de llanta si se queda con sus llantas." },
        ],
      },
    },
  },
  {
    id: "tire-installation", icon: "install", slug: { en: "tire-installation", es: "montaje-de-llantas" },
    copy: {
      en: {
        title: "Tire Installation", h1: "Tire installation (mounting)",
        metaTitle: "Tire Installation in Escondido, CA | Reyes Tires Pro",
        metaDesc: "Tire mounting on your wheels at Reyes Tires Pro, Juniper & Pennsylvania, Escondido. Open 7 days. Send your size on WhatsApp.",
        lede: "We mount tires on your wheels with tire machines made for the job, then balance them so the car drives smooth.",
        sections: [
          { h: "What happens", p: "The old tire comes off the wheel, the new or used tire goes on, it's inflated to the right pressure, and the wheel goes back on your vehicle. Installing with balancing is the normal way to do it." },
        ],
        faq: [
          { q: "Do I need an appointment?", a: "Call or send a WhatsApp before coming in and we'll tell you how busy the shop is. We're open 7 days." },
          { q: "Will you install tires I bought somewhere else?", a: "Ask us on WhatsApp or by phone with your size and we'll let you know." },
        ],
      },
      es: {
        title: "Montaje de Llantas", h1: "Montaje (instalación) de llantas",
        metaTitle: "Montaje de llantas en Escondido, CA | Reyes Tires Pro",
        metaDesc: "Montamos llantas en sus rines en Reyes Tires Pro, Juniper y Pennsylvania, Escondido. Abierto los 7 días. Mande su medida por WhatsApp.",
        lede: "Montamos llantas en sus rines con máquinas hechas para eso, y las balanceamos para que el carro corra suave.",
        sections: [
          { h: "Cómo se hace", p: "Se quita la llanta vieja del rin, se monta la llanta nueva o usada, se infla a la presión correcta y el rin regresa al vehículo. Lo normal es montar y balancear juntos." },
        ],
        faq: [
          { q: "¿Necesito cita?", a: "Llame o mande WhatsApp antes de venir y le decimos qué tan ocupada está la tienda. Abrimos los 7 días." },
          { q: "¿Instalan llantas que compré en otro lado?", a: "Pregúntenos por WhatsApp o por teléfono con su medida y le decimos." },
        ],
      },
    },
  },
  {
    id: "tire-balancing", icon: "balance", slug: { en: "tire-balancing", es: "balanceo-de-llantas" },
    copy: {
      en: {
        title: "Tire Balancing", h1: "Tire balancing",
        metaTitle: "Tire Balancing in Escondido, CA | Reyes Tires Pro",
        metaDesc: "Wheel and tire balancing at Reyes Tires Pro in Escondido. Fix vibration at highway speed. Send a WhatsApp or call (442) 999-5014.",
        lede: "If the steering wheel or seat shakes at highway speed, an unbalanced tire is a common cause. Balancing fixes it.",
        sections: [
          { h: "What balancing does", p: "A balancing machine spins each wheel and finds the heavy spots. Small weights are added so the wheel turns evenly. That means a smoother ride and more even tire wear." },
        ],
        signs: { h: "Signs you need balancing", items: ["Vibration in the steering wheel or seat, usually at highway speed", "New tires were just mounted", "A wheel weight fell off", "Cupped or uneven tread wear"] },
        faq: [
          { q: "Do new tires need balancing?", a: "Yes. Every time a tire is mounted on a wheel, it should be balanced." },
        ],
      },
      es: {
        title: "Balanceo de Llantas", h1: "Balanceo de llantas",
        metaTitle: "Balanceo de llantas en Escondido, CA | Reyes Tires Pro",
        metaDesc: "Balanceo de llantas en Reyes Tires Pro, Escondido. Quite la vibración en carretera. Mande WhatsApp o llame al (442) 999-5014.",
        lede: "Si el volante o el asiento vibran en carretera, una causa común es una llanta desbalanceada. El balanceo lo arregla.",
        sections: [
          { h: "Qué hace el balanceo", p: "Una máquina gira cada rueda y encuentra los puntos pesados. Se ponen pesitas para que la rueda gire pareja. Eso da un manejo más suave y un desgaste más parejo." },
        ],
        signs: { h: "Señales de que necesita balanceo", items: ["Vibración en el volante o el asiento, sobre todo en carretera", "Le acaban de montar llantas", "Se cayó una pesita del rin", "Desgaste disparejo o con ondas en el dibujo"] },
        faq: [
          { q: "¿Las llantas nuevas se balancean?", a: "Sí. Cada vez que se monta una llanta en un rin, se debe balancear." },
        ],
      },
    },
  },
  {
    id: "flat-tire-repair", icon: "repair", slug: { en: "flat-tire-repair", es: "reparacion-de-llantas" },
    copy: {
      en: {
        title: "Flat Tire Repair", h1: "Flat tire repair",
        metaTitle: "Flat Tire Repair in Escondido, CA | Reyes Tires Pro",
        metaDesc: "Flat tire and puncture repair at Reyes Tires Pro, Juniper & Pennsylvania, Escondido. Open 7 days. WhatsApp answered anytime.",
        lede: "Got a nail or a slow leak? Many punctures in the tread can be repaired. We'll check it and tell you straight if it can be saved.",
        sections: [
          { h: "When a tire can be repaired", p: "Small punctures in the tread area can usually be repaired. Damage in the sidewall or shoulder, large cuts, or a tire that was driven flat for a long distance usually means replacing the tire. We'll show you what we find." },
          { h: "Driving on a flat", p: "Driving on a flat tire damages it from the inside, and it can damage the wheel. If you can, put on the spare or call us before driving far." },
        ],
        faq: [
          { q: "Can you fix a tire with a nail in it?", a: "Often, yes, if the nail is in the tread and not the sidewall. Bring it in and we'll take a look." },
          { q: "Are you open on Sunday?", a: "Yes, Sunday 8 AM to 3 PM. Monday to Saturday 8 AM to 6 PM." },
        ],
      },
      es: {
        title: "Reparación de Llantas", h1: "Reparación de llantas ponchadas",
        metaTitle: "Reparación de llantas ponchadas en Escondido, CA | Reyes Tires Pro",
        metaDesc: "Reparamos ponchaduras y pinchazos en Reyes Tires Pro, Juniper y Pennsylvania, Escondido. Abierto los 7 días. WhatsApp a toda hora.",
        lede: "¿Se le metió un clavo o pierde aire poco a poco? Muchos pinchazos en el dibujo se pueden reparar. La revisamos y le decimos claro si se puede salvar.",
        sections: [
          { h: "Cuándo se puede reparar", p: "Los pinchazos chicos en el área del dibujo normalmente se pueden reparar. Si el daño está en el costado o el hombro, si es un corte grande o si la llanta se manejó ponchada mucho tiempo, normalmente hay que cambiarla. Le enseñamos lo que encontramos." },
          { h: "Manejar con la llanta ponchada", p: "Manejar ponchado daña la llanta por dentro y puede dañar el rin. Si puede, ponga la de refacción o llámenos antes de manejar lejos." },
        ],
        faq: [
          { q: "¿Pueden arreglar una llanta con un clavo?", a: "Muchas veces sí, si el clavo está en el dibujo y no en el costado. Tráigala y la revisamos." },
          { q: "¿Abren en domingo?", a: "Sí, domingo de 8 a. m. a 3 p. m. Lunes a sábado de 8 a. m. a 6 p. m." },
        ],
      },
    },
  },
  {
    id: "tire-rotation", icon: "rotate", slug: { en: "tire-rotation", es: "rotacion-de-llantas" },
    copy: {
      en: {
        title: "Tire Rotation", h1: "Tire rotation",
        metaTitle: "Tire Rotation in Escondido, CA | Reyes Tires Pro",
        metaDesc: "Tire rotation at Reyes Tires Pro in Escondido for even wear and longer tire life. Open 7 days.",
        lede: "Front and rear tires wear differently. Rotating them moves each tire to a new position so the set wears evenly and lasts longer.",
        sections: [
          { h: "How often", p: "Your owner's manual gives the interval for your vehicle. Many drivers rotate every oil change. Uneven wear between front and rear is a sign it's time." },
        ],
        faq: [
          { q: "Why rotate tires?", a: "Even wear means the set lasts longer and you replace all four together instead of two at a time." },
        ],
      },
      es: {
        title: "Rotación de Llantas", h1: "Rotación de llantas",
        metaTitle: "Rotación de llantas en Escondido, CA | Reyes Tires Pro",
        metaDesc: "Rotación de llantas en Reyes Tires Pro, Escondido, para un desgaste parejo y más vida. Abierto los 7 días.",
        lede: "Las llantas de adelante y de atrás se gastan diferente. Rotarlas cambia cada llanta de lugar para que el juego se gaste parejo y dure más.",
        sections: [
          { h: "Cada cuándo", p: "El manual de su vehículo dice cada cuánto. Mucha gente las rota en cada cambio de aceite. Si las de adelante y las de atrás se ven gastadas diferente, ya toca." },
        ],
        faq: [
          { q: "¿Para qué rotar las llantas?", a: "Con desgaste parejo el juego dura más y cambia las cuatro juntas en vez de dos y dos." },
        ],
      },
    },
  },
  {
    id: "tpms-repair", icon: "tpms", slug: { en: "tpms-repair", es: "reparacion-tpms" },
    copy: {
      en: {
        title: "TPMS Repair", h1: "TPMS (tire pressure sensor) repair",
        metaTitle: "TPMS Sensor Repair in Escondido, CA | Reyes Tires Pro",
        metaDesc: "Tire pressure monitoring system (TPMS) sensor repair at Reyes Tires Pro in Escondido. Tire pressure light on? Send a WhatsApp.",
        lede: "Tire pressure light on? The TPMS sensors inside your wheels warn you when a tire is low. When a sensor fails or the light stays on, we can check and repair it.",
        sections: [
          { h: "Why the light comes on", p: "Usually a tire is low on air. If the pressure is right and the light stays on or flashes, a sensor may be damaged or its battery worn out. Cold mornings can also trigger the light." },
        ],
        signs: { h: "Bring it in if", items: ["The tire pressure light stays on after you fill the tires", "The light flashes when you start the car", "A sensor was damaged during a tire change"] },
        faq: [
          { q: "Is it safe to drive with the TPMS light on?", a: "Check your tire pressure as soon as you can. A low tire wears faster and handles worse. If the pressure is fine, have the sensors checked." },
        ],
      },
      es: {
        title: "Reparación de TPMS", h1: "Reparación de TPMS (sensores de presión)",
        metaTitle: "Reparación de sensores TPMS en Escondido, CA | Reyes Tires Pro",
        metaDesc: "Reparación de sensores de presión de llantas (TPMS) en Reyes Tires Pro, Escondido. ¿Se prendió la luz de presión? Mande un WhatsApp.",
        lede: "¿Se prendió la luz de presión de llantas? Los sensores TPMS dentro de los rines le avisan cuando una llanta está baja. Si un sensor falla o la luz no se apaga, lo revisamos y lo reparamos.",
        sections: [
          { h: "Por qué se prende la luz", p: "Casi siempre una llanta está baja de aire. Si la presión está bien y la luz sigue prendida o parpadea, puede que un sensor esté dañado o sin pila. Las mañanas frías también la pueden prender." },
        ],
        signs: { h: "Tráigalo si", items: ["La luz sigue prendida después de inflar las llantas", "La luz parpadea al encender el carro", "Se dañó un sensor en un cambio de llantas"] },
        faq: [
          { q: "¿Puedo manejar con la luz de TPMS prendida?", a: "Revise la presión de las llantas lo antes posible. Una llanta baja se gasta más rápido y maneja peor. Si la presión está bien, revise los sensores." },
        ],
      },
    },
  },
];

export const serviceBase: Record<Lang, string> = { en: "/services/", es: "/es/servicios/" };
export const serviceHref = (s: Service, lang: Lang) => `${serviceBase[lang]}${s.slug[lang]}/`;
export const findService = (lang: Lang, slug: string) => services.find((s) => s.slug[lang] === slug);
