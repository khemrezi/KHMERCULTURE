const defaultConfig = {
    site_title: "AI 2025 News Hub",
    main_heading: "Latest AI Developments & Breakthroughs", 
    content_text: "Stay updated with the most important artificial intelligence news, research breakthroughs, and industry developments shaping 2025"
};

let config = { ...defaultConfig };

async function onConfigChange(newConfig) {
    config = { ...config, ...newConfig };
    
    document.getElementById('siteTitle').textContent = config.site_title || defaultConfig.site_title;
    document.getElementById('mainHeading').textContent = config.main_heading || defaultConfig.main_heading;
    document.getElementById('contentText').textContent = config.content_text || defaultConfig.content_text;
}

function mapToCapabilities(config) {
    return {
        recolorables: [],
        borderables: [],
        fontEditable: undefined,
        fontSizeable: undefined
    };
}

function mapToEditPanelValues(config) {
    return new Map([
        ["site_title", config.site_title || defaultConfig.site_title],
        ["main_heading", config.main_heading || defaultConfig.main_heading],
        ["content_text", config.content_text || defaultConfig.content_text]
    ]);
}

// ===== RANDOM FLYING ANIMATION SYSTEM =====

class RandomFlyingAnimationManager {
    constructor() {
        this.elements = document.querySelectorAll('.fade-element');
        this.lastScrollY = window.scrollY;
        this.ticking = false;
        this.animationTypes = [
            'fly-left', 'fly-right', 'fly-top', 'fly-bottom', 
            'fly-rotate', 'fly-scale', 'fly-diagonal', 'fly-bounce'
        ];
        this.fadeOutTypes = [
            'fade-out-left', 'fade-out-right', 'fade-out-up', 'fade-out-rotate'
        ];
        this.elementAnimations = new Map();
        this.init();
    }

    init() {
        this.assignRandomAnimations();
        this.checkElements();
        
        window.addEventListener('scroll', () => {
            if (!this.ticking) {
                requestAnimationFrame(() => {
                    this.handleScroll();
                    this.ticking = false;
                });
                this.ticking = true;
            }
        });

        window.addEventListener('resize', () => {
            this.checkElements();
        });
    }

    assignRandomAnimations() {
        this.elements.forEach((element, index) => {
            const randomEntranceIndex = Math.floor(Math.random() * this.animationTypes.length);
            const entranceAnimation = this.animationTypes[randomEntranceIndex];
            
            const randomExitIndex = Math.floor(Math.random() * this.fadeOutTypes.length);
            const exitAnimation = this.fadeOutTypes[randomExitIndex];
            
            this.elementAnimations.set(element, {
                entrance: entranceAnimation,
                exit: exitAnimation
            });
            
            element.classList.add(entranceAnimation);
        });
    }

    handleScroll() {
        const currentScrollY = window.scrollY;
        const scrollDirection = currentScrollY > this.lastScrollY ? 'down' : 'up';
        
        this.checkElements(scrollDirection);
        this.lastScrollY = currentScrollY;
    }

    checkElements(scrollDirection = null) {
        const windowHeight = window.innerHeight;
        const scrollTop = window.scrollY;

        this.elements.forEach((element, index) => {
            const elementTop = element.offsetTop;
            const elementHeight = element.offsetHeight;
            const elementBottom = elementTop + elementHeight;
            const animations = this.elementAnimations.get(element);

            const isInViewport = (elementTop < scrollTop + windowHeight * 0.85) && 
                               (elementBottom > scrollTop + windowHeight * 0.15);

            const isAboveViewport = elementBottom < scrollTop + windowHeight * 0.1;

            this.clearAnimationClasses(element);

            if (isInViewport) {
                element.classList.add('visible');
            } else if (isAboveViewport && scrollDirection === 'down') {
                element.classList.add(animations.exit);
            } else {
                element.classList.add(animations.entrance);
            }

            if (scrollDirection === 'up' && isInViewport) {
                element.classList.add('visible');
            }
        });
    }

    clearAnimationClasses(element) {
        element.classList.remove('visible');
        this.animationTypes.forEach(type => element.classList.remove(type));
        this.fadeOutTypes.forEach(type => element.classList.remove(type));
    }

    shuffleAnimations() {
        this.assignRandomAnimations();
        this.checkElements();
    }
}

// ===== INITIALIZATION =====

// Initialize random flying animations when page loads
document.addEventListener('DOMContentLoaded', () => {
    const animationManager = new RandomFlyingAnimationManager();
    
    // Optional: Add a button to shuffle animations (for testing)
    // Uncomment the lines below if you want a shuffle button
    /*
    const shuffleBtn = document.createElement('button');
    shuffleBtn.textContent = '🎲 Shuffle Animations';
    shuffleBtn.style.cssText = 'position: fixed; top: 20px; right: 20px; z-index: 1000; padding: 10px; background: #667eea; color: white; border: none; border-radius: 8px; cursor: pointer;';
    shuffleBtn.onclick = () => animationManager.shuffleAnimations();
    document.body.appendChild(shuffleBtn);
    */
});

// Initialize Element SDK
if (window.elementSdk) {
    window.elementSdk.init({
        defaultConfig,
        onConfigChange,
        mapToCapabilities,
        mapToEditPanelValues
    });
}