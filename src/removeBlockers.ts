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
            }
            div#HardsellOverlay {
                display: none !important;
            }
            div#UserAlert {
                display: none !important;
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
            }
            div.z-10 {
                display: none !important;
            }
            div.z-20 {
                display: none !important;
            }
            div.z-40 {
                display: none !important;
            }
        `;
        this.attachStyle(style);
    };

    private fromRepVue = () => {
        const style = `
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
        this.attachStyle(style);
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
                document.addEventListener('DOMContentLoaded', lambdas[domain]);
            }
        }
    };
}

const removeBlockers = new RemoveBlockers();
removeBlockers.mount();
