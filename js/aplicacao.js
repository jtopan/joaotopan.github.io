const areaGrafo = document.querySelector("#area-grafo");
const areaTrabalho = document.querySelector(".area-trabalho");
const planoGrafo = document.querySelector("#plano-grafo");
const ligacoesGrafo = document.querySelector("#ligacoes-grafo");
let entidades = [...document.querySelectorAll(".entidade")];
const nivelZoom = document.querySelector("#nivel-zoom");
const painelEntidade = document.querySelector("#painel-entidade");
const tituloPainel = document.querySelector("#titulo-painel");
const conteudoPainel = document.querySelector("#conteudo-painel");
let corpoPainel;
const rodapePainel = document.querySelector("#rodape-painel");
const fecharPainel = document.querySelector("#fechar-painel");
const layoutMobile = window.matchMedia(
  "(max-width: 700px), (max-height: 500px) and (max-width: 900px)",
);

const configuracaoEmailJS = {
  idServico: "SEU_ID_DO_SERVICO",
  idModelo: "SEU_ID_DO_MODELO",
  chavePublica: "SUA_CHAVE_PUBLICA",
};

const conteudos = {
  investigado: {
    titulo: "Pessoa de interesse",
    campos: [
      { chave: "Nome", valor: "João Topan" },
      { chave: "Profissão", valor: "Perito judicial" },
      { chave: "Especialização", valor: "Forense computacional" },
      { chave: "Localidade", valor: "São Paulo, SP" },
    ],
    observacoes: "2024 - Graduado em Sistemas de Informação pela Universidade de São Paulo\n2025 - Pós-graduado em Cibersegurança pela FIAP\n2026 - Especialização em Forense Computacional pela Academia Forense Digital",
    procuradoPor: "Transformar seu currículo digital em uma piada.\nPara continuar vendo meu trabalho, clique abaixo.",
    imagem: "assets/profilepic.png",
  },
  metodologia: {
    titulo: "Metodologia",
    descricao: "O trabalho pericial exige o conhecimento de procedimentos padronizados de manuseio de evidências digitais, antes mesmo de pegar um dispositivo em mãos. Ao dominá-los, garantimos integridade tanto à evidência digital, quanto ao processo judicial.\n\nA ISO/IEC 20737, homologada pela ABNT, é a principal norma que rege os procedimentos de manuseio de evidências digitais, com diretrizes para identificação, coleta, aquisição e preservação de evidências digitais em processos judiciais.",
  },
  areas: {
    titulo: "Áreas de atuação",
    descricao: "Na perícia digital, encontramos diferentes tipos de dispositivos ou arquiteturas, cada um com sua particularidade de coleta, aquisição, análise e preservação.",
    itens: [
      { id: "discos", titulo: "Discos e armazenamento" },
      { id: "memoria", titulo: "Memória" },
      { id: "rede", titulo: "Rede" },
      { id: "dispositivos-moveis", titulo: "Dispositivos móveis" },
      { id: "malware", titulo: "Malware" },
      { id: "nuvem", titulo: "Nuvem" },
      { id: "mensageria", titulo: "Mensageria" },
    ],
  },
  laudo: {
    titulo: "Laudo pericial",
    descricao: "O laudo deve ser estruturado de forma compreensível, verificável por outro perito e objetivo na resposta aos quesitos.",
    secoes: [
      {
        titulo: "1. Identificação",
        texto: "Processo, partes, juízo, nomeação e data.",
      },
      {
        titulo: "2. Objeto da perícia",
        texto: "O que foi determinado pelo juízo e o escopo do exame.",
      },
      {
        titulo: "3. Material examinado",
        texto: "Descrição de cada item, com identificação única, estado no recebimento e hashes.",
      },
      {
        titulo: "4. Metodologia",
        texto: "Procedimentos e ferramentas, com versões, e as normas adotadas.",
      },
      {
        titulo: "5. Análise técnica",
        texto: "Achados organizados, com evidências e referências.",
      },
      {
        titulo: "6. Resposta aos quesitos",
        texto: "Cada quesito reproduzido e respondido de forma direta e fundamentada, remetendo à análise.",
      },
      {
        titulo: "8. Limitações e ressalvas",
        texto: "O que não foi possível verificar e por quê.",
      },
      {
        titulo: "9. Anexos",
        texto: "Logs, capturas de tela, relatórios de ferramenta, termos de cadeia de custódia.",
      },
    ],
  },
  contato: {
    titulo: "Contato",
    descricao: "O alvo disponibilizou um meio de contato para eventuais comunicações futuras.",
  },
  cadeia: {
    titulo: "Cadeia de custódia",
    descricao: "O registro de cadeia de custódia é um documento identificando a cronologia de movimento e do manuseio da potencial evidência digital, desde a coleta ou aquisição até o momento e localidade atual.\n\nA ISO 27037 também destaca a importância de certas precauções no local do incidente, manejo dos envolvidos presentes, e documentações pertinentes à todas as fases do processo, principalmente no primeiro contato com o dispositivo digital.",
  },
  iso27037: {
    titulo: "ISO 27037",
    descricao: "Dá as principais diretrizes para o manuseio da evidência, destacando as responsabilidades do Primeiro Interventor da Evidência Digital (DEFR) e os princípios a serem seguidos durante os procedimentos:",
    secoes: [
      {
        titulo: "Auditabilidade",
        texto: "Recomenda-se que seja possível para um assistente independente ou outra parte autorizada interessada avaliar as atividades realizadas por um DEFR.",
      },
      {
        titulo: "Repetibilidade",
        texto: "Convém que um DEFR seja capaz de realizar todos os processos descritos na documentação e, a partir dos mesmos procedimentos e instrumentos, alcançar os mesmos resultados.",
      },
      {
        titulo: "Reprodutibilidade",
        texto: "A reprodutibilidade é estabelecida quando os mesmos resultados de testes são produzidos sob a utilização de mesmos métodos, porém com diferentes instrumentos (ex: ferramentas de aquisição, hashing).",
      },
      {
        titulo: "Justificabilidade",
        texto: "A justificativa pode ser alcançada demonstrando que a decisão foi a melhor escolha para obter toda a potencial evidência digital.",
      },
    ],
  },
  "processos-manuseio": {
    titulo: "Processos de manuseio",
    descricao: "Uma evidência pode ser frágil em sua natureza e adulterada ou destruída por exame impróprio. A ISO 27037 dá diretrizes específicas para quatro etapas de manuseio:",
    secoes: [
      {
        titulo: "Identificação",
        texto: "A pesquisa, reconhecimento e documentação da potencial evidência digital, antes de qualquer outro exame.",
      },
      {
        titulo: "Coleta",
        texto: "Remoção do dispositivo com evidência digital para um ambiente controlado. Não aplicável, dependendo do contexto.",
      },
      {
        titulo: "Aquisição",
        texto: "Produção da cópia forense e verificação da integridade da réplica.",
      },
      {
        titulo: "Preservação",
        texto: "Configura a guarda do dispositivo digital contra espoliação ou adulteração.",
      },
    ],
  },
  discos: {
    titulo: "Discos e armazenamento",
    objetivo: "Examinar o armazenamento de computadores e mídias físicas.",
    analise: "Arquivos ativos, apagados e recuperáveis, metadados, linha do tempo, artefatos de sistema, registro do Windows, logs, histórico de uso.",
  },
  memoria: {
    titulo: "Memória",
    objetivo: "Capturar e analisar dados voláteis.",
    analise: "Processos em execução, conexões, módulos carregados, credenciais e vestígios em memória.",
  },
  rede: {
    titulo: "Rede",
    objetivo: "Reconstruir comunicações e identificar atividade suspeita.",
    analise: "Capturas de tráfego, logs de servidores e firewalls, correlação temporal de eventos.",
  },
  "dispositivos-moveis": {
    titulo: "Dispositivos móveis",
    objetivo: "Extrair e analisar dados de smartphones e tablets.",
    analise: "Aplicativos, mensagens, localização, mídia, registros de uso, com atenção ao tipo de extração e às limitações de cada uma.",
  },
  malware: {
    titulo: "Malware",
    objetivo: "Identificar e caracterizar software malicioso.",
    analise: "Análise estática e dinâmica em ambiente isolado, indicadores de comprometimento, comportamento e persistência.",
  },
  nuvem: {
    titulo: "Nuvem",
    objetivo: "Analisar dados e registros em serviços em nuvem.",
    analise: "Logs de acesso e auditoria, arquivos e versões, configurações de contas e permissões. Depende da cooperação do provedor ou administrador da conta.",
  },
  mensageria: {
    titulo: "Mensageria",
    objetivo: "Examinar mensagens e e-mails.",
    analise: "Cabeçalhos e autenticidade de e-mails, aplicativos de mensagens, anexos, trilha temporal, contexto e integridade de conversas.",
  },
};

