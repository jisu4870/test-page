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
    title: 'MZ와 함께하는 2030 힐링여행',
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
    id: '3',
    title: '하이엔드 글램핑의 진수, 소야도 밤하늘 아래서',
    category: '숙소 리뷰',
    date: '2026.04.10',
    image: 'https://images.unsplash.com/photo-1517824806704-9040b037703b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    content: '캠핑의 낭만은 즐기고 싶지만, 잠자리나 화장실의 불편함 때문에 망설이셨나요? 그렇다면 온섬투어가 새롭게 선보이는 소야도 하이엔드 글램핑이 완벽한 해답이 될 것입니다.\n\n소야도의 한적한 해변가에 자리 잡은 이 글램핑장은 텐트라는 이름이 무색할 정도로 완벽한 시설을 갖추고 있습니다. 문을 열고 들어서면 가장 먼저 5성급 호텔에서나 볼 수 있는 킹사이즈 베드와 구스다운 침구가 눈에 띄며, 은은한 조명과 고급스러운 원목 가구들이 아늑한 분위기를 자아냅니다. 텐트 내부에 개별 샤워실과 화장실, 심지어 어메니티로 조말론(Jo Malone) 제품이 비치되어 있어 놀라움을 금치 못했습니다.\n\n하이라이트는 해가 진 후 시작됩니다. 프라이빗 데크에 마련된 화로대에 불이 피워지고, 전담 스태프가 최고급 투뿔 한우와 소야도 앞바다에서 갓 잡은 신선한 해산물로 바비큐를 준비해 줍니다. 와인 잔을 부딪치며 고기를 맛보는 사이, 하늘에는 도심에서는 볼 수 없었던 수많은 별들이 쏟아질 듯 빛납니다.\n\n파도 소리를 자장가 삼아 잠들고, 텐트 틈새로 스며드는 아침 햇살에 눈을 뜨는 경험. 그리고 데크로 배달된 따뜻한 커피와 크루아상으로 시작하는 아침은 일상의 스트레스를 완벽하게 씻어내 주었습니다. 진정한 휴식과 자연 속의 럭셔리를 원하신다면, 소야도 하이엔드 글램핑을 강력히 추천합니다.'
  },
  {
    id: '4',
    title: '나랑 별 보러 가지 않을래~, 별별투어',
    category: '테마 여행',
    date: '2026.04.15',
    image: 'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    content: '도심의 불빛에 가려진 밤하늘의 진짜 주인공들을 만나러 떠나는 온섬투어만의 특별한 야간 테마 여행, \'별별투어\'를 소개합니다.\n\n인공적인 빛이 거의 없는 섬의 밤은 우주를 마주하기에 가장 완벽한 장소입니다. 온섬투어는 천문 전문가와 함께하는 별자리 해설 서비스를 제공합니다. 그리스 신화 속 별자리 이야기부터 스마트폰으로 은하수를 촬영하는 방법까지, 밤하늘이 주는 감동을 온전히 느껴보세요.\n\n특히 덕적도의 비조봉 정상이나 소야도의 한적한 해변은 별 관측의 명소로 꼽힙니다. 돗자리에 누워 쏟아질 듯한 별들을 바라보며 듣는 감성적인 음악은 잊지 못할 추억을 선사할 것입니다. 사랑하는 사람과 함께 "나랑 별 보러 가지 않을래?"라는 말 한마디로 시작하는 로맨틱한 밤, 온섬투어가 준비해 드립니다.'
  },
  {
    id: '5',
    title: '할머니 밥상이 그리울 땐 00민박으로!',
    category: '섬 생활',
    date: '2026.04.15',
    image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    content: '화려한 호텔 조식보다 때로는 투박하지만 정성이 가득 담긴 할머니의 손맛이 그리울 때가 있습니다. 섬마을 골목길 어귀, 정겨운 인심이 살아있는 민박집에서의 하루를 추천합니다.\n\n섬에서 나고 자란 할머니가 직접 캐온 나물과 아침에 갓 잡아 올린 생선으로 차려진 밥상은 그 자체로 보약입니다. 조미료 하나 없이 오직 시간과 정성으로 맛을 낸 된장찌개 한 그릇에 마음까지 따뜻해집니다.\n\n좁은 방이지만 뽀송뽀송하게 햇볕에 말린 이불에서 나는 향기, 마당 평상에 앉아 나누는 소소한 이야기들은 지친 현대인들에게 가장 필요한 \'쉼\'이 아닐까요? 세련되지는 않았지만 따뜻한 정이 넘치는 섬마을 민박 투어, 온섬투어가 엄선한 최고의 민박집들을 만나보세요.'
  },
  {
    id: '6',
    title: '기억될 역사 3.1운동 <덕적도편>',
    category: '역사 탐방',
    date: '2026.04.15',
    image: 'https://images.unsplash.com/photo-1590073844006-33379778ae09?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    content: '아름다운 풍경 뒤에 숨겨진 우리 섬의 뜨거웠던 역사를 되짚어보는 시간입니다. 1919년, 전국을 뒤덮었던 만세의 함성은 이곳 덕적도에서도 울려 퍼졌습니다.\n\n덕적도 3.1운동은 섬 주민들이 주도적으로 참여하여 일제의 탄압에 맞선 자랑스러운 역사입니다. 당시 만세 운동이 일어났던 장소들을 따라 걷는 역사 탐방 코스는 아이들에게는 살아있는 교육의 장이 되고, 어른들에게는 나라 사랑의 의미를 되새기는 소중한 기회가 됩니다.\n\n온섬투어는 전문 역사 가이드와 함께 덕적도 곳곳에 남아있는 항일 유적지를 방문하고, 당시의 긴박했던 상황을 생생하게 전달해 드립니다. 풍경을 즐기는 여행을 넘어, 우리 땅의 뿌리를 기억하는 뜻깊은 여정에 함께해 주세요.'
  },
  {
    id: '7',
    title: '소야9경, 200% 즐기기',
    category: '여행 팁',
    date: '2026.04.15',
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    content: '소야도에 왔다면 반드시 봐야 할 9가지 절경, \'소야9경\'을 알고 계신가요? 온섬투어가 제안하는 소야9경 완벽 정복 가이드입니다.\n\n첫 번째는 물때가 맞아야만 볼 수 있는 \'모세의 기적\' 바닷길입니다. 소야도와 인근 섬들이 하나로 연결되는 신비로운 광경은 자연의 경이로움을 느끼게 합니다. 두 번째는 기암괴석이 장관을 이루는 \'장군바위\'입니다. 마치 섬을 지키는 장군처럼 늠름한 자태를 뽐내죠.\n\n이 외에도 떼뿌루 해수욕장의 울창한 송림, 죽노골의 투명한 바다 등 소야도 곳곳에는 숨은 보석 같은 명소들이 가득합니다. 온섬투어의 전용 전동 카트를 이용하면 하루 만에 소야9경을 모두 편안하게 둘러볼 수 있습니다. 각 명소마다 숨겨진 전설과 이야기를 들으며 소야도의 매력에 푹 빠져보세요.'
  },
  {
    id: '8',
    title: '도깨비도 헷갈릴 만한 그곳, 북리등대',
    category: '섬 명소',
    date: '2026.04.15',
    image: 'https://images.unsplash.com/photo-1516466723877-e4ec1d736c8a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    content: '덕적도의 북쪽 끝자락, 거친 파도와 바람을 견디며 묵묵히 자리를 지키고 있는 빨간 등대 하나가 있습니다. 바로 \'북리등대\'입니다.\n\n이곳은 이름처럼 도깨비가 나타날 것만 같은 신비로운 분위기를 자아냅니다. 등대로 향하는 길목에는 기암괴석들이 늘어서 있고, 등대 앞에 서면 끝없이 펼쳐진 서해의 망망대해를 마주하게 됩니다. 특히 해 질 녘, 붉게 타오르는 노을과 등대의 빨간색이 어우러지는 풍경은 말로 표현할 수 없는 감동을 선사합니다.\n\n북리등대는 낚시꾼들 사이에서도 포인트로 유명하지만, 최근에는 조용한 사색과 인생 사진을 남기려는 여행객들의 발길이 끊이지 않고 있습니다. 온섬투어와 함께 덕적도의 숨은 비경, 북리등대에서 일상의 번잡함을 잠시 잊고 바다의 소리에 귀를 기울여보세요.'
  }
];

const defaultSettings: SiteSettings = {
  heroTitle: '당신만을 위한 특별한 섬여행,',
  heroSubtitle: '섬여행은 온섬투어',
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
