/**
 * CineStream - Profile Management Script
 * @author Nilson Gomes
 * @version 1.0.0
 */

// Importar configurações globais
import { APP_CONFIG } from './main.js';

// Elementos da página de perfil
const PROFILE_ELEMENTS = {
    avatarUpload: document.getElementById('avatar-upload'),
    changeAvatarBtn: document.getElementById('change-avatar'),
    userAvatar: document.getElementById('user-avatar'),
    accountForm: document.getElementById('account-settings-form'),
    logoutBtn: document.getElementById('logout-btn'),
    myListContainer: document.getElementById('my-list'),
    watchedContainer: document.getElementById('recently-watched')
};

// Dados do usuário
let userData = {};

// Inicialização do perfil
document.addEventListener('DOMContentLoaded', function() {
    loadUserProfile();
    setupProfileEventListeners();
    loadUserContent();
});

/**
 * Carrega os dados do perfil do usuário
 */
async function loadUserProfile() {
    try {
        const storedData = JSON.parse(localStorage.getItem(APP_CONFIG.localStorageKey));
        if (!storedData || !storedData.token) {
            window.location.href = 'login.html';
            return;
        }

        const response = await fetch(`${APP_CONFIG.apiBaseUrl}/profile`, {
            headers: {
                'Authorization': `Bearer ${storedData.token}`
            }
        });

        if (response.ok) {
            userData = await response.json();
            populateProfileForm(userData);
        } else {
            throw new Error('Falha ao carregar perfil');
        }
    } catch (error) {
        console.error('Erro ao carregar perfil:', error);
        showAlert('error', 'Não foi possível carregar seus dados. Tente novamente.');
    }
}

/**
 * Preenche o formulário com os dados do usuário
 * @param {Object} data - Dados do usuário
 */
function populateProfileForm(data) {
    document.getElementById('profile-name').value = data.name || '';
    document.getElementById('profile-email').value = data.email || '';
    document.getElementById('profile-language').value = data.language || 'pt-BR';
    
    if (data.avatar) {
        PROFILE_ELEMENTS.userAvatar.src = data.avatar;
    }
}

/**
 * Configura os event listeners do perfil
 */
function setupProfileEventListeners() {
    // Upload de avatar
    if (PROFILE_ELEMENTS.changeAvatarBtn) {
        PROFILE_ELEMENTS.changeAvatarBtn.addEventListener('click', function() {
            PROFILE_ELEMENTS.avatarUpload.click();
        });
    }

    if (PROFILE_ELEMENTS.avatarUpload) {
        PROFILE_ELEMENTS.avatarUpload.addEventListener('change', handleAvatarUpload);
    }

    // Formulário de conta
    if (PROFILE_ELEMENTS.accountForm) {
        PROFILE_ELEMENTS.accountForm.addEventListener('submit', handleAccountUpdate);
    }

    // Logout
    if (PROFILE_ELEMENTS.logoutBtn) {
        PROFILE_ELEMENTS.logoutBtn.addEventListener('click', handleLogout);
    }
}

/**
 * Manipula o upload de avatar
 */
