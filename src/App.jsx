import React, { useState, useEffect } from 'react';
import { 
  Wallet, Users, Zap, ArrowRight, Check, Box, Plus, 
  RefreshCcw, Ticket, Star, ShieldCheck, Fingerprint, 
  QrCode as QrIcon, Sparkles, Ruler, Database, Search, 
  Copy, Loader2, ArrowLeft, Mail, Globe, Tag, Send, 
  Smartphone, TrendingUp, Briefcase, ExternalLink,
  Layers, Cpu, Target, Heart, Share2, Maximize, Eye,
  Activity, BoxSelect, Scan, X, Info, ChevronRight, ShoppingCart,
  Lock, ArrowUpRight, BarChart3, Building2, UserCircle2, Terminal,
  Shield, Code, Link as LinkIcon, Command, User, MousePointer2,
  ShieldAlert
} from 'lucide-react';

// --- БЛОК ТЕКСТОВ (ПЕРЕВОДЫ) ---
const translations = {
  RU: {
    nav: { widget: 'Виджет', crm: 'CRM', loyalty: 'Лояльность', fitting: 'Примерка', rates: 'Тарифы', connect: 'Бета-тест' },
    marquee: { phase: 'Фаза 01 Бета запущена', commission: 'Нулевая комиссия платформы', trial: '30 дней бесплатного доступа' },
    hero: { title1: 'FASHION', title2: 'RETAIL', title3: 'OS.', cta: 'Подать заявку' },
    gateway: { tag: 'Доступно сейчас (Фаза 01)', title: 'TON GATEWAY.', desc: 'Прямой эквайринг в ', highlight: 'USDT (TON)', sub: 'без посредников и с нулевой комиссией.' },
    widget: { 
        tag: 'Доступно сейчас (Фаза 01)', title: 'SMART WIDGET.', 
        desc: 'Бесшовная альтернатива банковскому эквайрингу для вашего бренда. Принимайте платежи со всего мира с нулевой комиссией платформы — без редиректов и лишних шагов.', 
        f1: 'Native UI', f1_desc: 'Бесшовный чекаут в 1 клик', f2: 'Cross-Wallet', f2_desc: 'Все кошельки TON',
        hint: 'ИНТЕРАКТИВНАЯ ДЕМО-ВЕРСИЯ. ОПРОБУЙТЕ ФУНКЦИОНАЛ'
    },
    payment: { 
        pay: "К оплате", awaiting: "Ожидание транзакции", initializing: "Инициализация шлюза...",
        connecting: "Подключение к сети TON", error: "Ошибка оплаты", timeout: "Время сессии истекло",
        alreadyPaid: "Я уже оплатил", retry: "Повторить попытку", success: "Оплата принята!",
        confirmed: "Транзакция успешно подтверждена", amount: "Сумма заказа", orderId: "ID Заказа",
        due: "К перечислению", address: "Адрес кошелька", copied: "СКОПИРОВАНО!",
        tapToCopy: "Нажми для копирования", openWallet: "Открыть кошелек", needHelp: "Нужна помощь с оплатой?",
        support: "Техподдержка", tonNetwork: "TON Network", close: "Закрыть окно"
    },
    crm: { 
        tag: 'Доступно сейчас (Фаза 01)', title: 'WALLETS DATA.', 
        desc: 'Глубокая on-chain аналитика для сегментации вашей аудитории. Раскройте потенциал анонимных пользователей на основе балансов кошельков, истории транзакций и сетевой активности.', 
        f1: 'Profiling', f1_desc: 'Авто-скоринг', f2: 'Growth', f2_desc: 'Удержание через данные', 
        feed: 'ПОТОК_ДАННЫХ_THYSS', scanned: 'Профиль отсканирован' 
    },
    loyalty: { 
        tag: 'Ожидается (Фаза 02)', title: 'NFT GIFTS.', 
        desc: 'Поощряйте своих клиентов цифровыми активами. Используйте потенциал NFT для масштабирования эксклюзивности и премиальности бренда.', 
        f1: 'Loyalty 2.0', f1_desc: 'NFT как ключ к привилегиям', f2: 'Viral Growth', f2_desc: 'Цифровое владение' 
    },
    mint: { 
      progress: 'МИНТИНГ_В_ПРОЦЕССЕ...', sent: 'ЛОЯЛЬНОСТЬ_ОТПРАВЛЕНА', idle: 'ЛОЯЛЬНОСТЬ_ID_МИНТ', 
      reward_sent: 'Награда отправлена', desc: 'Добавлено в кошелек клиента', 
      button: 'Отправить NFT награду', another: 'Минтить еще',
      steps: ['Инициализация протокола...', 'Генерация метаданных...', 'Запись в блокчейн TON...', 'Подтверждение владения...']
    },
    fitting: { 
        tag: 'Ожидается (Фаза 03)', title: '3D FIT.', 
        desc: 'Мы трансформировали сложный процесс примерки в стильный визуальный аттракцион с интерактивным маскотом. Thyss делает акцент на эмоциональном вовлечении и скорости.', 
        f1: 'AI-Precision', f1_desc: 'Безошибочный подбор размера', f2: 'Loyalty Boost', f2_desc: 'Геймификация, влюбляющая в бренд',
        match: 'Совпадение', recalc: 'Подобрать размер', scanning: 'АНАЛИЗ_ПАРАМЕТРОВ...'
    },
    pricing: { 
      title: 'Pricing Modules.', monthly: 'Месяц', annual: 'Год', off: '20% Скидка', 
      starter: 'Starter', business: 'Business', enterprise: 'Enterprise', 
      choose: 'Выбрать', contact: 'Связаться', 
      sub1: 'Для новых брендов', sub2: 'Для активных продаж', sub3: 'Для крупных сетей',
      currency: '₽', businessPrice: 6000, perMonth: '/мес',
      popular: 'ЛУЧШИЙ ВЫБОР', betaFree: 'BETA: 30 ДНЕЙ БЕСПЛАТНО',
      features: {
        starter: ["0% комиссия платформы", "Газ оплачивает бренд", "5 транзакций / мес", "Платежи в USDT (TON)", "Стандартный виджет"],
        business: ["0% комиссия платформы", "Газ оплачивает бренд", "100 транзакций / мес", "Платежи в USDT (TON)", "Whitelabel модуль", "Intelligence CRM", "NFT Gifts (Скоро)", "3D FIT (Скоро)", "Техническая поддержка"],
        enterprise: ["0% комиссия платформы", "Газ оплачивает THYSS", "Безлимит транзакций", "Whitelabel модуль", "Персонализация виджета", "Intelligence CRM Pro", "NFT подарки", "Приоритетная поддержка", "3D Fit (Скоро)"]
      }
    },
    footer: { desc: 'Merchant OS для fashion брендов. ', sub: 'Инфраструктура Web3 e-commerce.', support: 'Поддержка', social: 'Соцсети' },
    notFound: { denied: 'ДОСТУП_ЗАПРЕЩЕН', error: 'ОШИБКА: Страница в разработке', emergency: 'Экстренная связь', sub: 'Страница в разработке. Сканируйте для связи.', back: 'Вернуться в ядро' },
    beta: { 
      title: 'Join the Core', back: 'Назад к ядру', submit: 'Подтвердить заявку', success: 'Доступ предоставлен', 
      brand: 'Бренд', site: 'Сайт', tg: 'Telegram', name: 'Ваше имя', volume: 'Месячный оборот',
      perks: ['Эквайринг в USDT с 0% комиссией', 'on-chain аналитика клиентов', '30 дней полного доступа', 'Персональное сопровождение'],
      placeholders: { brand: 'Напр. Shutterfeel', site: 'shutterfeel.com', tg: '@username', name: 'Как к вам обращаться?' }
    }
  },
  EN: {
    nav: { widget: 'Widget', crm: 'CRM', loyalty: 'Loyalty', fitting: 'Fitting', rates: 'Pricing', connect: 'Beta Access' },
    marquee: { phase: 'Phase 01 Beta is Live', commission: 'Zero Platform Commission', trial: '30-Day Free Trial' },
    hero: { title1: 'FASHION', title2: 'RETAIL', title3: 'OS.', cta: 'Apply for Beta' },
    gateway: { tag: 'Available now (Phase 01)', title: 'TON GATEWAY.', desc: 'Direct acquiring in ', highlight: 'USDT (TON)', sub: 'without intermediaries and with zero fees.' },
    widget: { 
        tag: 'Available now (Phase 01)', title: 'SMART WIDGET.', 
        desc: 'A seamless alternative to traditional acquiring for your brand. Accept global payments with zero platform fees directly on your site—no redirects, no friction.', 
        f1: 'Native UI', f1_desc: 'Seamless 1-click checkout', f2: 'Cross-Wallet', f2_desc: 'All TON Wallets support',
        hint: 'INTERACTIVE DEMO. TRY FUNCTIONALITY'
    },
    payment: { 
        pay: "Pay", awaiting: "Awaiting Transaction", initializing: "Initializing Gateway...",
        connecting: "Connecting to TON Network", error: "Payment Error", timeout: "Session Expired",
        alreadyPaid: "I Already Paid", retry: "Retry Payment", success: "Payment Received!",
        confirmed: "Transaction successfully confirmed", amount: "Order Amount", orderId: "Order ID",
        due: "Total Due", address: "Wallet Address", copied: "COPIED!",
        tapToCopy: "Tap to copy", openWallet: "Open Wallet", needHelp: "Need help with payment?",
        support: "Support", tonNetwork: "TON Network", close: "Close Window"
    },
    crm: { 
        tag: 'Available now (Phase 01)', title: 'WALLETS DATA.', 
        desc: 'Deep on-chain analytics for audience segmentation. Unlock the potential of anonymous users based on wallet balances, transaction history, and network activity.', 
        f1: 'Profiling', f1_desc: 'Auto scoring', f2: 'Growth', f2_desc: 'Data-driven retention', 
        feed: 'THYSS_DATA_FEED', scanned: 'Profile Scanned' 
    },
    loyalty: { 
        tag: 'Coming Phase 02', title: 'NFT GIFTS.', 
        desc: 'Reward your clients with digital assets. Leverage the power of NFT to scale exclusivity and brand premiumness — the mechanics are limited only by your imagination.', 
        f1: 'Loyalty 2.0', f1_desc: 'NFT as utility key', f2: 'Viral Growth', f2_desc: 'Digital ownership' 
    },
    mint: { 
      progress: 'MINTING_IN_PROGRESS...', sent: 'LOYALTY_SENT', idle: 'LOYALTY_ID_MINT', 
      reward_sent: 'Reward Sent', desc: 'Added to customer wallet', 
      button: 'Send NFT Reward', another: 'Mint Another',
      steps: ['Initializing protocol...', 'Generating metadata...', 'Writing to TON blockchain...', 'Confirming ownership...']
    },
    fitting: { 
        tag: 'Coming Phase 03', title: '3D FIT.', 
        desc: 'We’ve transformed the tedious fitting process into a stylish visual attraction with an interactive mascot. Thyss focuses on emotional engagement and speed.', 
        f1: 'AI-Precision', f1_desc: 'Flawless size matching', f2: 'Loyalty Boost', f2_desc: 'Gamification that builds brand love',
        match: 'Match', recalc: 'Find My Size', scanning: 'ANALYZING_PARAMS...'
    },
    pricing: { 
      title: 'Pricing Modules.', monthly: 'Monthly', annual: 'Annual', off: '20% Off', 
      starter: 'Starter', business: 'Business', enterprise: 'Enterprise', 
      choose: 'Choose', contact: 'Contact', 
      sub1: 'For emerging brands', sub2: 'For high-volume sales', sub3: 'For retail chains',
      currency: '$', businessPrice: 80, perMonth: '/mo',
      popular: 'BEST CHOICE', betaFree: 'BETA: 30 DAYS FREE',
      features: {
        starter: ["0% platform commission", "Gas fees paid by brand", "5 transactions / mo", "USDT (TON) payments", "Standard Widget"],
        business: ["0% platform commission", "Gas fees paid by brand", "100 transactions / mo", "USDT (TON) payments", "Whitelabel Widget", "Intelligence CRM", "NFT Gifts (Soon)", "3D FIT (Soon)", "Technical Support"],
        enterprise: ["0% platform commission", "Gas fees paid by THYSS", "Unlimited transactions", "Whitelabel Widget", "Personalization", "Intelligence CRM Pro", "NFT Gifts", "Priority 24/7 Support", "3D Fit (Soon)"]
      }
    },
    footer: { desc: 'Merchant OS for fashion brands. ', sub: 'Web3 e-commerce infrastructure.', support: 'Support', social: 'Social' },
    notFound: { denied: 'ACCESS_DENIED', error: 'ERROR: Under Development', emergency: 'Emergency Link', sub: 'Page under development. Scan to contact.', back: 'Back to Core' },
    beta: { 
      title: 'Join the Core', back: 'Back to Core', submit: 'Confirm Access', success: 'Access Granted', 
      brand: 'Brand', site: 'Website', tg: 'Telegram', name: 'Your Name', volume: 'Monthly Volume',
      perks: ['USDT acquiring with 0% commission', 'on-chain crypto-customer analytics', '30 days of full access', 'Personal support and priority updates'],
      placeholders: { brand: 'e.g. Shutterfeel', site: 'shutterfeel.com', tg: '@username', name: 'What should we call you?' }
    }
  },
  ES: {
    nav: { widget: 'Widget', crm: 'CRM', loyalty: 'Lealtad', fitting: 'Probador', rates: 'Tarifas', connect: 'Acceso Beta' },
    marquee: { phase: 'Fase 01 Beta lanzada', commission: 'Cero comisión de plataforma', trial: '30 días de acceso gratuito' },
    hero: { title1: 'FASHION', title2: 'RETAIL', title3: 'OS.', cta: 'Solicitar acceso' },
    gateway: { tag: 'Disponible ahora (Fase 01)', title: 'TON GATEWAY.', desc: 'Adquirencia directa en ', highlight: 'USDT (TON)', sub: 'sin intermediarios и con cero comisiones.' },
    widget: { 
        tag: 'Disponible ahora (Fase 01)', title: 'SMART WIDGET.', 
        desc: 'Una alternativa fluida a la adquirencia tradicional para su marca. Acepte pagos globales con cero comisiones de plataforma directamente en su sitio, sin redirecciones ni fricciones.', 
        f1: 'Native UI', f1_desc: 'Checkout sin fricción en 1 clic', f2: 'Cross-Wallet', f2_desc: 'Soporte para todas las billeteras TON',
        hint: 'DEMO INTERACTIVA. PRUEBE LA FUNCIONALIDAD'
    },
    payment: { 
        pay: "Pagar", awaiting: "Esperando Transacción", initializing: "Iniciando Gateway...",
        connecting: "Conectando a la red TON", error: "Error de pago", timeout: "Sesión expirada",
        alreadyPaid: "Ya pagué", retry: "Reintentar pago", success: "¡Pago recibido!",
        confirmed: "Transacción confirmada con éxito", amount: "Monto del pedido", orderId: "ID de Pedido",
        due: "Total a pagar", address: "Dirección de billetera", copied: "¡COPIADO!",
        tapToCopy: "Toca para copiar", openWallet: "Abrir Billetera", needHelp: "¿Necesita ayuda con el pago?",
        support: "Soporte", tonNetwork: "Red TON", close: "Cerrar Ventana"
    },
    crm: { 
        tag: 'Disponible ahora (Fase 01)', title: 'WALLETS DATA.', 
        desc: 'Análisis on-chain profundo para segmentación de audiencia. Libere el potencial de los usuarios anónimos basado en balances, historial и actividad de red.', 
        f1: 'Perfilado', f1_desc: 'Calificación automática', f2: 'Crecimiento', f2_desc: 'Retención basada en datos', 
        feed: 'FLUJO_DATOS_THYSS', scanned: 'Perfil Escaneado' 
    },
    loyalty: { 
        tag: 'Próximamente Fase 02', title: 'NFT GIFTS.', 
        desc: 'Recompense a sus clientes con activos digitales. Aproveche el poder de los NFT para escalar la exclusividad и el estatus premium de su marca.', 
        f1: 'Lealtad 2.0', f1_desc: 'NFT como llave de utilidad', f2: 'Crecimiento Viral', f2_desc: 'Propiedad digital' 
    },
    mint: { 
      progress: 'MINTING_EN_PROGRESO...', sent: 'LEALTAD_ENVIADA', idle: 'LEALTAD_ID_MINT', 
      reward_sent: 'Recompensa Enviada', desc: 'Añadido a la billeтера del cliente', 
      button: 'Enviar Recompensa NFT', another: 'Mintear Otro',
      steps: ['Iniciando protocolo...', 'Generando metadatos...', 'Escribiendo en TON blockchain...', 'Confirmando propiedad...']
    },
    fitting: { 
        tag: 'Próximamente Fase 03', title: '3D FIT.', 
        desc: 'Hemos transformado el tedioso proceso de prueba en una atracción visual con un mascota interactiva. Thyss garantiza un ajuste perfecto и reduce radicalmente las devoluciones.', 
        f1: 'AI-Precision', f1_desc: 'Ajuste de talla impecable', f2: 'Loyalty Boost', f2_desc: 'Gamification que enamora al cliente',
        match: 'Coincidencia', recalc: 'Encontrar mi talla', scanning: 'ANALIZANDO_PARÁMETROS...'
    },
    pricing: { 
      title: 'Módulos de Precios.', monthly: 'Mes', annual: 'Año', off: '20% Descuento', 
      starter: 'Starter', business: 'Business', enterprise: 'Enterprise', 
      choose: 'Elegir', contact: 'Contactar', 
      sub1: 'Para marcas emergentes', sub2: 'Para ventas de alto volumen', sub3: 'Для retail chains',
      currency: '€', businessPrice: 70, perMonth: '/mes',
      popular: 'MEJOR OPCIÓN', betaFree: 'BETA: 30 DÍAS GRATIS',
      features: {
        starter: ["0% комиссия de платформа", "Gas pagado por la marca", "5 transacciones / мес", "Pagos en USDT (TON)", "Widget estándar"],
        business: ["0% комиссия de платформа", "Gas pagado por la marca", "100 transacciones / мес", "Pagos en USDT (TON)", "Módulo Whitelabel", "Intelligence CRM", "NFT Gifts (Pronto)", "3D FIT (Pronto)", "Soporte técnico"],
        enterprise: ["0% комиссия de платформа", "Gas pagado por THYSS", "Transacciones ilimitadas", "Whitelabel Widget Pro", "CRM Pro", "NFT Gifts & Colaboraciones", "Soporte Prioritario", "3D Fit (Pronto)"]
      }
    },
    footer: { desc: 'Merchant OS para marcas de moda. ', sub: 'Infraestructura Web3 e-commerce.', support: 'Soporte', social: 'Redes sociales' },
    notFound: { denied: 'ACCESO_DENEGADO', error: 'ERROR: En desarrollo', emergency: 'Enlace de emergencia', sub: 'Página en desarrollo. Escanee para contactраct.', back: 'Volver al núcleo' },
    beta: { 
      title: 'Unirse al Núcleo', back: 'Volver al núcleo', submit: 'Confirmar Acceso', success: 'Acceso Concedido', 
      brand: 'Marca', site: 'Sitio Web', tg: 'Telegram', name: 'Su Nombre', volume: 'Volumen Mensual',
      perks: ['Adquirencia USDT con 0% comisión', 'Análisis on-chain de cripto-clientes', '30 días de acceso completo', 'Soporte personal и actualizaciones prioritarias'],
      placeholders: { brand: 'ej. Shutterfeel', site: 'shutterfeel.com', tg: '@usuario', name: '¿Cómo le llamamos?' }
    }
  },
  KO: {
    nav: { widget: '위젯', crm: 'CRM', loyalty: '로열티', fitting: '피팅', rates: '요금제', connect: '베타 테스트' },
    marquee: { phase: 'Phase 01 베타 시작', commission: '플랫폼 수수료 0%', trial: '30일 무료 체험' },
    hero: { title1: 'FASHION', title2: 'RETAIL', title3: 'OS.', cta: '베타 신청하기' },
    gateway: { tag: '현재 이용 가능 (Phase 01)', title: 'TON GATEWAY.', desc: '직접 결제 서비스 ', highlight: 'USDT (TON)', sub: '중개자 없이 수수료 0%.' },
    widget: { 
        tag: '현재 이용 가능 (Phase 01)', title: 'SMART WIDGET.', 
        desc: '브랜드를 위한 원활한 뱅킹 결제 대안. 전 세계 결제를 플랫폼 수수료 없이 웹사이트에서 직접 받으세요. 리디렉션이나 불필요한 단계가 없습니다.', 
        f1: 'Native UI', f1_desc: '클릭 한 번으로 끊김 없는 체크아웃', f2: 'Cross-Wallet', f2_desc: '모든 TON 지갑 지원',
        hint: '인터랙티브 데모. 기능을 체험해 보세요'
    },
    payment: { 
        pay: "결제하기", awaiting: "트랜잭션 대기 중", initializing: "게이트웨이 초기화 중...",
        connecting: "TON 네트워크 연결 중", error: "결제 오류", timeout: "세션 만료",
        alreadyPaid: "이미 결제했습니다", retry: "다시 시도", success: "결제 완료!",
        confirmed: "트랜잭션이 성공적으로 확인되었습니다", amount: "주문 금액", orderId: "주문 ID",
        due: "결제 예정 금액", address: "지갑 주소", copied: "복사됨!",
        tapToCopy: "탭하여 복사", openWallet: "지갑 열기", needHelp: "결제에 도움이 필요하신가요?",
        support: "고객 지원", tonNetwork: "TON Network", close: "창 닫기"
    },
    crm: { 
        tag: '현재 이용 가능 (Phase 01)', title: 'WALLETS DATA.', 
        desc: '청중 세분화를 위한 심층 온체인 분석. 지갑 잔액, 트랜잭션 내역 및 네트워크 활동을 기반으로 익명 사용자의 잠재력을 활용하세요.', 
        f1: 'Profiling', f1_desc: '자동 스코어링', f2: 'Growth', f2_desc: '데이터 기반 리텐션', 
        feed: 'THYSS_데이터_피드', scanned: '프로필 스캔 완료' 
    },
    loyalty: { 
        tag: 'Phase 02 예정', title: 'NFT GIFTS.', 
        desc: '디지털 자산으로 고객에게 보상하세요. NFT의 잠재력을 활용하여 브랜드의 독점성과 프리미엄 가치를 확장하세요. 무궁무진한 보상 체계를 구축할 수 있습니다.', 
        f1: 'Loyalty 2.0', f1_desc: '특전의 열쇠로서의 NFT', f2: 'Viral Growth', f2_desc: '디지털 소유권' 
    },
    mint: { 
      progress: '민팅 진행 중...', sent: '리워드 전송 완료', idle: 'LOYALTY_ID_MINT', 
      reward_sent: '리워드 전송됨', desc: '고객 지갑에 추가되었습니다', 
      button: 'NFT 리워드 전송', another: '추가 민팅',
      steps: ['프로토콜 초기화 중...', '메타데이터 생성 중...', 'TON 블록체인 기록 중...', '소유권 확인 중...']
    },
    fitting: { 
        tag: 'Phase 03 예정', title: '3D FIT.', 
        desc: '지루한 피팅 과정을 인터랙티브 마스코트와 함께하는 스타일리시한 시각적 경험으로 바꿨습니다. Thyss는 완벽한 핏을 보장하고 반품률을 획기적으로 낮춥니다.', 
        f1: 'AI-Precision', f1_desc: '오차 없는 사이즈 매칭', f2: 'Loyalty Boost', f2_desc: '브랜드와 사랑에 빠지게 하는 게임화',
        match: '일치', recalc: '사이즈 찾기', scanning: '매개변수 분석 중...'
    },
    pricing: { 
      title: '가격 정책.', monthly: '월간', annual: '연간', off: '20% 할인', 
      starter: 'Starter', business: 'Business', enterprise: 'Enterprise', 
      choose: '선택하기', contact: '문의하기', 
      sub1: '신규 브랜드용', sub2: '활발한 판매용', sub3: '대형 체인용',
      currency: '₩', businessPrice: 110000, perMonth: '/월',
      popular: '최고의 선택', betaFree: '베타: 30일 무료',
      features: {
        starter: ["플랫폼 수수료 0%", "브랜드가 가스비 부담", "월 5건 트랜잭션", "USDT (TON) 결제", "기본 브랜딩 위젯"],
        business: ["플랫폼 수수료 0%", "브랜드가 가스비 부담", "월 100건 트랜잭션", "USDT (TON) 결제", "화이트라벨 위젯 모듈", "인텔리전스 CRM", "NFT 리워드 (예정)", "3D FIT (예정)", "기술 지원"],
        enterprise: ["플랫폼 수수료 0%", "THYSS가 가스비 부담", "무제한 트랜잭션", "화이트라벨 위젯 모듈", "위젯 커스터마이징", "인텔리전스 CRM Pro", "NFT 협업 기획", "24/7 우선 지원", "3D Fit (예정)"]
      }
    },
    footer: { desc: '패션 브랜드를 위한 머천트 OS. ', sub: 'Web3 이커머스 인프라.', support: '고객 지원', social: '소셜 미디어' },
    notFound: { denied: '접근 거부', error: '오류: 개발 중인 페이지', emergency: '비상 연락처', sub: '페이지 개발 중입니다. 스캔하여 문의하세요.', back: '코어로 돌아가기' },
    beta: { 
      title: '코어에 참여하세요', back: '코어로 돌아가기', submit: '신청 확인', success: '권한 부여됨', 
      brand: '브랜드', site: '웹사이트', tg: 'Telegram', name: '성함', volume: '월 거래액',
      perks: ['0% 수수료 USDT 결제', '크립토 고객 온체인 분석', '30일 전체 액세스 권한', '퍼스널 서포트 및 우선 업데이트'],
      placeholders: { brand: '예: Shutterfeel', site: 'shutterfeel.com', tg: '@아이디', name: '어떻게 불러드릴까요?' }
    }
  }
};

