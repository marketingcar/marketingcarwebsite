// This script generates comprehensive Spanish translations
// Run with: node scripts/generate-spanish-translations.mjs

import { writeFileSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const spanishTranslations = {
  "nav": {
    "home": "Inicio",
    "about": "Acerca de",
    "services": "Servicios",
    "whoWeHelp": "A Quién Ayudamos",
    "blog": "Blog",
    "caseStudies": "Casos de Éxito",
    "webinars": "Webinars",
    "faq": "Preguntas Frecuentes",
    "contact": "Contacto",
    "bookNow": "Reservar Ahora"
  },
  "hero": {
    "tagline": "Impulsando Tu Éxito, Milla por Milla",
    "subtitle": "Somos tus mecánicos expertos en marketing. Cada parte de nuestro \"carro\" impulsa tu negocio hacia adelante, convirtiendo la complejidad en un camino suave hacia tus objetivos.",
    "cta": "Enciende Tu Crecimiento",
    "learnMore": "Saber Más",
    "titles": {
      "0": { "line1": "Dirigiendo Pequeñas Empresas", "line2": "Hacia el Éxito" },
      "1": { "line1": "Cambia Tu Marketing", "line2": "A Alta Velocidad" },
      "2": { "line1": "Impulsa Tu", "line2": "Pequeña Empresa Adelante" },
      "3": { "line1": "De Obstáculos", "line2": "A Resultados" },
      "4": { "line1": "Marketing Que Impulsa", "line2": "Tu Pequeña Empresa" }
    }
  },
  "footer": {
    "logoAlt": "Logo Principal de Marketing Car",
    "copyrightText": "© {year} MarketingCar™. Todos los Derechos Reservados.",
    "tagline": "Impulsando Tu Éxito, Milla por Milla.",
    "privacyPolicyLink": "Política de Privacidad",
    "quickLinksHeading": "Enlaces Rápidos",
    "socialLinks": {
      "facebookLabel": "Síguenos en Facebook",
      "linkedinLabel": "Conéctate con nosotros en LinkedIn"
    },
    "company": "Empresa",
    "services": "Servicios",
    "resources": "Recursos",
    "legal": "Legal",
    "allRightsReserved": "Todos los derechos reservados",
    "followUs": "Síguenos"
  },
  "servicesSection": {
    "description": "Cada componente de nuestra estrategia es una parte vital de tu vehículo de marketing, meticulosamente ajustado para un rendimiento óptimo.",
    "heading": "Nuestros Componentes de Marketing",
    "learnMore": "Saber Más"
  },
  "ourDrive": {
    "heading": "La Diferencia de Marketing Car",
    "description": "No solo creamos planes de marketing—damos a las pequeñas empresas un mapa claro, herramientas prácticas y orientación constante para que cada parte de su motor de crecimiento funcione en conjunto.",
    "items": {
      "smallBusiness": {
        "title": "Soluciones de Marketing para Pequeñas Empresas",
        "description": "Adaptamos nuestras estrategias para ajustarse a tu presupuesto, ritmo y objetivos, dando a las pequeñas empresas la libertad de crecer en sus propios términos."
      },
      "dataStrategy": {
        "title": "Estrategia Basada en Datos",
        "description": "Nuestras decisiones están respaldadas por análisis para garantizar un rendimiento óptimo."
      },
      "customSolutions": {
        "title": "Soluciones Personalizadas",
        "description": "Diseñamos estrategias únicas para cada negocio, sin depender nunca de plantillas o paquetes genéricos."
      },
      "continuousGrowth": {
        "title": "Crecimiento Continuo",
        "description": "Constantemente adaptamos y refinamos las estrategias para mantenerte a la vanguardia."
      }
    }
  },
  "callToAction": {
    "heading": "¿Listo para Comenzar el Viaje?",
    "description": "Hablemos sobre cómo podemos personalizar tu vehículo de marketing para un viaje incomparable hacia el éxito.",
    "buttonText": "Programa Tu Consulta Gratuita",
    "readyToGrow": "¿Listo para Hacer Crecer Tu Negocio?",
    "getStarted": "Comienza Hoy",
    "scheduleConsultation": "Programa una Consulta Gratuita",
    "learnHow": "Descubre Cómo Podemos Ayudarte"
  },
  "pages": {
    "services": {
      "metaTitle": "Nuestros Servicios de Marketing | Marketing Car",
      "metaDescription": "Explora la gama completa de servicios de marketing digital ofrecidos por Marketing Car, desde SEO y diseño web hasta marketing de contenidos y publicidad pagada.",
      "heading": "Nuestros Servicios de Marketing",
      "description": "Un conjunto completo de herramientas para construir, ajustar y acelerar el crecimiento de tu negocio. Ofrecemos una gama completa de servicios para llevarte donde quieres ir.",
      "viewDetails": "Ver Detalles"
    },
    "whoWeHelp": {
      "metaTitle": "A Quién Ayudamos | Marketing Car",
      "metaDescription": "Marketing Car se especializa en proporcionar soluciones de marketing personalizadas para una variedad de profesionales, incluyendo terapeutas, contratistas y propietarios de pequeñas empresas.",
      "heading": "Marketing Especializado para Tu Industria",
      "description": "Entendemos que cada industria tiene desafíos y oportunidades únicos. Proporcionamos estrategias personalizadas para ayudarte a conectar con tus clientes ideales."
    },
    "about": {
      "metaTitle": "Acerca de Marketing Car | Nuestra Misión e Historia",
      "metaDescription": "Conoce la misión de Marketing Car de proporcionar a las pequeñas empresas soluciones de marketing claras, efectivas y personalizadas que impulsen un crecimiento real.",
      "heroHeading": "Acerca de Nosotros",
      "heroDescription": "En Marketing Car, somos los mecánicos de tu vehículo de crecimiento empresarial, dedicados a equipar a las pequeñas empresas con el mapa y las herramientas que necesitan para impulsar el éxito duradero.",
      "philosophyHeading": "Nuestra Filosofía",
      "philosophyParagraphs": [
        "Marketing Car se basa en el hecho de que no hay píldora mágica ni solución única para el crecimiento—se necesita una combinación de componentes trabajando juntos para construir tu vehículo de marketing y hacer avanzar tu negocio. Al igual que un automóvil, cada parte importa. Desde estrategia y marca hasta contenido, diseño y publicidad, ayudamos a alinear cada pieza para que todo el motor funcione sin problemas.",
        "Creemos que cada pequeña empresa merece una estrategia de marketing tan única como ellos. Por eso dejamos de lado el libro de jugadas genérico y nos enfocamos en crear soluciones personalizadas que se ajusten a tus objetivos, presupuesto y ritmo.",
        "Nuestra misión es desmitificar el marketing digital, transformando conceptos complejos en un mapa claro y accionable. Te empoderamos con el conocimiento y las herramientas para no solo competir, sino prosperar en tu mercado."
      ],
      "rootsHeading": "Nuestras Raíces",
      "rootsDescription": "Fundada por Kelly Baltzell, M.A., propietaria de una agencia de marketing con más de 30 años de experiencia, Marketing Car se basa en décadas de experiencia ayudando a empresas de todos los tamaños a crecer. Hoy, ese legado continúa con un enfoque en apoyar a propietarios de pequeñas empresas que están listos para tomar el volante en su viaje de marketing.",
      "ctaEyebrow": "¿Listo para Hablar?",
      "ctaHeading": "Construyamos Tu Vehículo de Marketing",
      "ctaDescription": "Ya sea que necesites una estrategia completa o solo un ajuste, estamos aquí para ayudar. Ponte en contacto para discutir cómo podemos acelerar tu crecimiento.",
      "ctaButton": "Contáctanos"
    },
    "contact": {
      "metaTitle": "Contáctanos | Marketing Car",
      "metaDescription": "Ponte en contacto con Marketing Car. Ya sea que tengas una pregunta o quieras iniciar un proyecto, estamos aquí para ayudarte a acelerar tu marketing.",
      "heading": "Ponte en Contacto",
      "description": "¿Tienes una pregunta o estás listo para arrancar tu motor? Nos encantaría saber de ti. Completa el formulario a continuación o usa los detalles de contacto para comunicarte con nosotros.",
      "formHeading": "Formulario de Contacto",
      "readyHeading": "¿Listo para Comenzar?",
      "readyDescription": "Reserva una consulta gratuita con un mecánico de marketing ahora.",
      "readyButton": "Reserva Tu Consulta Gratuita",
      "phoneHeading": "Teléfono",
      "phoneNumber": "312-741-9028",
      "inquiriesHeading": "Consultas Generales",
      "inquiriesEmail": "mechanic@marketingcar.com",
      "inquiriesNote": "Para la respuesta más rápida, por favor usa el formulario de contacto.",
      "locationHeading": "Ubicación",
      "locationDescription": "Nuestra fundadora se encuentra en Minnesota, y nuestro equipo virtual reúne talento de costa a costa en los EE. UU.",
      "connectHeading": "Conéctate con Nosotros"
    },
    "notFound": {
      "heading": "404",
      "message": "Parece que tomamos una salida equivocada. Volvamos al camino.",
      "goHomeButton": "Ir al Inicio",
      "blogLink": "Leer el Blog"
    },
    "thankYou": {
      "metaTitle": "¡Gracias! | Marketing Car",
      "metaDescription": "Gracias por contactar a Marketing Car. Hemos recibido tu mensaje y nos pondremos en contacto en breve.",
      "heading": "¡Reserva Confirmada!",
      "message": "Gracias por programar una sesión con nosotros. Hemos recibido tu solicitud y enviaremos un correo electrónico de confirmación con todos los detalles en breve.",
      "buttonText": "Volver a la Página Principal"
    },
    "blog": {
      "title": "Perspectivas de Marketing",
      "subtitle": "Consejos de expertos para el crecimiento de pequeñas empresas",
      "readMore": "Leer Más",
      "latestPosts": "Publicaciones Recientes",
      "categories": "Categorías",
      "tags": "Etiquetas",
      "searchPlaceholder": "Buscar artículos..."
    }
  },
  "services": {
    "marketingStrategy": { "name": "GPS", "subName": "Estrategia de Marketing" },
    "localMarketing": { "name": "Faros", "subName": "Marketing Local/Cerca de Mí" },
    "graphicDesign": { "name": "Pintura", "subName": "Diseño Gráfico" },
    "b2bMarketing": { "name": "Enganche", "subName": "Marketing B2B" },
    "brandStrategy": { "name": "Carrocería", "subName": "Estrategia y Diseño de Marca" },
    "consultation": { "name": "Mecánico", "subName": "Consulta de Marketing" },
    "seo": { "name": "Motor", "subName": "SEO" },
    "contentMarketing": { "name": "Gasolina", "subName": "Marketing de Contenidos" },
    "paidAdvertising": { "name": "Acelerador", "subName": "Publicidad Pagada" },
    "socialMedia": { "name": "Bocina", "subName": "Redes Sociales" },
    "emailMarketing": { "name": "Volante", "subName": "Email Marketing" },
    "webDesign": { "name": "Ruedas", "subName": "Diseño y Desarrollo Web" }
  },
  "common": {
    "loading": "Cargando...",
    "error": "Ocurrió un error",
    "tryAgain": "Intentar de Nuevo",
    "backToHome": "Volver al Inicio",
    "notFound": "Página No Encontrada",
    "comingSoon": "Próximamente",
    "learnMore": "Saber Más",
    "readMore": "Leer Más",
    "viewAll": "Ver Todo",
    "getStarted": "Comenzar",
    "contactUs": "Contáctanos"
  },
  "language": {
    "select": "Seleccionar Idioma",
    "english": "English",
    "spanish": "Español"
  }
};

const outputPath = path.resolve(__dirname, '../src/i18n/locales/es/translations.json');
writeFileSync(outputPath, JSON.stringify(spanishTranslations, null, 2));
console.log('Spanish translations generated at:', outputPath);
