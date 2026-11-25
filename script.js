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

// O aplicativo de referência usa ícones de contorno. Converta os ícones
// Font Awesome do simulador em SVGs leves, sem alterar o restante do site.
const appIconPaths = {
    'fa-chevron-left': '<path d="m15 18-6-6 6-6"/>',
    'fa-chevron-right': '<path d="m9 18 6-6-6-6"/>',
    'fa-chevron-up': '<path d="m18 15-6-6-6 6"/>',
    'fa-chevron-down': '<path d="m6 9 6 6 6-6"/>',
    'fa-arrow-right': '<path d="M5 12h14"/><path d="m12 5 7 7-7 7"/>',
    'fa-arrow-up-right-from-square': '<path d="M14 4h6v6"/><path d="M20 4 10 14"/><path d="M18 13v6a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h6"/>',
    'fa-gear': '<path d="M12 8.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7Z"/><path d="m19.4 15 .1.1a1.8 1.8 0 0 1-2.5 2.5l-.1-.1a1.8 1.8 0 0 0-3 .9v.2a1.8 1.8 0 0 1-3.6 0v-.2a1.8 1.8 0 0 0-3-.9l-.1.1a1.8 1.8 0 1 1-2.5-2.5l.1-.1a1.8 1.8 0 0 0-.9-3h-.2a1.8 1.8 0 0 1 0-3.6h.2a1.8 1.8 0 0 0 .9-3l-.1-.1a1.8 1.8 0 1 1 2.5-2.5l.1.1a1.8 1.8 0 0 0 3-.9v-.2a1.8 1.8 0 0 1 3.6 0v.2a1.8 1.8 0 0 0 3 .9l.1-.1a1.8 1.8 0 1 1 2.5 2.5l-.1.1a1.8 1.8 0 0 0 .9 3h.2a1.8 1.8 0 0 1 0 3.6h-.2a1.8 1.8 0 0 0-.9 3Z"/>',
    'fa-sliders': '<path d="M21 4h-7M10 4H3M21 12h-9M8 12H3M21 20h-5M12 20H3"/><circle cx="12" cy="4" r="2"/><circle cx="6" cy="12" r="2"/><circle cx="14" cy="20" r="2"/>',
    'fa-house': '<path d="m3 10 9-7 9 7"/><path d="M5 9v11h5v-6h4v6h5V9"/>',
    'fa-file': '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z"/><path d="M14 2v6h6"/>',
    'fa-file-lines': '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z"/><path d="M14 2v6h6"/><path d="M8 13h8M8 17h8M8 9h2"/>',
    'fa-users': '<path d="M16 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="10" cy="7" r="4"/><path d="M20 21v-2a4 4 0 0 0-3-3.9M16 3.1a4 4 0 0 1 0 7.8"/>',
    'fa-user-group': '<path d="M16 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="10" cy="7" r="4"/><path d="M20 21v-2a4 4 0 0 0-3-3.9M16 3.1a4 4 0 0 1 0 7.8"/>',
    'fa-ellipsis': '<circle cx="12" cy="12" r="9"/><circle cx="8" cy="12" r=".7"/><circle cx="12" cy="12" r=".7"/><circle cx="16" cy="12" r=".7"/>',
    'fa-circle': '<circle cx="12" cy="12" r="8.5"/>',
    'fa-minus': '<path d="M5 12h14"/>',
    'fa-arrow-left': '<path d="M19 12H5M12 19l-7-7 7-7"/>',
    'fa-arrow-up': '<path d="M12 19V5m-7 7 7-7 7 7"/>',
    'fa-arrow-down': '<path d="M12 5v14m7-7-7 7-7-7"/>',
    'fa-bars': '<path d="M4 6h16M4 12h16M4 18h16"/>',
    'fa-sun': '<circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32 1.41 1.41M2 12h2m16 0h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/>',
    'fa-right-from-bracket': '<path d="M10 17l5-5-5-5m5 5H3"/><path d="M12 3h6a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-6"/>',
    'fa-briefcase': '<rect x="3" y="7" width="18" height="14" rx="2"/><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M3 12h18M10 12v2h4v-2"/>',
    'fa-magnifying-glass': '<circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/>',
    'fa-check': '<path d="m5 12 4 4L19 6"/>',
    'fa-circle-check': '<circle cx="12" cy="12" r="9"/><path d="m8 12 2.5 2.5L16 9"/>',
    'fa-square-check': '<rect x="3" y="3" width="18" height="18" rx="3"/><path d="m7 12 3 3 7-7"/>',
    'fa-square-plus': '<rect x="3" y="3" width="18" height="18" rx="3"/><path d="M12 8v8M8 12h8"/>',
    'fa-square': '<rect x="4" y="4" width="16" height="16" rx="2"/>',
    'fa-xmark': '<path d="m18 6-12 12M6 6l12 12"/>',
    'fa-trash-can': '<path d="M3 6h18M8 6V4h8v2m-9 0 1 14h8l1-14M10 10v6m4-6v6"/>',
    'fa-user': '<circle cx="12" cy="8" r="4"/><path d="M5 21a7 7 0 0 1 14 0"/>',
    'fa-user-plus': '<path d="M15 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M19 8v6M16 11h6"/>',
    'fa-id-card': '<rect x="2.5" y="4" width="19" height="16" rx="2"/><circle cx="8" cy="10" r="2"/><path d="M5 16a3 3 0 0 1 6 0M13 9h5M13 13h5M13 17h3"/>',
    'fa-envelope': '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>',
    'fa-phone': '<path d="M21 16.5v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.4 19.4 0 0 1-6-6A19.8 19.8 0 0 1 1.1 3.7 2 2 0 0 1 3.1 1.5h3a2 2 0 0 1 2 1.7l.4 2.7a2 2 0 0 1-.6 1.7L6.6 9a16 16 0 0 0 6 6l1.4-1.3a2 2 0 0 1 1.7-.5l2.7.4a2 2 0 0 1 1.6 1.9Z"/>',
    'fa-globe': '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a15 15 0 0 1 0 18M12 3a15 15 0 0 0 0 18"/>',
    'fa-location-dot': '<path d="M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/>',
    'fa-image': '<rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="m21 15-5-5L5 21"/>',
    'fa-calendar': '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 10h18"/><path d="M8 14h.01M12 14h.01M16 14h.01M8 17h.01M12 17h.01"/>',
    'fa-link': '<path d="M10 13a5 5 0 0 0 7.1 0l3-3A5 5 0 0 0 13 2.9l-1.7 1.7"/><path d="M14 11a5 5 0 0 0-7.1 0l-3 3a5 5 0 0 0 7.1 7.1l1.7-1.7"/>',
    'fa-download': '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="m7 10 5 5 5-5M12 15V3"/>',
    'fa-cloud-arrow-up': '<path d="M20 16.2A4.5 4.5 0 0 0 18 7.5h-1.2A7 7 0 1 0 4 15.3"/><path d="M12 12v9m-4-5 4-4 4 4"/>',
    'fa-paper-plane': '<path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/>',
    'fa-paperclip': '<path d="m21.4 11.1-8.5 8.5a6 6 0 0 1-8.5-8.5l9.2-9.2a4 4 0 0 1 5.7 5.7l-9.2 9.2a2 2 0 0 1-2.8-2.8l8.5-8.5"/>',
    'fa-building': '<rect x="3" y="3" width="18" height="18" rx="1"/><path d="M9 21V9h6v12M7 7h.01M11 7h.01M15 7h.01M7 11h.01M7 15h.01M17 11h.01M17 15h.01"/>',
    'fa-folder': '<path d="M4 6V4h16v2M3 7h18v13H3z"/><path d="M8 11h8"/>',
    'fa-newspaper': '<path d="M4 4h14v16H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z"/><path d="M18 8h3v10a2 2 0 0 1-2 2h-1M7 8h8v5H7zM7 16h8M7 19h5"/>',
    'fa-mobile-screen-button': '<rect x="6" y="2" width="12" height="20" rx="2"/><path d="M11 18h2"/>',
    'fa-tower-broadcast': '<circle cx="12" cy="12" r="1.5"/><path d="M8.5 8.5a5 5 0 0 0 0 7M15.5 8.5a5 5 0 0 1 0 7M5.7 5.7a9 9 0 0 0 0 12.6M18.3 5.7a9 9 0 0 1 0 12.6"/>',
    'fa-chart-bar': '<path d="M4 19V5M4 19h17"/><rect x="8" y="11" width="3" height="6" rx=".5"/><rect x="14" y="7" width="3" height="10" rx=".5"/>',
    'fa-chart-column': '<path d="M4 20V4M4 20h17"/><rect x="8" y="11" width="3" height="6" rx=".5"/><rect x="14" y="7" width="3" height="10" rx=".5"/>',
    'fa-award': '<circle cx="12" cy="8" r="6"/><path d="m8.2 13-1 9 4.8-2.5 4.8 2.5-1-9"/>',
    'fa-tag': '<path d="m20 13-7 7L3 10V3h7Z"/><circle cx="7.5" cy="7.5" r=".8"/>',
    'fa-eye': '<path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12Z"/><circle cx="12" cy="12" r="3"/>',
    'fa-copy': '<rect x="8" y="8" width="13" height="13" rx="2"/><path d="M16 8V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h3"/>',
    'fa-plus': '<path d="M12 5v14M5 12h14"/>',
    'fa-upload': '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="m17 8-5-5-5 5M12 3v12"/>',
    'fa-rotate': '<path d="M20 7v5h-5M4 17v-5h5"/><path d="M5.6 9A7 7 0 0 1 17 5l3 7M4 12l3 7a7 7 0 0 0 11.4-4"/>',
    'fa-circle-info': '<circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h.01"/>',
    'fa-pen-to-square': '<path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L8 18l-4 1 1-4Z"/>',
    'fa-facebook': '<path d="M14 8h4V4h-4a5 5 0 0 0-5 5v3H6v4h3v5h4v-5h4l1-4h-5V9a1 1 0 0 1 1-1Z"/>',
    'fa-instagram': '<rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><path d="M17.5 6.5h.01"/>',
    'fa-linkedin': '<path d="M4 9v11M4 4v.01M9 20v-6a4 4 0 0 1 8 0v6M9 10v10"/>',
    'fa-github': '<path d="M9 19c-4.3 1.4-4.3-2.5-6-3m12 6v-3.9a3.4 3.4 0 0 0-.9-2.6c3 0 6.1-1.5 6.1-6.6a5.1 5.1 0 0 0-1.4-3.5 4.7 4.7 0 0 0-.1-3.5S17.2 1.5 15 3.3a13.3 13.3 0 0 0-7 0C5.8 1.5 4.3 1.9 4.3 1.9a4.7 4.7 0 0 0-.1 3.5 5.1 5.1 0 0 0-1.4 3.5c0 5.1 3.1 6.6 6.1 6.6A3.4 3.4 0 0 0 8 18v4"/>',
    'fa-whatsapp': '<path d="M21 11.5a8.4 8.4 0 0 1-12.4 7.4L3 20l1.2-5.2A8.4 8.4 0 1 1 21 11.5Z"/><path d="M8 8.5c.4 2.7 2.8 5.1 5.5 5.5l1.2-1.2 2 1c-.2 1.6-1.4 2.3-2.7 2.1-3.7-.7-6.7-3.7-7.4-7.4-.2-1.3.5-2.5 2.1-2.7l1 2Z"/>',
};

function upgradeAppIcons(root) {
    if (!root) return;
    const candidates = [];
    const selector = 'i[class*="fa-"],svg.svg-inline--fa[class*="fa-"]';
    if (root.matches?.(selector)) candidates.push(root);
    candidates.push(...(root.querySelectorAll?.(selector) || []));
    candidates.forEach((icon) => {
        const iconName = [...icon.classList].find((name) => appIconPaths[name]);
        if (!iconName) return;
        const isSvg = icon.tagName.toLowerCase() === 'svg';
        const svg = isSvg ? icon : document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.setAttribute('viewBox', '0 0 24 24');
        svg.setAttribute('fill', 'none');
        svg.setAttribute('stroke', 'currentColor');
        svg.setAttribute('stroke-width', '1.8');
        svg.setAttribute('stroke-linecap', 'round');
        svg.setAttribute('stroke-linejoin', 'round');
        svg.setAttribute('aria-hidden', 'true');
        svg.classList.remove('svg-inline--fa');
        svg.classList.add('app-demo-outline-icon', iconName);
        svg.innerHTML = appIconPaths[iconName];
        if (!isSvg) icon.replaceChildren(svg);
    });
}

function upgradeAppGlyphs(root) {
    if (!root) return;
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    const textNodes = [];
    while (walker.nextNode()) {
        if (/[▦▧▤▢✎⟳☑ⓘ↗⇩⇧✉＋›×✓⌃◉♧＝↪☼←○→↑↓☰□−🗎]/u.test(walker.currentNode.nodeValue || '')) textNodes.push(walker.currentNode);
    }
    textNodes.forEach((textNode) => {
        const value = textNode.nodeValue || '';
        const parent = textNode.parentElement;
        const control = parent?.closest('button,label');
        const context = [
            control?.className,
            control?.textContent,
            control?.getAttribute('aria-label'),
            control?.getAttribute('title'),
            control?.dataset?.action,
            control?.dataset?.open,
            parent?.closest('article,section')?.textContent
        ].filter(Boolean).join(' ').toLocaleLowerCase('pt-BR');
        const fragment = document.createDocumentFragment();
        let last = 0;
        for (const match of value.matchAll(/[▦▧▤▢✎⟳☑ⓘ↗⇩⇧✉＋›×✓⌃◉♧＝↪☼←○→↑↓☰□−🗎]/gu)) {
            if (match.index > last) fragment.append(document.createTextNode(value.slice(last, match.index)));
            const symbol = match[0];
            let iconName = ({
                '▦': 'fa-calendar', '▧': 'fa-image', '▢': 'fa-copy', '✎': 'fa-pen-to-square', '⟳': 'fa-rotate',
                '☑': 'fa-circle-check', 'ⓘ': 'fa-circle-info', '↗': 'fa-arrow-up-right-from-square',
                '⇩': 'fa-download', '⇧': 'fa-upload', '✉': 'fa-envelope', '＋': 'fa-plus',
                '›': 'fa-chevron-right', '×': 'fa-xmark', '✓': 'fa-check', '⌃': 'fa-chevron-up',
                '◉': 'fa-eye', '＝': 'fa-minus', '↪': 'fa-right-from-bracket', '☼': 'fa-sun',
                '←': 'fa-arrow-left', '○': 'fa-circle', '→': 'fa-arrow-right', '↑': 'fa-arrow-up',
                '↓': 'fa-arrow-down', '☰': 'fa-bars', '□': 'fa-square', '−': 'fa-minus', '🗎': 'fa-file-lines'
            })[symbol];
            if (symbol === '▤') iconName = /excluir|remover|ignorar|delet|trash/.test(context) ? 'fa-trash-can' : 'fa-file-lines';
            if (symbol === '♧') iconName = /convide|equipe/.test(context) ? 'fa-user-plus' : 'fa-paperclip';
            const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
            svg.setAttribute('viewBox', '0 0 24 24');
            svg.setAttribute('fill', 'none');
            svg.setAttribute('stroke', 'currentColor');
            svg.setAttribute('stroke-width', '1.8');
            svg.setAttribute('stroke-linecap', 'round');
            svg.setAttribute('stroke-linejoin', 'round');
            svg.setAttribute('aria-hidden', 'true');
            svg.setAttribute('focusable', 'false');
            svg.classList.add('app-demo-outline-icon', 'app-demo-glyph', iconName);
            svg.innerHTML = appIconPaths[iconName];
            fragment.append(svg);
            last = match.index + symbol.length;
        }
        if (last < value.length) fragment.append(document.createTextNode(value.slice(last)));
        textNode.replaceWith(fragment);
    });
}

