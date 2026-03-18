/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Menu, 
  Zap, 
  Search, 
  Camera, 
  Image as ImageIcon, 
  Printer, 
  X, 
  Mic, 
  ChevronRight, 
  Crosshair,
  Check
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

// --- Types ---
interface WatermarkData {
  projectName: string;
  area: string;
  content: string;
  time: string;
  weather: string;
  location: string;
  altitude?: string;
}

type Screen = 'home' | 'edit' | 'speak' | 'final';

// --- Components ---

const WatermarkBox = ({ data, onClick }: { data: WatermarkData; onClick?: () => void }) => (
  <div 
    onClick={onClick}
    className="absolute bottom-40 left-4 bg-blue-600/40 backdrop-blur-md border border-white/20 p-3 rounded-sm text-[10px] leading-tight w-64 cursor-pointer"
  >
    <div className="flex items-center gap-2 mb-1 border-b border-white/20 pb-1">
      <div className="w-8 h-8 bg-blue-500 flex items-center justify-center text-[8px] font-bold text-white leading-none text-center">
        CSCEC
      </div>
      <span className="font-bold text-xs">{data.projectName}</span>
    </div>
    <div className="space-y-0.5">
      <p><span className="opacity-70">施工区域：</span>{data.area}</p>
      <p><span className="opacity-70">施工内容：</span>{data.content}</p>
      <p><span className="opacity-70">拍摄时间：</span>{data.time}</p>
      <p><span className="opacity-70">天&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;气：</span>{data.weather}</p>
      <p><span className="opacity-70">地&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;点：</span>{data.location}</p>
      {data.altitude && <p><span className="opacity-70">海&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;拔：</span>{data.altitude}</p>}
    </div>
  </div>
);

