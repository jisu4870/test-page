import React from 'react';
import { motion } from 'motion/react';
import { Calendar, MapPin, ArrowRight, Sun, CloudRain, Snowflake, Leaf } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const MONTHLY_REVIEWS = [
  {
    month: 1,
    island: '영흥도',
    theme: '겨울 바다의 낭만과 일출',
    description: '수도권에서 가까운 영흥도는 겨울에도 접근성이 좋습니다. 십리포 해변의 소사나무 군락지가 선사하는 고즈넉한 풍경과 장경리 해변의 일몰은 겨울 여행의 정수를 보여줍니다.',
    image: 'https://isum.incheon.go.kr/resource/www/images/sub/img_island_info11.jpg',
    tags: ['#겨울바다', '#일출명소', '#수도권근교'],
    icon: <Snowflake className="text-blue-400" />
  },
  {
    month: 2,
    island: '석모도',
    theme: '온천과 함께하는 힐링 여행',
    description: '칼바람 부는 2월, 석모도 미네랄 온천에서 서해 바다를 바라보며 즐기는 노천욕은 최고의 힐링입니다. 보문사의 정취와 함께 마음의 평안을 찾아보세요.',
    image: 'https://isum.incheon.go.kr/resource/www/images/sub/img_island_info04.jpg',
    tags: ['#해수온천', '#보문사', '#힐링'],
    icon: <Snowflake className="text-blue-400" />
  },
  {
    month: 3,
    island: '신시모도',
    theme: '봄바람 가르는 자전거 라이딩',
    description: '신도, 시도, 모도가 다리로 연결되어 삼형제 섬이라 불립니다. 경사가 완만해 봄볕 아래 자전거 라이딩을 즐기기에 최적의 장소입니다.',
    image: 'https://isum.incheon.go.kr/resource/www/images/sub/img_island_info12.jpg',
    tags: ['#자전거여행', '#삼형제섬', '#봄나들이'],
    icon: <Leaf className="text-green-400" />
  },
  {
    month: 4,
    island: '덕적도',
    theme: '벚꽃과 노송이 어우러진 산책',
    description: '서포리 해수욕장의 노송 숲과 섬 곳곳에 피어나는 봄꽃들이 장관입니다. 비조봉에 올라 내려다보는 서해의 다도해 풍경은 봄의 생명력을 느끼게 합니다.',
    image: 'https://isum.incheon.go.kr/resource/www/images/sub/img_island_info21.jpg',
    tags: ['#벚꽃명소', '#서포리해변', '#트레킹'],
    icon: <Leaf className="text-green-400" />
  },
  {
    month: 5,
    island: '장봉도',
    theme: '갯벌 체험과 인어의 전설',
    description: '길게 뻗은 섬의 모양만큼이나 다채로운 해안 산책로가 매력적입니다. 5월의 따뜻한 여울 속에서 조개 캐기 체험을 즐기며 가족과 소중한 추억을 만들어보세요.',
    image: 'https://isum.incheon.go.kr/resource/www/images/sub/img_island_info13.jpg',
    tags: ['#갯벌체험', '#가족여행', '#인어동상'],
    icon: <Leaf className="text-green-400" />
  },
  {
    month: 6,
    island: '소야도',
    theme: '신비로운 바닷길과 감성 캠핑',
    description: '6월의 이른 여름, 소야도에서는 하루에 두 번 열리는 신비로운 바닷길을 만날 수 있습니다. 떼뿌루 해수욕장에서 즐기는 캠핑은 낭만 그 자체입니다.',
    image: 'https://postfiles.pstatic.net/MjAyNjA0MjBfMTcy/MDAxNzc2NjgwMzI5Mzk2._NqdBUiuxUjPWFpdKEd4hOMMtnMeiiPxpL37XT-WJEcg.BDLG4Fs7FEzEb49-NuniCssqyd6MH_4_48hK37v_N38g.JPEG/KakaoTalk_20260420_113500271.jpg?type=w773',
    tags: ['#바닷길', '#캠핑명소', '#인생샷'],
    icon: <Sun className="text-orange-400" />
  },
  {
    month: 7,
    island: '무의도',
    theme: '여름 바다의 활기와 하나개 해변',
    description: '드라마 촬영지로 유명한 하나개 해수욕장에서 시원한 해수욕과 짚라인을 즐겨보세요. 데크길을 따라 걷는 대무의도와 소무의도의 매력은 여름에 더욱 빛납니다.',
    image: 'https://isum.incheon.go.kr/resource/www/images/sub/img_island_info33.jpg',
    tags: ['#여름휴가', '#해수욕장', '#짚라인'],
    icon: <Sun className="text-orange-400" />
  },
  {
    month: 8,
    island: '대이작도',
    theme: '풀등 위에서 즐기는 한여름밤의 꿈',
    description: '썰물 때만 드러나는 광활한 모래섬 풀등은 백만 평의 기적이라 불립니다. 한여름 바다 한가운데서 모래 위를 걷는 마법 같은 경험을 놓치지 마세요.',
    image: 'https://isum.incheon.go.kr/resource/www/images/sub/img_island_info27.jpg',
    tags: ['#풀등', '#해양생태', '#신비의섬'],
    icon: <Sun className="text-orange-400" />
  },
  {
    month: 9,
    island: '승봉도',
    theme: '조용한 사색과 바다 낚시',
    description: '섬 모양이 날아오르는 봉황을 닮았다 하여 승봉도라 불립니다. 9월의 선선한 바람을 맞으며 이일레 해변을 거닐거나 바다 낚시를 즐기기에 안성맞춤입니다.',
    image: 'https://isum.incheon.go.kr/resource/www/images/sub/img_island_info29.jpg',
    tags: ['#바다낚시', '#고즈넉한섬', '#산책'],
    icon: <Leaf className="text-yellow-600" />
  },
  {
    month: 10,
    island: '굴업도',
    theme: '한국의 갈라파고스, 은하수 캠핑',
    description: '개머리 언덕의 억새풀이 황금빛으로 물드는 10월, 굴업도는 백패커들의 성지가 됩니다. 밤하늘을 수놓는 은하수와 야생 사슴들을 만날 수 있는 신비로운 섬입니다.',
    image: 'https://isum.incheon.go.kr/resource/www/images/sub/img_island_info26.jpg',
    tags: ['#백패킹', '#은하수', '#억새꽃'],
    icon: <Leaf className="text-yellow-600" />
  },
  {
    month: 11,
    island: '백령도',
    theme: '신의 조각품, 두무진의 웅장함',
    description: '차가운 공기가 시야를 맑게 해주는 11월, 백령도 두무진의 기암괴석은 더욱 선명하고 웅장하게 다가옵니다. 사곶 해변의 단단한 모래사장을 달려보세요.',
    image: 'https://isum.incheon.go.kr/resource/www/images/sub/img_island_info18.jpg',
    tags: ['#안보관광', '#두무진', '#천연비행장'],
    icon: <CloudRain className="text-gray-400" />
  },
  {
    month: 12,
    island: '교동도',
    theme: '시간이 멈춘 대룡시장 여행',
    description: '한 해를 마무리하며 강화 교동도의 대룡시장을 방문해 보세요. 60-70년대 풍경을 간직한 이곳에서 따뜻한 쌍화차 한 잔과 함께 추억 여행을 떠나보세요.',
    image: 'https://isum.incheon.go.kr/resource/www/images/sub/img_island_info12.jpg',
    tags: ['#레트로', '#대룡시장', '#시간여행'],
    icon: <Snowflake className="text-blue-400" />
  }
];

