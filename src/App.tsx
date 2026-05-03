import { motion } from "motion/react";
import { Check, ShieldCheck, Zap, Star, Menu, X, Leaf, Smartphone, Wind, PackageCheck, History, Edit3, Upload, Eye } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { BrowserRouter, Routes, Route, Link, useLocation } from "react-router-dom";

const DEFAULT_IMAGES = {
  logo: "https://identical-maroon-vjzcanpirl.edgeone.app/ChatGPT%20Image%202%20de%20mai.%20de%202026,%2021_22_55.png",
  hero_banner: "https://images.unsplash.com/photo-1558444479-c8f0279159a8?auto=format&fit=crop&q=80",
  lifestyle: "https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?auto=format&fit=crop&q=80",
  comparison: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80",
  social_1: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&q=80",
  social_2: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80",
  social_3: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80",
  social_4: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&q=80",
};

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 }
};

export default function App() {
  const [images, setImages] = useState(() => {
    const saved = localStorage.getItem("app_images");
    return saved ? JSON.parse(saved) : DEFAULT_IMAGES;
  });

  useEffect(() => {
    localStorage.setItem("app_images", JSON.stringify(images));
  }, [images]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage images={images} setImages={setImages} isEditMode={false} />} />
        <Route path="/admin" element={<LandingPage images={images} setImages={setImages} isEditMode={true} />} />
      </Routes>
    </BrowserRouter>
  );
}

