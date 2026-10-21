const menu = document.querySelector('.menu-btn');
const nav = document.querySelector('#nav');

if (menu && nav) {
    // abrir menu no celular e tablet
    menu.addEventListener('click', () => {
        const aberto = nav.classList.toggle('open');

        menu.setAttribute('aria-expanded', aberto);
        menu.setAttribute(
            'aria-label',
            aberto ? 'Fechar menu' : 'Abrir menu'
        );
    });

    // navegação pelas seções do site
    document.querySelectorAll('#nav a').forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('open');
            menu.setAttribute('aria-expanded', 'false');
            menu.setAttribute('aria-label', 'Abrir menu');
        });
    });

    // tecla esc para fechar menu
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && nav.classList.contains('open')) {
            nav.classList.remove('open');

            menu.setAttribute('aria-expanded', 'false');
            menu.setAttribute('aria-label', 'Abrir menu');
        }
    });
}

// Formulário Minimizado
const openFormBtn = document.querySelector('#open-form');
const formModal = document.querySelector('#form-modal');
const closeFormBtn = document.querySelector('.close-form');

if (openFormBtn && formModal) {
    let elementoAnterior = null;

    const fecharModal = () => {
        formModal.classList.remove('active');
        document.body.style.overflow = '';

        if (elementoAnterior) {
            elementoAnterior.focus();
        }
    };

    // Abrir formulário
    openFormBtn.addEventListener('click', (e) => {
        e.preventDefault();

        elementoAnterior = document.activeElement;

        formModal.classList.add('active');
        document.body.style.overflow = 'hidden';

        closeFormBtn.focus();
    });

    // Fechar formulário pelo botão X
    closeFormBtn.addEventListener('click', fecharModal);

    // Fechar formulário ao clicar fora dele
    formModal.addEventListener('click', (e) => {
        if (e.target === formModal) {
            fecharModal();
        }
    });

    // Fechar formulário com a tecla Esc
    document.addEventListener('keydown', (e) => {
        if (
            e.key === 'Escape' &&
            formModal.classList.contains('active')
        ) {
            fecharModal();
        }
    });

    // Enviar formulário
    const demoForm = document.querySelector('.demo-form');

    if (demoForm) {
            const name = document.querySelector('#name');
            const email = document.querySelector('#email');
            const cnpj = document.querySelector('#cnpj');
            const phone = document.querySelector('#phone');
        
            // Máscara do CNPJ
            cnpj.addEventListener('input', () => {
                let valor = cnpj.value.replace(/\D/g, '');
            
                valor = valor.substring(0, 14);
            
                valor = valor.replace(/^(\d{2})(\d)/, '$1.$2');
                valor = valor.replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3');
                valor = valor.replace(/\.(\d{3})(\d)/, '.$1/$2');
                valor = valor.replace(/(\d{4})(\d)/, '$1-$2');
            
                cnpj.value = valor;
            });
            
            // Máscara do telefone
            phone.addEventListener('input', () => {
                let valor = phone.value.replace(/\D/g, '');
            
                valor = valor.substring(0, 11);
            
                if (valor.length <= 10) {
                    valor = valor.replace(/^(\d{2})(\d)/, '($1) $2');
                    valor = valor.replace(/(\d{4})(\d)/, '$1-$2');
                } else {
                    valor = valor.replace(/^(\d{2})(\d)/, '($1) $2');
                    valor = valor.replace(/(\d{5})(\d)/, '$1-$2');
                }
            
                phone.value = valor;
            });

        demoForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const fields = [name, email, cnpj, phone];

            fields.forEach((field) => {
                field.classList.remove('input-error');

                const error = field.parentElement.querySelector('.form-error');

                if (error) {
                    error.remove();
                }
            });

            const oldStatus = demoForm.querySelector('.form-status');

            if (oldStatus) {
                oldStatus.remove();
            }

            let formularioValido = true;

            const mostrarErro = (campo, mensagem) => {
                campo.classList.add('input-error');

                const error = document.createElement('span');

                error.className = 'form-error';
                error.textContent = mensagem;

                campo.parentElement.appendChild(error);

                formularioValido = false;
            };

            if (name.value.trim().length < 3) {
                mostrarErro(
                    name,
                    'Digite seu nome completo.'
                );
            }

            if (!email.validity.valid) {
                mostrarErro(
                    email,
                    'Digite um e-mail válido.'
                );
            }

            const cnpjNumeros = cnpj.value.replace(/\D/g, '');

            if (cnpjNumeros.length !== 14) {
                mostrarErro(
                    cnpj,
                    'Digite um CNPJ válido com 14 números.'
                );
            }

            if (!formularioValido) {
                return;
            }

            const status = document.createElement('div');

            status.className = 'form-status';

            status.textContent =
                'Dados validados com sucesso. O envio para o servidor será conectado em uma etapa futura.';

            demoForm.appendChild(status);
            demoForm.reset();
        });
    }
    }