export default function MonthlyRecommendations() {
  const navigate = useNavigate();
  const currentMonth = new Date().getMonth() + 1;

  return (
    <div className="pt-32 pb-24 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">월별 섬 추천 🏝️</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            매달 가장 아름다운 모습을 뽐내는 인천의 섬들을 온섬투어가 선별했습니다. 
            계절의 변화와 함께 달라지는 섬의 매력을 느껴보세요.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-12">
          {MONTHLY_REVIEWS.map((item, index) => (
            <motion.div
              key={item.month}
              initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 * (index % 3) }}
              className={`flex flex-col ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} bg-white rounded-[2rem] overflow-hidden shadow-xl border border-gray-100 group`}
            >
              {/* Image Side */}
              <div className="w-full md:w-1/2 h-80 md:h-[450px] relative overflow-hidden">
                <img 
                  src={item.image} 
                  alt={item.island} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-md px-6 py-3 rounded-2xl shadow-lg border border-white/20 flex flex-col items-center">
                  <span className="text-3xl font-black text-[var(--color-sky-blue)]">{item.month}</span>
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">MONTH</span>
                </div>
                {item.month === currentMonth && (
                  <div className="absolute bottom-6 right-6 bg-red-500 text-white px-4 py-1.5 rounded-full text-xs font-bold animate-pulse">
                    BEST RECOMMENDATION
                  </div>
                )}
              </div>

              {/* Content Side */}
              <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center">
                <div className="flex items-center gap-2 mb-4">
                  <div className="p-2 bg-gray-50 rounded-lg">
                    {item.icon}
                  </div>
                  <span className="text-sm font-bold text-[var(--color-sky-blue)] tracking-wider uppercase">
                    Monthly Feature
                  </span>
                </div>

                <div className="flex items-center gap-3 mb-4">
                  <h2 className="text-3xl font-black text-gray-900">{item.island}</h2>
                  <div className="flex items-center gap-1 text-gray-400 text-sm">
                    <MapPin size={14} />
                    인천광역시
                  </div>
                </div>

                <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                   "{item.theme}"
                </h3>

                <p className="text-gray-600 leading-relaxed mb-8">
                  {item.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-10">
                  {item.tags.map(tag => (
                    <span key={tag} className="text-xs font-bold text-gray-400 bg-gray-100 px-3 py-1.5 rounded-lg">
                      {tag}
                    </span>
                  ))}
                </div>

                <button 
                  onClick={() => navigate(`/?island=${item.island}#packages`)}
                  className="flex items-center gap-3 bg-gray-900 text-white px-8 py-4 rounded-2xl font-bold hover:bg-black transition-all w-fit group/btn"
                >
                  투어 상품 보기 <ArrowRight size={18} className="group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Banner Section */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="mt-24 bg-gradient-to-r from-[var(--color-sky-blue)] to-blue-600 rounded-[2.5rem] p-12 md:p-20 text-center text-white relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-black mb-6">나만의 맞춤 섬 여행을 원하시나요?</h2>
            <p className="text-white/80 mb-10 max-w-xl mx-auto">
              온섬투어의 여행 플래너가 당신의 취향과 일정에 딱 맞는 
              최적의 섬 여행 코스를 직접 설계해 드립니다.
            </p>
            <button 
              onClick={() => navigate('/customer-center')}
              className="bg-white text-[var(--color-sky-blue)] px-10 py-5 rounded-2xl font-black hover:bg-gray-50 transition-all shadow-xl hover:scale-105"
            >
              1:1 맞춤 상담 신청하기
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
