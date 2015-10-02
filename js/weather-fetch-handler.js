(function(global) {
  function stripSearchParameters(url) {
    var strippedUrl = new URL(url);
    strippedUrl.search = '';
    return strippedUrl.toString();
  }

  global.weatherFetchHandler = function(request) {
    return global.fetch(request).then(function(response) {
      if (response.ok) {
        return global.caches.open(global.toolbox.options.cacheName).then(function(cache) {
          return cache.put(stripSearchParameters(request.url), response.clone()).then(function() {
            return response;
          });
        });
      }
      throw new Error('A response with an error status code was returned.');
    }).catch(function(error) {
      return global.caches.open(global.toolbox.options.cacheName).then(function(cache) {
        return cache.match(stripSearchParameters(request.url));
      });
    });
  }
})(self);
