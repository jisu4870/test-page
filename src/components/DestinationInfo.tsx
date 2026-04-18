import React, { useState, useEffect } from 'react';
import { Sun, Cloud, CloudRain, Thermometer, Wind, MapPin } from 'lucide-react';

interface WeatherInfoProps {
  location: string;
}

export default function DestinationInfo({ location }: WeatherInfoProps) {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Mock weather data based on location
  const weatherData = {
    temp: 18,
    condition: '맑음',
    humidity: 45,
    wind: 3.2,
    icon: <Sun className="text-yellow-500" size={32} />
  };

  return (
    <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-6 text-white shadow-lg overflow-hidden relative">
      <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl"></div>
      
      <div className="flex items-center gap-2 mb-4 text-white/80">
        <MapPin size={14} />
        <span className="text-xs font-bold uppercase tracking-wider">{location} 현지 정보</span>
      </div>

      <div className="flex justify-between items-end mb-6">
        <div>
          <div className="text-4xl font-bold flex items-center gap-2">
            {weatherData.temp}°<span className="text-lg font-medium text-white/70">/ {weatherData.condition}</span>
          </div>
          <div className="text-sm text-white/80 mt-1">현지 시간 {currentTime.toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit' })}</div>
        </div>
        <div className="bg-white/20 backdrop-blur-md p-3 rounded-2xl">
          {weatherData.icon}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 pt-4 border-t border-white/20">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-white/10 rounded-lg">
            <Thermometer size={14} />
          </div>
          <div className="text-[10px]">
            <p className="text-white/60">습도</p>
            <p className="font-bold">{weatherData.humidity}%</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="p-2 bg-white/10 rounded-lg">
            <Wind size={14} />
          </div>
          <div className="text-[10px]">
            <p className="text-white/60">풍속</p>
            <p className="font-bold">{weatherData.wind}m/s</p>
          </div>
        </div>
      </div>
      
      <div className="mt-4 p-3 bg-white/10 rounded-xl text-[10px] leading-relaxed text-white/90">
        <p className="font-bold mb-1">💡 여행 팁</p>
        <p>기온이 따뜻해 트레킹하기 좋은 날씨입니다. 해안가라 바람이 불 수 있으니 얇은 겉옷을 준비하세요.</p>
      </div>
    </div>
  );
}
