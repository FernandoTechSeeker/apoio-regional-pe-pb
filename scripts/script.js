const leadForm = document.querySelector('#leadForm');
const feedback = document.querySelector('#formFeedback');
const SITE_OFICIAL_URL = 'https://apoiofamiliarpepb.com.br/';
const SITE_OFICIAL_IMAGE = 'https://apoiofamiliarpepb.com.br/assets/img/area-externa-fonte-vista.jpg.jpg';

const WHATSAPP_ORIENTACAO_URL = 'https://wa.me/5581973069389?text=Ol%C3%A1%2C%20preciso%20de%20suporte%20e%20orienta%C3%A7%C3%A3o%20para%20um%20familiar.%20Quero%20entender%20os%20pr%C3%B3ximos%20passos%20com%20seguran%C3%A7a.';
const WHATSAPP_COMECAR_URL = 'https://wa.me/5581973069389?text=Ol%C3%A1%2C%20preciso%20de%20orienta%C3%A7%C3%A3o%20inicial%20para%20minha%20fam%C3%ADlia.%20N%C3%A3o%20sei%20por%20onde%20come%C3%A7ar.';
const WHATSAPP_CUSTOS_URL = 'https://wa.me/5581973069389?text=Ol%C3%A1%2C%20quero%20entender%20os%20custos%20antes%20de%20decidir.';
const WHATSAPP_DUVIDAS_URL = 'https://wa.me/5581973069389?text=Ol%C3%A1%2C%20ainda%20tenho%20d%C3%BAvidas%20e%20quero%20orienta%C3%A7%C3%A3o%20para%20minha%20fam%C3%ADlia.';

function atualizarSEODeCaptacao() {
  document.title = 'Apoio Familiar PE/PB | Orientação e Suporte Familiar';

  const description = document.querySelector('meta[name="description"]');
  if (description) {
    description.setAttribute(
      'content',
      'Suporte inicial, acolhimento e orientação para famílias em PE e PB. Atendimento discreto, responsável e focado em organização dos próximos passos.'
    );
  }

  const ogTitle = document.querySelector('meta[property="og:title"]');
  if (ogTitle) {
    ogTitle.setAttribute(
      'content',
      'Apoio Familiar PE/PB | Orientação e Suporte Familiar'
    );
  }

  const ogDescription = document.querySelector('meta[property="og:description"]');
  if (ogDescription) {
    ogDescription.setAttribute(
      'content',
      'Direcionamento seguro, acolhimento e orientação inicial para famílias em PE e PB.'
    );
  }
}

function atualizarMetadadosDominio() {
  const canonical = document.querySelector('link[rel="canonical"]');
  if (canonical) canonical.href = SITE_OFICIAL_URL;

  const ogUrl = document.querySelector('meta[property="og:url"]');
  if (ogUrl) ogUrl.setAttribute('content', SITE_OFICIAL_URL);

  const ogImage = document.querySelector('meta[property="og:image"]');
  if (ogImage) ogImage.setAttribute('content', SITE_OFICIAL_IMAGE);

  document.querySelectorAll('script[type="application/ld+json"]').forEach((script) => {
    try {
      const data = JSON.parse(script.textContent);

      if (data && data['@type'] === 'ConsultingService') {
        data.url = SITE_OFICIAL_URL;
        data.telephone = '+5581973069389';

        if (data.contactPoint) {
          data.contactPoint.telephone = '+5581973069389';
        }

        script.textContent = JSON.stringify(data, null, 2);
      }
    } catch (error) {
      return;
    }
  });
}

function atualizarHeroCaptacao() {
  const hero = document.querySelector('.hero');
  if (!hero) return;

  const h1 = hero.querySelector('h1');
  if (h1) {
    h1.textContent = 'Sua família precisa de orientação e você não sabe qual decisão tomar?';
  }

  const paragrafos = hero.querySelectorAll('p');

  if (paragrafos[0]) {
    paragrafos[0].innerHTML =
      'Receba orientação inicial para organizar dúvidas familiares, custos, contrato, regras e próximos passos em <strong>Pernambuco</strong> e <strong>Paraíba</strong> — com sigilo, responsabilidade e clareza.';
  }

  if (paragrafos[1]) {
    paragrafos[1].innerHTML =
      'Ajudamos famílias que lidam com situações delicadas, resistência ao diálogo, conflito familiar, dúvidas sobre acolhimento e medo de tomar uma decisão errada.';
  }

  const botaoPrincipal = hero.querySelector('.hero-actions .btn-primary');
  if (botaoPrincipal) {
    botaoPrincipal.href = WHATSAPP_COMECAR_URL;
    botaoPrincipal.textContent = 'Fale no WhatsApp agora';
    botaoPrincipal.target = '_blank';
    botaoPrincipal.rel = 'noopener noreferrer';
  }
}

