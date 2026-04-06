"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft, Trophy, Medal, Star, TrendingUp } from "lucide-react";
import { useEffect, useState } from "react";

export default function RankingsDetail() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [lang, setLang] = useState<"EN" | "HI">("EN");
  const [activeTab, setActiveTab] = useState<"BAT" | "BOWL" | "AR">("BAT");

  useEffect(() => {
    const urlLang = searchParams.get("lang");
    if (urlLang === "HI") setLang("HI");
  }, [searchParams]);

  const t = {
    EN: { head: "PLAYER RANKINGS", bat: "BATTERS", bowl: "BOWLERS", ar: "ALL-ROUNDERS", rating: "RATING", btn: "ANALYSIS PRO ↗" },
    HI: { head: "खिलाड़ी रैंकिंग", bat: "बल्लेबाज", bowl: "गेंदबाज", ar: "ऑलराउंडर", rating: "रेटिंग", btn: "विश्लेषण प्रो ↗" }
  };

  const rankingsData = {
    BAT: [
      { rank: 1, name: "Babar Azam", team: "PAK", rating: 824 },
      { rank: 2, name: "Shubman Gill", team: "IND", rating: 801 },
      { rank: 3, name: "Virat Kohli", team: "IND", rating: 768 }
    ],
    BOWL: [
      { rank: 1, name: "Rashid Khan", team: "AFG", rating: 726 },
      { rank: 2, name: "Josh Hazlewood", team: "AUS", rating: 712 },
      { rank: 3, name: "Jasprit Bumrah", team: "IND", rating: 705 }
    ],
    AR: [
      { rank: 1, name: "Shakib Al Hasan", team: "BAN", rating: 310 },
      { rank: 2, name: "Mohammad Nabi", team: "AFG", rating: 298 },
      { rank: 3, name: "Hardik Pandya", team: "IND", rating: 285 }
    ]
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

      <div className="p-4 space-y-4">
        {/* 分类切换 Tab */}
        <div className="flex bg-white p-1 rounded-2xl border shadow-sm">
          {(['BAT', 'BOWL', 'AR'] as const).map((tab) => (
            <button 
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 py-3 text-[10px] font-black rounded-xl transition-all ${activeTab === tab ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-400'}`}
            >
              {t[lang][tab.toLowerCase() as keyof typeof t.EN]}
            </button>
          ))}
        </div>

        {/* 排名列表 */}
        <div className="space-y-3">
          {rankingsData[activeTab].map((p, i) => (
            <div key={i} className="bg-white p-5 rounded-[2rem] border shadow-sm flex items-center justify-between group active:scale-95 transition-all">
              <div className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-black italic ${p.rank === 1 ? 'bg-yellow-400 text-[#001e3c]' : 'bg-slate-100 text-slate-400'}`}>
                  {p.rank === 1 ? <Medal size={20}/> : p.rank}
                </div>
                <div>
                  <p className="text-sm font-black">{p.name}</p>
                  <p className="text-[9px] text-blue-600 font-bold">{p.team} • {t[lang].bat}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xs text-slate-400 leading-none">{t[lang].rating}</p>
                <p className="text-lg font-mono text-[#001e3c] leading-none mt-1">{p.rating}</p>
              </div>
            </div>
          ))}
        </div>

        {/* 专家深度分析引导 */}
        <button onClick={()=>window.open('https://cricketpeak.com/player-stats','_blank')} className="w-full mt-4 bg-[#001e3c] text-yellow-400 py-6 rounded-[2rem] shadow-2xl flex items-center justify-center gap-2 active:scale-95 transition-all">
          <Star size={18} className="fill-current"/> {t[lang].btn}
        </button>
      </div>
    </main>
  );
}