const ligacoes = [
  { origem: "investigado", destino: "metodologia" },
  { origem: "investigado", destino: "areas" },
  { origem: "investigado", destino: "laudo" },
  { origem: "investigado", destino: "contato" },
  { origem: "metodologia", destino: "cadeia" },
  { origem: "metodologia", destino: "iso27037" },
  { origem: "metodologia", destino: "processos-manuseio" },
  { origem: "areas", destino: "discos" },
  { origem: "areas", destino: "memoria" },
  { origem: "areas", destino: "rede" },
  { origem: "areas", destino: "dispositivos-moveis" },
  { origem: "areas", destino: "malware" },
  { origem: "areas", destino: "mensageria" },
  { origem: "areas", destino: "nuvem" },
];

const grafo = {
  posicoes: new Map(),
  escala: 1,
  deslocamentoX: 0,
  deslocamentoY: 0,
  larguraAnterior: 0,
  alturaAnterior: 0,
  interacao: null,
  entidadeSelecionada: null,
};

function aplicarVisao() {
  planoGrafo.style.transform =
    `translate(${grafo.deslocamentoX}px, ${grafo.deslocamentoY}px) scale(${grafo.escala})`;
  areaGrafo.style.setProperty("--zoom-malha", grafo.escala);
  areaGrafo.style.setProperty("--deslocamento-x", `${grafo.deslocamentoX}px`);
  areaGrafo.style.setProperty("--deslocamento-y", `${grafo.deslocamentoY}px`);
  nivelZoom.value = `${Math.round(grafo.escala * 100)}%`;
  nivelZoom.textContent = nivelZoom.value;
}