// app demonstrativo

// Simulador LOGOS - Navegação

const appSimulator = document.querySelector('.app-simulator');

if (appSimulator) {

    const appScreen = appSimulator.querySelector('.app-screen');
    const appContent = appSimulator.querySelector('#app-content');
    const appTitle = appSimulator.querySelector('#app-screen-title');

    const appBackBtn = appSimulator.querySelector('.app-back-btn');

    const appPlaceholder = appSimulator.querySelector('#app-placeholder');
    const appPlaceholderTitle = appSimulator.querySelector('#app-placeholder-title');

    const appNavItems = appSimulator.querySelectorAll('.app-nav-item[data-screen]');

    // Configuração das telas do aplicativo
    const appRoutes = {
        inicio: {
            titulo: 'Olá, Assessor',
            aba: 'inicio',
            voltar: false
        },

        clipping: {
            titulo: 'Clipping',
            aba: 'clipping',
            voltar: true
        },

        mailing: {
            titulo: 'Mailing',
            aba: 'mailing',
            voltar: true
        },

        mais: {
            titulo: 'Mais',
            aba: 'mais',
            voltar: true
        },

        clientes: {
            titulo: 'Clientes',
            aba: null,
            voltar: true
        },

        'detalhes-cliente': {
            titulo: 'Cliente',
            aba: null,
            voltar: true
        },

        'novo-cliente': {
            titulo: 'Novo cliente',
            aba: null,
            voltar: true
        },

        'editar-cliente': {
            titulo: 'Editar cliente',
            aba: null,
            voltar: true
        },

        veiculos: {
            titulo: 'Veículos',
            aba: null,
            voltar: true
        },

        relatorios: {
            titulo: 'Relatórios',
            aba: null,
            voltar: true
        },

        funcionarios: {
            titulo: 'Funcionários',
            aba: null,
            voltar: true
        },

        convites: {
            titulo: 'Convites',
            aba: null,
            voltar: true
        },

        configuracoes: {
            titulo: 'Configurações',
            aba: null,
            voltar: true
        },

        'novo-relatorio': {
            titulo: 'Novo relatório',
            aba: null,
            voltar: true
        },

        'novo-clipping': {
            titulo: 'Novo clipping',
            aba: 'clipping',
            voltar: true
        },

        'novo-contato': {
            titulo: 'Novo contato',
            aba: 'mailing',
            voltar: true
        },

        'importar-clippings': {
            titulo: 'Importar',
            aba: 'clipping',
            voltar: true
        }
    };

    let appCurrentScreen = 'inicio';
    const appHistory = [];

    // Atualizar o conteúdo visível
    const appShowScreen = (screenName) => {

        const route = appRoutes[screenName];

        if (!route) {
            return;
        }

        appCurrentScreen = screenName;

        // Atualizar título e botão voltar
        appTitle.textContent = route.titulo;
        appBackBtn.hidden = !route.voltar;

        // Procurar uma tela já implementada
        const views = appContent.querySelectorAll('[data-view]');

        let viewExists = false;

        views.forEach((view) => {
            
        const active =
            view.dataset.view === screenName ||
            (
                screenName === 'editar-cliente' &&
                view.dataset.view === 'novo-cliente'
            );

            view.hidden = !active;

            if (active) {
                viewExists = true;
            }
        });

        // Enquanto não existir uma tela real,
        // mostrar a mensagem temporária
        appPlaceholder.hidden = viewExists;

        if (!viewExists) {
            appPlaceholderTitle.textContent = route.titulo;
        }

        // Atualizar a navegação inferior
        appNavItems.forEach((item) => {

            const active = item.dataset.screen === route.aba;

            item.classList.toggle('app-nav-active', active);

            if (active) {
                item.setAttribute('aria-current', 'page');
            } else {
                item.removeAttribute('aria-current');
            }
        });

        // Ocultar menu inferior nas Configurações
        appScreen.classList.toggle(
            'app-screen-no-nav',
            screenName === 'configuracoes'
        );

        // Voltar ao início da rolagem interna
        appContent.scrollTop = 0;
    };

    // Abrir uma tela
    const appNavigate = (screenName, mainTab = false) => {

        if (!appRoutes[screenName]) {
            return;
        }

        if (mainTab) {
            // Ao trocar de aba principal, reiniciar o histórico
            appHistory.length = 0;
        } else if (screenName !== appCurrentScreen) {
            appHistory.push(appCurrentScreen);
        }

        appShowScreen(screenName);
    };

    // Voltar para a tela anterior
    const appGoBack = () => {

        const previousScreen = appHistory.pop() || 'inicio';

        appShowScreen(previousScreen);
    };

    // Detectar cliques nos botões do aplicativo
    appSimulator.addEventListener('click', (event) => {

        const button = event.target.closest('button[data-screen]');

        if (!button || button.disabled) {
            return;
        }

        const destination = button.dataset.screen;
        const isMainTab = button.classList.contains('app-nav-item');

        appNavigate(destination, isMainTab);
    });

    // Botão voltar
    appBackBtn.addEventListener('click', appGoBack);

    // Iniciar o simulador na tela inicial
    appShowScreen('inicio');
}

