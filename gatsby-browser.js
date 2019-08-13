/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

// You can delete this file if you're not using it
exports.onRouteUpdate = ({ location }) => {
    console.log('new pathname', location.pathname)
    document.documentElement.style.setProperty('--scroll-ratio', 1);

    window.addEventListener('scroll', () => {
        window.requestAnimationFrame(() => {
            let s = 0

            if (window.scrollY > 64) {
                s = 0
            } else {
                s = 64 - window.scrollY
            }

            document.documentElement.style.setProperty('--scroll-ratio', s / 64);
        })
    })
  }