function pontoNaBorda(origem, destino, largura, altura) {
  const diferencaX = destino.x - origem.x;
  const diferencaY = destino.y - origem.y;
  const escalaX = Math.abs(diferencaX) ? largura / 2 / Math.abs(diferencaX) : Infinity;
  const escalaY = Math.abs(diferencaY) ? altura / 2 / Math.abs(diferencaY) : Infinity;
  const escala = Math.min(escalaX, escalaY);

  return {
    x: origem.x + diferencaX * escala,
    y: origem.y + diferencaY * escala,
  };
}

function desenharLigacoes() {
  const largura = areaGrafo.clientWidth;
  const altura = areaGrafo.clientHeight;
  ligacoesGrafo.setAttribute("viewBox", `0 0 ${largura} ${altura}`);

  ligacoes.forEach(({ origem: idOrigem, destino: idDestino }) => {
    const origemElemento = entidades.find((item) => item.dataset.entidade === idOrigem);
    const destinoElemento = entidades.find((item) => item.dataset.entidade === idDestino);
    const origem = grafo.posicoes.get(idOrigem);
    const destino = grafo.posicoes.get(idDestino);
    if (!origemElemento || !destinoElemento || !origem || !destino) return;

    const origemBorda = pontoNaBorda(
      origem,
      destino,
      origemElemento.offsetWidth,
      origemElemento.offsetHeight,
    );
    const destinoBorda = pontoNaBorda(
      destino,
      origem,
      destinoElemento.offsetWidth,
      destinoElemento.offsetHeight,
    );
    const idLigacao = `${idOrigem}-${idDestino}`;
    let linha = ligacoesGrafo.querySelector(`[data-ligacao="${idLigacao}"]`);

    if (!linha) {
      linha = document.createElementNS("http://www.w3.org/2000/svg", "line");
      linha.dataset.ligacao = idLigacao;
      linha.setAttribute("marker-end", "url(#ponta-seta)");
      ligacoesGrafo.append(linha);
    }

    linha.setAttribute("x1", origemBorda.x);
    linha.setAttribute("y1", origemBorda.y);
    linha.setAttribute("x2", destinoBorda.x);
    linha.setAttribute("y2", destinoBorda.y);
  });
}

function posicionarEntidades() {
  entidades.forEach((entidade) => {
    const posicao = grafo.posicoes.get(entidade.dataset.entidade);
    entidade.style.left = `${posicao.x}px`;
    entidade.style.top = `${posicao.y}px`;
  });
  desenharLigacoes();
}

