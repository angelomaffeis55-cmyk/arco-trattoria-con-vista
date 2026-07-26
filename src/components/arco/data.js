export const TF = (id, w = 1200) =>
  `https://cdn.thefork.com/tf-lab/image/upload/w_${w},h_${w},c_fill,q_auto,f_jpg/restaurant/18352d30-e8f6-4b2f-9a4f-d387827ef2f2/${id}`;

export const TF_CUSTOMER = (id, w = 1200) =>
  `https://cdn.thefork.com/tf-lab/image/upload/w_${w},c_fill,q_auto,f_auto/customer/18352d30-e8f6-4b2f-9a4f-d387827ef2f2/${id}`;

export const HERO_IMG = "https://media.base44.com/images/public/6a66623b13a5257cb6038200/0795d1197_generated_1b8c1eb3.png";

export const LOGO_IMG = "https://media.base44.com/images/public/6a66623b13a5257cb6038200/041b27e58_IMG_2254.jpeg";

export const HERO_DISH_IMG = "https://media.base44.com/images/public/6a66623b13a5257cb6038200/a8d67b8fe_IMG_2253.png";

export const HERO_VIDEO = "https://media.base44.com/videos/public/6a66623b13a5257cb6038200/775df95b5_SnapInstato_AQN1Qn5s5cJs0Qa1izuMYe8-wWR50ZXFvrKQ_je7IMzo-M88qIpZBcDM7GCp0Bow7A3kzZry6Gxpowu_U8HXqpthGKsuDgH98fDc3q0.mp4";

export const RESTAURANT = {
  name: "Arco",
  fullName: "Arco Trattoria con Vista",
  tagline: "Trattoria con cucina tipica bergamasca",
  address: "Via Santuario di Altino, 64",
  city: "Albino (BG)",
  zip: "24021",
  phone: "+39 335 5845810",
  phoneHref: "tel:+393355845810",
  instagram: "https://www.instagram.com/arco_trattoria_con_vista/",
  instagramHandle: "@arco_trattoria_con_vista",
  thefork: "https://www.thefork.it/ristorante/arco-trattoria-con-vista-r856812",
  mapsUrl: "https://www.google.com/maps/search/?api=1&query=Arco+Trattoria+con+Vista+Via+Santuario+di+Altino+64+Albino",
  rating: "9,5",
  reviewsCount: 188,
  foodScore: 9.5,
  serviceScore: 9.4,
  atmosphereScore: 9.5,
};

export const HOURS = [
  { day: "Martedì — Venerdì", time: "19:00 — 23:00" },
  { day: "Sabato", time: "12:30 — 14:30 · 19:00 — 23:00" },
  { day: "Domenica", time: "12:30 — 14:30 · 19:00 — 23:00" },
  { day: "Lunedì", time: "Chiuso" },
];

export const DISHES = [
  {
    name: "Casoncelli alla Bergamasca",
    note: "Pasta ripiena della tradizione, ripieno di carne, Grana, amaretti e uvetta.",
    ingredient: "Amaretti · Uvetta",
    img: TF("c0570ccd-0c0a-4ea3-b5b8-6b4195c7c217.webp"),
  },
  {
    name: "Pappardelle al Cinghiale",
    note: "Pasta fresca trafilata a mano, sugo di cinghiale delle valli orobiche.",
    ingredient: "Cinghiale · Ginepro",
    img: TF("2cd0b011-5196-4a48-a99f-37d60a100880.webp"),
  },
  {
    name: "Gnocchi di Patate",
    note: "Impastati a mano ogni mattina, pomodoro fresco e basilico del territorio.",
    ingredient: "Patate · Basilico",
    img: TF("1ad40b5b-f3d6-474c-907e-cdf30d44233c.webp"),
  },
  {
    name: "Tartare di Manzo",
    note: "Carne cruda di manzo, cipolla rossa in agrodolce, senape cremosa.",
    ingredient: "Manzo · Cipolla rossa",
    img: TF("6d3606ae-405a-40a1-b65c-309b5395bbb4.webp"),
  },
  {
    name: "Brasato con Polenta",
    note: "Carne brasata lentamente, polenta di mais locale e radicchio.",
    ingredient: "Brasato · Polenta",
    img: TF("4c60391c-3369-4aec-abd1-32b73db3627d.webp"),
  },
  {
    name: "Tataki di Cervo",
    note: "Cervo in crosta di sesamo, salsa ai mirtilli rossi e riduzione di Balsamico.",
    ingredient: "Cervo · Mirtilli",
    img: TF_CUSTOMER("a934a53d-e016-41cb-a3de-2eba17c21080.jpg"),
  },
  {
    name: "Tacos di Cervo",
    note: "Farcia di cervo, erbe fresche e fiori edibili, salsa cremosa allo yogurt.",
    ingredient: "Cervo · Fiori edibili",
    img: TF_CUSTOMER("30697798-8d2e-44ec-a16e-ba9775512ab8.jpg"),
  },
  {
    name: "Tagliatelle Verdi",
    note: "Pasta verde agli spinaci, ragù di carne macinata e Grana stagionato.",
    ingredient: "Spinaci · Ragù",
    img: TF_CUSTOMER("1049eb69-755b-4744-af1b-b7e167245637.jpg"),
  },
];

