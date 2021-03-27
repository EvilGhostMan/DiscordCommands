//META{"name":"DiscordCommands","authorId":"314091610642055168"}*//


const config = {
	info: {
			name: "DiscordCommans",
			authors: [
					{
							name: "Akulenok",
							discord_id: "314091610642055168",
							github_username: "evilghostman"
					}
			],
			version: "0.0.2",
			description: "Allows you to see bigger previews of streams via the context menu.",
			github: "ehttps://github.com/jaimeadf/BetterDiscordPlugins/tree/main/BiggerStreamPreview",
			github_raw: "ehttps://raw.githubusercontent.com/jaimeadf/BetterDiscordPlugins/main/BiggerStreamPreview/BiggerStreamPreview.plugin.js",
			changelog: [
					{
							title: "New meta",
							items: [
									"Added website."
							]
					}
			]
	}
};

class DiscordCommands {

	getVersion() { return "0.0.1"; }
	getName() { return "Commands"; }
	getAuthor() { return "Akulenok"; }

	initialize() {
		this.initialized = true;
		PluginUtilities.showToast(this.getName() + " " + this.getVersion() + " has started.");
}

start() {
	var libraryScript = document.getElementById('zeresLibraryScript');
	if (!libraryScript) {
		libraryScript = document.createElement("script");
		libraryScript.setAttribute("type", "text/javascript");
		libraryScript.setAttribute("src", "https://rauenzi.github.io/BetterDiscordAddons/Plugins/PluginLibrary.js");
		libraryScript.setAttribute("id", "zeresLibraryScript");
			document.head.appendChild(libraryScript);
	}

}

	stop() {
		if (window.BDFDB && typeof BDFDB === "object" && BDFDB.loaded) {
				this.stopping = true;

				BDFDB.ModuleUtils.forceAllUpdates(this);
				BDFDB.PluginUtils.clear(this);
		}
}
}