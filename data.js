/**
 * JEJAK OBSERVASI - Data Repository
 * Pembelajaran Teks Laporan Hasil Observasi (LHO) Kelas X SMA
 * Objek Observasi: Budaya Lokal Kota Surakarta (Solo)
 */

const LOCATIONS_DATA = [
  {
    id: "keraton",
    name: "Keraton Surakarta Hadiningrat",
    category: "Istana & Pusat Kebudayaan Jawa",
    established: "1745 M",
    founder: "Sri Susuhunan Pakubuwana II",
    address: "Kelurahan Baluwarti, Kecamatan Pasar Kliwon, Kota Surakarta",
    mapCoords: { x: 58, y: 68 }, // Coordinates for Surakarta Illustrated Map
    tagline: "Pusat peradaban Mataram Islam dan episentrum adat tradisi Jawa di Surakarta",
    thumbnail: "https://img.youtube.com/vi/h_9AyR1hel0/hqdefault.jpg",
    youtubeId: "h_9AyR1hel0",
    embedUrl: "https://www.youtube.com/embed/h_9AyR1hel0",
    youtubeUrl: "https://www.youtube.com/watch?v=h_9AyR1hel0",
    channelName: "Pesona Indonesia / Pemkot Surakarta",
    description: "Keraton Surakarta Hadiningrat merupakan istana resmi Kasunanan Surakarta yang didirikan pada tahun 1745. Kompleks keraton ini menyimpan ribuan koleksi pusaka, arsitektur perpaduan Jawa klasik dan Eropa, serta menjadi saksi peralihan sejarah Mataram Islam.",
    keyFacts: [
      "Didirikan pada masa pemerintahan Sunan Pakubuwana II setelah peristiwa Geger Pacinan di Kartasura.",
      "Memiliki menara pengawas unik setinggi 30 meter bernama Panggung Sangga Buwana (didirikan 1782).",
      "Kompleks bangunan dikelilingi benteng pertahanan tebal bernama Baluwarti.",
      "Koleksi museum mencakup kereta kencana Kyai Garuda Kencana dan gamelan pusaka berusia ratusan tahun."
    ],
    observationGuide: [
      { aspect: "Nama Objek", prompt: "Nama resmi cagar budaya dan penguasa yang mendirikannya." },
      { aspect: "Lokasi", prompt: "Letak geografis keraton di Surakarta dan kawasan Baluwarti." },
      { aspect: "Ciri Bangunan", prompt: "Ciri khas arsitektur joglo, pilar bergaya corak Eropa, dan warna keemasan/hijau pareanom." },
      { aspect: "Bagian-bagian", prompt: "Alun-alun Lor, Sasana Sumewa, Sitihinggil, Sasana Sewaka, Panggung Sangga Buwana." },
      { aspect: "Fungsi/Manfaat", prompt: "Sebagai cagar budaya, museum edukasi sejarah, pusat upacara adat (Sekaten, Kirab 1 Sura)." }
    ]
  },
  {
    id: "mangkunegaran",
    name: "Pura Mangkunegaran",
    category: "Istana Kadipaten & Cagar Budaya",
    established: "1757 M",
    founder: "Kanjeng Gusti Pangeran Adipati Arya Mangkunegara I (Pangeran Sambernyawa)",
    address: "Jalan Ronggowarsito, Keprabon, Kecamatan Banjarsari, Kota Surakarta",
    mapCoords: { x: 76, y: 72 },
    tagline: "Kediaman agung Kadipaten Mangkunegaran dengan pendopo kayu jati terluas di Nusantara",
    thumbnail: "https://img.youtube.com/vi/1tWlaCUKndo/hqdefault.jpg",
    youtubeId: "1tWlaCUKndo",
    embedUrl: "https://www.youtube.com/embed/1tWlaCUKndo",
    youtubeUrl: "https://www.youtube.com/watch?v=1tWlaCUKndo",
    channelName: "Kanal Resmi Kebudayaan Surakarta",
    description: "Pura Mangkunegaran adalah istana kadipaten agung di Kota Solo yang berdiri setelah Perjanjian Salatiga tahun 1757. Istana ini terkenal dengan Pendopo Ageng tanpa paku berdaya tampung ribuan orang dan langit-langit berlukiskan motif Kumudawati.",
    keyFacts: [
      "Pendopo Ageng berukuran sekitar 3.500 meter persegi dan ditopang 4 tiang saka guru dari kayu jati utuh.",
      "Langit-langit Pendopo Ageng dihiasi motif Kumudawati (8 warna mistik penolak bala).",
      "Memiliki perpustakaan bersejarah 'Rekso Pustoko' yang menyimpan manuskrip sastra Jawa kuno sejak 1867.",
      "Didirikan oleh Raden Mas Said yang bergelar Mangkunegara I (Pangeran Sambernyawa)."
    ],
    observationGuide: [
      { aspect: "Nama Objek", prompt: "Sebutkan nama istana kadipaten ini secara lengkap." },
      { aspect: "Lokasi", prompt: "Di manakah letak Pura Mangkunegaran di jantung Kota Surakarta?" },
      { aspect: "Ciri Bangunan", prompt: "Bentuk atap joglo ageng, warna kuning-hijau pari sawah, keterbukaan tanpa dinding depan." },
      { aspect: "Bagian-bagian", prompt: "Pamedan (lapangan latihan berkuda), Pendopo Ageng, Pringgitan, Dalem Ageng, Pracima Tuin." },
      { aspect: "Fungsi/Manfaat", prompt: "Tempat tinggal Sri Paduka Mangkunegara, pusat tari gaya Mangkunegaran, objek wisata budaya internasional." }
    ]
  },
  {
    id: "laweyan",
    name: "Kampung Batik Laweyan",
    category: "Sentra Kerajinan Tradisional & Kawasan Bersejarah",
    established: "Abad ke-16 M",
    founder: "Kyai Ageng Henis / Saudagar Batik Laweyan",
    address: "Kecamatan Laweyan, bagian barat Kota Surakarta",
    mapCoords: { x: 18, y: 56 },
    tagline: "Sentra batik legendaris dengan arsitektur lorong bertembok tinggi dan tradisi saudagar batik",
    thumbnail: "https://img.youtube.com/vi/NZShmFcGRME/hqdefault.jpg",
    youtubeId: "NZShmFcGRME",
    embedUrl: "https://www.youtube.com/embed/NZShmFcGRME",
    youtubeUrl: "https://www.youtube.com/watch?v=NZShmFcGRME",
    channelName: "Dokumenter Budaya Surakarta",
    description: "Kampung Batik Laweyan adalah salah satu sentra industri batik tertua di Indonesia. Kawasan ini memiliki keunikan tata ruang lorong sempit berdinding bata tinggi bergaya perpaduan Jawa, Eropa, dan Tionghoa milik para saudagar batik tempo dulu.",
    keyFacts: [
      "Menjadi tempat lahirnya Sarekat Dagang Islam (SDI) yang didirikan oleh K.H. Samanhudi pada tahun 1911.",
      "Kawasan permukiman saudagar memiliki ciri khas 'Mbong Gede' dan pagar tembok tinggi yang kokoh.",
      "Memproduksi ragam teknik batik tulis, cap, dan kombinasi dengan motif tradisional seperti Parang, Kawung, dan Sidomukti.",
      "Tercatat telah ada sejak era Kesultanan Pajang pada abad ke-16 Masehi."
    ],
    observationGuide: [
      { aspect: "Nama Objek", prompt: "Nama sentra cagar budaya industri batik tertua di Surakarta." },
      { aspect: "Lokasi", prompt: "Wilayah barat daya Kota Surakarta, di tepi Kali Jenes." },
      { aspect: "Ciri Kawasan", prompt: "Lorong-lorong sempit berhias dinding benteng tinggi, gerbang gapura regol kuno." },
      { aspect: "Bagian/Aktivitas", prompt: "Rumah produksi batik tulis/cap, showroom galeri batik, museum K.H. Samanhudi, makam Kyai Ageng Henis." },
      { aspect: "Fungsi/Manfaat", prompt: "Pusat perekonomian kreatif batik rakyat, pelestarian warisan budaya UNESCO, destinasi edu-wisata." }
    ]
  },
  {
    id: "pasargede",
    name: "Pasar Gede Hardjonagoro",
    category: "Pasar Tradisional & Cagar Budaya Kolonial",
    established: "1930 M",
    founder: "Ir. Thomas Karsten & Pakubuwana X",
    address: "Jalan Urip Sumoharjo, Sudiroprajan, Kecamatan Jebres, Kota Surakarta",
    mapCoords: { x: 85, y: 52 },
    tagline: "Pasar peradaban tertua Surakarta perpaduan arsitektur Belanda dan falsafah atap Jawa",
    thumbnail: "https://img.youtube.com/vi/XjBzxO5khPg/hqdefault.jpg",
    youtubeId: "XjBzxO5khPg",
    embedUrl: "https://www.youtube.com/embed/XjBzxO5khPg",
    youtubeUrl: "https://www.youtube.com/watch?v=XjBzxO5khPg",
    channelName: "Solo Safari & Culture Channel",
    description: "Pasar Gede Hardjonagoro dirancang oleh arsitek Belanda terkemuka Ir. Thomas Karsten dan diresmikan oleh Sunan Pakubuwana X pada 1930. Pasar ini menjadi simbol harmoni sosial budaya Jawa-Tionghoa dan pusat kuliner khas Solo.",
    keyFacts: [
      "Dirancang dengan sirkulasi udara dan pencahayaan alami yang sangat modern pada masanya.",
      "Fasad gerbang utama mengadopsi bentuk benteng Belanda yang dipadukan dengan atap limasan Jawa.",
      "Terletak berdampingan dengan Klenteng Tien Kok Sie, mencerminkan akulturasi budaya harmonis.",
      "Pusat kuliner tradisional legendaris seperti Dawet Telasih Bu Dermi, lenjongan, cabuk rambak, dan brambang asem."
    ],
    observationGuide: [
      { aspect: "Nama Objek", prompt: "Nama resmi pasar dan tokoh arsitek yang merancangnya." },
      { aspect: "Lokasi", prompt: "Kawasan pecinan Sudiroprajan, Jebres, di seberang Tugu Jam Pasar Gede." },
      { aspect: "Ciri Bangunan", prompt: "Bangunan dua lantai, jendela ventilasi tinggi lebar, atap tinggi menaungi pedagang." },
      { aspect: "Bagian/Aktivitas", prompt: "Los pedagang buah, los bumbu rempah, kios kuliner tradisional, area sembako, jembatan penghubung." },
      { aspect: "Fungsi/Manfaat", prompt: "Pusat distribusi pangan rakyat, penggerak denyut ekonomi Surakarta, etalase kuliner autentik." }
    ]
  },
  {
    id: "balekambang",
    name: "Taman Balekambang Surakarta",
    category: "Taman Botani, Konservasi Alam & Seni Budaya",
    established: "1921 M",
    founder: "KGPAA Mangkunegara VII",
    address: "Jalan Balekambang No. 1, Manahan, Kecamatan Banjarsari, Kota Surakarta",
    mapCoords: { x: 30, y: 22 },
    tagline: "Oase hijau bersejarah yang dipersembahkan untuk kedua putri Adipati Mangkunegara VII",
    thumbnail: "https://img.youtube.com/vi/fprOycbIlJg/hqdefault.jpg",
    youtubeId: "fprOycbIlJg",
    embedUrl: "https://www.youtube.com/embed/fprOycbIlJg",
    youtubeUrl: "https://www.youtube.com/watch?v=fprOycbIlJg",
    channelName: "Pesona Surakarta / Humas Surakarta",
    description: "Taman Balekambang dibangun pada 26 Oktober 1921 oleh KGPAA Mangkunegara VII sebagai wujud cinta kasih kepada kedua putrinya, GRAy Partini dan GRAy Partinah. Kini menjadi paru-paru hijau Solo dengan rimbun pohon beringin langka, kawanan rusa tutul, dan panggung kesenian ketoprak.",
    keyFacts: [
      "Terbagi menjadi dua bagian utama: Partini Tuin (taman air/danau resapan) dan Partinah Bosch (hutan kota).",
      "Memiliki koleksi pohon-pohon langka berusia ratusan tahun seperti beringin putih, kenari, dan apel cokelat.",
      "Terdapat kawanan rusa tutul (Axis axis) yang hidup bebas dan jinak berinteraksi dengan pengunjung.",
      "Telah direvitalisasi dengan fasilitas modern seperti skywalk kanopi dan gedung pertunjukan seni tradisi."
    ],
    observationGuide: [
      { aspect: "Nama Objek", prompt: "Nama taman bersejarah dan kedua nama putri Mangkunegara VII." },
      { aspect: "Lokasi", prompt: "Kawasan Manahan, Banjarsari, Solo utara." },
      { aspect: "Ciri Lingkungan", prompt: "Kombinasi danau buatan tenang, hamparan rumput hijau, dan deretan pepohonan kanopi besar." },
      { aspect: "Bagian/Elemen", prompt: "Partini Tuin (kolam perahu), Partinah Bosch (hutan tanaman langka), kolam teratai, panggung terbuka, kandang/area rusa." },
      { aspect: "Fungsi/Manfaat", prompt: "Resapan air kota, paru-paru hijau lingkungan, tempat edukasi botani hayati, panggung pertunjukan ketoprak Solo." }
    ]
  }
];

