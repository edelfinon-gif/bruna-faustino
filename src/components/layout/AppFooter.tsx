import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Facebook, Phone, Mail, MapPin } from 'lucide-react';
export function AppFooter() {
  return (
    <footer className="border-t bg-muted/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-6">
              <div className="h-6 w-6 rounded bg-gradient-to-br from-purple-berry to-orange-peach flex items-center justify-center text-white font-bold text-xs">
                A
              </div>
              <span className="text-lg font-display font-bold tracking-tight">AçaiBloom</span>
            </Link>
            <p className="text-sm text-muted-foreground mb-6">
              Levando o sabor e a vitalidade do melhor açaí da Amazônia diretamente para você.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="text-muted-foreground hover:text-purple-berry transition-colors"><Instagram className="h-5 w-5" /></a>
              <a href="#" className="text-muted-foreground hover:text-purple-berry transition-colors"><Facebook className="h-5 w-5" /></a>
            </div>
          </div>
          <div>
            <h4 className="font-bold mb-6">Links Rápidos</h4>
            <ul className="space-y-4 text-sm">
              <li><Link to="/" className="text-muted-foreground hover:text-foreground">Início</Link></li>
              <li><Link to="/privacy" className="text-muted-foreground hover:text-foreground">Privacidade</Link></li>
              <li><Link to="/terms" className="text-muted-foreground hover:text-foreground">Termos de Uso</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-6">Contato</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-center gap-2 text-muted-foreground">
                <Phone className="h-4 w-4" /> (11) 98765-4321
              </li>
              <li className="flex items-center gap-2 text-muted-foreground">
                <Mail className="h-4 w-4" /> contato@acaibloom.com.br
              </li>
              <li className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="h-4 w-4" /> Av. Paulista, 1000 - São Paulo, SP
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-6 text-foreground font-semibold">Informações Legais</h4>
            <div className="text-xs space-y-2 text-muted-foreground">
              <p className="font-semibold text-foreground">61.537.572 BRUNA FAUSTINO DE LIMA</p>
              <p>CNPJ: 61.537.572/0001-07</p>
              <p>© {new Date().getFullYear()} AçaiBloom. Todos os direitos reservados.</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}