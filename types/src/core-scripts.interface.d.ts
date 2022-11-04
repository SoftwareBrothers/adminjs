/**
 * @memberof Assets
 * @alias CoreScripts
 *
 * Optional mapping of core AdminJS browser scripts:
 * - app.bundle.js
 * - components.bundle.js
 * - design-system.bundle.js
 * - global.bundle.js
 *
 * You may want to use it if you'd like to version assets for caching. This
 * will only work if you have also configured `assetsCDN` in AdminJS options.
 *
 * Example:
 * ```
 * {
 *   'app.bundle.js': 'app.bundle.123456.js',
 *   'components.bundle.js': 'components.bundle.123456.js',
 *   'design-system.bundle.js': 'design-system.bundle.123456.js',
 *   'global.bundle.js': 'global.bundle.123456.js',
 * }
 * ```
 */
export interface CoreScripts {
    /**
     * App Bundle
     */
    'app.bundle.js': string;
    /**
     * Custom Components
     */
    'components.bundle.js': string;
    /**
     * Design System Bundle
     */
    'design-system.bundle.js': string;
    /**
     * Global bundle
     */
    'global.bundle.js': string;
}
