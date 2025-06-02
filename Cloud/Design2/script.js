// c:\Users\jayan\OneDrive\Desktop\CC\script.js
document.addEventListener('DOMContentLoaded', function() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.experiment-content');
    
    // Function to activate a specific tab
    function activateTab(tabId) {
        // Deactivate all tabs
        tabButtons.forEach(button => button.classList.remove('active'));
        tabContents.forEach(content => content.classList.remove('active'));
        
        // Activate selected tab
        const activeTabButton = document.querySelector(`.tab-btn[data-id="${tabId}"]`);
        activeTabButton.classList.add('active');
        document.getElementById(tabId).classList.add('active');
        
        // On mobile, scroll the active tab into view
        if (window.innerWidth < 768) {
            activeTabButton.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
        }
    }
    
    // Add click event listeners to tab buttons
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const tabId = this.getAttribute('data-id');
            activateTab(tabId);
            
            // Update URL hash for direct access to tabs
            history.pushState(null, null, `#${tabId}`);
        });
    });
    
    // Handle direct URL access with hash
    if (window.location.hash) {
        const tabId = window.location.hash.substring(1);
        const tabExists = document.getElementById(tabId);
        
        if (tabExists) {
            activateTab(tabId);
        } else {
            activateTab(tabButtons[0].getAttribute('data-id'));
        }
    } else {
        // Set first tab as active by default
        if (!document.querySelector('.tab-btn.active')) {
            const firstTabId = tabButtons[0].getAttribute('data-id');
            activateTab(firstTabId);
        }
    }
    
    // Handle browser back/forward navigation
    window.addEventListener('popstate', function() {
        const tabId = window.location.hash.substring(1) || tabButtons[0].getAttribute('data-id');
        activateTab(tabId);
    });
    
    // Add smooth scrolling behavior to the tab navigation
    const experimentContents = document.querySelectorAll('.experiment-content');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetId = this.dataset.id;
            
            // Remove active class from all buttons and contents
            tabButtons.forEach(btn => btn.classList.remove('active'));
            experimentContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked button and corresponding content
            this.classList.add('active');
            document.getElementById(targetId).classList.add('active');
            
            // Scroll to the top of the new content with smooth behavior
            document.getElementById(targetId).scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            
            // Also scroll the main content container to top
            document.querySelector('.main-content').scrollTop = 0;
        });
    });
    
    // Add scroll restoration
    window.history.scrollRestoration = 'manual';
    
    // Add smooth scroll for all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
});

// Copy code to clipboard for code-blocks
function copyCode(btn) {
    const codeBlock = btn.parentElement.querySelector('pre code');
    let text = codeBlock.innerText || codeBlock.textContent;
    // Remove leading/trailing whitespace
    text = text.replace(/^\s+|\s+$/g, '');
    // Copy to clipboard
    if (navigator.clipboard) {
        navigator.clipboard.writeText(text).then(function() {
            btn.textContent = 'Copied!';
            setTimeout(() => { btn.textContent = 'Copy'; }, 1500);
        }, function() {
            fallbackCopyTextToClipboard(text, btn);
        });
    } else {
        fallbackCopyTextToClipboard(text, btn);
    }
}

function fallbackCopyTextToClipboard(text, btn) {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.setAttribute('readonly', '');
    textarea.style.position = 'absolute';
    textarea.style.left = '-9999px';
    document.body.appendChild(textarea);
    textarea.select();
    try {
        document.execCommand('copy');
        btn.textContent = 'Copied!';
        setTimeout(() => { btn.textContent = 'Copy'; }, 1500);
    } catch (err) {
        btn.textContent = 'Failed';
        setTimeout(() => { btn.textContent = 'Copy'; }, 1500);
    }
    document.body.removeChild(textarea);
}