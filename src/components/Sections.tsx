import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';

export function Home() {
  return (
    <section id="home" className="min-h-screen flex flex-col justify-center px-8 md:px-16 pt-20 relative overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover opacity-10 grayscale"
        >
          <source src="https://assets.mixkit.co/videos/preview/mixkit-modern-architectural-white-building-interiors-42563-large.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-r from-[#E9E7E2] via-[#E9E7E2]/40 to-transparent" />
      </div>

      <div className="max-w-4xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-[clamp(3.5rem,10vw,8rem)] font-serif leading-[0.9] tracking-tighter mb-12 text-[#1E1D20]"
        >
          Architectural <br />
          <span className="italic ml-[0.5em] text-[#8C4E39]">Growth</span> Agency
        </motion.div>
        
        <div className="flex flex-col md:flex-row gap-12 md:items-end">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="max-w-md text-sm leading-relaxed tracking-wide text-[#1E1D20]/70 font-sans"
          >
            We transform visionary architecture into global prestige. VEDUL specializes in scaling 
            pioneer design studios through strategic expansion and aesthetic narrative.
          </motion.div>
          
          <motion.button 
            whileHover={{ x: 10 }}
            className="flex items-center gap-4 text-xs font-semibold uppercase tracking-[0.3em] group text-[#1E1D20]/60 hover:text-[#8C4E39] transition-colors"
          >
            Explore Projects <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </motion.button>
        </div>
      </div>

      {/* Decorative large number */}
      <div className="absolute right-0 bottom-0 opacity-[0.03] pointer-events-none select-none overflow-hidden translate-x-1/4 translate-y-1/4">
        <span className="text-[50rem] font-serif leading-none text-[#1E1D20]">01</span>
      </div>
    </section>
  );
}

export function About() {
  return (
    <section id="about" className="min-h-screen py-32 px-8 md:px-16 bg-[#1E1D20] text-[#E9E7E2] overflow-hidden relative">
      <div className="grid md:grid-cols-2 gap-20 items-center">
        <div className="relative aspect-[4/5] rounded-[24px] overflow-hidden border border-white/5">
          <motion.img 
            initial={{ scale: 1.2 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 1.5 }}
            src="https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&q=80&w=1200" 
            alt="Architectural detail"
            className="w-full h-full object-cover grayscale opacity-50 hover:opacity-100 hover:grayscale-0 transition-all duration-1000"
          />
        </div>
        
        <div className="flex flex-col gap-8">
          <motion.h2 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="text-5xl md:text-7xl font-serif tracking-tight text-[#E9E7E2]"
          >
            Refining the <br />
            <span className="italic">Perspective</span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-lg text-[#E9E7E2]/70 leading-relaxed font-light max-w-lg"
          >
            At VEDUL, we believe that growth is not just about scaling, but about deepening 
            the resonance of a brand's architectural signature. Our approach is surgical, 
            blending elite aesthetics with robust market positioning.
          </motion.p>
          
          <div className="flex gap-16 mt-8">
            <div className="p-6 bg-white/5 rounded-2xl border border-white/5">
              <p className="font-serif text-4xl mb-1 italic text-[#8C4E39]">12+</p>
              <p className="text-[10px] uppercase tracking-widest text-[#E9E7E2]/40 font-semibold">Global Studios</p>
            </div>
            <div className="p-6 bg-white/5 rounded-2xl border border-white/5">
              <p className="font-serif text-4xl mb-1 italic text-[#8C4E39]">450m</p>
              <p className="text-[10px] uppercase tracking-widest text-[#E9E7E2]/40 font-semibold">Valuation</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Services() {
  const serviceList = [
    { title: "Brand Identity", desc: "Crafting the visual soul of architectural excellence." },
    { title: "Strategic Positioning", desc: "Aligning your vision with ultra-high-net-worth clients." },
    { title: "Visual Narrative", desc: "High-end content production that speaks prestige." },
    { title: "Global Expansion", desc: "Bridging the gap between local design and global markets." },
  ];

  return (
    <section id="services" className="py-32 px-8 md:px-16 container mx-auto">
      <div className="text-center mb-24">
        <p className="text-[10px] uppercase tracking-[0.4em] text-[#8C4E39] mb-4 font-bold">Our Expertise</p>
        <h2 className="text-6xl md:text-8xl font-serif tracking-tighter text-[#1E1D20]">Growth Ecosystem</h2>
      </div>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {serviceList.map((service, idx) => (
          <motion.div 
            key={idx}
            whileHover={{ y: -10 }}
            className="bg-white/40 border border-black/5 p-12 aspect-square flex flex-col justify-between group hover:bg-[#1E1D20] transition-all duration-500 rounded-[32px]"
          >
            <span className="text-sm font-semibold opacity-30 group-hover:text-[#8C4E39]">0{idx + 1}</span>
            <div>
              <h3 className="text-2xl font-serif mb-4 text-[#1E1D20] group-hover:text-[#E9E7E2] transition-colors">{service.title}</h3>
              <p className="text-sm font-light leading-relaxed text-[#1E1D20]/60 group-hover:text-[#E9E7E2]/60 transition-colors">{service.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export function Contact() {
  return (
    <section id="contact" className="py-32 px-8 md:px-16 bg-[#E9E7E2]/50">
      <div className="flex flex-col md:flex-row justify-between items-start gap-20">
        <div className="max-w-md">
          <h2 className="text-7xl font-serif tracking-tighter mb-8 italic text-[#1E1D20]">Begin the <br />Transition</h2>
          <p className="text-[#1E1D20]/60 font-light mb-12">
            Elevate your studio's trajectory. We accept selective partnerships per quarter to ensure 
            architectural integrity.
          </p>
          
          <div className="space-y-6">
            <a href="mailto:hello@vedul.agency" className="block text-2xl font-serif hover:text-[#8C4E39] transition-colors underline decoration-black/10 underline-offset-8">
              hello@vedul.agency
            </a>
            <div className="text-[10px] uppercase tracking-widest space-y-2 text-[#1E1D20]/40 font-semibold">
              <div>Paris — London — New York</div>
              <div>© 2025 VEDUL AGENCY</div>
            </div>
          </div>
        </div>
        
        <div className="w-full md:w-1/2 bg-white/40 backdrop-blur-sm p-12 border border-black/5 rounded-[40px]">
          <form className="space-y-12">
            <div className="relative group">
              <input type="text" placeholder="Your Name" className="w-full bg-transparent border-b border-black/10 py-4 focus:outline-none focus:border-[#8C4E39] font-serif italic text-xl px-2 transition-all" />
              <label className="absolute -top-4 left-0 text-[9px] uppercase tracking-widest text-[#1E1D20]/40 font-semibold scale-90 origin-left transition-transform group-focus-within:translate-y-[-2px]">Full Name</label>
            </div>
            <div className="relative group">
              <input type="email" placeholder="Your Agency" className="w-full bg-transparent border-b border-black/10 py-4 focus:outline-none focus:border-[#8C4E39] font-serif italic text-xl px-2 transition-all" />
              <label className="absolute -top-4 left-0 text-[9px] uppercase tracking-widest text-[#1E1D20]/40 font-semibold scale-90 origin-left transition-transform group-focus-within:translate-y-[-2px]">Agency Domain</label>
            </div>
            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-[#1E1D20] text-[#E9E7E2] py-6 rounded-full text-[10px] uppercase tracking-[0.4em] font-bold hover:bg-[#8C4E39] transition-colors"
            >
              Inquire
            </motion.button>
          </form>
        </div>
      </div>
    </section>
  );
}
