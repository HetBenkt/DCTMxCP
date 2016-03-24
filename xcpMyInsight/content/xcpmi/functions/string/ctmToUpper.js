// ctmToUpper.js
Ext.namespace ('xcpmi.functions');

/*
 * Returns the string produced by converting all of the characters in str to uppercase.
 * 
 * Example:
 * 		toLower ('I am yelling')
 * 		returns 'I AM YELLING'
 */
xcpmi.functions.ctmToUpper = function (strInput) {
	console.log("Input value: " + strInput);
	return strInput.toLocaleUpperCase();
}