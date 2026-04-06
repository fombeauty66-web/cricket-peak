"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft, MapPin, Wind, Droplets, Trophy, Info } from "lucide-react";
import { useEffect, useState } from "react";

export default function VenueDetail() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [lang, setLang] = useState<"EN" | "HI">("EN");

  useEffect(() => {
    const urlLang = searchParams.get("lang");
    if (urlLang === "HI") setLang("HI");
  }, [searchParams]);

  const t = {
    EN: { head: "STADIUM STATS", pitch: "PITCH REPORT", pace: "PACERS", spin: "SPINNERS", wea: "WEATHER", info: "WANKHEDE STADIUM IS KNOWN FOR SMALL BOUNDARIES AND HIGH SCORING CHASES.", btn: "GET DEPTH ANALYSIS ↗" },
    HI: { head: "स्टेडियम आँकड़े", pitch: "पिच रिपोर्ट", pace: "तेज गेंदबाज", spin: "स्पिनर", wea: "मौसम", info: "वानखेड़े स्टेडियम छोटी बाउंड्री और हाई स्कोरिंग चेस के लिए जाना जाता है।", btn: "गहन विश्लेषण प्राप्त करें ↗" }
  };

  return (
    <main className="mx-auto max-w-md min-h-screen bg-slate-50 text-[#001e3c] font-black italic uppercase">
      <header className="sticky top-0 z-50 bg-white p-4 flex justify-between items-center border-b shadow-sm">
        <button onClick={() => router.back()} className="p-2 bg-slate-100 rounded-full active:scale-90 transition-all"><ArrowLeft size={20}/></button>
        <span className="text-[10px] tracking-widest font-black">{t[lang].head}</span>
        <div className="flex bg-slate-100 p-1 rounded-full">
          <button onClick={() => setLang("EN")} className={`px-4 py-1 text-[9px] rounded-full font-black ${lang==='EN'?'bg-[#001e3c] text-white shadow-md':'text-slate-400'}`}>EN</button>
          <button onClick={() => setLang("HI")} className={`px-4 py-1 text-[9px] rounded-full font-black ${lang==='HI'?'bg-[#001e3c] text-white shadow-md':'text-slate-400'}`}>हिं</button>
        </div>
      </header>

      <div className="p-6 space-y-6">
        {/* 场馆展示卡片 */}
        <div className="aspect-video bg-[#001e3c] rounded-[2.5rem] flex items-center justify-center text-white flex-col gap-2 relative overflow-hidden shadow-2xl">
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          <MapPin size={48} className="text-yellow-400 relative z-10 animate-bounce"/>
          <p className="text-2xl relative z-10 font-black">WANKHEDE, MUMBAI</p>
        </div>

        {/* 投球手倾向分析 */}
        <section className="grid grid-cols-2 gap-4">
          <div className="bg-white p-5 rounded-[2rem] border shadow-sm flex flex-col items-center">
            <p className="text-[9px] text-slate-400 mb-1">{t[lang].pace}</p>
            <p className="text-xl text-blue-600">65% ADV</p>
            <div className="w-full h-1 bg-slate-100 mt-2 rounded-full overflow-hidden">
               <div className="h-full bg-blue-600" style={{width: '65%'}}></div>
            </div>
          </div>
          <div className="bg-white p-5 rounded-[2rem] border shadow-sm flex flex-col items-center">
            <p className="text-[9px] text-slate-400 mb-1">{t[lang].spin}</p>
            <p className="text-xl text-red-600">35% ADV</p>
            <div className="w-full h-1 bg-slate-100 mt-2 rounded-full overflow-hidden">
               <div className="h-full bg-red-600" style={{width: '35%'}}></div>
            </div>
          </div>
        </section>

        {/* 天气状况 */}
        <section className="bg-blue-50 p-6 rounded-[2.5rem] border border-blue-100 flex items-center justify-between shadow-inner">
          <div className="flex items-center gap-3">
             <Droplets size={24} className="text-blue-500"/>
             <div>
                <p className="text-[10px] text-blue-800 font-black tracking-widest">{t[lang].wea}</p>
                <p className="text-lg">65% HUMIDITY</p>
             </div>
          </div>
          <div className="text-right">
             <p className="text-[9px] text-blue-400">WIN SPEED</p>
             <p className="text-lg">12 KM/H</p>
          </div>
        </section>

        {/* 历史简报 */}
        <div className="bg-white p-6 rounded-[2.5rem] border shadow-sm italic space-y-4">
           <div className="flex items-center gap-2 text-blue-600"><Info size={14}/> <span className="text-[10px] tracking-widest">STADIUM INFO</span></div>
           <p className="text-sm leading-relaxed text-slate-600 normal-case">{t[lang].info}</p>
        </div>

        <button onClick={()=>window.open('https://cricketpeak.com/venue-pro','_blank')} className="w-full bg-[#001e3c] text-yellow-400 py-6 rounded-[2rem] shadow-2xl flex items-center justify-center gap-2 active:scale-95 transition-all">
          <Trophy size={18}/> {t[lang].btn}
        </button>
      </div>
    </main>
  );
}