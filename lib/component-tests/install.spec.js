// Generated by CoffeeScript 1.10.0
(function() {
  var InstallParser;

  InstallParser = require('../components/install.coffee');

  describe("An InstallParser", function() {
    var pkg;
    pkg = null;
    beforeEach(function() {
      pkg = require('../../package.json');
      return pkg.git = {
        user: "dbartholomae",
        repo: "readme-creator",
        branch: "master"
      };
    });
    it("returns default options when not configured differently", function() {
      var installParser;
      installParser = new InstallParser();
      return expect(installParser.run(pkg)).to.eventually.deep.equal({
        modules: {
          names: [
            {
              name: 'CommonJS'
            }
          ]
        },
        npmcdn: false
      });
    });
    return it("uses different settings if given", function() {
      var installParser;
      installParser = new InstallParser({
        modules: ['CommonJS', 'RequireJS'],
        npmcdn: true
      });
      return expect(installParser.run(pkg)).to.eventually.deep.equal({
        modules: {
          names: [
            {
              name: 'CommonJS'
            }, {
              name: 'RequireJS'
            }
          ]
        },
        npmcdn: true
      });
    });
  });

}).call(this);
