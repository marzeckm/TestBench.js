/**
 * Class for the TestBench (MainClass)
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
         * access to the Html-Service for 
         * creating and changing html nodes
         * 
         * @public @var htmlService
         */
        htmlService: HtmlService(),

        /**
         * @public @static @function $isSpy
         * @param {TestBench.Func} spy
         * @returns {boolean} 
         */
        $isSpy(spy) {
            if (spy) {
                if (spy.haveBeenCalledTimes && spy.getName && spy.getStoredParams && spy.firstCalled) {
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
         * Returns the time based on the Browser (milliseconds / microseconds)
         * 
         * @static @function getBrowserTime
         * @returns {number} browserTime
         */
        $getBrowserTime() {
            return (this._supportsMicroseconds() ? new Date().getTime() : this._getMicroSeconds());
        },

        /**
         * prints the result of the test into the html-body
         * 
         * @public @function printResult
         * @param {string} innerHtml 
         * @param {ResultType} ResultType 
         */
        printResult(innerHTML, ResultType) {
            this._print('div', innerHTML, { class: ['test-result', ResultType + ''].join(" ") });
        },

        /**
         * Returns the microseconds on modern browsers
         * 
         * @private @function getMicroSeconds
         * @private @function _getMicroSeconds
         * @returns {number} microseconds 
         */
        _getMicroSeconds() {
            return new Date().getTime() * 1000 + (performance.now() * 1000);
        },

        /**
         * Returns if the used browser supports microseconds
         * 
         * @private @function supportsMicroseconds
         * @returns {boolean} supportsMicroseconds
         */
        _supportsMicroseconds() {
            return typeof performance === 'object' && typeof performance.now === 'function';
        },

        /**
         * 
         * @param {string} innerHtml 
         * @param {ResultType} ResultType 
         */
        _print(nodeType, innerHtml, options) {
            this.htmlService.createHtmlElement(nodeType, innerHtml, document.querySelector('.TestBench .container'), options);
        },

        _setHtmlTestCounters(){

        },
    }
}