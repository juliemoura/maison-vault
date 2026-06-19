function Help() {
  return (
    <main className="max-w-4xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-bold text-primary mb-8">Central de Ajuda</h1>

      <p className="text-white/60 mb-10">
        Encontre respostas para as dúvidas mais frequentes. Caso não encontre o
        que procura, entre em contato com nossa equipe.
      </p>

      <div className="space-y-8">
        <section>
          <h2 className="text-xl font-semibold mb-2 text-primary">
            Como entrar em contato?
          </h2>
          <p className="text-white/60">
            Você pode utilizar nosso formulário de contato ou enviar uma
            mensagem através dos canais informados no site.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2 text-primary">
            Como recebo novidades?
          </h2>
          <p className="text-white/60">
            Basta informar seu e-mail no formulário de inscrição para receber
            atualizações e novidades.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2 text-primary">
            Meus dados estão seguros?
          </h2>
          <p className="text-white/60">
            Sim. Adotamos medidas de segurança para proteger as informações dos
            usuários. Consulte nossa Política de Privacidade para mais detalhes.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2 text-primary">
            Como solicitar a exclusão dos meus dados?
          </h2>
          <p className="text-white/60">
            Você pode solicitar a exclusão dos seus dados entrando em contato
            conosco através dos canais oficiais disponíveis no site.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2 text-primary">
            Não encontrei minha dúvida
          </h2>
          <p className="text-white/60">
            Caso sua dúvida não esteja listada aqui, entre em contato conosco e
            responderemos o mais breve possível.
          </p>
        </section>
      </div>
    </main>
  );
}

export default Help;
