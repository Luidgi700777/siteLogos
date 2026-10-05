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
    // Abrir formulário
    openFormBtn.addEventListener('click', (e) => {
        e.preventDefault();
        formModal.classList.add('active');
    });

    // Fechar formulário pelo botão X
    closeFormBtn.addEventListener('click', () => {
        formModal.classList.remove('active');
    });

    // Fechar formulário ao clicar fora dele
    formModal.addEventListener('click', (e) => {
        if (e.target === formModal) {
            formModal.classList.remove('active');
        }
    });

    // Enviar formulário
    const demoForm = document.querySelector('.demo-form');
    demoForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Obrigado! Entraremos em contato em breve.');
        formModal.classList.remove('active');
        demoForm.reset();
    });
}
