function getCookie(name) {
	const value = " " + document.cookie;
	console.log("value", `==${value}==`);
	const parts = value.split(" " + name + "=");
	return parts.length < 2 ? undefined : parts.pop().split(";").shift();
}

function setCookie(name, value, expiryDays, domain, path, secure) {
	const exdate = new Date();
	exdate.setHours(
		exdate.getHours() +
		(typeof expiryDays !== "number" ? 365 : expiryDays) * 24
	);
	document.cookie =
		name +
		"=" +
		value +
		";expires=" +
		exdate.toUTCString() +
		";path=" +
		(path || "/") +
		(domain ? ";domain=" + domain : "") +
		(secure ? ";secure" : "");
}

function read_config() {
	/*
	fetch('./banner.json')
	.then((response) => response.json())
	.then((json) => console.info(json));
	*/
	const j = JSON.parse("[{\"type\":\"warning\",\"start\":\"21 Mar 2024 12:00:00 GMT\",\"end\":\"22 Mar 2024 12:00:00 GMT\",\"text\":\"This is a text directly from the json file\",\"title\":\"Warning\",\"button\":\"OKAY\"},{\"type\":\"error\",\"start\":\"20 Mar 2024 12:00:00 GMT\",\"end\":\"20 Mar 2024 12:00:00 GMT\",\"text\":\"Test from March 20\",\"title\":\"blargh\",\"button\":\"Not Okay\"}]");

	return j;
}

//Define type colours here
function bannerColour(type) {
	var colour;
	switch (type) {
		case "warning":
			colour = "#ff9";
			break;
		case "alert":
			colour = "#f99";
			break;
		default:
			colour = "#77f";
			break;
	}
	return colour;
}

function setup_banner() {
	const conf = read_config();
	const $cookiesBanner = $(".mood-banner");
	const cookieName = "moodBanner";
	const hasCookie = getCookie(cookieName);
	var ban;

	var $cookiesBannerButton;

	for (i = 0; i < conf.length; i++) {
		if (!ban &&
			new Date().getTime() > new Date(conf[i].start).getTime() &&
			new Date().getTime() < new Date(conf[i].end).getTime()) {
			console.info("time is now for " + conf[i].text);
			ban = conf[0];
		}
	}

	if (!hasCookie && ban) {
		console.info("We need to show a banner, and a cookie was not found");
		$cookiesBanner.html("<b>" + ban.title + "</b>&nbsp;" + ban.text);
		$cookiesBanner.css("background-color", bannerColour(ban.type));
		$cookiesBanner.append("<button>" + ban.button + "</button>");
		$cookiesBannerButton = $(".mood-banner button");
		$cookiesBanner.removeClass("hidden");
	}

	if ($cookiesBannerButton)
		$cookiesBannerButton.click(() => {
			setCookie(cookieName, "closed");
			$cookiesBanner.remove();
		});
}

function add_banner() {
	$("body").append("<div class=\"mood-banner hidden\"> By clicking \"OK\", you agree to the storing of cookies on your device to " +
		"enhance site navigation, analyze site usage, and improve marketing.<button>Accept</button>");
}


$(document).ready(function () {
	console.log("ready!");
	setup_banner();
});