/**
 * CineStream - User Registration Script
 * @author Nilson Gomes
 * @version 1.0.0
 */

// Configurações
const REGISTER_CONFIG = {
    minPasswordLength: 8,
    passwordStrengthRegex: {
        lowercase: /[a-z]/,
        uppercase: /[A-Z]/,
        number: /[0-9]/,
        special: /[!@#$%^&*(),.?":{}|<>]/
    },
    apiEndpoint: 'https://api.cinestream.com/v1/auth/register'
};

// Elementos do DOM
const registerForm = document.getElementById('register-form');
const passwordInput = document.getElementById('password');
const confirmPasswordInput = document.getElementById('confirm-password');
const passwordStrength = document.getElementById('password-strength');
const termsCheckbox = document.getElementById('terms');
const registerBtn = document.getElementById('register-btn');

// Inicialização
document.addEventListener('DOMContentLoaded', function() {
    if (registerForm) {
        setupEventListeners();
        initSocialLogin();
    }
});

/**
 * Configura os event listeners
 */
function setupEventListeners() {
    // Validação em tempo real da senha
    passwordInput.addEventListener('input', function() {
        validatePassword(this.value);
        checkPasswordsMatch();
    });

    // Validação de confirmação de senha
    confirmPasswordInput.addEventListener('input', checkPasswordsMatch);

    // Validação dos termos
    termsCheckbox.addEventListener('change', function() {
        toggleSubmitButton();
    });

    // Envio do formulário
    registerForm.addEventListener('submit', handleRegistration);
}

/**
 * Valida a força da senha
 */
function validatePassword(password) {
    const strength = calculatePasswordStrength(password);
    updatePasswordStrengthUI(strength);
}

/**
 * Calcula a força da senha
 */
function calculatePasswordStrength(password) {
    let score = 0;
    const { lowercase, uppercase, number, special } = REGISTER_CONFIG.passwordStrengthRegex;

    // Verifica critérios
    if (password.length >= REGISTER_CONFIG.minPasswordLength) score += 1;
    if (lowercase.test(password)) score += 1;
    if (uppercase.test(password)) score += 1;
    if (number.test(password)) score += 1;
    if (special.test(password)) score += 1;

    return {
        score: score,
        isAcceptable: password.length >= REGISTER_CONFIG.minPasswordLength && score >= 3
    };
}

/**
 * Atualiza a UI da força da senha
 */
function updatePasswordStrengthUI(strength) {
    const strengthBar = passwordStrength.querySelector('.strength-bar');
    const strengthText = passwordStrength.querySelector('.strength-text');

    // Reset classes
    strengthBar.className = 'strength-bar';
    strengthText.className = 'strength-text';

    // Atualiza com base na força
    switch(strength.score) {
        case 0:
        case 1:
            strengthBar.classList.add('weak');
            strengthText.textContent = 'Fraca';
            break;
        case 2:
            strengthBar.classList.add('medium');
            strengthText.textContent = 'Média';
            break;
        case 3:
            strengthBar.classList.add('good');
            strengthText.textContent = 'Boa';
            break;
        case 4:
        case 5:
            strengthBar.classList.add('strong');
            strengthText.textContent = 'Forte';
            break;
    }

    // Mostra/oculta o indicador
    if (passwordInput.value.length > 0) {
        passwordStrength.style.display = 'flex';
    } else {
        passwordStrength.style.display = 'none';
    }
}

/**
 * Verifica se as senhas coincidem
 */
function checkPasswordsMatch() {
    const password = passwordInput.value;
    const confirmPassword = confirmPasswordInput.value;
    const errorElement = document.getElementById('confirm-password-error');

    if (password && confirmPassword && password !== confirmPassword) {
        errorElement.textContent = 'As senhas não coincidem';
        confirmPasswordInput.classList.add('error');
        return false;
    } else {
        errorElement.textContent = '';
        confirmPasswordInput.classList.remove('error');
        return true;
    }
}

/**
 * Habilita/desabilita o botão de envio
 */
function toggleSubmitButton() {
    const isFormValid = registerForm.checkValidity() && termsCheckbox.checked;
    registerBtn.disabled = !isFormValid;
}

/**
 * Manipula o registro do usuário
 */
async function handleRegistration(e) {
    e.preventDefault();
    
    // Validação final
    if (!checkPasswordsMatch()) {
        showAlert('error', 'Por favor, corrija os erros no formulário.');
        return;
    }

    // Mostrar estado de carregamento
    const originalBtnText = registerBtn.innerHTML;
    registerBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Criando conta...';
    registerBtn.disabled = true;

    // Coletar dados do formulário
    const formData = {
        name: document.getElementById('name').value.trim(),
        email: document.getElementById('email').value.trim(),
        password: passwordInput.value,
        acceptTerms: termsCheckbox.checked
    };

    try {
        const response = await fetch(REGISTER_CONFIG.apiEndpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Erro ao registrar');
        }

        // Registro bem-sucedido
        handleRegistrationSuccess(data);
    } catch (error) {
        console.error('Erro no registro:', error);
        showAlert('error', error.message || 'Erro ao criar conta. Tente novamente.');
    } finally {
        registerBtn.innerHTML = originalBtnText;
        registerBtn.disabled = false;
    }
}

/**
 * Manipula o sucesso do registro
 */
function handleRegistrationSuccess(data) {
    // Armazena os dados do usuário
    const userData = {
        token: data.token,
        name: data.user.name,
        email: data.user.email,
        avatar: data.user.avatar || ''
    };

    localStorage.setItem('cinestream_user', JSON.stringify(userData));

    // Mostra mensagem de sucesso
    showAlert('success', 'Conta criada com sucesso! Redirecionando...');

    // Redireciona após 2 segundos
    setTimeout(() => {
        window.location.href = 'profile.html';
    }, 2000);
}

/**
 * Mostra uma mensagem de alerta
 */
function showAlert(type, message) {
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type}`;
    alertDiv.textContent = message;
    
    // Insere antes do formulário
    registerForm.parentNode.insertBefore(alertDiv, registerForm);
    
    // Remove após 5 segundos
    setTimeout(() => {
        alertDiv.classList.add('fade-out');
        setTimeout(() => alertDiv.remove(), 500);
    }, 5000);
}

/**
 * Inicializa login social (Google/Facebook)
 */
function initSocialLogin() {
    // Google Sign-In
    if (typeof google !== 'undefined') {
        google.accounts.id.initialize({
            client_id: 'SEU_CLIENT_ID_GOOGLE',
            callback: handleGoogleSignIn
        });
        
        google.accounts.id.renderButton(
            document.querySelector('.google-btn'),
            { theme: 'outline', size: 'large' }
        );
    }

    // Facebook SDK
    if (typeof FB !== 'undefined') {
        FB.init({
            appId: 'SEU_APP_ID_FACEBOOK',
            cookie: true,
            xfbml: true,
            version: 'v16.0'
        });
    }
}

/**
 * Manipula login com Google
 */
function handleGoogleSignIn(response) {
    // Decodifica o token JWT
    const payload = JSON.parse(atob(response.credential.split('.')[1]));
    
    // Cria dados do usuário
    const userData = {
        token: response.credential,
        name: payload.name,
        email: payload.email,
        avatar: payload.picture,
        isSocialLogin: true
    };

    // Registra via API
    registerSocialUser(userData);
}

/**
 * Manipula login com Facebook
 */
function handleFacebookLogin() {
    FB.login(function(response) {
        if (response.authResponse) {
            FB.api('/me', { fields: 'name,email,picture' }, function(profile) {
                const userData = {
                    token: response.authResponse.accessToken,
                    name: profile.name,
                    email: profile.email,
                    avatar: profile.picture?.data?.url,
                    isSocialLogin: true
                };
                
                registerSocialUser(userData);
            });
        }
    }, { scope: 'public_profile,email' });
}

/**
 * Registra usuário via rede social
 */
async function registerSocialUser(userData) {
    try {
        const response = await fetch(`${REGISTER_CONFIG.apiEndpoint}/social`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Erro no registro social');
        }

        handleRegistrationSuccess(data);
    } catch (error) {
        console.error('Erro no registro social:', error);
        showAlert('error', error.message || 'Erro ao conectar com rede social');
    }
}

// Event listeners para botões sociais
document.querySelector('.google-btn')?.addEventListener('click', handleGoogleSignIn);
document.querySelector('.facebook-btn')?.addEventListener('click', handleFacebookLogin);