function LandingPage({ images, setImages, isEditMode }: { images: any, setImages: any, isEditMode: boolean }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const handleContactClick = () => {
    window.open("https://t.me/+RWM-YfU6xQE2Y2Nh", "_blank");
  };

  const handleImageUpload = (id: string, file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      setImages((prev: any) => ({ ...prev, [id]: base64String }));
    };
    reader.readAsDataURL(file);
  };

  const updateImage = (id: string) => {
    if (!isEditMode) return;
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (e: any) => {
      const file = e.target.files[0];
      if (file) handleImageUpload(id, file);
    };
    input.click();
  };

  const SalesNotification = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [purchase, setPurchase] = useState({ name: "", city: "" });

    const names = ["Ana", "Bruno", "Carlos", "Daniela", "Eduardo", "Fernanda", "Gustavo", "Helena", "Igor", "Juliana", "Lucas", "Mariana", "Otávio", "Priscila", "Ricardo", "Sandra", "Tiago", "Vanessa"];

    useEffect(() => {
      const showNotification = () => {
        const randomName = names[Math.floor(Math.random() * names.length)];
        const randomCity = cities[Math.floor(Math.random() * cities.length)];
        setPurchase({ name: randomName, city: randomCity });
        setIsVisible(true);

        setTimeout(() => setIsVisible(false), 5000);
      };

      const initialDelay = setTimeout(showNotification, 3000);
      const interval = setInterval(showNotification, 12000);

      return () => {
        clearTimeout(initialDelay);
        clearInterval(interval);
      };
    }, []);

    return (
      <motion.div
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: isVisible ? 1 : 0, x: isVisible ? 0 : -100 }}
        className="fixed bottom-24 left-6 z-[100] bg-white p-4 rounded-2xl shadow-2xl border border-brand-charcoal/5 flex items-center gap-4 max-w-[280px]"
      >
        <div className="w-12 h-12 bg-brand-sage/10 text-brand-sage rounded-xl flex items-center justify-center shrink-0">
          <PackageCheck size={24} />
        </div>
        <div>
          <p className="text-xs font-black uppercase tracking-widest text-brand-charcoal/40 mb-0.5">Compra Realizada</p>
          <p className="text-sm font-bold text-brand-charcoal leading-tight">
            {purchase.name} de {purchase.city} <br />
            <span className="text-brand-sage">acabou de comprar!</span>
          </p>
        </div>
      </motion.div>
    );
  };

  const EditableImage = ({ id, alt, className, ...props }: any) => (
    <div className={`relative group ${isEditMode ? 'cursor-pointer' : ''}`} onClick={() => updateImage(id)}>
      <img src={images[id]} alt={alt} className={className} {...props} />
      {isEditMode && (
        <div className="absolute inset-0 bg-brand-sage/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-[inherit] z-20">
          <div className="bg-white p-3 rounded-full shadow-lg flex flex-col items-center gap-1">
            <Upload className="text-brand-sage w-6 h-6" />
            <span className="text-[10px] font-bold text-brand-sage uppercase">Trocar Foto</span>
          </div>
        </div>
      )}
    </div>
  );

  const scrollToOffer = () => {
    const element = document.getElementById("oferta");
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen selection:bg-brand-sage selection:text-white">
      {/* Navigation */}
      <nav className="fixed w-full z-50 bg-brand-cream/90 backdrop-blur-xl border-b border-brand-charcoal/5">
        <div className="max-w-7xl mx-auto px-6 h-24 flex items-center justify-between">
          <div className="flex items-center">
            <div className="bg-white p-2 rounded-2xl shadow-sm border border-brand-charcoal/5 hover:shadow-md transition-shadow duration-500">
              <EditableImage 
                id="logo"
                alt="Xô Mosca Logo" 
                className="h-12 w-auto object-contain"
              />
            </div>
          </div>
          
          <div className="hidden md:flex items-center gap-8 text-xs font-bold uppercase tracking-widest">
            <a href="#beneficios" className="hover:text-brand-sage transition-colors">Benefícios</a>
            <a href="#comparativo" className="hover:text-brand-sage transition-colors">Comparativo</a>
            <a href="#garantia" className="hover:text-brand-sage transition-colors">Garantia</a>
            <button 
              onClick={scrollToOffer}
              className="bg-brand-charcoal text-white px-6 py-2.5 rounded-full hover:bg-brand-sage transition-all shadow-md active:scale-95"
            >
              Comprar Agora
            </button>
          </div>

          <button className="md:hidden p-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden bg-brand-cream border-b border-brand-charcoal/10 px-6 py-8 flex flex-col gap-6"
          >
            <a href="#beneficios" onClick={() => setIsMenuOpen(false)} className="text-lg font-medium">Benefícios</a>
            <a href="#comparativo" onClick={() => setIsMenuOpen(false)} className="text-lg font-medium">Comparativo</a>
            <a href="#garantia" onClick={() => setIsMenuOpen(false)} className="text-lg font-medium">Garantia</a>
            <button 
              onClick={() => { scrollToOffer(); setIsMenuOpen(false); }}
              className="bg-brand-sage text-white py-4 rounded-xl font-bold shadow-lg"
            >
              QUERO MEU XÔ MOSCA
            </button>
          </motion.div>
        )}
      </nav>

      {/* Maximized Hero Section */}
      <section className="relative min-h-screen flex items-center bg-[#F9F8F3] overflow-hidden pt-20">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-12 gap-16 items-center relative z-10 py-12 md:py-24">
          <div className="lg:col-span-5 text-left order-2 lg:order-1">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="inline-block px-4 py-2 rounded-lg bg-brand-sage text-white text-[10px] font-black uppercase tracking-[0.3em] mb-10 shadow-lg shadow-brand-sage/20"
            >
              Edição 2026 Premium
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="heading-serif text-7xl md:text-9xl mb-10 leading-[0.8] tracking-tighter"
            >
              Pureza. <br />
              Paz. <br />
              <span className="text-brand-sage italic">Proteção.</span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl md:text-2xl text-brand-charcoal/60 max-w-md mb-12 font-light leading-snug"
            >
              A solução definitiva e elegante para afastar insetos de sua mesa, sem ruídos e sem venenos.
            </motion.p>

            <motion.div
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: 0.3 }}
               className="flex flex-col gap-6"
            >
              <button 
                onClick={handleContactClick}
                className="bg-brand-charcoal text-white px-10 py-8 rounded-full text-base font-black uppercase tracking-widest hover:bg-brand-sage transition-all shadow-2xl flex items-center justify-between group"
              >
                <span>Garantir meu kit exclusivo</span>
                <Zap className="w-6 h-6 fill-current group-hover:animate-bounce" />
              </button>
              <div className="flex items-center gap-8 px-4">
                 <div className="flex -space-x-3">
                    {[1,2,3].map(i => (
                      <div key={i} className="w-10 h-10 rounded-full border-4 border-white bg-brand-cream overflow-hidden shadow-md">
                         <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i+10}`} alt="user" />
                      </div>
                    ))}
                 </div>
                 <div className="text-[10px] font-black uppercase tracking-widest text-brand-charcoal/40">
                    +4.500 Famílias Protegidas
                 </div>
              </div>
            </motion.div>
          </div>

          <motion.div 
            initial={{ opacity: 0, x: 100, rotate: 5 }}
            animate={{ opacity: 1, x: 0, rotate: 0 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-7 relative order-1 lg:order-2"
          >
            <div className="absolute -inset-20 bg-brand-sage/10 rounded-full blur-[120px]"></div>
            <div className="relative group">
               <div className="absolute -inset-1 bg-gradient-to-r from-brand-sage/20 to-transparent rounded-[80px] blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
               <EditableImage 
                 id="hero_banner"
                 alt="Xô Mosca Display" 
                 className="w-full h-auto rounded-[80px] shadow-[0_80px_150px_-30px_rgba(0,0,0,0.3)] object-cover relative z-10"
               />
               
               {/* Detail Overlays */}
               <motion.div 
                 animate={{ scale: [1, 1.05, 1] }}
                 transition={{ duration: 3, repeat: Infinity }}
                 className="absolute -bottom-10 -right-10 z-20 bg-white p-8 rounded-[40px] shadow-2xl border border-brand-charcoal/5 max-w-[240px] hidden xl:block"
               >
                  <p className="text-[10px] font-black uppercase tracking-widest text-brand-sage mb-2">Hélices Soft-Touch</p>
                  <p className="text-sm font-light text-brand-charcoal/60 leading-tight">Parada instantânea ao toque. Segurança total para crianças e pets.</p>
               </motion.div>
            </div>
          </motion.div>
        </div>

      </section>



      {/* Benefits Section */}
      <section id="beneficios" className="section-padding bg-white pt-32">
        <div className="grid md:grid-cols-3 gap-12 md:gap-8">
          <motion.div 
            {...fadeIn}
            className="flex flex-col items-center text-center p-10 rounded-[32px] bg-brand-cream/50 border border-brand-charcoal/5 group hover:bg-white hover:shadow-xl transition-all duration-500"
          >
            <div className="w-16 h-16 bg-brand-sage text-white rounded-2xl flex items-center justify-center mb-8 shadow-lg shadow-brand-sage/20 group-hover:scale-110 transition-transform">
              <Wind className="w-8 h-8" />
            </div>
            <h3 className="heading-serif text-3xl mb-4">Chega de incômodo</h3>
            <p className="text-brand-charcoal/60 leading-relaxed font-light">
              O Xô Mosca cria uma barreira invisível que mantém os insetos longe da sua comida através de movimentos suaves e reflexos holográficos que confundem a visão das moscas.
            </p>
          </motion.div>

          <motion.div 
            {...fadeIn}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="flex flex-col items-center text-center p-10 rounded-[32px] bg-brand-cream/50 border border-brand-charcoal/5 group hover:bg-white hover:shadow-xl transition-all duration-500"
          >
            <div className="w-16 h-16 bg-brand-sage text-white rounded-2xl flex items-center justify-center mb-8 shadow-lg shadow-brand-sage/20 group-hover:scale-110 transition-transform">
              <Leaf className="w-8 h-8" />
            </div>
            <h3 className="heading-serif text-3xl mb-4">Seguro p/ família</h3>
            <p className="text-brand-charcoal/60 leading-relaxed font-light">
              Sem venenos, sem químicos, sem riscos para crianças ou pets. As hélices macias param instantaneamente ao menor toque, garantindo total segurança durante o uso.
            </p>
          </motion.div>

          <motion.div 
            {...fadeIn}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="flex flex-col items-center text-center p-10 rounded-[32px] bg-brand-cream/50 border border-brand-charcoal/5 group hover:bg-white hover:shadow-xl transition-all duration-500"
          >
            <div className="w-16 h-16 bg-brand-sage text-white rounded-2xl flex items-center justify-center mb-8 shadow-lg shadow-brand-sage/20 group-hover:scale-110 transition-transform">
              <Smartphone className="w-8 h-8" />
            </div>
            <h3 className="heading-serif text-3xl mb-4">Design discreto</h3>
            <p className="text-brand-charcoal/60 leading-relaxed font-light">
              Combina com qualquer ambiente — da cozinha ao churrasco. Portátil, elegante e incrivelmente silencioso. Leve a paz para suas refeições em qualquer lugar.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Lifestyle Focus Section */}
      <section className="bg-brand-cream py-20 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
          <motion.div {...fadeIn}>
            <h2 className="heading-serif text-5xl md:text-6xl mb-8">Tecnologia que <span className="italic text-brand-sage">respeita</span> seu ambiente</h2>
            <p className="text-brand-charcoal/60 text-lg font-light leading-relaxed mb-8">
              Desenvolvido com materiais de alta durabilidade e uma estética que se integra à sua decoração. O Xô Mosca não é apenas funcional, é uma afirmação de cuidado com seu lar.
            </p>
            <div className="flex gap-4">
               <div className="bg-white p-4 rounded-2xl shadow-sm border border-brand-charcoal/5 flex-1">
                  <div className="font-bold text-brand-sage mb-1 italic">Hélices Soft</div>
                  <p className="text-xs text-brand-charcoal/40 uppercase tracking-tighter">Segurança total ao toque</p>
               </div>
               <div className="bg-white p-4 rounded-2xl shadow-sm border border-brand-charcoal/5 flex-1">
                  <div className="font-bold text-brand-sage mb-1 italic">Bateria Longa</div>
                  <p className="text-xs text-brand-charcoal/40 uppercase tracking-tighter">Horas de paz ininterrupta</p>
               </div>
            </div>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
             <EditableImage 
               id="lifestyle"
               alt="Xô Mosca Lifestyle" 
               className="w-full h-[500px] object-cover rounded-[60px] shadow-2xl"
             />
             <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-3xl shadow-xl border border-brand-charcoal/5 hidden md:block">
                <div className="flex items-center gap-3">
                   <div className="w-10 h-10 bg-brand-sage/10 text-brand-sage rounded-full flex items-center justify-center font-bold">100%</div>
                   <div className="text-xs font-bold uppercase tracking-widest opacity-40 text-left leading-none">Eficaz contra <br/>insetos</div>
                </div>
             </div>
          </motion.div>
        </div>
      </section>

      {/* Comparison Section */}
      <section id="comparativo" className="section-padding">
        <div className="bg-brand-charcoal rounded-[60px] overflow-hidden text-white shadow-2xl">
          <div className="md:p-16 p-8 border-b border-white/5 flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2">
              <h2 className="heading-serif text-4xl md:text-5xl mb-6">A revolução na sua mesa</h2>
              <p className="text-white/40 font-light leading-relaxed">
                Esqueça os métodos antigos. Compare o que há de mais moderno em proteção contra insetos e escolha a segurança e o estilo para o seu lar.
              </p>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <EditableImage 
                id="comparison"
                alt="Comparativo Xô Mosca" 
                className="w-full max-w-sm h-auto rounded-3xl shadow-xl hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>
          <div className="grid md:grid-cols-2">
            <div className="p-12 md:p-24 border-b md:border-b-0 md:border-r border-white/10 flex flex-col justify-center">
              <h4 className="font-bold uppercase tracking-[0.3em] text-xs text-white/40 mb-12">Soluções Comuns</h4>
              <ul className="space-y-8">
                <li className="flex items-center gap-6 opacity-50 hover:opacity-100 transition-opacity">
                  <div className="w-10 h-10 rounded-full border border-red-500/30 flex items-center justify-center flex-shrink-0">
                    <X className="w-5 h-5 text-red-500" />
                  </div>
                  <span className="text-lg md:text-xl font-light">Cheiro forte e desagradável</span>
                </li>
                <li className="flex items-center gap-6 opacity-50 hover:opacity-100 transition-opacity">
                  <div className="w-10 h-10 rounded-full border border-red-500/30 flex items-center justify-center flex-shrink-0">
                    <X className="w-5 h-5 text-red-500" />
                  </div>
                  <span className="text-lg md:text-xl font-light">Produtos químicos tóxicos</span>
                </li>
                <li className="flex items-center gap-6 opacity-50 hover:opacity-100 transition-opacity">
                  <div className="w-10 h-10 rounded-full border border-red-500/30 flex items-center justify-center flex-shrink-0">
                    <X className="w-5 h-5 text-red-500" />
                  </div>
                  <span className="text-lg md:text-xl font-light">Mancham superfícies e toalhas</span>
                </li>
              </ul>
            </div>
            <div className="p-12 md:p-24 bg-gradient-to-br from-brand-sage/30 via-transparent to-transparent flex flex-col justify-center">
              <h4 className="font-bold uppercase tracking-[0.3em] text-xs text-brand-sage-light mb-12">Xô Mosca</h4>
              <ul className="space-y-8">
                <li className="flex items-center gap-6">
                  <div className="w-10 h-10 rounded-full bg-brand-sage text-white flex items-center justify-center flex-shrink-0 shadow-lg shadow-brand-sage/20">
                    <Check className="w-5 h-5" />
                  </div>
                  <span className="text-lg md:text-xl font-medium tracking-tight">Sem odor e totalmente silencioso</span>
                </li>
                <li className="flex items-center gap-6">
                  <div className="w-10 h-10 rounded-full bg-brand-sage text-white flex items-center justify-center flex-shrink-0 shadow-lg shadow-brand-sage/20">
                    <Check className="w-5 h-5" />
                  </div>
                  <span className="text-lg md:text-xl font-medium tracking-tight">Natural, ecológico e 100% seguro</span>
                </li>
                <li className="flex items-center gap-6">
                  <div className="w-10 h-10 rounded-full bg-brand-sage text-white flex items-center justify-center flex-shrink-0 shadow-lg shadow-brand-sage/20">
                    <Check className="w-5 h-5" />
                  </div>
                  <span className="text-lg md:text-xl font-medium tracking-tight">Peça de design elegante para sua mesa</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="oferta" className="section-padding">
        <div className="text-center mb-20">
          <motion.h2 
            {...fadeIn}
            className="heading-serif text-5xl md:text-7xl mb-6"
          >
            Escolha a sua oferta
          </motion.h2>
          <motion.p 
            {...fadeIn}
            transition={{ delay: 0.1, duration: 0.6 }}
            className="text-brand-charcoal/60 text-lg md:text-xl font-light"
          >
            Aproveite nossos descontos progressivos por tempo limitado.
          </motion.p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 items-end mb-20">
          {/* Option 1 */}
          <motion.div 
            {...fadeIn}
            whileHover={{ y: -10 }}
            className="p-10 rounded-[40px] bg-white border border-brand-charcoal/5 flex flex-col justify-between h-full"
          >
            <div>
              <div className="w-14 h-14 bg-brand-cream text-brand-charcoal/40 rounded-2xl flex items-center justify-center mb-8 font-black text-xl">
                1x
              </div>
              <h4 className="text-2xl font-bold mb-3">1 Unidade</h4>
              <p className="text-brand-charcoal/40 text-sm mb-8 font-light italic">Ideal para pequenas mesas de café ou varandas.</p>
              <div className="mb-12">
               <span className="text-5xl font-serif font-bold text-brand-charcoal tracking-tighter">R$ 29,99</span>
              </div>
            </div>
            <button 
              onClick={handleContactClick}
              className="w-full py-5 rounded-full border-2 border-brand-sage text-brand-sage font-black text-sm tracking-widest uppercase hover:bg-brand-sage hover:text-white transition-all active:scale-95"
            >
              SELECIONAR
            </button>
          </motion.div>

          {/* Option 2 - Most Sold */}
          <motion.div 
            initial={{ opacity: 0, y: 20, scale: 1.05 }}
            whileInView={{ opacity: 1, y: 0, scale: 1.05 }}
            viewport={{ once: true }}
            whileHover={{ y: -10, scale: 1.08 }}
            className="p-10 rounded-[40px] bg-brand-sage text-white shadow-2xl relative overflow-hidden flex flex-col justify-between h-full z-10"
          >
            <div className="absolute top-0 right-0 bg-yellow-400 text-brand-charcoal text-[9px] uppercase font-black px-6 py-2 tracking-[0.2em] rounded-bl-2xl">
              MAIS VENDIDO
            </div>
            <div>
              <div className="w-14 h-14 bg-white/20 text-white rounded-2xl flex items-center justify-center mb-8 font-black text-xl">
                2x
              </div>
              <h4 className="text-2xl font-bold mb-3 text-white">Combo 2 Unidades</h4>
              <p className="text-white/60 text-sm mb-8 font-light italic">Perfeito para churrascos e mesas maiores.</p>
              <div className="mb-12">
                <div className="text-white/40 text-sm line-through mb-1">R$ 59,98</div>
                <div className="flex items-baseline gap-1">
                  <span className="text-6xl font-serif font-bold tracking-tighter">R$ 39,99</span>
                </div>
                <div className="text-xs mt-2 text-white/50 font-bold uppercase tracking-widest underline decoration-yellow-400/50 underline-offset-4">Economize R$ 20,00</div>
              </div>
            </div>
            <button 
              onClick={handleContactClick}
              className="w-full py-5 rounded-full bg-white text-brand-sage font-black text-sm tracking-widest uppercase shadow-xl hover:shadow-2xl hover:scale-[1.02] transition-all active:scale-95"
            >
              COMPRAR AGORA
            </button>
          </motion.div>

          {/* Option 3 */}
          <motion.div 
            {...fadeIn}
            transition={{ delay: 0.2, duration: 0.6 }}
            whileHover={{ y: -10 }}
            className="p-10 rounded-[40px] bg-white border border-brand-charcoal/5 flex flex-col justify-between h-full"
          >
            <div>
              <div className="w-14 h-14 bg-brand-cream text-brand-charcoal/40 rounded-2xl flex items-center justify-center mb-8 font-black text-xl">
                 3x
              </div>
              <h4 className="text-2xl font-bold mb-3">Combo Familia G</h4>
              <p className="text-brand-charcoal/40 text-sm mb-8 font-light italic">A melhor solução para eventos e casas grandes.</p>
              <div className="mb-12 font-serif font-bold">
                <div className="text-brand-charcoal/20 text-sm line-through mb-1">R$ 89,97</div>
                <span className="text-5xl text-brand-charcoal tracking-tighter">R$ 49,99</span>
                <div className="text-xs mt-2 text-brand-sage font-bold uppercase tracking-widest">Melhor Oferta</div>
              </div>
            </div>
            <button 
              onClick={handleContactClick}
              className="w-full py-5 rounded-full border-2 border-brand-sage text-brand-sage font-black text-sm tracking-widest uppercase hover:bg-brand-sage hover:text-white transition-all active:scale-95"
            >
              LEVAR TUDO
            </button>
          </motion.div>
        </div>

        {/* Lead Capture to Telegram */}
        <motion.div 
          {...fadeIn}
          className="max-w-xl mx-auto bg-brand-cream/50 p-10 rounded-[48px] border border-brand-charcoal/5 text-center"
        >
          <h3 className="heading-serif text-3xl mb-4">Dúvidas ou Pedidos Especiais?</h3>
          <p className="text-sm text-brand-charcoal/40 uppercase tracking-widest font-black mb-8">Fale agora com nosso atendimento premium no Telegram</p>
          
          <button 
            onClick={handleContactClick}
            className="w-full py-6 rounded-2xl font-black text-xs uppercase tracking-[0.2em] transition-all bg-brand-charcoal text-white hover:bg-brand-sage flex items-center justify-center gap-3 shadow-2xl"
          >
            FALAR COM ATENDIMENTO AGORA
            <Zap className="w-5 h-5 fill-current" />
          </button>
          
          <p className="mt-8 text-[10px] text-brand-charcoal/30 uppercase font-black tracking-widest">Atendimento disponível das 08h às 22h</p>
        </motion.div>
      </section>

      {/* New Social Proof / Video Section Style Overlay */}
      <section className="section-padding bg-brand-charcoal text-white overflow-hidden">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center">
          <div className="order-2 lg:order-1">
             <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4">
                  <EditableImage id="social_1" className="rounded-3xl w-full aspect-[4/5] object-cover shadow-2xl" alt="Lifestyle" />
                  <EditableImage id="social_2" className="rounded-3xl w-full aspect-square object-cover shadow-2xl" alt="Lifestyle" />
                </div>
                <div className="space-y-4 pt-12">
                  <EditableImage id="social_3" className="rounded-3xl w-full aspect-square object-cover shadow-2xl" alt="Lifestyle" />
                  <EditableImage id="social_4" className="rounded-3xl w-full aspect-[4/5] object-cover shadow-2xl" alt="Lifestyle" />
                </div>
             </div>
          </div>
          <div className="order-1 lg:order-2">
            <h2 className="heading-serif text-5xl md:text-7xl mb-8">Aprovado por <br/><span className="text-brand-sage-light italic">milhares</span> de lares.</h2>
            <div className="space-y-10">
               <div className="bg-white/5 p-8 rounded-[32px] border border-white/10">
                  <div className="flex gap-1 mb-4 text-yellow-400">
                    <Star size={16} fill="currentColor" />
                    <Star size={16} fill="currentColor" />
                    <Star size={16} fill="currentColor" />
                    <Star size={16} fill="currentColor" />
                    <Star size={16} fill="currentColor" />
                  </div>
                  <p className="text-white/60 text-lg italic font-light mb-6">"Fiquei surpresa com a eficácia. Além de afastar as moscas, ele é lindo e decora a mesa. Vale cada centavo!"</p>
                  <p className="font-bold uppercase tracking-widest text-xs text-brand-sage-light">— Ana Luiza, São Paulo</p>
               </div>
               <div className="grid grid-cols-2 gap-8 divide-x divide-white/10">
                  <div>
                    <div className="text-4xl font-serif font-bold mb-2 text-brand-sage-light">15k+</div>
                    <div className="text-[10px] uppercase font-black tracking-widest text-white/40">Unidades Vendidas</div>
                  </div>
                  <div className="pl-8">
                    <div className="text-4xl font-serif font-bold mb-2 text-brand-sage-light">98%</div>
                    <div className="text-[10px] uppercase font-black tracking-widest text-white/40">Satisfeitos</div>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </section>


      {/* Guarantee & Shipping Section */}
      <section id="garantia" className="section-padding bg-white">
        <div className="grid md:grid-cols-2 gap-12 md:gap-24 items-center">
          <motion.div {...fadeIn} className="flex flex-col md:flex-row items-center md:items-start gap-8 text-center md:text-left">
            <div className="bg-brand-cream p-6 rounded-3xl shadow-inner border border-brand-charcoal/5 shrink-0">
              <ShieldCheck className="w-12 h-12 text-brand-sage" />
            </div>
            <div>
              <h4 className="text-2xl heading-serif mb-4">Garantia Incondicional</h4>
              <p className="text-brand-charcoal/60 leading-relaxed font-light">
                Sua satisfação é o nosso compromisso. Você tem 7 dias de garantia total. Se por qualquer motivo não ficar satisfeito, devolvemos 100% do seu investimento.
              </p>
            </div>
          </motion.div>
          <motion.div {...fadeIn} transition={{ delay: 0.2 }} className="flex flex-col md:flex-row items-center md:items-start gap-8 text-center md:text-left">
            <div className="bg-brand-cream p-6 rounded-3xl shadow-inner border border-brand-charcoal/5 shrink-0">
              <PackageCheck className="w-12 h-12 text-brand-sage" />
            </div>
            <div>
              <h4 className="text-2xl heading-serif mb-4">Entrega Prioritária</h4>
              <ul className="space-y-3 text-brand-charcoal/60 text-sm font-light">
                <li className="flex items-center justify-center md:justify-start gap-3 text-brand-charcoal font-medium">
                  <div className="w-5 h-5 rounded-full bg-brand-sage/10 text-brand-sage flex items-center justify-center"><Check size={12} /></div> Envio em até 24h úteis
                </li>
                <li className="flex items-center justify-center md:justify-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-brand-sage/10 text-brand-sage flex items-center justify-center"><Check size={12} /></div> Embalagem Premium reforçada
                </li>
                <li className="flex items-center justify-center md:justify-start gap-3">
                  <div className="w-5 h-5 rounded-full bg-brand-sage/10 text-brand-sage flex items-center justify-center"><Check size={12} /></div> Checkout 100% criptografado
                </li>
              </ul>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="section-padding bg-brand-cream text-center pb-32">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-5xl mx-auto px-8 py-20 md:py-32 rounded-[64px] bg-brand-charcoal text-white relative overflow-hidden shadow-[0_40px_100px_rgba(0,0,0,0.1)]"
        >
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_50%_120%,#4A5D4E,transparent_70%)]"></div>
          
          <div className="relative z-10 flex flex-col items-center">
            <h2 className="heading-serif text-5xl md:text-7xl mb-8 max-w-3xl leading-[0.9] tracking-tight">
              A tranquilidade que suas refeições <span className="italic text-brand-sage-light">merecem.</span>
            </h2>
            <p className="text-white/50 mb-12 text-lg md:text-xl font-light max-w-xl">
              Pare de espantar moscas com as mãos. Garanta agora o conforto e a higiene que sua família precisa.
            </p>
            
            <motion.button 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleContactClick}
              className="bg-brand-sage text-white px-12 py-6 rounded-full font-black text-xs tracking-[0.3em] uppercase hover:bg-brand-sage-light hover:text-brand-charcoal transition-all shadow-2xl flex items-center gap-3"
            >
              GARANTIR MEU XÔ MOSCA
              <Zap className="w-4 h-4 fill-current" />
            </motion.button>
            
            <div className="mt-12 flex flex-wrap items-center justify-center gap-8 text-[10px] opacity-40 uppercase tracking-[0.2em] font-black">
              <span className="flex items-center gap-2"><History size={14} className="text-yellow-400" /> Últimas unidades em estoque</span>
              <span className="flex items-center gap-2"><Smartphone size={14} /> Pagamento 100% Protegido</span>
              <span className="flex items-center gap-2"><ShieldCheck size={14} /> 7 Dias de Garantia</span>
            </div>
          </div>
        </motion.div>
      </section>

      <SalesNotification />

      {/* Footer */}
      <footer className="py-20 border-t border-brand-charcoal/5 text-center bg-brand-cream ring-1 ring-inset ring-brand-charcoal/5">
        <div className="flex items-center justify-center mb-10">
          <div className="bg-white p-3 rounded-[24px] shadow-sm border border-brand-charcoal/5 grayscale hover:grayscale-0 transition-all duration-700 hover:scale-105">
            <EditableImage 
              id="logo"
              alt="Xô Mosca Logo" 
              className="h-14 w-auto object-contain"
            />
          </div>
        </div>
        <p className="text-[10px] text-brand-charcoal/30 uppercase tracking-[0.3em] max-w-md mx-auto px-6 leading-relaxed">
           © 2026 Xô Mosca. Orgulhosamente servindo lares tranquilos. Todos os direitos reservados.
        </p>
      </footer>

      {/* Admin Toggle / View Toggle */}
      {isEditMode && (
        <div className="fixed bottom-6 left-6 z-[100] flex flex-col gap-3">
          <Link 
            to="/" 
            className="bg-brand-charcoal text-white p-4 rounded-full shadow-2xl flex items-center gap-2 border border-brand-charcoal hover:bg-brand-sage transition-all group"
          >
            <Eye size={18} />
            <span className="text-xs font-bold uppercase tracking-widest hidden group-hover:inline">Ver como Cliente</span>
          </Link>
          
          <div className="bg-brand-sage text-white px-4 py-2 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg animate-pulse">
            Modo Edição Ativo
          </div>
        </div>
      )}
    </div>
  );
}
