import generatedMovieData from "@/data/generated/movies.json";
import type { MovieVoiceData } from "@/data/movie-types";

export type { AiRecommendation, CompactRole, DubbingVersion, FeaturedRole, MovieVoiceData } from "@/data/movie-types";

export const shawshankMovie: MovieVoiceData = {
  slug: "film-pobeg-iz-shoushenka",
  title: "Побег из Шоушенка",
  originalTitle: "The Shawshank Redemption",
  year: 1994,
  country: "США",
  duration: "2 ч 22 мин",
  ageRating: "16+",
  genres: ["драма", "криминал"],
  poster:
    "https://image.tmdb.org/t/p/w500/yvmKPlTIi0xdcFQIFcQKQJcI63W.jpg",
  backdrop:
    "https://image.tmdb.org/t/p/original/pNjh59JSxChQktamG3LMp9ZoQzp.jpg",
  aiRecommendations: [
    {
      title: "Человек-паук: Нет пути домой",
      rating: "7.9",
      poster: "https://image.tmdb.org/t/p/w500/qad0kyRLHG1Qccp2A0YCCUbvhiD.jpg",
      href: "https://kupigolos.ru/film/chelovek-pauk-net-puti-domoj-2021/",
    },
    {
      title: "Мстители",
      rating: "8.1",
      poster: "https://image.tmdb.org/t/p/w500/ztkYgL0zHJLnEPY5VabK9OlmXxx.jpg",
      href: "https://kupigolos.ru/film/mstiteli-2012/",
    },
    {
      title: "Аватар: Пламя и пепел",
      rating: "7.6",
      poster: "https://image.tmdb.org/t/p/w500/kpxYvaCnbRi7btNnpLCJrehy77e.jpg",
      href: "https://kupigolos.ru/film/avatar-plamya-i-pepel-2025/",
    },
    {
      title: "Проект «Конец света»",
      rating: "8.6",
      poster: "https://image.tmdb.org/t/p/w500/jucD9FzLjVsFfBiFcSdoLa6rPOl.jpg",
      href: "https://kupigolos.ru/film/proekt-konec-sveta-2026/",
    },
    {
      title: "Вот это драма!",
      rating: "6.9",
      poster: "https://image.tmdb.org/t/p/w500/mayjUmmXGM1n5E5AJnOfylig10W.jpg",
      href: "https://kupigolos.ru/film/vot-ehto-drama-2026/",
    },
    {
      title: "Побег из Шоушенка",
      rating: "8.7",
      poster: "https://image.tmdb.org/t/p/w500/yvmKPlTIi0xdcFQIFcQKQJcI63W.jpg",
      href: "https://kupigolos.ru/film/pobeg-iz-shoushenka-1994/",
    },
  ],
  synopsis:
    "Бухгалтер Энди Дюфрейн обвинён в убийстве собственной жены и её любовника. Оказавшись в тюрьме Шоушенк, он сталкивается с жестокостью и беззаконием, но сохраняет человечность, надежду и внутреннюю свободу.",
  primaryDubbing: {
    label: "Русский дубляж",
    year: 2018,
    featured: [
      {
        character: "Энди Дюфрейн",
        originalActor: "Тим Роббинс",
        voiceActor: "Диомид Виноградов",
        characterImage:
          "https://image.tmdb.org/t/p/w780/3FfJMIVwXgsIXbAT8ECBSZJAncR.jpg",
        voiceImage:
          "https://img.kupigolos.ru/voice/5ab8f55aabcac.jpg?p=bv&s=c23be7fa1b1757e1d49a90eda2bb4a06",
        characterUrl: "https://kupigolos.ru/kto-ozvuchivaet/ehndi-dyufrejn",
        voiceUrl: "https://kupigolos.ru/diktory/vinogradov-diomid",
        audioUrl: "https://storage.kupigolos.ru/audio/demo/58ca748fe08db.mp3",
        description:
          "Сотрудник банка, обвинённый в убийстве жены и приговорённый к пожизненному заключению, дублирован актёром, «сотрудничавшим» с Джоной Хиллом и П. Дж. Бирном, а также руководившим озвучиванием картины.",
      },
      {
        character: "Эллис Бойд «Рэд» Рэддинг",
        originalActor: "Морган Фримен",
        voiceActor: "Игорь Старосельцев",
        characterImage:
          "https://image.tmdb.org/t/p/w780/905k0RFzH0Kd6gx8oSxRdnr6FL.jpg",
        voiceImage:
          "https://img.kupigolos.ru/voice/65e5e2327ec24.jpeg?p=bv&s=a77153118d0ec61a5d05ad57c85ed459",
        characterUrl: "https://kupigolos.ru/kto-ozvuchivaet/ehllis-bojd-rehd-rehdding",
        voiceUrl: "https://kupigolos.ru/diktory/staroselcev-igor",
        audioUrl: "https://storage.kupigolos.ru/audio/demo/592d35f316a2e.mp3",
        description:
          "Харизматичный артист театра и кино несколько раз дублировал Моргана Фримена в его степенные годы — в дилогии «Иллюзия обмана», фильмах «Падение Олимпа» и «РЭД». Здесь ему досталась роль дружелюбного контрабандиста.",
      },
      {
        character: "Сэмюэл Нортон",
        originalActor: "Боб Гантон",
        voiceActor: "Никита Прозоровский",
        characterImage:
          "https://image.tmdb.org/t/p/w780/ulbVvuBToBN3aCGcV028hwO0MOP.jpg",
        voiceImage:
          "https://img.kupigolos.ru/voice/5ab8ed49a993d.jpg?p=bv&s=34af310d23b4c4b67ac5c7447ac41d14",
        characterUrl: "https://kupigolos.ru/kto-ozvuchivaet/sehmyuehl-norton",
        voiceUrl: "https://kupigolos.ru/diktory/prozorovskij-nikita",
        audioUrl: "https://storage.kupigolos.ru/audio/demo/5f68d02188844.mp3",
        description:
          "Ранее Боб Гантон говорил голосом Никиты Юрьевича в фильмах «Рождённый четвёртого июля» и «Ва-банк». Здесь их общий персонаж — начальник Шоушенка, привлекающий Энди к финансовым махинациям.",
        otherRoles: "Также: судья в 1946 году",
      },
      {
        character: "Хейвуд",
        originalActor: "Уильям Сэдлер",
        voiceActor: "Олег Вирозуб",
        characterImage:
          "https://image.tmdb.org/t/p/w780/rWeb2kjYCA7V9MC9kRwRpm57YoY.jpg",
        voiceImage:
          "https://img.kupigolos.ru/voice/5aba30a8576f9.jpg?p=bv&s=9a51dcc7847f21d7cc5656323bbf21a2",
        characterUrl: "https://kupigolos.ru/kto-ozvuchivaet/hejvud",
        voiceUrl: "https://kupigolos.ru/diktory/virozub-oleg",
        audioUrl: "https://storage.kupigolos.ru/audio/demo/58ecb9b0ed90b.mp3",
        description:
          "У ещё одного товарища Рэда и Энди — голос Леголаса в исполнении Орландо Блума из «Властелина колец» и «Хоббита», Джета Ли в «Ромео должен умереть» и Мэтта Дэймона в «Догме».",
      },
      {
        character: "Байрон Хэдли",
        originalActor: "Клэнси Браун",
        voiceActor: "Василий Дахненко",
        characterImage:
          "https://image.tmdb.org/t/p/w780/1JeBRNG7VS7r64V9lOvej9bZXW5.jpg",
        voiceImage:
          "https://img.kupigolos.ru/voice/65e5e2725dea2.jpeg?p=bv&s=2e194581a3f1e593b17ae280fe6f6b65",
        characterUrl: "https://kupigolos.ru/kto-ozvuchivaet/bajron-hehdli",
        voiceUrl: "https://kupigolos.ru/diktory/dahnenko-vasilij",
        audioUrl: "https://storage.kupigolos.ru/audio/demo/589868dd35ccd.mp3",
        description:
          "Жестокий начальник тюремной охраны приобрёл тембр артиста Малого театра, связанный с кинообразами Бена Аффлека, Джуда Лоу, Кристофа Вальца, Брэдли Купера и Мэттью Макконахи.",
      },
      {
        character: "Томми Уильямс",
        originalActor: "Гил Беллоуз",
        voiceActor: "Иван Чабан",
        characterImage:
          "https://image.tmdb.org/t/p/w780/eCOIv2nSGnWTHdn88NoMyNOKWyR.jpg",
        voiceImage:
          "https://img.kupigolos.ru/voice/5cd9332782430.jpg?p=bv&s=bb418d40b8e9bceb6f02b14c1bc7211b",
        characterUrl: "https://kupigolos.ru/kto-ozvuchivaet/tommi-uilyams",
        voiceUrl: "https://kupigolos.ru/diktory/chaban-ivan",
        audioUrl: "https://storage.kupigolos.ru/audio/demo/5f68ce8320925.mp3",
        description:
          "Молодой вор, которого Энди учит читать и писать, дублирован актёром, покорившим своими интонациями Санкт-Петербург и Москву. Яркий пример — Том Холланд в фильмах и кинокомиксах Marvel.",
      },
      {
        character: "Богз Даймонд",
        originalActor: "Марк Ролстон",
        voiceActor: "Константин Карасик",
        characterImage:
          "https://image.tmdb.org/t/p/w780/hcrNRIptYMRXgkJ9k76BlQu6DQp.jpg",
        voiceImage:
          "https://img.kupigolos.ru/voice/5e7f48d291ed2.jpg?p=bv&s=47af22099996f699994776cf64fc9988",
        characterUrl: "https://kupigolos.ru/kto-ozvuchivaet/bogz-dajmond",
        voiceUrl: "https://kupigolos.ru/kto-ozvuchivaet/aktery-dublyazha/karasik-konstantin",
        audioUrl: "https://storage.kupigolos.ru/audio/demo/5e3bd4b86095d.mp3",
        description:
          "Главаря банды «Сёстры» озвучил характерный артист Театра сатиры, обогативший образы Дэна Фоглера из «Фантастических тварей» и Джокера из Batman: Arkham Asylum.",
        otherRoles: "Также: Нед и Хейг",
      },
      {
        character: "Брукс Хэтлен",
        originalActor: "Джеймс Уитмор",
        voiceActor: "Валерий Сторожик",
        characterImage:
          "https://image.tmdb.org/t/p/w780/nYMAbkfwFIgKK84vnLoQctI6vHg.jpg",
        voiceImage:
          "https://img.kupigolos.ru/voice/5abab0d87d095.jpg?p=bv&s=8301f59be804c38777e3a27283e054e4",
        characterUrl: "https://kupigolos.ru/kto-ozvuchivaet/bruks-hehtlen",
        voiceUrl: "https://kupigolos.ru/diktory/storozhik-valerij",
        audioUrl: "https://storage.kupigolos.ru/audio/demo/5992e85d2c8f5.mp3",
        description:
          "Валерий Степанович, часто снабжавший своими интонациями Тома Хэнкса, Шона Пенна, Джейсона Айзекса и Уиллема Дефо, подарил голос престарелому библиотекарю, пробывшему в Шоушенке 50 лет.",
        otherRoles: "Также: прокурор в 1946 году",
      },
    ],
    secondary: [
      {
        character: "Траут", originalActor: "Пол МакКрейн", voiceActor: "Прохор Чеховской",
        characterImage: "https://image.tmdb.org/t/p/w780/eCOIv2nSGnWTHdn88NoMyNOKWyR.jpg",
        voiceImage: "/images/voices/prohor-chehovskoj.webp",
        voiceUrl: "https://kupigolos.ru/diktory/chehovskoj-prohor",
        audioUrl: "https://storage.kupigolos.ru/audio/demo/5d679a05c26a1.mp3",
      },
      {
        character: "Тайрелл, Дикенс", originalActor: "Мак Майлз и другие", voiceActor: "Максим Шишков",
        characterImage: "/images/stills/ivi-tyrell-snooze-elmo.jpg", characterPosition: "center 25%",
        voiceImage: "/images/voices/maksim-shishkov.webp",
        voiceUrl: "https://kupigolos.ru/kto-ozvuchivaet/aktery-dublyazha/shishkov-maksim",
        audioUrl: "https://storage.kupigolos.ru/audio/demo/5dd41d33c89b7.mp3",
      },
      {
        character: "Джиггер", originalActor: "Нил Джунтоли", voiceActor: "Евгений Рубцов",
        characterImage: "/images/stills/ivi-ned.jpg", characterPosition: "center 22%",
        voiceImage: "/images/voices/evgenij-rubcov.webp",
        voiceUrl: "https://kupigolos.ru/diktory/rubcov-evgenij",
      },
      {
        character: "Эрни, Том Бриггс", originalActor: "Джозеф Раньо и другие", voiceActor: "Андрей Вальц",
        characterImage: "/images/stills/ivi-ernie-haig-judge.jpg", characterPosition: "center 30%",
        voiceImage: "/images/voices/andrej-valc.webp",
        voiceUrl: "https://kupigolos.ru/diktory/valc-andrej",
      },
      {
        character: "Флойд, Снуз, Элмо Блатч", originalActor: "Брайан Либби и другие", voiceActor: "Александр Носков",
        characterImage: "/images/stills/ivi-tyrell-snooze-elmo.jpg", characterPosition: "center 25%",
        voiceImage: "/images/voices/aleksandr-noskov.webp",
        voiceUrl: "https://kupigolos.ru/diktory/noskov-aleksandr",
        audioUrl: "https://storage.kupigolos.ru/audio/demo/6653ab8c95827.mp3",
      },
      {
        character: "Рита Хэйворт, домовладелица", originalActor: "Архивные кадры и Дороти Сильвер", voiceActor: "Яна Смирнова",
        characterImage: "/images/stills/ivi-rita-hayworth.jpg", characterPosition: "center 20%",
        voiceImage: "/images/voices/yana-smirnova.webp",
        voiceUrl: "https://kupigolos.ru/kto-ozvuchivaet/aktery-dublyazha/smirnova-yana",
        audioUrl: "https://storage.kupigolos.ru/audio/demo/61798f7148825.mp3",
      },
    ],
    additionalVoices: [
      { character: "Дополнительные голоса", voiceActor: "Дмитрий Поляновский", voiceUrl: "https://kupigolos.ru/diktory/dmitrij-polyanovskij" },
    ],
  },
  alternativeDubbing: {
    label: "Дубляж IVI",
    year: 2021,
    featuredCount: 8,
    roles: [
      {
        character: "Энди Дюфрейн", originalActor: "Тим Роббинс", voiceActor: "Иван Литвиненко",
        characterImage: "https://image.tmdb.org/t/p/w780/3FfJMIVwXgsIXbAT8ECBSZJAncR.jpg",
        voiceImage: "/images/voices/ivan-litvinenko.webp",
        characterUrl: "https://kupigolos.ru/kto-ozvuchivaet/ehndi-dyufrejn",
        voiceUrl: "https://kupigolos.ru/kto-ozvuchivaet/aktery-dublyazha/litvinenko-ivan",
        audioUrl: "https://storage.kupigolos.ru/audio/demo/598c1890c3225.mp3",
        description: "В версии IVI Энди Дюфрейн говорит голосом Ивана Литвиненко. Сдержанная подача поддерживает спокойствие и внутреннюю стойкость главного героя.",
      },
      {
        character: "Эллис Бойд «Рэд» Рэддинг", originalActor: "Морган Фримен", voiceActor: "Александр Носков",
        characterImage: "https://image.tmdb.org/t/p/w780/905k0RFzH0Kd6gx8oSxRdnr6FL.jpg",
        voiceImage: "/images/voices/aleksandr-noskov.webp",
        characterUrl: "https://kupigolos.ru/kto-ozvuchivaet/ehllis-bojd-rehd-rehdding",
        voiceUrl: "https://kupigolos.ru/diktory/noskov-aleksandr",
        audioUrl: "https://storage.kupigolos.ru/audio/demo/6653ab8c95827.mp3",
        description: "Александр Носков озвучивает Рэда — заключённого, который становится ближайшим другом Энди и рассказчиком этой истории.",
      },
      {
        character: "Сэмюэл Нортон", originalActor: "Боб Гантон", voiceActor: "Юрий Маляров",
        characterImage: "https://image.tmdb.org/t/p/w780/ulbVvuBToBN3aCGcV028hwO0MOP.jpg",
        voiceImage: "/images/voices/yurij-malyarov.webp",
        characterUrl: "https://kupigolos.ru/kto-ozvuchivaet/sehmyuehl-norton",
        voiceUrl: "https://kupigolos.ru/kto-ozvuchivaet/aktery-dublyazha/malyarov-yurij",
        audioUrl: "https://storage.kupigolos.ru/audio/demo/5d9f1ce3e7fa7.mp3",
        description: "Юрий Маляров дублирует Сэмюэла Нортона — властного начальника Шоушенка, скрывающего жестокость за показной набожностью.",
      },
      {
        character: "Хейвуд", originalActor: "Уильям Сэдлер", voiceActor: "Михаил Хрусталёв",
        characterImage: "https://image.tmdb.org/t/p/w780/rWeb2kjYCA7V9MC9kRwRpm57YoY.jpg",
        voiceImage: "/images/voices/mihail-hrustalev.webp",
        characterUrl: "https://kupigolos.ru/kto-ozvuchivaet/hejvud",
        voiceUrl: "https://kupigolos.ru/diktory/hrustalev-mihail",
        audioUrl: "https://storage.kupigolos.ru/audio/demo/5f68cfeb66899.mp3",
        description: "Михаил Хрусталёв подарил голос Хейвуду — одному из товарищей Энди и Рэда, добавляющему живые интонации тюремной компании.",
      },
      {
        character: "Байрон Хэдли", originalActor: "Клэнси Браун", voiceActor: "Денис Некрасов",
        characterImage: "https://image.tmdb.org/t/p/w780/1JeBRNG7VS7r64V9lOvej9bZXW5.jpg",
        voiceImage: "/images/voices/denis-nekrasov.webp",
        characterUrl: "https://kupigolos.ru/kto-ozvuchivaet/bajron-hehdli",
        voiceUrl: "https://kupigolos.ru/diktory/nekrasov-denis",
        audioUrl: "https://storage.kupigolos.ru/audio/demo/598c6dc8a19e3.mp3",
        description: "Денис Некрасов озвучивает Байрона Хэдли — жестокого начальника охраны, чьё присутствие постоянно усиливает напряжение в Шоушенке.",
      },
      {
        character: "Томми Уильямс, Траут", originalActor: "Гил Беллоуз и Пол МакКрейн", voiceActor: "Александр Матвеев",
        characterImage: "https://image.tmdb.org/t/p/w780/eCOIv2nSGnWTHdn88NoMyNOKWyR.jpg",
        voiceImage: "/images/voices/aleksandr-matveev.webp",
        characterUrl: "https://kupigolos.ru/kto-ozvuchivaet/tommi-uilyams",
        voiceUrl: "https://kupigolos.ru/kto-ozvuchivaet/aktery-dublyazha/matveev-aleksandr",
        audioUrl: "https://storage.kupigolos.ru/audio/demo/66c45b55b48df.mp3",
        description: "Александр Матвеев исполняет сразу две роли — молодого заключённого Томми Уильямса и охранника Траута.",
      },
      {
        character: "Богз Даймонд, Флойд, Дикенс", originalActor: "Марк Ролстон и другие", voiceActor: "Дмитрий Поляновский",
        characterImage: "https://image.tmdb.org/t/p/w780/hcrNRIptYMRXgkJ9k76BlQu6DQp.jpg",
        voiceImage: "/images/voices/dmitrij-polyanovskij.webp",
        characterUrl: "https://kupigolos.ru/kto-ozvuchivaet/bogz-dajmond",
        voiceUrl: "https://kupigolos.ru/diktory/dmitrij-polyanovskij",
        audioUrl: "https://storage.kupigolos.ru/audio/demo/59707501ecd0d.mp3",
        description: "Дмитрий Поляновский объединяет в этой версии голоса Богза Даймонда, Флойда и Дикенса — нескольких заметных обитателей Шоушенка.",
      },
      {
        character: "Брукс Хэтлен", originalActor: "Джеймс Уитмор", voiceActor: "Владимир Левашёв",
        characterImage: "https://image.tmdb.org/t/p/w780/nYMAbkfwFIgKK84vnLoQctI6vHg.jpg",
        voiceImage: "/images/voices/vladimir-levashev.webp",
        characterUrl: "https://kupigolos.ru/kto-ozvuchivaet/bruks-hehtlen",
        voiceUrl: "https://kupigolos.ru/kto-ozvuchivaet/aktery-dublyazha/levashev-vladimir",
        audioUrl: "https://storage.kupigolos.ru/audio/demo/5f68cf7ee003f.mp3",
        description: "Владимир Левашёв озвучивает Брукса Хэтлена — пожилого библиотекаря, для которого жизнь за пределами тюрьмы становится главным испытанием.",
      },
      {
        character: "Прокурор в 1946 году", originalActor: "Джеффри ДеМанн", voiceActor: "Александр Коврижных",
        characterImage: "https://image.tmdb.org/t/p/w780/70bkLdlkBB7x2NztuJAh4pjdyxy.jpg",
        voiceImage: "/images/voices/aleksandr-kovrizhnyh.webp",
        voiceUrl: "https://kupigolos.ru/diktory/kovrizhnyh-aleksandr",
        audioUrl: "https://storage.kupigolos.ru/audio/demo/6672e8bf26e69.mp3",
      },
      {
        character: "Эрни, Хейг, судья", originalActor: "Джозеф Раньо, Дион Андерсон и Джон Хортон", voiceActor: "Олег Куценко",
        characterImage: "/images/stills/ivi-ernie-haig-judge.jpg",
        characterPosition: "center 30%",
        voiceImage: "/images/voices/oleg-kucenko.webp",
        voiceUrl: "https://kupigolos.ru/diktory/kucenko-oleg",
      },
      {
        character: "Нед", originalActor: "Эпизодическая роль", voiceActor: "Алексей Войтюк",
        characterImage: "/images/stills/ivi-ned.jpg",
        characterPosition: "center 22%",
        voiceImage: "/images/voices/aleksej-vojtyuk.webp",
        voiceUrl: "https://kupigolos.ru/diktory/vojtyuk-aleksej",
        audioUrl: "https://storage.kupigolos.ru/audio/demo/5dfce5b749b76.mp3",
      },
      {
        character: "Тайрелл, Снуз, Элмо Блатч", originalActor: "Мак Майлз, Дэвид Провэл и Билл Болендер", voiceActor: "Андрей Бархударов",
        characterImage: "/images/stills/ivi-tyrell-snooze-elmo.jpg",
        characterPosition: "center 25%",
        voiceImage: "/images/voices/andrej-barhudarov.webp",
        voiceUrl: "https://kupigolos.ru/diktory/barhudarov-andrej",
        audioUrl: "https://storage.kupigolos.ru/audio/demo/5f68ca9a5d41c.mp3",
      },
      {
        character: "Рита Хэйворт", originalActor: "Архивные кадры", voiceActor: "Ирина Киреева",
        characterImage: "/images/stills/ivi-rita-hayworth.jpg",
        characterPosition: "center 20%",
        voiceImage: "/images/voices/irina-kireeva.webp",
        voiceUrl: "https://kupigolos.ru/diktory/kireeva-irina",
        audioUrl: "https://storage.kupigolos.ru/audio/demo/5f68cedff3de8.mp3",
      },
      {
        character: "Домовладелица в 1954 году", originalActor: "Дороти Сильвер", voiceActor: "Ева Финкельштейн",
        characterImage: "/images/stills/ivi-landlady-1954.jpg",
        characterPosition: "center 28%",
        voiceImage: "/images/voices/eva-finkelshtejn.webp",
        voiceUrl: "https://kupigolos.ru/kto-ozvuchivaet/aktery-dublyazha/finkelshtejn-eva",
        audioUrl: "https://storage.kupigolos.ru/audio/demo/6179845394a1a.mp3",
      },
    ],
  },
};

const generatedMovies = generatedMovieData as MovieVoiceData[];
const movies: Record<string, MovieVoiceData> = Object.fromEntries(generatedMovies.map((movie) => [movie.slug, movie]));
movies[shawshankMovie.slug] = shawshankMovie;

export function getMovieBySlug(slug: string) {
  return movies[slug];
}

export function getAllMovieSlugs() {
  return Object.keys(movies);
}