function organizarGrafo() {
  const largura = areaGrafo.clientWidth;
  const altura = areaGrafo.clientHeight;
  if (!largura || !altura) return;

  const centro = { x: largura / 2, y: altura / 2 };
  const coordenadas = new Map([
    ["investigado", { x: 0, y: 0 }],
    ["laudo", { x: 0, y: -150 }],
    ["contato", { x: 0, y: 150 }],
    ["metodologia", { x: -130, y: 0 }],
    ["cadeia", { x: -285, y: -145 }],
    ["iso27037", { x: -315, y: 0 }],
    ["processos-manuseio", { x: -285, y: 145 }],
    ["areas", { x: 130, y: 0 }],
    ["discos", { x: 260, y: -220 }],
    ["memoria", { x: 260, y: -75 }],
    ["rede", { x: 260, y: 75 }],
    ["dispositivos-moveis", { x: 260, y: 220 }],
    ["malware", { x: 400, y: -145 }],
    ["mensageria", { x: 400, y: 0 }],
    ["nuvem", { x: 400, y: 145 }],
  ]);
  const maiorX = Math.max(
    ...entidades.map((entidade) => {
      const ponto = coordenadas.get(entidade.dataset.entidade);
      return Math.abs(ponto.x) + entidade.offsetWidth / 2;
    }),
  );
  const maiorY = Math.max(
    ...entidades.map((entidade) => {
      const ponto = coordenadas.get(entidade.dataset.entidade);
      return Math.abs(ponto.y) + entidade.offsetHeight / 2;
    }),
  );
  const escala = Math.min(1, (largura / 2 - 12) / maiorX, (altura / 2 - 12) / maiorY);
  grafo.posicoes.clear();
  coordenadas.forEach((ponto, id) => {
    grafo.posicoes.set(id, {
      x: centro.x + ponto.x,
      y: centro.y + ponto.y,
    });
  });

  grafo.larguraAnterior = largura;
  grafo.alturaAnterior = altura;
  grafo.escala = escala;
  grafo.deslocamentoX = centro.x * (1 - escala);
  grafo.deslocamentoY = centro.y * (1 - escala);
  const marcador = ligacoesGrafo.querySelector("defs");
  ligacoesGrafo.replaceChildren(marcador);
  posicionarEntidades();
  aplicarVisao();

  if (grafo.entidadeSelecionada) centralizarEntidade(grafo.entidadeSelecionada);
}

function ajustarGrafo() {
  const largura = areaGrafo.clientWidth;
  const altura = areaGrafo.clientHeight;
  if (!largura || !altura) return;

  if (!grafo.posicoes.size) {
    organizarGrafo();
    return;
  }

  grafo.larguraAnterior = largura;
  grafo.alturaAnterior = altura;
  desenharLigacoes();
}

function centralizarEntidade(entidade) {
  const posicao = grafo.posicoes.get(entidade.dataset.entidade);
  if (!posicao) return;

  grafo.deslocamentoX = areaGrafo.clientWidth / 2 - posicao.x * grafo.escala;
  grafo.deslocamentoY = areaGrafo.clientHeight / 2 - posicao.y * grafo.escala;
  aplicarVisao();
}

function aproximar(novaEscala, x, y) {
  const escala = Math.min(2.5, Math.max(0.5, novaEscala));
  const proporcao = escala / grafo.escala;
  grafo.deslocamentoX = x - (x - grafo.deslocamentoX) * proporcao;
  grafo.deslocamentoY = y - (y - grafo.deslocamentoY) * proporcao;
  grafo.escala = escala;
  aplicarVisao();
}