export const GALLERY = [
  TF("328653b9-9f7c-4690-aee9-95b9c1dce277.webp"),
  TF("bfeaeaa9-05bd-4f1d-b4dd-a3a46baacc2a.webp"),
  TF("67498272-b7f5-4440-976f-231afb846e29.webp"),
  TF("2cd0b011-5196-4a48-a99f-37d60a100880.webp"),
  TF("6d3606ae-405a-40a1-b65c-309b5395bbb4.webp"),
  TF("c0570ccd-0c0a-4ea3-b5b8-6b4195c7c217.webp"),
  TF("1ad40b5b-f3d6-474c-907e-cdf30d44233c.webp"),
  TF("4c60391c-3369-4aec-abd1-32b73db3627d.webp"),
  TF_CUSTOMER("3fc24758-7ba4-4229-80ff-5f50e3fefdbd.jpg"),
  TF_CUSTOMER("2cb98147-8597-47f4-b92e-12ce4129b5b1.jpg"),
];

export const REVIEWS = [
  { author: "Alberto B.", score: "10", text: "Ristorante con vista spettacolare sulle prealpi Orobiche, ottimo servizio e cucina di livello. Prezzo più che onesto." },
  { author: "Gabriele C.", score: "10", text: "Tutti i piatti che abbiamo provato erano buonissimi. Personale molto gentile e disponibile. Vista incantevole. Super consigliato!" },
  { author: "Maria Teresa B.", score: "10", text: "Bella terrazza con vista, cibo ottimo, tutto buono e di qualità. Ci torneremo sicuramente." },
  { author: "Elisa C.", score: "10", text: "La nostra cena ha superato le aspettative, cibo tipico bergamasco ma anche piatti più elaborati. Vista stupenda da tornare." },
  { author: "Fabio A.", score: "10", text: "Ottimo come sempre. Il Tacos di cervo un must. Ma anche il Tataki di Cervo ottima. Vista splendida e temperatura piacevole." },
  { author: "Carlo B.", score: "10", text: "Trattoria che merita una visita anche solo per la vista. Se poi ci mettiamo servizio top e buon cibo allora siamo apposto." },
  { author: "Dania C.", score: "10", text: "Lo ritengo un posto meraviglioso! Cibo eccellente, personale simpaticissimo e molto disponibile." },
  { author: "angelo b.", score: "10", text: "Bellissimo locale con veranda esterna con vista magnifica sulla valle. Servizio accurato, gentile. Cibo ottimo, casoncelli." },
  { author: "Stefano p.", score: "10", text: "Rapporto qualità prezzo molto buono, posizione del ristorante veramente da cartolina." },
  { author: "giorgia m.", score: "10", text: "Questo posto ha una vista strepitosa e ottimi piatti." },
  { author: "Norma F.", score: "10", text: "Posto stupendo, personale molto gentile, cibo top, prezzi in linea. Consigliato!!" },
  { author: "Simona S.", score: "10", text: "Cibo ottimo.. cortesia e una bellissima atmosfera hanno reso la nostra serata perfetta." },
];