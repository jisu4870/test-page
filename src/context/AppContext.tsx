import React, { createContext, useContext, useState } from 'react';

export interface TourPackage {
  id: string;
  title: string;
  island: string;
  duration: string;
  price: number;
  image: string;
  status?: '모집중' | '마감임박' | '특가' | 'BEST';
  category?: '힐링' | '역사' | '가족' | '럭셔리' | '트레킹';
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
  recentlyViewed: string[];
  addRecentlyViewed: (id: string) => void;
}

const defaultPackages: TourPackage[] = [
  {
    id: '1',
    title: '삼시세끼 in 덕적 소야',
    island: '덕적도',
    duration: '1박 2일',
    price: 161000,
    image: 'https://isum.incheon.go.kr/resource/www/images/sub/img_island_info21.jpg',
    status: 'BEST',
    category: '힐링',
    gallery: [
      'https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1599640842225-85d111c60e6b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1512100356356-de1b84283e18?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    ],
    description: '덕적도와 소야도의 정취를 만끽하며 즐기는 "삼시세끼" 힐링 투어입니다. 소야 9경 스탬프 투어부터 덕적 8경 투어까지, 섬의 속살을 깊숙이 들여다보는 알찬 여정을 준비했습니다. 선택형 관광 및 식사를 통해 나만의 스타일로 여행을 완성해보세요.',
    ferryInfo: '출항: 인천항 연안여객터미널 오전 08:30 출발 (옹진훼미리호, 약 1시간 10분 소요)\n입항: 덕적도 진리선착장 및 소야도 선착장 이용',
    itinerary: [
      { 
        day: 1, 
        title: '인천항 출발 및 소야 9경 투어', 
        description: '[08:00~09:10] 인천 연안여객터미널 ~ 덕적도 진리선착장\n[오전 일정] 소야 9경 투어버스 탑승 및 소야도 이동\n소야 9경 스탬프 투어 (4경 모세의 기적)\n[중식 시간] 소야랑 카페 로컬 브런치 or 김굴국밥 (선택형 식사)\n[오후 일정] 소야 9경 스탬프 투어 (7경 곰바위/막끝)\n[석식 시간] 회정식\n[야간 일정] 소야 9경 스탬프 투어 (2경 죽노골 청사초롱 투어)\n소야 9경 투어버스 탑승 및 덕적도 이동\n밧지름 or 떼뿌루 해변 별별 투어 (선택형 관광)\n[개별 자유] 숙소: 덕적도 365아일랜드 팬션 or 떼뿌루 야영장 (선택형 숙박)' 
      },
      { 
        day: 2, 
        title: '덕적 8경 투어 및 호박회관 체험', 
        description: '[08:00~] 체크아웃 후 아침식사\n[오전 일정] 덕적 8경 투어 버스 탑승\n덕적 8경 투어 or 비조봉 트레킹 (선택형 관광)\n[중식 시간] 간재미 정식\n[오후 일정] 호박회관 체험 해당화 (릴렉싱 향초 만들기 or 단호박 막걸리 만들기) (선택형 관광)\n[16:00~17:10] 덕적도 출도 (덕적도 진리 선착장 ~ 인천 연안 여객 터미널)' 
      }
    ]
  },
  {
    id: '2',
    title: '시간 탐험대: 소야덕적 조각의 비밀!',
    island: '소야도',
    duration: '1박 2일',
    price: 158000,
    image: 'https://img1.daumcdn.net/thumb/R658x0.q70/?fname=https://t1.daumcdn.net/news/202508/27/speaktravel/20250827140002969nwhf.jpg',
    status: '특가',
    category: '가족',
    gallery: [
      'https://images.unsplash.com/photo-1504280088900-859134586321?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    ],
    description: '소야도와 덕적도에 숨겨진 역사의 조각과 자연의 아름다움을 찾아 떠나는 가족형 에듀 투어 패키지입니다.\n\n3.1운동의 뜨거운 열기와 섬의 수호자 최분도 신부님의 공헌을 되새기는 역사 탐방부터, 신비로운 바닷길과 아름다운 노송숲 산책까지 알차게 구성되었습니다. 조개껍데기 채집과 도자기 체험, 단호박잼 만들기 등 아이들을 위한 퍼즐 미션형 체험 프로그램이 가득합니다.\n\n파도 소리와 별빛이 함께하는 소야도에서 우리 가족만의 소중한 비밀 조각을 모아보세요!',
    ferryInfo: '출항: 인천항 연안여객터미널 오전 08:30 출발 (옹진훼미리호, 약 1시간 10분 소요)\n입항: 덕적도 진리선착장 및 소야도 선착장 이용',
    itinerary: [
      { 
        day: 1, 
        title: '덕적도 입도 및 소야도 감성 체험', 
        description: '[08:00~09:10] 덕적도 입도 (인천 연안 여객 터미널 ~ 덕적도 진리 선착장)\n[오전 일정] 투어버스 탑승 후 소야도로 이동\n모세의 기적 (조개껍데기 채집)\n[중식 시간] 소야랑 카페\n[오후 일정] 떼뿌루 해변 피크닉\n소야량 도자기 체험 (소야도만의 조개 스탬프 도자기)\n[석식 시간] 회나라 식당\n[야간 일정] 밧지름 해수욕장으로 이동 및 별별투어' 
      },
      { 
        day: 2, 
        title: '역사 탐방과 퍼즐 미션 투어', 
        description: '[08:00~] 체크아웃 및 조식 * 바다향기 식당\n[오전 일정] 서포리해변 노송숲 산책, 최분도 신부 공덕비(퍼즐미션)\n덕적도성당(퍼즐미션 및 인형극 관람)\n밧지름 해변으로 이동, 3.1운동탑, 충훈탑(퍼즐미션)\n[중식 시간] 간재미 정식\n[오후 일정] 북리등대(퍼즐미션)\n호박회관 체험(단호박잼 만들기)\n[16:00~17:10] 덕적도 출도 (덕적도 진리 선착장 ~ 인천 연안 여객 터미널)' 
      }
    ]
  },
  {
    id: '7',
    title: '소야도 부모님 환갑/칠순 기념 명품 효도 투어',
    island: '소야도',
    duration: '1박 2일',
    price: 165000,
    image: 'https://isum.incheon.go.kr/resource/www/images/sub/img_island_info22.jpg',
    category: '힐링',
    description: '부모님께 잊지 못할 감동을 선물하는 소야도 프리미엄 효도 패키지입니다.\n\n전동 카트를 이용한 편안한 섬 일주와 무릎에 무리가 가지 않는 완만한 해안 데크 산책로 투어가 포함되어 있습니다. 숙소는 소야도에서 가장 전망 좋은 고급 펜션의 특실로 배정되며, 전 일정 제철 보양 해산물 정식과 울릉도 약소에 버금가는 한우 대접이 이루어집니다.\n\n전문 사진작가의 스냅 촬영 서비스가 포함되어 부모님의 고운 모습을 액자에 담아 보내드립니다. 자녀분들의 마음을 그대로 담아 정성껏 모시겠습니다.',
    ferryInfo: '출항: 인천 대부도 방아머리 선착장 오전 08:40 출발 (대부고속훼리, 약 1시간 40분 소요)\n입항: 소야도 선착장 오후 14:20 출발 (방아머리 16:00 도착 예정)\n* 거동이 불편하신 경우 전용 휠체어 및 보조 기구 대여가 가능합니다.',
    itinerary: [
      { day: 1, title: '전동 카트 섬 투어 및 스냅 촬영', description: '08:00 방아머리 선착장 VIP 의전 미팅.\n08:40 소야도행 카페리 (특등실 이용).\n10:30 소야도 도착 및 가이드 영접.\n12:00 전복 삼계탕 보양 런치.\n14:00 전동 카트 이용 소야 9경 투어 및 전문 작가 스냅 촬영.\n16:00 오션뷰 특별실 체크인 및 휴식.\n18:00 제철 회 정식과 한우 구이로 즐기는 축하 만찬.' },
      { day: 2, title: '해안 산책 및 특산물 건강 밥상', description: '09:00 전복죽 조식.\n10:30 평탄한 해안 데크 길 가벼운 산책.\n12:00 소야도 자연산 나물과 생선구이 정식.\n13:30 선착장 이동 및 귀환.' }
    ]
  },
  {
    id: '3',
    title: '울릉도 럭셔리 크루즈 & 리조트 투어',
    island: '울릉도',
    duration: '1박 2일',
    price: 168000,
    image: 'https://images.unsplash.com/photo-1610017810004-a6f3c531df34?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    status: '마감임박',
    category: '럭셔리',
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
  },
  {
    id: 'baeng-1',
    title: '[신의 조각품] 백령도 3일',
    island: '백령도',
    duration: '2박 3일',
    price: 265000,
    image: 'https://isum.incheon.go.kr/resource/www/images/sub/img_island_info18.jpg',
    category: '역사',
    gallery: [
      'https://images.unsplash.com/photo-1596395819057-cb31a1532050?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1544551763-46a013bb70d5?q=80&w=1000&auto=format&fit=crop'
    ],
    description: '서해 최북단의 비경, 백령도를 가장 깊이 있게 만나는 2박 3일 일정입니다. 유람선을 타고 감상하는 두무진의 기암괴석과 세계 유일의 사곶 천연 비행장, 그리고 자장가 같은 파도 소리의 콩돌 해변까지 백령도의 진수를 경험하세요.',
    ferryInfo: '출항: 인천항 연안여객터미널 오전 07:50 출발 (프린세스호/하모니플라워호)\n입항: 백령도 용기포항 오후 13:00 출발\n* 기상 상황에 따라 선박 시간이 변동될 수 있습니다.',
    itinerary: [
      { day: 1, title: '인천항 출발 및 백령도 입도', description: '인천항 연안여객터미널 미팅 및 선박 탑승. 백령도 도착 후 가이드 미팅. 사곶 천연비행장 산책 및 심청각 관람. 현지 해산물 정식 석식.' },
      { day: 2, title: '두무진 비경 및 기암괴석 탐방', description: '조식 후 두무진 이동. 유람선 탑승하여 선대암, 형제바위 등 기암절벽 관람. 두무진 도보 트레킹 및 콩돌해변 산책. 백령도 명물 냉면 특식.' },
      { day: 3, title: '중촌포구 및 아쉬운 이별', description: '조식 후 중촌포구 및 용기포 해수욕장 관람. 특산물 판매장 방문. 용기포항 이동 및 선박 탑승. 인천항 도착 및 해산.' }
    ]
  },
  {
    id: 'dae-1',
    title: '[환상의 섬] 대청도 3일',
    island: '대청도',
    duration: '2박 3일',
    price: 245000,
    image: 'https://isum.incheon.go.kr/atch/getImg.do?upKey=themeDelegate&lnkgSn=2408050008&ordr=1',
    category: '트레킹',
    gallery: [
      'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?q=80&w=1000&auto=format&fit=crop'
    ],
    description: '한국의 사하라라 불리는 신비로운 옥죽동 모래 사막과 서해 최고의 트레킹 코스인 서풍받이를 품은 대청도 여행입니다. 때 묻지 않은 순수한 자연과 웅장한 기암절벽이 조화를 이루는 대청도에서 진정한 휴식을 찾아보세요.',
    ferryInfo: '출항: 인천항 연안여객터미널 오전 07:50 출발\n입항: 대청도 선진포항 오후 13:30 출발\n* 대청도는 백령도행 선박이 경유하는 섬입니다.',
    itinerary: [
      { day: 1, title: '인천항 출발 및 대청도 입도', description: '인천항 선박 탑승 및 대청도 도착. 가이드 미팅 및 중식. 옥죽동 모래사막(한국의 사하라) 탐방 및 농여해변 미인송 관람.' },
      { day: 2, title: '서풍받이 명품 트레킹', description: '조식 후 서풍받이 탐방로 이동. 조각바위, 사자바위 등 해안 절경 트레킹(약 2시간). 모레을 해수욕장 및 모래울 기압절벽 관람. 현지식 특선 석식.' },
      { day: 3, title: '모릉 Peak 및 이별의 선진포구', description: '조식 후 모릉 Peak 전망대 관람 및 대청도 전경 감상. 선진포구 산책 및 쇼핑. 대청도 출발 및 인천항 도착.' }
    ]
  },
  {
    id: 'di-1',
    title: '[신비의 풀등] 대이작도 힐링 탐방',
    island: '대이작도',
    duration: '1박 2일',
    price: 145000,
    image: 'https://isum.incheon.go.kr/resource/www/images/sub/img_island_info11.jpg',
    category: '힐링',
    description: '썰물 때만 모습을 드러내는 거대한 모래섬 "풀등"을 품은 신비의 섬, 대이작도 여행입니다. 영화 "섬마을 선생님"의 배경이 된 정겨운 마을 풍경과 맑은 바다, 그리고 울창한 솔숲이 어우러진 대이작도에서 진정한 여유를 만끽해 보세요.',
    itinerary: [
      { day: 1, title: '대이작도 입도 및 신비의 풀등 체험', description: '인천항 출발 및 대이작도 도착. 가이드 미팅 및 중식. 선박 탑승하여 썰물 때 나타나는 모래섬 "풀등" 상륙 및 산책. 오션뷰 숙소 체크인 및 해안 산책로 투어.' },
      { day: 2, title: '작은풀안 해변 및 산책', description: '조식 후 작은풀안 해변 산책 및 부아산 전망대 관람. 마을 한바퀴 투어 및 중식. 대이작도 출발 및 인천항 복귀.' }
    ]
  },
  {
    id: 'yh-1',
    title: '[수도권 근교] 영흥도 십리포 & 목섬 감성 투어',
    island: '영흥도',
    duration: '1박 2일',
    price: 135000,
    image: 'https://isum.incheon.go.kr/resource/www/images/sub/img_island_info28.jpg',
    category: '힐링',
    description: '수도권에서 다리로 연결되어 접근성이 뛰어나면서도 섬의 정취를 가득 품은 영흥도 여행입니다. 수백 년 된 소사나무 군락이 장관인 십리포 해변과 선재도의 신비로운 목섬 바닷길 산책까지, 일상의 스트레스를 날려버릴 감성 충만한 여정을 선사합니다.',
    itinerary: [
      { day: 1, title: '영흥도 입성 및 십리포 산책', description: '개별 차량 또는 픽업 차량으로 영흥도 도착. 십리포 해수욕장 소사나무 군락지 산책 및 휴식. 해변가 맛집에서 즐기는 바지락 칼국수와 해물파전 중식. 영흥 에너지파크 견학 또는 해안 트레킹. 오션뷰 펜션 체크인 및 개별 바비큐 석식.' },
      { day: 2, title: '신비의 목섬과 대부도 테마 관광', description: '조식 후 체크아웃. 선재도 목섬으로 이동하여 바닷길 산책 및 인생 사진 촬영. 대부도 달전망대 관람 및 시화나래 휴게소 산책. 기념품 샵 방문 후 일정 종료 및 복귀.' }
    ]
  }
];

const defaultMagazines: MagazinePost[] = [
  {
    id: '17',
    title: '달콤하고 향긋한 소야도의 추억, "호박 회관" 감성 체험 BEST 3',
    category: '체험 관광',
    date: '2026.04.17',
    image: 'https://www.incheonin.com/news/photo/202509/112173_171974_1212.jpg',
    content: `소야도의 복합 문화 공간인 '호박 회관'에서 즐기는 아주 특별한 세 가지 체험을 소개합니다. 자연과 전통, 그리고 감성이 어우러진 이곳에서 나만의 소야도 조각을 만들어보세요.

**1. 소야도 특산물 단호박잼 만들기**
![단호박잼 만들기](http://deokjeok.co.kr/images/pumkin/1.jpg)
소야도의 뜨거운 햇살을 머금고 자란 단호박으로 만드는 수제 잼 체험입니다. 인공 감미료 없이 단호박 본연의 달콤함을 살려 정성껏 끓여내는 과정에서 소야도의 넉넉한 인심을 느낄 수 있습니다. 정성껏 만든 잼은 예쁜 유리병에 담아 선물용으로도 최고입니다.

**2. 전통 방식으로 빚는 막걸리 만들기**
![막걸리 만들기](https://thumbnews.nateimg.co.kr/view610///onimg.nate.com/orgImg/yt/2008/05/03/kp1_080503001300.jpg)
소야도의 맑은 물과 쌀로 빚어내는 전통 막걸리 체험입니다. 발효의 원리를 배우며 직접 누룩을 버무리고 정성을 다해 빚는 과정은 어른들에게 특히 인기 있는 코스입니다. 며칠 후 톡 쏘는 탄산과 깊은 풍미가 살아날 막걸리를 상상하며 섬의 전통을 경험해 보세요.

**3. 섬의 향기를 담은 향초 만들기**
![향초 만들기](https://images.unsplash.com/photo-1603006326402-9ff707374dc2?q=80&w=1000&auto=format&fit=crop)
소야도의 들꽃과 바다의 향을 가두어 만드는 감성 향초 체험입니다. 소야도 해변에서 수집한 조개껍데기와 마른 꽃들로 장식하는 나만의 향초는 여행의 기억을 가장 향기롭게 간직하는 방법입니다. 불을 켤 때마다 다시 소야도의 파도 소리가 들리는 듯한 기분을 느껴보세요.

**장소: 소야도 호박 회관**
모든 체험은 호박 회관에서 진행되며, 사전 예약 시 전문가의 친절한 가이드가 함께 제공됩니다. 소야도의 맛과 향을 내 손으로 직접 빚어내는 소중한 시간을 가져보세요.`
  },
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
    category: '트레킹/캠핑',
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
    content: '도심의 불빛에 가려진 밤하늘의 진짜 주인공들을 만나러 떠나는 온섬투어만의 특별한 야간 테마 여행, \'별별투어\'를 소개합니다.\n\n인공적인 빛이 거의 없는 섬의 밤은 우주를 마주하기에 가장 완벽한 장소입니다. 온섬투어는 천문 전문가와 함께하는 별자리 해설 서비스를 제공합니다. 그리스 신화 속 별자리 이야기부터 스마트폰으로 은하수를 촬영하는 방법까지, 밤하늘이 주는 감동을 온전히 느껴보세요.\n\n특히 덕적도의 비조봉 정상이나 소야도의 한적한 해변은 별 관측의 명소로 꼽힙니다. 돗자리에 누워 쏟아질 듯한 별들을 바라보며 듣는 감성적인 음악은 잊치 못할 추억을 선사할 것입니다. 사랑하는 사람과 함께 "나랑 별 보러 가지 않을래?"라는 말 한마디로 시작하는 로맨틱한 밤, 온섬투어가 준비해 드립니다.'
  },
  {
    id: '5',
    title: '할머니 밥상이 그리울 땐 00민박으로!',
    category: '체험 관광',
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
  },
  {
    id: '9',
    title: '혼자만 알고 싶은 섬, 소야도',
    category: '섬 에세이',
    date: '2026.04.17',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    content: '화려한 관광지도, 북적이는 인파도 없지만 그래서 더 소중한 섬. 덕적도 근처의 작은 섬 소야도는 이름 그대로 \'나만 알고 싶은 보석\' 같은 곳입니다.\n\n소야도의 가장 큰 매력은 아무것도 하지 않아도 좋은 고요함에 있습니다. 떼뿌루 해수욕장의 하얀 모래사장 위에 앉아 있으면 파도 소리가 귀를 간지럽히고, 멀리 지나가는 고기잡이 배의 엔진 소리마저 평화롭게 들립니다. 이곳에선 휴대폰은 잠시 내려두셔도 좋습니다. 자연이 들려주는 소리에 집중하는 것만으로 충분하니까요.\n\n특히 물때가 맞으면 열리는 신비로운 바닷길은 마치 다른 세상으로 연결되는 통로 같습니다. 조개껍데기를 줍고 갯벌의 생명들을 관찰하다 보면 어린 시절의 동심으로 돌아간 듯한 착각에 빠집니다. 저녁에는 밧지름 해수욕장 근처에서 쏟아질 듯한 별들을 보며 별별투어를 즐겨보세요. 도시의 소음과 스트레스에서 완벽하게 해방된 진짜 \'휴식\'을 소야도에서 만날 수 있습니다.'
  },
  {
    id: '10',
    title: '편안한 덕적도 & 소야도 여행(연인편)',
    category: '테마 여행',
    date: '2026.04.17',
    image: 'https://images.unsplash.com/photo-1517824806704-9040b037703b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    content: '둘만의 소중한 시간을 더욱 특별하게 만들어줄 덕적도와 소야도 여행 코스를 소개합니다. 사랑하는 연인과 함께 떠나는 이 여정은 일상의 소란스러움을 뒤로하고, 오직 서로에게 집중할 수 있는 완벽한 시간을 선사합니다.\n\n첫 번째 추천 코스는 덕적도의 서포리 해수욕장 산책입니다. 백 년 넘은 노송들이 늘어선 숲길을 손잡고 걷다 보면 은은한 솔향기가 마음을 차분하게 해줍니다. 해 질 녘 노을이 바다를 붉게 물들일 때, 모래사장에 앉아 나누는 대화는 그 어떤 선물보다 값진 추억이 될 것입니다.\n\n소야도로 넘어가면 더욱 프라이빗한 분위기를 즐길 수 있습니다. 죽노골 해변의 투명한 바닷물에 발을 담그고, 비밀 정원 같은 숲길을 따라 가벼운 트레킹을 즐겨보세요. 온섬투어의 하이엔드 글램핑장에서 즐기는 로맨틱한 바비큐 저녁 식사와 밤하늘을 가득 채운 별들은 연인들의 필수 코스입니다.\n\n자극적이지 않지만 깊은 여운이 남는 여행, 이번 주말에는 덕적도와 소야도에서 우리만의 영화 같은 장면을 만들어보는 건 어떨까요?'
  },
  {
    id: '11',
    title: '소야도의 자존심, 365 아이랜드 펜션 리뷰',
    category: '숙소 리뷰',
    date: '2026.04.17',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    content: '소야도에서 가장 현대적이고 쾌적한 시설을 자랑하는 \'365 아이랜드\' 펜션을 다녀왔습니다. 이곳은 소야도의 수려한 자연경관과 세련된 건축 디자인이 조화를 이루는 곳입니다.\n\n전 객실이 오션뷰로 설계되어 있어, 침대에 누워만 있어도 서해의 푸른 바다와 신비로운 바닷길이 한눈에 들어옵니다. 특히 펜션 바로 앞에 펼쳐진 전용 야외 수영장은 여름철 가족 단위 여행객들에게 최고의 즐거움을 선사하며, 겨울에는 따뜻한 온수풀로 운영되어 사계절 내내 힐링이 가능합니다.\n\n각 객실마다 마련된 개별 테라스에서는 프라이빗한 바비큐 파티를 즐길 수 있습니다. 365 아이랜드만의 감성적인 인테리어와 깨끗한 관리 상태는 왜 이곳이 소야도에서 가장 인기 있는 숙소인지 증명해 줍니다. 일상의 스트레스를 잊고 365일 언제나 섬의 정취를 느끼고 싶다면, 365 아이랜드 펜션이 정답입니다.'
  },
  {
    id: '12',
    title: '입안 가득 소야도 바다향, 현지인 추천 맛집 BEST 3',
    category: '맛집 추천',
    date: '2026.04.17',
    image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    content: '섬 여행의 묘미는 뭐니 뭐니 해도 싱싱한 제철 해산물을 맛보는 것이겠죠? 소야도 주민들이 입을 모아 칭찬하는 진짜 맛집 3곳을 온섬투어가 직접 다녀왔습니다.\n\n1. 소야바다식당 (자연산 우럭매운탕)\n갓 잡아 올린 자연산 우럭을 듬뿍 넣고 푹 끓여낸 매운탕이 이 집의 시그니처입니다. 칼칼하면서도 깊은 국물 맛은 한 번 맛보면 잊을 수 없습니다. 함께 나오는 밑반찬들도 섬에서 직접 채취한 나물들로 차려져 정성이 가득 느껴집니다.\n\n2. 해변가 칼국수 (바지락 칼국수 & 해물파전)\n떼뿌루 해수욕장 인근에 위치한 이곳은 쫄깃한 면발과 아낌없이 들어간 바지락이 특징입니다. 바다를 바라보며 먹는 바삭한 해물파전은 막걸리 한 잔을 절로 부르는 최고의 별미입니다.\n\n3. 섬마을 횟집 (모듬회 & 소라찜)\n그날그날 선주가 직접 잡은 횟감만을 취급하여 신선함이 남다릅니다. 특히 오독오독 씹히는 식감이 일품인 소라찜은 소야도 여행에서 절대 빼놓을 수 없는 필수 메뉴입니다.\n\n화려하진 않지만 정겨운 인심과 바다의 맛을 온전히 느낄 수 있는 소야도 맛집들. 이번 주말, 소야도에서 진정한 미식 여행을 즐겨보세요!'
  },
  {
    id: '13',
    title: '죽노골해변, 영원한 사랑이 맺어지는 "청사초롱 인연의 길"',
    category: '테마 여행',
    date: '2026.04.17',
    image: 'https://images.unsplash.com/photo-1542332213-9b5a5a3fad35?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    content: '예로부터 청사초롱은 혼례식에서 앞길을 밝히던 등불로 알려져 있습니다. 소야도의 떼뿌루 해수욕장에서 죽노골로 넘어가는 산길에는 이 청사초롱과 관련된 아주 특별한 이야기가 숨어있는데요.\n\n바로 \'청사초롱 인연의 길\'이라 불리는 이 산길입니다. 전설에 따르면 청사초롱의 불빛을 따라 산길 끝까지 손을 놓지 않고 걸으면, 연애소설이나 영화 속 주인공처럼 영원한 인연이 맺어진다고 합니다.\n\n울창한 숲 사이로 스며드는 햇살과 시원한 바닷바람을 맞으며 걷는 이 길은 연인들에게 더할 나위 없는 로맨틱한 코스입니다. 소중한 사람과 함께 인연의 소중함을 되새기며, 소야도만의 아름다운 이야기를 직접 확인해 보세요.'
  },
  {
    id: '16',
    title: '직접 잡고 직접 요리하는, 소야도 갯벌 체험 & 쿠킹 클래스',
    category: '체험 관광',
    date: '2026.04.17',
    image: 'https://images.unsplash.com/photo-1547592166-23ac45744acd?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80',
    content: '보는 여행을 넘어 직접 몸으로 느끼는 여행! 소야도에서만 즐길 수 있는 특별한 체험 프로그램을 소개합니다.\n\n첫 번째는 떼뿌루 해수욕장의 광활한 갯벌에서 펼쳐지는 \'조개 잡이 체험\'입니다. 호미와 바구니를 들고 갯벌을 누비다 보면 시간 가는 줄 모르고 바구니를 가득 채우게 됩니다. 아이들에게는 살아있는 자연 교육의 장이 되고, 어른들에게는 동심으로 돌아가는 힐링의 시간이 됩니다.\n\n체험은 여기서 끝이 아닙니다. 직접 잡은 싱싱한 바지락과 소라를 가지고 마을 공동 주방에서 진행되는 \'섬마을 쿠킹 클래스\'에 참여해 보세요. 현지 주민의 비법이 담긴 바지락 칼국수와 소라 무침을 직접 만들어 먹는 재미는 그 어떤 진수성찬보다 달콤합니다.\n\n자연이 주는 선물을 직접 수확하고 맛보는 기쁨, 소야도 체험 관광을 통해 평생 잊지 못할 추억을 만들어보세요!'
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
  const [recentlyViewed, setRecentlyViewed] = useState<string[]>(() => {
    const saved = localStorage.getItem('recentlyViewed');
    return saved ? JSON.parse(saved) : [];
  });

  const addRecentlyViewed = (id: string) => {
    setRecentlyViewed(prev => {
      const filtered = prev.filter(viewedId => viewedId !== id);
      const updated = [id, ...filtered].slice(0, 5); // Keep last 5
      localStorage.setItem('recentlyViewed', JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <AppContext.Provider value={{ 
      packages, setPackages, 
      magazines, setMagazines, 
      settings, setSettings,
      recentlyViewed, addRecentlyViewed 
    }}>
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
