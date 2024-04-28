/* removeBlockers.js

- Hide obstructive elements from glassdoor.com by overriding styles
- Block restrictive scroll functions from preventing page navigation

*/

const currentUrl = window.location.href;

if (currentUrl.includes('glassdoor.com')) {
    hideObstructions();

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', preventScrollLock);
    } else {
        preventScrollLock();
    }
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
