import React, { createContext, useContext, useState } from 'react';

export interface TourPackage {
  id: string;
  title: string;
  island: string;
  duration: string;
  price: number;
  image: string;
  gallery?: string[];
  description: string;
  ferryInfo?: string;
  itinerary: { day: number; title: string; description: string }[];
}

export interface MagazinePost {
  id: string;
  title: string;
  category: string;
  date: string;
  image: string;
  content: string;
}

export interface SiteSettings {
  heroTitle: string;
  heroSubtitle: string;
  heroImage: string;
  contactEmail: string;
  contactPhone: string;
}

interface AppContextType {
  packages: TourPackage[];
  setPackages: React.Dispatch<React.SetStateAction<TourPackage[]>>;
  magazines: MagazinePost[];
  setMagazines: React.Dispatch<React.SetStateAction<MagazinePost[]>>;
  settings: SiteSettings;
  setSettings: React.Dispatch<React.SetStateAction<SiteSettings>>;
}

const defaultPackages: TourPackage[] = [
  {
    id: '1',
    title: '프라이빗 요트와 함께하는 덕적도 힐링 투어',
    island: '덕적도',
    duration: '1박 2일',
    price: 1250000,
    image: 'https://images.unsplash.com/photo-1559128010-7c1ad6e1b6a5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1599640842225-85d111c60e6b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1512100356356-de1b84283e18?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    ],
    description: '서해의 보석 덕적도에서 프라이빗 요트를 타고 즐기는 완벽한 1박 2일 휴식입니다.\n\n오직 두 분만을 위한 럭셔리 요트가 준비되어 있습니다. 에메랄드빛 바다를 가르며 나아가는 동안, 전담 버틀러가 최고급 샴페인과 캐비어를 서빙합니다. 번잡한 일상에서 벗어나 파도 소리와 바람에 온전히 몸을 맡겨보세요.\n\n숙소는 덕적도 최고의 오션뷰를 자랑하는 프라이빗 풀빌라로 배정되며, 전 일정 미슐랭 스타 출신 셰프의 다이닝이 제공됩니다. 진정한 VVIP만을 위한 온섬투어의 시그니처 패키지입니다.',
    ferryInfo: '출항: 인천항 연안여객터미널 오전 09:00 출발 (코리아나호, 약 1시간 10분 소요)\n입항: 덕적도 진리선착장 오후 15:30 출발 (인천항 16:40 도착 예정)\n* VIP 전용 패스트트랙 수속 및 라운지 이용이 포함되어 있습니다.',
    itinerary: [
      { day: 1, title: '프라이빗 라운지 미팅 및 요트 탑승', description: '08:00 인천항 VIP 라운지에서 미팅 및 수속.\n09:00 덕적도행 쾌속선 탑승.\n10:30 덕적도 도착 후 프라이빗 요트로 환승 및 웰컴 드링크 제공.\n12:00 선상 셰프 특선 런치.\n15:00 오션뷰 풀빌라 체크인 및 휴식.\n18:00 선셋을 바라보며 즐기는 프라이빗 바비큐 디너.' },
      { day: 2, title: '해안 둘레길 산책 및 아쉬운 작별', description: '09:00 인룸 다이닝 조식.\n10:30 덕적도 해안 둘레길 전동 카트 투어 및 서포리 해수욕장 산책.\n13:00 현지 해산물 한정식 런치.\n15:00 진리선착장으로 이동 및 수속.\n15:30 덕적도 출발.\n16:40 인천항 도착 및 리무진 샌딩 서비스.' }
    ]
  },
  {
    id: '2',
    title: '소야도 하이엔드 감성 캠핑 & 트레킹',
    island: '소야도',
    duration: '1박 2일',
    price: 520000,
    image: 'https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1504280088900-859134586321?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    ],
    description: '때묻지 않은 자연을 간직한 소야도에서의 프리미엄 글램핑 1박 2일 패키지입니다.\n\n쏟아지는 별빛 아래, 자연과 완벽하게 동화되는 하이엔드 글램핑을 경험하세요. 일반 캠핑의 불편함을 모두 없앤 5성급 호텔 수준의 구스다운 침구, 개별 욕실, 그리고 프라이빗 데크가 준비되어 있습니다.\n\n낮에는 소야도의 아름다운 해안선을 따라 걷는 힐링 트레킹을 즐기고, 밤에는 타닥타닥 타오르는 모닥불 앞에서 최고급 한우 바비큐와 불멍의 시간을 가질 수 있습니다.',
    ferryInfo: '출항: 인천 대부도 방아머리 선착장 오전 08:40 출발 (대부고속훼리, 약 1시간 40분 소요)\n입항: 소야도 선착장 오후 14:20 출발 (방아머리 16:00 도착 예정)\n* 차량 선적이 필요한 경우 사전 예약 필수 (패키지 외 별도 요금)',
    itinerary: [
      { day: 1, title: '소야도 트레킹 및 하이엔드 글램핑', description: '08:00 방아머리 선착장 미팅.\n08:40 소야도행 카페리 탑승.\n10:30 소야도 도착 및 전담 가이드 미팅.\n11:00 떼뿌루 해수욕장 및 해안선 트레킹 (약 2시간 소요).\n13:00 현지 해산물로 만든 건강한 자연식 런치.\n15:00 프리미엄 글램핑장 체크인 및 자유 시간.\n18:00 프라이빗 데크에서 즐기는 최고급 한우 바비큐 파티 및 캠프파이어.' },
      { day: 2, title: '일출 감상 및 모닝 커피', description: '06:30 바다 위로 떠오르는 일출 감상 (선택 사항).\n08:30 텐트 앞으로 서빙되는 아메리칸 브렉퍼스트와 핸드드립 커피.\n10:00 해변 산책 및 자유 시간.\n12:00 체크아웃 및 현지식 런치.\n13:30 선착장으로 이동.\n14:20 소야도 출발 및 귀가.' }
    ]
  },
  {
    id: '3',
    title: '울릉도 럭셔리 크루즈 & 리조트 투어',
    island: '울릉도',
    duration: '1박 2일',
    price: 1400000,
    image: 'https://images.unsplash.com/photo-1610017810004-a6f3c531df34?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1596395819057-cb31a1532050?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1540156006454-b0542387114b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    ],
    description: '신비의 섬 울릉도를 가장 알차고 고급스럽게 여행하는 1박 2일 VIP 전용 패키지입니다.\n\n멀고 험한 울릉도 가는 길을 VIP 전용 대형 쾌속 크루즈의 스위트 객실로 편안하게 모십니다. 숙소는 세계적인 건축 디자인 상을 수상한 울릉도 최고의 럭셔리 리조트 \'코스모스\'로 배정됩니다.\n\n짧은 일정이지만 전문 해설 가이드와 고급 세단이 배정되어 프라이빗하게 울릉도의 핵심 명소를 모두 둘러볼 수 있습니다. 식사 역시 울릉도 특산물인 독도 새우, 울릉 약소 등을 활용한 최고급 파인 다이닝으로 구성됩니다.',
    ferryInfo: '출항: 포항 영일만항 오전 08:00 출발 (울릉크루즈 스위트룸, 약 3시간 30분 소요)\n입항: 울릉도 사동항 오후 15:30 출발 (포항 19:00 도착 예정)\n* 기상 악화 시 결항될 수 있으며, 이 경우 전액 환불 또는 일정 변경이 가능합니다.',
    itinerary: [
      { day: 1, title: 'VIP 크루즈 탑승 및 울릉도 핵심 투어', description: '07:30 포항 영일만항 VIP 라운지 이용.\n08:00 울릉크루즈 스위트 객실 탑승.\n11:30 울릉도 사동항 도착 및 전용 세단 픽업.\n12:30 나리분지 전통 식당에서 산채 비빔밥 특식.\n14:00 거북바위, 태하 모노레일 탑승 및 대풍감 절경 감상.\n16:30 럭셔리 리조트 코스모스 체크인 및 웰컴 티타임.\n19:00 리조트 레스토랑에서 즐기는 울릉 약소 및 독도 새우 파인 다이닝.' },
      { day: 2, title: '관음도 트레킹 및 아쉬운 작별', description: '08:00 리조트 조식 후 체크아웃.\n09:30 관음도 연도교 트레킹 및 천부 해중전망대 관람.\n12:00 활어회 스페셜 런치.\n13:30 해안도로 드라이브 및 특산물 쇼핑 타임.\n15:00 사동항으로 이동 및 수속.\n15:30 울릉도 출발.\n19:00 포항 영일만항 도착 및 리무진 샌딩 서비스로 일정 종료.' }
    ]
  }
];