// Kuis Interaktif "Fakta atau Opini?"
const QUIZ_QUESTIONS = [
  {
    id: 1,
    statement: "Laweyan dikenal sebagai salah satu kawasan yang memiliki sejarah panjang dalam perkembangan batik di Surakarta.",
    correct: "fakta",
    explanation: "BENAR (FAKTA). Kawasan Laweyan memiliki bukti historis tertulis sejak abad ke-16 (era Pajang) dan pendirian Sarekat Dagang Islam oleh K.H. Samanhudi tahun 1911.",
    culturalContext: "Kampung Batik Laweyan"
  },
  {
    id: 2,
    statement: "Laweyan adalah tempat paling indah dan nyaman di seluruh penjuru Kota Solo.",
    correct: "opini",
    explanation: "BENAR (OPINI). Kata 'paling indah dan nyaman' merupakan kata sifat bernilai rasa subjektif yang berbeda-beda bagi setiap individu dan tidak dapat diukur secara ilmiah.",
    culturalContext: "Kampung Batik Laweyan"
  },
  {
    id: 3,
    statement: "Keraton Surakarta Hadiningrat didirikan oleh Susuhunan Pakubuwana II pada tahun 1745.",
    correct: "fakta",
    explanation: "BENAR (FAKTA). Ini adalah fakta sejarah yang tercatat resmi dalam Babad Giyanti dan arsip kolonial mengenai kepindahan istana dari Kartasura ke Desa Sala.",
    culturalContext: "Keraton Surakarta"
  },
  {
    id: 4,
    statement: "Es Dawet Telasih di Pasar Gede memiliki rasa yang jauh lebih lezat daripada minuman khas Nusantara lainnya.",
    correct: "opini",
    explanation: "BENAR (OPINI). Penilaian rasa 'jauh lebih lezat' adalah preferensi lidah individual (subjektif), bukan data yang dapat diverifikasi secara faktual universal.",
    culturalContext: "Pasar Gede Hardjonagoro"
  },
  {
    id: 5,
    statement: "Pendopo Ageng Pura Mangkunegaran berukuran luas sekitar 3.500 m² dan dibangun tanpa menggunakan paku besi.",
    correct: "fakta",
    explanation: "BENAR (FAKTA). Ukuran luas dapat diukur secara presisi matematis dan teknik sambungan kayu menggunakan pasak kayu tradisional (knock-down) dapat dibuktikan secara fisik.",
    culturalContext: "Pura Mangkunegaran"
  },
  {
    id: 6,
    statement: "Taman Balekambang merupakan taman kota yang paling sejuk dan paling cocok untuk melamun di sore hari.",
    correct: "opini",
    explanation: "BENAR (OPINI). Frasa 'paling sejuk' dan 'paling cocok melamun' mengekspresikan anggapan emosional atau penilaian subjektif seseorang.",
    culturalContext: "Taman Balekambang"
  },
  {
    id: 7,
    statement: "Pasar Gede Hardjonagoro dirancang oleh arsitek asal Belanda bernama Ir. Thomas Karsten dan diresmikan tahun 1930.",
    correct: "fakta",
    explanation: "BENAR (FAKTA). Catatan arsip arsitektur Hindia Belanda membuktikan bahwa Ir. Thomas Karsten adalah perancang tata ruang dan konstruksi Pasar Gede.",
    culturalContext: "Pasar Gede Hardjonagoro"
  },
  {
    id: 8,
    statement: "Semua remaja generasi muda zaman sekarang wajib lebih mencintai batik daripada pakaian bergaya modern.",
    correct: "opini",
    explanation: "BENAR (OPINI). Kata 'wajib mencintai' mengandung ajakan, nasihat moral, atau harapan subjektif (modalitas), bukan pernyataan fakta objektif di lapangan.",
    culturalContext: "Batik Surakarta"
  }
];

