var asXml = require('jquery').parseXML,
    request = require('request'),
    url = require('url');

module.exports = function(xml, xslsPath) {
  console.log('xslt()', 'xml', xml, 'xslsPath', xslsPath);

  return new Promise(function(resolve, reject) {
    request(url.resolve(window.location.href, xslsPath), function(err, res, body) {
      if(err) return reject(err);
      if(res.statusCode > 299 || res.statusCode < 200) {
        return reject(body);
      }

      try {
        var processor = new XSLTProcessor();
        processor.importStylesheet(asXml(body));

        var transformed = processor.transformToDocument(asXml(xml));
        return resolve(new XMLSerializer().serializeToString(transformed.documentElement.firstElementChild));
      } catch(e) {
        return reject(e);
      }
    });
  });
};
