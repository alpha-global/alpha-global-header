var path = require('path');
// better console messages
const console = require('better-console');


var _root = path.resolve(__dirname, '../..');
function root(args) {
  args = Array.prototype.slice.call(arguments, 0);
  return path.join.apply(path, [_root].concat(args));
}
exports.root = root;

/**
 * Log to window
 */
function debugLog(msg){

	console.info(msg)

}

function debugError(error){

	console.error("Error ["+error.code + "] : " + error.message);

}

exports.debugLog = debugLog;
exports.debugError = debugError;