// --- ВСПОМОГАТЕЛЬНЫЕ КОМПОНЕНТЫ ---

function RealQRCode({ data, size = 150, className = "" }) {
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodeURIComponent(data)}&bgcolor=ffffff&color=000000&margin=1`;
  return <img src={qrUrl} alt="QR" className={`border-2 border-black ${className}`} style={{ width: '100%', maxWidth: size, height: 'auto', aspectRatio: '1/1' }} />;
}

function TelegramQRBlock({ t, centered = false }) {
  return (
    <div className={`pt-8 border-t border-black/10 text-black ${centered ? 'flex flex-col items-center' : ''}`}>
      <div className={`flex items-center gap-4 text-black ${centered ? 'flex-col text-center' : 'text-left'}`}>
        <div className="w-16 h-16 bg-zinc-50 border-2 border-black flex items-center justify-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] overflow-hidden shrink-0">
          <RealQRCode data="https://t.me/thysssystem" size={56} />
        </div>
        <div className={`${centered ? 'text-center' : 'text-left'}`}>
          <div className="text-[10px] font-black uppercase tracking-wider text-black">Support Group</div>
          <a href="https://t.me/thysssystem" target="_blank" rel="noopener noreferrer" className="text-[10px] font-bold opacity-40 uppercase hover:opacity-100 transition-all text-black">@thysssystem</a>
        </div>
      </div>
    </div>
  );
}

function CompactFeature({ icon: Icon, title, desc, dark = false }) {
  return (
    <div className={`flex items-start gap-4 p-4 border-2 border-black transition-all group ${dark ? 'bg-black/30 border-white/20' : 'bg-zinc-50'}`}>
      <div className={`shrink-0 w-10 h-10 border-2 border-black flex items-center justify-center shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all ${dark ? 'bg-[#CCFF00] text-black border-white' : 'bg-white text-black group-hover:bg-[#CCFF00]'}`}>
        <Icon size={18} strokeWidth={2.5} />
      </div>
      <div className="space-y-0.5 text-left">
        <h4 className={`text-sm font-black uppercase tracking-tight leading-none ${dark ? 'text-white' : 'text-black'}`}>{String(title)}</h4>
        <p className={`text-[10px] font-bold uppercase tracking-tight leading-tight ${dark ? 'text-white/60' : 'opacity-40 text-black'}`}>{String(desc)}</p>
      </div>
    </div>
  );
}

const Marquee = ({ lang = 'RU' }) => {
  const t = translations[lang] || translations['RU'];
  const marqueeItems = [t.marquee.phase, t.marquee.commission, t.marquee.trial];
  return (
    <div className="w-full bg-black overflow-hidden border-b border-black">
      <div className="flex items-center pt-1 pb-1.5 text-white">
        <div className="flex animate-marqueeInfinite whitespace-nowrap">
          {[...Array(4)].map((_, setIdx) => (
            <div key={setIdx} className="flex items-center gap-12 px-6 shrink-0">
              {marqueeItems.map((item, idx) => (
                <React.Fragment key={`${setIdx}-${idx}`}>
                  <span className="text-[9px] font-black uppercase tracking-widest text-white italic">{item}</span>
                  <Star size={10} className={idx === 2 ? "fill-[#CCFF00] text-[#CCFF00]" : "fill-white text-white"} />
                </React.Fragment>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// --- ВИДЖЕТЫ ---

function PaymentWidget({ t }) {
  const [status, setStatus] = useState('idle');
  const [walletAddress] = useState('UQD-STABLE-CHECKPOINT-TON-ADDR-777');
  const [timeLeft, setTimeLeft] = useState(30000); 
  const [isCopied, setIsCopied] = useState(false);
  
  const amount = 142.50;

  const handleStartPayment = () => {
    setTimeLeft(30000);
    setStatus('initializing');
  };

  useEffect(() => {
    if (status !== 'initializing') return;
    const timer = setTimeout(() => setStatus('payment'), 1500);
    return () => clearTimeout(timer);
  }, [status]);

  useEffect(() => {
    let timer;
    if (status === 'payment' && timeLeft > 0) {
      timer = setInterval(() => setTimeLeft(prev => Math.max(0, prev - 10)), 10);
    } else if (status === 'payment' && timeLeft === 0) {
      setStatus('error');
    }
    return () => clearInterval(timer);
  }, [status, timeLeft]);

  const formatTime = (ms) => {
    const s = Math.floor(ms / 1000);
    const m = Math.floor((ms % 1000) / 10);
    return `${s.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`;
  };

  const copyAddress = () => {
    const el = walletAddress;
    navigator.clipboard?.writeText?.(el).catch(() => {
        const textarea = document.createElement('textarea');
        textarea.value = el;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
    });
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  if (status === 'idle') {
    return (
      <button onClick={handleStartPayment} className="w-full max-w-xs h-16 bg-white border-2 border-black flex items-center justify-between px-6 group hover:bg-black transition-all shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] text-black cursor-pointer active:translate-x-1 active:translate-y-1 active:shadow-none overflow-hidden relative z-40 mx-auto">
        <div className="flex items-center gap-4 text-left">
          <div className="w-8 h-8 bg-[#CCFF00] border-2 border-black flex items-center justify-center text-black group-hover:scale-110 transition-transform"><Wallet size={16} /></div>
          <div className="text-black">
            <span className="block text-[8px] font-black uppercase opacity-40 group-hover:text-white transition-all">{t.payment.pay}</span>
            <span className="text-sm font-black uppercase group-hover:text-white">{amount} USDT</span>
          </div>
        </div>
        <ArrowRight size={18} className="group-hover:text-white" />
      </button>
    );
  }

  if (status === 'success') {
    return (
      <div className="w-full max-w-sm border-2 border-black bg-white shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] overflow-hidden text-black animate-in zoom-in-95 duration-300 relative z-40 mx-auto">
         <div className="bg-black text-white p-4 border-b-2 border-black flex justify-between items-center text-white">
            <div className="flex items-center gap-3"><div className="w-2.5 h-2.5 rounded-full bg-[#CCFF00]"></div><span className="text-[10px] font-black uppercase tracking-[0.1em]">{t.payment.success}</span></div>
            <button onClick={() => setStatus('idle')} className="hover:text-[#CCFF00] transition-colors p-1 text-white"><X size={16}/></button>
         </div>
         <div className="p-8 md:p-12 text-center space-y-6">
            <div className="w-20 h-20 bg-[#CCFF00] border-2 border-black rounded-full flex items-center justify-center mx-auto shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
               <Check size={40} strokeWidth={4} />
            </div>
            <div className="space-y-2">
               <h4 className="text-2xl font-black uppercase tracking-tighter leading-none">{t.payment.success}</h4>
               <p className="text-[10px] font-bold opacity-40 uppercase">{t.payment.confirmed}</p>
            </div>
            <button onClick={() => setStatus('idle')} className="w-full py-4 bg-black text-white text-xs font-black uppercase border-2 border-black hover:bg-[#CCFF00] hover:text-black transition-all">
               {t.payment.close}
            </button>
         </div>
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div className="w-full max-w-sm border-2 border-black bg-white shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] overflow-hidden text-black animate-in zoom-in-95 duration-300 relative z-40 mx-auto">
         <div className="bg-red-600 text-white p-4 border-b-2 border-black flex justify-between items-center text-white">
            <div className="flex items-center gap-3"><div className="w-2.5 h-2.5 rounded-full bg-white animate-pulse"></div><span className="text-[10px] font-black uppercase tracking-[0.1em]">{t.payment.error}</span></div>
            <button onClick={() => setStatus('idle')} className="hover:text-black transition-colors p-1 text-white"><X size={16}/></button>
         </div>
         <div className="p-8 md:p-12 text-center space-y-6">
            <div className="w-20 h-20 bg-red-50 border-2 border-black rounded-full flex items-center justify-center mx-auto shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] text-red-600">
               <ShieldAlert size={40} strokeWidth={3} />
            </div>
            <div className="space-y-2">
               <h4 className="text-2xl font-black uppercase tracking-tighter leading-none">{t.payment.error}</h4>
               <p className="text-[10px] font-bold opacity-40 uppercase">{t.payment.timeout}</p>
            </div>
            <button onClick={handleStartPayment} className="w-full py-4 bg-black text-white text-xs font-black uppercase border-2 border-black hover:bg-red-500 transition-all">
               {t.payment.retry}
            </button>
         </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-sm border-2 border-black bg-white shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] overflow-hidden text-black animate-in slide-in-from-top-2 fade-in duration-300 relative z-40 mx-auto">
      <div className="bg-black text-white p-4 border-b-2 border-black flex justify-between items-center text-white">
        <div className="flex items-center gap-3">
          <div className={`w-2.5 h-2.5 rounded-full ${status === 'payment' ? 'bg-[#CCFF00] animate-pulse' : 'bg-[#CCFF00]'}`}></div>
          <span className="text-[10px] font-black uppercase tracking-[0.1em] text-white">
            {status === 'payment' ? t.payment.awaiting : t.payment.initializing}
          </span>
        </div>
        {status === 'payment' && (
          <div className="text-[11px] font-mono font-bold bg-[#CCFF00] text-black px-2 py-0.5 rounded border border-black/20 text-black">
            {formatTime(timeLeft)}
          </div>
        )}
        <button onClick={() => setStatus('idle')} className="hover:text-[#CCFF00] transition-colors p-1 text-white"><X size={16}/></button>
      </div>

      <div className="p-4 md:p-6 text-black">
        {status === 'initializing' ? (
          <div className="py-12 flex flex-col items-center gap-5 text-center">
            <Loader2 size={48} className="animate-spin text-black opacity-20" />
            <div className="text-xs font-black uppercase tracking-widest">{t.payment.initializing}</div>
          </div>
        ) : (
          <div className="space-y-6 text-left">
            <div className="flex flex-col sm:flex-row gap-5 items-center bg-zinc-50 border-2 border-black p-5 shadow-sm text-black">
               <div className="w-24 h-24 bg-white border-2 border-black p-1 shrink-0">
                 <RealQRCode data={`ton://transfer/${walletAddress}`} size={88} />
               </div>
               <div className="flex flex-col text-center sm:text-left space-y-1">
                 <span className="text-[9px] font-black opacity-30 uppercase tracking-widest">{t.payment.due}</span>
                 <span className="text-2xl md:text-3xl font-black tracking-tighter leading-none">{amount} <span className="text-sm">USDT</span></span>
                 <div className="mt-2 inline-flex items-center gap-2 px-2.5 py-1 bg-black text-white rounded-sm text-[8px] font-black uppercase tracking-tighter mx-auto sm:mx-0">
                   <div className="w-1.5 h-1.5 bg-[#CCFF00] rounded-full"></div>{t.payment.tonNetwork}
                 </div>
               </div>
            </div>

            <div className="space-y-2 text-left">
               <div className="flex justify-between items-center px-1">
                 <span className="text-[9px] font-black uppercase opacity-40">{t.payment.address}</span>
                 {isCopied && <span className="text-[9px] font-black text-green-600 uppercase animate-in fade-in">{t.payment.copied}</span>}
               </div>
               <button onClick={copyAddress} className="w-full flex justify-between items-center bg-zinc-100 border-2 border-black p-3 hover:bg-zinc-200 transition-colors group cursor-pointer text-black">
                  <span className="text-[10px] font-mono font-bold truncate opacity-70 pr-4">{walletAddress}</span>
                  <Copy size={14} className="shrink-0 opacity-20 group-hover:opacity-100 transition-opacity" />
               </button>
            </div>

            <button onClick={() => setStatus('success')} className="w-full py-5 bg-black text-white text-xs font-black uppercase flex items-center justify-center gap-3 hover:bg-[#CCFF00] hover:text-black border-2 border-black transition-all shadow-[6px_6px_0px_0px_rgba(0,0,0,0.1)] active:shadow-none text-white">
              {t.payment.openWallet} <ArrowRight size={18} strokeWidth={3} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function NFTTerminal({ t }) {
  const [status, setStatus] = useState('idle'); 
  const [step, setStep] = useState(0);
  const steps = t.mint.steps;

  const handleMint = () => { setStatus('processing'); setStep(0); };

  useEffect(() => {
    if (status !== 'processing') return;
    const interval = setInterval(() => {
      setStep(prev => {
        if (prev < steps.length - 1) return prev + 1;
        clearInterval(interval);
        setTimeout(() => setStatus('success'), 800);
        return prev;
      });
    }, 800);
    return () => clearInterval(interval);
  }, [status, steps.length]);

  return (
    <div className="w-full max-w-md border-2 border-black bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] overflow-hidden relative z-10 text-black mx-auto">
      <div className="bg-black text-white p-3 border-b-2 border-black flex justify-between items-center text-white">
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${status === 'processing' ? 'bg-[#CCFF00] animate-pulse' : 'bg-white/20'}`}></div>
          <span className="text-[9px] font-black uppercase tracking-widest">{status === 'processing' ? t.mint.progress : t.mint.idle}</span>
        </div>
        <Ticket size={14} className={status === 'success' ? 'text-[#CCFF00]' : 'text-white/40'} />
      </div>
      <div className="p-4 sm:p-6 bg-zinc-100">
        {status === 'processing' ? (
          <div className="h-[220px] md:h-[260px] flex flex-col items-center justify-center space-y-6">
            <RefreshCcw size={48} className="animate-spin opacity-20 text-black" />
            <div className="space-y-3 text-center w-full">
              <div className="text-[10px] font-black uppercase tracking-widest animate-pulse">{steps[step]}</div>
              <div className="w-full max-w-[200px] h-1.5 bg-black/10 mx-auto overflow-hidden relative border border-black/5">
                <div className="absolute inset-y-0 left-0 bg-black transition-all duration-700 ease-out" style={{ width: `${((step + 1) / steps.length) * 100}%` }}></div>
              </div>
            </div>
          </div>
        ) : status === 'success' ? (
          <div className="h-[220px] md:h-[260px] flex flex-col justify-center items-center space-y-6 text-center">
            <div className="w-16 h-16 bg-[#CCFF00] border-2 border-black flex items-center justify-center shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
              <Sparkles size={32} />
            </div>
            <div className="space-y-2 text-black">
              <h4 className="text-lg sm:text-xl font-black uppercase tracking-tighter">{t.mint.reward_sent}</h4>
              <p className="text-[13px] font-medium opacity-60">{t.mint.desc}</p>
            </div>
            <button onClick={() => setStatus('idle')} className="w-full py-3 bg-black text-white font-black uppercase text-[10px] tracking-widest border-2 border-black hover:bg-[#CCFF00] hover:text-black transition-all text-white">
              {t.mint.another}
            </button>
          </div>
        ) : (
          <div className="space-y-4 text-black text-left">
            <div className="bg-white border-2 border-black p-3 md:p-4 shadow-sm space-y-4">
              <div className="flex justify-between items-start">
                  <div className="space-y-1 text-left">
                      <div className="text-[10px] font-black uppercase">GENESIS_NFT_#01</div>
                      <div className="text-[7px] font-bold uppercase opacity-40">Asset Status: Ready_to_Mint</div>
                  </div>
                  <Plus size={16} className="text-green-500" />
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="w-full sm:w-20 h-20 bg-black flex items-center justify-center shrink-0 text-white"><Ticket size={32} className="text-[#CCFF00]" /></div>
                <div className="flex-grow grid grid-cols-1 gap-1 text-left">
                  {[
                    { label: 'Collection', val: 'THYSS ORIGIN' },
                    { label: 'Utility', val: '10% DISCOUNT' },
                    { label: 'Mint Cost', val: '0.0 TON' },
                    { label: 'Rarity', val: 'LEGENDARY', color: 'text-orange-500' }
                  ].map((p, i) => (
                    <div key={i} className="p-1 border-b border-black/5 flex justify-between text-[7px] font-black uppercase text-left">
                      <span className="opacity-40">{p.label}</span>
                      <span className={p.color || 'text-black'}>{p.val}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <button onClick={handleMint} className="w-full py-4 bg-[#CCFF00] border-2 border-black font-black uppercase text-[9px] tracking-[0.2em] hover:bg-black hover:text-white transition-all flex items-center justify-center gap-2"><Zap size={14} /> {t.mint.button}</button>
          </div>
        )}
      </div>
    </div>
  );
}

function FittingTerminal({ t }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  const [isCalculated, setIsCalculated] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const [measurements, setMeasurements] = useState({ height: 175, weight: 70, chest: 95, waist: 80 });
  const [result, setResult] = useState('M');

  const handleScan = () => { 
    setIsScanning(true); 
    setTimeout(() => { 
      setIsScanning(false); 
      setIsCalculated(true); 
      const score = measurements.height + (measurements.weight * 1.5); 
      setResult(score > 300 ? 'XL' : score > 280 ? 'L' : 'M'); 
    }, 2000); 
  };

  const handleAddToCart = () => {
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 3000);
  };

  if (!isExpanded) {
    return (
      <button onClick={() => setIsExpanded(true)} className="w-full max-w-sm h-16 bg-white border-2 border-black flex items-center justify-between px-6 group hover:bg-black transition-all shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] text-black cursor-pointer active:translate-x-1 active:translate-y-1 active:shadow-none overflow-hidden relative z-40 mx-auto">
        <div className="flex items-center gap-4 text-left pointer-events-none">
          <div className="w-8 h-8 bg-[#CCFF00] border-2 border-black flex items-center justify-center text-black group-hover:scale-110 transition-transform"><Maximize size={16} /></div>
          <div className="text-left text-black">
            <span className="block text-[8px] font-black uppercase opacity-40 group-hover:text-white transition-all">Smart Fitting</span>
            <span className="text-sm font-black uppercase group-hover:text-white">Find My 3D Size</span>
          </div>
        </div>
        <ChevronRight size={18} className="group-hover:text-white" />
      </button>
    );
  }

  return (
    <div className="w-full max-w-sm border-2 border-black bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] overflow-hidden relative z-40 text-black mx-auto">
      <div className="bg-black text-white p-3 border-b-2 border-black flex justify-between items-center text-white">
        <div className="flex items-center gap-2 text-white">
          <div className={`w-2 h-2 rounded-full ${isScanning ? 'bg-[#CCFF00] animate-pulse' : 'bg-[#CCFF00]'}`}></div>
          <span className="text-[9px] font-black uppercase tracking-widest text-white">{isScanning ? t.fitting.scanning : "3D_BODY_FIT_V.03"}</span>
        </div>
        <button onClick={() => setIsExpanded(false)} className="hover:text-[#CCFF00] transition-colors"><X size={14} /></button>
      </div>
      <div className="p-4 bg-zinc-100 space-y-3">
        <div className="bg-white border-2 border-black p-2 flex items-center justify-between group hover:bg-[#CCFF00] transition-all cursor-pointer">
          <div className="flex items-center gap-2 text-black">
            <div className="w-6 h-6 bg-black flex items-center justify-center text-[#CCFF00] text-left text-white"><Tag size={12} /></div>
            <div className="text-left text-black">
              <div className="text-[6px] font-black opacity-40 uppercase">Merchant:</div>
              <div className="text-[9px] font-black uppercase leading-none truncate max-w-[150px]">Bauhaus 3D Gear</div>
            </div>
          </div>
          <ExternalLink size={10} className="opacity-20 group-hover:opacity-100" />
        </div>

        {!isCalculated && (
          <div className="bg-white border-2 border-black relative h-32 overflow-hidden flex items-center justify-center">
             {isScanning && <div className="absolute inset-0 z-10 bg-[linear-gradient(to_bottom,transparent_0%,#CCFF00_50%,transparent_100%)] h-1 w-full opacity-40 animate-scanline"></div>}
             <div className="relative flex flex-col items-center text-black">
               <div className="w-16 h-16 rounded-full border-2 border-dashed border-black/20 flex items-center justify-center relative">
                 <div className="absolute inset-0 rounded-full bg-[#CCFF00]/10 animate-ping-slow"></div>
                 <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-black/5 to-[#CCFF00]/40 border-2 border-black animate-float-slow flex items-center justify-center text-black">
                   <BoxSelect size={20} className="opacity-20" />
                 </div>
               </div>
             </div>
          </div>
        )}

        {isCalculated ? (
          <div className="bg-white border-2 border-black p-6 text-center space-y-4 animate-in zoom-in-95 duration-300 text-black">
             <div className="text-[10px] font-black uppercase opacity-40">Your Recommended Size:</div>
             <div className="text-6xl md:text-7xl font-black tracking-tighter">{result}</div>
             <div className="flex items-center justify-center gap-2 text-[8px] font-black uppercase text-green-600"><ShieldCheck size={12} /> 98% Accuracy Match</div>
             
             <div className="space-y-3 pt-2">
                <button onClick={handleAddToCart} disabled={isAdded} className={`w-full py-4 font-black uppercase text-[10px] tracking-widest border-2 border-black transition-all flex items-center justify-center gap-2 transform active:scale-95 ${isAdded ? 'bg-[#CCFF00] text-black shadow-none' : 'bg-black text-white hover:bg-[#CCFF00] hover:text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)]'} text-white`}>
                  {isAdded ? <><Check size={14} strokeWidth={3} className="animate-in zoom-in text-black" /> Added</> : <><ShoppingCart size={14} className="text-white" /> Add to Cart</>}
                </button>
                <button onClick={() => setIsCalculated(false)} className="flex items-center justify-center gap-2 mx-auto text-[8px] font-black uppercase opacity-30 hover:opacity-100 hover:text-black transition-all group text-black">
                  <ArrowLeft size={10} className="group-hover:-translate-x-1 transition-transform" />
                  Back to Parameters
                </button>
             </div>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-2 text-black text-left">
             {[
               { id: 'height', label: 'Height (cm)', val: measurements.height, min: 150, max: 200 }, 
               { id: 'weight', label: 'Weight (kg)', val: measurements.weight, min: 40, max: 130 },
               { id: 'chest', label: 'Chest (cm)', val: measurements.chest, min: 80, max: 130 },
               { id: 'waist', label: 'Waist (cm)', val: measurements.waist, min: 60, max: 120 }
             ].map((field) => (
               <div key={field.id} className="bg-white border border-black p-2 space-y-1 text-left">
                 <div className="flex justify-between items-center text-[7px] font-black uppercase opacity-50"><span>{field.label}</span><span className="opacity-100">{field.val}</span></div>
                 <input type="range" min={field.min} max={field.max} value={field.val} onChange={(e) => setMeasurements({...measurements, [field.id]: parseInt(e.target.value)})} className="w-full h-1 bg-black/10 appearance-none cursor-pointer accent-black" />
               </div>
             ))}
             <button onClick={handleScan} disabled={isScanning} className="col-span-2 w-full py-3 bg-[#CCFF00] border-2 border-black font-black uppercase text-[9px] tracking-[0.2em] hover:bg-black hover:text-white transition-all flex items-center justify-center gap-2 text-black">
               {isScanning ? <Loader2 size={12} className="animate-spin" /> : <Scan size={12} />}
               {t.fitting.recalc}
             </button>
          </div>
        )}
      </div>
    </div>
  );
}

// --- СТРАНИЦЫ И НАВИГАЦИЯ ---

function NavigationBlockMobile({ onNavigateHome, onConnect, t, lang, setLang, standardPadding, isSimplified = false }) {
  return (
    <nav className="fixed top-0 left-0 w-full z-[100] bg-white border-b border-black h-[72px] flex items-center text-black">
      <div className={`w-full ${standardPadding} flex justify-between items-center h-full text-black`}>
        <button onClick={onNavigateHome} className="text-xl md:text-2xl font-black tracking-tighter uppercase hover:opacity-70 transition-opacity">THYSS</button>
        {!isSimplified ? (
          <>
            <div className="hidden lg:flex items-center gap-8 h-full">
              {['widget', 'crm', 'loyalty', 'fitting', 'rates'].map(id => (
                <a key={id} href={`#${id}`} className="text-[9px] font-black uppercase tracking-widest hover:line-through transition-all px-1">
                  {String(t.nav[id])}
                </a>
              ))}
            </div>
            <div className="flex items-center gap-3 md:gap-4">
              <div className="flex items-center gap-1 md:gap-2 text-[10px] font-black uppercase tracking-widest mr-1 select-none">
                <button onClick={() => setLang('RU')} className={`hover:line-through transition-all ${lang === 'RU' ? 'text-black' : 'opacity-30'} cursor-pointer`}>RU</button>
                <span className="opacity-100 text-[10px] font-black mx-0.5">|</span>
                <button onClick={() => setLang('EN')} className={`hover:line-through transition-all ${lang === 'EN' ? 'text-black' : 'opacity-30'} cursor-pointer`}>EN</button>
                <span className="opacity-100 text-[10px] font-black mx-0.5">|</span>
                <button onClick={() => setLang('ES')} className={`hover:line-through transition-all ${lang === 'ES' ? 'text-black' : 'opacity-30'} cursor-pointer`}>ES</button>
                <span className="opacity-100 text-[10px] font-black mx-0.5">|</span>
                <button onClick={() => setLang('KO')} className={`hover:line-through transition-all ${lang === 'KO' ? 'text-black' : 'opacity-30'} cursor-pointer`}>KO</button>
              </div>
              <button onClick={onConnect} className="px-3 md:px-5 py-2 bg-[#CCFF00] text-black text-[9px] md:text-[10px] font-black uppercase border-2 border-black hover:bg-black hover:text-white shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-all cursor-pointer flex items-center gap-2">
                <span className="hidden sm:inline">{String(t.nav.connect)}</span>
                <span className="sm:hidden">BETA</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </>
        ) : (
          <button onClick={onNavigateHome} className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] hover:line-through transition-all group">
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> 
            {String(t.beta.back)}
          </button>
        )}
      </div>
    </nav>
  );
}

