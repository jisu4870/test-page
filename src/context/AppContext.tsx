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
  itinerary: { day: number; title: string; description: string; image?: string }[];
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
    price: 168000,
    image: 'https://isum.incheon.go.kr/resource/www/images/sub/img_island_info21.jpg',
    status: 'BEST',
    category: '힐링',
    gallery: [
      'https://postfiles.pstatic.net/MjAyNjA0MjBfMjYx/MDAxNzc2NjgwMzMwNzgz.vHbjXiDHDLzdqycoLuNYlzH82DBT4DEqNUjgcb2GUVsg.ZpFEVzM7sCFOEIoU1KAwDPltsWQN68yKaxua4wmT0Icg.PNG/KakaoTalk_20260420_113500271_01.png?type=w773',
      'https://isum.incheon.go.kr/atch/getImg.do?upKey=storeExterior&lnkgSn=2407110008&ordr=1',
      'https://isum.incheon.go.kr/atch/getImg.do?upKey=storeInside1&lnkgSn=2407110002&ordr=1'
    ],
    description: '덕적도와 소야도의 정취를 만끽하며 즐기는 "삼시세끼" 힐링 투어입니다. 소야 9경 스탬프 투어부터 덕적 8경 투어까지, 섬의 속살을 깊숙이 들여다보는 알찬 여정을 준비했습니다. 선택형 관광 및 식사를 통해 나만의 스타일로 여행을 완성해보세요.',
    ferryInfo: '출항: 인천항 연안여객터미널 오전 08:30 출발 (옹진훼미리호, 약 1시간 10분 소요)\n입항: 덕적도 진리선착장 및 소야도 선착장 이용',
    itinerary: [
      { 
        day: 1, 
        title: '인천항 출발 및 소야 9경 투어', 
        description: '[08:00~09:10] 인천 연안여객터미널 ~ 덕적도 진리선착장\n[오전 일정] 소야 9경 투어버스 탑승 및 소야도 이동\n소야 9경 스탬프 투어 (4경 모세의 기적)\n[중식 시간] 소야랑 카페 or 김굴국밥 (선택형 식사)\n* 브런치: 단호박 구슬 로제 떡볶이, 단호박 오픈 샌드위치\n[오후 일정] 소야 9경 스탬프 투어 (7경 곰바위/막끝)\n[석식 시간] 회정식\n[야간 일정] 소야 9경 스탬프 투어 (2경 죽노골 청사초롱 투어)\n소야 9경 투어버스 탑승 및 덕적도 이동\n밧지름 또는 떼뿌루 해변에서 밤하늘 은하수, 별 감상\n숙소 이동 및 자유시간\n숙소: 덕적도 365아일랜드 팬션 or 떼뿌루 야영장 (선택형 숙박)' 
      },
      { 
        day: 2, 
        title: '덕적 8경 투어 및 호박회관 체험', 
        description: '[09:00~] 체크아웃 후 아침식사\n[오전 일정] 덕적 8경 투어 버스 탑승\n덕적 8경 투어 or 비조봉 트레킹 (선택형 관광)\n[중식 시간] 간재미 정식\n[오후 일정] 호박회관 체험 해당화 (릴렉싱 향초 만들기 or 단호박 막걸리 만들기) (선택형 관광)\n[16:00~17:10] 덕적도 출도 (덕적도 진리 선착장 ~ 인천 연안 여객 터미널)' 
      }
    ]
  },
  {
    id: '2',
    title: '시간 탐험대: 소야덕적 조각의 비밀!',
    island: '소야도',
    duration: '1박 2일',
    price: 168000,
    image: 'https://postfiles.pstatic.net/MjAyNjA0MjBfMTcy/MDAxNzc2NjgwMzI5Mzk2._NqdBUiuxUjPWFpdKEd4hOMMtnMeiiPxpL37XT-WJEcg.BDLG4Fs7FEzEb49-NuniCssqyd6MH_4_48hK37v_N38g.JPEG/KakaoTalk_20260420_113500271.jpg?type=w773',
    status: '특가',
    category: '가족',
    gallery: [
      'https://dry7pvlp22cox.cloudfront.net/mrt-images-prod/2024/09/06/DRlr/gd15Byf2Tg.jpg',
      'https://isum.incheon.go.kr/atch/getImg.do?upKey=storeExterior&lnkgSn=2407110007&ordr=1',
      'https://isum.incheon.go.kr/atch/getImg.do?upKey=storeInside1&lnkgSn=2407110008&ordr=1'
    ],
    description: '소야도와 덕적도에 숨겨진 역사의 조각과 자연의 아름다움을 찾아 떠나는 가족형 에듀 투어 패키지입니다.\n\n3.1운동의 뜨거운 열기와 섬의 수호자 최분도 신부님의 공헌을 되새기는 역사 탐방부터, 신비로운 바닷길과 아름다운 노송숲 산책까지 알차게 구성되었습니다. 조개껍데기 채집과 도자기 체험, 단호박잼 만들기 등 아이들을 위한 퍼즐 미션형 체험 프로그램이 가득합니다.\n\n파도 소리와 별빛이 함께하는 소야도에서 우리 가족만의 소중한 비밀 조각을 모아보세요!',
    ferryInfo: '출항: 인천항 연안여객터미널 오전 08:30 출발 (옹진훼미리호, 약 1시간 10분 소요)\n입항: 덕적도 진리선착장 및 소야도 선착장 이용',
    itinerary: [
      { 
        day: 1, 
        title: '덕적도 입도 및 소야도 감성 체험', 
        description: '[08:00~09:10] 덕적도 입도 (인천 연안 여객 터미널 ~ 덕적도 진리 선착장)\n[오전 일정] 투어버스 탑승 후 소야도로 이동\n모세의 기적 (조개껍데기 채집)\n[중식 시간] 소야랑 카페\n* 브런치: 단호박 구슬 로제 떡볶이, 단호박 오픈 샌드위치\n[오후 일정] 떼뿌루 해변 피크닉 *피크닉 세트 대여\n소야량 도자기 체험 (소야도만의 조개 스탬프 도자기)\n[석식 시간] 덕적도 이동 및 석식(회나라 식당)\n[야간 일정] 밧지름 해수욕장으로 이동 및 별별투어\n숙소 이동 및 자유시간\n숙소: 365 아일랜드 팬션' 
      },
      { 
        day: 2, 
        title: '역사 탐방과 퍼즐 미션 투어', 
        description: '[08:00~] 체크아웃 및 조식 (바다향기 식당)\n[오전 일정] 서포리해변 노송숲 산책, 최분도 신부 공덕비(퍼즐미션)\n덕적도성당(퍼즐미션 및 인형극 관람)\n밧지름 해변으로 이동, 3.1운동탑, 충훈탑(퍼즐미션)\n[중식 시간] 간재미 정식\n[오후 일정] 북리등대(퍼즐미션)\n호박회관 체험(단호박잼 만들기)\n[16:00~17:10] 덕적도 출도 (덕적도 진리 선착장 ~ 인천 연안 여객 터미널)' 
      }
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
      'https://images.unsplash.com/photo-1540156006454-b0542387114b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
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
      'https://isum.incheon.go.kr/resource/www/images/sub/img_island_info18.jpg',
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
소야도의 뜨거운 햇살을 머금고 자란 단호박으로 만드는 수제 잼 체험입니다. 인공 감미료 없이 단호박 본연의 달콤함을 살려 정성껏 끓여내는 과정에서 소야도의 넉넉한 인심을 느낄 수 있습니다. 정성껏 만든 잼은 예쁜 유리병에 담아 선물용으로도 최고입니다.

**2. 전통 방식으로 빚는 막걸리 만들기**
![막걸리 만들기](https://thumbnews.nateimg.co.kr/view610///onimg.nate.com/orgImg/yt/2008/05/03/kp1_080503001300.jpg)
소야도의 맑은 물과 쌀로 빚어내는 전통 막걸리 체험입니다. 발효의 원리를 배우며 직접 누룩을 버무리고 정성을 다해 빚는 과정은 어른들에게 특히 인기 있는 코스입니다. 며칠 후 톡 쏘는 탄산과 깊은 풍미가 살아날 막걸리를 상상하며 섬의 전통을 경험해 보세요.

**3. 섬의 향기를 담은 향초 만들기**
소야도의 들꽃과 바다의 향을 가두어 만드는 감성 향초 체험입니다. 소야도 해변에서 수집한 조개껍데기와 마른 꽃들로 장식하는 나만의 향초는 여행의 기억을 가장 향기롭게 간직하는 방법입니다. 불을 켤 때마다 다시 소야도의 파도 소리가 들리는 듯한 기분을 느껴보세요.

**장소: 소야도 호박 회관**
모든 체험은 호박 회관에서 진행되며, 사전 예약 시 전문가의 친절한 가이드가 함께 제공됩니다. 소야도의 맛과 향을 내 손으로 직접 빚어내는 소집한 시간을 가져보세요.`
  },
  {
    id: '1',
    title: '2026년 봄, 꼭 가봐야 할 국내 섬 여행지 BEST 5',
    category: '여행 팁',
    date: '2026.03.15',
    image: 'https://cdn.visitkorea.or.kr/img/call?cmd=VIEW&id=c0d59cc2-6029-4849-877b-b5e7360e4f83',
    content: '봄바람이 살랑이는 계절, 복잡한 도심을 떠나 조용한 섬으로 떠나보는 건 어떨까요? 온섬투어가 추천하는 올봄 최고의 섬 여행지 5곳을 소개합니다.\n\n1. 청산도 (전남 완도군)\n아시아 최초의 슬로시티로 지정된 청산도는 봄이 되면 섬 전체가 노란 유채꽃과 푸른 청보리밭으로 물듭니다. 구불구불한 돌담길을 따라 천천히 걷다 보면 어느새 마음의 평화를 얻게 됩니다. 영화 \'서편제\'의 촬영지로도 유명한 이곳에서 느림의 미학을 경험해 보세요.\n\n2. 선유도 (전북 군산시)\n신선이 노닐던 섬이라는 이름답게 빼어난 절경을 자랑합니다. 고운 모래가 십 리에 걸쳐 있다는 명사십리 해수욕장은 봄철 산책 코스로 제격입니다. 자전거를 대여해 섬 구석구석을 누비며 시원한 바닷바람을 맞아보세요.\n\n3. 보길도 (전남 완도군)\n조선시대 문신 윤선도가 여생을 보낸 곳으로 유명한 보길도는 고즈넉한 아름다움이 있는 섬입니다. 세연정, 동천석실 등 윤선도의 발자취를 따라 걷다 보면 마치 조선시대로 시간 여행을 떠난 듯한 기분을 느낄 수 있습니다.\n\n4. 비진도 (경남 통영시)\n산호빛 바다와 은빛 모래사장이 매력적인 비진도는 \'미인도\'라고도 불립니다. 두 개의 섬이 좁은 모래사장으로 연결된 독특한 지형을 가지고 있으며, 선유봉에 오르면 비진도의 환상적인 파노라마 뷰를 감상할 수 있습니다.\n\n5. 덕적도 (인천 옹진군)\n수도권에서 비교적 쉽게 접근할 수 있는 덕적도는 울창한 소나무 숲과 맑은 바다가 어우러진 서해의 진주입니다. 서포리 해수욕장의 고운 모래를 밟으며 산책하거나, 비조봉에 올라 서해의 수많은 섬들을 조망해 보는 것을 추천합니다.'
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
    title: '할머니 밥상이 그리울 땐 민박으로!',
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
    image: 'https://mblogthumb-phinf.pstatic.net/MjAxODA2MjhfMTY0/MDAxNTMwMTk2MDY2NDcx.pCXf5I3sSIMjd0yH2_TGTp5KERZ-2yT8tSN2rVdwBpYg.bDq3UoAXOb45fqdIzGV_4sAJ1RcqrPVHoE1zgDjGXj4g.PNG.seadjk/%EC%BA%A1%EC%B2%983.PNG?type=w2',
    content: '아름다운 풍경 뒤에 숨겨진 우리 섬의 뜨거웠던 역사를 되짚어보는 시간입니다. 1919년, 전국을 뒤덮었던 만세의 함성은 이곳 덕적도에서도 울려 퍼졌습니다.\n\n덕적도 3.1운동은 섬 주민들이 주도적으로 참여하여 일제의 탄압에 맞선 자랑스러운 역사입니다. 당시 만세 운동이 일어났던 장소들을 따라 걷는 역사 탐방 코스는 아이들에게는 살아있는 교육의 장이 되고, 어른들에게는 나라 사랑의 의미를 되새기는 소중한 기회가 됩니다.\n\n온섬투어는 전문 역사 가이드와 함께 덕적도 곳곳에 남아있는 항일 유적지를 방문하고, 당시의 긴박했던 상황을 생생하게 전달해 드립니다. 풍경을 즐기는 여행을 넘어, 우리 땅의 뿌리를 기억하는 뜻깊은 여정에 함께해 주세요.'
  },
  {
    id: '7',
    title: '소야9경, 200% 즐기기',
    category: '여행 팁',
    date: '2026.04.15',
    image: 'https://pds.joongang.co.kr/news/component/htmlphoto_mmdata/202410/11/ca74ae7b-8da2-40f2-995d-a44303d7d650.jpg',
    content: '소야도에 왔다면 반드시 봐야 할 9가지 절경, \'소야9경\'을 알고 계신가요? 온섬투어가 제안하는 소야9경 완벽 정복 가이드입니다.\n\n첫 번째는 물때가 맞아야만 볼 수 있는 \'모세의 기적\' 바닷길입니다. 소야도와 인근 섬들이 하나로 연결되는 신비로운 광경은 자연의 경이로움을 느끼게 합니다. 두 번째는 기암괴석이 장관을 이루는 \'장군바위\'입니다. 마치 섬을 지키는 장군처럼 늠름한 자태를 뽐내죠.\n\n이 외에도 떼뿌루 해수욕장의 울창한 송림, 죽노골의 투명한 바다 등 소야도 곳곳에는 숨은 보석 같은 명소들이 가득합니다. 온섬투어의 전용 전동 카트를 이용하면 하루 만에 소야9경을 모두 편안하게 둘러볼 수 있습니다. 각 명소마다 숨겨진 전설과 이야기를 들으며 소야도의 매력에 푹 빠져보세요.'
  },
  {
    id: '9',
    title: '혼자만 알고 싶은 섬, 소야도',
    category: '섬 에세이',
    date: '2026.04.17',
    image: 'https://isum.incheon.go.kr/atch/getImg.do?upKey=storeExterior&lnkgSn=2407100031&ordr=1',
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
    id: '13',
    title: '죽노골해변, 영원한 사랑이 맺어지는 "청사초롱 인연의 길"',
    category: '테마 여행',
    date: '2026.04.17',
    image: 'https://t3.ftcdn.net/jpg/05/36/44/90/360_F_536449057_1BoY5E1gxdW138TmnxdJdy8D8Prn9sMv.webp',
    content: '예로부터 청사초롱은 혼례식에서 앞길을 밝히던 등불로 알려져 있습니다. 소야도의 떼뿌루 해수욕장에서 죽노골로 넘어가는 산길에는 이 청사초롱과 관련된 아주 특별한 이야기가 숨어있는데요.\n\n바로 \'청사초롱 인연의 길\'이라 불리는 이 산길입니다. 전설에 따르면 청사초롱의 불빛을 따라 산길 끝까지 손을 놓지 않고 걸으면, 연애소설이나 영화 속 주인공처럼 영원한 인연이 맺어진다고 합니다.\n\n울창한 숲 사이로 스며드는 햇살과 시원한 바닷바람을 맞으며 걷는 이 길은 연인들에게 더할 나위 없는 로맨틱한 코스입니다. 소중한 사람과 함께 인연의 소중함을 되새기며, 소야도만의 아름다운 이야기를 직접 확인해 보세요.'
  },
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
