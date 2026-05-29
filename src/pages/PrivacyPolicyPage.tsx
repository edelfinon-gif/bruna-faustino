import React from 'react';
export function PrivacyPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
      <h1 className="text-3xl md:text-4xl font-bold mb-8">Política de Privacidade</h1>
      <div className="prose prose-slate dark:prose-invert max-w-none space-y-6 text-muted-foreground">
        <p>
          A AçaiBloom valoriza a sua privacidade. Esta política descreve como coletamos e usamos seus dados pessoais.
        </p>
        <h2 className="text-xl font-semibold text-foreground">1. Coleta de Informações</h2>
        <p>
          Coletamos informações que você nos fornece diretamente ao fazer um pedido ou se inscrever em nossa newsletter, como nome, e-mail e endereço de entrega.
        </p>
        <h2 className="text-xl font-semibold text-foreground">2. Uso das Informações</h2>
        <p>
          As informações coletadas são utilizadas exclusivamente para processar seus pedidos, melhorar nossos serviços e enviar atualizações relevantes sobre nossos produtos.
        </p>
        <h2 className="text-xl font-semibold text-foreground">3. Proteção de Dados</h2>
        <p>
          Implementamos medidas de segurança técnicas e organizacionais para proteger seus dados contra acesso não autorizado ou perda.
        </p>
        <h2 className="text-xl font-semibold text-foreground">4. Seus Direitos</h2>
        <p>
          Você tem o direito de acessar, corrigir ou solicitar a exclusão de seus dados pessoais a qualquer momento através de nossos canais de atendimento.
        </p>
      </div>
    </div>
  );
}