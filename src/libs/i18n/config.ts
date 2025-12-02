// src/i18n/config.ts
export const languages = {
  en: 'English',
  vi: 'Tiếng Việt',
  // es: 'Español',
  // fr: 'Français',
  // de: 'Deutsch',
  // ja: '日本語',
  // zh: '中文',
} as const;

export type Language = keyof typeof languages;

export const defaultLang: Language = 'en';

export const ui = {
  en: {
    'logo.slogan': 'Journey of Experience',
    'nav.home': 'Home',
    'nav.stories': 'Stories',
    'nav.destinations': 'Destinations',
    'nav.about': 'About',
    'nav.contact': 'Contact',
    'hero.title': 'Travel Stories',
    'hero.subtitle':
      'Exploring the world one story at a time. Join me on adventures across continents, through hidden gems, and into the heart of different cultures.',
    'hero.search': 'Search destinations, stories...',
    'hero.allDestinations': 'All Destinations',
    'stats.countries': 'Countries',
    'stats.destinations': 'Destinations',
    'stats.stories': 'Stories',
    'featured.title': 'Featured Adventures',
    'featured.subtitle':
      'Dive into my most memorable journeys and discover the stories that shaped my travels.',
    'recent.title': 'Recent Adventures',
    'recent.subtitle': 'Fresh stories from the road, still warm with wanderlust.',
    'filter.latest': 'Latest',
    'filter.popular': 'Popular',
    'filter.photos': 'Photos',
    'load.more': 'Discover More Adventures',
    'newsletter.title': 'Join the Journey',
    'newsletter.subtitle':
      'Get travel stories, tips, and inspiration delivered to your inbox. Plus, exclusive behind-the-scenes content from my adventures.',
    'newsletter.email': 'your.email@example.com',
    'newsletter.button': 'Start Exploring',
    'newsletter.note': '✈️ No spam, just stories. Unsubscribe anytime.',
    'post.published': 'Published',
    'post.readingTime': 'min',
    'post.chapters': 'Story Chapters',
    'post.mobileChapters': 'Story Outline',
    'post.tripDetails': 'Trip Details',
    'post.destinations': 'Destinations',
    'post.destinations.more': 'more',
    'post.duration': 'Duration',
    'post.when': 'When',
    'post.budget': 'Budget',
    'post.gallery': 'Journey Gallery',
    'post.map': 'Where This Story Happened',
    'post.share': 'Share This Adventure',
    'post.readingProgress': 'Reading Progress',
    'post.relatedTitle': 'More Adventures',
    'post.newsletter': 'Join My Journey',
    'post.newsletterText': 'Get travel stories and tips straight to your inbox.',
    'post.travelTip': 'Travel Tip',
    'post.about': 'About the Traveler',
    'post.aboutDescription':
      "Hey there! I'm a passionate traveler who believes that every journey has a story worth telling. Through my adventures across 50+ countries, I've learned that travel is not just about the destinations, but about the moments, people, and experiences that transform us along the way.",
    'post.myStory': 'My Story',
    'post.letsChat': "Let's Chat",
    'related.exploreAll': 'Explore All Stories',
    'footer.subtitle':
      'Join me as I explore the world one story at a time. From hidden gems to iconic destinations, I share the real, raw, and transformative moments that make travel unforgettable.',
    'footer.tagline': 'Made with ❤️ for fellow travelers.',
    'footer.destinations': 'Destinations',
    'footer.resources': 'Resources',
    'footer.travelTips': 'Travel Tips',
    'footer.gearGuide': 'Gear Guide',
    'footer.tripPlanning': 'Trip Planning',
    'footer.rssFeed': 'RSS Feed',
    'footer.newsletter': 'Newsletter',
    'footer.privacy': 'Privacy Policy',
    'footer.terms': 'Terms of Service',
    'footer.sitemap': 'Sitemap',
    'footer.countriesExplored': 'Countries Explored',
    'footer.citiesVisited': 'Cities Visited',
    'footer.storiesShared': 'Stories Shared',
    'tripType.solo': 'Solo Travel',
    'tripType.family': 'Family Trip',
    'tripType.adventure': 'Adventure',
    'tripType.backpacking': 'Backpacking',
    'tripType.luxury': 'Luxury',
    'tripType.business': 'Business',
    'tripType.roadTrip': 'Road Trip',
    'tripType.cityBreak': 'City Break',
    'tripType.nature': 'Nature & Wildlife',
    'tripType.cultural': 'Cultural',
    'tripType.food': 'Food & Culinary',
    'tripType.photography': 'Photography',
    'budget.budget': 'Budget',
    'budget.midRange': 'Mid-Range',
    'budget.luxury': 'Luxury',
    'budget.backpacker': 'Backpacker',
    'breadcrumb.home': 'Home',
    'breadcrumb.travelStory': 'Travel Stories',
    'breadcrumb.story': 'Story',
    // 404 Page translations
    '404.title': '404 - Page Not Found | Wanderlust Chronicles',
    '404.description':
      "Oops! Looks like this page got lost on the journey. Let's get you back on track.",
    '404.location': 'Location Unknown',
    '404.heading': "Oops! You've Wandered Off the Map",
    '404.message':
      'Looks like this page took a detour to an undiscovered destination. Even the best travelers get lost sometimes! 🗺️',
    '404.homeButton': 'Back to Home Base',
    '404.storiesButton': 'Explore Travel Stories',
    '404.searchPlaceholder': 'Search for destinations, stories, or adventures...',
    '404.suggestedPosts': 'Lost? Try These Adventures Instead',
    '404.factTitle': 'Did You Know?',
    '404.fact':
      "Getting lost while traveling can lead to the best discoveries! Some of the world's most famous attractions were found by travelers who took a wrong turn. 🗺️✨",
    '404.exploreByCategory': 'Or explore by category:',
  },
  vi: {
    'logo.slogan': 'Hành trình trải nghiệm',
    'nav.home': 'Trang chủ',
    'nav.stories': 'Câu chuyện',
    'nav.destinations': 'Điểm đến',
    'nav.about': 'Giới thiệu',
    'nav.contact': 'Liên hệ',
    'hero.title': 'Câu Chuyện Du Lịch',
    'hero.subtitle':
      'Khám phá thế giới qua từng câu chuyện. Cùng tôi trải nghiệm những cuộc phiêu lưu xuyên lục địa, những viên ngọc ẩn giấu, và trái tim của các nền văn hóa khác nhau.',
    'hero.search': 'Tìm kiếm điểm đến, câu chuyện...',
    'hero.allDestinations': 'Tất cả điểm đến',
    'stats.countries': 'Quốc gia',
    'stats.destinations': 'Điểm đến',
    'stats.stories': 'Câu chuyện',
    'featured.title': 'Cuộc Phiêu Lưu Nổi Bật',
    'featured.subtitle':
      'Khám phá những hành trình đáng nhớ nhất và những câu chuyện định hình chuyến đi của tôi.',
    'recent.title': 'Phiêu Lưu Gần Đây',
    'recent.subtitle':
      'Những câu chuyện mới từ cuộc hành trình, vẫn còn ấm áp với khao khát du lịch.',
    'filter.latest': 'Mới nhất',
    'filter.popular': 'Phổ biến',
    'filter.photos': 'Hình ảnh',
    'load.more': 'Khám Phá Thêm',
    'newsletter.title': 'Cùng Tham Gia Hành Trình',
    'newsletter.subtitle':
      'Nhận câu chuyện du lịch, mẹo và nguồn cảm hứng gửi đến hộp thư của bạn. Cộng thêm nội dung hậu trường độc quyền từ các cuộc phiêu lưu của tôi.',
    'newsletter.email': 'email.cua.ban@example.com',
    'newsletter.button': 'Bắt Đầu Khám Phá',
    'newsletter.note': '✈️ Không spam, chỉ có câu chuyện. Hủy đăng ký bất cứ lúc nào.',
    'post.published': 'Xuất bản',
    'post.readingTime': 'phút',
    'post.chapters': 'Chương Câu Chuyện',
    'post.mobileChapters': 'Cốt truyện',
    'post.tripDetails': 'Chi Tiết Chuyến Đi',
    'post.destinations': 'Điểm đến',
    'post.destinations.more': 'địa điểm nữa',
    'post.duration': 'Thời lượng',
    'post.when': 'Khi nào',
    'post.budget': 'Ngân sách',
    'post.gallery': 'Thư Viện Hành Trình',
    'post.map': 'Nơi Câu Chuyện Này Diễn Ra',
    'post.share': 'Chia Sẻ Cuộc Phiêu Lưu',
    'post.readingProgress': 'Tiến Độ Đọc',
    'post.relatedTitle': 'Thêm Cuộc Phiêu Lưu',
    'post.newsletter': 'Tham Gia Hành Trình',
    'post.newsletterText': 'Nhận câu chuyện du lịch và mẹo gửi thẳng đến hộp thư.',
    'post.travelTip': 'Mẹo Du Lịch',
    'post.about': 'Về Người Du Lịch',
    'post.aboutDescription':
      'Xin chào! Tôi là một người đam mê du lịch, tin rằng mỗi hành trình đều có một câu chuyện đáng để kể. Qua những chuyến phiêu lưu của mình qua hơn 50 quốc gia, tôi đã nhận ra rằng du lịch không chỉ là về những điểm đến, mà còn là về những khoảnh khắc, con người và trải nghiệm làm thay đổi chúng ta trên hành trình.',
    'post.myStory': 'Câu Chuyện Của Tôi',
    'post.letsChat': 'Cùng Trò Chuyện',
    'related.exploreAll': 'Khám Phá Tất Cả',
    'footer.subtitle':
      'Hãy cùng tôi khám phá thế giới qua từng câu chuyện. Từ những điểm đến bí ẩn đến những địa danh nổi tiếng, tôi chia sẻ những khoảnh khắc chân thực, nguyên bản và đầy cảm hứng, khiến mỗi chuyến đi trở nên khó quên.',
    'footer.tagline': 'Được tạo với ❤️ cho những người yêu du lịch.',
    'footer.destinations': 'Điểm Đến',
    'footer.resources': 'Tài Nguyên',
    'footer.travelTips': 'Mẹo Du Lịch',
    'footer.gearGuide': 'Hướng Dẫn Trang Bị',
    'footer.tripPlanning': 'Lên Kế Hoạch',
    'footer.rssFeed': 'Kênh RSS',
    'footer.newsletter': 'Bản Tin',
    'footer.privacy': 'Chính Sách Riêng Tư',
    'footer.terms': 'Điều Khoản Dịch Vụ',
    'footer.sitemap': 'Sơ Đồ Trang',
    'footer.countriesExplored': 'Quốc Gia Đã Khám Phá',
    'footer.citiesVisited': 'Thành Phố Đã Ghé Thăm',
    'footer.storiesShared': 'Câu Chuyện Đã Chia Sẻ',
    'tripType.solo': 'Du lịch một mình',
    'tripType.family': 'Du lịch gia đình',
    'tripType.adventure': 'Phiêu lưu',
    'tripType.backpacking': 'Phượt',
    'tripType.luxury': 'Sang trọng',
    'tripType.business': 'Công tác',
    'tripType.roadTrip': 'Du lịch đường dài',
    'tripType.cityBreak': 'Nghỉ cuối tuần',
    'tripType.nature': 'Thiên nhiên',
    'tripType.cultural': 'Văn hóa',
    'tripType.food': 'Ẩm thực',
    'tripType.photography': 'Nhiếp ảnh',
    'budget.budget': 'Tiết kiệm',
    'budget.midRange': 'Trung bình',
    'budget.luxury': 'Sang trọng',
    'budget.backpacker': 'Phượt thủ',
    'breadcrumb.home': 'Trang chủ',
    'breadcrumb.travelStory': 'Câu chuyện du lịch',
    'breadcrumb.story': 'Câu chuyện',
    // 404 Page translations
    '404.title': '404 - Không Tìm Thấy Trang | Wanderlust Chronicles',
    '404.description':
      'Ối! Có vẻ như trang này đã bị lạc trong hành trình. Hãy để chúng tôi đưa bạn trở lại đúng hướng.',
    '404.location': 'Vị Trí Không Xác Định',
    '404.heading': 'Ối! Bạn Đã Đi Lạc Khỏi Bản Đồ',
    '404.message':
      'Có vẻ như trang này đã đi đường vòng đến một điểm đến chưa được khám phá. Ngay cả những du khách giỏi nhất cũng thỉnh thoảng bị lạc đường! 🗺️',
    '404.homeButton': 'Về Trang Chủ',
    '404.storiesButton': 'Khám Phá Câu Chuyện',
    '404.searchPlaceholder': 'Tìm kiếm điểm đến, câu chuyện, hoặc phiêu lưu...',
    '404.suggestedPosts': 'Lạc Đường? Thử Những Cuộc Phiêu Lưu Này',
    '404.factTitle': 'Bạn Có Biết?',
    '404.fact':
      'Đi lạc khi du lịch có thể dẫn đến những khám phá tuyệt vời nhất! Một số điểm tham quan nổi tiếng nhất thế giới được tìm thấy bởi những du khách đi sai đường. 🗺️✨',
    '404.exploreByCategory': 'Hoặc khám phá theo danh mục:',
  },
  // es: {
  //   'nav.home': 'Inicio',
  //   'nav.stories': 'Historias',
  //   'nav.destinations': 'Destinos',
  //   'nav.about': 'Acerca de',
  //   'nav.contact': 'Contacto',
  //   'hero.title': 'Historias de Viaje',
  //   'hero.subtitle':
  //     'Explorando el mundo una historia a la vez. Únete a mí en aventuras a través de continentes, por joyas ocultas y en el corazón de diferentes culturas.',
  //   'hero.search': 'Buscar destinos, historias...',
  //   'hero.allDestinations': 'Todos los Destinos',
  //   'stats.countries': 'Países',
  //   'stats.destinations': 'Destinos',
  //   'stats.stories': 'Historias',
  //   'featured.title': 'Aventuras Destacadas',
  //   'featured.subtitle':
  //     'Sumérgete en mis viajes más memorables y descubre las historias que dieron forma a mis viajes.',
  //   'recent.title': 'Aventuras Recientes',
  //   'recent.subtitle': 'Historias frescas del camino, todavía cálidas con pasión por viajar.',
  //   'filter.latest': 'Recientes',
  //   'filter.popular': 'Populares',
  //   'filter.photos': 'Fotos',
  //   'load.more': 'Descubre Más Aventuras',
  //   'newsletter.title': 'Únete al Viaje',
  //   'newsletter.subtitle':
  //     'Recibe historias de viajes, consejos e inspiración en tu bandeja de entrada. Además, contenido exclusivo detrás de escenas de mis aventuras.',
  //   'newsletter.email': 'tu.correo@example.com',
  //   'newsletter.button': 'Comenzar a Explorar',
  //   'newsletter.note': '✈️ Sin spam, solo historias. Cancela en cualquier momento.',
  //   'post.published': 'Publicado',
  //   'post.readingTime': 'min de lectura',
  //   'post.chapters': 'Capítulos de la Historia',
  //   'post.tripDetails': 'Detalles del Viaje',
  //   'post.destinations': 'Destinos',
  //   'post.duration': 'Duración',
  //   'post.when': 'Cuándo',
  //   'post.budget': 'Presupuesto',
  //   'post.gallery': 'Galería del Viaje',
  //   'post.map': 'Donde Sucedió Esta Historia',
  //   'post.share': 'Comparte Esta Aventura',
  //   'post.readingProgress': 'Progreso de Lectura',
  //   'post.relatedTitle': 'Más Aventuras',
  //   'post.newsletter': 'Únete a Mi Viaje',
  //   'post.newsletterText': 'Recibe historias y consejos de viaje directo a tu correo.',
  //   'post.travelTip': 'Consejo de Viaje',
  //   'post.about': 'Sobre el Viajero',
  //   'post.myStory': 'Mi Historia',
  //   'post.letsChat': 'Charlemos',
  //   'related.exploreAll': 'Explorar Todas las Historias',
  //   'footer.tagline': 'Hecho con ❤️ para compañeros viajeros.',
  //   'footer.destinations': 'Destinos',
  //   'footer.resources': 'Recursos',
  //   'footer.travelTips': 'Consejos de Viaje',
  //   'footer.gearGuide': 'Guía de Equipo',
  //   'footer.tripPlanning': 'Planificación',
  //   'footer.newsletter': 'Boletín',
  //   'footer.privacy': 'Política de Privacidad',
  //   'footer.terms': 'Términos de Servicio',
  //   'footer.sitemap': 'Mapa del Sitio',
  //   'footer.countriesExplored': 'Países Explorados',
  //   'footer.citiesVisited': 'Ciudades Visitadas',
  //   'footer.storiesShared': 'Historias Compartidas',
  //   'tripType.solo': 'Viaje en solitario',
  //   'tripType.family': 'Viaje familiar',
  //   'tripType.adventure': 'Aventura',
  //   'tripType.backpacking': 'Mochilero',
  //   'tripType.luxury': 'Lujo',
  //   'tripType.business': 'Negocios',
  //   'tripType.roadTrip': 'Viaje por carretera',
  //   'tripType.cityBreak': 'Escapada urbana',
  //   'tripType.nature': 'Naturaleza',
  //   'tripType.cultural': 'Cultural',
  //   'tripType.food': 'Gastronómico',
  //   'tripType.photography': 'Fotografía',
  //   'budget.budget': 'Económico',
  //   'budget.midRange': 'Medio',
  //   'budget.luxury': 'Lujo',
  //   'budget.backpacker': 'Mochilero',
  //   'breadcrumb.home': 'Trang chủ',
  //   'breadcrumb.travelStory': 'Câu chuyện du lịch',
  //   'breadcrumb.story': 'Câu chuyện',
  // },
} as const;

// Helper function to get translation
export function useTranslations(lang: Language) {
  return function t(key: keyof (typeof ui)[typeof defaultLang]) {
    return ui[lang][key] || ui[defaultLang][key];
  };
}

// Helper to get localized path
export function getLocalizedPath(path: string, lang: Language): string {
  if (lang === defaultLang) return path;
  return `/${lang}${path.endsWith('/') ? path.substring(0, -1) : path}`;
}

// Helper to extract language from URL
export function getLangFromUrl(url: URL): Language {
  const [, lang] = url.pathname.split('/');
  if (lang in languages) return lang as Language;
  return defaultLang;
}

// Helper to remove language prefix from path
export function removeLanguagePrefix(path: string): string {
  const segments = path.split('/').filter(Boolean);
  if (segments[0] && segments[0] in languages) {
    segments.shift();
  }
  return '/' + segments.join('/');
}

export function convertDateToLanguageFormat(date: Date, language: Language) {
  let locale = 'en-US';

  switch (language) {
    case 'en':
      break;
    case 'vi':
      locale = 'vi';
      break;
    default:
      break;
  }

  return date.toLocaleDateString(locale, {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}
