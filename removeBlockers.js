/* removeBlockers.js

- Hide obstructive elements from glassdoor.com, teamblind.com, and repvue.com by overriding styles
- Block restrictive scroll functions from preventing page navigation

*/

console.log('Clear Glass loaded.');

const lambdas = {
    glassdoor: removeBlockersGlassdoor,
    teamblind: removeBlockersBlind,
    repvue: removeBlockersRepvue,
};

const url = window.location.href;

if (url) {
    const domain = url.replace(/.+\/\/|www.|\..+/g, '');
    if (domain in lambdas) {
        console.log(`Removing blockers from ${domain}`);
        lambdas[domain]();
    }
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
        div.z-10 {
            display: none !important;
        }
        div.z-20 {
            display: none !important;
        }
        `;

    document.head.prepend(styleElement);
}

// === REPVUE ===
function removeBlockersRepvue() {
    const styleElement = document.createElement('style');

    styleElement.textContent = `
        div[class^="LimitedAccess_wrapper"] {
            --blur: 0 !important;
        }
        div[class^="LimitedAccess_wrapper"]::before {
            display:none !important;
        }
        div[class^="LimitedAccess_companyWrapper"] {
            display: none !important;
        }
        `;

    document.head.prepend(styleElement);
}
