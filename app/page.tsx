"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { 
  Zap, Trophy, PlayCircle, Share2, ChevronRight, Newspaper, 
  BarChart3, MapPin, Wind, Flame, Users, Calendar, Star, History
} from "lucide-react";

export default function Home() {
  const [data, setData] = useState<any>(null);
  const [mounted, setMounted] = useState(false);
  const [lang, setLang] = useState<"EN" | "HI">("EN");
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null); 
  const router = useRouter();

  const dict = {
    EN: { live: "LIVE CENTER", news: "LATEST NEWS", home: "DASHBOARD", install: "INSTALL", upcoming: "UPCOMING FIXTURES", recent: "RECENT RESULTS", rankings: "ICC RANKINGS", venue: "MATCH VENUE" },
    HI: { live: "लाइव सेंटर", news: "ताज़ा समाचार", home: "डैशボード", install: "इंस्टॉल", upcoming: "आगामी फिक्स्चर", recent: "हाल के परिणाम", rankings: "खिलाड़ी रैंकिंग", venue: "मैच स्थान" }
  };

  const upcomingMatches = [
    { id: 101, t1: "Gujarat Titans", t2: "Royal Challengers Bengaluru", date: "7 APR", time: "19:30" },
    { id: 102, t1: "Sunrisers Hyderabad", t2: "Delhi Capitals", date: "8 APR", time: "15:30" },
    { id: 103, t1: "Lucknow Super Giants", t2: "Mumbai Indians", date: "9 APR", time: "19:30" }
  ];

  const recentResults = [
    { id: 201, t1: "Lucknow Super Giants", t2: "Punjab Kings", result: "Lucknow Won By 21 Runs", score: "199/8 vs 178/5" },
    { id: 202, t1: "Rajasthan Royals", t2: "Delhi Capitals", result: "Rajasthan Won By 12 Runs", score: "185/5 vs 173/5" }
  ];

  const fullNews = [
    { id: 0, tEN: "Expert Analysis: Why Mumbai Indians' middle order is struggling", tHI: "विशेषज्ञ विश्लेषण: मुंबई इंडियंस का संघर्ष", time: "1H" },
    { id: 1, tEN: "IPL 2026: Top 5 breakout stars to watch this season", tHI: "IPL 2026: टॉप 5 सितारे", time: "3H" },
    { id: 2, tEN: "Pitch Report: Wankhede surface favors spinners tonight", tHI: "पिच रिपोर्ट: वानखेड़े की सतह", time: "5H" },
    { id: 3, tEN: "MS Dhoni's fitness update ahead of next clash", tHI: "धोनी की फिटनेस पर अपडेट", time: "8H" },
    { id: 4, tEN: "Fantasy Tips: Best Captain choices for tomorrow", tHI: "फंतासी टिप्स: कल के कप्तान", time: "10H" },
    { id: 5, tEN: "IPL 2026 Points Table: Tight race for Top 4", tHI: "अंक तालिका: टॉप 4 की रेस", time: "12H" }
  ];

  const getNewsThumb = (id: number) => {
    const colors = ['bg-[#001e3c]', 'bg-red-700', 'bg-yellow-600', 'bg-indigo-800', 'bg-emerald-700', 'bg-orange-700'];
    return (
      <div className={`${colors[id % 6]} w-full h-full rounded-2xl flex items-center justify-center text-white font-black text-xs italic shadow-lg border border-white/10 uppercase`}>
        {id % 2 === 0 ? "LIVE" : "PRO"}
      </div>
    );
  };

  useEffect(() => {
    setMounted(true);
    const handleBeforeInstallPrompt = (e: any) => { e.preventDefault(); setDeferredPrompt(e); };
    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    const sync = async () => {
      try {
        const res = await fetch(`/live_data.json?v=${Date.now()}`, { cache: 'no-store' });
        if (res.ok) { const json = await res.json(); setData(json); }
      } catch (e) { setData({ live: [{title:"IPL: Mumbai Indians vs Chennai Super Kings", score:"192/4", status:"LIVE"}] }); }
    };
    sync();
    return () => window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
  }, []);

  const handleInstallClick = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') setDeferredPrompt(null);
    } else { alert("Safari: Tap 'Share' then 'Add to Home Screen'"); }
  };

  if (!mounted || !data) return <div className="h-screen bg-[#001e3c]" />;

  return (
    <main className="mx-auto max-w-md min-h-screen bg-[#f1f5f9] pb-40 text-[#001e3c] relative font-sans italic font-black uppercase antialiased">
      
      {/* HEADER */}
      <header className="sticky top-0 z-50 flex items-center justify-between bg-[#001e3c] p-5 text-white shadow-xl">
        <div className="flex flex-col">
          <h1 className="text-2xl leading-none tracking-tighter font-black italic">CRICKET<span className="text-yellow-400">PEAK</span></h1>
          <span className="text-[8px] text-blue-400 font-bold tracking-[0.3em] mt-1 uppercase">PRO FINAL V1.2.7</span>
        </div>
        <div className="flex gap-1 bg-white/5 p-1 rounded-xl border border-white/10">
          <button onClick={() => setLang("EN")} className={`px-4 py-1.5 text-[9px] rounded-lg transition-all ${lang === "EN" ? "bg-white text-blue-900 shadow-md" : "text-blue-200 opacity-50"}`}>EN</button>
          <button onClick={() => setLang("HI")} className={`px-4 py-1.5 text-[9px] rounded-lg transition-all ${lang === "HI" ? "bg-white text-blue-900 shadow-md" : "text-blue-200 opacity-50"}`}>हिं</button>
        </div>
      </header>

      <div className="p-4 space-y-8">
        {/* 1. 直播快速入口 (VS 醒目红) */}
        <div onClick={() => router.push('/live')} className="bg-[#001e3c] rounded-[2.5rem] p-7 text-white shadow-[0_20px_50px_rgba(0,30,60,0.3)] border border-white/10 flex justify-between items-center active:scale-95 transition-all cursor-pointer relative overflow-hidden">
          <div className="flex flex-col relative z-10">
            <span className="text-[10px] text-red-500 animate-pulse font-black mb-2 tracking-[0.2em]">● {dict[lang].live}</span>
            <span className="text-lg font-black leading-tight max-w-[220px]">
              Mumbai Indians <span className="text-red-500 mx-1 text-sm font-black italic">VS</span> Chennai Super Kings
            </span>
          </div>
          <div className="bg-yellow-400 text-blue-900 p-4 rounded-3xl shadow-xl relative z-10"><ChevronRight size={24}/></div>
        </div>

        {/* 2. 横向预告 (VS 醒目红) */}
        <section className="space-y-4">
          <h2 className="text-[10px] text-blue-600 flex items-center gap-2 px-2 tracking-[0.2em] font-black uppercase"><Calendar size={14}/> {dict[lang].upcoming}</h2>
          <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2 px-1">
            {upcomingMatches.map((m) => (
              <div key={m.id} onClick={() => router.push(`/fixtures`)} className="min-w-[220px] bg-white p-6 rounded-[2.5rem] border border-slate-200 shadow-sm shrink-0 active:scale-95 transition-all cursor-pointer">
                <p className="text-[11px] font-black italic mb-3 text-blue-900 leading-tight h-10 uppercase">
                  {m.t1} <span className="text-red-600 block text-[9px] my-1 font-black">VS</span> {m.t2}
                </p>
                <div className="flex items-center justify-between font-black"><span className="text-xs">{m.date}</span><span className="text-xs text-red-600">{m.time}</span></div>
              </div>
            ))}
          </div>
        </section>

        {/* 3. 纵向赛果 (VS 醒目红) */}
        <section className="space-y-4">
          <h2 className="text-[10px] text-slate-400 flex items-center gap-2 px-2 tracking-[0.2em] font-black uppercase"><History size={14}/> {dict[lang].recent}</h2>
          <div className="space-y-4">
            {recentResults.map((r) => (
              <div key={r.id} onClick={() => router.push(`/fixtures`)} className="bg-white p-6 rounded-[2.5rem] border border-slate-200 shadow-sm flex flex-col gap-2 active:scale-95 transition-all cursor-pointer">
                <div className="flex justify-between items-center mb-1">
                   <span className="text-[11px] font-black text-blue-900 uppercase">
                     {r.t1} <span className="text-red-600 mx-1 font-black text-[9px]">VS</span> {r.t2}
                   </span>
                   <span className="text-[8px] bg-slate-100 px-3 py-1.5 rounded-full text-slate-500 font-black uppercase">FINAL</span>
                </div>
                <div className="flex justify-between items-end"><p className="text-[10px] text-slate-500 font-mono italic font-black">{r.score}</p><p className="text-[10px] text-green-600 font-black tracking-tight italic">{r.result}</p></div>
              </div>
            ))}
          </div>
        </section>

        {/* 4. 功能矩阵 */}
        <div className="grid grid-cols-2 gap-4">
          <div onClick={() => router.push(`/rankings`)} className="bg-white rounded-[2.5rem] p-7 shadow-xl border border-slate-200 flex flex-col items-center gap-3 active:scale-95 transition-all cursor-pointer">
            <Users size={32} className="text-blue-600"/><span className="text-[10px] font-black uppercase tracking-widest">{dict[lang].rankings}</span>
          </div>
          <div onClick={() => router.push(`/venue`)} className="bg-white rounded-[2.5rem] p-7 shadow-xl border border-slate-200 flex flex-col items-center gap-3 active:scale-95 transition-all cursor-pointer">
            <MapPin size={32} className="text-red-600"/><span className="text-[10px] font-black uppercase tracking-widest">{dict[lang].venue}</span>
          </div>
        </div>

        {/* 5. 6条新闻展示 */}
        <section className="space-y-5 mb-20 px-1">
          <h2 className="text-[10px] text-slate-400 tracking-[0.3em] font-black uppercase px-1">{dict[lang].news}</h2>
          {fullNews.map((n, i) => (
            <div key={i} onClick={() => router.push(`/news/${n.id}`)} className="group bg-white rounded-[2.5rem] p-5 flex gap-5 border border-slate-200 shadow-sm cursor-pointer active:scale-[0.98] transition-all">
              <div className="w-24 h-24 shrink-0">{getNewsThumb(n.id)}</div>
              <div className="flex-1 flex flex-col justify-center pr-2 font-black overflow-hidden">
                <h3 className="text-[13px] font-black leading-snug line-clamp-2 uppercase italic text-slate-800">{lang === "EN" ? n.tEN : n.tHI}</h3>
                <p className="text-[9px] text-blue-600 uppercase mt-3 font-black italic tracking-[0.2em]">{n.time} AGO</p>
              </div>
              <ChevronRight size={18} className="self-center text-slate-200" />
            </div>
          ))}
        </section>
      </div>

      {/* FOOTER NAV */}
      <nav className="fixed bottom-8 left-0 right-0 max-w-md mx-auto z-50 px-8">
        <div className="bg-white/95 backdrop-blur-3xl border border-white/50 shadow-[0_-20px_60px_rgba(0,0,0,0.15)] rounded-[3rem] flex justify-between items-center p-3 h-24">
          <button onClick={() => router.push('/')} className="flex-1 h-full flex flex-col items-center justify-center rounded-[2.2rem] bg-[#001e3c] text-white shadow-2xl scale-105">
            <Trophy size={24}/><span className="text-[10px] mt-1.5 font-black uppercase tracking-widest italic">{dict[lang].home}</span>
          </button>
          <button onClick={() => router.push('/live')} className="flex-1 h-full flex flex-col items-center justify-center rounded-[2.2rem] text-slate-400 transition-all">
            <Zap size={24}/><span className="text-[10px] mt-1.5 font-black uppercase tracking-widest italic">{dict[lang].live}</span>
          </button>
          <button onClick={handleInstallClick} className="flex-1 h-full flex flex-col items-center justify-center text-slate-400 active:scale-90 transition-all">
            <Share2 size={24}/><span className="text-[10px] mt-1.5 font-black uppercase tracking-widest italic">{dict[lang].install}</span>
          </button>
        </div>
      </nav>
    </main>
  );
}