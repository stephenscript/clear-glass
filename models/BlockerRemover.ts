class RemoveBlockers {
    constructor() {}

    public fromGlassDoor() {
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
        `
        this.attachStyle(style)
        this.preventScrollLock()
    }

    public fromBlind() {
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
        `
        this.attachStyle(style)
    }

    public fromRepVue() {
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
        `
        this.attachStyle(style)
    }

    private attachStyle(style: string) {
        const styleElement = document.createElement('style')
        styleElement.textContent = style
        document.head.prepend(styleElement)
    }

    private preventScrollLock() {
        const hardsellLoggedIn = document.getElementById('ContentWallHardsell')

        if (hardsellLoggedIn) {
            window.addEventListener(
                'scroll',
                (e) => {
                    e.stopPropagation()
                },
                { capture: true },
            )
        }
    }
}

const removeBlockers = new RemoveBlockers()
export { removeBlockers }
