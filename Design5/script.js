document.addEventListener('DOMContentLoaded', function() {
    // Handle search functionality
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.getElementById('searchBtn');
    const experimentCards = document.querySelectorAll('.experiment-card');

    function performSearch() {
        const searchTerm = searchInput.value.toLowerCase();
        
        experimentCards.forEach(card => {
            const title = card.querySelector('h3').textContent.toLowerCase();
            const description = card.querySelector('p').textContent.toLowerCase();
            
            if (title.includes(searchTerm) || description.includes(searchTerm)) {
                card.style.display = 'flex';
            } else {
                card.style.display = 'none';
            }
        });
    }

    searchBtn.addEventListener('click', performSearch);
    searchInput.addEventListener('keyup', function(e) {
        if (e.key === 'Enter') {
            performSearch();
        }
    });

    // Mobile responsive sidebar toggle
    const toggleSidebar = document.createElement('button');
    toggleSidebar.classList.add('sidebar-toggle');
    toggleSidebar.innerHTML = '<i class="fas fa-bars"></i>';
    document.querySelector('.header-title').prepend(toggleSidebar);

    toggleSidebar.addEventListener('click', function() {
        document.querySelector('.sidebar').classList.toggle('active');
    });
});
