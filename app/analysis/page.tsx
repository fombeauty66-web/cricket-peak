"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft, BarChart3, TrendingUp, ShieldCheck, Zap, Activity } from "lucide-react";

export default function AnalysisDetail() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const miProb = Number(searchParams.get("mi")) || 52;

  return (
    <main className="mx-auto max-w-md min-h-screen bg-[#f1f5f9] text-[#001e3c] font-black italic uppercase antialiased">
      <header className="sticky top-0 z-50 bg-[#001e3c] p-5 flex justify-between items-center text-white">
        <button onClick={() => router.back()} className="p-2 bg-white/10 rounded-full"><ArrowLeft size={20}/></button>
        <span className="text-[10px] font-black tracking-widest">ADVANCED PRO ANALYSIS</span>
        <Activity size={20} className="text-yellow-400 animate-pulse"/>
      </header>

      <div className="p-6 space-y-6 pb-24">
        {/* 胜率大卡片 */}
        <section className="bg-white p-8 rounded-[3rem] shadow-2xl border border-slate-200">
          <h2 className="text-[10px] mb-6 text-blue-600 tracking-widest font-black uppercase italic">AI WIN PROBABILITY</h2>
          <div className="flex justify-between text-lg font-black mb-4 italic tracking-tighter">
            <span>Mumbai Indians: {miProb}%</span>
            <span>Chennai Kings: {100-miProb}%</span>
          </div>
          <div className="h-4 w-full bg-slate-100 rounded-full overflow-hidden flex shadow-inner">
            <div className="h-full bg-blue-600 shadow-[0_0_15px_rgba(37,99,235,0.5)] transition-all duration-1000" style={{width:`${miProb}%`}}></div>
            <div className="h-full bg-red-600 transition-all duration-1000" style={{width:`${100-miProb}%`}}></div>
          </div>
        </section>

        {/* 球员对位 */}
        <section className="bg-white p-8 rounded-[3rem] border border-slate-200 shadow-lg">
          <h2 className="text-[10px] mb-6 text-[#001e3c] flex items-center gap-2 font-black tracking-widest uppercase italic"><Zap size={14}/> KEY PLAYER MATCHUPS</h2>
          <div className="space-y-4">
            <div className="flex flex-col items-center gap-2 p-5 bg-slate-50 rounded-[2rem] border border-slate-100">
               <span className="text-[11px] font-black">Virat Kohli (Bat)</span>
               <span className="text-[9px] text-red-500 italic font-normal tracking-[0.4em]">VERSUS</span>
               <span className="text-[11px] font-black">Jasprit Bumrah (Bowl)</span>
            </div>
            <p className="text-[10px] text-slate-500 normal-case px-4 text-center italic font-black">Bumrah has the upper hand with 4 dismissals in IPL. Advantage: Bowler.</p>
          </div>
        </section>

        <button onClick={()=>window.open('https://cricketpeak.com/join-pro')} className="w-full bg-[#001e3c] text-yellow-400 py-6 rounded-[2rem] shadow-2xl flex items-center justify-center gap-2 active:scale-95 transition-all text-xs font-black italic tracking-widest">
          <ShieldCheck size={20}/> UNLOCK EXPERT TIPS ↗
        </button>
      </div>
    </main>
  );
}