// Simulador LOGOS - Navegação


// Simulador LOGOS - Informações fixas dos Clientes

const appClientExtraData = {

    'cliente-cleiton': {
        responsavel: 'Cleiton',
        cnpj: '',
        descricao: 'Cliente fictício do segmento de varejo, utilizado para demonstrar os recursos da LOGOS.',
        email: 'cleiton@example.com',
        telefone: '',
        site: '',
        cidade: 'São Paulo',
        uf: 'SP',
        logo: 'Ícone demonstrativo'
    },

    'cliente-maria': {
        responsavel: 'Maria',
        cnpj: '',
        descricao: 'Cliente fictício da área da saúde, utilizado na demonstração do gerenciamento de clientes.',
        email: 'maria@example.com',
        telefone: '',
        site: '',
        cidade: 'Campinas',
        uf: 'SP',
        logo: 'Ícone demonstrativo'
    },

    'cliente-joao': {
        responsavel: 'João',
        cnpj: '',
        descricao: 'Cliente fictício do setor de tecnologia, utilizado na demonstração das ferramentas da LOGOS.',
        email: 'joao@example.com',
        telefone: '',
        site: '',
        cidade: 'Curitiba',
        uf: 'PR',
        logo: 'Ícone demonstrativo'
    }

};

// Sincronizar cidade e UF com os filtros da listagem
document.querySelectorAll('.app-clients-list [data-client-id]')
    .forEach(card => {

        const dados = appClientExtraData[card.dataset.clientId];

        if (!dados) {
            return;
        }

        card.dataset.clientCity = dados.cidade;
        card.dataset.clientState = dados.uf;

    });

// Simulador LOGOS - Informações fixas dos Clientes

// Simulador LOGOS - Pesquisa e Filtros de Clientes

const appClientsView = document.querySelector('.app-clients');

