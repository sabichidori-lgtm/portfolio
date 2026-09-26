const nav = document.querySelector("#nav");
const footer = document.querySelector("#footer");

const about = document.querySelector("#about");
const works = document.querySelector("#works");
const skills = document.querySelector("#skills");
const profile = document.querySelector("#profile");


//共通

let basePath;

if(location.pathname.includes("/works/")){
	basePath = "../";
}else{
	basePath = "";
}



//nav・footer

fetch(basePath + "nav.html")
	.then(response => response.text())
	.then(html => {
		nav.innerHTML = html;

		const links = nav.querySelectorAll("a");

		links.forEach((link) => {
			const pagePath = link.getAttribute("href");
			link.setAttribute("href" , basePath + pagePath);
		});
	});


fetch(basePath + "footer.html")
	.then(response => response.text())
	.then(html => {
		footer.innerHTML = html;

		const links = footer.querySelectorAll("a");

		links.forEach((link) => {
			const pagePath = link.getAttribute("href");
			link.setAttribute("href" , basePath + pagePath);
		});
	});


//各ページリンク

fetch(basePath + "about.html")
	.then(response => response.text())
	.then(html => {
		if(about){
			about.innerHTML = html;

			const links = about.querySelectorAll("a");

			links.forEach((link) => {
				const pagePath = link.getAttribute("href");
				link.setAttribute("href" , basePath + pagePath);
			});
		}
	});


fetch(basePath + "works.html")
	.then(response => response.text())
	.then(html => {
		if(works){
			works.innerHTML = html;

			const links = works.querySelectorAll("a");

			links.forEach((link) => {
				const pagePath = link.getAttribute("href");
				link.setAttribute("href" , basePath + pagePath);
			});
		}
	});


fetch(basePath + "skills.html")
	.then(response => response.text())
	.then(html => {
		if(skills){
			skills.innerHTML = html;

			const links = skills.querySelectorAll("a");

			links.forEach((link) => {
				const pagePath = link.getAttribute("href");
				link.setAttribute("href" , basePath + pagePath);
			});
			}
	});


fetch(basePath + "profile.html")
	.then(response => response.text())
	.then(html => {
		if(profile){
			profile.innerHTML = html;

			const links = profile.querySelectorAll("a");

			links.forEach((link) => {
				const pagePath = link.getAttribute("href");
				link.setAttribute("href" , basePath + pagePath);
			});
		}
	});


//ハッシュ移動・応急処理
setTimeout(() => {
	if (location.hash) {
		const target = document.querySelector(location.hash);

		if (target) {
			target.scrollIntoView();
		}
	}
}, 100);