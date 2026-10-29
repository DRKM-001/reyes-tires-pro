import type { Dict } from "@/lib/i18n";
import GuideLayout, { Card, SizeCode, Note, PartsTable } from "./GuideLayout";

export function SizeGuide({ t }: { t: Dict }) {
  if (t.lang === "es") return (
    <GuideLayout t={t} chip="Guía" title="Cómo leer la medida de una llanta"
      intro="Toda llanta trae la medida impresa en el costado, por ejemplo 225/45R17. Cada parte del código dice algo de la llanta."
      cta={{ quote: "Pedir precio para su medida", call: "Llamar al (442) 999-5014" }}>
      <SizeCode code="225/45R17" parts={[["225", "ancho (mm)"], ["45", "perfil (%)"], ["R", "radial"], ["17", "rin (pulg.)"]]} />
      <h2>Parte por parte</h2>
      <PartsTable head={["Parte", "Qué significa"]} rows={[
        ["225", "Ancho de la llanta en milímetros, de costado a costado."],
        ["45", "Perfil: la altura del costado es el 45% del ancho. Un número más bajo significa un costado más bajo y más firme."],
        ["R", "Construcción radial, la que usan casi todas las llantas de pasajero de hoy."],
        ["17", "Diámetro del rin en pulgadas. La llanta tiene que coincidir con el rin."]]} />
      <h2>Índice de carga y de velocidad</h2>
      <p>Después de la medida puede venir un código como <strong>94V</strong>. El número es el índice de carga, el peso máximo que aguanta cada llanta. La letra es el índice de velocidad. Use los códigos de su llanta o del manual del vehículo, y nunca ponga menos de lo que pide el fabricante.</p>
      <h2>Dónde encontrarla</h2>
      <p>Mire el costado de cualquier llanta de su carro. La medida está en letras en relieve, cerca del rin. También viene en la etiqueta dentro del marco de la puerta del conductor, con la medida original de su carro.</p>
      <h2>Otros números en el costado</h2>
      <p><strong>Código DOT de fecha:</strong> los últimos cuatro números dicen cuándo se hizo la llanta. &quot;2421&quot; significa la semana 24 de 2021. Las llantas envejecen aunque no se usen, así que revíselo en las usadas.</p>
      <Note><strong>¿Va a cambiar de medida?</strong> Otra medida puede cambiar la lectura del velocímetro, el manejo y el espacio en la salpicadera. Quédese en las medidas que indica el fabricante, o pregúntenos antes de cambiar.</Note>
    </GuideLayout>
  );
  return (
    <GuideLayout t={t} chip="Guide" title="How to read a tire size"
      intro="Every tire has a size printed on the sidewall, for example 225/45R17. Each part of that code tells you something about the tire."
      cta={{ quote: "Get a quote for your size", call: "Call (442) 999-5014" }}>
      <SizeCode code="225/45R17" parts={[["225", "width (mm)"], ["45", "aspect ratio (%)"], ["R", "radial"], ["17", "wheel (in)"]]} />
      <h2>The parts, one by one</h2>
      <PartsTable head={["Part", "Meaning"]} rows={[
        ["225", "Section width of the tire in millimeters, from sidewall to sidewall."],
        ["45", "Aspect ratio: the sidewall height is 45% of the width. A lower number means a shorter, stiffer sidewall."],
        ["R", "Radial construction, used on nearly all modern passenger tires."],
        ["17", "Wheel diameter in inches. The tire must match the wheel."]]} />
      <h2>Load index and speed rating</h2>
      <p>After the size you may see a code like <strong>94V</strong>. The number is the load index, the maximum weight one tire can carry. The letter is the speed rating. Use the codes printed on your tire or in your owner&apos;s manual, and never go below the manufacturer&apos;s specification.</p>
      <h2>Where to find it</h2>
      <p>Look at the side of any tire on your car. The size is in raised letters near the rim. It is also on the sticker inside the driver&apos;s door frame, which lists the size your car came with.</p>
      <h2>Other numbers on the sidewall</h2>
      <p><strong>DOT date code:</strong> the last four digits show when the tire was made. &quot;2421&quot; means week 24 of 2021. Tires age even when they are not driven, so check this on used tires.</p>
      <Note><strong>Changing sizes?</strong> A different size can affect speedometer accuracy, ride, and clearance. Stay within the sizes your vehicle&apos;s manufacturer lists, or ask a tire professional before you change.</Note>
    </GuideLayout>
  );
}