if (appClientsView) {

    const appClientsQuery = appClientsView.querySelector('#app-clients-query');
    const appClientsSearchBtn = appClientsView.querySelector('.app-clients-search-btn');
    const appClientsCount = appClientsView.querySelector('#app-clients-count');
    const appClientsEmpty = appClientsView.querySelector('#app-clients-empty');

    const filterOpenBtn = appClientsView.querySelector('.app-clients-filter-btn');

    const filterOverlay = document.querySelector('#app-clients-filter-overlay');
    const filterPanel = filterOverlay.querySelector('.app-clients-filter-panel');
    const filterCloseBtn = filterOverlay.querySelector('.app-clients-filter-close');
    const filterClearBtn = filterOverlay.querySelector('.app-clients-clear-btn');
    const filterApplyBtn = filterOverlay.querySelector('.app-clients-apply-btn');

    const filterStatusBtns = filterOverlay.querySelectorAll('[data-filter-status]');

    const filterState = filterOverlay.querySelector('#app-filter-state');
    const filterCity = filterOverlay.querySelector('#app-filter-city');
    const filterSegment = filterOverlay.querySelector('#app-filter-segment');

    // Filtros efetivamente aplicados à listagem
    const activeFilters = {
        status: 'todos',
        state: '',
        city: '',
        segment: ''
    };

    // Status escolhido no painel antes de aplicar
    let draftStatus = 'todos';

    // Normalização de texto
    const normalizarTexto = (texto) => {
        return String(texto || '')
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .toLowerCase()
            .trim();
    };

    // Destacar o status selecionado
    const selecionarStatus = (status) => {

        draftStatus = status;

        filterStatusBtns.forEach((button) => {
            const selected = button.dataset.filterStatus === status;

            button.classList.toggle('app-filter-selected', selected);
            button.setAttribute('aria-pressed', String(selected));
        });
    };

    // Aplicar pesquisa e filtros simultaneamente
    const pesquisarClientes = () => {

        const pesquisa = normalizarTexto(appClientsQuery.value);

        const cards = appClientsView.querySelectorAll('.app-client-card1, .app-client-card2, .app-client-card3');

        let encontrados = 0;

        cards.forEach((card) => {

            const nome = normalizarTexto(
                card.querySelector('.app-client-name1')?.textContent
                || card.querySelector('.app-client-name2')?.textContent
                || card.querySelector('.app-client-name3')?.textContent
                || ''
            );

            const status = normalizarTexto(card.dataset.clientStatus);
            const estado = normalizarTexto(card.dataset.clientState);
            const cidade = normalizarTexto(card.dataset.clientCity);
            const segmento = normalizarTexto(card.dataset.clientSegment);

            const correspondePesquisa = nome.includes(pesquisa);

            const correspondeStatus =
                activeFilters.status === 'todos' ||
                status === activeFilters.status;

            const correspondeEstado = estado.includes(
                normalizarTexto(activeFilters.state)
            );

            const correspondeCidade = cidade.includes(
                normalizarTexto(activeFilters.city)
            );

            const correspondeSegmento = segmento.includes(
                normalizarTexto(activeFilters.segment)
            );

            const encontrado =
                correspondePesquisa &&
                correspondeStatus &&
                correspondeEstado &&
                correspondeCidade &&
                correspondeSegmento;

            card.hidden = !encontrado;

            if (encontrado) {
                encontrados++;
            }
        });

        appClientsCount.textContent =
            `${encontrados} ${encontrados === 1 ? 'cliente' : 'clientes'}`;

        appClientsEmpty.hidden = encontrados > 0;
    };

    // Abrir o painel com os filtros atuais
    const abrirFiltros = () => {

        selecionarStatus(activeFilters.status);

        filterState.value = activeFilters.state;
        filterCity.value = activeFilters.city;
        filterSegment.value = activeFilters.segment;

        filterOverlay.hidden = false;

        filterOpenBtn.setAttribute('aria-expanded', 'true');
        filterCloseBtn.focus();
    };

    // Fechar o painel
    const fecharFiltros = () => {

        filterOverlay.hidden = true;

        filterOpenBtn.setAttribute('aria-expanded', 'false');
        filterOpenBtn.focus();
    };

    // Atualizar status no painel
    filterStatusBtns.forEach((button) => {
        button.addEventListener('click', () => {
            selecionarStatus(button.dataset.filterStatus);
        });
    });

    // Limpar os campos do painel
    filterClearBtn.addEventListener('click', () => {

        selecionarStatus('todos');

        filterState.value = '';
        filterCity.value = '';
        filterSegment.value = '';
    });

    // Aplicar os filtros escolhidos
    filterApplyBtn.addEventListener('click', () => {

        activeFilters.status = draftStatus;
        activeFilters.state = filterState.value.trim();
        activeFilters.city = filterCity.value.trim();
        activeFilters.segment = filterSegment.value.trim();

        pesquisarClientes();
        fecharFiltros();
    });

    // Pesquisa em tempo real
    appClientsQuery.addEventListener('input', pesquisarClientes);

    // Botão de pesquisa
    appClientsSearchBtn.addEventListener('click', pesquisarClientes);

    // Abrir e fechar filtros
    filterOpenBtn.addEventListener('click', abrirFiltros);
    filterCloseBtn.addEventListener('click', fecharFiltros);

    // Fechar ao clicar fora do painel
    filterOverlay.addEventListener('click', (event) => {
        if (event.target === filterOverlay) {
            fecharFiltros();
        }
    });

    // Acessibilidade: Escape e navegação pelo teclado
    document.addEventListener('keydown', (event) => {

        if (filterOverlay.hidden) {
            return;
        }

        if (event.key === 'Escape') {
            event.preventDefault();
            fecharFiltros();
            return;
        }

        if (event.key === 'Tab') {

            const elements = Array.from(
                filterPanel.querySelectorAll('button, input')
            ).filter((element) => !element.disabled);

            const first = elements[0];
            const last = elements[elements.length - 1];

            if (event.shiftKey && document.activeElement === first) {
                event.preventDefault();
                last.focus();
            } else if (!event.shiftKey && document.activeElement === last) {
                event.preventDefault();
                first.focus();
            }
        }
    });

    // Inicializar clientes
    selecionarStatus('todos');
    pesquisarClientes();
}

