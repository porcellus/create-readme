// Generated by CoffeeScript 1.10.0
(function() {
  var OptionsParser, Promise, winston,
    hasProp = {}.hasOwnProperty;

  Promise = require('bluebird');

  winston = require('winston');

  module.exports = OptionsParser = (function() {
    function OptionsParser() {
      void 0;
    }

    OptionsParser.prototype.parse = function(pkg, options) {
      var key, ref, ref1, val;
      winston.info("Parsing options");
      if (options == null) {
        options = {};
      }
      if (((ref = pkg.config) != null ? ref.readme : void 0) != null) {
        winston.debug("------------------------------------------------");
        winston.debug("Options read from package.json config");
        ref1 = pkg.config.readme;
        for (key in ref1) {
          if (!hasProp.call(ref1, key)) continue;
          val = ref1[key];
          if (!(options[key] == null)) {
            continue;
          }
          winston.debug(key + ": " + val);
          options[key] = val;
        }
        winston.debug("------------------------------------------------");
      }
      options.git = pkg.git;
      if (options.filename == null) {
        options.filename = './README.md';
      }
      winston.debug("------------------------------------------------");
      winston.debug("General options:");
      winston.debug(JSON.stringify(options, null, 2));
      winston.debug("------------------------------------------------");
      return options;
    };

    return OptionsParser;

  })();

}).call(this);