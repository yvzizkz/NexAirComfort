// ─── Service Page Data ────────────────────────────────────────────────────────
// Complete bilingual (EN/ES) service data for all 6 NexAir Comfort service pages.
// Each service includes Phoenix-specific references and detailed content.

export interface ServicePageData {
  slug: string
  slugEs: string
  title: string
  titleEs: string
  description: string
  descriptionEs: string
  heroSubtitle: string
  heroSubtitleEs: string
  features: string[]
  featuresEs: string[]
  priceRange: string
  priceRangeEs: string
  commonProblems: string[]
  commonProblemsEs: string[]
}

export const SERVICE_PAGE_DATA: ServicePageData[] = [
  // ─── AC Repair ────────────────────────────────────────────────────────────────
  {
    slug: 'ac-repair',
    slugEs: 'reparacion-ac',
    title: 'AC Repair',
    titleEs: 'Reparacion de AC',
    description:
      'When your air conditioning breaks down in the middle of a Phoenix summer, every minute counts. With temperatures regularly exceeding 115 degrees Fahrenheit, a functioning AC system is not a luxury — it is a necessity for the health and safety of your family. NexAir Comfort provides fast, reliable AC repair services across the entire Phoenix metro area, with same-day service available for emergencies.\n\nOur certified technicians are trained to diagnose and repair all major AC brands and system types, including central air, heat pumps, and ductless mini-splits. We carry the most common replacement parts on our service vehicles so that the majority of repairs can be completed in a single visit, getting your home back to a comfortable temperature as quickly as possible.\n\nWhether your system is blowing warm air, making unusual noises, leaking refrigerant, or simply will not turn on, we have the expertise and the parts to fix it right the first time. We back every repair with our satisfaction guarantee and transparent, upfront pricing — no surprise charges, ever.',
    descriptionEs:
      'Cuando su aire acondicionado se descompone en medio de un verano en Phoenix, cada minuto cuenta. Con temperaturas que regularmente superan los 115 grados Fahrenheit, un sistema de AC funcionando no es un lujo — es una necesidad para la salud y seguridad de su familia. NexAir Comfort ofrece servicios de reparacion de AC rapidos y confiables en toda el area metropolitana de Phoenix, con servicio el mismo dia disponible para emergencias.\n\nNuestros tecnicos certificados estan capacitados para diagnosticar y reparar todas las marcas y tipos de sistemas de AC principales, incluyendo aire central, bombas de calor y mini-splits sin ductos. Llevamos las piezas de repuesto mas comunes en nuestros vehiculos de servicio para que la mayoria de las reparaciones se completen en una sola visita, regresando su hogar a una temperatura comoda lo mas rapido posible.\n\nYa sea que su sistema este soplando aire caliente, haciendo ruidos inusuales, con fugas de refrigerante, o simplemente no encienda, tenemos la experiencia y las piezas para repararlo correctamente la primera vez. Respaldamos cada reparacion con nuestra garantia de satisfaccion y precios transparentes por adelantado — sin cargos sorpresa, nunca.',
    heroSubtitle: 'Fast, expert AC repair when Phoenix heat demands it most',
    heroSubtitleEs: 'Reparacion de AC rapida y experta cuando el calor de Phoenix mas lo exige',
    features: [
      'Same-day emergency AC repair service',
      'All major brands serviced (Trane, Carrier, Lennox, Goodman, Rheem, and more)',
      'Upfront, transparent pricing before work begins',
      'EPA-certified refrigerant handling and leak repair',
      'Compressor, capacitor, and contactor replacement',
      'Thermostat diagnostics and replacement',
      'Blower motor and fan repair',
      'Electrical component diagnostics and repair',
      'Ductwork inspection for leaks and blockages',
      'Post-repair system performance verification',
      '1-year warranty on all repairs',
      '24/7 emergency service availability',
    ],
    featuresEs: [
      'Servicio de reparacion de AC de emergencia el mismo dia',
      'Servicio para todas las marcas principales (Trane, Carrier, Lennox, Goodman, Rheem, y mas)',
      'Precios transparentes y por adelantado antes de comenzar el trabajo',
      'Manejo de refrigerante y reparacion de fugas certificado por la EPA',
      'Reemplazo de compresor, capacitor y contactor',
      'Diagnostico y reemplazo de termostato',
      'Reparacion de motor de soplador y ventilador',
      'Diagnostico y reparacion de componentes electricos',
      'Inspeccion de ductos para fugas y obstrucciones',
      'Verificacion del rendimiento del sistema despues de la reparacion',
      'Garantia de 1 ano en todas las reparaciones',
      'Servicio de emergencia disponible 24/7',
    ],
    priceRange: 'Starting at $89 diagnostic fee',
    priceRangeEs: 'Desde $89 tarifa de diagnostico',
    commonProblems: [
      'AC blowing warm or hot air',
      'System not turning on or cycling frequently',
      'Unusual noises — grinding, squealing, or banging',
      'Refrigerant leaks or low refrigerant levels',
      'Frozen evaporator coils',
      'Clogged or dirty condensate drain line',
      'Capacitor or contactor failure from extreme heat',
      'Thermostat malfunction or miscalibration',
      'Tripped circuit breaker due to overworked system',
      'Weak airflow from vents',
      'Monsoon storm electrical surge damage',
      'Dust and debris buildup from desert conditions',
    ],
    commonProblemsEs: [
      'AC soplando aire caliente o tibio',
      'Sistema que no enciende o cicla frecuentemente',
      'Ruidos inusuales — rechinidos, chirridos o golpes',
      'Fugas de refrigerante o niveles bajos de refrigerante',
      'Bobinas del evaporador congeladas',
      'Linea de drenaje de condensado obstruida o sucia',
      'Falla de capacitor o contactor por calor extremo',
      'Mal funcionamiento o descalibracion del termostato',
      'Interruptor de circuito disparado por sistema sobrecargado',
      'Flujo de aire debil desde las rejillas',
      'Dano por tormentas de monzon y oleadas electricas',
      'Acumulacion de polvo y escombros por condiciones deserticas',
    ],
  },

  // ─── AC Installation ──────────────────────────────────────────────────────────
  {
    slug: 'ac-installation',
    slugEs: 'instalacion-ac',
    title: 'AC Installation',
    titleEs: 'Instalacion de AC',
    description:
      'In the Phoenix Valley, your air conditioning system is the hardest-working appliance in your home. With summer temperatures that can soar above 115 degrees for weeks on end, choosing the right AC system and having it installed by qualified professionals is one of the most important investments you can make. NexAir Comfort specializes in properly sized, energy-efficient AC installations that are engineered for the unique demands of the Arizona desert climate.\n\nOur installation process starts with a comprehensive in-home evaluation. We perform a Manual J load calculation to determine the exact cooling capacity your home needs based on its square footage, insulation, window orientation, and other factors. An oversized or undersized system will cost you more in energy bills and lead to premature equipment failure — we make sure you get the right system from the start.\n\nWe are authorized dealers for industry-leading brands including Trane, Carrier, Lennox, and Goodman. Every installation is performed by our own NATE-certified technicians — never subcontracted — and comes with a full manufacturer warranty plus our own workmanship guarantee. We also offer flexible financing options to make your new system affordable.',
    descriptionEs:
      'En el Valle de Phoenix, su sistema de aire acondicionado es el electrodomestico que mas trabaja en su hogar. Con temperaturas de verano que pueden superar los 115 grados durante semanas, elegir el sistema de AC correcto e instalarlo por profesionales calificados es una de las inversiones mas importantes que puede hacer. NexAir Comfort se especializa en instalaciones de AC correctamente dimensionadas y energeticamente eficientes, disenadas para las demandas unicas del clima desertico de Arizona.\n\nNuestro proceso de instalacion comienza con una evaluacion integral en su hogar. Realizamos un calculo de carga Manual J para determinar la capacidad de enfriamiento exacta que necesita su hogar basado en metros cuadrados, aislamiento, orientacion de ventanas y otros factores. Un sistema sobredimensionado o subdimensionado le costara mas en cuentas de energia y provocara fallas prematuras del equipo — nos aseguramos de que obtenga el sistema correcto desde el principio.\n\nSomos distribuidores autorizados de marcas lideres en la industria incluyendo Trane, Carrier, Lennox y Goodman. Cada instalacion es realizada por nuestros propios tecnicos certificados por NATE — nunca subcontratados — y viene con garantia completa del fabricante mas nuestra propia garantia de mano de obra. Tambien ofrecemos opciones de financiamiento flexibles para hacer su nuevo sistema accesible.',
    heroSubtitle: 'Properly sized, energy-efficient AC systems built for Arizona summers',
    heroSubtitleEs: 'Sistemas de AC correctamente dimensionados y eficientes para los veranos de Arizona',
    features: [
      'Free in-home consultation and estimate',
      'Manual J load calculation for proper system sizing',
      'Top brands: Trane, Carrier, Lennox, Goodman, Rheem',
      'SEER2 high-efficiency options up to 24 SEER2',
      'NATE-certified installation technicians',
      'Complete removal and disposal of old system',
      'New refrigerant line sets and electrical connections',
      'Smart thermostat installation and setup',
      'Ductwork evaluation and modification if needed',
      'City permit acquisition and code compliance',
      'Full manufacturer warranty plus workmanship guarantee',
      'Flexible financing with approved credit',
    ],
    featuresEs: [
      'Consulta y estimado gratuito en su hogar',
      'Calculo de carga Manual J para dimensionamiento correcto del sistema',
      'Mejores marcas: Trane, Carrier, Lennox, Goodman, Rheem',
      'Opciones de alta eficiencia SEER2 hasta 24 SEER2',
      'Tecnicos de instalacion certificados por NATE',
      'Remocion y eliminacion completa del sistema viejo',
      'Nuevas lineas de refrigerante y conexiones electricas',
      'Instalacion y configuracion de termostato inteligente',
      'Evaluacion y modificacion de ductos si es necesario',
      'Obtencion de permisos de la ciudad y cumplimiento de codigos',
      'Garantia completa del fabricante mas garantia de mano de obra',
      'Financiamiento flexible con credito aprobado',
    ],
    priceRange: 'Free in-home estimate',
    priceRangeEs: 'Estimado gratuito en su hogar',
    commonProblems: [
      'Existing system is 15+ years old and losing efficiency',
      'Frequent breakdowns and costly repairs on aging unit',
      'Home addition or renovation requiring expanded cooling',
      'Uneven temperatures between rooms',
      'Excessively high energy bills during summer months',
      'R-22 (Freon) system requiring refrigerant phase-out upgrade',
      'System cannot keep up with 110°+ Phoenix summer heat',
      'Noisy or outdated equipment',
      'Builder-grade system needing upgrade for desert conditions',
      'New construction or custom home AC design',
    ],
    commonProblemsEs: [
      'Sistema existente tiene mas de 15 anos y esta perdiendo eficiencia',
      'Descomposturas frecuentes y reparaciones costosas en unidad vieja',
      'Adicion o renovacion del hogar que requiere enfriamiento expandido',
      'Temperaturas desiguales entre habitaciones',
      'Cuentas de energia excesivamente altas durante los meses de verano',
      'Sistema R-22 (Freon) que requiere actualizacion por eliminacion de refrigerante',
      'Sistema que no puede mantener el ritmo con el calor de mas de 110° de Phoenix',
      'Equipo ruidoso u obsoleto',
      'Sistema de grado constructor que necesita actualizacion para condiciones deserticas',
      'Diseno de AC para nueva construccion o casa personalizada',
    ],
  },

  // ─── Heating Services ─────────────────────────────────────────────────────────
  {
    slug: 'heating',
    slugEs: 'calefaccion',
    title: 'Heating Services',
    titleEs: 'Servicios de Calefaccion',
    description:
      'While Phoenix is known for its scorching summers, desert winters can bring surprising cold. Overnight temperatures in the Valley regularly drop into the 30s and 40s from November through February, and communities at higher elevations around Scottsdale and the East Valley can see even colder conditions. A reliable heating system is essential for keeping your family comfortable during these chilly months.\n\nNexAir Comfort provides comprehensive heating services including repair, installation, and maintenance for furnaces, heat pumps, and dual-fuel systems. Whether your furnace is not igniting, your heat pump is blowing cold air, or you need a brand-new heating system installed, our certified technicians have the skills and experience to handle it all. We understand the unique heating needs of Arizona homes, where many rely on heat pump systems that also serve as the primary cooling system during summer.\n\nDo not wait until the first cold snap to discover your heater is not working. Schedule a pre-season heating inspection with NexAir Comfort to ensure your system is ready when temperatures drop. Our thorough inspections cover every critical component, from the heat exchanger to the ignition system, so you can rest easy knowing your home will stay warm all winter long.',
    descriptionEs:
      'Aunque Phoenix es conocido por sus veranos abrasadores, los inviernos del desierto pueden traer un frio sorprendente. Las temperaturas nocturnas en el Valle regularmente bajan a los 30 y 40 grados Fahrenheit de noviembre a febrero, y las comunidades en elevaciones mas altas alrededor de Scottsdale y el Valle del Este pueden ver condiciones aun mas frias. Un sistema de calefaccion confiable es esencial para mantener a su familia comoda durante estos meses frios.\n\nNexAir Comfort proporciona servicios de calefaccion integrales incluyendo reparacion, instalacion y mantenimiento para hornos, bombas de calor y sistemas de combustible dual. Ya sea que su horno no encienda, su bomba de calor este soplando aire frio, o necesite un sistema de calefaccion completamente nuevo, nuestros tecnicos certificados tienen las habilidades y experiencia para manejarlo todo. Entendemos las necesidades unicas de calefaccion de los hogares de Arizona, donde muchos dependen de sistemas de bomba de calor que tambien sirven como sistema de enfriamiento principal durante el verano.\n\nNo espere hasta la primera ola de frio para descubrir que su calefaccion no funciona. Programe una inspeccion de calefaccion de pre-temporada con NexAir Comfort para asegurar que su sistema este listo cuando las temperaturas bajen. Nuestras inspecciones minuciosas cubren cada componente critico, desde el intercambiador de calor hasta el sistema de ignicion, para que pueda estar tranquilo sabiendo que su hogar se mantendra calido todo el invierno.',
    heroSubtitle: 'Keep your family warm through cool Arizona desert nights',
    heroSubtitleEs: 'Mantenga a su familia calida durante las noches frescas del desierto de Arizona',
    features: [
      'Furnace repair, installation, and tune-ups',
      'Heat pump repair, installation, and maintenance',
      'Dual-fuel and hybrid system expertise',
      'Gas furnace safety and carbon monoxide inspections',
      'Heat exchanger inspection and replacement',
      'Ignition system diagnostics and repair',
      'Blower motor and inducer motor service',
      'Thermostat calibration for heating mode',
      'Ductwork sealing for heat loss prevention',
      'Pre-season heating system inspections',
      'Emergency heating repair service',
      'Energy efficiency upgrades and recommendations',
    ],
    featuresEs: [
      'Reparacion, instalacion y afinacion de hornos',
      'Reparacion, instalacion y mantenimiento de bombas de calor',
      'Experiencia en sistemas de combustible dual e hibridos',
      'Inspecciones de seguridad de horno de gas y monoxido de carbono',
      'Inspeccion y reemplazo de intercambiador de calor',
      'Diagnostico y reparacion del sistema de ignicion',
      'Servicio de motor de soplador y motor inductor',
      'Calibracion de termostato para modo de calefaccion',
      'Sellado de ductos para prevencion de perdida de calor',
      'Inspecciones de sistema de calefaccion de pre-temporada',
      'Servicio de reparacion de calefaccion de emergencia',
      'Mejoras y recomendaciones de eficiencia energetica',
    ],
    priceRange: 'Starting at $89 diagnostic fee',
    priceRangeEs: 'Desde $89 tarifa de diagnostico',
    commonProblems: [
      'Furnace not igniting or producing heat',
      'Heat pump blowing cold air in heating mode',
      'Frequent cycling on and off',
      'Strange smells when heating system runs (burning, gas)',
      'Uneven heating between rooms',
      'Thermostat not triggering heating correctly',
      'Pilot light or electronic ignition failure',
      'Cracked heat exchanger — carbon monoxide risk',
      'High energy bills during winter months',
      'System not used since last winter and needs inspection',
      'Ductwork leaks causing heat loss in attic space',
      'Desert dust buildup clogging furnace components',
    ],
    commonProblemsEs: [
      'Horno que no enciende o no produce calor',
      'Bomba de calor soplando aire frio en modo de calefaccion',
      'Ciclos frecuentes de encendido y apagado',
      'Olores extranos cuando el sistema de calefaccion funciona (quemado, gas)',
      'Calefaccion desigual entre habitaciones',
      'Termostato que no activa la calefaccion correctamente',
      'Falla de la luz piloto o ignicion electronica',
      'Intercambiador de calor agrietado — riesgo de monoxido de carbono',
      'Cuentas de energia altas durante los meses de invierno',
      'Sistema no utilizado desde el invierno pasado que necesita inspeccion',
      'Fugas en ductos causando perdida de calor en el espacio del atico',
      'Acumulacion de polvo del desierto obstruyendo componentes del horno',
    ],
  },

  // ─── Maintenance ──────────────────────────────────────────────────────────────
  {
    slug: 'maintenance',
    slugEs: 'mantenimiento',
    title: 'Maintenance',
    titleEs: 'Mantenimiento',
    description:
      'In the extreme climate of the Phoenix metro area, your HVAC system works harder than almost anywhere else in the country. During the summer, your AC may run 16 to 20 hours per day just to keep indoor temperatures manageable. This relentless demand accelerates wear and tear, making regular preventive maintenance absolutely critical to avoid costly breakdowns, extend equipment life, and maintain energy efficiency.\n\nNexAir Comfort offers comprehensive HVAC maintenance programs designed specifically for the challenges of the Arizona desert. Our thorough tune-up service covers every critical component of your system — from checking refrigerant levels and cleaning evaporator coils to testing electrical connections and lubricating moving parts. Regular maintenance can reduce energy consumption by up to 15%, prevent up to 95% of common breakdowns, and extend the life of your system by several years.\n\nDust storms, monsoons, and the constant fine desert dust that settles on outdoor condenser units are unique challenges in the Valley. Our maintenance service includes thorough condenser cleaning, filter evaluation, and drainage line clearing to address these Arizona-specific concerns. We recommend at minimum two tune-ups per year — one before summer and one before winter — to keep your system running at peak performance year-round.',
    descriptionEs:
      'En el clima extremo del area metropolitana de Phoenix, su sistema HVAC trabaja mas duro que en casi cualquier otro lugar del pais. Durante el verano, su AC puede funcionar de 16 a 20 horas al dia solo para mantener las temperaturas interiores manejables. Esta demanda implacable acelera el desgaste, haciendo que el mantenimiento preventivo regular sea absolutamente critico para evitar descomposturas costosas, extender la vida del equipo y mantener la eficiencia energetica.\n\nNexAir Comfort ofrece programas de mantenimiento HVAC integrales disenados especificamente para los desafios del desierto de Arizona. Nuestro servicio de afinacion minuciosa cubre cada componente critico de su sistema — desde verificar niveles de refrigerante y limpiar bobinas del evaporador hasta probar conexiones electricas y lubricar partes moviles. El mantenimiento regular puede reducir el consumo de energia hasta en un 15%, prevenir hasta el 95% de las descomposturas comunes y extender la vida de su sistema por varios anos.\n\nTormentas de polvo, monzones y el polvo fino constante del desierto que se asienta en las unidades condensadoras exteriores son desafios unicos en el Valle. Nuestro servicio de mantenimiento incluye limpieza minuciosa del condensador, evaluacion de filtros y despeje de lineas de drenaje para abordar estas preocupaciones especificas de Arizona. Recomendamos un minimo de dos afinaciones por ano — una antes del verano y una antes del invierno — para mantener su sistema funcionando al maximo rendimiento durante todo el ano.',
    heroSubtitle: 'Preventive care that keeps your system running strong in extreme Arizona heat',
    heroSubtitleEs: 'Cuidado preventivo que mantiene su sistema funcionando fuerte en el calor extremo de Arizona',
    features: [
      'Comprehensive AC and heating system tune-ups',
      'Refrigerant level check and recharge if needed',
      'Evaporator and condenser coil cleaning',
      'Electrical connection testing and tightening',
      'Thermostat calibration and performance check',
      'Condensate drain line clearing and treatment',
      'Air filter inspection and replacement',
      'Moving parts lubrication',
      'Safety controls and shut-off testing',
      'System performance and airflow measurement',
      'Outdoor unit debris removal (desert dust, monsoon damage)',
      'Written report with findings and recommendations',
    ],
    featuresEs: [
      'Afinaciones integrales de sistema de AC y calefaccion',
      'Verificacion de nivel de refrigerante y recarga si es necesario',
      'Limpieza de bobinas del evaporador y condensador',
      'Prueba y ajuste de conexiones electricas',
      'Calibracion del termostato y verificacion de rendimiento',
      'Despeje y tratamiento de linea de drenaje de condensado',
      'Inspeccion y reemplazo de filtro de aire',
      'Lubricacion de partes moviles',
      'Prueba de controles de seguridad y apagado',
      'Medicion del rendimiento del sistema y flujo de aire',
      'Remocion de escombros de la unidad exterior (polvo del desierto, dano de monzon)',
      'Reporte escrito con hallazgos y recomendaciones',
    ],
    priceRange: 'Starting at $49/visit',
    priceRangeEs: 'Desde $49/visita',
    commonProblems: [
      'System losing efficiency and raising energy bills',
      'Dirty or clogged filters reducing airflow',
      'Desert dust and debris clogging outdoor condenser unit',
      'Refrigerant slowly leaking and reducing cooling capacity',
      'Drainage line clogs causing water damage',
      'Worn belts and bearings causing noise',
      'Electrical connections loosening from thermal cycling',
      'Thermostat drift causing inconsistent temperatures',
      'Monsoon debris blocking condenser airflow',
      'Mold growth in drain pan or ductwork',
      'System not inspected in over a year',
      'Warranty requirements for annual maintenance visits',
    ],
    commonProblemsEs: [
      'Sistema perdiendo eficiencia y elevando cuentas de energia',
      'Filtros sucios u obstruidos reduciendo el flujo de aire',
      'Polvo del desierto y escombros obstruyendo la unidad condensadora exterior',
      'Refrigerante con fugas lentas reduciendo la capacidad de enfriamiento',
      'Obstrucciones en la linea de drenaje causando danos por agua',
      'Correas y rodamientos desgastados causando ruido',
      'Conexiones electricas aflojandose por ciclos termicos',
      'Desviacion del termostato causando temperaturas inconsistentes',
      'Escombros de monzon bloqueando el flujo de aire del condensador',
      'Crecimiento de moho en el receptaculo de drenaje o ductos',
      'Sistema no inspeccionado en mas de un ano',
      'Requisitos de garantia para visitas de mantenimiento anuales',
    ],
  },

  // ─── Mini-Splits ──────────────────────────────────────────────────────────────
  {
    slug: 'mini-splits',
    slugEs: 'mini-splits',
    title: 'Mini-Splits',
    titleEs: 'Mini-Splits',
    description:
      'Ductless mini-split systems are one of the most versatile and energy-efficient cooling and heating solutions available for Phoenix-area homes and businesses. Whether you are looking to cool a room addition, a converted garage, a casita, or an entire home without traditional ductwork, mini-splits deliver powerful climate control with remarkable efficiency. In a market where summer cooling costs can dominate your energy bills, a high-efficiency mini-split can save you hundreds of dollars per year compared to conventional systems.\n\nNexAir Comfort installs and services all major mini-split brands including Mitsubishi, Daikin, Fujitsu, and LG. Our technicians are factory-trained and certified in ductless technology, ensuring a flawless installation every time. We handle everything from single-zone wall-mounted units for individual rooms to multi-zone systems that can independently control the temperature in up to eight different areas of your home from a single outdoor compressor.\n\nMini-splits are particularly popular in the Phoenix area for several reasons: they are ideal for older homes that lack ductwork, they eliminate the energy losses associated with leaky ducts (which can waste 20-30% of cooled air), and they allow precise room-by-room temperature control so you only cool the spaces you are actually using. They also operate whisper-quiet and feature advanced air filtration that helps combat the desert dust that plagues Valley residents.',
    descriptionEs:
      'Los sistemas mini-split sin ductos son una de las soluciones de enfriamiento y calefaccion mas versatiles y energeticamente eficientes disponibles para hogares y negocios del area de Phoenix. Ya sea que este buscando enfriar una adicion de habitacion, un garaje convertido, una casita, o un hogar completo sin ductos tradicionales, los mini-splits ofrecen un control climatico potente con una eficiencia notable. En un mercado donde los costos de enfriamiento de verano pueden dominar sus cuentas de energia, un mini-split de alta eficiencia puede ahorrarle cientos de dolares al ano comparado con sistemas convencionales.\n\nNexAir Comfort instala y da servicio a todas las marcas principales de mini-splits incluyendo Mitsubishi, Daikin, Fujitsu y LG. Nuestros tecnicos estan entrenados en fabrica y certificados en tecnologia sin ductos, asegurando una instalacion impecable cada vez. Manejamos todo desde unidades de pared de una sola zona para habitaciones individuales hasta sistemas multi-zona que pueden controlar independientemente la temperatura en hasta ocho areas diferentes de su hogar desde un solo compresor exterior.\n\nLos mini-splits son particularmente populares en el area de Phoenix por varias razones: son ideales para hogares antiguos que no tienen ductos, eliminan las perdidas de energia asociadas con ductos con fugas (que pueden desperdiciar 20-30% del aire enfriado), y permiten control de temperatura preciso habitacion por habitacion para que solo enfrie los espacios que realmente esta usando. Tambien operan ultra silenciosos y cuentan con filtracion de aire avanzada que ayuda a combatir el polvo del desierto que afecta a los residentes del Valle.',
    heroSubtitle: 'Ductless comfort and efficiency, room by room',
    heroSubtitleEs: 'Comodidad y eficiencia sin ductos, habitacion por habitacion',
    features: [
      'Single-zone and multi-zone mini-split installations',
      'Top brands: Mitsubishi, Daikin, Fujitsu, LG',
      'Cooling and heating in one system (heat pump technology)',
      'SEER2 ratings up to 33 for maximum energy savings',
      'Whisper-quiet indoor units (as low as 19 dB)',
      'Advanced multi-stage air filtration',
      'Wi-Fi enabled smart controls and app integration',
      'No ductwork required — minimal installation disruption',
      'Independent zone temperature control',
      'Ideal for additions, casitas, garages, and sunrooms',
      'Compact outdoor units with small footprint',
      'Flexible financing options available',
    ],
    featuresEs: [
      'Instalaciones de mini-split de una zona y multi-zona',
      'Mejores marcas: Mitsubishi, Daikin, Fujitsu, LG',
      'Enfriamiento y calefaccion en un solo sistema (tecnologia de bomba de calor)',
      'Clasificaciones SEER2 hasta 33 para maximo ahorro de energia',
      'Unidades interiores ultra silenciosas (tan bajo como 19 dB)',
      'Filtracion de aire avanzada de multiples etapas',
      'Controles inteligentes con Wi-Fi e integracion con aplicaciones',
      'No requiere ductos — minima interrupcion en la instalacion',
      'Control de temperatura independiente por zona',
      'Ideal para adiciones, casitas, garajes y cuartos de sol',
      'Unidades exteriores compactas con pequena huella',
      'Opciones de financiamiento flexible disponibles',
    ],
    priceRange: 'Free in-home estimate',
    priceRangeEs: 'Estimado gratuito en su hogar',
    commonProblems: [
      'Room addition or casita with no existing ductwork',
      'Converted garage or workshop needing climate control',
      'Hot spots or cold spots in certain rooms of the house',
      'Home with no space for traditional ductwork installation',
      'Wanting to reduce energy bills with zone-based cooling',
      'Sunroom or Arizona room that overheats in summer',
      'Home office requiring independent temperature control',
      'Older home with inefficient window units',
      'Second-story rooms that are always too warm',
      'Server room or specialty space requiring precise cooling',
      'Guest house or ADU needing independent HVAC',
      'Desire to eliminate duct-related energy losses',
    ],
    commonProblemsEs: [
      'Adicion de habitacion o casita sin ductos existentes',
      'Garaje o taller convertido que necesita control climatico',
      'Puntos calientes o frios en ciertas habitaciones de la casa',
      'Hogar sin espacio para instalacion de ductos tradicionales',
      'Deseo de reducir cuentas de energia con enfriamiento por zonas',
      'Cuarto de sol o Arizona room que se sobrecalienta en verano',
      'Oficina en casa que requiere control de temperatura independiente',
      'Hogar antiguo con unidades de ventana ineficientes',
      'Habitaciones del segundo piso que siempre estan demasiado calientes',
      'Sala de servidores o espacio especializado que requiere enfriamiento preciso',
      'Casa de huespedes o ADU que necesita HVAC independiente',
      'Deseo de eliminar perdidas de energia relacionadas con ductos',
    ],
  },

  // ─── Indoor Air Quality ───────────────────────────────────────────────────────
  {
    slug: 'indoor-air-quality',
    slugEs: 'calidad-aire-interior',
    title: 'Indoor Air Quality',
    titleEs: 'Calidad del Aire Interior',
    description:
      'Living in the Phoenix metropolitan area presents unique indoor air quality challenges that residents in other parts of the country simply do not face. The constant fine desert dust, seasonal pollen from desert plants, pollution from urban traffic, and the effects of monsoon storms all contribute to poor indoor air quality that can trigger allergies, aggravate asthma, and cause respiratory issues. Because Phoenix homes are sealed tightly to keep the heat out, indoor air pollutants can become trapped and concentrated, making the air inside your home up to five times more polluted than the air outside.\n\nNexAir Comfort offers a comprehensive range of indoor air quality solutions tailored to the specific needs of Valley residents. From whole-home air purification systems and HEPA filtration upgrades to UV germicidal lights and humidity control, we have the technology and expertise to dramatically improve the air your family breathes. Our indoor air quality specialists will assess your home, identify specific pollutant concerns, and recommend a customized solution that fits your needs and budget.\n\nDust infiltration is the number one indoor air quality complaint in the Phoenix area. Our solutions address this at multiple levels — improved filtration to capture particles as small as 0.3 microns, duct sealing to prevent dust entry through leaky ductwork, and whole-home purification systems that neutralize allergens, bacteria, viruses, and volatile organic compounds. We also address the low humidity that is common in the Arizona desert, which can cause dry skin, respiratory irritation, and damage to wood furnishings.',
    descriptionEs:
      'Vivir en el area metropolitana de Phoenix presenta desafios unicos de calidad del aire interior que los residentes en otras partes del pais simplemente no enfrentan. El polvo fino constante del desierto, el polen estacional de plantas deserticas, la contaminacion del trafico urbano y los efectos de las tormentas de monzon contribuyen a una mala calidad del aire interior que puede desencadenar alergias, agravar el asma y causar problemas respiratorios. Debido a que los hogares de Phoenix estan sellados hermeticamente para mantener el calor fuera, los contaminantes del aire interior pueden quedar atrapados y concentrados, haciendo que el aire dentro de su hogar sea hasta cinco veces mas contaminado que el aire exterior.\n\nNexAir Comfort ofrece una gama completa de soluciones de calidad del aire interior adaptadas a las necesidades especificas de los residentes del Valle. Desde sistemas de purificacion de aire para toda la casa y mejoras de filtracion HEPA hasta luces germicidas UV y control de humedad, tenemos la tecnologia y experiencia para mejorar dramaticamente el aire que respira su familia. Nuestros especialistas en calidad del aire interior evaluaran su hogar, identificaran preocupaciones especificas de contaminantes y recomendaran una solucion personalizada que se ajuste a sus necesidades y presupuesto.\n\nLa infiltracion de polvo es la queja numero uno de calidad del aire interior en el area de Phoenix. Nuestras soluciones abordan esto en multiples niveles — filtracion mejorada para capturar particulas tan pequenas como 0.3 micrones, sellado de ductos para prevenir la entrada de polvo a traves de ductos con fugas, y sistemas de purificacion para toda la casa que neutralizan alergenos, bacterias, virus y compuestos organicos volatiles. Tambien abordamos la baja humedad que es comun en el desierto de Arizona, que puede causar piel seca, irritacion respiratoria y danos a muebles de madera.',
    heroSubtitle: 'Breathe cleaner, healthier air in your Phoenix-area home',
    heroSubtitleEs: 'Respire aire mas limpio y saludable en su hogar del area de Phoenix',
    features: [
      'Whole-home air purification systems',
      'HEPA and high-MERV filtration upgrades',
      'UV germicidal light installation (kills bacteria, viruses, and mold)',
      'Duct sealing to prevent dust infiltration',
      'Humidifier and dehumidifier installation',
      'Carbon monoxide and air quality monitoring',
      'Ventilation system evaluation and improvement',
      'Duct cleaning referral coordination',
      'Electrostatic and media air cleaner installation',
      'Allergen and particulate testing',
      'VOC (volatile organic compound) reduction solutions',
      'Free indoor air quality consultation',
    ],
    featuresEs: [
      'Sistemas de purificacion de aire para toda la casa',
      'Mejoras de filtracion HEPA y alto MERV',
      'Instalacion de luz germicida UV (elimina bacterias, virus y moho)',
      'Sellado de ductos para prevenir infiltracion de polvo',
      'Instalacion de humidificador y deshumidificador',
      'Monitoreo de monoxido de carbono y calidad del aire',
      'Evaluacion y mejora del sistema de ventilacion',
      'Coordinacion de referencia para limpieza de ductos',
      'Instalacion de limpiadores de aire electrostaticos y de medios',
      'Pruebas de alergenos y particulas',
      'Soluciones de reduccion de COV (compuestos organicos volatiles)',
      'Consulta gratuita de calidad del aire interior',
    ],
    priceRange: 'Free consultation',
    priceRangeEs: 'Consulta gratuita',
    commonProblems: [
      'Excessive dust accumulation throughout the home',
      'Allergy and asthma symptoms worsening indoors',
      'Musty or stale odors from HVAC system',
      'Visible mold growth near vents or in ductwork',
      'Dry air causing skin irritation and static electricity',
      'Desert pollen and particulate infiltration',
      'Pet dander circulating through duct system',
      'Monsoon season increasing humidity and mold risk',
      'Cooking and cleaning chemical fumes lingering',
      'New construction or renovation off-gassing (VOCs)',
      'Dust storm (haboob) aftermath polluting indoor air',
      'Family members with respiratory conditions needing cleaner air',
    ],
    commonProblemsEs: [
      'Acumulacion excesiva de polvo en toda la casa',
      'Sintomas de alergia y asma empeorando en interiores',
      'Olores mohosos o estancados del sistema HVAC',
      'Crecimiento visible de moho cerca de rejillas o en ductos',
      'Aire seco causando irritacion de la piel y electricidad estatica',
      'Infiltracion de polen del desierto y particulas',
      'Caspa de mascotas circulando a traves del sistema de ductos',
      'Temporada de monzon aumentando la humedad y el riesgo de moho',
      'Humos de cocina y productos de limpieza que persisten',
      'Emision de gases de nueva construccion o renovacion (COV)',
      'Secuelas de tormentas de polvo (haboob) contaminando el aire interior',
      'Miembros de la familia con condiciones respiratorias que necesitan aire mas limpio',
    ],
  },
]

// ─── Lookup Helpers ───────────────────────────────────────────────────────────

/**
 * Find a service by its English slug.
 */
export function getServiceBySlug(slug: string): ServicePageData | undefined {
  return SERVICE_PAGE_DATA.find(s => s.slug === slug)
}

/**
 * Find a service by its Spanish slug.
 */
export function getServiceBySlugEs(slugEs: string): ServicePageData | undefined {
  return SERVICE_PAGE_DATA.find(s => s.slugEs === slugEs)
}

/**
 * Find a service by either its English or Spanish slug.
 */
export function getServiceByAnySlug(slug: string): ServicePageData | undefined {
  return SERVICE_PAGE_DATA.find(s => s.slug === slug || s.slugEs === slug)
}

/**
 * Get the localized path for a service page.
 */
export function getServicePath(service: ServicePageData, language: string): string {
  if (language === 'es') {
    return `/es/servicios/${service.slugEs}`
  }
  return `/services/${service.slug}`
}