// Simulador LOGOS - Pesquisa e Filtros de Clientes


// Simulador LOGOS - Seleção múltipla de Clientes

const clientsSelectionView = document.querySelector('.app-clients');

if (clientsSelectionView) {

    const selectButton = clientsSelectionView.querySelector(
        '.app-clients-select-btn'
    );

    const selectionBar = clientsSelectionView.querySelector(
        '.app-clients-selection-bar'
    );

    const selectedCount = clientsSelectionView.querySelector(
        '#app-clients-selected-count'
    );

    const selectAllButton = clientsSelectionView.querySelector(
        '.app-clients-select-all'
    );

    const cancelButton = clientsSelectionView.querySelector(
        '.app-clients-cancel-selection'
    );

    const selectedClients = new Set();
    const selectionLimit = 100;

    let selectionMode = false;

    const getCards = () => Array.from(
        clientsSelectionView.querySelectorAll('.app-client-card1, .app-client-card2, .app-client-card3')
    );

    const getVisibleCards = () => getCards().filter(
        card => !card.hidden
    );

    // Atualizar a interface da seleção
    const renderSelection = () => {

        selectButton.hidden = selectionMode;
        selectionBar.hidden = !selectionMode;

        clientsSelectionView.classList.toggle(
            'app-clients-selection-active',
            selectionMode
        );

        selectButton.setAttribute(
            'aria-pressed',
            String(selectionMode)
        );

        selectedCount.textContent = selectedClients.size;

        selectAllButton.disabled = getVisibleCards().length === 0;

        getCards().forEach(card => {

            const isSelected = selectedClients.has(
                card.dataset.clientId
            );

            card.classList.toggle(
                'app-client-selected',
                selectionMode && isSelected
            );

            if (selectionMode) {
                card.setAttribute(
                    'aria-pressed',
                    String(isSelected)
                );
            } else {
                card.removeAttribute('aria-pressed');
            }
        });
    };

    // Ativar seleção
    selectButton.addEventListener('click', () => {

        selectionMode = true;
        selectedClients.clear();

        renderSelection();
    });

    // Selecionar ou desmarcar um cliente
    clientsSelectionView.addEventListener('click', event => {

        const card1 = event.target.closest('.app-client-card1');
        const card2 = event.target.closest('.app-client-card2');
        const card3 = event.target.closest('.app-client-card3');

        const card = card1 || card2 || card3;

        if (!selectionMode || !card) {
            return;
        }

        // Não navegar para os detalhes
        event.preventDefault();
        event.stopPropagation();

        const id = card.dataset.clientId;

        if (!id) {
            return;
        }

        if (selectedClients.has(id)) {
            selectedClients.delete(id);
        } else if (selectedClients.size < selectionLimit) {
            selectedClients.add(id);
        }

        renderSelection();
    });

    // Selecionar ou desmarcar todos os clientes visíveis
    selectAllButton.addEventListener('click', () => {

        const visible = getVisibleCards();

        const allSelected = visible.every(
            card => selectedClients.has(card.dataset.clientId)
        );

        visible.forEach(card => {

            const id = card.dataset.clientId;

            if (!id) {
                return;
            }

            if (allSelected) {
                selectedClients.delete(id);
            } else if (selectedClients.size < selectionLimit) {
                selectedClients.add(id);
            }
        });

        renderSelection();
    });

    // Cancelar seleção
    cancelButton.addEventListener('click', () => {

        selectionMode = false;
        selectedClients.clear();

        renderSelection();
    });

    // Sincronizar seleção com pesquisa e filtros
    const syncVisibleSelection = () => {

        getCards().forEach(card => {
            if (card.hidden) {
                selectedClients.delete(card.dataset.clientId);
            }
        });

        renderSelection();
    };

    clientsSelectionView.querySelector('#app-clients-query')
        .addEventListener('input', syncVisibleSelection);

    clientsSelectionView.querySelector('.app-clients-search-btn')
        .addEventListener('click', syncVisibleSelection);

    document.querySelector('.app-clients-apply-btn')
        ?.addEventListener('click', syncVisibleSelection);

    renderSelection();
}

