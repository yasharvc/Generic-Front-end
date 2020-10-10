if (typeof Object.assign !== 'function') {
	Object.defineProperty(Object, "assign", {
	  value: function assign(target, varArgs) {
		'use strict';
		if (target === null || target === undefined) {
		  throw new TypeError('Cannot convert undefined or null to object');
		}
  
		var to = Object(target);
  
		for (var index = 1; index < arguments.length; index++) {
		  var nextSource = arguments[index];
  
		  if (nextSource !== null && nextSource !== undefined) { 
			for (var nextKey in nextSource) {
			  if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
				to[nextKey] = nextSource[nextKey];
			  }
			}
		  }
		}
		return to;
	  },
	  writable: true,
	  configurable: true
	});
}

if (!String.prototype.includes) {
	String.prototype.includes = function(search, start) {
	  'use strict';
  
	  if (search instanceof RegExp) {
		throw TypeError('first argument must not be a RegExp');
	  } 
	  if (start === undefined) { start = 0; }
	  return this.indexOf(search, start) !== -1;
	};
  }

  if (!Array.prototype.includes) {
	Object.defineProperty(Array.prototype, 'includes', {
	  value: function (searchElement, fromIndex) {
   
		if (this == null) {
		  throw new TypeError('"this" is null or not defined');
		}
		var o = Object(this);
		var len = o.length >>> 0;
		if (len === 0) {
		  return false;
		}
		var n = fromIndex | 0;
		var k = Math.max(n >= 0 ? n : len - Math.abs(n), 0);
   
		function sameValueZero(x, y) {
		  return x === y || (typeof x === 'number' && typeof y === 'number' && isNaN(x) && isNaN(y));
		}
		while (k < len) {
		  if (sameValueZero(o[k], searchElement)) {
			return true;
		  }
		  k++;
		}
		return false;
	  }
	});
  }

  if (!Array.prototype.find) {
	Object.defineProperty(Array.prototype, 'find', {
	  value: function(predicate) {
		if (this == null) {
		  throw TypeError('"this" is null or not defined');
		}
		var o = Object(this);
		var len = o.length >>> 0;
		if (typeof predicate !== 'function') {
		  throw TypeError('predicate must be a function');
		}
		var thisArg = arguments[1];
		var k = 0;
		while (k < len) {
		  var kValue = o[k];
		  if (predicate.call(thisArg, kValue, k, o)) {
			return kValue;
		  }
		  k++;
		}
		return undefined;
	  },
	  configurable: true,
	  writable: true
	});
  }

  if ('HTMLCollection' in window && !HTMLCollection.prototype.forEach) {
	HTMLCollection.prototype.forEach = function (callback, thisArg) {
	  thisArg = thisArg || window;
	  for (var i = 0; i < this.length; i++) {
		callback.call(thisArg, this[i], i, this);
	  }
	};
  }

  if ('NodeList' in window && !NodeList.prototype.forEach) {
    NodeList.prototype.forEach = function (callback, thisArg) {
      thisArg = thisArg || window;
      for (var i = 0; i < this.length; i++) {
        callback.call(thisArg, this[i], i, this);
      }
    };
  }