function atualizarRodapePainel(idEntidade) {
  rodapePainel.replaceChildren();
  const destinos = {
    investigado: [{ id: "metodologia", texto: "Metodologia →", lado: "direita" }],
    metodologia: [
      { id: "investigado", texto: "← Pessoa de interesse", lado: "esquerda" },
      { id: "iso27037", texto: "ISO 27037 →", lado: "direita" },
    ],
    iso27037: [
      { id: "metodologia", texto: "← Metodologia", lado: "esquerda" },
      { id: "processos-manuseio", texto: "Processos de manuseio →", lado: "direita" },
    ],
    "processos-manuseio": [
      { id: "iso27037", texto: "← ISO 27037", lado: "esquerda" },
      { id: "cadeia", texto: "Cadeia de custódia →", lado: "direita" },
    ],
    cadeia: [
      { id: "processos-manuseio", texto: "← Processos de manuseio", lado: "esquerda" },
      { id: "areas", texto: "Áreas de atuação →", lado: "direita" },
    ],
    areas: [
      { id: "cadeia", texto: "← Cadeia de custódia", lado: "esquerda" },
      { id: "laudo", texto: "Laudo pericial →", lado: "direita" },
    ],
    laudo: [{ id: "contato", texto: "Contato →", lado: "direita" }],
    discos: [
      { id: "areas", texto: "← Áreas de atuação", lado: "esquerda" },
      { id: "memoria", texto: "Memória →", lado: "direita" },
    ],
    memoria: [
      { id: "discos", texto: "← Discos e armazenamento", lado: "esquerda" },
      { id: "rede", texto: "Rede →", lado: "direita" },
    ],
    rede: [
      { id: "memoria", texto: "← Memória", lado: "esquerda" },
      { id: "dispositivos-moveis", texto: "Dispositivos móveis →", lado: "direita" },
    ],
    "dispositivos-moveis": [
      { id: "rede", texto: "← Rede", lado: "esquerda" },
      { id: "malware", texto: "Malware →", lado: "direita" },
    ],
    malware: [
      { id: "dispositivos-moveis", texto: "← Dispositivos móveis", lado: "esquerda" },
      { id: "nuvem", texto: "Nuvem →", lado: "direita" },
    ],
    nuvem: [
      { id: "malware", texto: "← Malware", lado: "esquerda" },
      { id: "mensageria", texto: "Mensageria →", lado: "direita" },
    ],
    mensageria: [
      { id: "nuvem", texto: "← Nuvem", lado: "esquerda" },
      { id: "laudo", texto: "Laudo pericial →", lado: "direita" },
    ],
  };
  const botoes = destinos[idEntidade] ?? [];

  botoes.forEach(({ id, texto, lado }) => {
    const botao = document.createElement("button");
    botao.className = `botao-navegacao lado-${lado}`;
    botao.type = "button";
    botao.textContent = texto;
    botao.addEventListener("click", () => {
      const destino = entidades.find((item) => item.dataset.entidade === id);
      if (destino) abrirPainel(destino);
    });
    rodapePainel.append(botao);
  });

  rodapePainel.hidden = botoes.length === 0;
}

