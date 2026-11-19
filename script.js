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

        templates: {
            titulo: 'Templates', aba: null, voltar: true
        },
        'preview-template': {
            titulo: 'Prévia do template', aba: null, voltar: true
        },
        'novo-template': {
            titulo: 'Novo template', aba: null, voltar: true
        },
        'editar-copia-template': {
            titulo: 'Edição de cópia', aba: null, voltar: true
        },

        'detalhes-veiculo': {
            titulo: 'Veículo', aba: null, voltar: true
        },
        'novo-veiculo': {
            titulo: 'Novo veículo', aba: null, voltar: true
        },
        'editar-veiculo': {
            titulo: 'Editar veículo', aba: null, voltar: true
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
                (screenName === 'editar-cliente' && view.dataset.view === 'novo-cliente') ||
                (screenName === 'editar-veiculo' && view.dataset.view === 'novo-veiculo') ||
                (screenName === 'editar-copia-template' && view.dataset.view === 'novo-template')
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

    // Somente os clippings visíveis do cliente selecionado
    const getClientClippings = () => {

        const clientId = appClientDetailsView.dataset.clientId;

        return getAllClippings().filter(card => {

            const pertenceAoCliente =
                card.dataset.clientId === clientId;

            const estaVisivel = !card.hidden;

            return pertenceAoCliente && estaVisivel;
        });
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

/* Simulador LOGOS — interações demonstrativas de Veículos */
(() => {
 const sim=document.querySelector('.app-simulator'), list=document.querySelector('.app-vehicles'), details=document.querySelector('.app-vehicle-details'), formView=document.querySelector('.app-vehicle-form'), form=document.querySelector('#app-vehicle-form');
 if(!sim||!list||!details||!formView||!form)return;
 let selection=false,status='todos',sort='alpha',min='',max='';const selected=new Set();
 const cards=()=>Array.from(list.querySelectorAll('.app-vehicle-card'));
 const apply=()=>{const q=list.querySelector('#app-vehicles-query').value.trim().toLocaleLowerCase('pt-BR');let matches=cards().filter(c=>c.dataset.vehicleName.toLocaleLowerCase('pt-BR').includes(q)&&(status==='todos'||c.dataset.vehicleStatus===status)&&(!min||+c.dataset.vehicleContacts>=+min)&&(!max||+c.dataset.vehicleContacts<=+max));cards().forEach(c=>c.hidden=!matches.includes(c));matches.sort((a,b)=>sort==='desc'?+b.dataset.vehicleContacts-+a.dataset.vehicleContacts:sort==='asc'?+a.dataset.vehicleContacts-+b.dataset.vehicleContacts:a.dataset.vehicleName.localeCompare(b.dataset.vehicleName,'pt-BR'));matches.forEach(c=>list.querySelector('.app-vehicles-list').appendChild(c));list.querySelector('#app-vehicles-count').textContent=matches.length===1?'1 veículo':matches.length+' veículos';list.querySelector('.app-vehicles-empty').hidden=matches.length>0;list.querySelector('#app-vehicles-selected-count').textContent=selected.size;list.classList.toggle('app-vehicles-selection-active',selection);list.querySelector('.app-vehicles-select-trigger').hidden=selection;list.querySelector('.app-vehicles-selection-bar').hidden=!selection;cards().forEach(c=>c.setAttribute('aria-pressed',String(selection&&selected.has(c.dataset.vehicleId))))};
 const mark=(selector,attr,value)=>list.querySelectorAll(selector).forEach(b=>b.classList.toggle('selected',b.getAttribute(attr)===value));
 list.querySelector('.app-vehicles-filter-open').onclick=()=>list.querySelector('.app-vehicles-filter-backdrop').hidden=false;
 list.querySelector('.app-vehicles-filter-close').onclick=()=>list.querySelector('.app-vehicles-filter-backdrop').hidden=true;
 list.querySelector('.app-vehicles-filter-backdrop').onclick=e=>{if(e.target===e.currentTarget)e.currentTarget.hidden=true};
 list.querySelectorAll('[data-vehicle-status-filter]').forEach(b=>b.onclick=()=>{status=b.dataset.vehicleStatusFilter;mark('[data-vehicle-status-filter]','data-vehicle-status-filter',status)});
 list.querySelectorAll('[data-vehicle-sort]').forEach(b=>b.onclick=()=>{sort=b.dataset.vehicleSort;mark('[data-vehicle-sort]','data-vehicle-sort',sort)});
 list.querySelector('#app-vehicles-query').oninput=apply;list.querySelector('.app-vehicles-search-submit').onclick=apply;
 list.querySelector('.app-vehicles-filter-apply').onclick=()=>{min=list.querySelector('#app-vehicles-min-contacts').value;max=list.querySelector('#app-vehicles-max-contacts').value;list.querySelector('.app-vehicles-filter-backdrop').hidden=true;apply()};
 list.querySelector('.app-vehicles-filter-clear').onclick=()=>{status='todos';sort='alpha';min=max='';list.querySelector('#app-vehicles-min-contacts').value='';list.querySelector('#app-vehicles-max-contacts').value='';mark('[data-vehicle-status-filter]','data-vehicle-status-filter',status);mark('[data-vehicle-sort]','data-vehicle-sort',sort);apply()};
 list.querySelector('.app-vehicles-select-trigger').onclick=()=>{selection=true;selected.clear();apply()};
 list.querySelector('.app-vehicles-select-all').onclick=()=>{const visible=cards().filter(c=>!c.hidden),all=visible.every(c=>selected.has(c.dataset.vehicleId));visible.forEach(c=>all?selected.delete(c.dataset.vehicleId):selected.add(c.dataset.vehicleId));apply()};
 list.querySelector('.app-vehicles-cancel-select').onclick=()=>{selection=false;selected.clear();apply()};
 const prepare=edit=>{form.reset();formView.querySelector('h4').textContent=edit?'EDITAR VEÍCULO':'NOVO VEÍCULO';form.querySelector('[type=submit]').textContent=edit?'SALVAR':'CADASTRAR';if(edit){form.elements.namedItem('name').value=details.querySelector('[data-vehicle-detail=name]').textContent.trim();form.elements.namedItem('active').checked=true}form.querySelector('.app-vehicle-demo-note').textContent=edit?'Demonstração visual: as alterações não serão salvas.':'Demonstração visual: o cadastro está desabilitado.'};
 sim.addEventListener('click',e=>{const b=e.target.closest('button[data-screen]');if(!b)return;if(b.dataset.screen==='novo-veiculo')prepare(false);if(b.dataset.screen==='editar-veiculo')prepare(true)},true);
 sim.addEventListener('click',e=>{const c=e.target.closest('.app-vehicle-card');if(c&&selection){e.preventDefault();e.stopPropagation();selected.has(c.dataset.vehicleId)?selected.delete(c.dataset.vehicleId):selected.add(c.dataset.vehicleId);apply()}},true);
 form.addEventListener('submit',e=>e.preventDefault());details.querySelector('.app-vehicle-delete').onclick=e=>e.preventDefault();formView.querySelector('.app-vehicle-add-address').onclick=e=>e.preventDefault();apply();
})();

/* Simulador LOGOS — biblioteca e editor demonstrativo de templates */
(() => {
 const sim=document.querySelector('.app-simulator'),library=document.querySelector('.app-templates'),preview=document.querySelector('.app-template-preview'),editor=document.querySelector('.app-template-editor');
 if(!sim||!library||!preview||!editor)return;
 const catalog={
  simples:{name:'Release simples',blocks:['Título','Linha fina','Texto','Divisor','Contato de imprensa']},
  imagem:{name:'Release com imagem',blocks:['Imagem / logo','Título','Linha fina','Texto','Divisor','Contato de imprensa']},
  aviso:{name:'Aviso de pauta',blocks:['Título','Texto','Texto','Divisor','Contato de imprensa']}
 };
 let currentId='simples',copyMode=false,selectedChoice='',blocks=[],custom=[];
 const nameInput=editor.querySelector('#app-template-name'), list=editor.querySelector('#app-template-block-list');
 const defaults={Título:'Título da matéria', 'Linha fina':'Uma apresentação breve da matéria.',Texto:'Escreva aqui o conteúdo da matéria.', 'Contato de imprensa':'Nome, telefone e e-mail da assessoria.', 'Imagem / logo':'Imagem da matéria', 'Botão com link':'Acessar conteúdo',Arquivo:'Baixar arquivo',Divisor:'Bloco de separação',Espaçamento:'Espaçamento'};
 const summary=(type)=>defaults[type]||'Toque para editar';
 const updateCount=()=>{editor.querySelector('#app-template-block-count').textContent=blocks.length;editor.querySelector('#app-template-current-name').textContent=nameInput.value||'Novo template'};
 const renderBlocks=()=>{
  list.innerHTML='';
  blocks.forEach((b,i)=>{
   const row=document.createElement('div');row.className='app-template-block-row';
   row.innerHTML='<div class="app-template-block-head"><button type="button" class="edit-block"></button><button type="button" class="move" data-move="-1" aria-label="Mover para cima">↑</button><button type="button" class="move" data-move="1" aria-label="Mover para baixo">↓</button></div><div class="app-template-block-edit" hidden><label>CONTEÚDO<input class="block-value"></label><button type="button" class="complete-block">CONCLUIR</button></div>';
   const editButton=row.querySelector('.edit-block');editButton.innerHTML='<span></span><small></small>';editButton.querySelector('span').textContent=b.type;editButton.querySelector('small').textContent=b.value||summary(b.type);
   row.querySelector('.block-value').value=b.value||summary(b.type);
   editButton.onclick=()=>row.querySelector('.app-template-block-edit').hidden=!row.querySelector('.app-template-block-edit').hidden;
   row.querySelector('.complete-block').onclick=()=>{b.value=row.querySelector('.block-value').value;renderBlocks()};
   row.querySelectorAll('.move').forEach(btn=>btn.onclick=()=>{const j=i+Number(btn.dataset.move);if(j>=0&&j<blocks.length){[blocks[i],blocks[j]]=[blocks[j],blocks[i]];renderBlocks()}});
   list.appendChild(row);
  });
  updateCount();
 };
 const normalizedBlocks=(item)=>(item.blocks||[]).map(block=>typeof block==='string'?{type:block,value:summary(block)}:{...block,value:block.value||summary(block.type)});
 const renderBlockList=(container,items,{thumbnail=false}={})=>{
  container.innerHTML='';
  items.forEach(block=>{
   const type=block.type,value=block.value||summary(type);
   if(type==='Divisor'){container.appendChild(document.createElement('hr'));return}
   if(type==='Espaçamento'){const gap=document.createElement('div');gap.style.height=thumbnail?'8px':'18px';container.appendChild(gap);return}
   if(type==='Imagem / logo'){
    const image=document.createElement('div');image.className=thumbnail?'app-template-thumb-image':'app-template-preview-image';image.textContent=value;container.appendChild(image);return;
   }
   if(type==='Contato de imprensa'){
    const label=document.createElement('strong');label.className='app-template-contact-label';label.textContent='Contato de imprensa';container.appendChild(label);
    const contact=document.createElement('p');contact.textContent=value;container.appendChild(contact);return;
   }
   const heading=type==='Título';
   const text=document.createElement(heading?(thumbnail?'strong':'h3'):'p');text.textContent=value;
   if(type==='Linha fina')text.className='muted';
   container.appendChild(text);
  });
 };
 const renderPreview=(container)=>{
  const card=document.createElement('article');card.className='app-template-preview-card';
  renderBlockList(card,blocks);
  if(!blocks.length)card.textContent='O conteúdo ainda está vazio.';
  container.innerHTML='';container.appendChild(card);
 };
 const showPreview=(id)=>{
  currentId=id;const item=catalog[id]||custom.find(x=>x.id===id)||catalog.simples;
  preview.querySelector('#app-template-preview-name').textContent=item.name;
  const card=preview.querySelector('#app-template-preview-card');
  renderBlockList(card,normalizedBlocks(item));
 };
 const startCopy=()=>{
  const item=catalog[currentId]||custom.find(x=>x.id===currentId)||catalog.simples;
  copyMode=true;nameInput.value='Cópia de '+item.name;
  blocks=normalizedBlocks(item);editor.querySelector('.app-template-editor-tabs [data-editor-tab=blocks]').click();renderBlocks();
 };
 const startNew=()=>{copyMode=false;nameInput.value='';blocks=[];editor.querySelector('.app-template-editor-tabs [data-editor-tab=blocks]').click();renderBlocks()};
 const filter=()=>{
  const q=library.querySelector('#app-template-search').value.toLocaleLowerCase('pt-BR').trim();
  const tab=library.querySelector('.app-template-tabs .selected')?.dataset.templateTab||'todos';
  let count=0;
  library.querySelectorAll('[data-template-card]').forEach(card=>{
   const visible=card.dataset.templateName.toLocaleLowerCase('pt-BR').includes(q)&&(tab==='todos'||(tab==='padroes'&&card.dataset.templateOrigin==='padrao')||(tab==='assessoria'&&card.dataset.templateOrigin==='assessoria'));
   card.hidden=!visible;if(visible)count++;
  });
  library.querySelector('#app-template-count').textContent=count+' encontrado'+(count===1?'':'s');
  library.querySelector('.app-template-empty').hidden=count>0;
 };
 library.querySelector('#app-template-search').addEventListener('input',filter);
 library.querySelectorAll('[data-template-tab]').forEach(b=>b.onclick=()=>{library.querySelectorAll('[data-template-tab]').forEach(x=>x.classList.toggle('selected',x===b));filter()});
 editor.querySelectorAll('[data-editor-tab]').forEach(b=>b.onclick=()=>{
  editor.querySelectorAll('[data-editor-tab]').forEach(x=>x.classList.toggle('selected',x===b));
  const isPreview=b.dataset.editorTab==='preview';
  list.hidden=isPreview;editor.querySelector('.app-template-add-block').hidden=isPreview;
  editor.querySelector('.app-template-block-count').hidden=isPreview;editor.querySelector('#app-template-editor-preview').hidden=!isPreview;
  if(isPreview)renderPreview(editor.querySelector('#app-template-editor-preview'));
 });
 editor.querySelector('.app-template-add-block').onclick=()=>{selectedChoice='';editor.querySelectorAll('[data-block-choice]').forEach(x=>x.classList.remove('selected'));editor.querySelector('.app-template-add-modal').hidden=false};
 editor.querySelectorAll('[data-action=close-block-modal]').forEach(b=>b.onclick=()=>editor.querySelector('.app-template-add-modal').hidden=true);
 editor.querySelectorAll('[data-block-choice]').forEach(b=>b.onclick=()=>{selectedChoice=b.dataset.blockChoice;editor.querySelectorAll('[data-block-choice]').forEach(x=>x.classList.toggle('selected',x===b))});
 editor.querySelector('[data-action=insert-block]').onclick=()=>{if(selectedChoice&&blocks.length<100){blocks.push({type:selectedChoice,value:summary(selectedChoice)});renderBlocks()}editor.querySelector('.app-template-add-modal').hidden=true};
 nameInput.oninput=updateCount;
 editor.querySelector('[data-action=save-template]').onclick=()=>{
  const name=nameInput.value.trim();if(!name)return;
  const id='custom-'+Date.now();custom.unshift({id,name,blocks:blocks.map(b=>({...b})),origin:'assessoria'});
  const card=document.createElement('article');card.className='app-template-card';card.dataset.templateCard='';card.dataset.templateId=id;card.dataset.templateName=name;card.dataset.templateOrigin='assessoria';
  card.innerHTML='<div class="app-template-thumb"></div><h4></h4><p>Da assessoria</p><button data-template-action="preview" data-screen="preview-template">◉ VER PRÉVIA</button><button data-template-action="copy" data-screen="editar-copia-template">▢ CRIAR CÓPIA</button>';
  card.querySelector('h4').textContent=name;renderBlockList(card.querySelector('.app-template-thumb'),normalizedBlocks(custom[0]),{thumbnail:true});card.querySelector('[data-template-action=preview]').dataset.templateId=id;card.querySelector('[data-template-action=copy]').dataset.templateId=id;
  library.querySelector('.app-template-grid').prepend(card);library.querySelector('.app-template-tabs [data-template-tab=todos]').click();filter();sim.querySelector('[data-screen=templates]')?.click();
 };
 sim.addEventListener('click',e=>{
  const b=e.target.closest('[data-template-action], [data-action=copy-preview], button[data-screen]');
  if(!b)return;
  const action=b.dataset.templateAction;
  if(action==='preview'||b.dataset.action==='copy-preview'||b.dataset.screen==='preview-template'){
   currentId=b.dataset.templateId||currentId;showPreview(currentId);
  }
  if(action==='copy'||b.dataset.action==='copy-preview'||b.dataset.screen==='editar-copia-template'){currentId=b.dataset.templateId||currentId;startCopy()}
  if(b.dataset.screen==='novo-template')startNew();
 },true);
 renderBlocks();filter();
})();

