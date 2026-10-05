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

if (demoForm) {
    demoForm.addEventListener('submit', (e) => {
        e.preventDefault();

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
