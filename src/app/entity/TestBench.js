/**
 * Class for the TestBench
 * 
 * @class TestBench
 * @returns {TestBench}
 */
const TestBench = function () {
    return {
        /**
         * @public @var {function | null} componentName
         */
        componentName: null,

        /**
         * @public @var {number} runnedAssertions
         */
        runnedAssertions: 0,

        /**
         * @public @var {number} failedExpectations
         */
        failedExpectations: 0,
        
        /**
         * @public @var {string} runnedAssertionName
         */
        runnedAssertionName: '',
        
        /**
         * @public @var {number} runnedExpectations
         */
        runnedExpectations: 0,

        /**
         * @public @var {function | null}
         */
        beforeEachAction: null,

        /**
         * contains the ArrayLikeMatchers (comparison cases)
         * @public @function ArrayLikeMatchers
         * @returns {ArrayLikeMatchers}
         */
        ArrayLikeMatchers: ArrayLikeMatchers,

        /**
         * returns a new Spy function
         * @public @function createSpy
         * @returns {Testbench.Func}
         */
        createSpy: Func(),

        /**
         * @private @static @function $_isSpy
         * @param {TestBench.Func} spy
         * @returns {boolean} 
         */
        $_isSpy(spy){
            return ( 
                typeof spy.haveBeenCalledTimes() === 'number' &&
                spy.getName() !== undefined &&
                typeof spy.getStoredParams() === 'object' &&
                spy.firstCalled() !== undefined
            );
        }
    }
}