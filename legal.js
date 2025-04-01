/**
 * CineStream - Legal Pages Script (Terms, Privacy, etc.)
 * @author Nilson Gomes
 * @version 1.0.0
 */

// Configurações
const LEGAL_CONFIG = {
    pdfOptions: {
        pageTitle: 'CineStream - Termos de Serviço',
        fileName: 'Termos-de-Servico-CineStream.pdf',
        styles: {
            header: {
                fontSize: 18,
                bold: true,
                margin: [0, 0, 0, 10]
            },
            subheader: {
                fontSize: 14,
                bold: true,
                margin: [0, 10, 0, 5]
            },
            paragraph: {
                fontSize: 11,
                margin: [0, 0, 0, 10]
            },
            list: {
                fontSize: 11,
                margin: [0, 0, 0, 5]
            }
        }
    },
    lastUpdated: '01/01/2023'
};

// Inicialização
document.addEventListener('DOMContentLoaded', function() {
    if (document.querySelector('.legal-page')) {
        setupLegalPage();
    }
});

/**
 * Configura a página legal
 */
function setupLegalPage() {
    // Botão de impressão
    const printBtn = document.querySelector('.print-btn');
    if (printBtn) {
        printBtn.addEventListener('click', function() {
            window.print();
        });
    }

    // Botão de download PDF
    const downloadBtn = document.querySelector('.download-btn');
    if (downloadBtn) {
        downloadBtn.addEventListener('click', generateLegalPDF);
    }

    // Atualizar data de modificação
    updateLastUpdatedDate();

    // Configurar accordion para seções
    setupSectionAccordions();
}

/**
 * Atualiza a data de última modificação
 */
function updateLastUpdatedDate() {
    const elements = document.querySelectorAll('.last-updated');
    if (elements.length > 0) {
        elements.forEach(el => {
            el.textContent = `Última atualização: ${formatDate(LEGAL_CONFIG.lastUpdated)}`;
        });
    }
}

/**
 * Formata a data para exibição
 */
function formatDate(dateString) {
    const options = { day: '2-digit', month: 'long', year: 'numeric' };
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', options);
}

/**
 * Configura accordions para seções
 */
function setupSectionAccordions() {
    const sections = document.querySelectorAll('.legal-section');
    
    sections.forEach(section => {
        const heading = section.querySelector('h2');
        const content = section.querySelectorAll('p, ul');
        
        if (heading && content.length > 0) {
            // Adiciona ícone
            const icon = document.createElement('i');
            icon.className = 'fas fa-chevron-down';
            heading.appendChild(icon);
            
            // Esconde conteúdo inicialmente
            content.forEach(el => {
                el.style.display = 'none';
            });
            
            // Configura click handler
            heading.addEventListener('click', function() {
                const isHidden = content[0].style.display === 'none';
                
                // Alterna ícone
                icon.className = isHidden 
                    ? 'fas fa-chevron-up' 
                    : 'fas fa-chevron-down';
                
                // Alterna conteúdo
                content.forEach(el => {
                    el.style.display = isHidden ? 'block' : 'none';
                });
            });
        }
    });
}

/**
 * Gera PDF do documento legal
 */
function generateLegalPDF() {
    // Verifica se pdfmake está disponível
    if (typeof pdfMake === 'undefined') {
        console.error('pdfmake não está disponível');
        showAlert('error', 'Recurso de PDF não disponível no momento.');
        return;
    }

    // Coleta conteúdo da página
    const title = document.querySelector('.legal-container h1').textContent;
    const lastUpdated = document.querySelector('.last-updated').textContent;
    const sections = Array.from(document.querySelectorAll('.legal-section'));
    
    // Prepara conteúdo do PDF
    const docDefinition = {
        content: [
            { text: title, style: 'header' },
            { text: lastUpdated, style: 'paragraph', margin: [0, 0, 0, 20] },
            ...getSectionContent(sections)
        ],
        styles: LEGAL_CONFIG.pdfOptions.styles,
        defaultStyle: {
            font: 'Helvetica'
        }
    };

    // Cria e baixa o PDF
    pdfMake.createPdf(docDefinition).download(LEGAL_CONFIG.pdfOptions.fileName);
}

/**
 * Converte seções HTML para conteúdo do PDF
 */
function getSectionContent(sections) {
    return sections.map(section => {
        const heading = section.querySelector('h2');
        const paragraphs = Array.from(section.querySelectorAll('p'));
        const lists = Array.from(section.querySelectorAll('ul'));
        
        const content = [
            { text: heading.textContent, style: 'subheader' }
        ];
        
        // Adiciona parágrafos
        paragraphs.forEach(p => {
            if (p.className !== 'last-updated') {
                content.push({ text: p.textContent, style: 'paragraph' });
            }
        });
        
        // Adiciona listas
        lists.forEach(ul => {
            const listItems = Array.from(ul.querySelectorAll('li')).map(li => {
                return { text: li.textContent, style: 'list' };
            });
            content.push({ ul: listItems });
        });
        
        return content;
    }).flat();
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

/**
 * Rola para uma seção específica
 */
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
        
        // Destaque temporário
        section.style.backgroundColor = 'rgba(255, 255, 0, 0.2)';
        setTimeout(() => {
            section.style.backgroundColor = '';
        }, 2000);
    }
}

/**
 * Cria índice de navegação
 */
function createNavigationIndex() {
    const sections = document.querySelectorAll('.legal-section');
    const navContainer = document.createElement('div');
    navContainer.className = 'legal-navigation';
    
    const navTitle = document.createElement('h3');
    navTitle.textContent = 'Navegação Rápida';
    navContainer.appendChild(navTitle);
    
    const navList = document.createElement('ul');
    
    sections.forEach(section => {
        const heading = section.querySelector('h2');
        if (heading) {
            const listItem = document.createElement('li');
            const link = document.createElement('a');
            link.href = `#${section.id}`;
            link.textContent = heading.textContent;
            link.addEventListener('click', (e) => {
                e.preventDefault();
                scrollToSection(section.id);
            });
            
            listItem.appendChild(link);
            navList.appendChild(listItem);
        }
    });
    
    navContainer.appendChild(navList);
    
    // Insere após o título principal
    const mainTitle = document.querySelector('.legal-container h1');
    if (mainTitle) {
        mainTitle.parentNode.insertBefore(navContainer, mainTitle.nextSibling);
    }
}

// Adiciona IDs às seções se não existirem
function addSectionIds() {
    const sections = document.querySelectorAll('.legal-section');
    sections.forEach((section, index) => {
        if (!section.id) {
            section.id = `section-${index + 1}`;
        }
    });
}

// Inicializa navegação se houver muitas seções
function initNavigationIfNeeded() {
    const sections = document.querySelectorAll('.legal-section');
    if (sections.length > 5) {
        addSectionIds();
        createNavigationIndex();
    }
}

// Chamadas de inicialização
initNavigationIfNeeded();