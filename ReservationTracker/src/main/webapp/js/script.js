window.addEventListener('load', function (){
	init();
});

function init(){
	console.log('script.js loaded');
	document.resForm.lookup.addEventListener('click', function(event) {
		event.preventDefault();
		var resId =document.resForm.resId.value;
		if(!isNaN(resId) && resId> 0) {
			getAllRes(id);
		}
	})
}