// Simulador LOGOS - Seleção múltipla de Clientes


// Simulador LOGOS - Detalhes do Cliente

const appClientListView = document.querySelector('.app-clients');
const appClientDetailsView = document.querySelector('.app-client-details');

if (appClientListView && appClientDetailsView) {

    const selectionBar = appClientListView.querySelector(
        '.app-clients-selection-bar'
    );

    // Preencher os dados da tela de detalhes
    const preencherDetalhesCliente = (card) => {

        const nome = card.querySelector('strong')?.textContent.trim()
            || 'Cliente';

        const segmento = card.dataset.clientSegment
            || 'Não informado';

        const status = card.dataset.clientStatus
            || 'Não informado';

        const total = card.dataset.clientClippings
            || '0';

        const ano = card.dataset.clientYear
            || 'Não informado';


        // Dados fixos que já estão disponíveis na demonstração

        // Informações adicionais do cliente selecionado
        const extras = appClientExtraData[card.dataset.clientId] || {};

        const localizacao = [extras.cidade, extras.uf]
            .filter(Boolean)
            .join(' - ');

        // Informações exibidas na tela de detalhes
        const dados = {
            'nome': nome,
            'segmento-resumo': segmento,
            'status': status.toUpperCase(),
        
            'responsavel': extras.responsavel || 'Não informado',
            'segmento': segmento,
            'descricao': extras.descricao || 'Não informada',
            'cnpj': extras.cnpj || 'Não informado',
            'email': extras.email || 'Não informado',
            'telefone': extras.telefone || 'Não informado',
            'site': extras.site || 'Não informado',
            'localizacao': localizacao || 'Não informada',
            'logo': extras.logo || 'Não informado',
        
            'total-clippings': total,
            'ano-resumo': `${ano} · ${total}`
        };


        // Preencher os campos já existentes no HTML
        Object.entries(dados).forEach(([campo, valor]) => {

            const elemento = appClientDetailsView.querySelector(
                `[data-client-detail="${campo}"]`
            );

            if (elemento) {
                elemento.textContent = valor;
            }
        });

        // Guardar o identificador para o formulário de edição futuro
        appClientDetailsView.dataset.clientId = card.dataset.clientId;
    };

    // Identificar qual cliente foi clicado
    appClientListView.addEventListener('click', (event) => {

        const card = event.target.closest(
            '.app-clients-list [data-client-id]'
        );

        if (!card) {
            return;
        }

        // No modo de seleção, não abrir detalhes
        if (selectionBar && !selectionBar.hidden) {
            return;
        }

        preencherDetalhesCliente(card);
    });
}

// Simulador LOGOS - Detalhes do Cliente


// Simulador LOGOS - Formulário Novo e Editar Cliente

const appClientFormView = document.querySelector(
    '.app-client-form-screen'
);

const appClientForm = document.querySelector(
    '#app-client-create-form'
);

const appClientNewButton = document.querySelector(
    '.app-clients-new-btn'
);

const appClientEditButton = document.querySelector(
    '.app-client-edit-btn'
);