if (appSimulator) {

    upgradeAppIcons(appSimulator);
    upgradeAppGlyphs(appSimulator);
    new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.type === 'attributes' && mutation.target.matches('i[class*="fa-"],svg.app-demo-outline-icon[class*="fa-"]')) {
                upgradeAppIcons(mutation.target);
            }
            mutation.addedNodes.forEach((node) => {
                if (node.nodeType === Node.ELEMENT_NODE) {
                    upgradeAppIcons(node);
                    upgradeAppGlyphs(node);
                } else if (node.nodeType === Node.TEXT_NODE && node.parentElement) {
                    upgradeAppGlyphs(node.parentElement);
                }
            });
        });
    }).observe(appSimulator, { childList: true, subtree: true, attributes: true, attributeFilter: ['class'] });

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
            voltar: true
        },

        'clipping-clientes': { titulo: 'Clientes 2026', aba: 'clipping', voltar: true },
        'clipping-cliente': { titulo: 'Cleiton', aba: 'clipping', voltar: true },
        'detalhes-clipping': { titulo: 'Detalhes', aba: 'clipping', voltar: true },
        'editar-clipping': { titulo: 'Editar clipping', aba: 'clipping', voltar: true },

        mailing: {
            titulo: 'Mailing',
            aba: 'mailing',
            voltar: true
        },

        releases: {
            titulo: 'Releases',
            aba: 'releases',
            voltar: true
        },

        mais: {
            titulo: 'Mais',
            aba: 'mais',
            voltar: false
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

        'detalhes-contato': { titulo: 'Contato', aba: 'mailing', voltar: true },

        'editar-contato': { titulo: 'Editar contato', aba: 'mailing', voltar: true },

        'selecionar-contatos': { titulo: 'Destinatários', aba: 'releases', voltar: true },

        'novo-release': { titulo: 'Novo release', aba: 'releases', voltar: true },

        'detalhes-release': { titulo: 'Release', aba: 'releases', voltar: true },

        'editar-release': { titulo: 'Editar release', aba: 'releases', voltar: true },

        'detalhes-relatorio': { titulo: 'Relatório', aba: null, voltar: true },

        'selecionar-materias': { titulo: 'Escolher matérias', aba: null, voltar: true },

        'editar-periodo-relatorio': { titulo: 'Editar período', aba: null, voltar: true },

        'editar-slide': { titulo: 'Editar slide', aba: null, voltar: true },

        'novo-funcionario': { titulo: 'Novo funcionário', aba: null, voltar: true },

        'detalhes-funcionario': { titulo: 'Funcionário', aba: null, voltar: true },

        'editar-funcionario': { titulo: 'Editar funcionário', aba: null, voltar: true },

        'editar-convite': { titulo: 'Convites', aba: null, voltar: true },

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
                (screenName === 'editar-clipping' && view.dataset.view === 'novo-clipping') ||
                (screenName === 'editar-veiculo' && view.dataset.view === 'novo-veiculo') ||
                (screenName === 'editar-copia-template' && view.dataset.view === 'novo-template') ||
                (screenName === 'editar-contato' && view.dataset.view === 'novo-contato') ||
                (screenName === 'editar-release' && view.dataset.view === 'novo-release') ||
                (screenName === 'editar-funcionario' && view.dataset.view === 'novo-funcionario')
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
            ['configuracoes', 'selecionar-contatos', 'preview-template'].includes(screenName)
        );
        appScreen.classList.toggle(
            'app-screen-no-settings',
            ['configuracoes', 'selecionar-contatos', 'preview-template', 'novo-template', 'editar-copia-template'].includes(screenName)
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

        if (destination === 'clipping-cliente') {
            const clientName = button
            .querySelector('.app-clipping-client-info strong')
            ?.textContent.trim();

        if (clientName) {
            appRoutes[destination].titulo = clientName;
        }
    }

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
        descricao: '',
        email: '',
        telefone: '',
        site: '',
        cidade: '',
        uf: '',
        logo: ''
    },
    'cliente-maria': {
        responsavel: 'Maria',
        cnpj: '',
        descricao: '',
        email: '',
        telefone: '',
        site: '',
        cidade: '',
        uf: '',
        logo: ''
    },
    'cliente-joao': {
        responsavel: 'João',
        cnpj: '',
        descricao: '',
        email: '',
        telefone: '',
        site: '',
        cidade: '',
        uf: '',
        logo: ''
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

const appClientFormView=document.querySelector('.app-client-form-screen');
const appClientForm=document.querySelector('#app-client-create-form');
const appClientNewButton=document.querySelector('.app-clients-new-btn');
const appClientEditButton=document.querySelector('.app-client-edit-btn');
if(appClientFormView&&appClientForm){
 const heading=appClientFormView.querySelector('.app-client-form-heading');
 const profile=appClientFormView.querySelector('.app-client-form-profile');
 const submit=appClientFormView.querySelector('.app-client-form-submit');
 const prepare=(editing)=>{
  appClientForm.reset();
  heading.hidden=editing;
  profile.hidden=!editing;
  submit.textContent=editing?'SALVAR':'CADASTRAR';
  const clientId=appClientDetailsView?.dataset.clientId;
  const card=Array.from(document.querySelectorAll('.app-clients-list [data-client-id]')).find(item=>item.dataset.clientId===clientId);
  const extra=appClientExtraData[clientId]||{};
  const values=editing&&card?{
   nome:card.querySelector('strong')?.textContent.trim()||'',
   segmento:card.dataset.clientSegment||'',
   responsavel:extra.responsavel||'',
   cnpj:extra.cnpj||'',
   descricao:extra.descricao||'',
   email:extra.email||'',
   telefone:extra.telefone||'',
   site:extra.site||'',
   cidade:extra.cidade||'',
   uf:extra.uf||''
  }:{};
  Object.entries(values).forEach(([name,value])=>{
   const field=appClientForm.elements.namedItem(name);
   if(field)field.value=value;
  });
  const active=appClientForm.elements.namedItem('ativo');
  if(active)active.checked=!editing||card?.dataset.clientStatus==='ativo';
  if(editing&&card){
   profile.querySelector('h4').textContent=values.nome||'Cleiton';
   profile.querySelector('p').textContent=values.segmento||'varejo';
   profile.querySelector('span').textContent=(card.dataset.clientStatus||'ativo').toUpperCase();
  }
 };
 appClientNewButton?.addEventListener('click',()=>prepare(false));
 appClientEditButton?.addEventListener('click',()=>prepare(true));
 appClientForm.querySelector('.app-client-logo-pick').onclick=()=>appClientForm.querySelector('input[name="logo"]').click();
 appClientForm.addEventListener('submit',event=>event.preventDefault());
 document.querySelector('.app-client-delete-btn')?.addEventListener('click',event=>event.preventDefault());
 prepare(false);
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
 const sim=document.querySelector('.app-simulator');
 const list=document.querySelector('.app-vehicles');
 const details=document.querySelector('.app-vehicle-details');
 const formView=document.querySelector('.app-vehicle-form');
 const form=document.querySelector('#app-vehicle-form');
 if(!sim||!list||!details||!formView||!form)return;

 let selection=false,status='todos',sort='alpha',min='',max='';
 let contactSelection=false,contactSelected=false;
 const selected=new Set();
 const cards=()=>Array.from(list.querySelectorAll('.app-vehicle-card'));
 const detailsName=details.querySelector('[data-vehicle-detail="name"]');
 const detailsDescription=details.querySelector('[data-vehicle-detail="description"]');
 const detailsReach=details.querySelector('[data-vehicle-detail="reach"]');
 const detailsTier=details.querySelector('[data-vehicle-detail="tier"]');
 const compareNumber=(a,b,key,direction)=>direction*(Number(a.dataset[key]||0)-Number(b.dataset[key]||0));

 const apply=()=>{
  const query=list.querySelector('#app-vehicles-query').value.trim().toLocaleLowerCase('pt-BR');
  let matches=cards().filter(card=>
   card.dataset.vehicleName.toLocaleLowerCase('pt-BR').includes(query)&&
   (status==='todos'||card.dataset.vehicleStatus===status)&&
   (!min||Number(card.dataset.vehicleContacts)>=Number(min))&&
   (!max||Number(card.dataset.vehicleContacts)<=Number(max))
  );
  cards().forEach(card=>card.hidden=!matches.includes(card));
  const sorters={
   alpha:(a,b)=>a.dataset.vehicleName.localeCompare(b.dataset.vehicleName,'pt-BR'),
   'contacts-desc':(a,b)=>compareNumber(a,b,'vehicleContacts',-1),
   'contacts-asc':(a,b)=>compareNumber(a,b,'vehicleContacts',1),
   'clippings-desc':(a,b)=>compareNumber(a,b,'vehicleClippings',-1),
   'clippings-asc':(a,b)=>compareNumber(a,b,'vehicleClippings',1)
  };
  matches.sort(sorters[sort]||sorters.alpha);
  matches.forEach(card=>list.querySelector('.app-vehicles-list').appendChild(card));
  list.querySelector('#app-vehicles-count').textContent=matches.length===1?'1 veículo':matches.length+' veículos';
  list.querySelector('.app-vehicles-empty').hidden=matches.length>0;
  list.querySelector('#app-vehicles-selected-count').textContent=selected.size;
  list.querySelector('.app-vehicles-delete-selected').disabled=selected.size===0;
  list.classList.toggle('app-vehicles-selection-active',selection);
  list.querySelector('.app-vehicles-select-trigger').hidden=selection;
  list.querySelector('.app-vehicles-selection-bar').hidden=!selection;
  cards().forEach(card=>{
   const isSelected=selected.has(card.dataset.vehicleId);
   card.setAttribute('aria-pressed',String(selection&&isSelected));
   const mark=card.querySelector('.app-vehicle-card-check i,.app-vehicle-card-check svg.app-demo-outline-icon');
   if(mark){mark.className='app-demo-outline-icon '+(isSelected?'fa-solid fa-square-check':'fa-regular fa-square');upgradeAppIcons(mark)}
  });
 };
 const mark=(selector,attr,value)=>list.querySelectorAll(selector).forEach(button=>button.classList.toggle('selected',button.getAttribute(attr)===value));

 list.querySelector('.app-vehicles-filter-open').onclick=()=>list.querySelector('.app-vehicles-filter-backdrop').hidden=false;
 list.querySelector('.app-vehicles-filter-close').onclick=()=>list.querySelector('.app-vehicles-filter-backdrop').hidden=true;
 list.querySelector('.app-vehicles-filter-backdrop').onclick=event=>{if(event.target===event.currentTarget)event.currentTarget.hidden=true};
 list.querySelectorAll('[data-vehicle-status-filter]').forEach(button=>button.onclick=()=>{status=button.dataset.vehicleStatusFilter;mark('[data-vehicle-status-filter]','data-vehicle-status-filter',status)});
 list.querySelectorAll('[data-vehicle-sort]').forEach(button=>button.onclick=()=>{sort=button.dataset.vehicleSort;mark('[data-vehicle-sort]','data-vehicle-sort',sort)});
 list.querySelector('#app-vehicles-query').oninput=apply;
 list.querySelector('.app-vehicles-search-submit').onclick=apply;
 list.querySelector('.app-vehicles-filter-apply').onclick=()=>{
  min=list.querySelector('#app-vehicles-min-contacts').value;
  max=list.querySelector('#app-vehicles-max-contacts').value;
  list.querySelector('.app-vehicles-filter-backdrop').hidden=true;
  apply();
 };
 list.querySelector('.app-vehicles-filter-clear').onclick=()=>{
  status='todos';sort='alpha';min=max='';
  list.querySelector('#app-vehicles-min-contacts').value='';
  list.querySelector('#app-vehicles-max-contacts').value='';
  mark('[data-vehicle-status-filter]','data-vehicle-status-filter',status);
  mark('[data-vehicle-sort]','data-vehicle-sort',sort);
  apply();
 };
 list.querySelector('.app-vehicles-select-trigger').onclick=()=>{selection=true;selected.clear();apply()};
 list.querySelector('.app-vehicles-select-all').onclick=()=>{
  const visible=cards().filter(card=>!card.hidden);
  const allSelected=visible.length>0&&visible.every(card=>selected.has(card.dataset.vehicleId));
  visible.forEach(card=>allSelected?selected.delete(card.dataset.vehicleId):selected.add(card.dataset.vehicleId));
  apply();
 };
 list.querySelector('.app-vehicles-delete-selected').onclick=event=>event.preventDefault();
 list.querySelector('.app-vehicles-cancel-select').onclick=()=>{selection=false;selected.clear();apply()};

 const createAddressRow=(url,scope='Somente este domínio')=>{
  const row=document.createElement('div');
  row.className='app-vehicle-address-entry';
  const globe=document.createElement('i');
  globe.className='fa-solid fa-globe';
  globe.setAttribute('aria-hidden','true');
  const label=document.createElement('span');
  const address=document.createElement('strong');
  address.textContent=url;
  const note=document.createElement('small');
  note.textContent=scope;
  label.append(address,note);
  const edit=document.createElement('button');
  edit.type='button';
  edit.className='app-vehicle-address-edit';
  edit.setAttribute('aria-label','Editar endereço');
  edit.innerHTML='<i class="fa-regular fa-pen-to-square" aria-hidden="true"></i>';
  edit.onclick=()=>{form.elements.namedItem('domain').value=url.replace(/^https?:\/\//,'').replace(/\/$/,'')};
  const remove=document.createElement('button');
  remove.type='button';
  remove.className='app-vehicle-address-remove';
  remove.setAttribute('aria-label','Remover endereço');
  remove.innerHTML='<i class="fa-regular fa-trash-can" aria-hidden="true"></i>';
  remove.onclick=event=>event.preventDefault();
  const open=document.createElement('i');
  open.className='fa-solid fa-arrow-up-right-from-square';
  open.setAttribute('aria-hidden','true');
  row.append(globe,label,edit,remove,open);
  return row;
 };
 const prepare=edit=>{
  form.reset();
  const identity=formView.querySelector('.app-vehicle-form-identity');
  const help=formView.querySelector('.app-vehicle-form-heading');
  identity.hidden=!edit;
  help.hidden=edit;
  form.querySelector('[type=submit]').textContent=edit?'SALVAR':'CADASTRAR';
  form.elements.namedItem('name').value=edit?detailsName.textContent.trim():'';
  form.elements.namedItem('description').value=edit?'Canal de notícias da LOGOS':'';
  form.elements.namedItem('reach').value=edit?'500 mil leitores':'';
  form.elements.namedItem('active').checked=true;
  form.querySelector('input[name="tier"][value=""]').checked=true;
  identity.querySelector('h4').textContent=edit?detailsName.textContent.trim():'LOGOS';
  identity.querySelector('p').textContent=edit?'500 mil leitores':'Alcance não informado';
  const addressList=form.querySelector('.app-vehicle-address-list');
  addressList.replaceChildren();
  if(edit)addressList.append(createAddressRow('https://logos.com.br/'));
 };
 sim.addEventListener('click',event=>{
  const button=event.target.closest('button[data-screen]');
  if(!button)return;
  if(button.dataset.screen==='novo-veiculo')prepare(false);
  if(button.dataset.screen==='editar-veiculo')prepare(true);
 },true);
 sim.addEventListener('click',event=>{
  const card=event.target.closest('.app-vehicle-card');
  if(card&&selection){
   event.preventDefault();
   event.stopPropagation();
   selected.has(card.dataset.vehicleId)?selected.delete(card.dataset.vehicleId):selected.add(card.dataset.vehicleId);
   apply();
  }
 },true);
 form.addEventListener('submit',event=>event.preventDefault());
 details.querySelector('.app-vehicle-delete').onclick=event=>event.preventDefault();
 formView.querySelector('.app-vehicle-logo-pick').onclick=()=>form.querySelector('input[name="logo"]').click();
 formView.querySelector('.app-vehicle-add-address').onclick=()=>{
  const domain=form.elements.namedItem('domain').value.trim();
  if(!domain)return;
  const scheme=/^https?:\/\//i.test(domain)?'': 'https://';
  const section=form.elements.namedItem('section').value.trim().replace(/^\/+/, '');
  const url=scheme+domain.replace(/\/$/,'')+(section?'/'+section:'');
  const scope=form.elements.namedItem('includeSubdomains').checked?'Inclui subdomínios':'Somente este domínio';
  form.querySelector('.app-vehicle-address-list').append(createAddressRow(url,scope));
  form.elements.namedItem('domain').value='';
  form.elements.namedItem('section').value='';
  form.elements.namedItem('includeSubdomains').checked=false;
 };

 details.querySelectorAll('[data-vehicle-tab]').forEach(tab=>tab.addEventListener('click',()=>{
  const selectedTab=tab.dataset.vehicleTab;
  details.querySelectorAll('[data-vehicle-tab]').forEach(item=>{
   const active=item===tab;
   item.classList.toggle('selected',active);
   item.setAttribute('aria-selected',String(active));
  });
  details.querySelectorAll('[data-vehicle-panel]').forEach(panel=>panel.hidden=panel.dataset.vehiclePanel!==selectedTab);
 }));
 const contactSelect=details.querySelector('.app-vehicle-contact-select');
 const contactBar=details.querySelector('.app-vehicle-contact-selection');
 const contactCard=details.querySelector('.app-vehicle-contact-card');
 const contactCount=details.querySelector('[data-vehicle-contact-selected]');
 const updateContactSelection=()=>{
  contactBar.hidden=!contactSelection;
  contactSelect.hidden=contactSelection;
  contactCount.textContent=contactSelected?'1':'0';
  contactCard.classList.toggle('selected',contactSelection&&contactSelected);
 };
 contactSelect.onclick=()=>{contactSelection=true;contactSelected=false;updateContactSelection()};
 contactCard.onclick=()=>{
  if(!contactSelection)return;
  contactSelected=!contactSelected;
  updateContactSelection();
 };
 details.querySelector('[data-vehicle-contact-select-all]').onclick=()=>{contactSelected=!contactSelected;updateContactSelection()};
 details.querySelector('[data-vehicle-contact-clear]').onclick=()=>{contactSelection=false;contactSelected=false;updateContactSelection()};

 apply();
})();/* Simulador LOGOS — navegação demonstrativa de Clipping */
(() => {
 const sim=document.querySelector('.app-simulator');
 const clientPage=sim?.querySelector('.app-clipping-clients');
 const clippingPage=sim?.querySelector('.app-clipping-client-page');
 const form=sim?.querySelector('.app-clipping-form');
 if(!sim||!clientPage||!clippingPage||!form)return;

 const importPage=sim.querySelector('.app-clipping-import'),csvInput=importPage?.querySelector('input[type="file"]');
 csvInput?.addEventListener('change',()=>{
  const file=csvInput.files?.[0],name=importPage.querySelector('[data-import-file-name]'),preview=importPage.querySelector('[data-import-preview]'),status=importPage.querySelector('[data-import-preview-status]');
  if(name)name.textContent=file?.name||'Nenhum CSV selecionado';if(preview)preview.disabled=!file;if(status)status.hidden=true;
 });
 importPage?.querySelector('[data-import-preview]')?.addEventListener('click',async()=>{
  const file=csvInput?.files?.[0],status=importPage.querySelector('[data-import-preview-status]');if(!file||!status)return;
  const content=await file.text(),rows=content.trim()?Math.max(0,content.trim().split(/\r?\n/).length-1):0;
  status.textContent='Prévia local: '+rows+' registro(s) em '+file.name+'. A importação não foi salva.';status.hidden=false;
 });

 const clientCards=Array.from(clientPage.querySelectorAll('.app-clipping-client-card'));
 const yearCards=Array.from(sim.querySelectorAll('.app-clipping-groups .app-clipping-year-card'));
 const search=clientPage.querySelector('.app-clipping-search input');
 const clientFilter=clientPage.querySelector('.app-clipping-client-filter-backdrop');
 let selectedClient='Cleiton',selectedYear=2026,selectedClippings=new Set(),selection=false,currentClipping={subject:'Varejo',date:'19/11/2026',vehicle:'LOGOS',category:'Site, TV, Jornal',categoryShort:'Site, TV +1',tier:'Tier 1',program:'LOGOS',excerpt:'Início 01:55 · Fim 02:35 (00:40)',duration:'00:40',link:'https://al.agenciasebrae.com.br/cultura-empreendedora/vitrine-do-varejo-do-sebrae-reune-pitches-de-venda-dicas-de-marketing-e-conexoes-comerciais/',files:'1 arquivo nos detalhes'};
 const clippingsByYear={
  2026:{Cleiton:{count:1,subject:'Varejo',date:'19/11/2026',vehicle:'LOGOS',category:'Site, TV, Jornal',categoryShort:'Site, TV +1',tier:'Tier 1',program:'LOGOS',excerpt:'01:55 ➜ 02:35 (00:40)',duration:'00:40',notes: ' Dicas de marketing e conexões comerciais',attachmentName:'imagem_2026-11-24_222121300.png',attachmentType:'IMAGEM',attachmentSize:'605.9 KB',link:'https://al.agenciasebrae.com.br/cultura-empreendedora/vitrine-do-varejo-do-sebrae-reune-pitches-de-venda-dicas-de-marketing-e-conexoes-comerciais/',files:'1 arquivo nos detalhes'},João:{count:0},Maria:{count:1,subject:'Saúde',date:'14/11/2026',vehicle:'LOGOS'}},
  2025:{Cleiton:{count:0},João:{count:1,subject:'Tecnologia',date:'22/11/2025',vehicle:'LOGOS'},Maria:{count:0}}
 };
 const renderClippingYear=()=>{
  const records=clippingsByYear[selectedYear]||clippingsByYear[2026];
  clientCards.forEach(card=>{
   const name=card.querySelector('strong').textContent.trim(),record=records[name]||{count:0};
   card.querySelector('em').textContent=record.count+' clipping'+(record.count===1?'':'s')+' ('+selectedYear+')';
  });
  const total=yearCards.find(card=>card.querySelector('strong')?.textContent.trim()===String(selectedYear));
  const groupTitle=sim.querySelector('#app-screen-title');
  queueMicrotask(()=>{if(groupTitle&&sim.querySelector('.app-clipping-clients:not([hidden])'))groupTitle.textContent='Clientes '+selectedYear});
  const clippingCount=clippingPage.querySelector('.app-clipping-count');
  const row=records[selectedClient]||{count:0};
  if(clippingCount)clippingCount.textContent=row.count+' clipping(s) em '+selectedYear;
  currentClipping=row.count?{...row}:null;
   const record=clippingPage.querySelector('[data-clipping-record]'),item=record?.querySelector('.app-clipping-item'),empty=clippingPage.querySelector('.app-clipping-empty');
   record?.classList.remove('expanded');
   const cardToggle=record?.querySelector('.app-clipping-item-toggle');
   cardToggle?.setAttribute('aria-expanded','false');
   const cardIcon=cardToggle?.querySelector('i');
   cardIcon?.classList.add('fa-chevron-down');
   cardIcon?.classList.remove('fa-chevron-up');
  if(record)record.hidden=!row.count;
  if(item&&row.count){
   item.querySelector('[data-clipping-card-date-short]').textContent=(row.date||'').slice(0,5);
   item.querySelector('[data-clipping-card-vehicle]').textContent=row.vehicle||'';
   item.querySelector('[data-clipping-card-subject]').textContent=row.subject||'';
    item.querySelector('[data-clipping-card-tier]').textContent=row.tier||'Tier não definido';
    item.querySelector('[data-clipping-card-category]').textContent=(row.categoryShort||row.category||'Sem categoria')+(row.vehicle?' · '+row.vehicle:'');
    item.querySelector('[data-clipping-card-duration]').textContent=row.duration||'—';
   record.querySelector('[data-clipping-card-date]').textContent=row.date||'Não informado';
    record.querySelector('[data-clipping-card-categories]').textContent=row.category||'Não informadas';
   record.querySelector('[data-clipping-card-vehicle-detail]').textContent=row.vehicle||'Não informado';
    record.querySelector('[data-clipping-card-program]').textContent=row.program||'Não informado';
    record.querySelector('[data-clipping-card-tier-detail]').textContent=row.tier||'Tier não definido';
    record.querySelector('[data-clipping-card-duration-detail]').textContent=row.excerpt||'Não informado';
    record.querySelector('[data-clipping-card-notes]').textContent=row.notes||'Não informado';
    record.querySelector('[data-clipping-card-files]').textContent=row.files||'Nenhum arquivo anexado';
    const linkText=record.querySelector('[data-clipping-card-link-text]');
    const openLink=record.querySelector('[data-clipping-card-open-link]');
    if(linkText){linkText.textContent=row.link||'Não informado';linkText.href=row.link||'#';}
    if(openLink){openLink.href=row.link||'#';openLink.hidden=!row.link;}
  }
  if(empty)empty.hidden=!!row.count;
 };
 yearCards.forEach(card=>card.addEventListener('click',()=>{
  selectedYear=Number(card.querySelector('strong')?.textContent)||2026;
  renderClippingYear();
  const title=sim.querySelector('#app-screen-title');queueMicrotask(()=>{if(title)title.textContent='Clientes '+selectedYear});
 }));
 renderClippingYear();

 search.addEventListener('input',()=>{
  const query=search.value.trim().toLocaleLowerCase('pt-BR');
  clientCards.forEach(card=>card.hidden=!card.textContent.toLocaleLowerCase('pt-BR').includes(query));
 });
 const clippingSearch=clippingPage.querySelector('.app-clipping-search input');
 const itemsFilter=clippingPage.querySelector('.app-clipping-items-filter');
 const filterContext=itemsFilter.querySelector('[data-clipping-filter-context]');
 const selectedFilterValue=group=>itemsFilter.querySelector('[data-filter-group="'+group+'"] [data-filter-select].selected')?.dataset.filterSelect||'all';
 const parseFilterDate=value=>{
  const match=String(value||'').trim().match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
  return match?new Date(Number(match[3]),Number(match[2])-1,Number(match[1])).getTime():null;
 };
 const parseFilterDuration=value=>{
  const match=String(value||'').trim().match(/^(?:(\d+):)?(\d{1,2}):(\d{2})$/);
  return match?(Number(match[1]||0)*3600)+(Number(match[2])*60)+Number(match[3]):null;
 };
 const applyClippingFilters=()=>{
  const query=(clippingSearch?.value||'').trim().toLocaleLowerCase('pt-BR');
  const publication=selectedFilterValue('publication');
  const linkMode=selectedFilterValue('link');
  const imageMode=selectedFilterValue('image');
  const tierMode=selectedFilterValue('tier');
  const vehicleValue=(itemsFilter.querySelector('[data-filter-field="vehicle"]')?.value||'').trim().toLocaleLowerCase('pt-BR');
  const programValue=(itemsFilter.querySelector('[data-filter-field="program"]')?.value||'').trim().toLocaleLowerCase('pt-BR');
  const categoryText=(itemsFilter.querySelector('[data-filter-field="category"]')?.value||'').trim().toLocaleLowerCase('pt-BR');
  const categoryChoices=Array.from(itemsFilter.querySelectorAll('[data-filter-group="category"] [data-filter-select].selected')).map(button=>button.dataset.filterSelect.toLocaleLowerCase('pt-BR'));
  const minDuration=parseFilterDuration(itemsFilter.querySelector('[data-filter-field="duration-min"]')?.value);
  const maxDuration=parseFilterDuration(itemsFilter.querySelector('[data-filter-field="duration-max"]')?.value);
  const fromDate=parseFilterDate(itemsFilter.querySelector('[data-filter-field="date-from"]')?.value);
  const toDate=parseFilterDate(itemsFilter.querySelector('[data-filter-field="date-to"]')?.value);
  const source=currentClipping||{};
  const sourceDate=parseFilterDate(source.date);
  const duration=parseFilterDuration(source.duration||source.excerpt||'');
  const hasLink=Boolean(source.link);
  const hasImage=Boolean(source.attachmentName||source.image||source.imageUrl);
  const sourceCategories=String(source.category||source.categories||'').toLocaleLowerCase('pt-BR');
  const matchesCategories=[...categoryChoices,...(categoryText?[categoryText]:[])];
  clippingPage.querySelectorAll('[data-clipping-record]').forEach(card=>{
   let visible=!query||card.textContent.toLocaleLowerCase('pt-BR').includes(query);
   if(vehicleValue&&!String(source.vehicle||'').toLocaleLowerCase('pt-BR').includes(vehicleValue))visible=false;
   if(programValue&&!String(source.program||'').toLocaleLowerCase('pt-BR').includes(programValue))visible=false;
   if(matchesCategories.length&&!matchesCategories.some(value=>sourceCategories.includes(value)))visible=false;
   if(publication==='undated'&&sourceDate!==null)visible=false;
   if(publication==='period'&&sourceDate===null)visible=false;
   if(publication==='period'&&fromDate!==null&&sourceDate!==null&&sourceDate<fromDate)visible=false;
   if(publication==='period'&&toDate!==null&&sourceDate!==null&&sourceDate>toDate)visible=false;
   if(tierMode!=='all'&&String(source.tier||'').toLocaleLowerCase('pt-BR')!==tierMode.replace('-',' ').toLocaleLowerCase('pt-BR'))visible=false;
   if((minDuration!==null||maxDuration!==null)&&(duration===null||(minDuration!==null&&duration<minDuration)||(maxDuration!==null&&duration>maxDuration)))visible=false;
   if(linkMode==='with'&&!hasLink)visible=false;
   if(linkMode==='without'&&hasLink)visible=false;
   if(imageMode==='selected'&&!hasImage)visible=false;
   if(imageMode==='unselected'&&hasImage)visible=false;
   card.hidden=!visible;
  });
 };
 clippingPage.querySelector('.app-clipping-filter-open').onclick=()=>{
  if(filterContext)filterContext.textContent=selectedYear+' · '+selectedClient;
  itemsFilter.hidden=false;
 };
 itemsFilter.querySelector('.app-clipping-items-filter-close').onclick=()=>itemsFilter.hidden=true;
 itemsFilter.addEventListener('click',event=>{if(event.target===itemsFilter)itemsFilter.hidden=true});
 itemsFilter.querySelectorAll('[data-filter-select]').forEach(button=>button.addEventListener('click',()=>{
  const group=button.closest('[data-filter-group]');
  if(!group)return;
  if(group.dataset.filterMode==='multiple'){
   button.classList.toggle('selected');
  }else{
   group.querySelectorAll('[data-filter-select]').forEach(option=>option.classList.toggle('selected',option===button));
  }
  const periodFields=itemsFilter.querySelector('[data-filter-period-fields]');
  if(periodFields)periodFields.hidden=selectedFilterValue('publication')!=='period';
 }));
 const tierToggle=itemsFilter.querySelector('[data-filter-tier-toggle]');
 tierToggle?.addEventListener('click',()=>{
  const choices=itemsFilter.querySelector('[data-filter-tier-choices]');
  if(choices)choices.hidden=!choices.hidden;
  tierToggle.setAttribute('aria-expanded',String(Boolean(choices&&!choices.hidden)));
 });
 clippingSearch?.addEventListener('input',applyClippingFilters);
 itemsFilter.querySelector('.app-clipping-items-filter-clear').onclick=()=>{
  itemsFilter.querySelectorAll('input').forEach(input=>input.value='');
  itemsFilter.querySelectorAll('[data-filter-select]').forEach(button=>button.classList.toggle('selected',button.hasAttribute('data-filter-default')));
  const choices=itemsFilter.querySelector('[data-filter-tier-choices]');
  if(choices)choices.hidden=true;
  if(tierToggle)tierToggle.setAttribute('aria-expanded','false');
  const periodFields=itemsFilter.querySelector('[data-filter-period-fields]');
  if(periodFields)periodFields.hidden=true;
  applyClippingFilters();
  itemsFilter.hidden=true;
 };
 itemsFilter.querySelector('.app-clipping-items-filter-apply').onclick=()=>{
  applyClippingFilters();
  itemsFilter.hidden=true;
 };
 clientPage.querySelector('.app-clipping-filter-open').onclick=()=>clientFilter.hidden=false;
 clientPage.querySelector('.app-clipping-filter-close').onclick=()=>clientFilter.hidden=true;
 clientFilter.addEventListener('click',event=>{if(event.target===clientFilter)clientFilter.hidden=true});
 clientFilter.querySelectorAll('.app-clipping-filter-status button').forEach(button=>button.onclick=()=>{
  clientFilter.querySelectorAll('.app-clipping-filter-status button').forEach(item=>item.classList.toggle('selected',item===button));
 });
 clientFilter.querySelector('.app-clipping-filter-clear').onclick=()=>{
  clientFilter.querySelectorAll('input').forEach(input=>input.value='');
  clientFilter.querySelectorAll('.app-clipping-filter-status button').forEach((button,index)=>button.classList.toggle('selected',index===2));
  clientFilter.hidden=true;
 };
 clientFilter.querySelector('.app-clipping-filter-apply').onclick=()=>{clientFilter.hidden=true};

 clientCards.forEach(card=>card.addEventListener('click',()=>{
  selectedClient=card.querySelector('strong').textContent.trim();
  renderClippingYear();
  const title=sim.querySelector('#app-screen-title');
  queueMicrotask(()=>{if(title)title.textContent=selectedClient});
 }));

 const selectButton = clippingPage.querySelector('.app-clipping-select-trigger');
const selectionBar = clippingPage.querySelector('.app-clipping-selection-bar');
const selectAllButton = clippingPage.querySelector('.app-clipping-select-all');
const cancelSelectionButton = clippingPage.querySelector('.app-clipping-cancel-selection');
const exportButton = clippingPage.querySelector('.app-clipping-export-selected');
const clippingCards = Array.from(
  clippingPage.querySelectorAll('[data-clipping-record]')
);

const renderSelection = () => {
  clippingPage.classList.toggle('selection-mode', selection);
  selectButton.hidden = selection;
  selectionBar.hidden = !selection;
  exportButton.hidden = !selection;

  selectionBar.querySelector('strong').textContent =
    selectedClippings.size + ' de 100 selecionado(s)';

  exportButton.textContent =
    'EXPORTAR SELECIONADOS (' + selectedClippings.size + ')';
  exportButton.disabled = selectedClippings.size === 0;

  clippingCards.forEach(card => {
    const checkbox = card.querySelector('.app-clipping-card-checkbox');
    const isSelected = selectedClippings.has(card);

    card.classList.toggle('selected', isSelected);
    if (checkbox) checkbox.checked = isSelected;
  });
};

const toggleCardSelection = card => {
  if (selectedClippings.has(card)) {
    selectedClippings.delete(card);
  } else {
    selectedClippings.add(card);
  }

  renderSelection();
};

selectButton.addEventListener('click', () => {
  selection = true;
  selectedClippings.clear();

  clippingCards.forEach(card => {
    card.classList.remove('expanded');
    const toggle = card.querySelector('.app-clipping-item-toggle');
    toggle?.setAttribute('aria-expanded', 'false');
  });

  renderSelection();
});

cancelSelectionButton.addEventListener('click', () => {
  selection = false;
  selectedClippings.clear();
  renderSelection();
});

selectAllButton.addEventListener('click', () => {
  const visibleCards = clippingCards.filter(card => !card.hidden);
  const allSelected =
    visibleCards.length > 0 &&
    visibleCards.every(card => selectedClippings.has(card));

  visibleCards.forEach(card => {
    if (allSelected) {
      selectedClippings.delete(card);
    } else {
      selectedClippings.add(card);
    }
  });

  renderSelection();
});

clientCards.forEach(card => card.addEventListener('click', () => {
  selectedClient = card.querySelector('strong').textContent.trim();
  renderClippingYear();

  const title = sim.querySelector('#app-screen-title');
  queueMicrotask(() => {
    if (title) title.textContent = selectedClient;
  });
}));

clippingCards.forEach(card => {
  const summary = card.querySelector('.app-clipping-item');
  const toggle = card.querySelector('.app-clipping-item-toggle');
  const checkbox = card.querySelector('.app-clipping-card-checkbox');

  toggle.addEventListener('click', event => {
    event.stopPropagation();
    if (selection) return;

    const expanded = card.classList.toggle('expanded');
    toggle.setAttribute('aria-expanded', String(expanded));

    const icon = toggle.querySelector('i');
    icon.classList.toggle('fa-chevron-down', !expanded);
    icon.classList.toggle('fa-chevron-up', expanded);
  });

  checkbox.addEventListener('click', event => event.stopPropagation());

  checkbox.addEventListener('change', () => {
    if (!selection) return;

    if (checkbox.checked) {
      selectedClippings.add(card);
    } else {
      selectedClippings.delete(card);
    }

    renderSelection();
  });

  summary.addEventListener('click', event => {
    if (!selection || event.target.closest('.app-clipping-item-toggle, .app-clipping-card-checkbox')) {
      return;
    }

    toggleCardSelection(card);
  });
});

renderSelection();

const dateInput = form.elements.namedItem('date');
const yearLabel = form.querySelector('[data-clipping-year-label]');
const yearNote = form.querySelector('[data-clipping-year-note]');
const yearControl = form.querySelector('.app-clipping-year-selector button');

const updateYearFromDate = () => {
  const match = (dateInput?.value || '').match(/^\d{2}\/\d{2}\/(\d{4})$/);
  const year = match ? match[1] : String(selectedYear || 2026);

  if (yearLabel) yearLabel.textContent = year;

  if (yearNote) {
    yearNote.textContent = match
      ? `O clipping será agrupado em ${year}, conforme a data da publicação.`
      : `Sem data de publicação, o clipping ficará em ${year}.`;
  }
};

dateInput?.addEventListener('input', updateYearFromDate);

const startInput = form.elements.namedItem('start');
const endInput = form.elements.namedItem('end');
const durationNote = form.querySelector('[data-clipping-duration-note]');

const updateClippingDuration = () => {
  if (!durationNote) return;

  const parseTime = value => {
    const parts = (value || '').split(':').map(Number);

    if ((parts.length !== 2 && parts.length !== 3) || parts.some(Number.isNaN)) {
      return null;
    }

    return parts.length === 2
      ? parts[0] * 60 + parts[1]
      : parts[0] * 3600 + parts[1] * 60 + parts[2];
  };

  const start = parseTime(startInput?.value);
  const end = parseTime(endInput?.value);

  if (start === null || end === null || end < start) {
    durationNote.innerHTML =
      'A duração será calculada com início e fim válidos.<br>' +
      'Ex.: 02:10 (2min e 10seg) ou 01:05:30 para incluir horas.';
    return;
  }

  const total = end - start;
  const hours = Math.floor(total / 3600);
  const minutes = Math.floor((total % 3600) / 60);
  const seconds = total % 60;

  const duration = hours
    ? [hours, minutes, seconds].map(value => String(value).padStart(2, '0')).join(':')
    : [minutes, seconds].map(value => String(value).padStart(2, '0')).join(':');

  durationNote.innerHTML =
    `Duração do trecho: ${duration}<br>` +
    'Ex.: 02:10 (2min e 10seg) ou 01:05:30 para incluir horas.';
};

startInput?.addEventListener('input', updateClippingDuration);
endInput?.addEventListener('input', updateClippingDuration);

 form.addEventListener('submit',event=>event.preventDefault());
 
 const editClipping=sim.querySelector('.app-clipping-details [data-screen="editar-clipping"]');
 editClipping?.addEventListener('click',()=>{
  selectedClient=selectedClient||'Cleiton';

  const source=currentClipping||{};
  const reference=selectedClient==='Cleiton'&&selectedYear===2026?{
   link:'https://al.agenciasebrae.com.br/cultura-empreendedora/vitrine-do-varejo-do-sebrae-reune-pitches-de-venda-dicas-de-marketing-e-conexoes-comerciais/',
   program:'LOGOS',
   categories:'Site, TV, Jornal',
   tier:'Tier 1',
   start:'01:55',
   end:'02:35',
   notes:'Dicas de marketing e conexões comerciais'
  }:{};
  const timeRange=(source.excerpt||source.snippet||'').match(/(\d{2}:\d{2})\s*(?:➜|→|–|-)\s*(\d{2}:\d{2})/);
  const values={
   subject:source.subject||'',
   date:source.date||'',
   link:source.link||reference.link||'',
   vehicle:source.vehicle||'LOGOS',
   program:source.program||reference.program||'',
   categories:source.category||source.categories||reference.categories||'',
   start:source.start||timeRange?.[1]||reference.start||'',
   end:source.end||timeRange?.[2]||reference.end||'',
   notes:(source.notes||reference.notes||'').trim()
  };

  form.classList.add('is-editing');
  form.querySelector('[data-clipping-selected-client]').textContent=selectedClient;
  Object.entries(values).forEach(([name,value])=>{
   const input=form.elements.namedItem(name);
   if(input)input.value=value;
  });

  if(yearControl){
   yearControl.textContent='Pela data';
   yearControl.disabled=true;
   yearControl.removeAttribute('data-open');
  }

  const suggestion=form.querySelector('[data-clipping-subject-suggestion]');
  const suggestionText=form.querySelector('[data-clipping-subject-suggestion-text]');
  if(suggestionText)suggestionText.textContent=values.subject;
  if(suggestion)suggestion.hidden=!values.subject;

  const categories=new Set(values.categories.split(',').map(value=>value.trim().toLocaleLowerCase('pt-BR')));
  form.querySelectorAll('.app-clipping-category-chips button').forEach(button=>{
   const name=button.textContent.replace(/^\+\s*/,'').trim().toLocaleLowerCase('pt-BR');
   button.classList.toggle('selected',categories.has(name));
  });

  const tier=source.tier||reference.tier||'Não definido';
  form.querySelectorAll('.app-clipping-tier-options button').forEach(button=>{
   const name=button.textContent.replace(/[◉○]/g,'').trim();
   button.classList.toggle('selected',name===tier);
  });

  renderVehicleCard(values.vehicle);
  form.querySelectorAll('[data-clear-field]').forEach(button=>{
   button.hidden=!form.elements.namedItem(button.dataset.clearField)?.value;
  });

  updateLinkActions();
  updateYearFromDate();
  updateClippingDuration();
 });

 sim.querySelectorAll('button[data-screen="novo-clipping"]').forEach(button=>{
  button.addEventListener('click',()=>{
   form.classList.remove('is-editing');
   if(yearControl){
    yearControl.textContent='Alterar';
    yearControl.disabled=false;
    yearControl.dataset.open='clipping-year';
   }
   const suggestion=form.querySelector('[data-clipping-subject-suggestion]');
   if(suggestion)suggestion.hidden=true;
  });
 });

 form.querySelectorAll('[data-clear-field]').forEach(button=>{
  const input=form.elements.namedItem(button.dataset.clearField),update=()=>{button.hidden=!input?.value};
  input?.addEventListener('input',update);
  button.addEventListener('click',()=>{
   if(input){
    input.value='';
    input.dispatchEvent(new Event('input',{bubbles:true}));
    input.focus();
   }
   update();
  });
  update();
 });
 const picker=form.querySelector('.app-clipping-client-picker');
 const syncClippingClientOptions=()=>{
  form.querySelectorAll('.app-clipping-pick-client').forEach(button=>{
   const name=button.dataset.clientName||button.textContent.replace('✓','').trim();
   button.classList.toggle('selected',name===selectedClient);
  });
 };
 form.querySelector('.app-clipping-client-open').onclick=()=>{
  syncClippingClientOptions();
  picker.hidden=false;
 };
 form.querySelector('.app-clipping-client-close').onclick=()=>picker.hidden=true;
 form.querySelectorAll('.app-clipping-pick-client').forEach(button=>button.onclick=()=>{
  selectedClient=button.dataset.clientName||button.textContent.replace('✓','').trim();
  syncClippingClientOptions();
  form.querySelector('[data-clipping-selected-client]').textContent=selectedClient;
  picker.hidden=true;
 });

 const dataModal=form.querySelector('.app-clipping-data-modal');
 const linkInput=form.elements.namedItem('link'),searchData=form.querySelector('.app-clipping-search-data'),captureOpen=form.querySelector('.app-clipping-capture-open');
 const updateLinkActions=()=>{const enabled=Boolean(linkInput?.value.trim());if(searchData)searchData.disabled=!enabled;if(captureOpen)captureOpen.disabled=!enabled};
 linkInput?.addEventListener('input',updateLinkActions);updateLinkActions();
 const renderVehicleCard = vehicle => {
  const card = form.querySelector('.app-clipping-vehicle-card');
  const isLogos = vehicle === 'LOGOS';

  if (!card) return;

  card.querySelector('strong').textContent = isLogos ? 'LOGOS' : 'gov';
  card.querySelector('small').textContent = 'Tier não definido';

  const details = card.querySelectorAll('p');

  if (details[0]) {
    details[0].innerHTML =
      '<b>Descrição</b><span>' +
      (isLogos ? 'Canal de notícias da LOGOS' : 'Descrição não informada.') +
      '</span>';
  }

  if (details[1]) {
    details[1].innerHTML =
      '<b>Alcance</b><span>' +
      (isLogos ? '500 mil leitores' : 'Alcance não informado.') +
      '</span>';
  }

  if (details[2]) {
    const domain = isLogos ? 'logos.com.br' : 'gov.br';

    details[2].innerHTML =
      '<b>Endereços associados' +
        '<i class="fa-solid fa-rotate app-clipping-vehicle-refresh" aria-hidden="true"></i>' +
      '</b>' +
      '<span class="app-clipping-vehicle-address">' +
        '<i class="fa-solid fa-globe" aria-hidden="true"></i>' +
        '<span><span>' + domain + '</span><small>Site inteiro</small></span>' +
        '<i class="fa-solid fa-arrow-up-right-from-square" aria-hidden="true"></i>' +
      '</span>';
  }

  details.forEach(detail => {
    detail.hidden = true;
  });

  card.classList.remove('is-expanded');
  card.setAttribute('aria-expanded', 'false');

  const toggleLabel = card.querySelector('[data-vehicle-toggle-label]');
  if (toggleLabel) toggleLabel.textContent = 'Ver detalhes';

  const chevron = card.querySelector('.app-clipping-vehicle-chevron');
  chevron?.classList.remove('fa-chevron-up');
  chevron?.classList.add('fa-chevron-down');
  card.hidden = false;
};

const vehicleCard = form.querySelector('.app-clipping-vehicle-card');

vehicleCard?.addEventListener('click', event => {
  event.preventDefault();

  const expanded = vehicleCard.getAttribute('aria-expanded') !== 'true';

  vehicleCard.classList.toggle('is-expanded', expanded);
  vehicleCard.setAttribute('aria-expanded', String(expanded));

  vehicleCard.querySelectorAll('p').forEach(detail => {
    detail.hidden = !expanded;
  });

  const toggleLabel = vehicleCard.querySelector('[data-vehicle-toggle-label]');
  if (toggleLabel) {
    toggleLabel.textContent = expanded ? 'Recolher detalhes' : 'Ver detalhes';
  }

  const chevron = vehicleCard.querySelector('.app-clipping-vehicle-chevron');
  chevron?.classList.toggle('fa-chevron-up', expanded);
  chevron?.classList.toggle('fa-chevron-down', !expanded);
});
 form.querySelector('.app-clipping-search-data').onclick=()=>dataModal.hidden=false;
 form.querySelector('.app-clipping-data-close').onclick=()=>dataModal.hidden=true;
 const fillFields=all=>{
  const values={link:'https://www.gov.br/igualdaderacial/pt-br/assuntos/noticias/ministerio-da-igualdade-racial-conecta-participacao-comunitaria-e-combate-ao-racismo-ambiental-na-cop31',subject:'Ministério da Igualdade Racial conecta participação comunitária e combate ao racismo ambiental na COP31',date:'13/11/2026',vehicle:'gov'};
  Object.entries(values).forEach(([name,value])=>{
   const input=form.elements.namedItem(name);
   if(input&&(all||!input.value))input.value=value;
  });
  updateLinkActions();
  form.querySelectorAll('[data-clear-field]').forEach(button=>{button.hidden=!form.elements.namedItem(button.dataset.clearField)?.value});
  renderVehicleCard(form.elements.namedItem('vehicle').value);
  dataModal.hidden=true;
 };
 form.querySelector('.app-clipping-insert-all').onclick=()=>fillFields(true);
 form.querySelector('.app-clipping-fill-empty').onclick=()=>fillFields(false);
 form.querySelector('.app-clipping-capture-open').onclick=()=>form.querySelector('.app-clipping-capture-modal').hidden=false;
 const capture=form.querySelector('.app-clipping-capture-modal'),captureCanvas=capture.querySelector('[data-capture-canvas]'),captureSelection=capture.querySelector('.app-capture-selection');
 let captureStart=null,captureZoom=100,captureSegment=1,captureMode='crop';
 form.querySelectorAll('.app-clipping-capture-close').forEach(button=>button.onclick=()=>capture.hidden=true);
 form.querySelector('.app-clipping-capture-reset').onclick=event=>{event.preventDefault();captureSelection.hidden=true;captureSelection.style.cssText='';capture.querySelector('[data-capture-use]').disabled=true};
 capture.querySelectorAll('.app-clipping-capture-tools>button').forEach((button,index)=>button.onclick=()=>{captureMode=index?'navigate':'crop';capture.querySelectorAll('.app-clipping-capture-tools>button').forEach(x=>x.classList.toggle('selected',x===button));captureCanvas.classList.toggle('is-navigating',captureMode==='navigate')});
 capture.querySelectorAll('[data-capture-zoom]').forEach(button=>button.onclick=()=>{captureZoom=Math.max(70,Math.min(150,captureZoom+Number(button.dataset.captureZoom)*10));capture.querySelector('.app-clipping-capture-tools>div span').textContent=captureZoom+'%';capture.querySelector('.app-capture-page').style.transform='scale('+(captureZoom/100)+')'});
 captureCanvas.addEventListener('pointerdown',event=>{if(captureMode!=='crop')return;const bounds=captureCanvas.getBoundingClientRect();captureStart={x:event.clientX-bounds.left,y:event.clientY-bounds.top};captureSelection.hidden=false;captureSelection.style.left=captureStart.x+'px';captureSelection.style.top=captureStart.y+'px';captureSelection.style.width='0';captureSelection.style.height='0';captureCanvas.setPointerCapture(event.pointerId)});
 captureCanvas.addEventListener('pointermove',event=>{if(!captureStart)return;const bounds=captureCanvas.getBoundingClientRect(),x=Math.max(0,Math.min(bounds.width,event.clientX-bounds.left)),y=Math.max(0,Math.min(bounds.height,event.clientY-bounds.top));captureSelection.style.left=Math.min(captureStart.x,x)+'px';captureSelection.style.top=Math.min(captureStart.y,y)+'px';captureSelection.style.width=Math.abs(x-captureStart.x)+'px';captureSelection.style.height=Math.abs(y-captureStart.y)+'px'});
 captureCanvas.addEventListener('pointerup',()=>{if(!captureStart)return;captureStart=null;const valid=parseFloat(captureSelection.style.width)>12&&parseFloat(captureSelection.style.height)>12;capture.querySelector('[data-capture-use]').disabled=!valid});
 capture.querySelector('[data-capture-next]').onclick=()=>{captureSegment++;capture.querySelector('[data-capture-segment]').textContent=String(captureSegment);capture.querySelector('.app-capture-pagination button:first-child').disabled=false};
 capture.querySelector('.app-capture-pagination button:first-child').onclick=()=>{captureSegment=Math.max(1,captureSegment-1);capture.querySelector('[data-capture-segment]').textContent=String(captureSegment);capture.querySelector('.app-capture-pagination button:first-child').disabled=captureSegment===1};
 capture.querySelector('[data-capture-use]').onclick=()=>{if(!capture.querySelector('[data-capture-use]').disabled){form.querySelector('.app-clipping-attachments>div').textContent='▧　Captura adicionada';capture.hidden=true}};
 form.querySelectorAll('.app-clipping-category-chips button').forEach(button=>button.onclick=()=>{
  const category=button.textContent.replace(/^\+\s*/,'');
  const input=form.elements.namedItem('categories');
  const current=input.value.split(',').map(value=>value.trim()).filter(Boolean);
  const index=current.indexOf(category);
  if(index>=0)current.splice(index,1);else current.push(category);
  input.value=current.join(', ');
  button.classList.toggle('selected',index<0);
 });
 form.querySelectorAll('.app-clipping-tier-options button').forEach(button=>button.onclick=()=>{
  form.querySelectorAll('.app-clipping-tier-options button').forEach(item=>item.classList.toggle('selected',item===button));
 });
 form.querySelector('.app-clipping-delete')?.addEventListener('click',event=>event.preventDefault());
 form.querySelectorAll('button').forEach(button=>{
  if(button.textContent.includes('SALVAR'))button.onclick=event=>event.preventDefault();
 });
 sim.querySelector('.app-clipping-details .app-clipping-delete').onclick=event=>event.preventDefault();
 form.querySelector('.app-clipping-vehicle-card').hidden=true;
  sim.querySelectorAll('.app-clipping-items [data-screen="detalhes-clipping"]').forEach(button=>button.addEventListener('click',()=>{
  sim.querySelector('#app-screen-title').textContent='Detalhes';
  if(!currentClipping)return;
  const detail = sim.querySelector('.app-clipping-details');
const setDetailText = (selector, value) => {
  const element = detail.querySelector(selector);
  if (element) element.textContent = value;
};

const vehicle = currentClipping.vehicle || 'Não informado';
const vehicleInfo = vehicle.toUpperCase() === 'LOGOS'
  ? { description: 'Canal de notícias da LOGOS', reach: '500 mil leitores' }
  : { description: 'Não informada', reach: 'Não informado' };

setDetailText('[data-detail-client]', selectedClient);
setDetailText('[data-detail-year]', String(selectedYear));
setDetailText('[data-detail-subject]', currentClipping.subject || 'Sem pauta');
setDetailText('[data-detail-date]', currentClipping.date || 'Não informado');
setDetailText('[data-detail-vehicle]', vehicle);
setDetailText('[data-detail-program]', currentClipping.program || 'Não informado');
const categoryList = detail.querySelector('[data-detail-categories]');
const categories = (currentClipping.category || '')
  .split(',')
  .map(value => value.trim())
  .filter(Boolean);

categoryList.replaceChildren(
  ...categories.map(category => {
    const chip = document.createElement('span');
    chip.textContent = category;
    return chip;
  })
);
setDetailText('[data-detail-tier]', currentClipping.tier || 'Sem Tier');
setDetailText(
  '[data-detail-excerpt]',
  currentClipping.excerpt || currentClipping.snippet || 'Não informado'
);
const publicationUrl = currentClipping.link || '#';
const publicationLink = detail.querySelector('[data-detail-link]');
const openPublication = detail.querySelector('[data-detail-open-link]');

publicationLink.textContent = currentClipping.link || 'Sem link informado';
publicationLink.href = publicationUrl;
openPublication.href = publicationUrl;
openPublication.hidden = !currentClipping.link;

const attachmentName = currentClipping.attachmentName || '';
const attachmentCard = detail.querySelector('.app-clipping-detail-attachment-card');
const attachmentCount = detail.querySelector('[data-detail-attachment-count]');

attachmentCard.hidden = !attachmentName;
attachmentCount.textContent = attachmentName ? '1' : '0';

setDetailText('[data-detail-attachment-name]', attachmentName);
setDetailText('[data-detail-attachment-type]', currentClipping.attachmentType || '');
setDetailText('[data-detail-attachment-size]', currentClipping.attachmentSize || '');
setDetailText(
  '[data-detail-notes]',
  currentClipping.notes || 'Nenhuma observação adicionada.'
);
setDetailText('[data-detail-vehicle-description]', vehicleInfo.description);
setDetailText('[data-detail-vehicle-reach]', vehicleInfo.reach);

const vehicleToggle = sim.querySelector('.app-clipping-detail-vehicle-toggle');
const vehicleExtra = sim.querySelector('.app-clipping-detail-vehicle-extra');

vehicleToggle?.addEventListener('click', () => {
  const expanded = vehicleExtra.hidden;
  vehicleExtra.hidden = !expanded;
  vehicleToggle.setAttribute('aria-expanded', String(expanded));

  const icon = vehicleToggle.querySelector('i');
  icon?.classList.toggle('fa-chevron-down', !expanded);
  icon?.classList.toggle('fa-chevron-up', expanded);
});
 }));
})();

/* Simulador LOGOS — biblioteca e editor demonstrativo de templates */
(() => {
 const sim=document.querySelector('.app-simulator'),library=document.querySelector('.app-templates'),preview=document.querySelector('.app-template-preview'),editor=document.querySelector('.app-template-editor');
 if(!sim||!library||!preview||!editor)return;
 const catalog={
  simples:{name:'Release simples',blocks:['Título','Linha fina','Texto','Divisor','Contato de imprensa']},
  imagem:{name:'Release com imagem',blocks:['Imagem / logo','Título','Linha fina','Texto','Divisor','Contato de imprensa']},
  aviso:{name:'Aviso de pauta',blocks:[{type:'Título',value:'Título do aviso de pauta'},{type:'Texto',value:'Apresente o evento e os destaques para a imprensa.'},{type:'Texto',value:'Serviço\nData e horário\nLocal e endereço\nInformações para participação'},'Divisor','Contato de imprensa']}
 };
 let currentId='simples',copyMode=false,selectedChoice='',blocks=[],custom=[];
 const nameInput=editor.querySelector('#app-template-name'), list=editor.querySelector('#app-template-block-list');
 const defaults={Título:'Título da matéria', 'Linha fina':'Uma apresentação breve da matéria.',Texto:'Escreva aqui o conteúdo da matéria.', 'Contato de imprensa':'Nome, telefone e e-mail da assessoria.', 'Imagem / logo':'Imagem da matéria', 'Botão com link':'Acessar conteúdo',Arquivo:'Baixar arquivo',Divisor:'Bloco de separação',Espaçamento:'Espaçamento'};
 const summary=(type)=>defaults[type]||'Toque para editar';
 const updateCount=()=>{editor.querySelector('#app-template-block-count').textContent=blocks.length;editor.querySelector('#app-template-current-name').textContent=nameInput.value||'Novo template'};
 const renderBlocks=()=>{
  list.innerHTML='';
  editor.querySelector('.app-template-empty-blocks').hidden=blocks.length>0;
  blocks.forEach((b,i)=>{
   const row=document.createElement('div');row.className='app-template-block-row';
   row.innerHTML='<div class="app-template-block-head"><button type="button" class="edit-block"><span></span><small></small></button><button type="button" class="move" data-move="-1" aria-label="Mover para cima">↑</button><button type="button" class="move" data-move="1" aria-label="Mover para baixo">↓</button></div><div class="app-template-block-edit" hidden></div>';
   const editButton=row.querySelector('.edit-block'),panel=row.querySelector('.app-template-block-edit');
   editButton.querySelector('span').textContent=b.type;
   const input=(label,key,placeholder='',multiline=true)=>{
    const wrap=document.createElement('label');wrap.textContent=label;
    const field=document.createElement(multiline?'textarea':'input');field.className='block-value';field.dataset.blockField=key;
    if(!multiline)field.type='text';field.placeholder=placeholder;field.value=b[key]||'';
    wrap.appendChild(field);panel.appendChild(wrap);return field;
   };
   const url=(label,key,placeholder='https://...')=>{const field=input(label,key,placeholder,false);field.inputMode='url';return field};
   if(b.type==='Imagem / logo'){
    input('DESCRIÇÃO DA IMAGEM','description','Escreva aqui...');
    const picker=document.createElement('div');picker.className='app-template-file-picker';
    picker.innerHTML='<span>▧</span><div><strong></strong><small>JPG, PNG ou WEBP · até 5 MB</small></div><input type="file" accept="image/jpeg,image/png,image/webp" hidden>';
    picker.querySelector('strong').textContent=b.fileName||'Imagem / logo';
    const file=picker.querySelector('input');file.onchange=()=>{b.fileName=file.files?.[0]?.name||'';picker.querySelector('strong').textContent=b.fileName||'Imagem / logo'};
    const pick=document.createElement('button');pick.type='button';pick.className='app-template-upload';pick.textContent='＋ CARREGAR IMAGEM';pick.onclick=()=>file.click();panel.append(picker,pick);
    url('OU USE UM LINK DE IMAGEM','imageUrl');input('LEGENDA','caption','');
   }else if(b.type==='Arquivo'){
    input('ARQUIVO','value','Nome do arquivo',false);url('LINK DE DESTINO','url');
   }else if(b.type==='Botão com link'){
    input('TEXTO DO BOTÃO','value','Acessar conteúdo',false);url('LINK DE DESTINO','url');
   }else if(b.type==='Divisor'||b.type==='Espaçamento'){
    const note=document.createElement('p');note.className='app-template-block-note';note.textContent=b.type==='Divisor'?'Uma linha fina será exibida neste ponto.':'Um espaço será adicionado entre os blocos.';panel.appendChild(note);
   }else{
    const labels={Título:'TÍTULO','Linha fina':'LINHA FINA',Texto:'TEXTO','Contato de imprensa':'CONTATO DE IMPRENSA'};
    input(labels[b.type]||'CONTEÚDO','value',b.type==='Título'?'Título':'Escreva aqui...');
   }
   const actions=document.createElement('div');actions.className='app-template-block-actions';
   actions.innerHTML='<button type="button" class="remove-block">▤　REMOVER</button><button type="button" class="complete-block">✓　CONCLUIR</button>';panel.appendChild(actions);
   const expanded=Boolean(b.editing);panel.hidden=!expanded;
   editButton.querySelector('small').textContent=expanded?'Toque para fechar':'Toque para editar';
   editButton.onclick=()=>{b.editing=!b.editing;renderBlocks()};
   panel.querySelector('.complete-block').onclick=()=>{panel.querySelectorAll('[data-block-field]').forEach(field=>{b[field.dataset.blockField]=field.value});b.editing=false;renderBlocks()};
   panel.querySelector('.remove-block').onclick=()=>{blocks.splice(i,1);renderBlocks()};
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
    const image=document.createElement('div');image.className=thumbnail?'app-template-thumb-image':'app-template-preview-image';
    if(block.imageUrl){const img=document.createElement('img');img.src=block.imageUrl;img.alt=block.caption||block.description||'';image.appendChild(img)}else image.textContent='▧　'+(block.description||'Imagem da matéria');
    container.appendChild(image);if(block.caption){const caption=document.createElement('small');caption.textContent=block.caption;container.appendChild(caption)}return;
   }
   if(type==='Arquivo'||type==='Botão com link'){
    const link=document.createElement('a');link.className='app-template-preview-link';link.textContent=value;link.href=block.url||'#';link.addEventListener('click',e=>e.preventDefault());container.appendChild(link);return;
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
  card.classList.toggle('app-template-agenda-preview',id==='aviso');
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
  editor.querySelector('.app-template-empty-blocks').hidden=isPreview||blocks.length>0;
  editor.querySelector('.app-template-block-count').hidden=isPreview;editor.querySelector('#app-template-editor-preview').hidden=!isPreview;
  if(isPreview)renderPreview(editor.querySelector('#app-template-editor-preview'));
 });
 editor.querySelector('.app-template-add-block').onclick=()=>{selectedChoice='';editor.querySelectorAll('[data-block-choice]').forEach(x=>x.classList.remove('selected'));editor.querySelector('.app-template-add-modal').hidden=false};
 editor.querySelectorAll('[data-action=close-block-modal]').forEach(b=>b.onclick=()=>editor.querySelector('.app-template-add-modal').hidden=true);
 editor.querySelectorAll('[data-block-choice]').forEach(b=>b.onclick=()=>{selectedChoice=b.dataset.blockChoice;editor.querySelectorAll('[data-block-choice]').forEach(x=>x.classList.toggle('selected',x===b))});
 editor.querySelector('[data-action=insert-block]').onclick=()=>{if(selectedChoice&&blocks.length<100){blocks.push({type:selectedChoice,value:summary(selectedChoice)});renderBlocks()}editor.querySelector('.app-template-add-modal').hidden=true};
 nameInput.oninput=updateCount;
 editor.querySelector('[data-action=save-template]').onclick=()=>{
  const name=nameInput.value.trim();
  if(!name){nameInput.focus();nameInput.style.borderColor='#ef4148';return}
  nameInput.style.borderColor='';
  const id='assessoria-'+Date.now(),item={id,name,blocks:blocks.map(block=>({...block,editing:false}))};
  custom.unshift(item);
  const card=document.createElement('article');card.className='app-template-card';card.dataset.templateCard='';card.dataset.templateId=id;card.dataset.templateName=name;card.dataset.templateOrigin='assessoria';
  const thumb=document.createElement('div');thumb.className='app-template-thumb';renderBlockList(thumb,normalizedBlocks(item),{thumbnail:true});
  const title=document.createElement('h4');title.textContent=name;
  const origin=document.createElement('p');origin.textContent='Da assessoria';
  const previewButton=document.createElement('button');previewButton.type='button';previewButton.dataset.templateAction='preview';previewButton.dataset.screen='preview-template';previewButton.dataset.templateId=id;previewButton.textContent='◉ VER PRÉVIA';
  const copyButton=document.createElement('button');copyButton.type='button';copyButton.dataset.templateAction='copy';copyButton.dataset.screen='editar-copia-template';copyButton.dataset.templateId=id;copyButton.textContent='▢ CRIAR CÓPIA';
  card.append(thumb,title,origin,previewButton,copyButton);library.querySelector('.app-template-grid').prepend(card);
  window.dispatchEvent(new CustomEvent('logos-demo-template-saved',{detail:item}));
  currentId=id;copyMode=false;filter();sim.querySelector('button[data-screen="templates"]')?.click();
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



/* Mailing demonstrativo: busca, filtros e seleção locais. O formulário não persiste. */
(()=>{
 const sim=document.querySelector('.app-simulator'), view=sim?.querySelector('.app-mailing-list');
 if(!sim||!view)return;
 const q=view.querySelector('.app-mailing-search input'), card=view.querySelector('.app-mailing-contact-card');
 const count=view.querySelector('.app-mailing-list-heading>span'), filter=view.querySelector('.app-mailing-filter-backdrop');
 const trigger=view.querySelector('.app-mailing-select-trigger'), bar=view.querySelector('.app-mailing-selection-bar');
 const selectedCount=bar?.querySelector('strong'), checkbox=card?.querySelector('.app-mailing-checkbox');
 const form=sim.querySelector('.app-contact-form'), details=sim.querySelector('.app-contact-details');
 const demo={name:'Ademilson',email:'ademilson@example.com',phone:'',job:'Editor',state:'São Paulo',city:'Itajubá',notes:'',vehicle:'LOGOS'};
 let selecting=false, selected=false;
 const applySearch=()=>{const hit=!q?.value||Object.values(demo).join(' ').toLowerCase().includes(q.value.toLowerCase());if(card)card.hidden=!hit;if(count)count.textContent=hit?'1 contato':'0 contatos'};
 q?.addEventListener('input',applySearch); view.querySelector('.app-mailing-search button')?.addEventListener('click',applySearch);
 view.querySelector('.app-mailing-filter-open')?.addEventListener('click',()=>filter.hidden=false);
 view.querySelectorAll('.app-mailing-filter-close').forEach(b=>b.addEventListener('click',()=>filter.hidden=true));
 filter?.addEventListener('click',e=>{if(e.target===filter)filter.hidden=true});
 filter?.querySelectorAll('.app-mailing-status-options button').forEach(b=>b.addEventListener('click',()=>{filter.querySelectorAll('.app-mailing-status-options button').forEach(x=>x.classList.toggle('selected',x===b))}));
 filter?.querySelector('.app-mailing-filter-clear')?.addEventListener('click',()=>{filter.querySelectorAll('input').forEach(i=>i.value='');filter.querySelectorAll('.app-mailing-status-options button').forEach((b,i)=>b.classList.toggle('selected',i===0));applySearch()});
 filter?.querySelector('.app-mailing-filter-apply')?.addEventListener('click',()=>{const vals=[...filter.querySelectorAll('.app-mailing-filter-body input')].map(i=>i.value.trim().toLowerCase()).filter(Boolean);const match=vals.every(v=>Object.values(demo).join(' ').toLowerCase().includes(v));if(card)card.hidden=!match;if(count)count.textContent=match?'1 contato':'0 contatos';filter.hidden=true});
 trigger?.addEventListener('click',()=>{selecting=!selecting;selected=false;trigger.hidden=selecting;if(bar)bar.hidden=!selecting;if(checkbox)checkbox.hidden=!selecting;if(selectedCount)selectedCount.textContent='0 de 100 selecionado(s)'});
 view.querySelector('.app-mailing-selection-close')?.addEventListener('click',()=>{selecting=false;selected=false;trigger.hidden=false;bar.hidden=true;if(checkbox)checkbox.hidden=true;card?.classList.remove('is-selected')});
 card?.addEventListener('click',e=>{if(!selecting)return;e.preventDefault();e.stopImmediatePropagation();selected=!selected;card.classList.toggle('is-selected',selected);if(selectedCount)selectedCount.textContent=(selected?'1':'0')+' de 100 selecionado(s)'},true);
 const startEdit=()=>{if(!form)return;form.querySelector('.app-contact-form-heading h4').textContent='EDITAR CONTATO';form.querySelector('.app-contact-save').textContent='SALVAR';form.classList.add('is-editing');for(const [name,val] of Object.entries(demo)){const field=form.querySelector('[name='+name+']');if(field)field.value=val}const p=form.querySelector('.app-contact-edit-profile');if(p){p.hidden=false;p.querySelector('span').textContent='A';p.querySelector('strong').textContent=demo.name;p.querySelector('small').textContent=demo.email}};
 sim.addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;if(b.dataset.screen==='editar-contato')startEdit();if(b.classList.contains('app-contact-save')){e.preventDefault()}if(b.classList.contains('app-contact-delete'))e.preventDefault();if(b.classList.contains('app-contact-vehicle-open'))form.querySelector('.app-contact-vehicle-picker').hidden=false;if(b.classList.contains('app-contact-vehicle-close'))form.querySelector('.app-contact-vehicle-picker').hidden=true;if(b.classList.contains('app-contact-pick-vehicle')){const field=form.querySelector('[name=vehicle]');if(field)field.value='LOGOS';form.querySelector('.app-contact-vehicle-picker').hidden=true}},true);
 form?.querySelectorAll('input,textarea').forEach(el=>el.addEventListener('input',()=>{}));
 applySearch();
})();
/* Navegação local dos módulos pendentes; ações finais permanecem demonstrativas. */
(()=> {
 const sim=document.querySelector('.app-simulator');
 if(!sim)return;
 const q=(sel,root=sim)=>root.querySelector(sel);
 const qa=(sel,root=sim)=>Array.from(root.querySelectorAll(sel));
 const setPanel=(name,open)=>{const panel=q('[data-panel="'+name+'"]');if(panel)panel.hidden=!open};
 const release=q('.demo-release-wizard');
 const calendarOverlay=q('[data-panel="report-date-picker"]');
 if(calendarOverlay)q('.app-scale')?.append(calendarOverlay);
 // Keep the clear affordance inside filled date fields, as in the mobile reference screens.
 qa('.demo-date',sim).forEach(wrapper=>{
   const input=q('input',wrapper);if(!input||q('[data-date-clear]',wrapper))return;
   const clear=document.createElement('button');clear.type='button';clear.className='demo-date-clear';clear.dataset.dateClear='';clear.setAttribute('aria-label','Limpar data');clear.textContent='×';clear.hidden=!input.value;input.after(clear);
 });
 const slideDateLabel=qa('[data-panel="slide-editor"] .demo-sheet-body>label',sim).find(label=>label.textContent.trim().startsWith('DATA DE PUBLICAÇÃO'));
 const slideDateInput=slideDateLabel?.querySelector('input');
 if(slideDateInput){
   let wrapper=slideDateInput.closest('.demo-date');
   if(!wrapper){wrapper=document.createElement('div');wrapper.className='demo-date demo-date-no-calendar';slideDateInput.before(wrapper);wrapper.append(slideDateInput)}
   if(!q('[data-date-clear]',wrapper)){const clear=document.createElement('button');clear.type='button';clear.className='demo-date-clear';clear.dataset.dateClear='';clear.setAttribute('aria-label','Limpar data');clear.textContent='×';clear.hidden=!slideDateInput.value;wrapper.append(clear)}
 }
 sim.addEventListener('input',e=>{const input=e.target.closest('.demo-date input');if(input){const clear=q('[data-date-clear]',input.closest('.demo-date'));if(clear)clear.hidden=!input.value}});
 let releaseStep=1, releaseTemplate='', releaseTemplateData=null, releaseTemplateTab='all', releaseBlockChoice='';
 let quickClientOrigin='report-client';
 const returnFromQuickClient=()=>{setPanel('quick-client',false);if(quickClientOrigin==='clipping-client'){const picker=q('.app-clipping-client-picker');if(picker)picker.hidden=false;return;}setPanel(quickClientOrigin,true);};
 const createdReleaseTemplates=new Map();
 const releaseBlockDefaults={Título:'Título da matéria','Linha fina':'Uma apresentação breve da matéria.',Texto:'Escreva aqui o conteúdo da matéria.','Contato de imprensa':'Nome, telefone e e-mail da assessoria.','Imagem / logo':'Imagem da matéria','Botão com link':'Acessar conteúdo',Arquivo:'Baixar arquivo'};
 const initialReleaseBlocks=q('[data-release-editor]',release)?.innerHTML||'';
 const syncReleaseEmail=()=>{
   const fields=qa('[data-release-step="4"] label input',release),subject=fields[0]?.value.trim(),firstLine=fields[1]?.value.trim(),sender=fields[2]?.value.trim(),reply=fields[3]?.value.trim();
   qa('.demo-input-clear',release).forEach(wrapper=>{const input=q('input',wrapper),clear=q('.demo-clear',wrapper);if(clear)clear.hidden=!input?.value});
   const values={
     '[data-email-subject]':subject||'Assunto do e-mail',
     '[data-email-preview]':firstLine||'A primeira linha aparecerá aqui',
     '[data-email-sender-preview]':sender||'luidgi',
     '[data-email-subject-review]':subject||'A definir',
     '[data-email-first-line-review]':firstLine||'Sem primeira linha',
     '[data-email-sender-review]':sender||'luidgi',
     '[data-email-reply-review]':reply||'luidgi@gmail.com'
   };
   Object.entries(values).forEach(([selector,value])=>{const target=q(selector,release);if(target)target.textContent=value});
 };
 const syncReleaseTitle=()=>{
   const title=qa('[data-release-step="1"] input',release)[0]?.value.trim()||'A definir';
   const target=q('[data-release-title-review]',release);if(target)target.textContent=title;
 };
 qa('[data-release-step="4"] label input',release).forEach(input=>input.addEventListener('input',syncReleaseEmail));
 qa('[data-release-step="1"] input',release).forEach(input=>input.addEventListener('input',syncReleaseTitle));
 syncReleaseEmail();syncReleaseTitle();
 const filterReleaseTemplates=()=>{
   const step=q('[data-release-step="2"]',release),input=q('.demo-search input',step),query=(input?.value||'').trim().toLocaleLowerCase('pt-BR');
   let shown=0;
   qa('.demo-template-choice',step).forEach(card=>{
     const origin=card.dataset.releaseTemplateOrigin||'standard';
     const originMatches=releaseTemplateTab==='all'||(releaseTemplateTab==='standard'&&origin==='standard')||(releaseTemplateTab==='created'&&origin==='created');
     const visible=originMatches&&card.textContent.toLocaleLowerCase('pt-BR').includes(query);
     card.hidden=!visible;if(visible)shown++;
   });
   const empty=q('[data-release-template-empty]',step);if(empty)empty.hidden=shown>0;
 };
 window.addEventListener('logos-demo-template-saved',event=>{
   const item=event.detail,step=q('[data-release-step="2"]',release),empty=q('[data-release-template-empty]',step);
   if(!item||!step)return;
   createdReleaseTemplates.set(item.name,item);
   const card=document.createElement('article');card.className='demo-template-choice';card.dataset.releaseTemplate=item.name;card.dataset.releaseTemplateOrigin='created';
   const icon=document.createElement('span');icon.textContent='▤';
   const title=document.createElement('strong');title.textContent=item.name;
   const label=document.createElement('small');label.textContent='Da assessoria';
   const previewButton=document.createElement('button');previewButton.type='button';previewButton.textContent='VER PRÉVIA';
   const radio=document.createElement('input');radio.type='radio';radio.name='release-template';radio.setAttribute('aria-label','Selecionar '+item.name);
   card.append(icon,title,label,previewButton,radio);step.insertBefore(card,empty||null);filterReleaseTemplates();
 });
 const showReleaseStep=n=>{
   if(!release)return;
   releaseStep=Math.max(1,Math.min(5,n));
   qa('[data-release-step]',release).forEach(el=>el.hidden=Number(el.dataset.releaseStep)!==releaseStep);
   qa('.demo-steps span',release).forEach((el,i)=>{
     el.classList.toggle('current',i===releaseStep-1);
     el.classList.toggle('completed',i<releaseStep-1);
     const number=q('b',el);if(number)number.textContent=i<releaseStep-1?'✓':String(i+1);
   });
 };
 const renderCustomReleaseTemplate=item=>{
   if(!item||!release)return;
   const list=q('[data-release-editor]',release),preview=q('.demo-release-preview-card',release),review=q('[data-release-step="5"] .demo-content-preview',release);
   const blocks=(item.blocks||[]).map(block=>typeof block==='string'?{type:block}:block);
   if(!list)return;
   list.replaceChildren();
   blocks.forEach(block=>{
     const type=block.type||'Texto',row=document.createElement('article');row.className='demo-release-block';row.dataset.releaseBlock=type;
     if(block.value)row.dataset.value=block.value;
     const label=document.createElement('span'),title=document.createElement('strong'),hint=document.createElement('small'),order=document.createElement('span');
     title.textContent=type;hint.textContent='Toque para editar';label.append(title,hint);order.className='demo-block-order';
     [['up','Mover para cima','↑'],['down','Mover para baixo','↓']].forEach(([direction,aria,text])=>{const button=document.createElement('button');button.type='button';button.dataset.releaseMove=direction;button.setAttribute('aria-label',aria);button.textContent=text;order.appendChild(button)});
     row.append(label,order);list.appendChild(row);
   });
   const count=q('.demo-block-count',release);if(count)count.textContent=blocks.length+' de 100 blocos';
   const renderCard=(card,{editable=false}={})=>{
     if(!card)return;card.replaceChildren();
     blocks.forEach(block=>{
       const type=block.type||'Texto',value=block.value||releaseBlockDefaults[type]||'Toque para editar';
       if(type==='Divisor'){card.appendChild(document.createElement('hr'));return}
       if(type==='Espaçamento'){const gap=document.createElement('div');gap.className='demo-release-preview-space';card.appendChild(gap);return}
       let node;
       if(type==='Título'){node=document.createElement('h2');node.textContent=value;node.dataset.releasePreviewBlock=type}
       else if(type==='Linha fina'||type==='Texto'){node=document.createElement('p');node.textContent=value;node.dataset.releasePreviewBlock=type;if(type==='Linha fina')node.className='muted'}
       else if(type==='Contato de imprensa'){const wrapper=document.createElement('div');wrapper.dataset.releasePreviewBlock=type;const heading=document.createElement('strong');heading.textContent='Contato de imprensa';const contact=document.createElement('p');contact.textContent=value;wrapper.append(heading,contact);node=wrapper}
       else if(type==='Imagem / logo'){
         node=document.createElement('div');node.className='demo-release-preview-media';node.dataset.releasePreviewBlock=type;
         if(block.imageUrl){const image=document.createElement('img');image.src=block.imageUrl;image.alt=block.caption||block.description||'Imagem do release';node.appendChild(image)}else node.textContent=block.description||'Adicionar imagem';
         if(block.caption){const caption=document.createElement('small');caption.textContent=block.caption;node.appendChild(caption)}
       }else if(type==='Arquivo'||type==='Botão com link'){
         node=document.createElement('a');node.className='demo-release-preview-link';node.textContent=value;node.href=block.url||'#';node.dataset.releasePreviewBlock=type;node.addEventListener('click',event=>event.preventDefault());
       }else {node=document.createElement('p');node.textContent=value;node.dataset.releasePreviewBlock=type}
       if(editable&&['Título','Linha fina','Texto','Contato de imprensa'].includes(type)){
         const pencil=document.createElement('button');pencil.type='button';pencil.dataset.action='release-edit-preview';pencil.dataset.releaseEditType=type;pencil.textContent='✎';
         if(type==='Contato de imprensa'){const wrapper=node;const editWrap=document.createElement('div');editWrap.className='demo-release-preview-editable';editWrap.append(wrapper,pencil);card.appendChild(editWrap)}else{const wrapper=document.createElement('div');wrapper.className='demo-release-preview-editable';wrapper.append(node,pencil);card.appendChild(wrapper)}
       }else card.appendChild(node);
     });
     if(!blocks.length)card.textContent='O conteúdo ainda está vazio.';
   };
   renderCard(preview,{editable:true});renderCard(review);
 };
 const releaseNext=()=>{
   if(releaseStep===2){
     if(!releaseTemplate)return;
     const standards={
       'Release simples':['Título','Linha fina','Texto','Divisor','Contato de imprensa'],
       'Release com imagem':['Imagem / logo','Título','Linha fina','Texto','Divisor','Contato de imprensa'],
       'Aviso de pauta':['Título','Texto','Texto','Divisor','Contato de imprensa']
     };
     const content=releaseTemplateData||{name:releaseTemplate,blocks:standards[releaseTemplate]||standards['Release simples']};
     renderCustomReleaseTemplate(content);
     const name=q('[data-release-template-name]',release);if(name)name.textContent=releaseTemplate;
   }
   showReleaseStep(releaseStep+1);
 };
 const releaseBack=()=>showReleaseStep(releaseStep-1);
 const appendReleaseBlock=type=>{
   const list=q('[data-release-editor]',release);
   if(!list||list.querySelectorAll('.demo-release-block').length>=100)return;
   const block=document.createElement('article');block.className='demo-release-block';block.dataset.releaseBlock=type;
   block.innerHTML='<span><strong></strong><small>Toque para editar</small></span><span class="demo-block-order"><button type="button" data-release-move="up" aria-label="Mover para cima">↑</button><button type="button" data-release-move="down" aria-label="Mover para baixo">↓</button></span>';
   block.querySelector('strong').textContent=type;list.appendChild(block);
   const count=q('.demo-block-count',release);if(count)count.textContent=list.querySelectorAll('.demo-release-block').length+' de 100 blocos';
 };
 const recipients=q('.demo-recipients');
 let calendarYear=2026,calendarMonth=10,calendarTarget=null;
 const renderCalendar=()=>{
   const title=q('[data-calendar-title]'),days=q('[data-calendar-days]');
   if(!title||!days)return;
   title.textContent=new Date(calendarYear,calendarMonth,1).toLocaleDateString('pt-BR',{month:'long',year:'numeric'}).replace(/ de /,' ').replace(/^./,c=>c.toLocaleUpperCase('pt-BR'));
   days.replaceChildren();
   const offset=new Date(calendarYear,calendarMonth,1).getDay(),total=new Date(calendarYear,calendarMonth+1,0).getDate();
   for(let i=0;i<offset;i++)days.appendChild(document.createElement('span'));
   for(let day=1;day<=total;day++){
     const button=document.createElement('button');button.type='button';button.textContent=String(day);
     button.dataset.calendarDate=String(day).padStart(2,'0')+'/'+String(calendarMonth+1).padStart(2,'0')+'/'+calendarYear;
     if(calendarYear===2026&&calendarMonth===10&&day===21)button.classList.add('today');
     if(calendarTarget?.value===button.dataset.calendarDate)button.classList.add('selected');
     days.appendChild(button);
   }
 };
 sim.addEventListener('click',e=>{
   const dateClear=e.target.closest('[data-date-clear]');
   if(dateClear){const input=dateClear.closest('.demo-date')?.querySelector('input');if(input){input.value='';input.dispatchEvent(new Event('input',{bubbles:true}))}return}
   const clearField=e.target.closest('.demo-clear');
   if(clearField){const input=clearField.closest('.demo-input-clear')?.querySelector('input');if(input){input.value='';input.dispatchEvent(new Event('input',{bubbles:true}));input.focus()}return}
   const open=e.target.closest('[data-open]');
   if(open){
     e.preventDefault();
     if(open.dataset.open==='report-date-picker'){
       calendarTarget=open.closest('.demo-date')?.querySelector('input')||open.closest('label')?.querySelector('input');
       const dateMatch=(calendarTarget?.value||'').match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
       calendarYear=dateMatch?Number(dateMatch[3]):2026;calendarMonth=dateMatch?Number(dateMatch[2])-1:10;renderCalendar();
       const heading=q('[data-calendar-heading]');if(heading)heading.textContent=open.closest('.app-clipping-form')?'Data de publicação':'Data do período';
     }
     setPanel(open.dataset.open,true);return;
   }
   const close = e.target.closest('[data-close]');

    if (close) {
      e.preventDefault();

      if (close.dataset.close === 'quick-client') {
        returnFromQuickClient();
        return;
      }

      setPanel(close.dataset.close, false);

      if (close.dataset.close === 'slide-editor') {
        setPanel('slide-detail', true);
      }

      return;
    }

    const quickClientTrigger = e.target.closest(
      '[data-action="quick-client-open"]'
    );

    if (quickClientTrigger) {
      const clippingPicker = quickClientTrigger.closest(
        '.app-clipping-client-picker'
      );

      if (clippingPicker) {
        quickClientOrigin = 'clipping-client';
        clippingPicker.hidden = true;
      } else {
        quickClientOrigin = quickClientTrigger.closest(
          '[data-panel="release-client"]'
        )
          ? 'release-client'
          : 'report-client';

        setPanel(quickClientOrigin, false);
      }

      setPanel('quick-client', true);
      return;
    }

    if (
      e.target.closest(
        '[data-action="quick-client-back"], [data-action="quick-client-submit"]'
      )
    ) {
      returnFromQuickClient();
      return;
    }
   const client=e.target.closest('[data-release-client]');
   if(client){
     const label=q('[data-release-client-label]',release);
     if(label)label.textContent=client.dataset.releaseClient;
     const clientRow=q('[data-open="release-client"]',release),clientAction=q('b',clientRow);if(clientAction)clientAction.textContent='Alterar';
     qa('[data-release-client]',release).forEach(option=>{const selected=option===client;option.classList.toggle('selected',selected);option.textContent=option.dataset.releaseClient+(selected?'　✓':'　○')});
     const review=q('[data-release-review-client]',release);
     if(review)review.textContent=client.dataset.releaseClient;
     const empty=q('[data-recipient-empty]',recipients),list=q('[data-recipient-list]',recipients);
     if(empty)empty.hidden=true;if(list)list.hidden=false;
     const controls=q('[data-recipient-controls]',recipients),mailing=q('[data-recipient-mailing]',recipients),result=q('[data-recipient-count]',recipients),done=q('[data-action="recipient-done"]',recipients);
     if(controls)controls.hidden=false;if(mailing)mailing.hidden=true;
     if(result)result.textContent='Exibindo 1–1 de 1 jornalistas encontrados';if(done)done.textContent='CONCLUIR (0)';
     const recipientCheckbox=q('.demo-recipient input',recipients);if(recipientCheckbox){recipientCheckbox.checked=false;recipientCheckbox.closest('.demo-recipient')?.classList.remove('selected')}
     setPanel('release-client',false);return;
   }
   const template=e.target.closest('[data-release-template]');
   if(template&&!e.target.closest('button')){
     releaseTemplate=template.dataset.releaseTemplate;
     releaseTemplateData=createdReleaseTemplates.get(releaseTemplate)||null;
     qa('.demo-template-choice',release).forEach(x=>{
       const selected=x===template;
       x.classList.toggle('selected',selected);
       const radio=x.querySelector('input[type=radio]');if(radio)radio.checked=selected;
     });
     const notice=q('[data-template-selected]',release);if(notice){notice.textContent='Modelo selecionado — '+releaseTemplate;notice.hidden=false}
     const next=q('[data-release-step="2"] [data-action="release-next"]',release);if(next)next.disabled=false;
     const name=q('[data-release-template-name]',release);if(name)name.textContent=releaseTemplate;
     return;
   }
   const releaseTemplateTabButton=e.target.closest('[data-release-template-tab]');
   if(releaseTemplateTabButton){
     releaseTemplateTab=releaseTemplateTabButton.dataset.releaseTemplateTab;
     qa('[data-release-template-tab]',release).forEach(x=>x.classList.toggle('selected',x===releaseTemplateTabButton));
     filterReleaseTemplates();return;
   }
   const radio=e.target.closest('.demo-template-choice input[type=radio]');
   if(radio){radio.checked=true;radio.closest('.demo-template-choice')?.dispatchEvent(new MouseEvent('click',{bubbles:true}));return}
   if(e.target.closest('[data-action="recipient-all"]')){
     const cb=q('.demo-recipient input',recipients);if(cb){cb.checked=true;cb.dispatchEvent(new Event('change',{bubbles:true}))}
     return;
   }
   if(e.target.closest('[data-action="recipient-done"]')){
     const selected=!!q('.demo-recipient input',recipients)?.checked;
     const label=q('[data-recipients-summary]',release),review=q('[data-release-recipient-summary]',release);
     if(label)label.textContent=selected?'1 contato selecionado':'Selecionar contatos';
     if(review)review.textContent=selected?'1 contato selecionado':'Nenhum contato selecionado';
     q('.app-back-btn')?.click();return;
   }
   if(e.target.closest('[data-release-new]')){
     releaseTemplate='';releaseTemplateData=null;releaseTemplateTab='all';releaseBlockChoice='';
     const wizard=q('.demo-release-wizard');
     qa('[data-release-step="1"] input',wizard).forEach(input=>input.value='');
     qa('[data-release-step="4"] label input',wizard).forEach((input,index)=>{input.value=index===2?'luidgi':index===3?'luidgi@gmail.com':''});
     const editor=q('[data-release-editor]',wizard);if(editor)editor.innerHTML=initialReleaseBlocks;
     const title=q('[data-release-preview-title]',wizard);if(title)title.textContent='Título da matéria';
     const lead=q('[data-release-preview-lead]',wizard);if(lead)lead.textContent='Uma apresentação breve da matéria.';
     const body=q('[data-release-preview-body]',wizard);if(body)body.textContent='Escreva aqui o conteúdo da matéria.';
     const reviewTitle=q('[data-release-review-title]',wizard);if(reviewTitle)reviewTitle.textContent='Título da matéria';
     const reviewLead=q('[data-release-review-lead]',wizard);if(reviewLead)reviewLead.textContent='Uma apresentação breve da matéria.';
     const reviewBody=q('[data-release-review-body]',wizard);if(reviewBody)reviewBody.textContent='Escreva aqui o conteúdo da matéria.';
     const contactPreview=q('.demo-release-preview-card hr',wizard)?.nextElementSibling?.querySelector('p');if(contactPreview){contactPreview.innerHTML='Contato de imprensa<br>Nome, telefone e e-mail da assessoria.';contactPreview.style.whiteSpace=''}
     const contactReview=qa('[data-release-step="5"] .demo-content-preview p',wizard).at(-1);if(contactReview){contactReview.innerHTML='Contato de imprensa<br>Nome, telefone e e-mail da assessoria.';contactReview.style.whiteSpace=''}
     syncReleaseEmail();syncReleaseTitle();
     const client=q('[data-release-client-label]',wizard);if(client)client.textContent='Selecione o cliente';
     const clientRow=q('[data-open="release-client"]',wizard),clientAction=q('b',clientRow);if(clientAction)clientAction.textContent='Selecionar';
     qa('[data-release-client]',wizard).forEach(option=>{option.classList.remove('selected');option.textContent=option.dataset.releaseClient+'　○'});
     const recipientLabel=q('[data-recipients-summary]',wizard);if(recipientLabel)recipientLabel.textContent='Selecionar contatos';
     const recipientReview=q('[data-release-recipient-summary]',wizard);if(recipientReview)recipientReview.textContent='Nenhum contato selecionado';
     const empty=q('[data-recipient-empty]',recipients),list=q('[data-recipient-list]',recipients);if(empty)empty.hidden=false;if(list)list.hidden=true;
     const recipientCheckbox=q('.demo-recipient input',recipients);if(recipientCheckbox)recipientCheckbox.checked=false;
     const controls=q('[data-recipient-controls]',recipients),mailing=q('[data-recipient-mailing]',recipients),result=q('[data-recipient-count]',recipients),done=q('[data-action="recipient-done"]',recipients);
     if(controls)controls.hidden=false;if(mailing)mailing.hidden=true;if(result)result.textContent='Exibindo 1–1 de 1 jornalistas encontrados';if(done)done.textContent='CONCLUIR (0)';
     qa('[data-release-template]',wizard).forEach(card=>{card.classList.remove('selected');const radio=q('input[type="radio"]',card);if(radio)radio.checked=false});
     const notice=q('[data-template-selected]',wizard);if(notice)notice.hidden=true;
     const next=q('[data-release-step="2"] [data-action="release-next"]',wizard);if(next)next.disabled=true;
     const search=q('[data-release-step="2"] .demo-search input',wizard);if(search)search.value='';
     qa('[data-release-template-tab]',wizard).forEach((tab,index)=>tab.classList.toggle('selected',index===0));
     filterReleaseTemplates();showReleaseStep(1);return;
   }
   const reportClient=e.target.closest('[data-report-client]');
   if(reportClient){const form=q('.demo-report-form'),label=q('[data-report-client-label]',form);if(label)label.textContent=reportClient.dataset.reportClient;const clientRow=q('[data-open="report-client"]',form),clientAction=q('b',clientRow);if(clientAction)clientAction.textContent='Alterar';qa('[data-report-client]',form).forEach(option=>{const selected=option===reportClient;option.classList.toggle('selected',selected);option.textContent=option.dataset.reportClient+(selected?'　✓':'　○')});setPanel('report-client',false);return}
   const articleTab=e.target.closest('[data-article-tab]');
   if(articleTab){
     const picker=q('.demo-article-picker'),tab=articleTab.dataset.articleTab;
     qa('[data-article-tab]',picker).forEach(x=>x.classList.toggle('selected',x===articleTab));
     const article=q('[data-article-card]',picker);if(article)article.hidden=tab!=='period';
     const pagination=q('[data-article-pagination]',picker);if(pagination)pagination.hidden=tab!=='period';
     qa('[data-article-empty]',picker).forEach(x=>x.hidden=x.dataset.articleEmpty!==tab);
     return;
   }
   const articleCheckbox=e.target.closest('[data-article-card] input[type=checkbox]');
   if(articleCheckbox){
     const article=articleCheckbox.closest('[data-article-card]');article?.classList.toggle('selected',articleCheckbox.checked);
     const summary=q('.demo-bottom-summary b');if(summary)summary.textContent=(articleCheckbox.checked?'1':'0')+' matéria selecionada';return;
   }
   const articleCard=e.target.closest('[data-article-card]');
   if(articleCard){
     const checkbox=q('input[type="checkbox"]',articleCard);if(checkbox){checkbox.checked=!checkbox.checked;articleCard.classList.toggle('selected',checkbox.checked);const summary=q('.demo-bottom-summary b');if(summary)summary.textContent=(checkbox.checked?'1':'0')+' matéria selecionada';}return;
   }
   const slideCheck=e.target.closest('[data-slide-check]');
   if(slideCheck){
     const card=slideCheck.closest('.demo-slide');card?.classList.toggle('selected',slideCheck.checked);
     const details=q('.demo-report-details'),count=qa('[data-slide-check]:checked',details).length;
     const label=q('.demo-bulk span',details);if(label)label.firstChild.textContent=count+' selecionado(s)';
     qa('[data-slide-bulk-action]',details).forEach((x,i)=>{x.disabled=count===0;x.textContent=(i?'×　IGNORAR (':'✓　ATUALIZAR (')+count+')'});
     return;
   }
   const slide=e.target.closest('[data-slide-open]');
   if(slide){
      const n=slide.dataset.slideOpen;
      const title=q('[data-slide-title]');if(title)title.textContent='Slide '+n;
      const actions=q('.demo-slide-sheet-actions'),closeOnly=q('.demo-slide-close-only');if(actions)actions.hidden=n!=='2';if(closeOnly)closeOnly.hidden=n==='2';
      qa('[data-slide-content]').forEach(body=>body.hidden=body.dataset.slideContent!==n);
      setPanel('slide-detail',true);return;
   }
   if(e.target.closest('[data-action="slide-edit"]')){setPanel('slide-detail',false);setPanel('slide-editor',true);return}
   if(e.target.closest('[data-action="slide-select"]')){
     const details=q('.demo-report-details'),selecting=details?.classList.toggle('is-selecting');
     const trigger=q('.demo-select-trigger',details),bar=q('.demo-bulk',details),actions=q('.demo-bulk-actions',details);
     if(trigger)trigger.hidden=!!selecting;if(bar)bar.hidden=!selecting;if(actions)actions.hidden=!selecting;
     if(!selecting){qa('[data-slide-check]',details).forEach(cb=>{cb.checked=false;cb.closest('.demo-slide')?.classList.remove('selected')});const label=q('.demo-bulk span',details);if(label)label.firstChild.textContent='0 selecionado(s)';}
     return;
   }
   if(e.target.closest('[data-action="slide-all"]')){
     const details=q('.demo-report-details');qa('[data-slide-check]',details).forEach(cb=>{cb.checked=true;cb.closest('.demo-slide')?.classList.add('selected')});
     const label=q('.demo-bulk span',details);if(label)label.firstChild.textContent='1 selecionado(s)';
     qa('[data-slide-bulk-action]',details).forEach((x,i)=>{x.disabled=false;x.textContent=(i?'×　IGNORAR (1)':'✓　ATUALIZAR (1)')});return;
   }
   const tab=e.target.closest('[data-slide-tab]');
   if(tab){
     const details=q('.demo-report-details'),review=tab.dataset.slideTab==='review';
     qa('[data-slide-tab]').forEach(x=>x.classList.toggle('selected',x===tab));
     const summary=q('.demo-review-summary',details);if(summary)summary.hidden=!review;
     qa('.demo-slide,.demo-pagination,.demo-report-details>.demo-two-actions',details).forEach(x=>x.hidden=review);
     const selecting=details.classList.contains('is-selecting')&&!review;
     const trigger=q('.demo-select-trigger',details),bar=q('.demo-bulk',details),actions=q('.demo-bulk-actions',details);
     if(trigger)trigger.hidden=review||selecting;if(bar)bar.hidden=review||!selecting;if(actions)actions.hidden=review||!selecting;
     return;
   }
   if(e.target.closest('[data-action="invite-generate"]')){const ready=q('.demo-invite-ready');if(ready)ready.hidden=false;return}
   const contentTab=e.target.closest('[data-release-content-tab]');
   if(contentTab){
      qa('[data-release-content-tab]',release).forEach(x=>x.classList.toggle('selected',x===contentTab));
      const preview=contentTab.dataset.releaseContentTab==='preview';
      const editor=q('[data-release-editor]',release),previewEl=q('[data-release-preview]',release);
      if(editor)editor.hidden=preview;if(previewEl)previewEl.hidden=!preview;
      const add=q('[data-action="release-add-block"]',release),count=q('.demo-block-count',release);
      if(add)add.hidden=preview;if(count)count.hidden=preview;return;
   }
   const insertBlock=e.target.closest('[data-insert-release-block]');
   if(insertBlock){
     releaseBlockChoice=insertBlock.dataset.insertReleaseBlock;
     qa('[data-insert-release-block]',release).forEach(x=>x.classList.toggle('selected',x===insertBlock));
     const insert=q('[data-action="release-insert-block"]',release);if(insert)insert.disabled=false;
     return;
   }
   const move=e.target.closest('[data-release-move]');
   if(move){
     const block=move.closest('.demo-release-block'),list=block?.parentElement;
     if(block&&list){if(move.dataset.releaseMove==='up'&&block.previousElementSibling)list.insertBefore(block,block.previousElementSibling);else if(move.dataset.releaseMove==='down'&&block.nextElementSibling)list.insertBefore(block.nextElementSibling,block);}
     return;
   }
   const inlineAction=e.target.closest('[data-release-inline-action]');
   if(inlineAction){
     const editor=inlineAction.closest('.demo-release-inline-editor'),block=editor?.previousElementSibling,type=block?.dataset.releaseBlock,field=editor?.querySelector('textarea');
     if(inlineAction.dataset.releaseInlineAction==='remove'){
       const type=block?.dataset.releaseBlock;editor?.remove();block?.remove();if(type){qa('[data-release-preview-block="'+type+'"]',release).forEach(node=>node.closest('.demo-release-preview-editable')?.remove()||node.remove());qa('[data-release-step="5"] [data-release-preview-block="'+type+'"]').forEach(node=>node.remove())}const list=q('[data-release-editor]',release),count=q('.demo-block-count',release);if(count&&list)count.textContent=list.querySelectorAll('.demo-release-block').length+' de 100 blocos';return;
     }
     if(block&&field){
       block.dataset.value=field.value;
       qa('[data-release-preview-block="'+block.dataset.releaseBlock+'"]',release).forEach(node=>{if(block.dataset.releaseBlock==='Contato de imprensa'){const p=q('p',node);if(p)p.textContent=field.value}else node.textContent=field.value});
       const previewMap={'Título':'[data-release-preview-title]','Linha fina':'[data-release-preview-lead]','Texto':'[data-release-preview-body]'};
       const preview=previewMap[type]?q(previewMap[type],release):null;if(preview)preview.textContent=field.value;
       const reviewMap={'Título':'[data-release-review-title]','Linha fina':'[data-release-review-lead]','Texto':'[data-release-review-body]'};
       const review=reviewMap[type]?q(reviewMap[type],release):null;if(review)review.textContent=field.value;
       if(type==='Contato de imprensa'&&!qa('[data-release-preview-block="Contato de imprensa"]',release).length){
         const contactPreview=q('.demo-release-preview-card hr',release)?.nextElementSibling?.querySelector('p');
         const contactReview=qa('[data-release-step="5"] .demo-content-preview p',release).at(-1);
         if(contactPreview){contactPreview.textContent='Contato de imprensa\n'+field.value;contactPreview.style.whiteSpace='pre-line'}
         if(contactReview){contactReview.textContent='Contato de imprensa\n'+field.value;contactReview.style.whiteSpace='pre-line'}
       }
       editor.remove();
     }
     return;
   }
   const releaseBlock=e.target.closest('.demo-release-block');
   if(releaseBlock){
     const current=releaseBlock.nextElementSibling;
     if(current?.classList.contains('demo-release-inline-editor')){current.remove();return;}
     qa('.demo-release-inline-editor',release).forEach(x=>x.remove());
     const type=releaseBlock.dataset.releaseBlock,defaults={'Título':'Título da matéria','Linha fina':'Uma apresentação breve da matéria.','Texto':'Escreva aqui o conteúdo da matéria.','Contato de imprensa':'Nome, telefone e e-mail da assessoria.'};
     const editor=document.createElement('div');editor.className='demo-release-inline-editor';
     const label=document.createElement('label');label.textContent=type.toLocaleUpperCase('pt-BR');
     const field=document.createElement('textarea');field.value=releaseBlock.dataset.value||defaults[type]||'';label.appendChild(field);
     const actions=document.createElement('div');actions.className='demo-two-actions';
     const remove=document.createElement('button');remove.type='button';remove.dataset.releaseInlineAction='remove';remove.textContent='▤　REMOVER';
     const done=document.createElement('button');done.type='button';done.dataset.releaseInlineAction='done';done.textContent='✓　CONCLUIR';
     actions.append(remove,done);editor.append(label,actions);releaseBlock.after(editor);return;
   }
   if(e.target.closest('[data-action="mailing-export"]')){const modal=q('.app-mailing-export-modal');if(modal)modal.hidden=false;return}
   if(e.target.closest('[data-action="mailing-export-close"]')){const modal=q('.app-mailing-export-modal');if(modal)modal.hidden=true;return}
   const calendarNav=e.target.closest('[data-calendar-nav]');
   if(calendarNav){calendarMonth+=Number(calendarNav.dataset.calendarNav);if(calendarMonth<0){calendarMonth=11;calendarYear--}if(calendarMonth>11){calendarMonth=0;calendarYear++}renderCalendar();return}
   const calendarDay=e.target.closest('[data-calendar-date]');
   if(calendarDay){if(calendarTarget){calendarTarget.value=calendarDay.dataset.calendarDate;calendarTarget.dispatchEvent(new Event('input',{bubbles:true}))}setPanel('report-date-picker',false);return}
   if(e.target.closest('[data-calendar-clear]')){if(calendarTarget){calendarTarget.value='';calendarTarget.dispatchEvent(new Event('input',{bubbles:true}))}setPanel('report-date-picker',false);return}
   if(e.target.closest('[data-calendar-today]')){if(calendarTarget){calendarTarget.value='21/11/2026';calendarTarget.dispatchEvent(new Event('input',{bubbles:true}))}setPanel('report-date-picker',false);return}
   const theme=e.target.closest('.demo-settings input[type=checkbox]');
   if(theme){q('.demo-settings')?.classList.toggle('dark-preview',theme.checked);return}
 });
 qa('.demo-search input').forEach(input=>input.addEventListener('input',()=>{
   const value=input.value.trim().toLocaleLowerCase('pt-BR');
   const scope=input.closest('.demo-page')||sim;
   scope.querySelectorAll('.demo-release-card,.demo-report-card,.demo-recipient,.demo-slide,[data-article-card],[data-release-client],[data-report-client]').forEach(card=>card.hidden=value&&!card.textContent.toLocaleLowerCase('pt-BR').includes(value));
 }));
 qa('.demo-release-wizard [data-release-step="2"] .demo-search input').forEach(input=>input.addEventListener('input',filterReleaseTemplates));
 qa('[data-panel]').forEach(panel=>panel.addEventListener('click',e=>{if(e.target===panel)panel.hidden=true}));
 qa('.demo-releases .demo-choice-stack button,.demo-recipients .demo-sheet .demo-pills button,.demo-reports .demo-sheet .demo-pills button').forEach(button=>{
   button.addEventListener('click',()=>{const group=button.parentElement;group.querySelectorAll('button').forEach(x=>x.classList.toggle('selected',x===button))});
 });
 qa('.demo-recipient input').forEach(cb=>cb.addEventListener('change',()=>{
   const count=cb.checked?1:0;
   const done=q('[data-action="recipient-done"]',recipients);if(done)done.textContent='CONCLUIR ('+count+')';
   const tab=q('[data-recipient-tab="selected"]',recipients);if(tab)tab.textContent='SELECIONADOS ('+count+')';
   const controls=q('[data-recipient-controls]',recipients),mailing=q('[data-recipient-mailing]',recipients),result=q('[data-recipient-count]',recipients);
   if(controls)controls.hidden=count>0;if(mailing)mailing.hidden=count===0;
   if(result)result.textContent=count?'Exibindo 1–1 de 1 jornalistas selecionados':'Exibindo 1–1 de 1 jornalistas encontrados';
 }));
 qa('.demo-step[data-release-step="4"] input').forEach(input=>input.addEventListener('input',()=>{
   const subject=q('[data-email-subject]');const first=q('[data-email-preview]');
   const fields=qa('.demo-step[data-release-step="4"] input');
   if(subject)subject.textContent=fields[0]?.value||'Assunto do e-mail';
   if(first)first.textContent=fields[1]?.value||'A primeira linha aparecerá aqui';
 }));
 showReleaseStep(1);
})();

