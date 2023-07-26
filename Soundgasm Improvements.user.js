// ==UserScript==
// @name        Soundgasm Improvements
// @namespace   V.L
// @version     0.14
// @description Restyles and adds new functionality to Soundgasm --- dark mode/keyboard shortcuts/quick download/and more
// @author      Valerio Lyndon
// @homepageURL https://github.com/ValerioLyndon/Soundgasm-Improvements
// @supportURL  https://github.com/ValerioLyndon/Soundgasm-Improvements/issues
// @license     GPL-3.0-only
// @match       https://soundgasm.net/*
// @run-at      document-start
// @grant       GM_getValue
// @grant       GM_setValue
// ==/UserScript==

document.addEventListener("DOMContentLoaded", domLoaded);
window.addEventListener("load", fullyloaded);

// Dark or Light mode

theme = GM_getValue('theme', 'dark');
document.documentElement.classList.add(theme);

// CSS

const css = document.createElement('style');
css.textContent = `
	html {
		font-size: 1px;

        --icons: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAAGQCAYAAADr8i+wAAAACXBIWXMAAAsTAAALEwEAmpwYAAAMjmlUWHRYTUw6Y29tLmFkb2JlLnhtcAAAAAAAPD94cGFja2V0IGJlZ2luPSLvu78iIGlkPSJXNU0wTXBDZWhpSHpyZVN6TlRjemtjOWQiPz4gPHg6eG1wbWV0YSB4bWxuczp4PSJhZG9iZTpuczptZXRhLyIgeDp4bXB0az0iQWRvYmUgWE1QIENvcmUgNS42LWMxNDIgNzkuMTYwOTI0LCAyMDE3LzA3LzEzLTAxOjA2OjM5ICAgICAgICAiPiA8cmRmOlJERiB4bWxuczpyZGY9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkvMDIvMjItcmRmLXN5bnRheC1ucyMiPiA8cmRmOkRlc2NyaXB0aW9uIHJkZjphYm91dD0iIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RFdnQ9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZUV2ZW50IyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtbG5zOmRjPSJodHRwOi8vcHVybC5vcmcvZGMvZWxlbWVudHMvMS4xLyIgeG1sbnM6cGhvdG9zaG9wPSJodHRwOi8vbnMuYWRvYmUuY29tL3Bob3Rvc2hvcC8xLjAvIiB4bWxuczp0aWZmPSJodHRwOi8vbnMuYWRvYmUuY29tL3RpZmYvMS4wLyIgeG1sbnM6ZXhpZj0iaHR0cDovL25zLmFkb2JlLmNvbS9leGlmLzEuMC8iIHhtbG5zOnhtcD0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLyIgeG1wTU06RG9jdW1lbnRJRD0iYWRvYmU6ZG9jaWQ6cGhvdG9zaG9wOmI2Mjc5ZTQ3LTNiYzAtM2Q0ZC1iNzUyLWRiNmM4OGU5MDliYyIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDo5N2EzMzA5ZC03NWE4LWRhNDktYjQyNi04NmU1ZDBlM2ZiZTgiIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0iOTc4MTgzNEJDNEFBMTFCODE1QzQzMjUyQkJGQkIwNUEiIGRjOmZvcm1hdD0iaW1hZ2UvcG5nIiBwaG90b3Nob3A6Q29sb3JNb2RlPSIzIiBwaG90b3Nob3A6SUNDUHJvZmlsZT0iIiB0aWZmOkltYWdlV2lkdGg9IjIwMCIgdGlmZjpJbWFnZUxlbmd0aD0iNDAwIiB0aWZmOlBob3RvbWV0cmljSW50ZXJwcmV0YXRpb249IjIiIHRpZmY6U2FtcGxlc1BlclBpeGVsPSIzIiB0aWZmOlhSZXNvbHV0aW9uPSIxMDAvMSIgdGlmZjpZUmVzb2x1dGlvbj0iMTAwLzEiIHRpZmY6UmVzb2x1dGlvblVuaXQ9IjEiIGV4aWY6RXhpZlZlcnNpb249IjAyMjEiIGV4aWY6Q29sb3JTcGFjZT0iNjU1MzUiIGV4aWY6UGl4ZWxYRGltZW5zaW9uPSIyMDAiIGV4aWY6UGl4ZWxZRGltZW5zaW9uPSI0MDAiIHhtcDpDcmVhdGVEYXRlPSIyMDIyLTAyLTA4VDIwOjExOjU5LTA4OjAwIiB4bXA6TW9kaWZ5RGF0ZT0iMjAyMi0wMi0wOFQyMTowMDoyMS0wODowMCIgeG1wOk1ldGFkYXRhRGF0ZT0iMjAyMi0wMi0wOFQyMTowMDoyMS0wODowMCI+IDx4bXBNTTpIaXN0b3J5PiA8cmRmOlNlcT4gPHJkZjpsaSBzdEV2dDphY3Rpb249InNhdmVkIiBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOjM5ZmM5YWM1LTg2NWMtZjU0Mi05MDM5LTUyNTRmMDg3OTA3MSIgc3RFdnQ6d2hlbj0iMjAyMi0wMi0wOFQyMDoxNzoyNS0wODowMCIgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSIgc3RFdnQ6Y2hhbmdlZD0iLyIvPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0iY29udmVydGVkIiBzdEV2dDpwYXJhbWV0ZXJzPSJmcm9tIGltYWdlL2pwZWcgdG8gYXBwbGljYXRpb24vdm5kLmFkb2JlLnBob3Rvc2hvcCIvPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0iZGVyaXZlZCIgc3RFdnQ6cGFyYW1ldGVycz0iY29udmVydGVkIGZyb20gaW1hZ2UvanBlZyB0byBhcHBsaWNhdGlvbi92bmQuYWRvYmUucGhvdG9zaG9wIi8+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJzYXZlZCIgc3RFdnQ6aW5zdGFuY2VJRD0ieG1wLmlpZDo3ZWU4ZTcwNS1kYTBjLTI4NDMtYTQ1My05Y2U4ZDdiMjk0ZTIiIHN0RXZ0OndoZW49IjIwMjItMDItMDhUMjA6MTc6MjUtMDg6MDAiIHN0RXZ0OnNvZnR3YXJlQWdlbnQ9IkFkb2JlIFBob3Rvc2hvcCBDQyAoV2luZG93cykiIHN0RXZ0OmNoYW5nZWQ9Ii8iLz4gPHJkZjpsaSBzdEV2dDphY3Rpb249InNhdmVkIiBzdEV2dDppbnN0YW5jZUlEPSJ4bXAuaWlkOjk4ZTlmMDE1LTg3OGMtODc0Yi04MjBkLWE0NjdjZjEzMTZkOCIgc3RFdnQ6d2hlbj0iMjAyMi0wMi0wOFQyMTowMDoyMS0wODowMCIgc3RFdnQ6c29mdHdhcmVBZ2VudD0iQWRvYmUgUGhvdG9zaG9wIENDIChXaW5kb3dzKSIgc3RFdnQ6Y2hhbmdlZD0iLyIvPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0iY29udmVydGVkIiBzdEV2dDpwYXJhbWV0ZXJzPSJmcm9tIGFwcGxpY2F0aW9uL3ZuZC5hZG9iZS5waG90b3Nob3AgdG8gaW1hZ2UvcG5nIi8+IDxyZGY6bGkgc3RFdnQ6YWN0aW9uPSJkZXJpdmVkIiBzdEV2dDpwYXJhbWV0ZXJzPSJjb252ZXJ0ZWQgZnJvbSBhcHBsaWNhdGlvbi92bmQuYWRvYmUucGhvdG9zaG9wIHRvIGltYWdlL3BuZyIvPiA8cmRmOmxpIHN0RXZ0OmFjdGlvbj0ic2F2ZWQiIHN0RXZ0Omluc3RhbmNlSUQ9InhtcC5paWQ6OTdhMzMwOWQtNzVhOC1kYTQ5LWI0MjYtODZlNWQwZTNmYmU4IiBzdEV2dDp3aGVuPSIyMDIyLTAyLTA4VDIxOjAwOjIxLTA4OjAwIiBzdEV2dDpzb2Z0d2FyZUFnZW50PSJBZG9iZSBQaG90b3Nob3AgQ0MgKFdpbmRvd3MpIiBzdEV2dDpjaGFuZ2VkPSIvIi8+IDwvcmRm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);
	}

	html.dark {
		--background: hsl(0, 0%, 6.5%);
		--foreground-1: hsl(0, 0%, 12%);
		--foreground-bar-2: hsl(0, 0%, 15%);
		--foreground-bar: hsl(0, 0%, 27%);
		--foreground-2: hsl(0, 0%, 17.6%);
		--border: var(--foreground-bar-2);
		--text-low: hsl(0, 0%, 65%);
		--text-medium: hsl(0, 0%, 80%);
		--text-high: hsl(0, 0%, 98%);
		--accent: hsl(310, 30%, 30%);
	}
	html.light {
		--background: hsl(0, 0%, 96%);
		--foreground-1: hsl(0, 0%, 100%);
		--foreground-bar-2: hsl(0, 0%, 13.3%);
		--foreground-bar: hsl(0, 0%, 9%);
		--foreground-2: hsl(0, 0%, 94%);
		--border: hsl(0, 0%, 94%);
		--text-low: hsl(0, 0%, 25%);
		--text-medium: hsl(0, 0%, 7%);
		--text-high: hsl(0, 0%, 0%);
		--accent: hsl(310, 30%, 70%);
	}

	html body {
		max-width: 800rem;
		padding: 40rem;
		margin: 0 auto;
		background: var(--background);
		font-size: 12rem;
		color: var(--text-low);
	}

	a {
		color: var(--text-medium) !important;
		text-decoration: none;
	} a:hover {
		color: var(--text-high) !important;
	}

	html *::selection {
		background-color: var(--accent);
	}

	body input,
	body textarea {
		background: var(--foreground-2);
		border: 1px solid var(--border);
		color: var(--text-medium);
		resize: vertical;
	}

	body input[type="submit"]:hover,
	body input[type="submit"]:active {
		cursor: pointer;
		border-color: var(--accent);
	}

	/* Header */

	body header {
		min-height: 20rem;
		padding-bottom: 40rem;
		text-align: center;
	}
	nav a {
		display: inline-block;
	}
	body .logo {
		display: none;
	}

	nav a[href="https://soundgasm.net/logout"] {
		font-size: 0;
	}
	nav a[href="https://soundgasm.net/logout"]::before {
		content: "Logout";
		font-size: 16px;
	}

	/* Multiple-page rules */

	body #container,
	body .sound-details,
	#jp_container_1,
	body .uploadform,
	body .contactform,
	body .loginform,
	body .signupform,
	body .passwordresetform,
	.vl-sidebar {
		background: var(--foreground-1);
		box-shadow:
			0 2rem 4rem var(--background),
			0 4rem 10rem hsla(0,0%,0%,10%);
		border-color: var(--border);
		margin: 0 auto;
	}

	#container h1,
	body h1 {
		border-color: var(--border);
		color: var(--text-low);
	}

	/* Generic Container */

	body p.footer {
		border-color: var(--border);
	}

	/* User Page */

	body .sound-details {
		display: flex;
		width: 620rem;
		border-radius: 4rem;
		//margin: 0 0 12rem;
		margin: 0 auto 12rem;
		flex-flow: row wrap;
	}

	.sound-details > a {
		max-width: calc(100% - 70px);
		font-size: 16rem;
		font-weight: bold;
		white-space: normal;
	}

	.playCount {
		max-width: 70px;
		margin-left: auto;
		text-align: right;
	}

	.playCount::before {
		content: "";
		display: inline-block;
		border-color: transparent;
		border-left-color: var(--text-low);
		border-style: solid;
		border-width: .45em .65em;
		margin-right: -0.4em;
		vertical-align: middle;
	}

	.soundDescription {
		order: 3;
		width: 100%;
		margin-top: 6rem;
	}

	/* Sort Header */

	.vl-sortheader {
		height: 20rem;
		margin-bottom: 25rem;
		text-align: center;
	}

	.vl-sortheader a {
		display: inline-block;
		padding: 0 15rem;
		vertical-align: top;
	}

	.vl-sortheader a.active {
		font-weight: bold;
	}
	.vl-sortheader a.active::after {
		content: attr(data-direction);
		display: block;
		color: var(--text-low);
		font-size: 10px;
	}
	.vl-clearbtn {
		display: none;
	}
	.active ~ .vl-clearbtn {
		display: inline-block;
	}

	/* Sidebar */

	.vl-sidebar {
		position: absolute;
		right: 0;
		top: 0;
		width: 120rem;
		padding: 10rem;
		border-radius: 4rem;
	}

	/* Player Page */

	div[style="margin:10px 0"] {
		margin: 0 0 25rem !important;
		font-size: 18rem;
		text-align: center;
	}

	#jp_container_1,
	.jp-audio .jp-audio-stream,
	.jp-audio .jp-video {
		border: 2rem solid var(--border);
		color: var(--text-low);
	}
	#jp_container_1 {
		width: 420rem;
	}
	.jp-interface {
		background: var(--foreground-bar);
	}
	.jp-audio .jp-details {
		background: var(--foreground-bar-2);
	}
	.jp-details .jp-title {
		font-size: 12rem;
	}
	.light .jp-details .jp-title {
		color: var(--background);
	}
	.jp-description {
		padding: 0 10rem;
		font-size: 12rem;
	}

	/* Player */

	.jp-state-muted .jp-unmute {
		background: url("../image/jplayer.blue.monday.jpg") -60px -170px no-repeat;
	}
	.jp-state-muted .jp-unmute:focus {
		background: url("../image/jplayer.blue.monday.jpg") -79px -170px no-repeat;
	}

	#jp_container_1 button,
	.jp-gui .jp-seek-bar,
	.jp-gui .jp-play-bar,
	.jp-gui .jp-volume-bar,
	.jp-gui .jp-volume-bar-value {
		background-image: var(--icons);
	}

	.jp-gui .jp-progress {
		background: none;
		border-radius: 2.5rem;
	}

	.jp-progress .jp-seeking-bg {
		background: var(--icons) 0 -202px repeat-x;
		animation: seeking .8s ease-in-out infinite alternate;
	}
	@keyframes seeking {
		0% {
			opacity: 1;
		}
		100% {
			opacity: 0.3;
		}
	}

	.dark .jp-current-time, .dark .jp-duration {
		color: var(--text-medium);
	}
	.light .jp-current-time, .light .jp-duration {
		color: var(--background);
	}

	/* Description */

	.vl-desc-container {
		margin: 12rem 0 0;
	}
	.sound-details .vl-desc-container {
		display: inline;
		margin: 0;
	}

	.vl-desc-new, .vl-desc-raw {
		white-space: pre-wrap;
		margin: 12rem 0;
	}
	.sound-details .vl-desc-new, .sound-details .vl-desc-raw {
		display: inline;
		white-space: normal;
	}

	.vl-tag {
		display: inline-block;
		padding: 2rem 4rem;
		background: var(--foreground-2);
		border-radius: 2.5rem;
		margin: 0 4rem 4rem 0;
		color: var(--text-medium);
		font-size: 11rem;
		text-transform: capitalize;
	}

	.vl-showraw {
		display: inline-block;
		opacity: 0.5;
	}
	.vl-showraw:hover {
		opacity: 1;
	}
	.jp-audio .vl-showraw {
		margin-bottom: 12rem;
	}
	.sound-details .vl-showraw {
		float: right;
	}

	/* Contact page */

	header + ul {
		width: 414rem;
		padding-left: 16rem;
		margin: 12rem auto;
		word-break: break-word;
	}


	/* Footer */

	.vl-footer {
		width: 420rem;
		margin: 0 auto;
		text-align: center;
		padding-top: 30rem;
	}

	.vl-footer a {
		padding: 0 15rem;
	}
`;

