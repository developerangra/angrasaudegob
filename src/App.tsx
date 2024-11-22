import React from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Benefits } from './components/Benefits';
import { HowItWorks } from './components/HowItWorks';
import { PromoSection } from './components/PromoSection';
import { RegistrationForm } from './components/RegistrationForm';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-purple-900 to-black">
      <div className="fixed inset-0 bg-[url('https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=2070&q=80')] bg-cover bg-center opacity-10" />
      <div className="relative">
        <Header />
        <main>
          <Hero />
          <Benefits />
          <HowItWorks />
          <PromoSection />
          <RegistrationForm />
        </main>
        <footer className="py-8 px-4 text-center text-blue-200/60">
          <p>&copy; {new Date().getFullYear()} Angra Saúde - Todos os direitos reservados</p>
        </footer>
      </div>
    </div>
  );
}

export default App;