function FooterBlock({ onNavigateError, standardPadding, t }) {
  return (
    <footer className="bg-black text-white pt-16 pb-10 text-left relative z-10 border-t-2 border-black">
      <div className={`${standardPadding} grid grid-cols-1 md:grid-cols-12 gap-12 mb-16 text-white`}>
        <div className="md:col-span-6 text-white">
          <span className="text-3xl md:text-5xl font-black tracking-tighter uppercase block mb-6 text-white text-left">THYSS</span>
          <p className="max-w-xs text-[12px] font-medium tracking-tight opacity-40 leading-relaxed text-left">
            {String(t.footer.desc)} <br /> {String(t.footer.sub)}
          </p>
        </div>
        <div className="md:col-span-6 grid grid-cols-2 gap-8 md:gap-10 text-white">
          <div className="flex flex-col gap-3 md:gap-4 uppercase text-[8px] md:text-[9px] font-black tracking-widest text-white/60">
            <span className="border-b border-white/20 pb-2 text-white/70 font-black text-left">{String(t.footer.support)}</span>
            {['Docs', 'API Keys', 'SLA'].map(item => (<button key={item} onClick={() => onNavigateError()} className="hover:text-white text-left uppercase transition-colors">{item}</button>))}
          </div>
          <div className="flex flex-col gap-3 md:gap-4 uppercase text-[8px] md:text-[9px] font-black tracking-widest text-white/60">
            <span className="border-b border-white/20 pb-2 text-white/70 font-black text-left">{String(t.footer.social)}</span>
            <a href="https://t.me/thysssystem" target="_blank" rel="noopener noreferrer" className="hover:text-white uppercase transition-colors text-left">Telegram</a>
          </div>
        </div>
      </div>
      <div className={`pt-10 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-4 text-[8px] font-bold uppercase text-white/40 ${standardPadding}`}>
        <span>
          © 2026 THYSS x <a href="https://shutterfeel.com" target="_blank" rel="noopener noreferrer" className="hover:underline decoration-[#CCFF00] decoration-2 underline-offset-4 transition-all">SHUTTERFEEL</a>
        </span>
        <span>Built on TON</span>
      </div>
    </footer>
  );
}

