/* removeBlockers.js

- Hide obstructive elements from glassdoor.com, teamblind.com, and repvue.com by overriding styles
- Block restrictive scroll functions from preventing page navigation

*/

class RemoveBlockers {
    private url: string;

    constructor() {
        this.url = window.location.href;
    }

    private fromGlassDoor = () => {
        const style = `
            body {
                overflow: visible !important;
                position: static !important;
            }
            div#ContentWallHardsell {
                display: none !important;
                --blocker-tag: 1; 
            }
            div#HardsellOverlay {
                display: none !important;
                --blocker-tag: 1; 
            }
            div#UserAlert {
                display: none !important;
                --blocker-tag: 1; 
            }
        `;
        this.attachStyle(style);
        this.preventScrollLock();
    };

    private fromBlind = () => {
        const style = `
            body {
                overflow: visible !important;
            }
            div.backdrop-blur-sm {
                display: none !important;
                --blocker-tag: 1; 
            }
            div.z-10,
            div.z-20,
            div.z-30,
            div.z-40 {
                display: none !important;
                --blocker-tag: 1; 
            }
        `;
        this.attachStyle(style);
    };

    private fromRepVue = () => {
        const style = `
            div[class^="LimitedAccess_wrapper"] {
                --blur: 0 !important;
                --blocker-tag: 1; 
            }
            div[class^="LimitedAccess_wrapper"]::before {
                display:none !important;
                --blocker-tag: 1; 
            }
            div[class^="LimitedAccess_companyWrapper"] {
                display: none !important;
                --blocker-tag: 1; 
            }
        `;
        this.attachStyle(style);
    };

    countHiddenElements = () => {
        const elements = document.querySelectorAll('div');
        let hiddenCount = 0;
        elements.forEach((element) => {
            if (window.getComputedStyle(element).getPropertyValue('--blocker-tag')) {
                hiddenCount += 1;
            }
        });
        return hiddenCount;
    };

    private showBlockedCount = () => {
        const count = this.countHiddenElements();
        if (count === 0) {
            return;
        }

        chrome.runtime.sendMessage(
            { action: 'displayCount', data: { blockedCount: count } },
            (response) => {},
        );
    };

    private attachStyle(style: string) {
        const styleElement = document.createElement('style');
        styleElement.textContent = style;
        document.head.prepend(styleElement);
    }

    private preventScrollLock() {
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

    public mount = () => {
        console.log('Clear Glass loaded.');

        const lambdas: { [key: string]: () => void } = {
            glassdoor: removeBlockers.fromGlassDoor,
            teamblind: removeBlockers.fromBlind,
            repvue: removeBlockers.fromRepVue,
        };

        if (this.url) {
            const domain = this.url.replace(/.+\/\/|www.|\..+/g, '');
            if (domain in lambdas) {
                console.log(`Removing blockers from ${domain}`);
                document.addEventListener('DOMContentLoaded', () => {
                    lambdas[domain]();
                    this.showBlockedCount();
                });
            }
        }
    };
}

const removeBlockers = new RemoveBlockers();
removeBlockers.mount();
