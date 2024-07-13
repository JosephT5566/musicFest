import { getAssetFromKV, mapRequestToAsset } from '@cloudflare/kv-asset-handler'
import mime from 'mime'

/**
 * The DEBUG flag will do two things that help during development:
 * 1. we will skip caching on the edge, which makes it easier to
 *    debug.
 * 2. we will return an error message on exception in your Response rather
 *    than the default 404.html page.
 */
const DEBUG = false

addEventListener('fetch', event => {
  try {
    event.respondWith(handleEvent(event))
  } catch (e) {
    if (DEBUG) {
      return event.respondWith(
        new Response(e.message || e.toString(), {
          status: 500,
        }),
      )
    }
    event.respondWith(new Response('Internal Error', { status: 500, statusText: e.message }))
  }
})

async function handleEvent(event) {
  const { request } = event;
  const url = new URL(request.url)

  if (url.hostname === "musicfest.josephtseng-tw.com" && url.pathname.startsWith("/dev")) {
    const auth = request.headers.get("Authorization")

    // Check if the Authorization header is present and valid
    if (!auth || !validateAuth(auth)) {
      return Response.redirect("https://musicfest.josephtseng-tw.com/", 302)
    }
  }

  let options = {
    mapRequestToAsset: mapToAsset
  }

  /**
   * You can add custom logic to how we fetch your assets
   * by configuring the function `mapRequestToAsset`
   */
  // options.mapRequestToAsset = handlePrefix(/^\/docs/)

  try {
    if (DEBUG) {
      // customize caching
      options.cacheControl = {
        bypassCache: true,
      };
    }

    const page = await getAssetFromKV(event, {
      mapRequestToAsset: (req) => mapToAsset(req),
    });

    // allow headers to be altered
    const response = new Response(page.body, page);

    response.headers.set("X-XSS-Protection", "1; mode=block");
    response.headers.set("X-Content-Type-Options", "nosniff");
    response.headers.set("X-Frame-Options", "DENY");
    response.headers.set("Referrer-Policy", "unsafe-url");
    response.headers.set("Feature-Policy", "none");

    return response;

  } catch (e) {
    // if an error is thrown try to serve the asset at 404.html
    if (!DEBUG) {
      try {
        let notFoundResponse = await getAssetFromKV(event, {
          mapRequestToAsset: req => new Request(`${new URL(req.url).origin}/404.html`, req),
        })

        return new Response(notFoundResponse.body, { ...notFoundResponse, status: 404 })
      } catch (e) { }
    }

    return new Response(e.message || e.toString(), { status: 500 })
  }
}

/**
 * Here's one example of how to modify a request to
 * remove a specific prefix, in this case `/docs` from
 * the url. This can be useful if you are deploying to a
 * route on a zone, or if you only want your static content
 * to exist at a specific path.
 */
function handlePrefix(prefix) {
  return request => {
    // compute the default (e.g. / -> index.html)
    let defaultAssetKey = mapRequestToAsset(request)
    let url = new URL(defaultAssetKey.url)

    // strip the prefix from the path for lookup
    url.pathname = url.pathname.replace(prefix, '/')

    // inherit all other props from the default request
    return new Request(url.toString(), defaultAssetKey)
  }
}

const mapToAsset = (request) => {
  const parsedUrl = new URL(request.url)
  let pathname = parsedUrl.pathname

  // TODO: hack - this is not bulletproof
  let hasExtension = pathname.includes('.')

  if (pathname.endsWith('/')) {
    // If path looks like a directory append index.html
    // e.g. If path is /about/ -> /about/index.html
    pathname = pathname.concat('index.html')
  } else if (!hasExtension || !mime.getType(pathname)) {
    pathname = pathname.concat('.html')
  }

  parsedUrl.pathname = pathname

  const req = new Request(parsedUrl.toString(), request)

  return req
}

/**
 * Validate the Basic Authentication header.
 * @param {string} auth - The Authorization header value.
 * @returns {boolean} - True if the credentials are valid, false otherwise.
 */
const validateAuth = (auth) => {
  // Decode the Base64 encoded username:password string
  const [authType, encoded] = auth.split(' ')
  if (authType !== 'Basic') return false

  const decoded = atob(encoded)
  const [user, pass] = decoded.split(':')

  return user === CF_AUTH_USERNAME && pass === CF_AUTH_PASSWORD
}
