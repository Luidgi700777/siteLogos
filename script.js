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
            titulo: 'Olá, Luidgi',
            aba: 'inicio',
            voltar: false
        },

        clipping: {
            titulo: 'Clipping',
            aba: 'clipping',
            voltar: false
        },

        mailing: {
            titulo: 'Mailing',
            aba: 'mailing',
            voltar: false
        },

        mais: {
            titulo: 'Mais',
            aba: 'mais',
            voltar: false
        },

        clientes: {
            titulo: 'Clientes',
            aba: null,
            voltar: false
        },

        veiculos: {
            titulo: 'Veículos',
            aba: null,
            voltar: false
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
            const active = view.dataset.view === screenName;

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
