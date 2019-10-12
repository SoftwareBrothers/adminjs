import ViewHelpers from '../../backend/utils/view-helpers'

const onProd = process.env.NODE_ENV === 'production'

/**
 * Returns external dependencies either from local bundle or from CDNs.
 * @private
 *
 * @param {Object}   options
 * @param {boolean} [options.fromCDN=true]    indicates if scripts should be fetched
 *                                            from external CDN
 * @param {ViewHelpers} options.viewHelpers   initilized ViewHelpers instance
 *
 * @return {string}                   list of scripts which has to be injected to to the
 *                                    head of the app
 */
const globalDependencies = ({ fromCDN, viewHelpers }: {
  fromCDN: boolean;
  viewHelpers: ViewHelpers;
}): string => (fromCDN
  ? `
    <script crossorigin src="https://unpkg.com/react@16/umd/react.${onProd ? 'production.min' : 'development'}.js"></script>
    <script crossorigin src="https://unpkg.com/react-dom@16/umd/react-dom.${onProd ? 'production.min' : 'development'}.js"></script>
    <script crossorigin="anonymous" src="https://unpkg.com/@material-ui/core/umd/material-ui.production.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/react-redux/6.0.1/react-redux.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/react-router/5.0.0/react-router.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/react-router-dom/5.0.0/react-router-dom.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/redux/4.0.1/redux.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/axios/0.18.0/axios.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/prop-types/15.7.2/prop-types.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/styled-components/4.2.0/styled-components.min.js"></script>
    <script src="https://unpkg.com/recharts/umd/Recharts.min.js"></script>
  ` : `<script src="${viewHelpers.assetPath('global.bundle.js')}"></script>`)

export default globalDependencies
