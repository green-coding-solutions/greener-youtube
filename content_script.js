(function () {
	console.log("[Web Modifier] Lighbox Blocker content script injected");
	console.log(document.location.href);

	if (document.location.href.indexOf("https://www.youtube.com") === 0) {
		console.log("[Web Modifier] Found Youtube. Injecting Listener");
		window.addEventListener("load", (event) => {
			console.log("[Web Modifier] Executing Listener");
			console.log("Trying to turn autoplay off");

			const stopAutoplay = setInterval(function () {
				let status = document.querySelectorAll(
					".ytp-autonav-toggle-button"
				)[0].ariaChecked;
				console.log("Is autoplay on?", status);

				if (status === "true") {
					document
						.querySelectorAll(".ytp-autonav-toggle-button")[0]
						.click();
				} else if (status === "false") clearInterval(stopAutoplay);
			}, 2000);

			const changeQuality = setInterval(function () {
				document.querySelectorAll(".ytp-settings-button")[0].click(); // clicks on the "Settings" button
				let quality = document.querySelectorAll(
					".ytp-settings-menu .ytp-menuitem:last-child"
				)[0].innerText;
				console.log("What is the current video quality?", quality);

				if (!quality.includes("144p")) {
					document
						.querySelectorAll(
							".ytp-settings-menu .ytp-menuitem:last-child"
						)[0]
						.click();
					document
						.querySelectorAll(
							".ytp-quality-menu .ytp-menuitem:nth-last-child(2)"
						)[0]
						.click();
				} else if (quality.includes("144p")) {
					clearInterval(changeQuality);
					document
						.querySelectorAll(".ytp-settings-button")[0]
						.click(); // clicks on the "Settings" button
				}
			}, 2000);
		});
	}
})();
