importScripts('./workbox-sw.prod.v2.1.2.js');

/**
 * DO NOT EDIT THE FILE MANIFEST ENTRY
 *
 * The method precache() does the following:
 * 1. Cache URLs in the manifest to a local cache.
 * 2. When a network request is made for any of these URLs the response
 *    will ALWAYS comes from the cache, NEVER the network.
 * 3. When the service worker changes ONLY assets with a revision change are
 *    updated, old cache entries are left as is.
 *
 * By changing the file manifest manually, your users may end up not receiving
 * new versions of files because the revision hasn't changed.
 *
 * Please use workbox-build or some other tool / approach to generate the file
 * manifest which accounts for changes to local files and update the revision
 * accordingly.
 */
// const workboxSW = new self.WorkboxSW({
//     "skipWaiting": true,
//     "clientsClaim": true
// });
// function regCache(params) {
    
//     const fileManifest = [
//         {
//             "url": "index.html",
//             "revision": "7dc612bd22a1710ad8c318480f474ea5"
//         },
//         {
//             "url": "index.js",
//             "revision": "125af70e751fba8f8d0de322e88b27f4"
//         }
//     ];
//     workboxSW.router.registerRoute(
//         new RegExp(/.+\.(png|jpg|jpeg|js|css)/),
//         workboxSW.strategies.cacheFirst()
//     );
//     // workboxSW.router.registerRoute(
//     //     new RegExp(/^https?:\/\/.+\.8591\.com\.tw\/static\/.+\.(png|jpg|jpeg|js|css|woff|svg|ttf|otf|eot|woff2)/),
//     //     workboxSW.strategies.cacheFirst()
//     // );
//     // workboxSW.router.registerRoute(
//     //     new RegExp('^http://localhost:5050/api'),
//     //     workboxSW.strategies.staleWhileRevalidate()
//     // );

//     workboxSW.precache([]);

// }
// self.addEventListener('install', event => {
//     console.log('installing sw.js');
//     self.skipWaiting();

//     regCache();
// });