if (appClientFormView && appClientForm) {

    const formTitle = appClientFormView.querySelector(
        '.app-client-form-heading h4'
    );

    const formDescription = appClientFormView.querySelector(
        '.app-client-form-heading p'
    );

    const formSubmit = appClientFormView.querySelector(
        '.app-client-form-submit'
    );

    const formNotice = appClientFormView.querySelector(
        '.app-client-form-footer p'
    );

    // Configurar aparência do formulário
    const configurarFormulario = (modo) => {

        const editando = modo === 'editar';

        formTitle.textContent = editando
            ? 'EDITAR CLIENTE'
            : 'NOVO CLIENTE';

        formDescription.textContent = editando
            ? 'Visualize e altere os dados demonstrativos.'
            : 'Preencha as informações do cliente.';

        formSubmit.textContent = editando
            ? 'SALVAR'
            : 'CADASTRAR';

        // Nenhuma operação será permitida
        formSubmit.disabled = true;

        formNotice.textContent = editando
            ? 'Demonstração visual: alterações não serão salvas.'
            : 'Demonstração visual: o cadastro está desabilitado.';
    };

    // Abrir formulário de novo cliente
    const prepararNovoCliente = () => {

        // Limpar os dados preenchidos anteriormente
        appClientForm.reset();

        configurarFormulario('novo');
    };

    // Abrir formulário de edição
    const prepararEdicaoCliente = () => {

        appClientForm.reset();

        const detailsView = document.querySelector(
            '.app-client-details'
        );

        const clientId = detailsView?.dataset.clientId;

        if (!clientId) {
            return;
        }

        // Localizar o cliente fixo selecionado
        const card = Array.from(
            document.querySelectorAll(
                '.app-clients-list [data-client-id]'
            )
        ).find(
            item => item.dataset.clientId === clientId
        );

        if (!card) {
            return;
        }


        // Recuperar somente os dados conhecidos

        // Recuperar as informações fixas do cliente
        const extras = appClientExtraData[clientId] || {};

        const dados = {
            nome: card.querySelector('strong')?.textContent.trim() || '',
            segmento: card.dataset.clientSegment || '',
        
            responsavel: extras.responsavel || '',
            cnpj: extras.cnpj || '',
            descricao: extras.descricao || '',
            email: extras.email || '',
            telefone: extras.telefone || '',
            site: extras.site || '',
            cidade: extras.cidade || '',
            uf: extras.uf || ''
        };


        // Preencher campos correspondentes
        Object.entries(dados).forEach(([campo, valor]) => {

            const input = appClientForm.elements.namedItem(campo);

            if (input) {
                input.value = valor;
            }
        });

        // Status fixo do cliente
        const campoAtivo = appClientForm.elements.namedItem('ativo');

        if (campoAtivo) {
            campoAtivo.checked =
                card.dataset.clientStatus === 'ativo';
        }

        configurarFormulario('editar');
    };

    // Eventos dos botões
    appClientNewButton?.addEventListener(
        'click',
        prepararNovoCliente
    );

    appClientEditButton?.addEventListener(
        'click',
        prepararEdicaoCliente
    );

    // Segurança: impedir qualquer envio do formulário
    appClientForm.addEventListener('submit', event => {
        event.preventDefault();
    });

    // Inicialização
    configurarFormulario('novo');
}

// Simulador LOGOS - Formulário Novo e Editar Cliente


// Simulador LOGOS - Clippings Vinculados aos Clientes

const appClientClippingsSection = document.querySelector(
    '.app-client-detail-clippings'
);