function abrirPainel(entidade, animar = true) {
  const conteudo = conteudos[entidade.dataset.entidade];
  if (!conteudo) return;

  entidades.forEach((item) => {
    item.classList.remove("selecionada", "entidade-principal");
    item.setAttribute("aria-expanded", "false");
  });

  grafo.entidadeSelecionada = entidade;
  entidade.classList.add("selecionada");
  entidade.setAttribute("aria-expanded", "true");
  tituloPainel.textContent = conteudo.titulo;
  conteudoPainel.replaceChildren();
  conteudoPainel.classList.remove("grade-secoes", "grade-laudo");
  corpoPainel = document.createElement("div");
  corpoPainel.className = "corpo-conteudo-painel";
  corpoPainel.classList.toggle(
    "grade-secoes",
    Boolean(conteudo.secoes || conteudo.objetivo),
  );
  corpoPainel.classList.toggle("grade-laudo", entidade.dataset.entidade === "laudo");
  atualizarRodapePainel(entidade.dataset.entidade);

  if (conteudo.campos) {
    const perfil = document.createElement("div");
    perfil.className = "perfil-investigado";

    const imagem = document.createElement("img");
    imagem.className = "foto-investigado";
    imagem.src = conteudo.imagem;
    imagem.alt = "Foto da pessoa de interesse";

    const grade = document.createElement("dl");
    grade.className = "grade-dados";
    conteudo.campos.forEach(({ chave, valor }) => {
      const rotulo = document.createElement("dt");
      rotulo.textContent = chave;
      const dado = document.createElement("dd");
      dado.textContent = valor;
      grade.append(rotulo, dado);
    });

    perfil.append(imagem, grade);

    const observacoes = document.createElement("fieldset");
    observacoes.className = "observacoes-investigado";
    const rotuloObservacoes = document.createElement("legend");
    rotuloObservacoes.textContent = "Histórico";
    const textoObservacoes = document.createElement("p");
    textoObservacoes.textContent = conteudo.observacoes;
    observacoes.append(rotuloObservacoes, textoObservacoes);
    const aviso = document.createElement("fieldset");
    aviso.className = "aviso-procurado";
    const tituloAviso = document.createElement("legend");
    tituloAviso.textContent = "Procurado por";
    const textoAviso = document.createElement("p");
    textoAviso.textContent = conteudo.procuradoPor;
    aviso.append(tituloAviso, textoAviso);
    corpoPainel.append(perfil, observacoes, aviso);
  } else if (conteudo.itens) {
    const descricao = document.createElement("p");
    descricao.className = "descricao-entidade";
    descricao.textContent = conteudo.descricao;

    const lista = document.createElement("div");
    lista.className = "lista-areas";
    conteudo.itens.forEach(({ id, titulo }) => {
      const botao = document.createElement("button");
      botao.className = "botao-area";
      botao.type = "button";
      botao.textContent = titulo;
      botao.addEventListener("click", () => {
        const area = entidades.find((item) => item.dataset.entidade === id);
        if (area) abrirPainel(area);
      });
      lista.append(botao);
    });

    corpoPainel.append(descricao, lista);
  } else if (entidade.dataset.entidade === "contato") {
    const descricao = document.createElement("p");
    descricao.textContent = conteudo.descricao;

    const formulario = document.createElement("form");
    formulario.className = "formulario-contato";

    const campos = [
      { nome: "nome", rotulo: "Nome", tipo: "text", autocomplete: "name" },
      { nome: "email", rotulo: "E-mail", tipo: "email", autocomplete: "email" },
    ];

    campos.forEach(({ nome, rotulo, tipo, autocomplete }) => {
      const grupo = document.createElement("div");
      grupo.className = "campo-contato";

      const etiqueta = document.createElement("label");
      etiqueta.htmlFor = `contato-${nome}`;
      etiqueta.textContent = rotulo;

      const entrada = document.createElement("input");
      entrada.id = `contato-${nome}`;
      entrada.name = nome;
      entrada.type = tipo;
      entrada.autocomplete = autocomplete;
      entrada.required = true;

      grupo.append(etiqueta, entrada);
      formulario.append(grupo);
    });

    const grupoMensagem = document.createElement("div");
    grupoMensagem.className = "campo-contato";
    const etiquetaMensagem = document.createElement("label");
    etiquetaMensagem.htmlFor = "contato-mensagem";
    etiquetaMensagem.textContent = "Mensagem";
    const entradaMensagem = document.createElement("textarea");
    entradaMensagem.id = "contato-mensagem";
    entradaMensagem.name = "mensagem";
    entradaMensagem.rows = 6;
    entradaMensagem.required = true;
    grupoMensagem.append(etiquetaMensagem, entradaMensagem);
    formulario.append(grupoMensagem);

    const enviar = document.createElement("button");
    enviar.className = "botao-enviar-contato";
    enviar.type = "submit";
    enviar.textContent = "Enviar mensagem";
    formulario.append(enviar);

    const estadoEnvio = document.createElement("p");
    estadoEnvio.className = "estado-contato";
    estadoEnvio.setAttribute("role", "status");
    estadoEnvio.setAttribute("aria-live", "polite");
    formulario.append(estadoEnvio);

    formulario.addEventListener("submit", async (evento) => {
      evento.preventDefault();
      const { idServico, idModelo, chavePublica } = configuracaoEmailJS;

      if (
        idServico === "SEU_ID_DO_SERVICO" ||
        idModelo === "SEU_ID_DO_MODELO" ||
        chavePublica === "SUA_CHAVE_PUBLICA"
      ) {
        estadoEnvio.textContent = "Configure os dados do EmailJS em js/aplicacao.js para habilitar o envio.";
        return;
      }

      enviar.disabled = true;
      estadoEnvio.textContent = "Enviando mensagem...";

      try {
        const resposta = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            service_id: idServico,
            template_id: idModelo,
            user_id: chavePublica,
            template_params: {
              from_name: formulario.elements.namedItem("nome").value,
              from_email: formulario.elements.namedItem("email").value,
              message: formulario.elements.namedItem("mensagem").value,
              reply_to: formulario.elements.namedItem("email").value,
            },
          }),
        });

        if (!resposta.ok) {
          throw new Error(`EmailJS respondeu com o status ${resposta.status}.`);
        }

        formulario.reset();
        estadoEnvio.textContent = "Mensagem enviada com sucesso.";
      } catch (erro) {
        console.error("Falha ao enviar mensagem pelo EmailJS.", erro);
        estadoEnvio.textContent = "Não foi possível enviar a mensagem. Tente novamente mais tarde.";
      } finally {
        enviar.disabled = false;
      }
    });

    corpoPainel.append(descricao, formulario);
  } else {
    if (conteudo.descricao) {
      const descricao = document.createElement("p");
      descricao.className = "descricao-entidade";
      descricao.textContent = conteudo.descricao;
      corpoPainel.append(descricao);
    }

    if (conteudo.objetivo) {
      [
        { titulo: "Objetivo", texto: conteudo.objetivo },
        { titulo: "Análise", texto: conteudo.analise },
      ].forEach(({ titulo, texto }) => {
        const secao = document.createElement("fieldset");
        secao.className = "secao-metodologia";
        const tituloSecao = document.createElement("legend");
        tituloSecao.textContent = titulo;
        const textoSecao = document.createElement("p");
        textoSecao.textContent = texto;
        secao.append(tituloSecao, textoSecao);
        corpoPainel.append(secao);
      });
    }

    conteudo.secoes?.forEach(({ titulo, texto }) => {
      const secao = document.createElement("fieldset");
      secao.className = "secao-metodologia";
      const tituloSecao = document.createElement("legend");
      tituloSecao.textContent = titulo;
      const textoSecao = document.createElement("p");
      textoSecao.textContent = texto;
      secao.append(tituloSecao, textoSecao);
      corpoPainel.append(secao);
    });
  }

  corpoPainel.classList.toggle(
    "grade-secoes",
    conteudoPainel.classList.contains("grade-secoes"),
  );
  corpoPainel.classList.toggle(
    "grade-laudo",
    conteudoPainel.classList.contains("grade-laudo"),
  );
  conteudoPainel.append(corpoPainel);

  const jaVisivel = !painelEntidade.hidden;
  painelEntidade.classList.remove("fechando");
  painelEntidade.hidden = false;
  areaTrabalho.classList.add("painel-aberto");
  if (!jaVisivel) {
    if (layoutMobile.matches || !animar) {
      painelEntidade.classList.remove("entrando");
    } else {
      painelEntidade.classList.add("entrando");
      requestAnimationFrame(() => painelEntidade.classList.remove("entrando"));
    }
    if (!animar) organizarGrafo();
  } else {
    centralizarEntidade(entidade);
  }
  ajustarConteudoMobile();
}

