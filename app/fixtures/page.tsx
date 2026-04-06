"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft, Calendar, Bell, Zap, MapPin } from "lucide-react";
import { useState } from "react";

export default function FixturesPage() {
  const router = useRouter();
  const [lang, setLang] = useState<"EN" | "HI">("EN");

  const dict = {
    EN: { head: "ICC FIXTURES 2026", sub: "FULL SCHEDULE", btn: "MATCH PREDICTION ↗", preview: "PRO PREVIEW" },
    HI: { head: "ICC फिक्स्चर 2026", sub: "पूरा शेड्यूल", btn: "मैच भविष्यवाणी ↗", preview: "प्रो पूर्वावलोकन" }
  };

  // 球队全称数据
  const fixtures = [
    { 
      id: 1, 
      t1: "Gujarat Titans", 
      t2: "Royal Challengers Bengaluru", 
      date: "7 APR", 
      time: "19:30", 
      venue: "Narendra Modi Stadium" 
    },
    { 
      id: 2, 
      t1: "Sunrisers Hyderabad", 
      t2: "Delhi Capitals", 
      date: "8 APR", 
      time: "15:30", 
      venue: "Uppal Stadium" 
    },
    { 
      id: 3, 
      t1: "Punjab Kings", 
      t2: "Rajasthan Royals", 
      date: "9 APR", 
      time: "19:30", 
      venue: "Mohali Park" 
    },
    { 
      id: 4, 
      t1: "Lucknow Super Giants", 
      t2: "Mumbai Indians", 
      date: "10 APR", 
      time: "19:30", 
      venue: "Ekana Stadium" 
    }
  ];

  return (
    <main className="mx-auto max-w-md min-h-screen bg-[#f1f5f9] text-[#001e3c] font-black italic uppercase antialiased pb-20">
      
      {/* HEADER */}
      <header className="sticky top-0 z-50 bg-white p-5 flex justify-between items-center border-b shadow-md">
        <button onClick={() => router.back()} className="p-2 bg-slate-100 rounded-full active:scale-90 transition-all">
          <ArrowLeft size={20}/>
        </button>
        <span className="text-[10px] tracking-[0.2em] font-black">{dict[lang].head}</span>
        <div className="flex bg-slate-100 p-1 rounded-full text-[9px]">
          <button onClick={() => setLang("EN")} className={`px-4 py-1 rounded-full ${lang === 'EN' ? 'bg-[#001e3c] text-white shadow-md' : 'text-slate-400'}`}>EN</button>
          <button onClick={() => setLang("HI")} className={`px-4 py-1 rounded-full ${lang === 'HI' ? 'bg-[#001e3c] text-white shadow-md' : 'text-slate-400'}`}>हिं</button>
        </div>
      </header>

      <div className="p-4 space-y-6">
        {/* SUB HEADER */}
        <div className="bg-[#001e3c] p-6 rounded-[2.5rem] flex justify-between items-center shadow-xl">
          <span className="text-yellow-400 text-[10px] tracking-[0.3em] font-black">{dict[lang].sub}</span>
          <Calendar size={20} className="text-white opacity-40"/>
        </div>

        {/* FIXTURE LIST */}
        <div className="space-y-6">
          {fixtures.map((m) => (
            <div key={m.id} className="bg-white rounded-[2.8rem] p-7 shadow-lg border border-slate-200 relative overflow-hidden active:scale-[0.98] transition-all group">
              
              {/* TOP TAGS */}
              <div className="flex justify-between items-center mb-6">
                <span className="text-[8px] bg-blue-50 text-blue-600 px-3 py-1.5 rounded-full border border-blue-100 font-black tracking-widest italic uppercase">
                  {dict[lang].preview}
                </span>
                <Bell size={16} className="text-slate-200 group-hover:text-yellow-400 transition-colors"/>
              </div>

              {/* TEAMS & VS (醒目红样式) */}
              <div className="flex flex-col items-center text-center gap-1 mb-6 px-2">
                <div className="text-[14px] font-black leading-tight text-[#001e3c] uppercase tracking-tighter">
                  {m.t1}
                </div>
                {/* 醒目红 VS 锁定 */}
                <div className="text-[10px] text-red-600 font-black my-2 tracking-[0.4em] italic leading-none">VS</div>
                <div className="text-[14px] font-black leading-tight text-[#001e3c] uppercase tracking-tighter">
                  {m.t2}
                </div>
              </div>

              {/* VENUE & TIME */}
              <div className="flex justify-between items-end border-t border-slate-50 pt-5 mb-6">
                <div className="flex flex-col gap-1">
                   <p className="text-[8px] text-slate-400 flex items-center gap-1 font-black">
                     <MapPin size={10} className="text-blue-500"/> {m.venue}
                   </p>
                </div>
                <div className="text-right">
                   <p className="text-sm font-black text-red-600 leading-none">{m.date}, {m.time}</p>
                   <p className="text-[7px] text-slate-300 mt-1 uppercase font-bold tracking-widest italic leading-none">LOCAL TIME</p>
                </div>
              </div>

              {/* ACTION BUTTON */}
              <button 
                onClick={() => window.open('https://cricketpeak.com/prediction', '_blank')}
                className="w-full bg-[#001e3c] text-yellow-400 py-5 rounded-[1.8rem] text-[10px] font-black uppercase shadow-xl flex items-center justify-center gap-2 tracking-[0.2em] italic active:bg-blue-900 transition-colors"
              >
                <Zap size={14} className="fill-current animate-pulse"/> {dict[lang].btn}
              </button>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}