export const TF = (id, w = 1200) =>
  `https://cdn.thefork.com/tf-lab/image/upload/w_${w},h_${w},c_fill,q_auto,f_jpg/restaurant/18352d30-e8f6-4b2f-9a4f-d387827ef2f2/${id}`;

export const TF_CUSTOMER = (id, w = 1200) =>
  `https://cdn.thefork.com/tf-lab/image/upload/w_${w},c_fill,q_auto,f_auto/customer/18352d30-e8f6-4b2f-9a4f-d387827ef2f2/${id}`;

export const HERO_IMG = "https://media.base44.com/images/public/6a66623b13a5257cb6038200/0795d1197_generated_1b8c1eb3.png";

export const LOGO_IMG = "https://media.base44.com/images/public/6a66623b13a5257cb6038200/041b27e58_IMG_2254.jpeg";

export const HERO_DISH_IMG = "https://media.base44.com/images/public/6a66623b13a5257cb6038200/3a73eb5f7_IMG_2256.jpg";

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
  mapsUrl: "https://www.google.com/maps/search/?api=1&query=Arco+Trattoria+con+Vista+Via+Santuario+di+Altino+64+Albino",
  rating: "4,7",
  reviewsCount: 194,
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
  { author: "Michele Maniscalco", score: "5", time: "2 mesi fa", text: "Trattoria con interni eleganti, semplici ed accoglienti che propone tendenzialmente cucina bergamasca. Essendo in altura, da lì la possibilità di una bella vista…" },
  { author: "Nicoletta Votino", score: "5", time: "5 mesi fa", text: "Se cercate i sapori autentici del posto questo è la trattoria giusta. Sono stata qui a pranzo con degli amici e l'esperienza è stata molto positiva. Il…" },
  { author: "Miryam Rocchi", score: "4", time: "5 mesi fa", text: "Ho trascorso la serata di San Valentino 2026 in questo ristorante, l'atmosfera era davvero piacevole e romantica. All'entrata del ristorante c'era anche un…" },
  { author: "Silvana Aiolfi", score: "5", time: "5 mesi fa", text: "Locale di cucina tradizionale bergamasca, con qualche proposta alternativa, come i tacos, che arricchisce il menù senza snaturarne l'identità…" },
  { author: "Francesca T", score: "5", time: "3 mesi fa", text: "Ricette della tradizione lombarda in chiave moderna (ma mai banale o invadente) che risultano di una goduria SPAZIALE. Ambiente accogliente e servizio…" },
  { author: "Valeria", score: "5", time: "4 mesi fa", text: "Posto accogliente, ci siamo recati un sabato a pranzo. Abbiamo preso un buon tagliere di salumi, due casoncelli, degli gnocchi…" },
  { author: "Alessandra Scuri", score: "5", time: "5 mesi fa", text: "Nuovo posto del cuore!…" },
  { author: "Francesco Cappetta", score: "5", time: "5 mesi fa", text: "Arrivati in questo meraviglioso ristorante con vista panoramica, siamo stati accolti da Giada, che ci ha seguito durante la cena e consigliato piatti veramente…" },
  { author: "Erika Lussana", score: "5", time: "2 mesi fa", text: "Un traguardo speciale in una cornice impeccabile! Abbiamo festeggiato qui la Cresima di Andrea e non avremmo potuto fare scelta…" },
  { author: "Chiara Carrara", score: "5", time: "5 mesi fa", text: "5 stelle meritate! Il cibo era delizioso, con piatti ben presentati e sapori impeccabili…" },
  { author: "Iulia Lorena Magherusan", score: "5", time: "1 mese fa", text: "Uno dei migliori ristoranti rustici in cui abbiamo mai mangiato. Servizio estremamente attento e gentile e cibo ottimo! Consiglio sinceramente di passare…" },
  { author: "David B.", score: "5", time: "2 mesi fa", text: "Era uno di quei ristoranti dove avrei voluto pranzare o cenare ed è capitata l'occasione. Locale accogliente con una bella vista sulla Val Seriana, cucina…" },
  { author: "Sara Alborghetti", score: "5", time: "5 mesi fa", text: "Sono stata recentemente da Arco Trattoria con Vista, nel paese di Albino, e l'esperienza è stata davvero molto positiva. Il ristorante, aperto da poco, gode di…" },
  { author: "Diego Macetti", score: "5", time: "4 mesi fa", text: "È stata la nostra prima esperienza in questo ottimo ristorante. Vista panoramica sulle nostre Prealpi bergamasche…" },
  { author: "Jordi Vedovati", score: "5", time: "1 mese fa", text: "Prodotti ricercati e di qualità, location davvero bella e pulita ma la cosa più piacevole sono state le ragazze in sala capaci di consigliare con empatia e con…" },
  { author: "Bruno Ezio Pietro Corti", score: "5", time: "5 mesi fa", text: "Ho avuto occasione di venire in questo ristorante più volte e mi sono sempre trovata molto bene. La cucina è ottima, con piatti gustosi e preparati con cura…" },
  { author: "Marco", score: "4", time: "4 mesi fa", text: "Ambiente nuovo e curato, sembra di stare in una trattoria ma in chiave leggermente più moderna…" },
  { author: "Irina I.", score: "5", time: "10 mesi fa", text: "Posto veramente bello e accogliente, staff molto gentile e cibo locale ottimo. Il prezzo per 4 persone è stato più che onesto con tagliere misto sostanzioso e…" },
  { author: "Carmen Moro", score: "5", time: "5 mesi fa", text: "Sono stata in questo ristorante più volte e ogni volta è sempre una conferma! Ambiente accogliente e piacevole, personale gentile e disponibile…" },
  { author: "Samuele Pezzoli", score: "5", time: "6 mesi fa", text: "Locale pulito ed accogliente, con arredamento rustico ed evocativo in un contesto tranquillo e spettacolare…" },
];