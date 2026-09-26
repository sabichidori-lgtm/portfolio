const nav = document.querySelector("#nav");
const footer = document.querySelector("#footer");

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
