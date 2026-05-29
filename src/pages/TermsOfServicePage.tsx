import React from 'react';
import { motion } from 'framer-motion';
import { Gavel, ShoppingCart, Truck, AlertTriangle } from 'lucide-react';
export function TermsOfServicePage() {
  return (
    <div className="bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 lg:py-32">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto"
        >
          <div className="flex items-center gap-3 mb-6 text-purple-berry">
            <Gavel className="h-8 w-8" />
            <h1 className="text-display text-3xl md:text-5xl">Termos de Serviço</h1>
          </div>
          <p className="text-body mb-12 text-lg">
            Bem-vindo à AçaiBloom. Ao utilizar nosso site e serviços, você concorda em cumprir estes termos e condições de uso.
          </p>
          <div className="space-y-12 text-muted-foreground leading-relaxed">
            <section className="group">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-8 w-8 bg-purple-berry/10 rounded-full flex items-center justify-center text-purple-berry font-bold group-hover:scale-110 transition-transform">1</div>
                <h2 className="text-2xl font-bold text-foreground">Aceitação dos Termos</h2>
              </div>
              <p className="pl-11">
                Ao acessar este site ou realizar um pedido, você aceita cumprir estes termos de serviço e todas as leis aplicáveis. Se você não concordar com qualquer parte destes termos, não deverá utilizar nossos serviços.
              </p>
            </section>
            <section className="group">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-8 w-8 bg-purple-berry/10 rounded-full flex items-center justify-center text-purple-berry font-bold group-hover:scale-110 transition-transform">2</div>
                <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
                  <ShoppingCart size={24} className="text-purple-berry" /> Pedidos e Pagamentos
                </h2>
              </div>
              <div className="pl-11 space-y-4">
                <p>
                  Todos os pedidos estão sujeitos à disponibilidade dos ingredientes em estoque e confirmação do pagamento. Os preços exibidos em nosso cardápio digital podem ser alterados sem aviso prévio.
                </p>
                <div className="bg-muted p-4 rounded-xl text-sm border-l-4 border-purple-berry">
                  <strong>Nota:</strong> Promoções e cupons de desconto não são cumulativos, a menos que especificado de outra forma.
                </div>
              </div>
            </section>
            <section className="group">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-8 w-8 bg-purple-berry/10 rounded-full flex items-center justify-center text-purple-berry font-bold group-hover:scale-110 transition-transform">3</div>
                <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
                  <Truck size={24} className="text-purple-berry" /> Entregas e Devoluções
                </h2>
              </div>
              <p className="pl-11">
                A AçaiBloom se compromete a entregar seus produtos dentro do prazo estimado, mantendo a temperatura ideal. Por serem produtos perecíveis, não aceitamos devoluções após a entrega ter sido conferida e aceita pelo cliente, exceto em casos de erro no pedido ou defeito de fabricação comprovado.
              </p>
            </section>
            <section className="group bg-orange-peach/5 p-8 rounded-3xl border border-orange-peach/10">
              <div className="flex items-center gap-3 mb-4">
                <AlertTriangle className="text-orange-peach" size={28} />
                <h2 className="text-2xl font-bold text-foreground">Limitação de Responsabilidade</h2>
              </div>
              <p className="pl-11 text-foreground/80">
                A AçaiBloom não será responsável por quaisquer danos indiretos, incidentais ou consequentes resultantes do uso do site ou do consumo de nossos produtos em desacordo com as recomendações de armazenamento e consumo imediato.
              </p>
            </section>
          </div>
          <div className="mt-20 pt-8 border-t text-sm text-muted-foreground flex flex-col md:flex-row justify-between gap-4">
            <p>Última atualização: 24 de Maio de 2024</p>
            <div className="flex gap-4">
              <span className="font-bold text-foreground">AçaiBloom Ltda.</span>
              <span>CNPJ: 61.537.572/0001-07</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}