function LandingContent({ onNavigateError, onConnect, t, lang, setLang, standardPadding }) {
  const plansData = [ 
    { id: 'starter', name: t.pricing.starter, price: 0, features: t.pricing.features.starter, sub: t.pricing.sub1 }, 
    { id: 'business', name: t.pricing.business, price: t.pricing.businessPrice, features: t.pricing.features.business, dark: true, beta: true, sub: t.pricing.sub2, popular: true, promo: t.pricing.betaFree }, 
    { id: 'enterprise', name: t.pricing.enterprise, price: "CUSTOM", features: t.pricing.features.enterprise, beta: true, sub: t.pricing.sub3 } 
  ];

  return (
    <div className="bg-white overflow-x-hidden w-full text-black">
      <NavigationBlockMobile onNavigateHome={() => window.scrollTo({top:0, behavior:'smooth'})} onConnect={onConnect} t={t} lang={lang} setLang={setLang} standardPadding={standardPadding} />
      
      <div className="pt-[72px] w-full text-black">
        <Marquee lang={lang} />
        
        {/* HERO SECTION */}
        <header className="border-b border-black overflow-hidden w-full">
          <div className={`w-full py-16 md:py-24 ${standardPadding} text-left`}>
            <h1 className="font-black uppercase tracking-tighter leading-[0.85] text-left break-words overflow-hidden select-none">
              <div className="text-[clamp(3.5rem,18vw,14rem)] md:text-[12vw]">{String(t.hero.title1)}</div>
              <div className="text-[clamp(3.5rem,18vw,14rem)] md:text-[12vw]">{String(t.hero.title2)}</div>
              <div className="text-[clamp(3.5rem,18vw,14rem)] md:text-[12vw]">{String(t.hero.title3)}</div>
            </h1>
            <div className="pt-10 md:pt-12 text-left">
              <button onClick={onConnect} className="px-6 md:px-8 py-4 bg-[#CCFF00] text-black font-black uppercase text-xs sm:text-sm tracking-[0.2em] flex items-center gap-3 border-2 border-black hover:bg-black hover:text-white transition-all group shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] cursor-pointer">
                {String(t.hero.cta)} <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </header>
        
        {/* GATEWAY SECTION */}
        <section className="bg-white border-b border-black py-16 text-left w-full overflow-hidden scroll-mt-[72px]">
          <div className={`w-full ${standardPadding} text-left`}>
            <div className="w-fit inline-block px-2 py-1 bg-black text-white text-[9px] font-black uppercase mb-6">{String(t.gateway.tag)}</div>
            <h2 className="text-[clamp(3rem,15vw,10rem)] md:text-9xl font-black uppercase tracking-tighter mb-8 md:mb-12 leading-[0.9] break-words">{String(t.gateway.title)}</h2>
            <p className="text-base sm:text-xl md:text-3xl font-bold tracking-tight max-w-full text-left leading-snug">
              {String(t.gateway.desc)}
              <span className="bg-[#CCFF00] px-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] inline-block mx-1 font-black uppercase">{String(t.gateway.highlight)}</span> 
              <span className="inline">{String(t.gateway.sub)}</span>
            </p>
          </div>
        </section>
        
        {/* WIDGET SECTION */}
        <section id="widget" className="border-b border-black bg-white overflow-hidden text-left scroll-mt-[72px] w-full">
          <div className="flex flex-col lg:grid lg:grid-cols-12 w-full text-left">
            <div className={`lg:col-span-6 py-12 md:py-16 ${standardPadding} flex flex-col justify-center text-left`}>
              <div className="w-fit inline-block px-2 py-1 bg-black text-white text-[9px] font-black uppercase mb-6">{String(t.widget.tag)}</div>
              <h2 className="text-[clamp(2.8rem,12vw,8rem)] md:text-8xl font-black uppercase tracking-tighter mb-8 md:mb-10 leading-[0.9] break-words">{String(t.widget.title)}</h2>
              <p className="text-[14px] md:text-[15px] font-medium text-black/70 mb-8 md:mb-10">{String(t.widget.desc)}</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                <CompactFeature icon={Layers} title={t.widget.f1} desc={t.widget.f1_desc} />
                <CompactFeature icon={Cpu} title={t.widget.f2} desc={t.widget.f2_desc} />
              </div>
            </div>
            <div className="lg:col-span-6 py-12 md:py-16 px-6 flex flex-col items-center justify-center border-t lg:border-t-0 lg:border-l border-black bg-zinc-50 relative lg:min-h-[450px] gap-6">
              <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#000_1px,transparent_1px)] [background-size:30px_30px] pointer-events-none"></div>
              <PaymentWidget t={t} />
              <div className="flex flex-col items-center gap-2 animate-pulse">
                <p className="text-[9px] font-black uppercase tracking-[0.2em] text-black/30 text-center px-4">
                  {t.widget.hint}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CRM SECTION */}
        <section id="crm" className="border-b border-black bg-[#CCFF00] overflow-hidden text-left scroll-mt-[72px] w-full">
          <div className="flex flex-col lg:grid lg:grid-cols-12 w-full text-left text-black">
            <div className={`lg:col-span-6 py-12 md:py-16 ${standardPadding} flex flex-col justify-center text-left`}>
              <div className="w-fit inline-block px-2 py-1 bg-black text-white text-[9px] font-black uppercase mb-6">{String(t.crm.tag)}</div>
              <h2 className="text-[clamp(2.8rem,12vw,8rem)] md:text-8xl font-black uppercase tracking-tighter mb-8 md:mb-10 leading-[0.9] break-words">{String(t.crm.title)}</h2>
              <p className="text-[14px] md:text-[15px] font-medium text-black/70 mb-8 md:mb-10">{String(t.crm.desc)}</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                <CompactFeature icon={Target} title={t.crm.f1} desc={t.crm.f1_desc} />
                <CompactFeature icon={TrendingUp} title={t.crm.f2} desc={t.crm.f2_desc} />
              </div>
            </div>
            <div className="lg:col-span-6 py-12 md:py-16 px-6 flex items-center justify-center border-t lg:border-b-0 lg:border-l border-black bg-[#CCFF00]">
              <div className="w-full max-w-md border-2 border-black bg-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] overflow-hidden">
                <div className="bg-black text-white p-3 border-b-2 border-black flex justify-between items-center text-white">
                  <span className="text-[9px] font-black uppercase tracking-widest">{String(t.crm.feed)}</span>
                  <Database size={14} className="text-[#CCFF00]" />
                </div>
                <div className="p-4 md:p-6 space-y-4 text-left">
                  <div className="p-3 md:p-4 border-2 border-black bg-zinc-50 flex gap-4 items-center">
                    <div className="w-12 h-12 md:w-16 md:h-16 bg-black flex items-center justify-center border border-black shadow-[4px_4px_0px_0px_rgba(204,255,0,1)] text-[#CCFF00]"><Search size={24} className="animate-pulse" /></div>
                    <div className="text-black text-left">
                      <div className="text-[10px] font-black uppercase">{t.crm.scanned}</div>
                      <div className="text-[8px] font-mono opacity-50 truncate max-w-[150px]">UQAs...3e9j_wallet</div>
                    </div>
                  </div>
                  {[ 
                    { addr: '0x71...a3b', amount: '12,420 USDT', tags: ['WHALE', 'OG'] }, 
                    { addr: '0x32...f9e', amount: '840 USDT', tags: ['ACTIVE'] }, 
                    { addr: '0x9a...2c1', amount: '2,100 USDT', tags: ['OG'] } 
                  ].map(user => (
                    <div key={user.addr} className="p-3 border border-black/10 flex justify-between items-center bg-[#FDFDFD] text-[10px] font-black uppercase leading-none text-black text-left">
                      <div className="flex flex-col gap-1 text-left">
                        <div className="flex items-center gap-2"><Users size={12} /> <span>{user.addr}</span></div>
                        <div className="flex gap-1 text-left">
                          {user.tags.map(tag => (
                            <span key={tag} className={`text-[6px] font-black border px-1 ${tag === 'WHALE' ? 'bg-orange-50 border-orange-200 text-orange-600' : tag === 'OG' ? 'bg-purple-50 border-purple-200 text-purple-600' : 'bg-green-50 border-green-200 text-green-600'}`}>{tag}</span>
                          ))}
                        </div>
                      </div>
                      <span className="text-black font-black text-left">{user.amount}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* LOYALTY SECTION */}
        <section id="loyalty" className="border-b border-black bg-white overflow-hidden text-left scroll-mt-[72px] w-full">
          <div className="flex flex-col lg:grid lg:grid-cols-12 w-full text-black text-left">
            <div className={`lg:col-span-6 py-12 md:py-16 ${standardPadding} flex flex-col justify-center text-left`}>
              <div className="w-fit inline-block px-2 py-1 bg-black text-white text-[9px] font-black uppercase mb-6">{String(t.loyalty.tag)}</div>
              <h2 className="text-[clamp(2.8rem,12vw,8rem)] md:text-8xl font-black uppercase tracking-tighter mb-8 md:mb-10 leading-[0.9] break-words">{String(t.loyalty.title)}</h2>
              <p className="text-[14px] md:text-[15px] font-medium text-black/70 mb-8 md:mb-10">{String(t.loyalty.desc)}</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                <CompactFeature icon={Heart} title={t.loyalty.f1} desc={t.loyalty.f1_desc} />
                <CompactFeature icon={Share2} title={t.loyalty.f2} desc={t.loyalty.f2_desc} />
              </div>
            </div>
            <div className="lg:col-span-6 py-12 md:py-16 px-6 flex items-center justify-center border-t lg:border-b-0 lg:border-l border-black bg-zinc-50 relative min-h-[400px]">
              <NFTTerminal t={t} />
            </div>
          </div>
        </section>

        {/* FITTING SECTION */}
        <section id="fitting" className="border-b border-black bg-zinc-50 overflow-hidden text-left scroll-mt-[72px] w-full">
          <div className="flex flex-col lg:grid lg:grid-cols-12 w-full text-black text-left">
            <div className={`lg:col-span-6 py-12 md:py-16 ${standardPadding} flex flex-col justify-center text-left`}>
              <div className="w-fit inline-block px-2 py-1 bg-black text-white text-[9px] font-black uppercase mb-6">{String(t.fitting.tag)}</div>
              <h2 className="text-[clamp(2.8rem,12vw,8rem)] md:text-8xl font-black uppercase tracking-tighter mb-8 md:mb-10 leading-[0.9] break-words">{String(t.fitting.title)}</h2>
              <p className="text-[14px] md:text-[15px] font-medium text-black/70 mb-8 md:mb-10">{String(t.fitting.desc)}</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
                <CompactFeature icon={Maximize} title={t.fitting.f1} desc={t.fitting.f1_desc} />
                <CompactFeature icon={Heart} title={t.fitting.f2} desc={t.fitting.f2_desc} />
              </div>
            </div>
            <div className="lg:col-span-6 py-12 md:py-16 px-6 flex items-center justify-center border-t lg:border-b-0 lg:border-l border-black bg-white relative">
              <div className="absolute inset-0 opacity-5 bg-[linear-gradient(#000_1px,transparent_1px),linear-gradient(90deg,#000_1px,transparent_1px)] [background-size:40px_40px] pointer-events-none"></div>
              <FittingTerminal t={t} />
            </div>
          </div>
        </section>
        
        {/* PRICING SECTION */}
        <section id="rates" className="border-b border-black text-left scroll-mt-[72px] w-full">
          <div className="grid grid-cols-1 lg:grid-cols-3 w-full border-t border-black bg-white">
            {plansData.map((p) => (
              <div key={p.id} className={`relative p-8 md:p-12 border-b lg:border-b-0 lg:border-r border-black flex flex-col min-h-fit lg:min-h-[700px] ${p.dark ? 'bg-black text-white' : 'bg-white text-black'} last:border-b-0 text-left`}>
                {p.popular && (
                  <div className="absolute top-0 right-8 md:right-12 -translate-y-1/2 bg-[#CCFF00] border-2 border-black px-4 py-1.5 text-[10px] font-black uppercase text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] whitespace-nowrap z-20">
                    {String(t.pricing.popular)}
                  </div>
                )}
                <span className={`text-[11px] font-black uppercase tracking-[0.3em] mb-6 ${p.dark ? 'text-white/40' : 'text-black/30'} text-left`}>{String(p.name)}</span>
                <div className="mb-4 text-left">
                  {p.price === 0 ? (
                    <div className={`text-6xl md:text-7xl font-black ${p.dark ? 'text-white' : 'text-black'}`}>FREE</div>
                  ) : p.price === 'CUSTOM' ? (
                    <div className={`text-6xl md:text-7xl font-black ${p.dark ? 'text-white' : 'text-black'}`}>{p.price}</div>
                  ) : (
                    <div className="flex items-baseline gap-1">
                      <span className={`text-6xl md:text-7xl font-black ${p.dark ? 'text-white' : 'text-black'}`}>{p.price.toLocaleString()}</span>
                      <span className={`text-xl font-black ${p.dark ? 'text-white' : 'text-black'}`}>{String(t.pricing.currency)}</span>
                      <span className={`text-[10px] font-bold opacity-50 ml-2 ${p.dark ? 'text-white' : 'text-black'}`}>{String(t.pricing.perMonth)}</span>
                    </div>
                  )}
                </div>
                {p.promo && (<div className="mb-4 py-1.5 px-3 bg-white/10 border border-white/20 text-[9px] font-black uppercase tracking-wider text-[#CCFF00] w-fit text-left">{String(p.promo)}</div>)}
                <p className={`text-[12px] font-semibold mb-10 text-left opacity-70 ${p.dark ? 'text-white/80' : 'text-black/60'}`}>{String(p.sub)}</p>
                <ul className={`space-y-4 mb-12 flex-grow uppercase font-bold text-[9px] ${p.dark ? 'text-white' : 'text-black'}`}>
                  {p.features.map(f => (<li key={f} className="flex items-start gap-3 text-left"><div className={`w-1.5 h-1.5 mt-1 flex-shrink-0 ${p.dark ? 'bg-[#CCFF00]' : 'bg-black'}`}></div><span className="text-left">{String(f)}</span></li>))}
                </ul>
                <button onClick={() => onConnect()} className={`w-full py-5 text-[10px] font-black uppercase border-2 transition-all cursor-pointer shadow-[6px_6px_0px_0px_rgba(0,0,0,0.1)] active:shadow-none active:translate-x-1 active:translate-y-1 ${p.dark ? 'bg-white text-black border-white hover:bg-[#CCFF00] hover:text-black' : 'bg-black text-white border-black hover:bg-[#CCFF00] hover:text-black'}`}>{p.price === 'CUSTOM' ? String(t.pricing.contact) : String(t.pricing.choose)}</button>
              </div>
            ))}
          </div>
        </section>
        
        <FooterBlock onNavigateError={() => onNavigateError()} standardPadding={standardPadding} t={t} />
      </div>
    </div>
  );
}

function BetaAccessPage({ onBack, t, lang, setLang, standardPadding }) {
  const [status, setStatus] = useState('idle'); 
  const [formData, setFormData] = useState({ brand: '', site: '', tg: '', name: '', volume: '' });
  const volumeOptions = lang === 'KO' ? ['< 200만', '200만 – 1000만', '1000만 – 5000만', '5000만+'] : ['< 2K', '2K – 10K', '10K – 50K', '50K+'];

  const handleSubmit = (e) => { 
    e.preventDefault(); 
    setStatus('processing'); 
    setTimeout(() => setStatus('success'), 1500);
  };

  return (
    <div className="min-h-screen bg-white font-sans text-black overflow-x-hidden w-full">
      <NavigationBlockMobile onNavigateHome={onBack} onConnect={null} t={t} lang={lang} setLang={setLang} standardPadding={standardPadding} isSimplified={true} />
      <main className={`pt-[72px] pb-12 md:pb-24 ${standardPadding} animate-in fade-in duration-700`}>
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start mt-8 md:mt-12 text-left text-black">
          <div className="lg:col-span-5 space-y-8 md:space-y-12 text-left">
            <div className="space-y-6 text-left">
              <div className="w-fit px-2 py-1 bg-black text-white text-[9px] font-black uppercase tracking-widest">PHASE_01_BETA</div>
              <h1 className="text-[clamp(2.5rem,15vw,6rem)] md:text-8xl font-black uppercase tracking-tighter leading-[1.1] md:leading-[0.95] text-black">JOIN THE <br /> <span className="bg-[#CCFF00] px-2 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] border-2 border-black text-black">CORE.</span></h1>
              <div className="space-y-4 pt-12 md:pt-14 text-left">
                 {t.beta.perks.map((perk, i) => (
                   <div key={i} className="flex items-center gap-3 group text-left">
                      <div className="shrink-0 w-6 h-6 border-2 border-black flex items-center justify-center bg-white group-hover:bg-[#CCFF00] transition-colors"><Check size={12} strokeWidth={3} className="text-black" /></div>
                      <span className="text-[10px] md:text-xs font-black uppercase tracking-tight opacity-80">{String(perk)}</span>
                   </div>
                 ))}
              </div>
            </div>
            <div className="hidden lg:block">
              <TelegramQRBlock t={t} />
            </div>
          </div>
          
          <div className="lg:col-span-7 text-left">
            {status === 'idle' ? (
              <>
                <div className="bg-white border-2 md:border-4 border-black p-6 md:p-12 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] md:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] text-left">
                  <form onSubmit={handleSubmit} className="space-y-8 md:space-y-10 text-left">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 text-left">
                        {[
                          { id: 'brand', label: t.beta.brand, placeholder: t.beta.placeholders.brand, icon: Building2 },
                          { id: 'site', label: t.beta.site, placeholder: t.beta.placeholders.site, icon: LinkIcon },
                          { id: 'tg', label: t.beta.tg, placeholder: t.beta.placeholders.tg, icon: UserCircle2 },
                          { id: 'name', label: t.beta.name, placeholder: t.beta.placeholders.name, icon: User },
                        ].map(field => (
                          <div key={field.id} className="space-y-3 group text-left text-black">
                            <div className="flex items-center gap-2 opacity-80 group-focus-within:opacity-100 transition-opacity">
                              <field.icon size={14} className="text-black" />
                              <label className="text-[10px] font-black uppercase tracking-widest">{String(field.label)}</label>
                            </div>
                            <input required className="w-full bg-zinc-50 border-2 border-black p-3 md:p-4 text-sm font-bold focus:bg-white focus:shadow-[4px_4px_0px_0px_rgba(204,255,0,1)] focus:outline-none transition-all placeholder:text-black/15 rounded-none text-black" placeholder={String(field.placeholder)} value={formData[field.id]} onChange={(e) => setFormData({...formData, [field.id]: e.target.value})} />
                          </div>
                        ))}
                      </div>
                      <div className="space-y-4 text-left">
                        <div className="flex items-center gap-2 opacity-80">
                          <BarChart3 size={14} className="text-black" />
                          <label className="text-[10px] font-black uppercase tracking-widest">{String(t.beta.volume)}</label>
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 md:gap-3 text-black">
                          {volumeOptions.map(val => (
                            <button key={val} type="button" onClick={() => setFormData({...formData, volume: val})} className={`py-3 text-[9px] md:text-[10px] font-black border-2 border-black transition-all ${formData.volume === val ? 'bg-black text-white' : 'bg-white text-black hover:bg-[#CCFF00]'}`}>
                              {String(val)}
                            </button>
                          ))}
                        </div>
                      </div>
                      <button type="submit" className="w-full py-5 md:py-6 bg-[#CCFF00] text-black border-2 border-black font-black uppercase text-sm md:text-base tracking-[0.2em] md:tracking-[0.3em] hover:bg-black hover:text-white transition-all group flex items-center justify-center gap-4 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
                        {String(t.beta.submit)} <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                      </button>
                  </form>
                </div>
                <div className="mt-8 lg:hidden">
                  <TelegramQRBlock t={t} />
                </div>
              </>
            ) : status === 'processing' ? (
              <div className="bg-white border-4 border-black p-8 md:p-12 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] h-full flex flex-col items-center justify-center text-center space-y-8 py-24 min-h-[400px]">
                <Loader2 size={48} className="animate-spin opacity-20 text-black mx-auto" />
                <div className="space-y-2 text-black">
                  <h3 className="text-2xl font-black uppercase tracking-tighter">Syncing...</h3>
                  <p className="text-[10px] font-black opacity-40 uppercase tracking-widest">Phase 01 Security Handshake</p>
                </div>
              </div>
            ) : (
              <div className="bg-[#CCFF00] border-4 border-black p-8 md:p-20 text-center shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] animate-in zoom-in-95 duration-500 min-h-[400px] flex flex-col justify-center items-center">
                <div className="w-20 h-20 md:w-24 md:h-24 bg-black text-[#CCFF00] rounded-full flex items-center justify-center mx-auto mb-10 shadow-[8px_8px_0px_0px_rgba(0,0,0,0.1)] text-[#CCFF00]">
                  <Check size={48} strokeWidth={4} />
                </div>
                <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter mb-4 text-black">{t.beta.success}</h2>
                <button onClick={onBack} className="px-10 py-5 bg-black text-white font-black uppercase text-[10px] tracking-[0.3em] hover:bg-white hover:text-black border-2 border-black transition-all max-w-xs mx-auto w-full text-white">
                  {String(t.notFound.back)}
                </button>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

// --- КОРНЕВОЙ КОМПОНЕНТ ---

export default function App() {
  const [page, setPage] = useState('landing'); 
  const [lang, setLang] = useState('RU'); 
  const t = translations[lang] || translations['RU'];
  const standardPadding = "px-6 sm:px-12 lg:px-16";

  const handleBack = () => { setPage('landing'); window.scrollTo({top: 0, behavior: 'auto'}); };
  const handleNavigateError = () => { setPage('404'); window.scrollTo({top: 0, behavior: 'auto'}); };
  const handleConnect = () => { setPage('beta'); window.scrollTo({top: 0, behavior: 'auto'}); };

  return (
    <div className="min-h-screen bg-white font-sans text-black overflow-x-hidden selection:bg-[#CCFF00] selection:text-black w-full">
      {page === 'landing' ? (
        <LandingContent onNavigateError={handleNavigateError} onConnect={handleConnect} t={t} lang={lang} setLang={setLang} standardPadding={standardPadding} />
      ) : page === 'beta' ? (
        <BetaAccessPage onBack={handleBack} t={t} lang={lang} setLang={setLang} standardPadding={standardPadding} />
      ) : (
        <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6 text-center animate-in zoom-in-95 duration-500">
          <div className="w-full max-w-lg space-y-12">
            <div className="relative text-black">
              <h1 className="text-[25vw] md:text-[15vw] font-black uppercase tracking-tighter leading-none opacity-10">404</h1>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full space-y-4">
                <div className="inline-block p-4 bg-black text-[#CCFF00] border-4 border-black font-black uppercase text-base md:text-xl tracking-widest text-[#CCFF00]">{String(t.notFound.denied)}</div>
                <p className="text-xs md:text-sm font-black uppercase tracking-[0.2em] text-black">{String(t.notFound.error)}</p>
              </div>
            </div>
            <button onClick={handleBack} className="px-10 py-5 bg-black text-white font-black uppercase text-[11px] tracking-[0.3em] border-2 border-black hover:bg-[#CCFF00] hover:text-black transition-all shadow-[6px_6px_0px_0px_rgba(0,0,0,0.2)] text-white">
              {String(t.notFound.back)}
            </button>
            <div className="pt-8 w-full max-w-sm mx-auto">
               <TelegramQRBlock t={t} centered={true} />
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes marqueeInfinite { 0% { transform: translateX(0); } 100% { transform: translateX(-25%); } }
        .animate-marqueeInfinite { display: flex; width: max-content; animation: marqueeInfinite 20s linear infinite; }
        @keyframes scanline { 0% { top: 0%; } 100% { top: 100%; } }
        .animate-scanline { animation: scanline 2.5s linear infinite; }
        @keyframes ping-slow { 0% { transform: scale(1); opacity: 0.5; } 100% { transform: scale(2.5); opacity: 0; } }
        .animate-ping-slow { animation: ping-slow 3s cubic-bezier(0, 0, 0.2, 1) infinite; }
        @keyframes float-slow { 0%, 100% { transform: translateY(0) scale(1); } 50% { transform: translateY(-10px) scale(1.05); } }
        .animate-float-slow { animation: float-slow 4s ease-in-out infinite; }
        html { scroll-behavior: smooth; overflow-x: hidden; width: 100vw; margin: 0; padding: 0; }
        body { overflow-x: hidden; width: 100%; margin: 0; padding: 0; box-sizing: border-box; -webkit-font-smoothing: antialiased; color: black; background: white; }
        * { box-sizing: border-box; }
        h1, h2 { hyphens: auto; word-break: break-word; overflow-wrap: break-word; }
      `}</style>
    </div>
  );
}