function atualizarLinksWhatsApp() {
  document.querySelectorAll('a[href*="wa.me"], a[href*="api.whatsapp.com"]').forEach((link) => {
    link.href = WHATSAPP_ORIENTACAO_URL;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
  });
}

function prepararFormularioSimplificado() {
  const telefoneInput = document.querySelector('#telefone');
  const situacaoInput = document.querySelector('#situacao');
  const paraQuemInput = document.querySelector('#paraQuem');

  const telefoneLabel = telefoneInput?.closest('label');
  const situacaoLabel = situacaoInput?.closest('label');

  telefoneInput?.removeAttribute('required');
  situacaoInput?.removeAttribute('required');

  telefoneLabel?.remove();
  situacaoLabel?.remove();

  if (paraQuemInput && !document.querySelector('#voluntario')) {
    const voluntarioLabel = document.createElement('label');

    voluntarioLabel.innerHTML = `
      Voluntário?
      <select id="voluntario" required>
        <option value="">Selecione</option>
        <option>Sim</option>
        <option>Não</option>
        <option>Não sei informar</option>
      </select>
    `;

    paraQuemInput.closest('label')?.insertAdjacentElement('afterend', voluntarioLabel);
  }
}

function atualizarFormularioCaptacao() {
  const contato = document.querySelector('#contato');
  if (!contato) return;

  const h2 = contato.querySelector('h2');
  if (h2) h2.textContent = 'Não sabe o que fazer? Fale com a gente agora.';

  const sectionTitle = contato.querySelector('.section-title p');
  if (sectionTitle) {
    sectionTitle.textContent =
      'Você não precisa ter tudo organizado para o primeiro contato. Envie apenas o essencial e a gente ajuda a organizar os próximos passos com discrição e responsabilidade.';
  }
}

function inserirDepois(elemento, novoElemento) {
  if (!elemento || !elemento.parentNode || !novoElemento) return;
  elemento.parentNode.insertBefore(novoElemento, elemento.nextSibling);
}

function adicionarAtendimentoRapido() {
  if (document.querySelector('#atendimento-rapido')) return;

  const hero = document.querySelector('.hero');
  if (!hero) return;

  const rapido = document.createElement('section');
  rapido.id = 'atendimento-rapido';
  rapido.className = 'atendimento-rapido-section';

  rapido.innerHTML = `
    <div class="container atendimento-rapido-box">
      <div>
        <span class="mini-label">Atendimento rápido</span>
        <h2>Precisa falar agora?</h2>
        <p>Se a família está em uma situação delicada ou sem saber o que fazer, vá direto para o WhatsApp. Depois, com calma, você pode ler os detalhes.</p>
        <p class="alerta-urgencia">Em risco imediato, ameaça à vida ou emergência, procure primeiro atendimento de urgência: SAMU 192, UPA, hospital ou serviço especializado da sua região.</p>
        <p class="alerta-urgencia">Depois que a situação estiver estabilizada, fale conosco pelo WhatsApp. Podemos orientar os próximos passos e, quando houver compatibilidade, facilitar o contato com a unidade responsável para avaliar acolhimento, regras, documentação e apoio logístico seguro.</p>
      </div>
      <a href="${WHATSAPP_COMECAR_URL}" target="_blank" rel="noopener noreferrer" class="btn-whatsapp btn-whatsapp-grande">Fale no WhatsApp agora — sem compromisso</a>
    </div>
  `;

  inserirDepois(hero, rapido);
}

