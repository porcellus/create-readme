// Generated by CoffeeScript 1.10.0
(function() {
  var DependencyParser, Promise, githubUrl2Obj, path, winston;

  winston = require('winston');

  Promise = require('bluebird');

  path = require('path');

  githubUrl2Obj = require('github-url-to-object');

  module.exports = DependencyParser = (function() {
    var getDepData;

    DependencyParser.name = "DependencyParser";

    function DependencyParser(options) {
      this.options = options;
      if (this.options == null) {
        this.options = {};
      }
    }

    getDepData = function(dep) {
      var pkg, pkgPath, ref, ref1;
      pkgPath = path.join(process.cwd(), "node_modules", dep, "package.json");
      winston.debug(" Reading " + pkgPath);
      pkg = require(pkgPath);
      if (((ref = pkg.repository) != null ? ref.url : void 0) && githubUrl2Obj(pkg.repository.url)) {
        winston.debug(" Adding dependency" + dep);
        return {
          name: dep,
          url: githubUrl2Obj(pkg.repository.url).https_url,
          desc: (ref1 = pkg.description) != null ? ref1 : ""
        };
      } else {
        return {
          name: dep,
          url: null
        };
      }
    };

    DependencyParser.prototype.run = function(pkg) {
      winston.info("Parsing dependencies");
      return Promise.resolve({
        dep: Object.keys(pkg.dependencies).map(getDepData),
        dev: Object.keys(pkg.devDependencies).map(getDepData)
      });
    };

    return DependencyParser;

  })();

}).call(this);