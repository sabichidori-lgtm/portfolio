document.addEventListener('DOMContentLoaded', () => {

  const iframe = document.querySelector('iframe[name="content-frame"]');

  // URLから復元
  const params = new URLSearchParams(window.location.search);
  const page = params.get('page');

  if (page && iframe) {
    iframe.src = page;
  }

  // クリック時にURL更新
	document.querySelectorAll('a[target="content-frame"]').forEach(link => {
	  link.addEventListener('click', () => {
	    const url = link.getAttribute('href');
	    history.pushState(null, '', '?page=' + url);
	  });
	});
});