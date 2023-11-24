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
         * @public @var {number} runnedLocalExpectations
         */
        runnedLocalExpectations: 0,

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
         * @public @static @function $isSpy
         * @param {TestBench.Func} spy
         * @returns {boolean} 
         */
        $isSpy(spy){
            if(spy){
                if(spy.haveBeenCalledTimes && spy.getName && spy.getStoredParams && spy.firstCalled){
                    return (
                        typeof spy.haveBeenCalledTimes() === 'number' &&
                        spy.getName() !== undefined &&
                        typeof spy.getStoredParams() === 'object' &&
                        spy.firstCalled() !== undefined
                    );
                }
            }
            return false;
        },

        /**
         * @private @function _getMicroSeconds
         * @returns {number} microseconds 
         */
        _getMicroSeconds(){
            return new Date().getTime() * 1000 + (performance.now() * 1000);
        },

        /**
         * Returns the time based on the Browser (milliseconds / microseconds)
         * 
         * @returns {number} browserTime
         */
        $getBrowserTime(){
            return (this._supportsMicroseconds() ? new Date().getTime() : this._getMicroSeconds());
        },

        /**
         * @private @function _supportsMicroseconds
         * @returns {boolean} supportsMicroseconds
         */
        _supportsMicroseconds() {
            return typeof performance === 'object' && typeof performance.now === 'function';
        }
    }
}