const basicsFaq = {
  en: [
    ["Are used tires safe?", "Used tires can be safe when they have enough tread, no damage, and a reasonable age. Check tread depth, sidewalls, and the DOT date code before you buy."],
    ["How much tread is legal?", "In most US states the legal minimum is 2/32 of an inch. Many people replace tires at about 4/32 of an inch, especially in rain."],
    ["How old is too old for a tire?", "Many manufacturers and safety groups suggest replacing tires after about six years, even with good tread. Check the DOT date code on the sidewall."],
  ],
  es: [
    ["¿Son seguras las llantas usadas?", "Pueden serlo si tienen suficiente dibujo, no tienen daños y no son muy viejas. Revise el dibujo, los costados y el código DOT de fecha antes de comprar."],
    ["¿Cuánto dibujo es lo legal?", "En la mayoría de los estados de EE. UU. el mínimo legal es 2/32 de pulgada. Mucha gente cambia las llantas como a 4/32, sobre todo con lluvia."],
    ["¿Qué tan vieja es demasiado vieja?", "Muchos fabricantes y grupos de seguridad sugieren cambiar las llantas después de unos seis años, aunque tengan buen dibujo. Revise el código DOT del costado."],
  ],
};

export function TireBasics({ t }: { t: Dict }) {
  const qa = basicsFaq[t.lang];
  const ld = { "@context": "https://schema.org", "@type": "FAQPage", inLanguage: t.lang,
    mainEntity: qa.map(([q, a]) => ({ "@type": "Question", name: q, acceptedAnswer: { "@type": "Answer", text: a } })) };
  if (t.lang === "es") return (
    <GuideLayout t={t} ld={ld} chip="Guía" title="Lo básico de las llantas"
      intro="Respuestas cortas y claras a lo que más nos preguntan. Para su vehículo en particular, llame a la tienda."
      cta={{ quote: "Pedir precio para su medida", call: "Llamar para revisar sus llantas" }}>
      <Card title="Llantas usadas o nuevas"><p>Una llanta usada puede salir muy a cuenta si tiene suficiente dibujo, no tiene cortes, chipotes ni parches mal puestos, y no es muy vieja. Una llanta nueva trae todo el dibujo y una historia conocida. Lo mejor depende de cuánto maneja, el clima donde vive y su presupuesto.</p></Card>
      <Card title="Profundidad del dibujo"><p>El dibujo se mide en 32avos de pulgada. Una llanta nueva de pasajero normalmente empieza en 10/32 u 11/32. El mínimo legal en la mayoría de los estados es 2/32. Una prueba fácil es la del centavo: si mete un penny en la ranura y se ve toda la cabeza de Lincoln, el dibujo probablemente está en 2/32 o menos.</p><p>Muchos conductores las cambian antes, como a 4/32, porque con el piso mojado el frenado empeora mientras se gasta el dibujo.</p></Card>
      <Card title="Edad de la llanta"><p>Las llantas envejecen aunque estén guardadas. Busque el código DOT en el costado: los últimos cuatro números son la semana y el año en que se hizo. Muchos fabricantes y grupos de seguridad sugieren cambiarlas después de unos seis años, aunque tengan dibujo.</p></Card>
      <Card title="Señales de que una llanta necesita revisión"><p>Desgaste disparejo en el dibujo, grietas en el costado, chipotes, cortes que llegan a las cuerdas, o vibración en carretera. Con cualquiera de estas, conviene pasar a una llantera.</p></Card>
      <h2>Preguntas comunes</h2>
      {qa.map(([q, a]) => <div key={q}><h3>{q}</h3><p>{a}</p></div>)}
    </GuideLayout>
  );
  return (
    <GuideLayout t={t} ld={ld} chip="Guide" title="Tire basics"
      intro="Short, plain answers to the questions people ask most. For advice about your own vehicle, call the shop."
      cta={{ quote: "Get a quote for your size", call: "Call for a tire check" }}>
      <Card title="Used tires vs new tires"><p>A used tire can be a good value when it has enough tread, no cuts, bulges, or badly placed patches, and a reasonable age. A new tire has full tread and a known history. The right choice depends on how many miles you drive, the weather where you live, and your budget.</p></Card>
      <Card title="Tread depth"><p>Tread depth is measured in 32nds of an inch. A new passenger tire usually starts around 10/32 to 11/32. The legal minimum in most US states is 2/32. A simple check is the penny test: if you can see all of Lincoln&apos;s head when a penny is in the groove, the tread is likely at or below 2/32.</p><p>Many drivers replace tires earlier, around 4/32, because wet braking gets worse as tread wears down.</p></Card>
      <Card title="Tire age"><p>Tires age even when they sit unused. Find the DOT code on the sidewall; the last four digits show the week and year of manufacture. Many manufacturers and safety groups suggest replacing tires after about six years, regardless of tread.</p></Card>
      <Card title="Signs a tire needs attention"><p>Look for uneven wear across the tread, cracks in the sidewall, bulges, cuts that reach the cords, and vibration at speed. Any of these means a visit to a tire shop is a good idea.</p></Card>
      <h2>Common questions</h2>
      {qa.map(([q, a]) => <div key={q}><h3>{q}</h3><p>{a}</p></div>)}
    </GuideLayout>
  );
}