function ajustarConteudoMobile() {
  if (!corpoPainel || !layoutMobile.matches) return;

  corpoPainel.style.transform = "";
  corpoPainel.style.width = "";
  const estilo = window.getComputedStyle(conteudoPainel);
  const largura =
    conteudoPainel.clientWidth -
    parseFloat(estilo.paddingLeft) -
    parseFloat(estilo.paddingRight);
  const altura =
    conteudoPainel.clientHeight -
    parseFloat(estilo.paddingTop) -
    parseFloat(estilo.paddingBottom);
  if (
    !largura ||
    !altura ||
    !corpoPainel.scrollWidth ||
    !corpoPainel.scrollHeight
  ) {
    return;
  }
  const escala = Math.min(
    1,
    largura / corpoPainel.scrollWidth,
    altura / corpoPainel.scrollHeight,
  );
  if (escala < 1) {
    corpoPainel.style.width = `${100 / escala}%`;
    corpoPainel.style.transform = `scale(${escala})`;
  }
}

function fecharPainelLateral() {
  if (painelEntidade.hidden) return;

  painelEntidade.classList.add("fechando");
  areaTrabalho.classList.remove("painel-aberto");
  grafo.entidadeSelecionada?.classList.remove("selecionada");
  grafo.entidadeSelecionada?.setAttribute("aria-expanded", "false");
  document.querySelector('[data-entidade="investigado"]')?.classList.add("entidade-principal");
  grafo.entidadeSelecionada?.focus();
  grafo.entidadeSelecionada = null;
}

function registrarEntidade(entidade) {
  entidade.setAttribute("aria-controls", "painel-entidade");
  entidade.setAttribute("aria-expanded", "false");
  entidade.addEventListener("click", (evento) => {
    if (evento.detail === 0) abrirPainel(entidade);
  });
}

entidades.forEach(registrarEntidade);

new MutationObserver((mutacoes) => {
  const adicionouEntidade = mutacoes.some((mutacao) =>
    [...mutacao.addedNodes].some(
      (no) => no instanceof HTMLElement && no.matches(".entidade"),
    ),
  );
  if (!adicionouEntidade) return;

  entidades = [...document.querySelectorAll(".entidade")];
  mutacoes.forEach((mutacao) => {
    mutacao.addedNodes.forEach((no) => {
      if (no instanceof HTMLElement && no.matches(".entidade")) registrarEntidade(no);
    });
  });
  organizarGrafo();
}).observe(planoGrafo, { childList: true });

document.querySelector(".controles-grafo").addEventListener("click", (evento) => {
  const acao = evento.target.closest("[data-acao]")?.dataset.acao;

  if (acao === "aproximar") {
    aproximar(grafo.escala * 1.2, areaGrafo.clientWidth / 2, areaGrafo.clientHeight / 2);
  } else if (acao === "afastar") {
    aproximar(grafo.escala / 1.2, areaGrafo.clientWidth / 2, areaGrafo.clientHeight / 2);
  } else if (acao === "organizar") {
    organizarGrafo();
  }
});

