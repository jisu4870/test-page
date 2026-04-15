import React, { useState } from 'react';
import { useAppContext, TourPackage, MagazinePost } from '../context/AppContext';
import { Save, Plus, Trash2, Edit2, ArrowLeft, Image as ImageIcon } from 'lucide-react';

export default function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState('settings');
  
  const { settings, setSettings, packages, setPackages, magazines, setMagazines } = useAppContext();
  
  const [editSettings, setEditSettings] = useState(settings);
  
  // Package Form State
  const [isPackageFormOpen, setIsPackageFormOpen] = useState(false);
  const [editingPackage, setEditingPackage] = useState<TourPackage | null>(null);

  // Magazine Form State
  const [isMagazineFormOpen, setIsMagazineFormOpen] = useState(false);
  const [editingMagazine, setEditingMagazine] = useState<MagazinePost | null>(null);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === '0000') {
      setIsAuthenticated(true);
    } else {
      alert('비밀번호가 일치하지 않습니다.');
    }
  };

  const handleSaveSettings = () => {
    setSettings(editSettings);
    alert('설정이 저장되었습니다.');
  };

  const handleDeletePackage = (id: string) => {
    if (window.confirm('정말 삭제하시겠습니까?')) {
      setPackages(packages.filter(p => p.id !== id));
    }
  };

  const handleDeleteMagazine = (id: string) => {
    if (window.confirm('정말 삭제하시겠습니까?')) {
      setMagazines(magazines.filter(m => m.id !== id));
    }
  };

  const handleOpenPackageForm = (pkg?: TourPackage) => {
    if (pkg) {
      setEditingPackage({ ...pkg });
    } else {
      setEditingPackage({
        id: Date.now().toString(),
        title: '',
        island: '',
        duration: '1박 2일',
        price: 0,
        image: '',
        gallery: [],
        description: '',
        ferryInfo: '',
        itinerary: [{ day: 1, title: '', description: '' }]
      });
    }
    setIsPackageFormOpen(true);
  };

  const handleSavePackage = () => {
    if (!editingPackage) return;
    
    if (packages.find(p => p.id === editingPackage.id)) {
      setPackages(packages.map(p => p.id === editingPackage.id ? editingPackage : p));
    } else {
      setPackages([...packages, editingPackage]);
    }
    setIsPackageFormOpen(false);
    setEditingPackage(null);
    alert('상품이 저장되었습니다.');
  };

  const handleOpenMagazineForm = (post?: MagazinePost) => {
    if (post) {
      setEditingMagazine({ ...post });
    } else {
      setEditingMagazine({
        id: Date.now().toString(),
        title: '',
        category: '',
        date: new Date().toISOString().split('T')[0].replace(/-/g, '.'),
        image: '',
        content: ''
      });
    }
    setIsMagazineFormOpen(true);
  };

  const handleSaveMagazine = () => {
    if (!editingMagazine) return;
    
    if (magazines.find(m => m.id === editingMagazine.id)) {
      setMagazines(magazines.map(m => m.id === editingMagazine.id ? editingMagazine : m));
    } else {
      setMagazines([...magazines, editingMagazine]);
    }
    setIsMagazineFormOpen(false);
    setEditingMagazine(null);
    alert('매거진이 저장되었습니다.');
  };

  const resetForms = () => {
    setIsPackageFormOpen(false);
    setIsMagazineFormOpen(false);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-white p-8 rounded-2xl shadow-lg max-w-md w-full">
          <h1 className="text-2xl font-bold text-center mb-6">관리자 로그인</h1>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">비밀번호</label>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-sky-blue)]"
                placeholder="비밀번호를 입력하세요"
              />
            </div>
            <button type="submit" className="w-full bg-gray-900 text-white py-3 rounded-lg font-bold hover:bg-black transition-colors">
              로그인
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-24 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">관리자 대시보드</h1>
          <button 
            onClick={() => setIsAuthenticated(false)}
            className="text-gray-500 hover:text-gray-900"
          >
            로그아웃
          </button>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <div className="w-full md:w-64 shrink-0">
            <div className="bg-white rounded-xl shadow-sm p-4 space-y-2">
              <button 
                onClick={() => { setActiveTab('settings'); resetForms(); }}
                className={`w-full text-left px-4 py-3 rounded-lg font-medium transition-colors ${activeTab === 'settings' && !isPackageFormOpen && !isMagazineFormOpen ? 'bg-blue-50 text-[var(--color-sky-blue-dark)]' : 'text-gray-600 hover:bg-gray-50'}`}
              >
                사이트 설정
              </button>
              <button 
                onClick={() => { setActiveTab('packages'); resetForms(); }}
                className={`w-full text-left px-4 py-3 rounded-lg font-medium transition-colors ${activeTab === 'packages' || isPackageFormOpen ? 'bg-blue-50 text-[var(--color-sky-blue-dark)]' : 'text-gray-600 hover:bg-gray-50'}`}
              >
                여행 상품 관리
              </button>
              <button 
                onClick={() => { setActiveTab('magazines'); resetForms(); }}
                className={`w-full text-left px-4 py-3 rounded-lg font-medium transition-colors ${activeTab === 'magazines' || isMagazineFormOpen ? 'bg-blue-50 text-[var(--color-sky-blue-dark)]' : 'text-gray-600 hover:bg-gray-50'}`}
              >
                매거진 관리
              </button>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-grow bg-white rounded-xl shadow-sm p-6 md:p-8">
            {activeTab === 'settings' && !isPackageFormOpen && !isMagazineFormOpen && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold">사이트 설정</h2>
                  <button onClick={handleSaveSettings} className="flex items-center gap-2 bg-[var(--color-sky-blue)] text-white px-4 py-2 rounded-lg font-medium hover:bg-[var(--color-sky-blue-dark)]">
                    <Save size={18} /> 저장
                  </button>
                </div>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">메인 타이틀</label>
                    <input 
                      type="text" 
                      value={editSettings.heroTitle}
                      onChange={(e) => setEditSettings({...editSettings, heroTitle: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-sky-blue)]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">메인 서브타이틀</label>
                    <input 
                      type="text" 
                      value={editSettings.heroSubtitle}
                      onChange={(e) => setEditSettings({...editSettings, heroSubtitle: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-sky-blue)]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">메인 배경 이미지 URL</label>
                    <input 
                      type="text" 
                      value={editSettings.heroImage}
                      onChange={(e) => setEditSettings({...editSettings, heroImage: e.target.value})}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-sky-blue)]"
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">대표 이메일</label>
                      <input 
                        type="email" 
                        value={editSettings.contactEmail}
                        onChange={(e) => setEditSettings({...editSettings, contactEmail: e.target.value})}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-sky-blue)]"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">대표 연락처</label>
                      <input 
                        type="text" 
                        value={editSettings.contactPhone}
                        onChange={(e) => setEditSettings({...editSettings, contactPhone: e.target.value})}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-sky-blue)]"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'packages' && !isPackageFormOpen && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold">여행 상품 관리</h2>
                  <button 
                    onClick={() => handleOpenPackageForm()}
                    className="flex items-center gap-2 bg-gray-900 text-white px-4 py-2 rounded-lg font-medium hover:bg-black"
                  >
                    <Plus size={18} /> 새 상품 등록
                  </button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse min-w-[600px]">
                    <thead>
                      <tr className="border-b border-gray-200 text-gray-500 text-sm">
                        <th className="py-3 font-medium">상품명</th>
                        <th className="py-3 font-medium">섬</th>
                        <th className="py-3 font-medium">기간</th>
                        <th className="py-3 font-medium">가격</th>
                        <th className="py-3 font-medium text-right">관리</th>
                      </tr>
                    </thead>
                    <tbody>
                      {packages.map(pkg => (
                        <tr key={pkg.id} className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="py-4 font-medium text-gray-900">{pkg.title}</td>
                          <td className="py-4 text-gray-600">{pkg.island}</td>
                          <td className="py-4 text-gray-600">{pkg.duration}</td>
                          <td className="py-4 text-gray-600">{pkg.price.toLocaleString()}원</td>
                          <td className="py-4 text-right">
                            <button onClick={() => handleOpenPackageForm(pkg)} className="text-gray-400 hover:text-blue-600 mr-3"><Edit2 size={18} /></button>
                            <button onClick={() => handleDeletePackage(pkg.id)} className="text-gray-400 hover:text-red-600"><Trash2 size={18} /></button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {isPackageFormOpen && editingPackage && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <div className="flex items-center gap-4">
                    <button onClick={() => setIsPackageFormOpen(false)} className="text-gray-500 hover:text-gray-900">
                      <ArrowLeft size={24} />
                    </button>
                    <h2 className="text-xl font-bold">상품 {packages.find(p => p.id === editingPackage.id) ? '수정' : '등록'}</h2>
                  </div>
                  <button onClick={handleSavePackage} className="flex items-center gap-2 bg-[var(--color-sky-blue)] text-white px-4 py-2 rounded-lg font-medium hover:bg-[var(--color-sky-blue-dark)]">
                    <Save size={18} /> 저장
                  </button>
                </div>

                <div className="space-y-8">
                  {/* Basic Info */}
                  <div className="bg-gray-50 p-6 rounded-xl space-y-4">
                    <h3 className="font-bold text-gray-900 mb-4">기본 정보</h3>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">상품명</label>
                      <input 
                        type="text" 
                        value={editingPackage.title}
                        onChange={(e) => setEditingPackage({...editingPackage, title: e.target.value})}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-sky-blue)]"
                        placeholder="예: 프라이빗 요트와 함께하는 덕적도 힐링 투어"
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">섬 이름</label>
                        <input 
                          type="text" 
                          value={editingPackage.island}
                          onChange={(e) => setEditingPackage({...editingPackage, island: e.target.value})}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-sky-blue)]"
                          placeholder="예: 덕적도"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">여행 기간</label>
                        <input 
                          type="text" 
                          value={editingPackage.duration}
                          onChange={(e) => setEditingPackage({...editingPackage, duration: e.target.value})}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-sky-blue)]"
                          placeholder="예: 1박 2일"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">가격 (원)</label>
                        <input 
                          type="number" 
                          value={editingPackage.price}
                          onChange={(e) => setEditingPackage({...editingPackage, price: Number(e.target.value)})}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-sky-blue)]"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Images */}
                  <div className="bg-gray-50 p-6 rounded-xl space-y-4">
                    <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2"><ImageIcon size={18} /> 이미지 설정 (URL 입력)</h3>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">대표 이미지 URL</label>
                      <input 
                        type="text" 
                        value={editingPackage.image}
                        onChange={(e) => setEditingPackage({...editingPackage, image: e.target.value})}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-sky-blue)]"
                        placeholder="https://..."
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">추가 갤러리 이미지 URL</label>
                      {editingPackage.gallery?.map((url, idx) => (
                        <div key={idx} className="flex gap-2 mb-2">
                          <input 
                            type="text" 
                            value={url}
                            onChange={(e) => {
                              const newGallery = [...(editingPackage.gallery || [])];
                              newGallery[idx] = e.target.value;
                              setEditingPackage({...editingPackage, gallery: newGallery});
                            }}
                            className="flex-grow px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-sky-blue)]"
                            placeholder="https://..."
                          />
                          <button 
                            onClick={() => {
                              const newGallery = editingPackage.gallery?.filter((_, i) => i !== idx);
                              setEditingPackage({...editingPackage, gallery: newGallery});
                            }}
                            className="px-3 py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      ))}
                      <button 
                        onClick={() => setEditingPackage({...editingPackage, gallery: [...(editingPackage.gallery || []), '']})}
                        className="text-sm text-[var(--color-sky-blue)] font-medium hover:underline mt-2 flex items-center gap-1"
                      >
                        <Plus size={16} /> 갤러리 이미지 추가
                      </button>
                    </div>
                  </div>

                  {/* Ferry Info */}
                  <div className="bg-gray-50 p-6 rounded-xl space-y-4">
                    <h3 className="font-bold text-gray-900 mb-4">탑승 배편 안내</h3>
                    <div>
                      <textarea 
                        value={editingPackage.ferryInfo || ''}
                        onChange={(e) => setEditingPackage({...editingPackage, ferryInfo: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-sky-blue)] h-24"
                        placeholder="출항, 입항 시간 및 배편 정보를 입력하세요."
                      />
                    </div>
                  </div>

                  {/* Description */}
                  <div className="bg-gray-50 p-6 rounded-xl space-y-4">
                    <h3 className="font-bold text-gray-900 mb-4">상세 설명</h3>
                    <div>
                      <textarea 
                        value={editingPackage.description}
                        onChange={(e) => setEditingPackage({...editingPackage, description: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-sky-blue)] h-48"
                        placeholder="상품에 대한 상세한 설명을 입력하세요. 줄바꿈이 그대로 반영됩니다."
                      />
                    </div>
                  </div>

                  {/* Itinerary */}
                  <div className="bg-gray-50 p-6 rounded-xl space-y-4">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="font-bold text-gray-900">여행 일정</h3>
                      <button 
                        onClick={() => setEditingPackage({
                          ...editingPackage, 
                          itinerary: [...editingPackage.itinerary, { day: editingPackage.itinerary.length + 1, title: '', description: '' }]
                        })}
                        className="text-sm bg-gray-900 text-white px-3 py-1.5 rounded-lg flex items-center gap-1 hover:bg-black"
                      >
                        <Plus size={16} /> 일차 추가
                      </button>
                    </div>
                    
                    <div className="space-y-4">
                      {editingPackage.itinerary.map((item, idx) => (
                        <div key={idx} className="border border-gray-200 bg-white p-4 rounded-lg relative">
                          <button 
                            onClick={() => {
                              const newItinerary = editingPackage.itinerary.filter((_, i) => i !== idx);
                              setEditingPackage({...editingPackage, itinerary: newItinerary});
                            }}
                            className="absolute top-4 right-4 text-gray-400 hover:text-red-600"
                          >
                            <Trash2 size={18} />
                          </button>
                          
                          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-3 pr-8">
                            <div className="md:col-span-1">
                              <label className="block text-xs font-medium text-gray-500 mb-1">일차 (Day)</label>
                              <input 
                                type="number" 
                                value={item.day}
                                onChange={(e) => {
                                  const newItinerary = [...editingPackage.itinerary];
                                  newItinerary[idx].day = Number(e.target.value);
                                  setEditingPackage({...editingPackage, itinerary: newItinerary});
                                }}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-sky-blue)]"
                              />
                            </div>
                            <div className="md:col-span-3">
                              <label className="block text-xs font-medium text-gray-500 mb-1">일정 제목</label>
                              <input 
                                type="text" 
                                value={item.title}
                                onChange={(e) => {
                                  const newItinerary = [...editingPackage.itinerary];
                                  newItinerary[idx].title = e.target.value;
                                  setEditingPackage({...editingPackage, itinerary: newItinerary});
                                }}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-sky-blue)]"
                                placeholder="예: 프라이빗 라운지 미팅 및 요트 탑승"
                              />
                            </div>
                          </div>
                          <div>
                            <label className="block text-xs font-medium text-gray-500 mb-1">일정 상세 내용</label>
                            <textarea 
                              value={item.description}
                              onChange={(e) => {
                                const newItinerary = [...editingPackage.itinerary];
                                newItinerary[idx].description = e.target.value;
                                setEditingPackage({...editingPackage, itinerary: newItinerary});
                              }}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-sky-blue)] h-24"
                              placeholder="시간대별 상세 일정을 입력하세요."
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'magazines' && !isMagazineFormOpen && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold">매거진 관리</h2>
                  <button 
                    onClick={() => handleOpenMagazineForm()}
                    className="flex items-center gap-2 bg-gray-900 text-white px-4 py-2 rounded-lg font-medium hover:bg-black"
                  >
                    <Plus size={18} /> 새 글 작성
                  </button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse min-w-[600px]">
                    <thead>
                      <tr className="border-b border-gray-200 text-gray-500 text-sm">
                        <th className="py-3 font-medium">제목</th>
                        <th className="py-3 font-medium">카테고리</th>
                        <th className="py-3 font-medium">작성일</th>
                        <th className="py-3 font-medium text-right">관리</th>
                      </tr>
                    </thead>
                    <tbody>
                      {magazines.map(post => (
                        <tr key={post.id} className="border-b border-gray-100 hover:bg-gray-50">
                          <td className="py-4 font-medium text-gray-900">{post.title}</td>
                          <td className="py-4 text-gray-600">{post.category}</td>
                          <td className="py-4 text-gray-600">{post.date}</td>
                          <td className="py-4 text-right">
                            <button onClick={() => handleOpenMagazineForm(post)} className="text-gray-400 hover:text-blue-600 mr-3"><Edit2 size={18} /></button>
                            <button onClick={() => handleDeleteMagazine(post.id)} className="text-gray-400 hover:text-red-600"><Trash2 size={18} /></button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {isMagazineFormOpen && editingMagazine && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <div className="flex items-center gap-4">
                    <button onClick={() => setIsMagazineFormOpen(false)} className="text-gray-500 hover:text-gray-900">
                      <ArrowLeft size={24} />
                    </button>
                    <h2 className="text-xl font-bold">매거진 {magazines.find(m => m.id === editingMagazine.id) ? '수정' : '작성'}</h2>
                  </div>
                  <button onClick={handleSaveMagazine} className="flex items-center gap-2 bg-[var(--color-sky-blue)] text-white px-4 py-2 rounded-lg font-medium hover:bg-[var(--color-sky-blue-dark)]">
                    <Save size={18} /> 저장
                  </button>
                </div>

                <div className="space-y-8">
                  <div className="bg-gray-50 p-6 rounded-xl space-y-4">
                    <h3 className="font-bold text-gray-900 mb-4">기본 정보</h3>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">제목</label>
                      <input 
                        type="text" 
                        value={editingMagazine.title}
                        onChange={(e) => setEditingMagazine({...editingMagazine, title: e.target.value})}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-sky-blue)]"
                        placeholder="예: 2026년 봄, 꼭 가봐야 할 국내 섬 여행지 BEST 5"
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">카테고리</label>
                        <input 
                          type="text" 
                          value={editingMagazine.category}
                          onChange={(e) => setEditingMagazine({...editingMagazine, category: e.target.value})}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-sky-blue)]"
                          placeholder="예: 여행 팁"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">작성일</label>
                        <input 
                          type="text" 
                          value={editingMagazine.date}
                          onChange={(e) => setEditingMagazine({...editingMagazine, date: e.target.value})}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-sky-blue)]"
                          placeholder="예: 2026.04.15"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">대표 이미지 URL</label>
                      <input 
                        type="text" 
                        value={editingMagazine.image}
                        onChange={(e) => setEditingMagazine({...editingMagazine, image: e.target.value})}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-sky-blue)]"
                        placeholder="https://..."
                      />
                    </div>
                  </div>

                  <div className="bg-gray-50 p-6 rounded-xl space-y-4">
                    <h3 className="font-bold text-gray-900 mb-4">본문 내용</h3>
                    <div>
                      <textarea 
                        value={editingMagazine.content}
                        onChange={(e) => setEditingMagazine({...editingMagazine, content: e.target.value})}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-sky-blue)] h-64"
                        placeholder="본문 내용을 입력하세요. 줄바꿈이 그대로 반영됩니다."
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
