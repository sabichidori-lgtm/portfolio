const container = document.querySelector(".container");
const content = document.querySelector("#content");

const breadcrumb = document.querySelector(".breadcrumb");
const pagelink = document.querySelector(".page-link");


// ====================
// パンくず・ナビゲーション
// ====================

//パンくずリスト・目次の表示指定
function toggleNavigation(){

	const page = content.querySelector(".page");

console.log(content.innerHTML);

// データ取得
	const showBreadcrumb = page.dataset.breadcrumb === "true";
	const showPagelink = page.dataset.pagelink === "true";
	const pageTitle = page.dataset.title;


//戻る・次へ

	const prevLink = document.querySelector(".prev-link");
	const nextLink = document.querySelector(".next-link");

	const prevPage = page.dataset.prev;
	const nextPage = page.dataset.next;

	prevLink.href = prevPage ? `?page=${prevPage}` : "#";
	nextLink.href = nextPage ? `?page=${nextPage}` : "#";


//現在のページ
	const currentPage = new URLSearchParams(location.search).get("page");


// 表示・非表示
	breadcrumb.style.display = showBreadcrumb ? "grid" : "none";
	pagelink.style.display = showPagelink ? "grid" : "none";

	if(showBreadcrumb){
		const list = breadcrumb.querySelector('ol');
		createBreadcrumb(list,pageTitle);
	}
}

function createBreadcrumb(list, pageTitle) {

	// 既存のパンくずを削除
	list.innerHTML = "";

	// HOME
	const homeItem = document.createElement("li");

	const homeLink = document.createElement("a");
	homeLink.textContent = "HOME";
	homeLink.href = "default.html";

	homeItem.appendChild(homeLink);
	list.appendChild(homeItem);


	// WORK
	const parentItem = document.createElement("li");

	const parentLink = document.createElement("a");
	parentLink.textContent = "WORK";
	parentLink.href = "works.html";

	parentItem.appendChild(parentLink);
	list.appendChild(parentItem);


	// 現在のページ
	const titleItem = document.createElement("li");
	titleItem.textContent = pageTitle;
	list.appendChild(titleItem);
}


// ====================
// モーダル
// ====================

function setupModal() {
	const buttons = document.querySelectorAll(".work-detail button[data-modal]");
	const modals = document.querySelectorAll(".modal");
	
	if(!modals.length)return;

	//クリックでモーダル表示
	buttons.forEach(previewButton => {
		previewButton.addEventListener("click",() => {

			const modalId = previewButton.dataset.modal;
			const modal = document.getElementById(modalId);

console.log("modalId:", modalId);
console.log("modal:", modal);
console.log("yahoo-pc:", document.getElementById("yahoo-pc"));

			modal.classList.add("is-open");
		});
	});

	//クリックで閉じる
	modals.forEach(modal => {
		modal.addEventListener("click",(event) => {
			if (event.target !== modal) {
				return;
			}
			modal.classList.remove("is-open");
		});
	});

	//Escで閉じる
	document.addEventListener("keydown",(event) => {
		if (event.key === "Escape"){
			const openModal = document.querySelector(".modal.is-open");
			if(openModal){ 
				openModal.classList.remove("is-open");
			}
		}
	});
}



// ====================
// ページ読み込み
// ====================

function loadPage(url){
	fetch(url)
		.then(response => response.text())
		.then(html => {
			content.innerHTML = html;
			toggleNavigation();
			setupModal();
		});
}


//最初に表示するページ
	const params = new URLSearchParams(location.search);
	const page = params.get("page");


	if (page) {
		loadPage(`${page}.html`);
	} else {
		loadPage("default.html");
	}

//ページ移動
container.addEventListener("click",(event) => {
	const link = event.target.closest("a");
	if (!link) return;

	event.preventDefault();

	const url = link.getAttribute("href");

	if (url.startsWith("?page=")){
		const page = url.replace("?page=", "");

		history.pushState(null, "", url);
		loadPage(`${page}.html`);

	}else{
		history.pushState(null, "", `?page=${url.replace(".html","")}`);
		loadPage(url);
	}
});


//プラウザの戻る・進む
window.addEventListener("popstate", () => {
	const params = new URLSearchParams(location.search);
	const page = params.get("page");

	if (page) {
		loadPage(`${page}.html`);
	} else {
		loadPage("default.html");
	}
});




