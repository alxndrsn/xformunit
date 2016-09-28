module.exports = function(xml, xsls) {
  console.log()
  var processor = new XSLTProcessor();
  processor.importStylesheet(xsls);

  var transformed = processor.transformToDocument(xml);
  return new XMLSerializer().serializeToString(transformed.documentElement.firstElementChild);
};
