document.addEventListener('DOMContentLoaded', function() {
	'use strict';
	if (typeof Map !== 'function') {
		return;
	}
	var item = document.getElementById('app');
	if(!isNullOrUndefined(item))
		item.style.display = '';
 }, false);