const defaultMagazines: MagazinePost[] = [
  {
    id: '1',
    title: '2026년 봄, 꼭 가봐야 할 국내 섬 여행지 BEST 5',
    category: '여행 팁',
    date: '2026.03.15',
    image: 'https://images.unsplash.com/photo-1506461883276-594540eb36cb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    content: '봄바람이 살랑이는 계절, 복잡한 도심을 떠나 조용한 섬으로 떠나보는 건 어떨까요? 온섬투어가 추천하는 올봄 최고의 섬 여행지 5곳을 소개합니다.\n\n1. 청산도 (전남 완도군)\n아시아 최초의 슬로시티로 지정된 청산도는 봄이 되면 섬 전체가 노란 유채꽃과 푸른 청보리밭으로 물듭니다. 구불구불한 돌담길을 따라 천천히 걷다 보면 어느새 마음의 평화를 얻게 됩니다. 영화 \'서편제\'의 촬영지로도 유명한 이곳에서 느림의 미학을 경험해 보세요.\n\n2. 선유도 (전북 군산시)\n신선이 노닐던 섬이라는 이름답게 빼어난 절경을 자랑합니다. 고운 모래가 십 리에 걸쳐 있다는 명사십리 해수욕장은 봄철 산책 코스로 제격입니다. 자전거를 대여해 섬 구석구석을 누비며 시원한 바닷바람을 맞아보세요.\n\n3. 보길도 (전남 완도군)\n조선시대 문신 윤선도가 여생을 보낸 곳으로 유명한 보길도는 고즈넉한 아름다움이 있는 섬입니다. 세연정, 동천석실 등 윤선도의 발자취를 따라 걷다 보면 마치 조선시대로 시간 여행을 떠난 듯한 기분을 느낄 수 있습니다.\n\n4. 비진도 (경남 통영시)\n산호빛 바다와 은빛 모래사장이 매력적인 비진도는 \'미인도\'라고도 불립니다. 두 개의 섬이 좁은 모래사장으로 연결된 독특한 지형을 가지고 있으며, 선유봉에 오르면 비진도의 환상적인 파노라마 뷰를 감상할 수 있습니다.\n\n5. 덕적도 (인천 옹진군)\n수도권에서 비교적 쉽게 접근할 수 있는 덕적도는 울창한 소나무 숲과 맑은 바다가 어우러진 서해의 진주입니다. 서포리 해수욕장의 고운 모래를 밟으며 산책하거나, 비조봉에 올라 서해의 수많은 섬들을 조망해 보는 것을 추천합니다.'
  },
  {
    id: '2',
    title: '프라이빗 요트 투어, 200% 완벽하게 즐기는 방법',
    category: '인사이드 온섬',
    date: '2026.04.02',
    image: 'https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    content: '온섬투어의 시그니처 상품인 프라이빗 요트 투어. 많은 분들의 버킷리스트이기도 한 이 특별한 경험을 어떻게 하면 더욱 완벽하게 즐길 수 있을까요? 온섬투어의 수석 버틀러가 전하는 요트 투어 꿀팁을 공개합니다.\n\n첫째, 매직 아워(Magic Hour)를 절대 놓치지 마세요.\n바다 위에서 붉게 물드는 노을을 감상하는 것은 요트 투어의 하이라이트입니다. 해가 지기 1시간 전부터 해가 진 후 30분까지, 하늘이 시시각각 변하는 마법 같은 시간을 데크의 선베드에 누워 온전히 감상해 보세요. 이때 제공되는 샴페인 한 잔은 분위기를 더욱 로맨틱하게 만들어 줍니다.\n\n둘째, 셰프의 선상 다이닝을 적극적으로 커스터마이징 하세요.\n온섬투어의 프라이빗 요트 투어에는 전담 셰프가 동승합니다. 사전에 알레르기 유무는 물론, 특별히 선호하는 식재료나 조리법, 페어링하고 싶은 와인 리스트를 전달해 주시면 오직 고객님만을 위한 맞춤형 코스 요리가 탄생합니다. 바다 위에서 맛보는 갓 잡은 해산물 요리는 미슐랭 레스토랑 부럽지 않습니다.\n\n셋째, 나만의 플레이리스트를 미리 준비하세요.\n최고급 하만카돈 블루투스 스피커가 요트 곳곳에 설치되어 있습니다. 잔잔한 파도 소리와 함께 들을 재즈, 신나는 해양 스포츠를 즐길 때 어울리는 트로피컬 하우스 등 상황에 맞는 음악을 미리 준비해 오시면 분위기를 한층 더 끌어올릴 수 있습니다.\n\n마지막으로, 드론 촬영 서비스를 적극 활용하세요.\n망망대해 위, 하얀 요트에서 여유를 즐기는 모습은 영화 속 한 장면 같습니다. 온섬투어에서 제공하는 전문 드론 촬영 서비스를 통해 평생 간직할 인생샷과 영상을 남겨보세요.'
  },
  {
    id: '3',
    title: '하이엔드 글램핑의 진수, 소야도 밤하늘 아래서',
    category: '숙소 리뷰',
    date: '2026.04.10',
    image: 'https://images.unsplash.com/photo-1517824806704-9040b037703b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    content: '캠핑의 낭만은 즐기고 싶지만, 잠자리나 화장실의 불편함 때문에 망설이셨나요? 그렇다면 온섬투어가 새롭게 선보이는 소야도 하이엔드 글램핑이 완벽한 해답이 될 것입니다.\n\n소야도의 한적한 해변가에 자리 잡은 이 글램핑장은 텐트라는 이름이 무색할 정도로 완벽한 시설을 갖추고 있습니다. 문을 열고 들어서면 가장 먼저 5성급 호텔에서나 볼 수 있는 킹사이즈 베드와 구스다운 침구가 눈에 띄며, 은은한 조명과 고급스러운 원목 가구들이 아늑한 분위기를 자아냅니다. 텐트 내부에 개별 샤워실과 화장실, 심지어 어메니티로 조말론(Jo Malone) 제품이 비치되어 있어 놀라움을 금치 못했습니다.\n\n하이라이트는 해가 진 후 시작됩니다. 프라이빗 데크에 마련된 화로대에 불이 피워지고, 전담 스태프가 최고급 투뿔 한우와 소야도 앞바다에서 갓 잡은 신선한 해산물로 바비큐를 준비해 줍니다. 와인 잔을 부딪치며 고기를 맛보는 사이, 하늘에는 도심에서는 볼 수 없었던 수많은 별들이 쏟아질 듯 빛납니다.\n\n파도 소리를 자장가 삼아 잠들고, 텐트 틈새로 스며드는 아침 햇살에 눈을 뜨는 경험. 그리고 데크로 배달된 따뜻한 커피와 크루아상으로 시작하는 아침은 일상의 스트레스를 완벽하게 씻어내 주었습니다. 진정한 휴식과 자연 속의 럭셔리를 원하신다면, 소야도 하이엔드 글램핑을 강력히 추천합니다.'
  }
];

const defaultSettings: SiteSettings = {
  heroTitle: '당신만을 위한 특별한 섬 여행, 온섬투어',
  heroSubtitle: '일상의 번잡함에서 벗어나, 오직 당신에게만 허락된 프라이빗한 휴식을 경험하세요.',
  heroImage: 'https://images.unsplash.com/photo-1505118380757-91f5f5632de0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80',
  contactEmail: 'help@OnIslandTour.com',
  contactPhone: '032-540-0280'
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [packages, setPackages] = useState<TourPackage[]>(defaultPackages);
  const [magazines, setMagazines] = useState<MagazinePost[]>(defaultMagazines);
  const [settings, setSettings] = useState<SiteSettings>(defaultSettings);

  return (
    <AppContext.Provider value={{ packages, setPackages, magazines, setMagazines, settings, setSettings }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