async function handleAvatarUpload(e) {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.match('image.*')) {
        showAlert('error', 'Por favor, selecione uma imagem válida.');
        return;
    }

    if (file.size > 2 * 1024 * 1024) { // 2MB
        showAlert('error', 'A imagem deve ter menos de 2MB.');
        return;
    }

    try {
        const formData = new FormData();
        formData.append('avatar', file);

        const storedData = JSON.parse(localStorage.getItem(APP_CONFIG.localStorageKey));
        
        const response = await fetch(`${APP_CONFIG.apiBaseUrl}/profile/avatar`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${storedData.token}`
            },
            body: formData
        });

        if (response.ok) {
            const result = await response.json();
            PROFILE_ELEMENTS.userAvatar.src = result.avatarUrl;
            userData.avatar = result.avatarUrl;
            
            // Atualizar localStorage
            const storedUser = JSON.parse(localStorage.getItem(APP_CONFIG.localStorageKey));
            storedUser.avatar = result.avatarUrl;
            localStorage.setItem(APP_CONFIG.localStorageKey, JSON.stringify(storedUser));
            
            showAlert('success', 'Avatar atualizado com sucesso!');
        } else {
            throw new Error('Falha ao atualizar avatar');
        }
    } catch (error) {
        console.error('Erro ao enviar avatar:', error);
        showAlert('error', 'Falha ao atualizar avatar. Tente novamente.');
    }
}

/**
 * Manipula a atualização da conta
 */
async function handleAccountUpdate(e) {
    e.preventDefault();
    
    const form = e.target;
    const formData = new FormData(form);
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalBtnText = submitBtn.innerHTML;
    
    // Mostrar estado de carregamento
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Salvando...';
    
    try {
        const storedData = JSON.parse(localStorage.getItem(APP_CONFIG.localStorageKey));
        
        const response = await fetch(`${APP_CONFIG.apiBaseUrl}/profile`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${storedData.token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: formData.get('profile-name'),
                email: formData.get('profile-email'),
                password: formData.get('profile-password') || undefined,
                language: formData.get('profile-language')
            })
        });

        if (response.ok) {
            const result = await response.json();
            
            // Atualizar localStorage
            const storedUser = JSON.parse(localStorage.getItem(APP_CONFIG.localStorageKey));
            storedUser.name = result.name;
            storedUser.email = result.email;
            localStorage.setItem(APP_CONFIG.localStorageKey, JSON.stringify(storedUser));
            
            // Atualizar UI
            updateUserUI(storedUser);
            
            showAlert('success', 'Dados atualizados com sucesso!');
        } else {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Falha ao atualizar perfil');
        }
    } catch (error) {
        console.error('Erro ao atualizar perfil:', error);
        showAlert('error', error.message || 'Falha ao atualizar perfil. Tente novamente.');
    } finally {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnText;
    }
}

/**
 * Carrega o conteúdo do usuário (lista e assistidos)
 */
async function loadUserContent() {
    try {
        const storedData = JSON.parse(localStorage.getItem(APP_CONFIG.localStorageKey));
        if (!storedData || !storedData.token) return;

        // Carregar lista do usuário
        const listResponse = await fetch(`${APP_CONFIG.apiBaseUrl}/user/list`, {
            headers: {
                'Authorization': `Bearer ${storedData.token}`
            }
        });

        if (listResponse.ok) {
            const listData = await listResponse.json();
            renderContent(PROFILE_ELEMENTS.myListContainer, listData.items, 'Sua lista está vazia');
        }

        // Carregar assistidos recentemente
        const watchedResponse = await fetch(`${APP_CONFIG.apiBaseUrl}/user/watched`, {
            headers: {
                'Authorization': `Bearer ${storedData.token}`
            }
        });

        if (watchedResponse.ok) {
            const watchedData = await watchedResponse.json();
            renderContent(PROFILE_ELEMENTS.watchedContainer, watchedData.items, 'Nenhum conteúdo assistido recentemente');
        }
    } catch (error) {
        console.error('Erro ao carregar conteúdo:', error);
    }
}

/**
 * Renderiza o conteúdo na página
 */
function renderContent(container, items, emptyMessage) {
    if (!items || items.length === 0) {
        container.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-${container.id === 'my-list' ? 'bookmark' : 'history'}"></i>
                <p>${emptyMessage}</p>
                ${container.id === 'my-list' ? '<a href="catalogo.html" class="browse-btn">Explorar catálogo</a>' : ''}
            </div>
        `;
        return;
    }

    let html = '<div class="movies-grid">';
    items.slice(0, 6).forEach(item => {
        html += `
            <div class="movie-card">
                <a href="detalhes.html?id=${item.id}">
                    <img src="${item.poster}" alt="${item.title}" class="movie-poster">
                    <div class="movie-overlay">
                        <h3>${item.title}</h3>
                        <div class="movie-meta">
                            <span>${item.year}</span>
                            <span>${item.rating}/10</span>
                        </div>
                    </div>
                </a>
            </div>
        `;
    });
    html += '</div>';

    if (items.length > 6) {
        html += `<a href="${container.id === 'my-list' ? 'minha-lista.html' : 'assistidos.html'}" class="see-all">Ver todos (${items.length})</a>`;
    }

    container.innerHTML = html;
}

/**
 * Mostra uma mensagem de alerta
 */
function showAlert(type, message) {
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type}`;
    alertDiv.textContent = message;
    
    document.body.appendChild(alertDiv);
    
    setTimeout(() => {
        alertDiv.classList.add('fade-out');
        setTimeout(() => alertDiv.remove(), 500);
    }, 3000);
}

// Função para atualizar UI (importada do main.js)
function updateUserUI(userData) {
    const usernameElements = document.querySelectorAll('.username');
    const avatarElements = document.querySelectorAll('.fa-user-circle, .user-avatar');
    
    if (usernameElements.length > 0) {
        usernameElements.forEach(element => {
            element.textContent = userData.name || 'Usuário';
        });
    }
    
    if (avatarElements.length > 0 && userData.avatar) {
        avatarElements.forEach(element => {
            if (element.classList.contains('fa-user-circle')) {
                element.style.display = 'none';
                const img = document.createElement('img');
                img.src = userData.avatar;
                img.alt = 'Avatar do usuário';
                img.className = 'user-avatar';
                element.parentNode.insertBefore(img, element);
            } else if (element.classList.contains('user-avatar')) {
                element.src = userData.avatar;
            }
        });
    }
}

// Função de logout (importada do main.js)
function handleLogout() {
    localStorage.removeItem(APP_CONFIG.localStorageKey);
    window.location.href = 'index.html';
}