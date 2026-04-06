import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FileCode, Palette, LayoutGrid, Youtube, Pencil, 
  ChevronRight, ExternalLink, Info, Search, 
  Layout, BookOpen, Lightbulb
} from 'lucide-react';
import appsData from './data/apps.json';

const IconMap = {
  FileCode, Palette, LayoutGrid, Youtube, Pencil
};

const Header = () => (
  <header className="pt-16 pb-12 text-center relative overflow-hidden">
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative z-10"
    >
      <h1 className="text-5xl md:text-7xl font-extrabold orbitron mb-4 text-gradient">
        Couteau Suisse <span className="text-moodle-orange">Moodle</span>
      </h1>
      <p className="text-lg text-gray-400 max-w-2xl mx-auto px-4 leading-relaxed">
        Une suite d'outils premium conçue pour transformer l'expérience pédagogique Moodle.
        Optimisez vos cours, engagez vos étudiants, simplifiez votre workflow.
      </p>
    </motion.div>
    
    {/* Decorative blur elements */}
    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-moodle-orange/10 blur-[100px] -z-10 rounded-full" />
    <div className="absolute -top-24 right-0 w-64 h-64 bg-blue-500/10 blur-[80px] -z-10 rounded-full" />
  </header>
);

const AppCard = ({ app, delay }) => {
  const Icon = IconMap[app.icon] || Info;
  
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: delay * 0.1 }}
      className="group"
    >
      <div className="glass-card p-6 h-full flex flex-col relative overflow-hidden">
        {/* Hover accent */}
        <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        
        <div className="mb-6 flex items-start justify-between">
          <div 
            className="w-14 h-14 rounded-2xl flex items-center justify-center text-white shadow-lg"
            style={{ backgroundColor: `${app.color}20`, border: `1px solid ${app.color}40` }}
          >
            <Icon size={28} style={{ color: app.color }} />
          </div>
          <span className="text-[10px] uppercase font-bold tracking-widest text-gray-500 border border-white/10 px-2 py-1 rounded-full group-hover:border-white/20 transition-colors">
            {app.category}
          </span>
        </div>

        <h3 className="text-xl font-bold mb-2 group-hover:text-moodle-orange transition-colors">
          {app.name}
        </h3>
        <p className="text-sm font-medium text-gray-400 mb-4 italic">
          {app.tagline}
        </p>
        <p className="text-gray-500 text-sm leading-relaxed mb-8 flex-grow">
          {app.description}
        </p>

        <a 
          href={app.path}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm font-bold text-white group/btn"
        >
          Lancer l'outil
          <ChevronRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
        </a>
      </div>
    </motion.div>
  );
};

export default function App() {
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredApps = appsData.filter(app => 
    app.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    app.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen pb-24">
      <Header />
      
      <main className="max-w-7xl mx-auto px-6">
        {/* Search & Filters */}
        <div className="mb-12 flex flex-col md:flex-row gap-6 items-center justify-between">
          <div className="relative w-full md:max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
            <input 
              type="text" 
              placeholder="Rechercher un outil..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:border-moodle-orange/50 transition-colors"
            />
          </div>
          
          <div className="flex gap-4 text-sm text-gray-400">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-moodle-orange" />
              {appsData.length} Outils disponibles
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredApps.map((app, index) => (
              <AppCard 
                key={app.id} 
                app={app} 
                delay={index}
              />
            ))}
          </AnimatePresence>
        </div>

        {filteredApps.length === 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-24 opacity-50"
          >
            <p>Aucun outil trouvé pour "{searchTerm}"</p>
          </motion.div>
        )}
      </main>

      <footer className="mt-24 pt-12 border-t border-white/5 text-center text-gray-600 text-sm">
        <p>© 2026 Couteau Suisse Moodle - Direction de l'innovation pédagogique</p>
      </footer>
    </div>
  );
}
