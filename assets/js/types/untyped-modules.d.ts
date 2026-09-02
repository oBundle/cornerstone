/* eslint-disable @typescript-eslint/no-explicit-any */
// Ambient declarations for theme dependencies that ship no type definitions.
// Tighten these into real interfaces as TS usage grows.

declare module '@bigcommerce/stencil-utils' {
    const utils: any;
    export default utils;
}

declare module 'easyzoom';
declare module 'jstree';
declare module 'lazysizes';
declare module 'nod-validate';
declare module 'object-fit-images';
declare module 'slick-carousel';
declare module 'svg-injector';
declare module 'webfontloader';
declare module 'foundation-sites/js/foundation/*';
