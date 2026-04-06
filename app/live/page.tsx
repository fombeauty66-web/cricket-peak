"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { 
  ArrowLeft, Zap, Activity, Star, Trophy, 
  ChevronRight, Timer, Info, BarChart3, Calendar, MapPin 
} from "lucide-react";

export default function LiveCenterPage() {
  const router = useRouter();
  const [data, setData] = useState<any>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const sync = async () => {
      try {
        const res = await fetch(`/live_data.json?v=${Date.now()}`, { cache: 'no-store' });
        if (res.ok) { const json = await res.json(); setData(json); }
      } catch (e) { console.error("Live sync failed"); }
    };
    sync();
    const timer = setInterval(sync, 5000);
    return () => clearInterval(timer);
  }, []);

  if (!mounted || !data) return <div className="h-screen bg-[#001e3c]" />;

  const activeMatch = data.live && data.live.length > 0 ? data.live[0] : null;
  const isMatchLive = activeMatch && activeMatch.status === "LIVE";

  return (
    <main className="mx-auto max-w-md min-h-screen bg-[#f8fafc] text-[#001e3c] font-black italic uppercase antialiased pb-10">
      <header className="sticky top-0 z-50 bg-[#001e3c] p-5 flex justify-between items-center text-white shadow-2xl">
        <button onClick={() => router.back()} className="p-2 bg-white/10 rounded-full active:scale-90 transition-all"><ArrowLeft size={20}/></button>
        <div className="flex flex-col items-center">
          <span className="text-[10px] tracking-[0.3em] font-black">MATCH CENTER</span>
          {isMatchLive && <span className="text-[7px] text-red-500 animate-pulse mt-0.5">● REAL-TIME DATA</span>}
        </div>
        <div className="w-10"></div>
      </header>

      <div className="p-4 space-y-6">
        {isMatchLive ? (
          <div className="space-y-6 animate-in fade-in zoom-in duration-500">
            <div className="bg-white rounded-[3.5rem] p-10 shadow-2xl border-4 border-white text-center relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-3 bg-red-600 animate-pulse"></div>
              <p className="text-[10px] text-red-600 font-black mb-10 tracking-[0.4em]">LIVE IN PROGRESS</p>
              <div className="flex justify-between items-center mb-10 px-2">
                <div className="flex flex-col items-center gap-3">
                    <div className="w-16 h-16 rounded-full bg-[#001e3c] border-4 border-slate-100 shadow-lg flex items-center justify-center text-white text-[10px] font-black italic">MUMBAI</div>
                </div>
                {/* 直播页 VS 同步红色 */}
                <div className="text-[11px] text-red-600 font-black italic uppercase tracking-[0.4em] mx-2 text-center">VS</div>
                <div className="flex flex-col items-center gap-3">
                    <div className="w-16 h-16 rounded-full bg-yellow-500 border-4 border-slate-100 shadow-lg flex items-center justify-center text-blue-900 text-[10px] font-black italic">CHENNAI</div>
                </div>
              </div>
              <div className="text-6xl font-mono tracking-tighter mb-10 italic font-black text-[#001e3c] uppercase leading-none">{activeMatch.score}</div>
              <div className="space-y-5 bg-slate-50 p-8 rounded-[3rem] border border-slate-200 italic shadow-inner">
                <div className="flex justify-between text-[11px] font-black uppercase px-2"><span className="text-blue-700">MUMBAI: 52%</span><span className="text-red-700">CHENNAI: 48%</span></div>
                <div className="h-4 w-full bg-slate-200 rounded-full flex overflow-hidden shadow-inner"><div className="h-full bg-blue-600 w-[52%] shadow-[0_0_20px_rgba(37,99,235,0.4)] transition-all duration-1000"></div><div className="h-full bg-red-600 w-[48%]"></div></div>
              </div>
              <button onClick={()=>window.open('https://cricketpeak.com/pro-analysis','_blank')} className="w-full mt-8 bg-[#001e3c] text-yellow-400 py-6 rounded-[2rem] text-xs font-black uppercase shadow-2xl active:scale-95 tracking-[0.2em] italic font-black">EXPERT ANALYSIS ↗</button>
            </div>
            {/* 柱状图 & Fantasy 锁定保留 */}
            <section className="bg-white p-8 rounded-[3rem] shadow-xl border border-slate-200 italic">
               <h2 className="text-[10px] text-blue-600 flex items-center gap-2 px-2 tracking-[0.2em] font-black uppercase mb-6"><Activity size={16}/> MATCH MOMENTUM</h2>
               <div className="flex items-end justify-between h-20 gap-2 px-4">
                 {[45, 75, 35, 95, 55, 65, 85, 25, 60, 80].map((v, i) => (
                   <div key={i} className={`w-full rounded-t-xl transition-all duration-700 ${i === 9 ? 'bg-yellow-400 animate-pulse' : 'bg-slate-200'}`} style={{ height: `${v}%` }}></div>
                 ))}
               </div>
            </section>
          </div>
        ) : (
          <div className="bg-white rounded-[3rem] p-8 shadow-xl border border-slate-200 text-center">
            <div className="flex justify-center mb-6"><div className="bg-slate-100 p-4 rounded-full text-slate-400"><Info size={32}/></div></div>
            <h2 className="text-sm font-black mb-2 tracking-widest text-slate-400 uppercase">NO LIVE MATCH</h2>
            <div className="bg-slate-50 rounded-[2.5rem] p-8 border border-slate-100 italic">
                <p className="text-[11px] font-black text-blue-900 mb-4 tracking-tighter uppercase">Mumbai Indians <span className="text-red-600">VS</span> Chennai Super Kings</p>
                <div className="text-3xl font-mono font-black text-[#001e3c] mb-4 italic uppercase">MI 155/9, CSK 158/6</div>
                <div className="bg-green-100 text-green-700 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest">Chennai Kings Won</div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}