if (
    appClientClippingsSection &&
    appClientListView &&
    appClientDetailsView
) {

    // Elementos da seção
    const clippingList = appClientClippingsSection.querySelector(
        '#app-client-clippings-list'
    );

    const emptyMessage = appClientClippingsSection.querySelector(
        '#app-client-clippings-empty'
    );

    const yearButton = appClientClippingsSection.querySelector(
        '.app-client-detail-year-btn'
    );

    const yearTotal = appClientClippingsSection.querySelector(
        '.app-client-detail-year-total'
    );

    const yearCount = appClientClippingsSection.querySelector(
        '#app-client-year-clippings-count'
    );

    // Controles de seleção
    const selectButton = appClientClippingsSection.querySelector(
        '.app-client-clippings-select-btn'
    );

    const selectionBar = appClientClippingsSection.querySelector(
        '.app-client-clippings-selection-bar'
    );

    const selectedCount = appClientClippingsSection.querySelector(
        '#app-clippings-selected-count'
    );

    const totalCount = appClientClippingsSection.querySelector(
        '#app-clippings-total-count'
    );

    const selectAllButton = appClientClippingsSection.querySelector(
        '.app-client-clippings-select-all'
    );

    const cancelButton = appClientClippingsSection.querySelector(
        '.app-client-clippings-cancel-selection'
    );

    // Estado da seleção
    const selectedClippings = new Set();

    let selectionMode = false;

    const selectionLimit = 100;

    // Cartões individuais de clipping
    const getAllClippings = () => Array.from(
        clippingList.querySelectorAll('[data-clipping-id]')
    );

    // Somente os clippings do cliente selecionado
    const getClientClippings = () => {

        const clientId = appClientDetailsView.dataset.clientId;

        return getAllClippings().filter(card =>
            card.dataset.clientId === clientId
        );
    };

    // Atualizar interface da seleção múltipla
    const renderSelection = () => {

        const cards = getClientClippings();

        selectButton.hidden = selectionMode;
        selectionBar.hidden = !selectionMode;

        selectButton.disabled = cards.length === 0;
        selectAllButton.disabled = cards.length === 0;

        selectedCount.textContent = selectedClippings.size;
        totalCount.textContent = cards.length;

        appClientClippingsSection.classList.toggle(
            'app-client-clippings-selection-active',
            selectionMode
        );

        selectButton.setAttribute(
            'aria-pressed',
            String(selectionMode)
        );

        cards.forEach(card => {

            const selected = selectedClippings.has(
                card.dataset.clippingId
            );

            card.classList.toggle(
                'app-client-clipping-selected',
                selectionMode && selected
            );

            if (selectionMode) {
                card.setAttribute(
                    'aria-pressed',
                    String(selected)
                );
            } else {
                card.removeAttribute('aria-pressed');
            }

        });
    };

    // Atualizar clippings quando outro cliente for aberto
    const atualizarClippingsCliente = () => {

        const clientId = appClientDetailsView.dataset.clientId;

        const clientCard = Array.from(
            appClientListView.querySelectorAll(
                '.app-clients-list [data-client-id]'
            )
        ).find(card =>
            card.dataset.clientId === clientId
        );

        if (!clientCard) {
            return;
        }

        // Preservar a quantidade anual já cadastrada
        const ano = clientCard.dataset.clientYear || '';
        const quantidade = clientCard.dataset.clientClippings || '0';

        yearButton.textContent = ano
            ? `ABRIR ANO ${ano}`
            : 'ABRIR ANO';

        yearCount.textContent = quantidade;

        yearTotal.hidden = !ano || Number(quantidade) === 0;

        // Mostrar apenas os cartões vinculados ao cliente
        getAllClippings().forEach(card => {

            card.hidden = card.dataset.clientId !== clientId;

        });

        const cards = getClientClippings();

        // Mensagem aparece somente sem cartões individuais
        emptyMessage.hidden = cards.length > 0;

        // Reiniciar a seleção ao trocar de cliente
        selectionMode = false;
        selectedClippings.clear();

        renderSelection();
    };

    // Sincronizar quando um cliente for aberto
    appClientListView.addEventListener('click', event => {

        const card = event.target.closest(
            '.app-clients-list [data-client-id]'
        );

        if (!card) {
            return;
        }

        const clientSelectionBar = appClientListView.querySelector(
            '.app-clients-selection-bar'
        );

        if (clientSelectionBar && !clientSelectionBar.hidden) {
            return;
        }

        atualizarClippingsCliente();

    });

    // Ativar seleção múltipla
    selectButton.addEventListener('click', () => {

        if (getClientClippings().length === 0) {
            return;
        }

        selectionMode = true;
        selectedClippings.clear();

        renderSelection();
    });

    // Selecionar ou desmarcar um clipping
    clippingList.addEventListener('click', event => {

        const card = event.target.closest('[data-clipping-id]');

        if (!selectionMode || !card) {
            return;
        }

        event.preventDefault();
        event.stopPropagation();

        const id = card.dataset.clippingId;

        if (!id) {
            return;
        }

        if (selectedClippings.has(id)) {
            selectedClippings.delete(id);
        } else if (selectedClippings.size < selectionLimit) {
            selectedClippings.add(id);
        }

        renderSelection();
    });

    // Selecionar todos os clippings visíveis
    selectAllButton.addEventListener('click', () => {

        const cards = getClientClippings().filter(
            card => !card.hidden
        );

        const allSelected = cards.every(card =>
            selectedClippings.has(card.dataset.clippingId)
        );

        cards.forEach(card => {

            const id = card.dataset.clippingId;

            if (allSelected) {
                selectedClippings.delete(id);
            } else if (selectedClippings.size < selectionLimit) {
                selectedClippings.add(id);
            }

        });

        renderSelection();
    });

    // Cancelar seleção
    cancelButton.addEventListener('click', () => {

        selectionMode = false;
        selectedClippings.clear();

        renderSelection();
    });

    // Estado inicial
    renderSelection();
}

// Simulador LOGOS - Clippings Vinculados aos Clientes