const ToggleRow = ({ label, value, active = true }: { label: string; value: string; active?: boolean }) => (
  <div className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
    <div className="flex items-center gap-3">
      <div className={`w-10 h-5 rounded-full relative transition-colors ${active ? 'bg-green-500' : 'bg-gray-200'}`}>
        <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow-sm transition-transform ${active ? 'left-5.5' : 'left-0.5'}`} />
      </div>
      <span className="text-sm text-gray-800">{label}</span>
    </div>
    <div className="flex items-center gap-1">
      <span className={`text-sm ${label.includes('施工') && value ? 'text-red-500' : 'text-gray-400'}`}>{value}</span>
      <ChevronRight size={16} className="text-gray-300" />
    </div>
  </div>
);

export default function App() {
  const [screen, setScreen] = useState<Screen>('home');
  const [showToast, setShowToast] = useState(false);
  const [watermarkData, setWatermarkData] = useState<WatermarkData>({
    projectName: '川西高速DX-2标段',
    area: 'D-S-10010',
    content: '电塔检修',
    time: '2021.12.27 15:35:24',
    weather: '晴 19℃ 东北风≤3级 湿度 16%',
    location: '四川·乐山绕城高速',
    altitude: '1392 米'
  });

  const handleVoiceFinish = () => {
    setWatermarkData(prev => ({
      ...prev,
      content: '外立面涂装，小工6人',
      area: '5号楼外立面'
    }));
    setScreen('edit');
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  };

  const renderHome = () => (
    <div className="relative h-screen w-full bg-gray-900 overflow-hidden flex flex-col">
      {/* Top Bar */}
      <div className="absolute top-0 left-0 right-0 p-4 flex items-center justify-between z-10 bg-gradient-to-b from-black/50 to-transparent">
        <div className="flex items-center gap-4">
          <Menu size={24} />
          <Zap size={24} />
        </div>
        <div className="bg-green-500/20 backdrop-blur-md px-3 py-1 rounded-full flex items-center gap-1 text-xs text-green-400 border border-green-500/30">
          <Check size={14} />
          <span>照片验真 {'>'}</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="font-bold text-blue-400 italic">VIP</span>
          <Camera size={24} />
        </div>
      </div>

      {/* Camera Preview Area */}
      <div className="flex-1 relative">
        <img 
          src="https://picsum.photos/seed/construction-site-2/800/1200" 
          alt="Home Site" 
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        
        <WatermarkBox data={watermarkData} onClick={() => setScreen('edit')} />

        <div className="absolute bottom-4 right-4 bg-blue-600 px-3 py-1.5 rounded-full flex items-center gap-1 text-xs font-bold">
          <span>+ 新项目</span>
        </div>
        <div className="absolute bottom-4 right-16">
          <Crosshair size={24} className="text-white" />
        </div>

        {/* New Feature Banner */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-r from-blue-600 to-green-400 p-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <X size={18} className="text-white/70" />
            <span className="text-xs font-medium">语音编辑水印功能上新了，快来试试吧~</span>
          </div>
          <button 
            onClick={() => setScreen('edit')}
            className="bg-blue-500 text-white px-4 py-1 rounded-lg text-xs font-bold"
          >
            前往
          </button>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="bg-white text-black p-6">
        <div className="flex items-center justify-around mb-8">
          <div className="flex flex-col items-center gap-2">
            <div className="w-12 h-12 border border-gray-200 rounded-xl flex items-center justify-center">
              <ImageIcon size={24} className="text-gray-600" />
            </div>
            <span className="text-xs text-gray-500">本地照片</span>
          </div>

          <div className="relative">
            <div className="w-20 h-20 bg-gradient-to-br from-pink-400 to-orange-400 rounded-full flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-sm">拍试试</span>
            </div>
            <div className="absolute -bottom-2 -right-2 transform rotate-12">
               <img src="https://img.icons8.com/color/48/hand-cursor.png" alt="click" className="w-8 h-8" />
            </div>
          </div>

          <div className="flex flex-col items-center gap-2">
            <div className="w-12 h-12 border border-gray-200 rounded-xl flex items-center justify-center">
              <Printer size={24} className="text-gray-600" />
            </div>
            <span className="text-xs text-gray-500">水印</span>
          </div>
        </div>

        <div className="flex justify-between px-2 text-sm text-gray-400 font-medium">
          <span>照片编辑</span>
          <span>视频</span>
          <span className="text-black relative">
            照片
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 bg-black rounded-full" />
          </span>
          <span>边拍边拼</span>
          <span className="text-blue-600">拼图汇报</span>
        </div>
      </div>
    </div>
  );

  const renderEdit = () => (
    <div className="relative h-screen w-full bg-black/60 flex flex-col justify-end">
      <div className="absolute inset-0 -z-10">
        <img 
          src="https://picsum.photos/seed/construction-worker-helmet/800/1200" 
          alt="Preview" 
          className="w-full h-full object-cover opacity-50"
          referrerPolicy="no-referrer"
        />
        <div className="absolute top-10 left-4 scale-90 origin-top-left">
           <WatermarkBox data={watermarkData} />
        </div>
      </div>

      {showToast && (
        <div className="absolute top-[40%] left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black/70 text-white px-8 py-4 rounded-lg z-50 text-base font-medium">
          识别成功
        </div>
      )}

      <motion.div 
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        className="bg-white rounded-t-3xl p-6 text-black"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold">编辑水印</h2>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1 text-blue-500 text-sm">
              <div className="w-5 h-5 border border-blue-500 rounded-full flex items-center justify-center">
                <Menu size={12} />
              </div>
              <span className="font-medium">设为团队水印</span>
            </div>
            <X size={24} className="text-gray-400 cursor-pointer" onClick={() => setScreen('home')} />
          </div>
        </div>

        <div className="relative mb-6">
          <div className="w-full h-32 bg-gray-50 border border-blue-200 rounded-xl p-4 text-sm text-gray-800 leading-relaxed">
            {watermarkData.content === '外立面涂装，小工6人' ? '五号楼外立面涂装，小工六人' : (
              <>
                语音对话或输入文本到此处，将自动识别信息<br />
                示例：二号楼外立面涂装，小工三人
              </>
            )}
          </div>
          <div className="absolute bottom-4 left-4 right-4 flex gap-4">
            <button 
              onClick={() => setScreen('speak')}
              className="flex-1 bg-gradient-to-r from-blue-500 to-green-400 text-white py-2.5 rounded-lg flex items-center justify-center gap-2 text-sm font-medium shadow-sm"
            >
              <Mic size={16} />
              语音输入
            </button>
            <button className="flex-1 bg-blue-500 text-white py-2.5 rounded-lg text-sm font-medium shadow-sm">
              提交识别
            </button>
          </div>
        </div>

        <div className="space-y-0">
          <ToggleRow label="品牌图 (logo)" value="" />
          <ToggleRow label="工程名称：" value={watermarkData.projectName} />
          <ToggleRow label="施工区域：" value={watermarkData.area} />
          <ToggleRow label="施工内容：" value={watermarkData.content} />
          <ToggleRow label="施工责任人" value="" active={false} />
        </div>

        <div className="flex gap-4 mt-8">
          <button className="flex-1 border border-gray-200 py-3 rounded-xl text-gray-600 font-medium">
            设置/另存为
          </button>
          <button 
            onClick={() => setScreen('final')}
            className="flex-1 bg-blue-500 text-white py-3 rounded-xl font-bold shadow-md"
          >
            完成
          </button>
        </div>
      </motion.div>
    </div>
  );

  const renderSpeak = () => (
    <div className="relative h-screen w-full bg-black/80 flex flex-col items-center justify-center p-8 text-center">
      <div className="absolute inset-0 -z-10">
        <img 
          src="https://picsum.photos/seed/construction-site-1/800/1200" 
          alt="Preview" 
          className="w-full h-full object-cover opacity-20"
          referrerPolicy="no-referrer"
        />
      </div>

      <div className="mb-12">
        <h2 className="text-xl font-bold mb-2">请对我说出</h2>
        <p className="text-gray-300 text-sm">示例：XX楼外立面涂装，小工X人</p>
      </div>

      <div className="relative mb-20">
        <div className="bg-gradient-to-br from-blue-400 to-green-300 w-48 h-24 rounded-2xl flex items-center justify-center gap-1 px-4">
          {[...Array(15)].map((_, i) => (
            <div 
              key={i} 
              className="waveform-bar" 
              style={{ animationDelay: `${i * 0.1}s` }} 
            />
          ))}
        </div>
        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-blue-400 rotate-45" />
      </div>

      <div className="w-full max-w-xs flex gap-4">
        <button 
          onClick={() => setScreen('edit')}
          className="flex-1 bg-white text-black py-4 rounded-xl font-bold"
        >
          不保存
        </button>
        <button 
          onClick={handleVoiceFinish}
          className="flex-1 bg-gradient-to-r from-blue-600 to-green-400 text-white py-4 rounded-xl font-bold"
        >
          说完了
        </button>
      </div>
    </div>
  );

  const renderFinal = () => (
    <div className="relative h-screen w-full bg-gray-900 overflow-hidden flex flex-col">
      {/* Top Bar */}
      <div className="absolute top-0 left-0 right-0 p-4 flex items-center justify-between z-10 bg-gradient-to-b from-black/50 to-transparent">
        <div className="flex items-center gap-4">
          <div className="relative">
            <Menu size={24} />
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-[10px] flex items-center justify-center">1</div>
          </div>
          <Zap size={24} />
        </div>
        <div className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-full flex items-center gap-1 text-xs">
          <Search size={14} />
          <span>附近兼职 {'>'}</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="font-bold text-blue-400 italic">VIP</span>
          <Camera size={24} />
        </div>
      </div>

      {/* Camera Preview Area */}
      <div className="flex-1 relative">
        <img 
          src="https://picsum.photos/seed/construction-site-1/800/1200" 
          alt="Final Site" 
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        
        {/* Zoom Controls */}
        <div className="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col gap-4 items-center">
          <div className="w-8 h-8 rounded-full bg-black/40 flex items-center justify-center text-[10px]">2</div>
          <div className="w-10 h-10 rounded-full border-2 border-white flex items-center justify-center text-xs font-bold">1x</div>
          <div className="text-[10px]">0.5</div>
        </div>

        <WatermarkBox data={watermarkData} onClick={() => setScreen('edit')} />

        <div className="absolute bottom-4 right-4 bg-blue-600 px-3 py-1.5 rounded-full flex items-center gap-1 text-xs font-bold">
          <span>+ 新项目</span>
        </div>
        <div className="absolute bottom-4 right-16">
          <Crosshair size={24} className="text-white" />
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="bg-white text-black p-6 rounded-t-3xl">
        <div className="flex justify-around mb-8 border-b border-gray-100 pb-4">
          <div className="flex items-center gap-1 text-blue-600 font-medium">
            <span>立即登录</span>
            <ChevronRight size={16} />
          </div>
          <div className="flex items-center gap-1 text-gray-500">
            <div className="w-5 h-5 bg-gray-200 rounded-full flex items-center justify-center">
               <Menu size={12} />
            </div>
            <span>我的团队</span>
          </div>
        </div>

        <div className="flex items-center justify-around mb-8">
          <div className="flex flex-col items-center gap-2">
            <div className="w-12 h-12 border border-gray-200 rounded-xl flex items-center justify-center">
              <ImageIcon size={24} className="text-gray-600" />
            </div>
            <span className="text-xs text-gray-500">本地照片</span>
          </div>

          <div className="w-20 h-20 bg-gradient-to-br from-pink-400 to-orange-400 rounded-full flex items-center justify-center shadow-lg">
            <span className="text-white font-bold text-sm">拍试试</span>
          </div>

          <div className="flex flex-col items-center gap-2">
            <div className="w-12 h-12 border border-gray-200 rounded-xl flex items-center justify-center">
              <Printer size={24} className="text-gray-600" />
            </div>
            <span className="text-xs text-gray-500">水印</span>
          </div>
        </div>

        <div className="flex justify-between px-2 text-sm text-gray-400 font-medium">
          <span>验真</span>
          <span>编辑</span>
          <span>视频</span>
          <span className="text-black relative">
            照片
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 bg-black rounded-full" />
          </span>
          <span>边拍边拼</span>
          <span className="text-blue-600">拼图汇报</span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="max-w-md mx-auto h-screen shadow-2xl relative overflow-hidden font-sans">
      <AnimatePresence mode="wait">
        {screen === 'home' && (
          <motion.div key="home" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            {renderHome()}
          </motion.div>
        )}
        {screen === 'edit' && (
          <motion.div key="edit" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            {renderEdit()}
          </motion.div>
        )}
        {screen === 'speak' && (
          <motion.div key="speak" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 1.1 }}>
            {renderSpeak()}
          </motion.div>
        )}
        {screen === 'final' && (
          <motion.div key="final" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            {renderFinal()}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
