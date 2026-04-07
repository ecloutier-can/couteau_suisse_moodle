import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FileCode, Palette, LayoutGrid, Youtube, Pencil, 
  Settings, Home, Layout, Mail, Info, Terminal, Grid, Shield, Menu, X, Layers, Brain
} from 'lucide-react';
import appsData from './data/apps.json';

const IconMap = {
  FileCode, Palette, LayoutGrid, Youtube, Pencil, Shield, Layers, Brain
};

const Sidebar = ({ activeCategory, setCategory, isOpen, setIsOpen }) => {
  const categories = [
    { id: 'all', name: 'Tous les outils', icon: Grid },
    { id: 'Éditeur', name: 'Édition & Texte', icon: Pencil },
    { id: 'Design', name: 'Design Visuel', icon: Palette },
    { id: 'Interactivité', name: 'Interactivité', icon: Youtube },
    { id: 'Connaissance', name: 'Connaissance', icon: Brain },
  ];

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-20 md:hidden backdrop-blur-sm" 
          onClick={() => setIsOpen(false)}
        />
      )}
      <div className={`w-72 bg-app-sidebar/90 md:bg-app-sidebar/40 backdrop-blur-3xl border-r border-white/5 flex flex-col h-screen fixed left-0 top-0 z-30 transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}>
      <div className="p-8 pb-4">
        <h2 className="text-xs font-bold text-gray-500 uppercase tracking-[0.2em] mb-8 flex justify-between items-center">
          Catégories
          <button className="md:hidden text-white/50 hover:text-white" onClick={() => setIsOpen(false)}>
            <X size={16} />
          </button>
        </h2>
        <nav className="space-y-4 overflow-y-auto pr-2 max-h-[60vh] custom-scrollbar">
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
        {/* Liens de support retirés */}
      </div>
    </div>
    </>
  );
};

const Navbar = ({ searchTerm, setSearchTerm, currentView, setCurrentView, toggleSidebar }) => (
  <nav className="h-20 bg-app-navbar/20 backdrop-blur-md border-b border-white/5 flex items-center justify-between px-4 md:px-10 fixed top-0 right-0 left-0 md:left-72 z-10 transition-all duration-300">
    <div className="flex items-center gap-4 md:gap-8">
      <button 
        onClick={toggleSidebar}
        className="text-gray-400 hover:text-white md:hidden"
      >
        <Menu size={24} />
      </button>
      <div className="hidden sm:flex gap-4 text-xs font-bold text-gray-400 uppercase tracking-widest">
        <button 
          onClick={() => setCurrentView('home')}
          className={`transition-colors h-full flex items-center px-2 py-1 relative ${currentView === 'home' ? 'text-white' : 'hover:text-white pb-1'}`}
        >
          Accueil
          {currentView === 'home' && (
            <motion.div layoutId="nav-dot" className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-app-accent rounded-full" />
          )}
        </button>
        <button 
          onClick={() => setCurrentView('about')}
          className={`transition-colors h-full flex items-center px-2 py-1 relative ${currentView === 'about' ? 'text-white' : 'hover:text-white pb-1'}`}
        >
          A Propos
          {currentView === 'about' && (
            <motion.div layoutId="nav-dot" className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-app-accent rounded-full" />
          )}
        </button>
      </div>
    </div>

    <div className="flex-1 max-w-xl px-4 md:px-8">
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
      {/* Login/Signup removed */}
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

const AboutView = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="max-w-4xl mx-auto py-20"
  >
    <div className="glass-panel p-16 space-y-12">
      <div className="space-y-6">
        <h2 className="text-4xl font-bold orbitron text-app-accent uppercase tracking-widest">Vision Pédagogique</h2>
        <p className="text-gray-300 leading-relaxed text-lg font-light">
          Le <span className="text-white font-bold">Couteau suisse Moodle</span> est un écosystème d'outils numériques conçus pour transformer l'expérience d'apprentissage. Notre mission est d'offrir aux enseignants des solutions intuitives et performantes pour créer du contenu pédagogique interactif et visuellement engageant.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white/5 p-8 rounded-2xl border border-white/5">
          <h3 className="text-white font-bold uppercase text-xs tracking-widest mb-4">Simplicité & Accessibilité</h3>
          <p className="text-sm text-gray-400 leading-relaxed">
            Chaque outil est pensé pour être utilisé instantanément, sans configuration complexe. Générez, copiez, et intégrez directement dans vos cours Moodle.
          </p>
        </div>
        <div className="bg-white/5 p-8 rounded-2xl border border-white/5">
          <h3 className="text-white font-bold uppercase text-xs tracking-widest mb-4">Excellence Visuelle</h3>
          <p className="text-sm text-gray-400 leading-relaxed">
            Nous croyons qu'un beau design favorise l'engagement. Nos générateurs assurent une cohérence graphique exceptionnelle pour tout votre matériel didactique.
          </p>
        </div>
      </div>

      <div className="pt-12 border-t border-white/5">
        <h2 className="text-2xl font-bold orbitron text-white uppercase tracking-widest mb-6">Évolution & Futur</h2>
        <p className="text-gray-400 leading-relaxed">
          Ce portail est une plateforme vivante. De nouvelles applications et fonctionnalités seront ajoutées régulièrement pour répondre aux évolutions de l'enseignement hybride. Restez à l'affût des prochaines versions !
        </p>
      </div>
    </div>
  </motion.div>
);

export default function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [currentView, setCurrentView] = useState('home');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const filteredApps = useMemo(() => {
    return appsData.filter(app => {
      const matchSearch = app.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchCategory = activeCategory === 'all' || app.category === activeCategory;
      return matchSearch && matchCategory;
    });
  }, [searchTerm, activeCategory]);

  return (
    <div className="flex bg-app-background min-h-screen text-white">
      <Sidebar 
        activeCategory={activeCategory} 
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
        setCategory={(cat) => {
          setActiveCategory(cat);
          setCurrentView('home');
          setIsSidebarOpen(false);
        }} 
      />
      
      <div className="flex-1 ml-0 md:ml-72 transition-all duration-300 w-full relative">
        <Navbar 
          searchTerm={searchTerm} 
          setSearchTerm={setSearchTerm} 
          currentView={currentView} 
          setCurrentView={setCurrentView}
          toggleSidebar={() => setIsSidebarOpen(true)}
        />
        
        <main className="pt-32 px-6 md:px-16 pb-20 max-w-7xl mx-auto overflow-x-hidden">
          <AnimatePresence mode="wait">
            {currentView === 'home' ? (
              <motion.div
                key="home"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <header className="mb-20 text-center relative">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="relative z-10"
                  >
                    <h1 className="text-4xl md:text-6xl font-bold orbitron uppercase tracking-[0.2em] mb-4">
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
              </motion.div>
            ) : (
              <AboutView key="about" />
            )}
          </AnimatePresence>
        </main>
        
        {/* Footer removed for future expansion */}
      </div>
    </div>
  );
}
