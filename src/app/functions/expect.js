/**
 * Returns the Matchers for checking the expectations
 * 
 * @global @function expect
 * @param {any} actual
 * @returns {Matchers} 
 */
const expect = function (actual) {
    /**
     * @private @var {Matchers} matchers
     */
    const matchers = testBench.ArrayLikeMatchers(actual);

    // Increments the runned expectations by one
    testBench.runnedExpectations += 1;
    testBench.runnedLocalExpectations += 1;

    return matchers;
};