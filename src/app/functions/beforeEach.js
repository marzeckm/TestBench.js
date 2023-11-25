/**
 * Defines what happens before each test
 * 
 * @global @function beforeEach
 * @param {function} action 
 * @returns {void}
 */
const beforeEach = function (action) {
    // sets the before each function in TestBench
    testBench.beforeEachAction = action;
};