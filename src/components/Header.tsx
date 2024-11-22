import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed w-full bg-black/50 backdrop-blur-sm z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <img src="/gob-logo.png" alt="GOB Logo" className="h-12" />
          <img src="/angra-logo.png" alt="Angra Saúde Logo" className="h-8" />
        </div>
        
        <button 
          className="lg:hidden text-white"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X /> : <Menu />}
        </button>

        <nav className={`${isMenuOpen ? 'block' : 'hidden'} lg:block absolute lg:relative top-full left-0 w-full lg:w-auto bg-black/90 lg:bg-transparent`}>
          <ul className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-8 p-4 lg:p-0">
            <li><a href="#beneficios" className="text-white hover:text-blue-400">Benefícios</a></li>
            <li><a href="#como-funciona" className="text-white hover:text-blue-400">Como Funciona</a></li>
            <li><a href="#cadastro" className="text-white hover:text-blue-400">Cadastro</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
}