// Aktivitas Interaktif "Susun Paragraf LHO"
const PARAGRAPH_SORT_DATA = [
  {
    id: "pasargede-puzzle",
    title: "LHO: Pasar Gede Hardjonagoro Surakarta",
    targetOrder: [1, 2, 3],
    paragraphs: [
      {
        id: 2,
        structure: "Deskripsi Bagian",
        badge: "Struktur: Bagian",
        text: "Bangunan Pasar Gede memiliki ciri khas perpaduan gaya arsitektur Belanda dan Jawa yang terdiri atas dua lantai. Fasad depan pasar mengadopsi lengkungan megah bergaya kolonial, sementara atapnya berbentuk limasan khas rumah Jawa. Di lantai satu, terdapat deretan los pedagang yang menjajakan aneka buah segar, bumbu dapur, rempah-rempah, serta kuliner tradisional seperti dawet telasih dan lenjongan. Sistem jendela ventilasi yang tinggi dirancang khusus agar udara dan cahaya alami dapat bersirkulasi dengan baik.",
        hint: "Paragraf ini membedah rincian arsitektur, lantai bangunan, dan komoditas jualan pedagang."
      },
      {
        id: 1,
        structure: "Pernyataan Umum / Klasifikasi",
        badge: "Struktur: Pernyataan Umum",
        text: "Pasar Gede Hardjonagoro merupakan pasar tradisional tertua dan terbesar yang terletak di Jalan Urip Sumoharjo, Kelurahan Sudiroprajan, Kecamatan Jebres, Kota Surakarta. Pasar bersejarah ini dirancang oleh arsitek Belanda terkemuka bernama Ir. Thomas Karsten dan resmi dibuka pada tahun 1930 pada masa pemerintahan Sunan Pakubuwana X. Pasar Gede tergolong sebagai cagar budaya yang merepresentasikan perpaduan harmonis antara kebudayaan Jawa dan Tionghoa.",
        hint: "Paragraf ini mengenalkan objek, nama arsitek, tahun berdiri, lokasi, dan klasifikasinya sebagai cagar budaya."
      },
      {
        id: 3,
        structure: "Deskripsi Manfaat",
        badge: "Struktur: Manfaat",
        text: "Keberadaan Pasar Gede Hardjonagoro memberikan beragam manfaat penting bagi masyarakat dan Kota Surakarta. Selain berfungsi sebagai episentrum perputaran ekonomi dan mata pencaharian ratusan pedagang, pasar ini menjadi destinasi edu-wisata kuliner legendaris yang menarik wisatawan domestik maupun mancanegara. Di samping itu, Pasar Gede menjadi laboratorium nyata bagi siswa untuk mempelajari harmoni toleransi sosial serta sejarah arsitektur cagar budaya Nusantara.",
        hint: "Paragraf ini menguraikan nilai guna ekonomi, destinasi edu-wisata, dan fungsi edukatif bagi masyarakat."
      }
    ]
  },
  {
    id: "laweyan-puzzle",
    title: "LHO: Kampung Batik Laweyan Surakarta",
    targetOrder: [1, 2, 3],
    paragraphs: [
      {
        id: 3,
        structure: "Deskripsi Manfaat",
        badge: "Struktur: Manfaat",
        text: "Kampung Batik Laweyan memiliki nilai kemanfaatan yang strategis dalam berbagai aspek kehidupan. Di sektor ekonomi, keberadaan industri batik rumahan menyerap tenaga kerja lokal dan mendongkrak pendapatan warga sekitar. Dalam bidang kebudayaan dan pendidikan, kawasan ini berfungsi sebagai wahana konservasi warisan takbenda UNESCO serta sarana belajar membatik bagi pelajar dan generasi penerus bangsa.",
        hint: "Membahas kontribusi terhadap ekonomi rakyat, serapan kerja, dan pelestarian seni batik."
      },
      {
        id: 1,
        structure: "Pernyataan Umum / Klasifikasi",
        badge: "Struktur: Pernyataan Umum",
        text: "Kampung Batik Laweyan adalah salah satu sentra industri kerajinan batik tertua di Indonesia yang berlokasi di wilayah barat daya Kota Surakarta. Kawasan bersejarah ini telah berkembang sejak era Kesultanan Pajang pada abad ke-16 di bawah kepemimpinan Kyai Ageng Henis. Secara tata kota, Laweyan diklasifikasikan sebagai kawasan cagar budaya dan sentra ekonomi kreatif berbasis tradisi masyarakat yang masih lestari hingga saat ini.",
        hint: "Membahas definisi, sejarah abad ke-16, letak geografis, dan klasifikasi kawasan cagar budaya."
      },
      {
        id: 2,
        structure: "Deskripsi Bagian",
        badge: "Struktur: Bagian",
        text: "Secara fisik, lanskap Kampung Batik Laweyan ditandai dengan lorong-lorong sempit berliku yang diapit dinding bata tebal setinggi dua hingga tiga meter. Di balik tembok benteng tersebut, berdiri rumah-rumah megah saudagar batik bergaya arsitektur perpaduan Jawa (joglo), Eropa (Art Deco), dan Tionghoa. Di bagian dalam rumah saudagar, terdapat ruang produksi khusus yang memuat canting, wajan malam, cap tembaga, serta bak pewarnaan alami yang digunakan para perajin untuk memproses kain batik tulis dan cap.",
        hint: "Mendeskripsikan detail fisik lorong bertembok, rumah saudagar, dan peralatan produksi batik."
      }
    ]
  }
];