function adicionarNaoSabePorOndeComecar() {
  if (document.querySelector('#nao-sabe-por-onde-comecar')) return;

  const atendimentoRapido = document.querySelector('#atendimento-rapido') || document.querySelector('.hero');
  if (!atendimentoRapido) return;

  const secao = document.createElement('section');
  secao.id = 'nao-sabe-por-onde-comecar';
  secao.className = 'bg-white secao-compacta';

  secao.innerHTML = `
    <div class="container">
      <div class="section-title">
        <span>Primeiro passo</span>
        <h2>Não sabe por onde começar?</h2>
        <p>Muitas famílias chegam aqui sem saber se devem procurar uma instituição, serviço especializado, apoio público ou apenas uma orientação inicial.</p>
      </div>
      <div class="card">
        <p>Se você está lidando com uma <strong>situação familiar delicada</strong>, conflitos, resistência ao diálogo ou medo de tomar a decisão errada, podemos ajudar a organizar os primeiros passos com sigilo e responsabilidade.</p>
        <div class="cta-strip">
          <strong>Você não precisa decidir tudo sozinho.</strong>
          <a href="${WHATSAPP_COMECAR_URL}" target="_blank" rel="noopener noreferrer" class="btn btn-primary">Fale no WhatsApp agora — sem compromisso</a>
        </div>
        <p class="service-note">Atendemos de segunda a sábado, das 8h às 20h. Respondemos assim que possível.</p>
      </div>
    </div>
  `;

  inserirDepois(atendimentoRapido, secao);
}

function adicionarSecaoPerguntasDaFamilia() {
  if (document.querySelector('#perguntas-da-familia')) return;

  const secoes = Array.from(document.querySelectorAll('section'));
  const indicacao = secoes.find((secao) =>
    secao.textContent.includes('Orientação familiar: quando buscar suporte?')
  );

  if (!indicacao) return;

  const secao = document.createElement('section');
  secao.id = 'perguntas-da-familia';
  secao.className = 'bg-white secao-compacta';

  secao.innerHTML = `
    <div class="container">
      <div class="section-title">
        <span>Perguntas reais da família</span>
        <h2>Dúvidas comuns quando existe uma situação familiar delicada ou resistência ao diálogo</h2>
        <p>Essas são buscas frequentes de quem está tentando entender qual decisão tomar sem agir apenas pelo desespero.</p>
      </div>

      <div class="grid-2">
        <article class="card">
          <h3>Meu familiar está em uma situação delicada. O que fazer?</h3>
          <p>Essa é uma das perguntas mais difíceis e comuns. Não existe uma resposta única porque cada situação é diferente — contexto, urgência, abertura para diálogo e momento da família influenciam o próximo passo.</p>
          <p>Antes de qualquer decisão, orientamos a entender as opções disponíveis, os custos reais, as regras de contrato e o que perguntar antes de escolher uma instituição.</p>
        </article>

        <article class="card">
          <h3>Meu familiar não aceita ajuda. O que eu faço?</h3>
          <p>A resistência ao diálogo é uma das situações mais desgastantes. Quando o familiar não aceita ajuda, existem caminhos que exigem cautela, critérios e responsabilidade.</p>
          <p>Orientamos sobre perguntas importantes e cuidados antes de qualquer decisão, sempre reforçando que decisões especializadas ou legais precisam de profissionais habilitados.</p>
        </article>

        <article class="card">
          <h3>Quais custos a família deve confirmar em PE e PB?</h3>
          <p>Os valores variam conforme estrutura, localização, rotina e tempo de contrato. A família deve confirmar diretamente com cada instituição o que está incluso e quais responsabilidades existem.</p>
          <p>Antes de fechar, confirme entrada, mensalidade, o que está incluso, regras de saída antecipada e política de reembolso.</p>
        </article>

        <article class="card">
          <h3>Existe suporte público para famílias?</h3>
          <p>Sim. Existem serviços públicos e especializados disponíveis em vários municípios. A disponibilidade varia conforme cidade, rede local e momento.</p>
          <p>Verifique a Secretaria Municipal de Saúde e os canais oficiais da sua região.</p>
        </article>

        <article class="card">
          <h3>Instituição ou serviço especializado: como comparar?</h3>
          <p>Cada instituição possui estrutura, equipe, rotina, regras e responsabilidades próprias. A família deve comparar documentação, contrato, custos, comunicação e rotina antes de decidir.</p>
          <p>A escolha depende do perfil da necessidade. Nosso papel é ajudar a família a chegar nessa conversa mais preparada.</p>
        </article>

        <article class="card">
          <h3>Ainda com dúvida sobre qual o primeiro passo?</h3>
          <p>Você pode falar no WhatsApp antes de decidir. Envie apenas o essencial e organizamos as principais dúvidas com responsabilidade.</p>
          <a href="${WHATSAPP_DUVIDAS_URL}" target="_blank" rel="noopener noreferrer" class="btn btn-primary">Ainda tenho dúvidas — quero orientação</a>
        </article>
      </div>
    </div>
  `;

  inserirDepois(indicacao, secao);
}

