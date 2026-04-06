"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { ArrowLeft, Share2, Calendar, Newspaper } from "lucide-react";
import { useEffect, useState } from "react";

export default function NewsDetail() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [lang, setLang] = useState<"EN" | "HI">("EN");

  useEffect(() => {
    const urlLang = searchParams.get("lang");
    if (urlLang === "HI") setLang("HI");
  }, [searchParams]);

  const content = {
    EN: { head: "ANALYTICS DETAIL", cat: "INSIGHTS", time: "2 HOURS AGO", title: "HARDIK PANDYA RETURNS TO TRAINING AT WANKHEDE", body: "THE MUMBAI INDIANS CAMP RECEIVED A MAJOR BOOST AS SKIPPER HARDIK PANDYA RESUMED FULL-THROTTLE TRAINING SESSIONS TODAY. EXPERTS BELIEVE THIS WILL DRASTICALLY CHANGE THE WIN PROBABILITY FOR THE NEXT MATCH.", btn: "GET DEPTH ANALYSIS ↗" },
    HI: { head: "विश्लेषण विवरण", cat: "इनसाइट्स", time: "2 घंटे पहले", title: "हार्दिक पांड्या वानखेड़े में ट्रेनिंग पर लौटे", body: "मुंबई इंडियंस के खेमे को आज बड़ा बढ़ावा मिला क्योंकि कप्तान हार्दिक पांड्या ने प्रशिक्षण सत्र फिर से शुरू कर दिया। विशेषज्ञों का मानना है कि इससे अगले मैच के लिए जीत की संभावना काफी बदल जाएगी।", btn: "गहन विश्लेषण प्राप्त करें ↗" }
  };

  return (
    <main className="mx-auto max-w-md min-h-screen bg-white text-[#001e3c] shadow-2xl relative font-sans antialiased uppercase italic font-black">
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md flex items-center justify-between p-4 border-b border-slate-100">
        <button onClick={() => router.back()} className="p-2 rounded-full bg-slate-100 active:scale-90 transition-all"><ArrowLeft size={20} /></button>
        <div className="flex bg-slate-100 p-1 rounded-full border border-slate-200">
          <button onClick={() => setLang("EN")} className={`px-4 py-1 text-[9px] font-black rounded-full transition-all ${lang === "EN" ? "bg-[#001e3c] text-white shadow-md" : "text-slate-400"}`}>EN</button>
          <button onClick={() => setLang("HI")} className={`px-4 py-1 text-[9px] font-black rounded-full transition-all ${lang === "HI" ? "bg-[#001e3c] text-white shadow-md" : "text-slate-400"}`}>हिं</button>
        </div>
        <button className="p-2 rounded-full bg-slate-100"><Share2 size={18} /></button>
      </header>
      <div className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <span className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-[9px] font-black border border-blue-100 uppercase">{content[lang].cat}</span>
          <span className="text-slate-400 text-[9px] font-black uppercase italic"><Calendar size={10}/> {content[lang].time}</span>
        </div>
        <h1 className="text-2xl font-black italic tracking-tighter leading-tight mb-6 text-[#001e3c] uppercase">{content[lang].title}</h1>
        <div className="aspect-video bg-slate-100 rounded-[2.5rem] mb-8 flex items-center justify-center text-slate-300 shadow-inner"><Newspaper size={64} className="opacity-20" /></div>
        <div className="space-y-4 text-slate-600 leading-relaxed text-sm italic"><p>{content[lang].body}</p></div>
        <button onClick={() => window.open('https://cricketpeak.com/analysis', '_blank')} className="w-full mt-10 bg-[#001e3c] text-yellow-400 py-4 rounded-[1.5rem] font-black shadow-xl uppercase tracking-widest active:scale-95 transition-all">{content[lang].btn}</button>
      </div>
    </main>
  );
}