document.documentElement.appendChild(css);

// Functions & Classes

function processDescription(desc, descDest, title, titleDest) {
	var originalTitle = title;
	var originalDesc = desc;
	var processedTitleDiv = document.createElement('span');
	var rawTitleDiv = document.createElement('span');
	var processedDescDiv = document.createElement('div');
	var rawDescDiv = document.createElement('p');
	var tagsDiv = document.createElement('div');
	var descDiv = document.createElement('p');
	var tags = new Set();
	// match all words inside brackets [] {}. also matches parentheses () but only for one-word sections to try and avoid false positives
	const extractTagsRegex = /[\[\{](.*?)[\]\}]|\(([^\s]+)\)/g;
	// same as the extraction regex but with extra whitespace matching rules
	const removeTagsRegex = /\s*(?:[\[\{].*?[\]\}]|\([^\s]+\))\s*/g;

	rawTitleDiv.textContent = title;
	rawTitleDiv.style.display = 'none';

	processedDescDiv.classList.add('vl-desc-container');
	tagsDiv.classList.add('vl-tags');
	descDiv.classList.add('vl-desc-new');
	processedDescDiv.appendChild(tagsDiv);
	processedDescDiv.appendChild(descDiv);

	rawDescDiv.classList.add('vl-desc-raw');
	rawDescDiv.textContent = desc;
	rawDescDiv.style.display = 'none';

	combined = title + desc;
	var tagMatches = combined.matchAll(extractTagsRegex);

	for( let match of tagMatches ){
		let tag = match[1] === undefined ? match[2] : match[1];
		
		if( tag.length > 0 ){
			tags.add(tag);
		}
	}

	// remove tags from text
	title = title.replaceAll(removeTagsRegex, '')
	desc = desc.replaceAll(removeTagsRegex, '')

	// sort the tags by length
	tags = Array.from(tags);
	tags.sort( (a, b) => { return a.length - b.length; } );

	// create the element
	for( let i = 0; i < tags.length; i++ ){
		var tagSpan = document.createElement('span');
		tagSpan.classList.add('vl-tag');
		tagSpan.textContent = tags[i];
		tagsDiv.appendChild(tagSpan);
	}

	// Create "view raw" button
	var viewRawBtn = document.createElement('a');
	viewRawBtn.href = '#';
	viewRawBtn.classList.add('vl-showraw');
	viewRawBtn.textContent = 'Show raw.'
	viewRawBtn.onclick = function() {
		if(processedDescDiv.style.display === 'none') {
			processedTitleDiv.style.display = 'inline';
			rawTitleDiv.style.display = 'none';
			processedDescDiv.style.display = 'block';
			rawDescDiv.style.display = 'none';
			viewRawBtn.textContent = 'Show raw.';
		} else {
			processedTitleDiv.style.display = 'none';
			rawTitleDiv.style.display = 'inline';
			processedDescDiv.style.display = 'none';
			rawDescDiv.style.display = 'block';
			viewRawBtn.textContent = 'Show processed.';
		}
	}

	// finish up with tags & description

	descDiv.textContent = desc.trim();
	processedTitleDiv.textContent = title.trim();

	if(title === originalTitle && desc === originalDesc) {
		return false;
	}

	// Add everything back to DOM
	//destination.innerHMTL = ""; <-- this doesn't work for some reason so instead we use a while loop
	while(descDest.firstChild){
		descDest.removeChild(descDest.firstChild);
	}
	while(titleDest.firstChild){
		titleDest.removeChild(titleDest.firstChild);
	}

	titleDest.appendChild(processedTitleDiv);
	titleDest.appendChild(rawTitleDiv);

	descDest.appendChild(processedDescDiv);
	descDest.appendChild(rawDescDiv);
	descDest.appendChild(viewRawBtn);
}

