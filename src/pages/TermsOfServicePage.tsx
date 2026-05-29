import React from 'react';
export function TermsOfServicePage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
      <h1 className="text-3xl md:text-4xl font-bold mb-8">Termos de Serviço</h1>
      <div className="prose prose-slate dark:prose-invert max-w-none space-y-6 text-muted-foreground">
        <p>
          Bem-vindo ao AçaiBloom. Ao utilizar nossos serviços, você concorda com os seguintes termos.
        </p>
        <h2 className="text-xl font-semibold text-foreground">1. Aceitação dos Termos</h2>
        <p>
          Ao acessar este site, você aceita cumprir estes termos de serviço e todas as leis e regulamentos aplicáveis.
        </p>
        <h2 className="text-xl font-semibold text-foreground">2. Uso do Serviço</h2>
        <p>
          Nossos serviços de entrega e cardápio online são destinados apenas para uso pessoal e não comercial.
        </p>
        <h2 className="text-xl font-semibold text-foreground">3. Pedidos e Pagamentos</h2>
        <p>
          Todos os pedidos estão sujeitos a disponibilidade e confirmação de pagamento. Preços podem ser alterados sem aviso prévio.
        </p>
        <h2 className="text-xl font-semibold text-foreground">4. Limitação de Responsabilidade</h2>
        <p>
          A AçaiBloom não se responsabiliza por danos indiretos resultantes do uso ou incapacidade de usar nossos serviços.
        </p>
      </div>
    </div>
  );
}