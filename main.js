/**
 * CineStream - Main Application Script
 * @author Nilson Gomes
 * @version 1.0.0
 */

// Configurações globais
const APP_CONFIG = {
    apiBaseUrl: 'https://api.cinestream.com/v1',
    localStorageKey: 'cinestream_user',
    debugMode: true
};

// Inicialização da aplicação
document.addEventListener('DOMContentLoaded', function() {
    if (APP_CONFIG.debugMode) {
        console.log('CineStream iniciado - Modo debug ativo');
    }

    initComponents();
    checkAuthState();
    setupEventListeners();
});

/**
 * Inicializa todos os componentes da página
 */
function initComponents() {
    // Menu dropdown do usuário
    const userMenu = document.querySelector('.user-menu');
    if (userMenu) {
        userMenu.addEventListener('click', function(e) {
            const dropdown = this.querySelector('.dropdown-menu');
            if (dropdown) {
                dropdown.classList.toggle('show');
            }
        });
    }

    // Fechar dropdown ao clicar fora
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.user-menu')) {
            const dropdowns = document.querySelectorAll('.dropdown-menu');
            dropdowns.forEach(dropdown => {
                dropdown.classList.remove('show');
            });
        }
    });

    // Ativar tooltips
    initTooltips();

    // Carregar notificações
    loadNotifications();
}

/**
 * Verifica o estado de autenticação do usuário
 */
function checkAuthState() {
    const authPages = ['login.html', 'register.html', 'forgot-password.html'];
    const currentPage = window.location.pathname.split('/').pop();
    
    if (authPages.includes(currentPage)) return;

    const userData = JSON.parse(localStorage.getItem(APP_CONFIG.localStorageKey));
    
    if (!userData || !userData.token) {
        if (currentPage !== 'index.html') {
            window.location.href = 'login.html';
        }
        return;
    }

    // Atualizar UI com dados do usuário
    updateUserUI(userData);
}

/**
 * Atualiza a interface com os dados do usuário
 * @param {Object} userData - Dados do usuário
 */
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

/**
 * Configura listeners de eventos globais
 */
function setupEventListeners() {
    // Logout
    const logoutBtn = document.getElementById('logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', handleLogout);
    }

    // Busca
    const searchForm = document.querySelector('.search-bar');
    if (searchForm) {
        searchForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const query = this.querySelector('input').value.trim();
            if (query) {
                window.location.href = `search.html?q=${encodeURIComponent(query)}`;
            }
        });
    }
}

/**
 * Manipula o logout do usuário
 */
function handleLogout() {
    localStorage.removeItem(APP_CONFIG.localStorageKey);
    window.location.href = 'index.html';
}

/**
 * Carrega notificações do usuário
 */
async function loadNotifications() {
    try {
        const userData = JSON.parse(localStorage.getItem(APP_CONFIG.localStorageKey));
        if (!userData || !userData.token) return;

        const response = await fetch(`${APP_CONFIG.apiBaseUrl}/notifications`, {
            headers: {
                'Authorization': `Bearer ${userData.token}`
            }
        });

        if (response.ok) {
            const data = await response.json();
            updateNotificationBadge(data.unreadCount);
        }
    } catch (error) {
        if (APP_CONFIG.debugMode) {
            console.error('Erro ao carregar notificações:', error);
        }
    }
}

/**
 * Atualiza o badge de notificações
 * @param {number} count - Número de notificações não lidas
 */
function updateNotificationBadge(count) {
    const badge = document.querySelector('.notification-badge');
    if (badge) {
        badge.textContent = count > 0 ? count : '';
        badge.style.display = count > 0 ? 'flex' : 'none';
    }
}

/**
 * Inicializa tooltips
 */
function initTooltips() {
    const tooltipElements = document.querySelectorAll('[data-tooltip]');
    
    tooltipElements.forEach(element => {
        element.addEventListener('mouseenter', showTooltip);
        element.addEventListener('mouseleave', hideTooltip);
    });
}

function showTooltip(e) {
    const tooltipText = this.getAttribute('data-tooltip');
    const tooltip = document.createElement('div');
    tooltip.className = 'custom-tooltip';
    tooltip.textContent = tooltipText;
    
    document.body.appendChild(tooltip);
    
    const rect = this.getBoundingClientRect();
    tooltip.style.top = `${rect.top - tooltip.offsetHeight - 10}px`;
    tooltip.style.left = `${rect.left + rect.width / 2 - tooltip.offsetWidth / 2}px`;
    
    this.tooltip = tooltip;
}

function hideTooltip() {
    if (this.tooltip) {
        this.tooltip.remove();
        this.tooltip = null;
    }
}

// Exportar para uso em outros arquivos se necessário
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        APP_CONFIG,
        checkAuthState,
        handleLogout
    };
}