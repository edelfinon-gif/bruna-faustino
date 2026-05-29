import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Lock, Eye, FileText } from 'lucide-react';
export function PrivacyPolicyPage() {
  return (
    <div className="bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 lg:py-32">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-4xl mx-auto"
        >
          <div className="flex items-center gap-3 mb-6 text-purple-berry">
            <ShieldCheck className="h-8 w-8" />
            <h1 className="text-display text-3xl md:text-5xl">Política de Privacidade</h1>
          </div>
          <p className="text-body mb-12 text-lg">
            A AçaiBloom valoriza a sua privacidade. Esta política descreve como coletamos, protegemos e usamos seus dados pessoais em conformidade com a LGPD.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
            <div className="bg-muted/50 p-6 rounded-2xl border border-border/50">
              <div className="h-10 w-10 bg-purple-berry/10 rounded-lg flex items-center justify-center text-purple-berry mb-4">
                <Lock size={20} />
              </div>
              <h3 className="font-bold mb-2">Dados Protegidos</h3>
              <p className="text-sm text-muted-foreground">Criptografia de ponta a ponta em todas as suas transações e dados de cadastro.</p>
            </div>
            <div className="bg-muted/50 p-6 rounded-2xl border border-border/50">
              <div className="h-10 w-10 bg-green-vibrant/10 rounded-lg flex items-center justify-center text-green-vibrant mb-4">
                <Eye size={20} />
              </div>
              <h3 className="font-bold mb-2">Transparência</h3>
              <p className="text-sm text-muted-foreground">Você tem controle total sobre seus dados e pode solicitar exclusão a qualquer momento.</p>
            </div>
          </div>
          <div className="prose prose-slate dark:prose-invert max-w-none space-y-10 text-muted-foreground leading-relaxed">
            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
                <FileText className="text-purple-berry" size={24} /> 1. Coleta de Informações
              </h2>
              <p>
                Coletamos informações que você nos fornece diretamente ao fazer um pedido ou se inscrever em nossa newsletter. Isso inclui nome, e-mail, telefone e endereço de entrega para garantir que sua taça de açaí chegue perfeita até você.
              </p>
            </section>
            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">2. Uso das Informações</h2>
              <p>
                As informações coletadas são utilizadas exclusivamente para processar seus pedidos, melhorar nossos serviços de entrega e enviar atualizações relevantes (se autorizado) sobre novos sabores e promoções da AçaiBloom.
              </p>
            </section>
            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">3. Compartilhamento</h2>
              <p>
                Não vendemos ou alugamos seus dados para terceiros. Compartilhamos informações apenas com parceiros logísticos estritamente necessários para a conclusão da entrega do seu pedido.
              </p>
            </section>
            <section className="bg-purple-berry/5 p-8 rounded-3xl border border-purple-berry/10">
              <h2 className="text-2xl font-bold text-purple-berry mb-4">4. Seus Direitos</h2>
              <p className="text-foreground/80">
                Você tem o direito de acessar, corrigir ou solicitar a exclusão de seus dados pessoais a qualquer momento. Para qualquer dúvida sobre sua privacidade, entre em contato através do e-mail <strong>privacidade@acaibloom.com.br</strong>.
              </p>
            </section>
          </div>
          <div className="mt-20 pt-8 border-t text-sm text-muted-foreground flex flex-col md:flex-row justify-between gap-4">
            <p>Última atualização: 24 de Maio de 2024</p>
            <p>AçaiBloom - Néctar da Natureza</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}