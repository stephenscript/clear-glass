/* removeBlockers.js

- Hide obstructive elements from glassdoor.com and teamblind.com by overriding styles
- Block restrictive scroll functions from preventing page navigation

*/

console.log('Clear Glass loaded.');

const url = window.location.href;

if (url.includes('glassdoor')) {
    console.log('Removing blockers from Glassdoor');
    removeBlockersGlassdoor();
} else if (url.includes('teamblind')) {
    console.log('Removing blockers from Blind');
    removeBlockersBlind();
}

// === GLASSDOOR ===
function removeBlockersGlassdoor() {
    hideObstructions();

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', preventScrollLock);
    } else {
        preventScrollLock();
    }

    function hideObstructions() {
        const styleElement = document.createElement('style');

        styleElement.textContent = `
        body {
            overflow: visible !important;
            position: static !important;
        }
        div#ContentWallHardsell {
            display: none !important;
        }
        div#HardsellOverlay {
            display: none !important;
        }
        div#UserAlert {
            display: none !important;
        }
        `;

        document.head.prepend(styleElement);
    }

    function preventScrollLock() {
        const hardsellLoggedIn = document.getElementById('ContentWallHardsell');

        if (hardsellLoggedIn) {
            window.addEventListener(
                'scroll',
                (e) => {
                    e.stopPropagation();
                },
                { capture: true },
            );
        }
    }
}

// === BLIND ===
function removeBlockersBlind() {
    const styleElement = document.createElement('style');

    styleElement.textContent = `
        body {
            overflow: visible !important;
        }
        div.backdrop-blur-sm {
            display: none !important;
        }
        div.z-20 {
            display: none !important;
        }
        `;

    document.head.prepend(styleElement);
}
