// Tailwind config for custom colors and shadow effects
// This must run before any Tailwind classes are compiled/applied.
tailwind.config = {
    theme: {
        extend: {
            colors: {
                // Custom colors used in Tailwind classes
                'brand-blue': '#3b82f6',
                'brand-dark': '#1e40af',
            },
            boxShadow: {
                // Custom shadow effect for the hover state
                'neon': '0 0 15px rgba(59, 130, 246, 0.9)',
            }
        }
    }
}

/**
 * Simulates watching an advertisement, managing button and message state.
 * The function provides visual feedback without a backend reward system.
 */
function watchAd() {
    const messageBox = document.getElementById('message-box');
    const button = document.getElementById('watch-ad-button');
    
    // --- 1. Start Loading State (Yellow) ---
    messageBox.classList.remove('opacity-0', 'scale-90', 'bg-green-600', 'bg-red-600');
    messageBox.classList.add('opacity-100', 'scale-100', 'bg-yellow-600');
    messageBox.textContent = 'Advertisement is playing... (3 seconds)'; 

    // Disable button during "ad load"
    button.disabled = true;
    button.classList.add('opacity-50', 'cursor-not-allowed');

    setTimeout(() => {
        // --- 2. Change to Completion State (Green) ---
        messageBox.classList.remove('bg-yellow-600');
        messageBox.classList.add('bg-green-600');
        messageBox.textContent = 'Ad finished. Thank you for your support!'; 
        
        // Hide message and re-enable button after a short delay
        setTimeout(() => {
            messageBox.classList.remove('opacity-100', 'scale-100');
            messageBox.classList.add('opacity-0', 'scale-90');
            
            button.disabled = false;
            button.classList.remove('opacity-50', 'cursor-not-allowed');
        }, 2500);
    }, 3000); // Ad duration
}

/**
 * Manages the toggle icon rotation based on the details element state.
 */
document.addEventListener('DOMContentLoaded', function() {
    const detailsElement = document.getElementById('sticky-widget-details');
    const icon = document.getElementById('toggle-icon');

    if (detailsElement && icon) {
        // Listen for open/close events on the details tag
        detailsElement.addEventListener('toggle', () => {
            if (detailsElement.open) {
                icon.classList.add('rotate-180');
            } else {
                icon.classList.remove('rotate-180');
            }
        });
        
        // Set initial state
        if (detailsElement.open) {
            icon.classList.add('rotate-180');
        }
    }
});