import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FileCode, Palette, LayoutGrid, Youtube, Pencil, 
  Search, ChevronRight, LogIn, UserPlus, HelpCircle, 
  Settings, Home, Layout, Mail, Info, Terminal, Grid
} from 'lucide-react';
import appsData from './data/apps.json';

const IconMap = {
  FileCode, Palette, LayoutGrid, Youtube, Pencil
};

const Sidebar = ({ activeCategory, setCategory }) => {
  const categories = [
    { id: 'all', name: 'Tous les outils', icon: Grid },
    { id: 'Editeur', name: 'Édition & Texte', icon: Pencil },
    { id: 'Design', name: 'Design Visuel', icon: Palette },
    { id: 'Interactivité', name: 'Interactivité', icon: Youtube },
  ];

  return (
    <div className="w-72 bg-app-sidebar/40 backdrop-blur-3xl border-r border-white/5 flex flex-col h-screen fixed left-0 top-0 z-20">
      <div className="p-8 pb-4">
        <h2 className="text-xs font-bold text-gray-500 uppercase tracking-[0.2em] mb-8">Catégories</h2>
        <nav className="space-y-4">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setCategory(cat.id)}
              className={`flex items-center gap-4 w-full p-3 rounded-xl transition-all duration-300 ${
                activeCategory === cat.id 
                ? 'bg-app-accent/10 text-app-accent border border-app-accent/20' 
                : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <cat.icon size={20} />
              <span className="font-medium text-sm">{cat.name}</span>
              {activeCategory === cat.id && (
                <motion.div layoutId="activeCat" className="ml-auto w-1.5 h-1.5 rounded-full bg-app-accent" />
              )}
            </button>
          ))}
        </nav>
      </div>

      <div className="mt-auto p-8 pt-4 space-y-6">
        <div className="pt-8 border-t border-white/5 text-[11px] text-gray-600 font-medium">
          <p className="mb-2">A PROPOS</p>
          <p className="mb-2">DOCUMENTATION</p>
          <p>SUPPORT</p>
        </div>
      </div>
    </div>
  );
};

const Navbar = ({ searchTerm, setSearchTerm }) => (
  <nav className="h-20 bg-app-navbar/20 backdrop-blur-md border-b border-white/5 flex items-center justify-between px-10 fixed top-0 right-0 left-72 z-10">
    <div className="flex items-center gap-8">
      <div className="flex gap-4 text-xs font-bold text-gray-400 uppercase tracking-widest">
        <span className="text-white">Accueil</span>
        <span className="hover:text-white cursor-pointer transition-colors">A Propos</span>
        <span className="hover:text-white cursor-pointer transition-colors">Contact</span>
      </div>
    </div>

    <div className="flex-1 max-w-xl px-8">
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
        <input 
          type="text" 
          placeholder="Rechercher une application..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full bg-black/20 border border-white/10 rounded-full py-2.5 pl-12 pr-4 focus:outline-none focus:border-app-accent/50 transition-colors text-sm"
        />
      </div>
    </div>

    <div className="flex items-center gap-4">
      <button className="text-sm font-semibold text-gray-400 hover:text-white transition-colors px-4">Log in</button>
      <button className="bg-app-accent text-white px-6 py-2.5 rounded-full text-xs font-extrabold uppercase tracking-widest hover:bg-app-active transition-colors shadow-lg shadow-app-accent/20">Sign up</button>
    </div>
  </nav>
);

const AppCard = ({ app }) => {
  const Icon = IconMap[app.icon] || Info;
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      layout
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative z-0 hover:z-10 h-72"
    >
      <motion.div
        animate={isHovered ? { scale: 1.1, translateY: -20 } : { scale: 1, translateY: 0 }}
        className={`w-full h-72 p-8 flex flex-col items-center justify-center transition-all duration-500 ${
          isHovered ? 'glass-panel active-glow' : 'glass-panel'
        }`}
      >
        <div className={`w-20 h-20 rounded-2xl flex items-center justify-center mb-6 shadow-2xl transition-all duration-500 ${
          isHovered ? 'bg-app-accent text-white rotate-6' : 'bg-white/5 text-gray-300'
        }`}>
          <Icon size={40} />
        </div>

        <h3 className={`text-center font-bold mb-2 transition-colors duration-500 ${isHovered ? 'text-app-accent' : 'text-gray-100'}`}>
          {app.name}
        </h3>

        <AnimatePresence>
          {isHovered && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="text-center"
            >
              <p className="text-[11px] text-gray-400 leading-relaxed mb-6 px-2 line-clamp-3">
                {app.description}
              </p>
              <div className="flex justify-center">
                <a href={app.path} target="_blank" rel="noopener" className="bg-app-accent text-white px-4 py-2 rounded-lg text-[10px] font-bold uppercase tracking-wider hover:bg-app-active transition-colors">
                  Démarrer
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {!isHovered && (
          <p className="text-[10px] font-bold text-gray-600 uppercase tracking-widest mt-auto">
            {app.category}
          </p>
        )}
      </motion.div>
    </motion.div>
  );
};

export default function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredApps = useMemo(() => {
    return appsData.filter(app => {
      const matchSearch = app.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchCategory = activeCategory === 'all' || app.category === activeCategory;
      return matchSearch && matchCategory;
    });
  }, [searchTerm, activeCategory]);

  return (
    <div className="flex bg-app-background min-h-screen text-white">
      <Sidebar activeCategory={activeCategory} setCategory={setActiveCategory} />
      
      <div className="flex-1 ml-72">
        <Navbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        
        <main className="pt-32 px-16 pb-20 max-w-7xl mx-auto">
          <header className="mb-20 text-center relative">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="relative z-10"
            >
              <h1 className="text-6xl font-bold orbitron uppercase tracking-[0.2em] mb-4">
                Couteau suisse <span className="text-app-accent">Moodle</span>
              </h1>
              <p className="text-sm font-medium text-gray-500 uppercase tracking-[0.3em]">
                DES OUTILS POUR DYNAMISER TON COURS MOODLE
              </p>
            </motion.div>
            {/* Background halo */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-app-accent/5 blur-[150px] -z-10 rounded-full" />
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            <AnimatePresence mode="popLayout">
              {filteredApps.map((app) => (
                <AppCard key={app.id} app={app} />
              ))}
            </AnimatePresence>
          </div>

          {filteredApps.length === 0 && (
            <div className="text-center py-40 text-gray-600 uppercase tracking-[0.4em] text-xs">
              Aucun outil trouvé
            </div>
          )}
        </main>

        <footer className="px-16 py-10 border-t border-white/5 flex justify-between items-center text-[10px] text-gray-600 font-bold uppercase tracking-widest">
          <div className="flex gap-8">
            <span>About Us</span>
            <span>Documentation</span>
            <span>Support</span>
          </div>
          <div className="flex gap-6 opacity-30">
            <span>X</span>
            <span>IG</span>
            <span>YT</span>
          </div>
        </footer>
      </div>
    </div>
  );
}
