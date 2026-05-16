const toggleBtn = document.querySelector('.menu-toggle');
const aside = document.querySelector('.aside');
const overlay = document.querySelector('.overlay');

if (toggleBtn && aside && overlay) {
	toggleBtn.addEventListener('click', () => {
		aside.classList.toggle('open');
		overlay.classList.toggle('show');
	});

	overlay.addEventListener('click', () => {
		aside.classList.remove('open');
		overlay.classList.remove('show');
	});
}