fecharPainel.addEventListener("click", fecharPainelLateral);
areaTrabalho.addEventListener("transitionend", (evento) => {
  if (
    evento.propertyName === "grid-template-columns" &&
    !painelEntidade.hidden
  ) {
    organizarGrafo();
  }
});
painelEntidade.addEventListener("transitionend", (evento) => {
  if (evento.propertyName === "opacity" && painelEntidade.classList.contains("fechando")) {
    painelEntidade.hidden = true;
    painelEntidade.classList.remove("fechando");
  }
});

areaGrafo.addEventListener(
  "wheel",
  (evento) => {
    evento.preventDefault();
    const limites = areaGrafo.getBoundingClientRect();
    aproximar(
      grafo.escala * Math.exp(-evento.deltaY * 0.001),
      evento.clientX - limites.left,
      evento.clientY - limites.top,
    );
  },
  { passive: false },
);

areaGrafo.addEventListener("pointerdown", (evento) => {
  if (evento.pointerType === "mouse" && evento.button !== 0) return;

  const entidade = evento.target.closest(".entidade");
  if (entidade) {
    evento.preventDefault();
    const posicao = grafo.posicoes.get(entidade.dataset.entidade);
    grafo.interacao = {
      tipo: "entidade",
      idPonteiro: evento.pointerId,
      entidade,
      inicioX: evento.clientX,
      inicioY: evento.clientY,
      origemX: posicao.x,
      origemY: posicao.y,
      moveu: false,
    };
  } else if (!evento.target.closest(".controles-grafo")) {
    evento.preventDefault();
    grafo.interacao = {
      tipo: "navegacao",
      idPonteiro: evento.pointerId,
      inicioX: evento.clientX,
      inicioY: evento.clientY,
      origemX: grafo.deslocamentoX,
      origemY: grafo.deslocamentoY,
    };
    areaGrafo.classList.add("navegando");
  } else {
    return;
  }

  areaGrafo.setPointerCapture(evento.pointerId);
});

areaGrafo.addEventListener("pointermove", (evento) => {
  const interacao = grafo.interacao;
  if (!interacao || interacao.idPonteiro !== evento.pointerId) return;

  const deltaX = evento.clientX - interacao.inicioX;
  const deltaY = evento.clientY - interacao.inicioY;

  if (interacao.tipo === "entidade") {
    if (Math.hypot(deltaX, deltaY) > 3) {
      interacao.moveu = true;
      interacao.entidade.classList.add("arrastando");
    }

    grafo.posicoes.set(interacao.entidade.dataset.entidade, {
      x: interacao.origemX + deltaX / grafo.escala,
      y: interacao.origemY + deltaY / grafo.escala,
    });
    posicionarEntidades();
  } else {
    grafo.deslocamentoX = interacao.origemX + deltaX;
    grafo.deslocamentoY = interacao.origemY + deltaY;
    aplicarVisao();
  }
});

function terminarInteracao(evento) {
  const interacao = grafo.interacao;
  if (!interacao || interacao.idPonteiro !== evento.pointerId) return;

  if (interacao.tipo === "entidade") {
    interacao.entidade.classList.remove("arrastando");
    if (!interacao.moveu) abrirPainel(interacao.entidade);
  } else {
    areaGrafo.classList.remove("navegando");
  }

  if (areaGrafo.hasPointerCapture(evento.pointerId)) {
    areaGrafo.releasePointerCapture(evento.pointerId);
  }
  grafo.interacao = null;
}

areaGrafo.addEventListener("pointerup", terminarInteracao);
areaGrafo.addEventListener("pointercancel", terminarInteracao);

document.addEventListener("keydown", (evento) => {
  if (evento.key === "Escape" && !painelEntidade.hidden) fecharPainelLateral();
});

new ResizeObserver(ajustarGrafo).observe(areaGrafo);
window.addEventListener("resize", () => {
  organizarGrafo();
  ajustarConteudoMobile();
});
organizarGrafo();
const entidadeInicial = entidades.find(
  (entidade) => entidade.dataset.entidade === "investigado",
);
if (entidadeInicial && !layoutMobile.matches) {
  areaTrabalho.style.transition = "none";
  abrirPainel(entidadeInicial, false);
  window.setTimeout(() => areaTrabalho.style.removeProperty("transition"), 50);
}
document.fonts?.ready.then(ajustarConteudoMobile);