// ===================================================================
// DATA MODUL KAIDAH KEBAHASAAN LHO
// ===================================================================

// Kuis 5 Soal Identifikasi Kaidah Kebahasaan
const KAIDAH_QUIZ_QUESTIONS = [
  {
    id: 1,
    sentence: "Perajin di Kampung Batik Laweyan menorehkan cairan malam panas pada kain mori menggunakan canting tembaga.",
    highlightWord: "menorehkan",
    question: "Kata yang bergaris bawah ('menorehkan') dalam kalimat di atas tergolong ke dalam kaidah kebahasaan...",
    options: [
      { key: "A", text: "Verba relasional (penghubung definisi)" },
      { key: "B", text: "Verba material (menunjukkan tindakan fisik)", isCorrect: true },
      { key: "C", text: "Frasa nominal (kelompok kata benda)" },
      { key: "D", text: "Konjungsi pertentangan" }
    ],
    explanation: "BENAR! Kata 'menorehkan' adalah verba material karena menunjukkan tindakan fisik atau perbuatan nyata yang dilakukan subjek (perajin) terhadap objek (malam pada kain) yang dapat diamati secara visual.",
    elementTag: "Verba Material"
  },
  {
    id: 2,
    sentence: "Pura Mangkunegaran adalah istana kadipaten agung di Kota Surakarta yang didirikan oleh Raden Mas Said pada tahun 1757.",
    highlightWord: "adalah istana kadipaten agung di Kota Surakarta yang didirikan oleh Raden Mas Said pada tahun 1757",
    question: "Berdasarkan fungsi dan pola pembentuknya, struktur kalimat di atas merupakan contoh dari...",
    options: [
      { key: "A", text: "Kalimat deskripsi (memerinci ciri bagian fisik)" },
      { key: "B", text: "Kalimat definisi (memberikan batasan pengertian umum)", isCorrect: true },
      { key: "C", text: "Kalimat opini subjektif (mengandung penilaian pribadi)" },
      { key: "D", text: "Kalimat imperatif (mengandung instruksi kerja)" }
    ],
    explanation: "BENAR! Kalimat tersebut menggunakan verba relasional 'adalah' untuk menjelaskan identitas, kategori, dan batasan umum objek secara ilmiah pada bagian pernyataan umum LHO.",
    elementTag: "Kalimat Definisi"
  },
  {
    id: 3,
    sentence: "Di dalam kompleks cagar budaya Keraton Surakarta, terdapat bangunan bersejarah yang dikelilingi dinding benteng tebal.",
    highlightWord: "bangunan bersejarah & dinding benteng tebal",
    question: "Kelompok kata 'bangunan bersejarah' dan 'dinding benteng tebal' dalam kaidah kebahasaan LHO berfungsi sebagai...",
    options: [
      { key: "A", text: "Frasa nominal (kelompok kata yang menamai objek)", isCorrect: true },
      { key: "B", text: "Frasa verbal (kelompok kata kerja proses)" },
      { key: "C", text: "Istilah teknis linguistik" },
      { key: "D", text: "Verba material tindakan" }
    ],
    explanation: "BENAR! 'Bangunan bersejarah' dan 'dinding benteng tebal' adalah frasa nominal karena memiliki unsur inti berupa kata benda (nomina: bangunan, dinding) yang diperluas dengan kata sifat sebagai penjelas objek.",
    elementTag: "Frasa Nominal"
  },
  {
    id: 4,
    sentence: "Konstruksi atap Pendopo Ageng ditopang oleh empat tiang saka guru dari kayu jati utuh berukuran besar.",
    highlightWord: "saka guru",
    question: "Istilah teknis arsitektur tradisional Jawa 'saka guru' dalam kalimat observasi di atas memiliki arti...",
    options: [
      { key: "A", text: "Pintu gerbang pembatas antara halaman dan ruang dalam" },
      { key: "B", text: "Empat tiang kayu utama penyangga inti atap joglo", isCorrect: true },
      { key: "C", text: "Hiasan ukiran kayu penolak bala di langit-langit" },
      { key: "D", text: "Lantai berundak tempat duduk para bangsawan" }
    ],
    explanation: "BENAR! 'Saka guru' adalah istilah teknis arsitektur Jawa yang merujuk pada empat pilar/tiang penyangga utama di tengah bangunan joglo yang memikul beban struktur atap brunjung paling atas.",
    elementTag: "Istilah Teknis"
  },
  {
    id: 5,
    sentence: "Pasar Gede Hardjonagoro menjadi pusat denyut ekonomi masyarakat. [...], pasar cagar budaya ini berfungsi sebagai destinasi edukasi arsitektur bagi para pelajar.",
    highlightWord: "[...]",
    question: "Konjungsi antarkalimat yang paling tepat, logis, dan baku untuk melengkapi kalimat di atas adalah...",
    options: [
      { key: "A", text: "Selain itu (menambahkan informasi kemanfaatan yang sejalan)", isCorrect: true },
      { key: "B", text: "Walaupun demikian (menyatakan hubungan pertentangan)" },
      { key: "C", text: "Karena itu (menyatakan hubungan sebab-akibat)" },
      { key: "D", text: "Akan tetapi (menyatakan bantahan langsung)" }
    ],
    explanation: "BENAR! Kalimat kedua menambahkan informasi fungsi/manfaat objek observasi yang memperkaya kalimat pertama. Oleh karena itu, konjungsi antarkalimat penambahan yang tepat dan baku adalah 'Selain itu'.",
    elementTag: "Konjungsi"
  }
];

