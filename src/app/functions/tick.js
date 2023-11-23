/**
 * Stopps the further execution of a function for a specified time
 * 
 * @global @function tick
 * @param {number} milliseconds
 * @returns {void} 
 */
var tick = function(milliseconds=0) {
    const start = new Date().getTime();
    
    // Defines the moment of beginning
    var now = start;
  
    // Waits until the specified time is reached
    while (now - start < milliseconds) {
      now = new Date().getTime();
    }
}