// Begin modifying page
function domLoaded() {
	console.log ("==> DOM is loaded.");

	// If content is blank
	var content = document.querySelector('body > div');
	if(content === null) {
		var blank = document.createElement('div');
		blank.id = 'container';
		blank.innerHTML = `<div id="body"><p>There's nothing here.</p></div>`;
		document.body.appendChild(blank);
	}

	// Add footer
	var footer = document.createElement('footer');
	footer.classList.add('vl-footer');

	// Theme switcher
	var themeSwitcher = document.createElement('a');
	themeSwitcher.textContent = 'Theme';
	themeSwitcher.href = '#';
	themeSwitcher.onclick = function() {
		if(GM_getValue('theme', 'dark') === 'dark') {
			GM_setValue('theme', 'light');
			document.documentElement.classList.add('light');
			document.documentElement.classList.remove('dark');
		} else {
			GM_setValue('theme', 'dark');
			document.documentElement.classList.add('dark');
			document.documentElement.classList.remove('light');
		}
	};
	footer.appendChild(themeSwitcher);

	document.body.appendChild(footer);

	var path = window.location.pathname;
	if(path.slice(-1) === '/') {
		path = path.substr(0, path.length - 1);
	}

	// user page
	if(path.startsWith('/u/') && path.split('/').length < 4) {
		var items = document.querySelectorAll('.sound-details');

		// Add custom descriptions
		var descriptions = document.querySelectorAll('.sound-details');
		for(i = 0; i < descriptions.length; i++) {
			let descDest = descriptions[i].querySelector('.soundDescription');
			let desc = descDest.textContent;
			let titleDest = descriptions[i].querySelector('a');
			let title = titleDest.textContent;
			processDescription(desc, descDest, title, titleDest);
		}

		// Modify playcounts & add sort data
		for(i = 0; i < items.length; i++) {
			var item = items[i],
				title = item.querySelector('a').textContent,
				countEle = item.querySelector('.playCount');

			item.setAttribute('data-order', i);
			item.setAttribute('data-title', title);

			var count = countEle.textContent.split(': ')[1];
			item.setAttribute('data-count', count);
			if(count.length > 3) {
				//count = count.substr(0, count.length - 3) + ',' + count.substr(count.length - 3, 3);
				count = count.substr(0, count.length - 3) + 'k';
			}
			countEle.textContent = count;
		}

		// Prep for sort columns

		document.body.style.display = "flex";
		document.body.style.flexDirection = "column";
		document.querySelector('header').style.order = '-1';
		document.querySelector('footer').style.order = '99999';

		// Add sort columns

		var sortHeader = document.createElement('div');
		sortHeader.classList.add('vl-sortheader');
		sortHeader.textContent = 'Sort by: ';

		function addSortBtn(title, defaultDirection = 'desc') {
			var ele = document.createElement('a');
			ele.href = '#';
			ele.setAttribute('data-direction', defaultDirection);
			ele.textContent = title;
			sortHeader.appendChild(ele);
			return ele;
		}

		function sortByTitle() {
			var btns = document.querySelectorAll('.vl-sortheader a');
			for(i = 0; i < btns.length; i++) {
				btns[i].classList.remove('active');
			}
			titleBtn.classList.add('active');

			direction = titleBtn.getAttribute('data-direction');
			if(direction === 'desc') {
				titleBtn.setAttribute('data-direction', 'asc');
			} else {
				titleBtn.setAttribute('data-direction', 'desc');
			}
			direction = titleBtn.getAttribute('data-direction');

			var array = [];
			for(i = 0; i < items.length; i++) {
				var order = items[i].getAttribute('data-order'),
					title = items[i].getAttribute('data-title');
				array.push([order, title]);
			}
			array.sort( (first, second) => {
				var a = first[1].toUpperCase(),
					b = second[1].toUpperCase();
				return (a < b) ? -1 : (a > b) ? 1 : 0;
			} );

			if(direction === 'asc') {
				for(i = 0; i < array.length; i++) {
					var item = document.querySelector('[data-order="'+array[i][0]+'"]');
					item.style.order = i;
				}
			} else {
				for(i = 0; i < array.length; i++) {
					var item = document.querySelector('[data-order="'+array[i][0]+'"]');
					item.style.order = array.length - i;
				}
			}
		}
		titleBtn = addSortBtn('Title', 'desc');
		titleBtn.onclick = sortByTitle;

		function sortByCount() {
			var btns = document.querySelectorAll('.vl-sortheader a');
			for(i = 0; i < btns.length; i++) {
				btns[i].classList.remove('active');
			}
			countBtn.classList.add('active');

			direction = countBtn.getAttribute('data-direction');
			if(direction === 'desc') {
				countBtn.setAttribute('data-direction', 'asc');
			} else {
				countBtn.setAttribute('data-direction', 'desc');
			}
			direction = countBtn.getAttribute('data-direction');

			var array = [];
			for(i = 0; i < items.length; i++) {
				var order = items[i].getAttribute('data-order'),
					count = items[i].getAttribute('data-count');
				array.push([order, count]);
			}
			array.sort( (first, second) => { return first[1] - second[1] } );

			if(direction === 'asc') {
				for(i = 0; i < array.length; i++) {
					var item = document.querySelector('[data-order="'+array[i][0]+'"]');
					item.style.order = i;
				}
			} else {
				for(i = 0; i < array.length; i++) {
					var item = document.querySelector('[data-order="'+array[i][0]+'"]');
					item.style.order = array.length - i;
				}
			}
		}
		countBtn = addSortBtn('Play Count', 'asc');
		countBtn.onclick = sortByCount;

		function sortByDate() {
			var btns = document.querySelectorAll('.vl-sortheader a');
			for(i = 0; i < btns.length; i++) {
				btns[i].classList.remove('active');
			}
			dateBtn.classList.add('active');

			direction = dateBtn.getAttribute('data-direction');
			if(direction === 'desc') {
				dateBtn.setAttribute('data-direction', 'asc');
			} else {
				dateBtn.setAttribute('data-direction', 'desc');
			}
			direction = dateBtn.getAttribute('data-direction');

			if(direction === 'asc') {
				for(i = 0; i < items.length; i++) {
					items[i].style.order = items.length - items[i].getAttribute('data-order');
				}
			} else {
				for(i = 0; i < items.length; i++) {
					items[i].style.order = items[i].getAttribute('data-order');
				}
			}
		}
		dateBtn = addSortBtn('Date Uploaded', 'desc');
		dateBtn.onclick = sortByDate;

		function clearSort() {
			var btns = document.querySelectorAll('.vl-sortheader a');
			for(i = 0; i < btns.length; i++) {
				btns[i].classList.remove('active');
			}

			for(i = 0; i < items.length; i++) {
				items[i].style.order = "";
			}
		}
		clearBtn = addSortBtn('clear');
		clearBtn.onclick = clearSort;
		clearBtn.classList.add('vl-clearbtn');

		document.body.insertBefore(sortHeader, document.querySelector('.sound-details'));

		// Add filters
//		 var sidebarAnchor = document.createElement('div'),
//			 sidebar = document.createElement('div');

//		 sidebarAnchor.id = 'sidebar-anchor';
//		 sidebarAnchor.style.position = 'relative';
//		 sidebarAnchor.appendChild(sidebar);

//		 sidebar.classList.add('vl-sidebar');
//		 sidebar.textContent = 'Filter by tag';

//		 document.body.insertBefore(sidebarAnchor, document.querySelector('.sound-details'));

	}

	// player page
	if(path.startsWith('/u/') && path.split('/').length > 3) {
		// Add custom descriptions
		var desc = document.querySelector('.jp-description p').textContent,
			descDest = document.querySelector('.jp-description'),
			titleDest = document.querySelector('.jp-title'),
			title = titleDest.textContent;
		processDescription(desc, descDest, title, titleDest);

		// basic variables
		var play = document.querySelector('.jp-play'),
			stop = document.querySelector('.jp-stop'),
			title = document.querySelector('.jp-title'),
			author = document.querySelector('div[style="margin:10px 0"] a'),
			audio = document.querySelector('audio');

		// Keypress handler
		function setKeybinds() {
			window.addEventListener('keydown', (e) => {
				let k = e.key.toLowerCase();
				if(e.key === ' ') {
					e.preventDefault();
				}
			});

			window.addEventListener('keyup', (e) => {
				let k = e.key.toLowerCase();
				let ctrl = e.ctrlKey;

                let time = 5.0;
                if(ctrl){
                    time = 15.0;
                }

				if(k === 'p' || k === 'k' || k === ' ') {
					if(!audio.paused) {
					    audio.pause();
					} else {
					    audio.play();
					}
				}
				else if(k === 's') {
					stop.click();
				}
				else if(k === 'd') {
					document.querySelector('.dl').click();
				}
				else if(k === 'arrowleft') {
					audio.currentTime -= time;
				}
				else if(k === 'arrowright') {
					audio.currentTime += time;
				}
				else if(k === 'arrowup') {
					newVol = audio.volume + 0.1;
					if(newVol > 1) {
					newVol = 1.0;
					}
					audio.volume = newVol;
				}
				else if(k === 'arrowdown') {
					newVol = audio.volume - 0.1;
					if(newVol < 0) {
					newVol = 0.0;
					}
					audio.volume = newVol;
				}
				else if(k === '0') {
					audio.currentTime = 0.0;
				}
				else if(k === '1') {
					audio.currentTime = audio.duration / 10;
				}
				else if(k === '2') {
					audio.currentTime = audio.duration / 10 * 2;
				}
				else if(k === '3') {
					audio.currentTime = audio.duration / 10 * 3;
				}
				else if(k === '4') {
					audio.currentTime = audio.duration / 10 * 4;
				}
				else if(k === '5') {
					audio.currentTime = audio.duration / 10 * 5;
				}
				else if(k === '6') {
					audio.currentTime = audio.duration / 10 * 6;
				}
				else if(k === '7') {
					audio.currentTime = audio.duration / 10 * 7;
				}
				else if(k === '8') {
					audio.currentTime = audio.duration / 10 * 8;
				}
				else if(k === '9') {
					audio.currentTime = audio.duration / 10 * 9;
				}
			});
		}

		// Download button
		function addDownload() {
			var audio = document.querySelector('audio'),
				src = audio.getAttribute('src'),
					ext = src.split('.').pop(),
					dl = document.createElement('a');
				dl.classList.add('dl');
				footer.appendChild(dl);
				dl.href = src;
				dl.setAttribute("download", title.innerText + ' by ' + author.innerText + '.' + ext);
				dl.setAttribute("target", "_blank");
				dl.textContent = 'Download this audio';
		}

		// Wait for audio to load
		if(audio !== null && audio.getAttribute('src') !== null) {
			addDownload();
		} else {
			function audioLoaded() {
				audio = document.querySelector('audio');
				if(audio !== null && audio.getAttribute('src') !== null) {
					// observer.disconnect();
					addDownload();
					setKeybinds();
				} else {
					setTimeout(audioLoaded, 100);
				}
			}
			audioLoaded();
		}
	}

	// signup page
	if(window.location.pathname.startsWith('/signup')) {
		var h1 = document.querySelector('h1'),
			form = document.querySelector('.signupform');
		form.prepend(h1);
	}
}

function fullyloaded () {
	console.log ("==> Page is fully loaded, including images." );
}