// Latihan Menyunting 3 Kalimat Subjektif Menjadi Objektif
const EDITING_EXERCISES_DATA = [
  {
    id: "edit1",
    topic: "Kampung Batik Laweyan",
    subjectiveSentence: "Batik Laweyan memiliki motif yang sungguh sangat menawan dan wajib dibeli oleh semua wisatawan yang berkunjung ke Solo.",
    flaws: [
      "Mengandung kata sifat emosional subjektif: 'sungguh sangat menawan'.",
      "Mengandung kalimat imbauan/pemaksaan selera pribadi: 'wajib dibeli oleh semua wisatawan'."
    ],
    objectiveModel: "Kampung Batik Laweyan memproduksi kain batik dengan ragam motif tradisional seperti parang dan kawung yang dipasarkan kepada pengunjung domestik maupun mancanegara.",
    revisionReason: "Kata sifat emosional 'sungguh sangat menawan' diganti dengan data faktual berupa nama-nama motif batik tradisional (*parang, kawung*). Klaim subjektif 'wajib dibeli' diganti dengan fakta aktivitas ekonomi distribusi produk secara netral.",
    sampleInputPlaceholder: "Ketik perbaikan kalimatmu di sini, hilangkan kata 'sangat menawan' dan 'wajib dibeli'..."
  },
  {
    id: "edit2",
    topic: "Taman Balekambang Surakarta",
    subjectiveSentence: "Suasana Taman Balekambang di pagi hari terasa luar biasa damai dan paling cocok untuk menenangkan pikiran yang sedang stres.",
    flaws: [
      "Mengandung kata bernilai rasa personal: 'luar biasa damai'.",
      "Mengandung asumsi kondisi psikologis yang tidak terukur: 'paling cocok untuk menenangkan pikiran yang sedang stres'."
    ],
    objectiveModel: "Taman Balekambang memiliki area terbuka hijau seluas 9,8 hektar yang ditumbuhi deretan pohon beringin berusia puluhan tahun dan dilengkapi kolam air Partini Tuin.",
    revisionReason: "Menghilangkan kesan perasaan subjektif ('luar biasa damai') dan klaim fungsi psikologis individual. Menggantinya dengan fakta fisik konkret terukur mengenai luas area cagar budaya (9,8 hektar), vegetasi beringin, dan fasilitas kolam air resapan.",
    sampleInputPlaceholder: "Ketik perbaikan kalimat objektif, sertakan fakta fisik seperti luas taman atau pohon beringin..."
  },
  {
    id: "edit3",
    topic: "Pasar Gede Hardjonagoro",
    subjectiveSentence: "Pasar Gede Hardjonagoro adalah mahakarya arsitektur terindah yang pernah dibangun oleh Belanda di seluruh Jawa Tengah.",
    flaws: [
      "Menggunakan kata superlatif bernilai rasa estetika personal: 'terindah yang pernah dibangun'.",
      "Menggunakan kata sanjungan emosional yang bias: 'mahakarya'."
    ],
    objectiveModel: "Pasar Gede Hardjonagoro dirancang oleh arsitek Belanda Ir. Thomas Karsten dengan memadukan konstruksi dinding kolonial dan bentuk atap limasan tradisional Jawa.",
    revisionReason: "Kata sanjungan 'mahakarya terindah' diganti dengan data arsip sejarah arsitektur yang valid dan dapat diverifikasi, yaitu nama tokoh perancang resmi (Ir. Thomas Karsten) dan karakteristik perpaduan gaya arsitektur kolonial-Jawa.",
    sampleInputPlaceholder: "Ketik perbaikan kalimat objektif, sebutkan nama arsitek Thomas Karsten dan gaya arsitekturnya..."
  }
];

