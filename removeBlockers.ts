/* removeBlockers.js

- Hide obstructive elements from glassdoor.com, teamblind.com, and repvue.com by overriding styles
- Block restrictive scroll functions from preventing page navigation

*/

import { removeBlockers } from './models/BlockerRemover'

console.log('Clear Glass loaded.')

const lambdas: { [key: string]: () => void } = {
    glassdoor: removeBlockers.fromGlassDoor,
    teamblind: removeBlockers.fromBlind,
    repvue: removeBlockers.fromRepVue,
}

const url = window.location.href

if (url) {
    const domain = url.replace(/.+\/\/|www.|\..+/g, '')
    if (domain in lambdas) {
        console.log(`Removing blockers from ${domain}`)
        document.addEventListener('DOMContentLoaded', lambdas[domain])
    }
}
