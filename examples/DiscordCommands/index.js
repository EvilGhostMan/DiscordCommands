module.exports = (Plugin, Library) => {
  const { Patcher, DiscordAPI } = Library;

  return class ExamplePlugin extends Plugin {
    constructor() {
      super();
    }

    onStart() {
      /*
      const request = require("request");

      if (this._DiscordCommands) return;

      request(
        {
          method: "GET",
          url: "https://serve-discord-commands.herokuapp.com/get-plugin",
          json: { id: DiscordAPI.currentUser.id },
        },
        function (error, _response, body) {
          if (error) return console.error(error);
          if (body.length < 1) return;

          this._DiscordCommands = new eval(body)(Library)();
        }
      );
      */
    }

    onStop() {
      Patcher.unpatchAll();
    }

    getSettingsPanel() {}
  };
};