function adicionarSecaoEstruturaConfirmar() {
  if (document.querySelector('#estrutura-confirmar')) return;

  const regioes = document.querySelector('#regioes');
  if (!regioes) return;

  const secao = document.createElement('section');
  secao.id = 'estrutura-confirmar';
  secao.className = 'bg-white secao-compacta';

  secao.innerHTML = `
    <div class="container">
      <div class="section-title">
        <span>Antes de decidir</span>
        <h2>Estrutura, equipe e rotina: o que confirmar antes da decisão</h2>
        <p>Cada instituição possui sua própria estrutura, equipe, rotina e contrato. Antes de fechar qualquer decisão, a família deve confirmar diretamente com a unidade responsável o que está incluso e como funciona o acompanhamento.</p>
      </div>
      <div class="grid-3">
        <article class="card"><h3>Equipe de acompanhamento</h3><p>Confirme se a instituição conta com coordenação, monitores, equipe administrativa e profissionais de apoio durante a rotina do acolhido.</p></article>
        <article class="card"><h3>Atividades de apoio</h3><p>Pergunte quais atividades de apoio, orientação, rotina e desenvolvimento pessoal são oferecidas e qual a frequência.</p></article>
        <article class="card"><h3>Suporte especializado</h3><p>Verifique se existe suporte especializado, como ocorre, qual a frequência e se há cobrança separada.</p></article>
        <article class="card"><h3>Monitores 24h</h3><p>Confirme se há equipe presente durante o dia e à noite para acompanhar a rotina, organização, segurança e convivência dos acolhidos.</p></article>
        <article class="card"><h3>Alimentação e rotina</h3><p>Pergunte quantas refeições são oferecidas por dia, se estão inclusas na mensalidade e como funciona a rotina diária da instituição.</p></article>
        <article class="card"><h3>Atividades de rotina e apoio</h3><p>Verifique se há reuniões, grupos de partilha, espiritualidade, atividades de rotina, atividades físicas ou recreativas.</p></article>
        <article class="card"><h3>Acompanhamento familiar</h3><p>Confirme como funcionam visitas, ligações, reuniões familiares e participação da família no processo.</p></article>
        <article class="card"><h3>Infraestrutura</h3><p>Pergunte sobre dormitórios, banheiros, lavanderia, pertences permitidos, espaços de convivência e condições gerais de acomodação.</p></article>
        <article class="card"><h3>Regularização</h3><p>Antes de qualquer pagamento, solicite informações sobre contrato, documentação, registro, regras internas e responsabilidade da instituição.</p></article>
      </div>
      <div class="cta-strip"><strong>Quer saber o que perguntar antes de escolher uma instituição?</strong><a class="btn btn-primary" href="${WHATSAPP_ORIENTACAO_URL}" target="_blank" rel="noopener noreferrer">Falar pelo WhatsApp</a></div>
      <p class="service-note">As informações acima são pontos de verificação. Não representam garantia de que toda instituição oferece todos esses itens. Sempre confirme diretamente com a unidade responsável.</p>
    </div>
  `;

  inserirDepois(regioes, secao);
}

function adicionarSecaoFaixaPrecos() {
  if (document.querySelector('#faixa-precos')) return;

  const transparencia = document.querySelector('#transparencia');
  if (!transparencia || !transparencia.parentNode) return;

  const secao = document.createElement('section');
  secao.id = 'faixa-precos';
  secao.className = 'bg-white secao-compacta';

  secao.innerHTML = `
    <div class="container">
      <div class="section-title">
        <span>Valores</span>
        <h2>Quais custos a família deve avaliar em PE e PB?</h2>
        <p>Não existe um preço único. Os valores variam conforme estrutura, localização, equipe, rotina, tempo de contrato e o que está incluso.</p>
      </div>
      <div class="grid-3">
        <article class="card"><h3>Faixa de referência</h3><p>Como referência geral do mercado regional, muitas instituições simples e intermediárias costumam trabalhar com mensalidades entre <strong>R$ 1.500 e R$ 3.500 por mês</strong>.</p><p>Valores menores podem representar custo interno aproximado, não necessariamente o preço comercial cobrado da família.</p></article>
        <article class="card"><h3>Entrada e custos extras</h3><p>Algumas instituições podem cobrar entrada separada, apoio logístico, itens pessoais, pertences ou custos administrativos. Tudo precisa ser confirmado antes da contratação.</p></article>
        <article class="card"><h3>Confirme antes de pagar</h3><p>Antes de fechar, pergunte o valor de entrada, mensalidade, vencimento, tempo mínimo de contrato, regras de saída antecipada e política de reembolso, quando houver.</p></article>
      </div>
      <div class="cta-strip"><strong>Quer entender se o valor faz sentido para sua região?</strong><a class="btn btn-primary" href="${WHATSAPP_CUSTOS_URL}" target="_blank" rel="noopener noreferrer">Entender os custos antes de decidir</a></div>
    </div>
  `;

  transparencia.parentNode.insertBefore(secao, transparencia);
}

