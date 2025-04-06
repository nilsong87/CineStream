document.addEventListener('DOMContentLoaded', function () {
    // Verificar se o JavaScript está habilitado
    document.documentElement.classList.remove('no-js');
    document.documentElement.classList.add('js');

    // Dados dos filmes
    const categories = [
    {
        name: "Ação",
        movies: [
            {
                title: "John Wick 3: Parabellum",
                year: 2019,
                duration: "2h 10m",
                rating: "4.5/5",
                description: "O lendário assassino John Wick está em fuga após matar um membro da alta cúpula da Máfia. Com uma recompensa de 14 milhões de dólares por sua cabeça, ele se torna o alvo dos maiores assassinos do mundo.",
                youtubeId: "pU8-7BX9uxs",
                thumbnail: "https://image.tmdb.org/t/p/w500/ziEuG1essDuWuC5lpWUaw1uXY2O.jpg"
            },
            
            {
                title: "Missão Impossível: Efeito Fallout",
                year: 2018,
                duration: "2h 27m",
                rating: "4.6/5",
                description: "Ethan Hunt e sua equipe do IMF correm contra o tempo após uma missão dar errado, com armas nucleares caindo nas mãos de terroristas.",
                youtubeId: "wb49-oV0F78",
                thumbnail: "https://image.tmdb.org/t/p/w500/AkJQpZp9WoNdj7pLYSj1L0RcMMN.jpg"
            },
            {
                title: "Duna",
                year: 2021,
                duration: "2h 35m",
                rating: "4.3/5",
                description: "Paul Atreides viaja para o planeta mais perigoso do universo para garantir o futuro de seu povo.",
                youtubeId: "n9xhJrPXop4",
                thumbnail: "https://image.tmdb.org/t/p/w500/8UlWHLMpgZm9bx6QYh0NFoq67TZ.jpg"
            },
            {
                title: "Top Gun: Maverick",
                year: 2022,
                duration: "2h 10m",
                rating: "4.7/5",
                description: "Depois de mais de 30 anos de serviço como um dos principais aviadores da Marinha, Pete Mitchell está de volta, rompendo os limites como um piloto de testes corajoso.",
                youtubeId: "giXco2jaZ_4",
                thumbnail: "https://image.tmdb.org/t/p/w500/qhPtAc1TKbMPqNvcdXSOn9Bn7hZ.jpg"
            },
            {
                title: "Batman: O Cavaleiro das Trevas",
                year: 2008,
                duration: "2h 32m",
                rating: "4.8/5",
                description: "Batman trava uma batalha contra o Coringa em Gotham City, enquanto luta com questões de ordem e justiça.",
                youtubeId: "EXeTwQWrcwY",
                thumbnail: "https://image.tmdb.org/t/p/w500/iGZX91hIqM9Uu0KGhd4MUaJ0Rtm.jpg"
            },
            {
                title: "Rambo: Programado para Matar",
                year: 1982,
                duration: "1h 37m",
                rating: "4.2/5",
                description: "John Rambo, um veterano do Vietnã, é perseguido por um xerife de uma pequena cidade, levando a uma violenta onda de destruição.",
                youtubeId: "IAqLKlxY3Eo",
                thumbnail: "https://image.tmdb.org/t/p/w500/bGIDYYOX7Cj1o7W8JiwHd3TzJVw.jpg"
            },            
        ]
    },
    {
        name: "Ficção Científica",
        movies: [
            
            {
                title: "Blade Runner 2049",
                year: 2017,
                duration: "2h 44m",
                rating: "4.4/5",
                description: "Um novo blade runner, K, descobre um segredo enterrado há muito tempo que tem o potencial de mergulhar o que resta da sociedade no caos.",
                youtubeId: "gCcx85zbxz4",
                thumbnail: "https://image.tmdb.org/t/p/w500/63N9uy8nd9j7Eog2axPQ8lbr3Wj.jpg"
            },
            {
                title: "Matrix",
                year: 1999,
                duration: "2h 16m",
                rating: "4.7/5",
                description: "Um hacker descobre a verdade sobre sua realidade e seu papel na guerra contra os controladores dessa realidade.",
                youtubeId: "vKQi3bBA1y8",
                thumbnail: "https://image.tmdb.org/t/p/w500/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg"
            },
            {
                title: "Avatar",
                year: 2009,
                duration: "2h 42m",
                rating: "4.5/5",
                description: "Um fuzileiro naval paraplégico é enviado à lua Pandora em uma missão única, mas fica dividido entre seguir ordens e proteger o mundo que ele sente ser sua casa.",
                youtubeId: "5PSNL1qE6VY",
                thumbnail: "https://image.tmdb.org/t/p/w500/jRXYjXNq0Cs2TcJjLkki24MLp7u.jpg"
            },
            {
                title: "Inception",
                year: 2010,
                duration: "2h 28m",
                rating: "4.8/5",
                description: "Um ladrão que rouba segredos corporativos através do uso de tecnologia de compartilhamento de sonhos recebe a tarefa inversa de plantar uma ideia na mente de um diretor executivo.",
                youtubeId: "YoHD9XEInc0",
                thumbnail: "https://image.tmdb.org/t/p/w500/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg"
            },
            {
                title: "O Exterminador do Futuro 2: O Julgamento Final",
                year: 1991,
                duration: "2h 17m",
                rating: "4.6/5",
                description: "Um ciborgue idêntico ao que tentou matar Sarah Connor vem do futuro, desta vez para proteger seu filho adolescente John Connor.",
                youtubeId: "CRRlbK5w8AE",
                thumbnail: "https://image.tmdb.org/t/p/w500/5M0j0B18abtBI5gi2RhfjjurTqb.jpg"
            }
        ]
    },
    {
        name: "Drama",
        movies: [
            {
                title: "O Poderoso Chefão",
                year: 1972,
                duration: "2h 55m",
                rating: "4.9/5",
                description: "O patriarca de uma dinastia do crime organizado transfere o controle de seu império clandestino para seu filho relutante.",
                youtubeId: "sY1S34973zA",
                thumbnail: "https://image.tmdb.org/t/p/w500/oJagOzBu9Rdd9BrciseCm3U3MCU.jpg"
            },
            {
                title: "Cidadão Kane",
                year: 1941,
                duration: "1h 59m",
                rating: "4.5/5",
                description: "A história da vida de um magnata da mídia, contada após sua morte através das memórias de seus amigos e inimigos.",
                youtubeId: "8dxh3lwdOFw",
                thumbnail: "https://image.tmdb.org/t/p/w500/sav0jxhqiH0bPr2vZFU0Kjt2nZL.jpg"
            },
            {
                title: "Forrest Gump",
                year: 1994,
                duration: "2h 22m",
                rating: "4.7/5",
                description: "As presidências de Kennedy e Johnson, os eventos do Vietnã, Watergate e outras histórias se desenrolam através da perspectiva de um homem do Alabama com QI abaixo da média.",
                youtubeId: "bLvqoHBptjg",
                thumbnail: "https://image.tmdb.org/t/p/w500/saHP97rTPS5eLmrLQEcANmKrsFl.jpg"
            },
            {
                title: "O Resgate do Soldado Ryan",
                year: 1998,
                duration: "2h 49m",
                rating: "4.7/5",
                description: "Após o desembarque na Normandia, um grupo de soldados americanos embarca em uma perigosa missão para resgatar um paraquedista cujos três irmãos foram mortos em combate.",
                youtubeId: "zwhP5b4tD6g",
                thumbnail: "https://image.tmdb.org/t/p/w500/uqx37cS8cpHg8U35f9U5IBlrCV3.jpg"
            },
            
            {
                title: "A Lista de Schindler",
                year: 1993,
                duration: "3h 15m",
                rating: "4.9/5",
                description: "Na Polônia ocupada pelos alemães durante a Segunda Guerra Mundial, o industrial Oskar Schindler gradualmente se preocupa com seus trabalhadores judeus após testemunhar sua perseguição pelos nazistas.",
                youtubeId: "gG22XNhtnoY",
                thumbnail: "https://image.tmdb.org/t/p/w500/sF1U4EUQS8YHUYjNl3pMGNIQyr0.jpg"
            }
        ]
    },
    {
        name: "Comédia",
        movies: [
            {
                "title": "Superbad",
                "year": 2007,
                "duration": "1h 53m",
                "description": "Dois amigos do ensino médio tentam comprar álcool para uma festa usando uma identidade falsa, mas tudo dá errado.",
                "youtubeId": "4eaZ_48ZYog",
                "thumbnail": "https://image.tmdb.org/t/p/w500/ek8e8txUyUwd2BNqj6lFEerJfbq.jpg",
                "rating": "4.1/5"
            },
            {
                "title": "Deadpool",
                "year": 2016,
                "duration": "1h 48m",
                "description": "Um ex-agente das forças especiais torna-se um mercenário após ser submetido a um experimento que lhe dá poderes de cura acelerada.",
                "youtubeId": "ONHBaC-pfsk",
                "thumbnail": "https://image.tmdb.org/t/p/w500/fSRb7vyIP8rQpL0I47P3qUsEKX3.jpg",
                "rating": "4.2/5"
            },
            {
                "title": "Scott Pilgrim Contra o Mundo",
                "year": 2010,
                "duration": "1h 52m",
                "description": "Um jovem músico precisa derrotar os sete ex-namorados da garota dos seus sonhos para ficar com ela.",
                "youtubeId": "7wd5KEaOtm4",
                "thumbnail": "https://image.tmdb.org/t/p/w500/g5IoYeudx9XBEfwNL0fHvSckLBz.jpg",
                "rating": "4.2/5"
            },
            
            {
                "title": "O Espetacular Homem-Aranha",
                "year": 2012,
                "duration": "2h 16m",
                "description": "Peter Parker usa seus poderes para combater o vilão Lagarto, enquanto tenta equilibrar vida pessoal e heroísmo.",
                "youtubeId": "upwf8RsyNqQ",
                "thumbnail": "https://image.tmdb.org/t/p/w500/fSbqPbqXa7ePo8bcnZYN9AHv6zA.jpg",
                "rating": "4.0/5"
            },
            {
                "title": "O Terminal",
                "year": 2004,
                "duration": "2h 8m",
                "description": "Um homem fica preso em um aeroporto internacional quando seu país é extinto durante sua viagem.",
                "youtubeId": "3YH3Ou6f3MU",
                "thumbnail": "https://image.tmdb.org/t/p/w500/7BCTdek5LFHglcgl7shsm7igJAH.jpg",
                "rating": "4.0/5"
            }
        ]
    },
    {
        name: "Terror",
        movies: [
            {
            "title": "Hereditário",
            "year": 2018,
            "duration": "2h 7m",
            "rating": "4.4/5",
            "description": "Após a morte da avó, a família Graham começa a desvendar segredos perturbadores sobre seus ancestrais.",
            "youtubeId": "V6wWKNij_1M",
            "thumbnail": "https://image.tmdb.org/t/p/w500/lHV8HHlhwNup2VbpiACtlKzaGIQ.jpg"
        },
        {
            "title": "O Exorcista",
            "year": 1973,
            "duration": "2h 2m",
            "rating": "4.3/5",
            "description": "Quando uma menina de 12 anos é possuída por uma entidade misteriosa, sua mãe busca a ajuda de dois padres para salvá-la.",
            "youtubeId": "YDGw1MTEe9k",
            "thumbnail": "https://image.tmdb.org/t/p/w500/4ucLGcXVVSVnsfkGtbLY4XAius8.jpg"
        },
        {
            "title": "A Quiet Place",
            "year": 2018,
            "duration": "1h 30m",
            "rating": "4.2/5",
            "description": "Uma família é forçada a viver em silêncio enquanto se esconde de criaturas que caçam pelo som.",
            "youtubeId": "WR7cc5t7tv8",
            "thumbnail": "https://image.tmdb.org/t/p/w500/nAU74GmpUk7t5iklEp3bufwDq4n.jpg"
        },
        
        {
            title: "Interestelar",
            year: 2014,
            duration: "2h 49m",
            rating: "4.8/5",
            description: "Um grupo de astronautas viaja através de um buraco de minhoca em busca de um novo lar para a humanidade.",
            youtubeId: "zSWdZVtXT7E",
            thumbnail: "https://image.tmdb.org/t/p/w500/8Y43POKjjKDGI9MH89NW0NAzzp8.jpg"
        },
        {
            title: "Duro de Matar",
            year: 1988,
            duration: "2h 12m",
            rating: "4.3/5",
            description: "O policial John McClane tenta salvar sua esposa e várias outras pessoas que foram feitas reféns por terroristas alemães durante uma festa de Natal em Los Angeles.",
            youtubeId: "jaJuwKCmJbY",
            thumbnail: "https://image.tmdb.org/t/p/w500/yFihWxQcmqcaBR31QM6Y8gT6aYV.jpg"
        }
        ]
    }
];

        // Elementos do DOM
        const categoriesContainer = document.querySelector('.categories-container');
        const movieModal = document.getElementById('movieModal');
        const closeModalBtn = document.querySelector('.close-btn');
        const youtubePlayerContainer = document.createElement('div');
        youtubePlayerContainer.id = 'youtube-player-container';
        document.body.appendChild(youtubePlayerContainer);
    
        // Variável para o player do YouTube
        let player;
    
        // Carregar categorias e filmes
        function loadCategories() {
            categoriesContainer.innerHTML = '';
    
            categories.forEach((category, index) => {
                // Adicionar delay para animação
                const categoryDelay = index * 100;
    
                const categoryElement = document.createElement('div');
                categoryElement.className = 'category';
                categoryElement.style.animationDelay = `${categoryDelay}ms`;
    
                const categoryTitle = document.createElement('h2');
                categoryTitle.textContent = category.name;
    
                const moviesGrid = document.createElement('div');
                moviesGrid.className = 'movies-grid';
    
                category.movies.forEach((movie, movieIndex) => {
                    const movieCard = document.createElement('div');
                    movieCard.className = 'movie-card';
                    movieCard.style.animationDelay = `${categoryDelay + (movieIndex * 50)}ms`;
                    movieCard.innerHTML = `
                        <img src="${movie.thumbnail}" alt="${movie.title}" class="movie-thumbnail">
                        <div class="movie-overlay">
                            <h3 class="movie-title">${movie.title}</h3>
                            <div class="movie-details">${movie.year} • ${movie.duration} • ${movie.rating}</div>
                        </div>
                    `;
    
                    movieCard.addEventListener('click', () => openMovieModal(movie));
                    moviesGrid.appendChild(movieCard);
                });
    
                categoryElement.appendChild(categoryTitle);
                categoryElement.appendChild(moviesGrid);
                categoriesContainer.appendChild(categoryElement);
            });
        }
    
        // Abrir modal do filme
        function openMovieModal(movie) {
            document.getElementById('modal-title').textContent = movie.title;
            document.getElementById('modal-year').textContent = movie.year;
            document.getElementById('modal-runtime').textContent = movie.duration;
            document.getElementById('modal-rating').textContent = movie.rating;
            document.getElementById('modal-description').textContent = movie.description;
    
            const modalPoster = document.querySelector('.modal-poster');
            modalPoster.style.backgroundImage = `url(${movie.thumbnail})`;
    
            const modalPlayBtn = document.getElementById('modal-play-btn');
            modalPlayBtn.onclick = () => playMovie(movie.youtubeId);
    
            // Configurar botão de destaque
            const featuredPlayBtn = document.getElementById('featured-play-btn');
            if (featuredPlayBtn) {
                featuredPlayBtn.onclick = () => playMovie(movie.youtubeId);
            }
    
            // Mostrar modal com animação
            movieModal.style.display = 'block';
            setTimeout(() => {
                movieModal.classList.add('show');
            }, 10);
        }
    
        // Fechar modal
        function closeModal() {
            movieModal.classList.remove('show');
            setTimeout(() => {
                movieModal.style.display = 'none';
            }, 300);
        }
    
        // Reproduzir filme no player do YouTube
        function playMovie(videoId) {
            closeModal();
    
            youtubePlayerContainer.innerHTML = `
                <div class="youtube-player-wrapper">
                    <div id="youtube-player"></div>
                </div>
                <span class="close-player-btn">&times;</span>
            `;
    
            youtubePlayerContainer.classList.add('show');
    
            const closePlayerBtn = youtubePlayerContainer.querySelector('.close-player-btn');
            closePlayerBtn.addEventListener('click', closePlayer);
    
            // Carregar player do YouTube
            if (typeof YT !== 'undefined' && YT.Player) {
                initializePlayer(videoId);
            } else {
                loadYouTubeAPI().then(() => initializePlayer(videoId));
            }
        }
    
        // Inicializar player do YouTube
        function initializePlayer(videoId) {
            player = new YT.Player('youtube-player', {
                width: '100%',
                height: '100%',
                videoId: videoId,
                playerVars: {
                    'autoplay': 1,
                    'controls': 1,
                    'rel': 0,
                    'modestbranding': 1,
                    'showinfo': 0
                },
                events: {
                    'onReady': onPlayerReady,
                    'onStateChange': onPlayerStateChange
                }
            });
        }
    
        // Carregar API do YouTube
        function loadYouTubeAPI() {
            return new Promise((resolve) => {
                const tag = document.createElement('script');
                tag.src = "https://www.youtube.com/iframe_api";
                const firstScriptTag = document.getElementsByTagName('script')[0];
                firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    
                window.onYouTubeIframeAPIReady = function () {
                    resolve();
                };
            });
        }
    
        // Eventos do player do YouTube
        function onPlayerReady(event) {
            event.target.playVideo();
        }
    
        function onPlayerStateChange(event) {
            if (event.data === YT.PlayerState.ENDED) {
                closePlayer();
            }
        }
    
        // Fechar player
        function closePlayer() {
            youtubePlayerContainer.classList.remove('show');
            setTimeout(() => {
                youtubePlayerContainer.innerHTML = '';
                if (player) {
                    player.destroy();
                    player = null;
                }
            }, 300);
        }
    
        // Event listeners
        closeModalBtn.addEventListener('click', closeModal);
    
        window.addEventListener('click', (event) => {
            if (event.target === movieModal) {
                closeModal();
            }
        });

        // Fechar dropdown ao clicar fora
document.addEventListener('click', function(event) {
    const userMenu = document.getElementById('userMenu');
    if (!userMenu.contains(event.target)) {
        const dropdown = document.querySelector('.dropdown-menu');
        dropdown.style.display = 'none';
    }
});

// Alternar dropdown ao clicar no user menu
document.getElementById('userMenu').addEventListener('click', function() {
    const dropdown = document.querySelector('.dropdown-menu');
    if (dropdown.style.display === 'block') {
        dropdown.style.display = 'none';
    } else {
        dropdown.style.display = 'block';
    }
});
    
        // Inicializar
        loadCategories();
    });