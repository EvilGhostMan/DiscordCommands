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
		
	}

start() {
	var libraryScript = document.querySelector('head script#BDFDBLibraryScript');
		if (!libraryScript || (performance.now() - libraryScript.getAttribute("date")) > 600000) {
			if (libraryScript) libraryScript.remove();
			libraryScript = document.createElement("script");
			libraryScript.setAttribute("id", "BDFDBLibraryScript");
			libraryScript.setAttribute("type", "text/javascript");
			libraryScript.setAttribute("src", "https://mwittrien.github.io/BetterDiscordAddons/Plugins/BDFDB.min.js");
			libraryScript.setAttribute("date", performance.now());
			libraryScript.addEventListener("load", _ => {this.initialize();});
			document.head.appendChild(libraryScript);
		}
}

	stop() {
		
}
}