// Khazanah Istilah Budaya Surakarta untuk Teks LHO
const SOLO_CULTURAL_TERMS = [
  {
    id: "pendopo",
    term: "Pendopo Ageng",
    category: "Arsitektur Tradisional",
    icon: "🏛️",
    brief: "Bangunan terbuka beratap joglo tanpa dinding dengan tiang kayu jati penyangga.",
    definition: "Pendopo Ageng adalah bangunan utama berbentuk joglo berukuran luas tanpa sekat dinding depan yang ditopang oleh tiang kayu saka guru. Di Pura Mangkunegaran, pendopo ini didirikan dengan teknik pasak kayu tradisional tanpa menggunakan paku besi.",
    exampleLHO: "Pendopo Ageng Pura Mangkunegaran memiliki luas sekitar 3.500 meter persegi dan ditopang oleh empat tiang saka guru dari kayu jati utuh."
  },
  {
    id: "canting",
    term: "Canting Tembaga",
    category: "Kriya Tekstil Batik",
    icon: "🪶",
    brief: "Alat kuno dari tembaga dan kayu untuk menorehkan cairan malam panas.",
    definition: "Canting merupakan instrumen perintang warna khas pembatikan di Jawa yang terdiri atas cucuk (cerat kecil tempat keluarnya malam), nyamplung (wadah penampung malam cair), dan gagang kayu.",
    exampleLHO: "Perajin di Kampung Batik Laweyan menorehkan cairan malam panas di atas bentangan kain mori menggunakan canting tembaga berujung runcing."
  },
  {
    id: "kumudawati",
    term: "Motif Kumudawati",
    category: "Ornamen Simbolik",
    icon: "🎨",
    brief: "Lukisan plafon delapan warna mistik khas Jawa penolak marabahaya.",
    definition: "Kumudawati adalah ragam hias lukisan geometris bermotif teratai mekar dengan delapan kombinasi warna di langit-langit Pendopo Ageng Mangkunegaran yang melambangkan penolak mara bahaya dan kedamaian semesta.",
    exampleLHO: "Langit-langit Pendopo Ageng dihiasi ornamen lukisan motif Kumudawati yang memadukan delapan warna simbolik penolak bala."
  },
  {
    id: "limasan",
    term: "Atap Limasan",
    category: "Arsitektur Vernakular",
    icon: "🏠",
    brief: "Bentuk atap tradisional berpucuk empat lereng dengan sirkulasi udara alami.",
    definition: "Bentuk atap rumah tradisional Jawa yang memiliki empat sisi miring (dua trapesium dan dua segitiga), dirancang adaptif terhadap iklim tropis guna mengalirkan air hujan deras dan menjaga suhu ruang tetap sejuk.",
    exampleLHO: "Fasad Pasar Gede Hardjonagoro memadukan dinding bergaya benteng Belanda dengan atap limasan Jawa bertingkat untuk memaksimalkan sirkulasi udara alami."
  },
  {
    id: "sangga-buwana",
    term: "Panggung Sangga Buwana",
    category: "Monumen Bersejarah",
    icon: "🗼",
    brief: "Menara pengawas beratap segi delapan setinggi 30 meter di Keraton Solo.",
    definition: "Menara segi delapan bertingkat empat setinggi 30 meter di kompleks Keraton Kasunanan Surakarta yang didirikan oleh Sunan Pakubuwana III pada tahun 1782 sebagai pos pengawas militer dan tempat meditasi spiritual.",
    exampleLHO: "Di pelataran Sasana Sewaka Keraton Surakarta berdiri menara Panggung Sangga Buwana setinggi 30 meter yang beratap kubah hiasan naga."
  },
  {
    id: "partini-tuin",
    term: "Partini Tuin",
    category: "Lanskap Botani & Air",
    icon: "🌿",
    brief: "Danau resapan buatan dan taman air peninggalan Adipati Mangkunegara VII.",
    definition: "Bagian barat Taman Balekambang yang berfungsi sebagai danau buatan penampung limpasan air dan rekreasi air, dinamai menurut putri sulung Mangkunegara VII yaitu Gusti Raden Ayu Partini.",
    exampleLHO: "Kawasan Partini Tuin di Taman Balekambang berupa danau resapan air seluas lebih dari satu hektar yang dikelilingi pepohonan beringin putih."
  }
];