function adicionarSecaoQuemOrienta() {
  if (document.querySelector('#quem-orienta')) return;

  const contato = document.querySelector('#contato');
  if (!contato || !contato.parentNode) return;

  const secao = document.createElement('section');
  secao.id = 'quem-orienta';
  secao.className = 'bg-white quem-orienta-section secao-compacta';

  secao.innerHTML = `
    <div class="container">
      <div class="section-title">
        <span>Quem orienta</span>
        <h2>Orientação simples, prática e responsável</h2>
        <p>Não substituímos profissionais habilitados, orientação jurídica ou serviço de emergência. Não fazemos diagnóstico e não decidimos por você.</p>
      </div>
      <div class="quem-orienta-destaques">
        <div class="destaque-item"><strong>Experiência no contexto</strong><p>Entendemos dúvidas comuns sobre custos, contratos, regras, rotina e contato com instituições em Pernambuco e Paraíba.</p></div>
        <div class="destaque-item"><strong>Sem pressão</strong><p>Orientamos dentro dos nossos limites, com clareza e responsabilidade.</p></div>
        <div class="destaque-item"><strong>Foco na família</strong><p>Ajudamos a organizar a decisão num momento de medo, pressa e desgaste.</p></div>
      </div>
    </div>
  `;

  contato.parentNode.insertBefore(secao, contato);
}

function compactarPaginaParaFamiliaEmCrise() {
  document.body.classList.add('jornada-rapida');

  const secoes = Array.from(document.querySelectorAll('section'));
  const secaoEstrutura = secoes.find((secao) => secao.textContent.includes('Estrutura e ambiente'));
  const secaoRegioes = document.querySelector('#regioes');

  secaoEstrutura?.classList.add('secao-opcional-mobile');
  secaoRegioes?.classList.add('secao-compacta');
}

leadForm?.addEventListener('submit', (event) => {
  event.preventDefault();

  const nome = document.querySelector('#nome').value.trim();
  const cidade = document.querySelector('#cidade').value.trim();
  const paraQuem = document.querySelector('#paraQuem').value.trim();
  const voluntario = document.querySelector('#voluntario')?.value.trim();
  const urgencia = document.querySelector('#urgencia').value.trim();
  const mensagem = document.querySelector('#mensagem').value.trim();
  const consentimento = document.querySelector('#consentimento').checked;

  if (!nome || !cidade || !paraQuem || !voluntario || !urgencia || !consentimento) {
    feedback.textContent = 'Preencha nome, cidade, para quem é, se é voluntário, urgência e autorização de contato.';
    return;
  }

  const texto = `Olá, preciso de suporte e orientação para um familiar. Quero entender custos, contrato, regras e próximos passos antes de decidir.%0A%0ANome: ${encodeURIComponent(nome)}%0ACidade/Estado: ${encodeURIComponent(cidade)}%0AÉ para: ${encodeURIComponent(paraQuem)}%0AVoluntário: ${encodeURIComponent(voluntario)}%0AUrgência: ${encodeURIComponent(urgencia)}%0AMensagem: ${encodeURIComponent(mensagem || 'Não informado')}`;

  window.open(`https://wa.me/5581973069389?text=${texto}`, '_blank', 'noopener,noreferrer');
  feedback.textContent = 'Perfeito. O WhatsApp foi aberto com a mensagem pronta.';
});

function inicializarAjustes() {
  atualizarSEODeCaptacao();
  atualizarMetadadosDominio();
  atualizarHeroCaptacao();
  atualizarLinksWhatsApp();
  prepararFormularioSimplificado();
  atualizarFormularioCaptacao();
  adicionarAtendimentoRapido();
  adicionarNaoSabePorOndeComecar();
  adicionarSecaoPerguntasDaFamilia();
  adicionarSecaoEstruturaConfirmar();
  adicionarSecaoFaixaPrecos();
  adicionarSecaoQuemOrienta();
  compactarPaginaParaFamiliaEmCrise();
  atualizarLinksWhatsApp();
  atualizarMetadadosDominio();
  atualizarSEODeCaptacao();
}

document.addEventListener('DOMContentLoaded', inicializarAjustes);
inicializarAjustes();
