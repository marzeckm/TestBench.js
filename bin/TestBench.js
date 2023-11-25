/**
 * Object for a TestBench instance to run and storage
 * @global @var {TestBench | undefined} testBench
 */
var testBench;

const styleEl = document.createElement('style');
styleEl.innerHTML = '.TestBench,body,html{min-height:100%;width:100%}*{box-sizing:border-box;font-family:Arial,Helvetica,sans-serif;margin:0}body,html{padding:0;background-color:#141618;color:#fff}.TestBench .header{width:100%;padding:1rem;background-color:rgba(15,85,18,.5)}.TestBench .test-result.error,.TestBench.error .header{background-color:rgba(85,15,15,.5)}.TestBench .container{padding:1rem}.TestBench .test-result{padding:.25rem .5rem;margin-bottom:.25rem;border-radius:.25rem}.TestBench .test-result.success{background-color:rgba(15,85,18,.2)}.TestBench h1{margin:0 0 .5rem}.TestBench h3{margin:1rem 0 .5rem}.TestBench h3:first-of-type{margin-top:0}.TestBench .context{color:rgba(120,120,120);font-style:italic;padding:.5rem .25rem}';
document.querySelector('head').appendChild(styleEl);

const HtmlService = function(){
    return {
        /**
         * Creates a new HTMl-Node and appends it to another element
         * 
         * @param {string} nodeType 
         * @param {string} innerHtml 
         * @param {HtmlNode | undefined} bindTo? 
         * @param {Map<string, string> | undefined} attributes?
         * 
         * @returns {void}
         */
        createHtmlElement(nodeType, innerHtml, bindTo, attributes){
            const htmlNode = document.createElement(nodeType);
            htmlNode.innerHTML = innerHtml;

            const attributeKeys = (attributes ? Object.keys(attributes) : []);
            for(var i = 0; i < attributeKeys.length; i++){
                htmlNode.setAttribute(attributeKeys[i], attributes[attributeKeys[i]]);
            }

            bindTo.appendChild(htmlNode);
        },

        /**
         * Adds a new class to an HTML-Element
         * 
         * @param {HtmlNode} htmlNode 
         * @param {string} addedClass
         * @returns {void}
         */
        addClass(htmlNode, addedClass){
            htmlNode.classList.add(addedClass);
        },

        /**
         * Sets attributes of an HTML-Element
         * 
         * @param {HtmlNode} htmlNode 
         * @param {string} attributes
         * @returns {void}
         */
        setAttributes(htmlNode, attributes){
            const attributeKeys = Object.keys(attributes);
            for(var i = 0; i < attributeKeys; i++){
                htmlNode.setAttribute(attributeKeys[i], attributes[attributeKeys[i]]);
            }
        }
    }
}

/**
 * Enum for marking successful and failed tests
 * 
 * @enum {ResultType}
 * @returns {ResultType}
 */
const ResultType = function(){
    return {
        /**
         * When a test succeeded (green)
         * @var {ResultType} SUCCESS
         */
        SUCCESS: "success",

        /**
         * When a test failed (red)
         * @var {ResultType} ERROR
         */
        ERROR: "error",
    }
} 


/**
 * Contains all the matchers for the expectations
 * 
 * @class ArrayLikeMatchers
 * 
 * @param {any} value
 * @param {boolean} isNot? 
 * @param {string | null} context? 
 * @param {string} name?
 * @returns 
 */
const ArrayLikeMatchers = function (value, isNot, context, name) {
    // Standard for optional parameters (ie11 fallback)
    isNot = isNot || false;
    context = context || null;
    name = name || "";

    return {
        /**
         * @var {any} value
         */
        value: value,

        /**
         * @var {boolean} isNot
         */
        isNot: isNot,

        /**
         * @var {string | null} context
         */
        context: context,

        /**
         * @var {string} name
         */
        name: name,

        /**
         * Returns the negative version of the expectations
         * 
         * @public @var {ArrayLikeMatchers | undefined} not
         * @returns {TestBench.ArrayLikeMatchers<String>}
         */
        not: (!isNot) ? ArrayLikeMatchers(value, true, context, name) : undefined,

        /**
         * Creates a context for the test case
         * 
         * @public @function withContext
         * @param {string} message 
         * @returns {TestBench.ArrayLikeMatchers<string>}
         */
        withContext: function (message) {
            return ArrayLikeMatchers(value, isNot, message, name);
        },

        /**
         * Evaluates if the value fits the expectation to be truthy
         * 
         * @public @function toBeTruthy
         * @returns {void}
         */
        toBeTruthy: function () {
            this._evaluateTest(!!this.value === !this.isNot, 'to be truthy');
        },

        /**
         * Evaluates if the value fits the expectation to be equal to another
         * 
         * @public @function toEqual
         * @param {TestBench.Expected<TestBench.ArrayLike<String>>} expected
         * @returns {void}
         */
        toEqual: function (expected) {
            this._evaluateTest(
                (JSON.stringify(this.value) === JSON.stringify(expected)) === !this.isNot,
                this._toBeTextWithValue('to Equal', expected)
            );
        },

        /**
         * Evaluates if the value fits the expectation to be null
         * 
         * @public @function toBeNull
         * @returns {void}
         */
        toBeNull: function () {
            this._evaluateTest((this.value === null) === !this.isNot, 'to be null');
        },

        /**
         * Evaluates if the value fits the expectation to be instance of class
         * 
         * @public @function toBeInstanceOf
         * @param {TestBench.Constructor} expected 
         * @returns {void}
         */
        toBeInstanceOf: function (expected) {
            this._evaluateTest(
                (typeof this.value === expected) === !this.isNot,
                this._toBeTextWithValue('to be instance of', expected)
            );
        },

        /**
         * Checks that expectation matches not to be true
         * 
         * @public @function toBeTrue
         * @returns {void}
         */
        toBeTrue: function () {
            this._evaluateTest(
                this.value === !this.isNot,
                'to be true'
            );
        },

        /**
         * Checks that expectation matches to be undefined
         * 
         * @public @function toBeUndefined
         * @returns {void}
         */
        toBeUndefined: function () {
            this._evaluateTest(
                (this.value === undefined) === !this.isNot,
                'to be undefined'
            );
        },

        /**
         * Evaluates if the spy fits the expectation to have been called
         * expected number of times
         * 
         * @public @function toHaveBeenCalledTimes
         * @param {number} expected 
         * @returns {void}
         */
        toHaveBeenCalledTimes: function (expected) {
            if (TestBench().$isSpy(this.value)) {
                this.name = this.value.getName();
                this._evaluateTest(
                    (this.value.haveBeenCalledTimes() === expected) === !this.isNot,
                    this._toBeTextWithValue('to have been called times:', expected)
                );
            } else {
                console.error('The specified value to check is not a TestBench.Spy!');
            }
        },

        /**
         * Evaluates if the spy fits the expectation to have been called
         * once with certain params
         * 
         * @public @function toHaveBeenCalledOnceWith
         * @param  {any[]} params 
         * @returns {void}
         */
        toHaveBeenCalledOnceWith: function () {
            const params = Array.prototype.slice.call(arguments);

            if (TestBench().$isSpy(this.value)) {
                this.name = this.value.getName();
                this._evaluateTest(
                    (this.value.haveBeenCalledTimes() === 1 && JSON.stringify(this.value.getStoredParams()) === JSON.stringify(params)) === !this.isNot,
                    'to have been called once with'
                );
            } else {
                console.error('The specified value to check is not a TestBench.Spy!');
            }
        },

        /**
         * Checks that expectation matches to be false
         * 
         * @public @function toBeFalse
         * @returns {void}
         */
        toBeFalse: function () {
            this._evaluateTest(
                (this.value === false) === !this.isNot,
                'to be false'
            );
        },

        /**
         * Checks that expectation matches to be null, undefined or empty
         * 
         * @public @function toBeFalsy
         * @returns {void}
         */
        toBeFalsy: function () {
            this._evaluateTest(
                !this.value === !this.isNot,
                'to be falsy'
            );
        },

        /**
         * Evaluates if the spy fits the expectation to have been called 
         * with certain parameters
         * 
         * @public @function toHaveBeenCalledWith
         * @param  {...any} params
         * @returns {void}
         */
        toHaveBeenCalledWith: function () {
            const params = Array.prototype.slice.call(arguments);

            if (TestBench().$isSpy(this.value)) {
                this.name = this.value.getName();
                this._evaluateTest(
                    (JSON.stringify(this.value.getStoredParams()) === JSON.stringify(params)) === !this.isNot,
                    'to have been called with'
                );
            } else {
                console.error('The specified value to check is not a TestBench.Spy!');
            }
        },

        /**
         * Evaluates if the spy fits the expectation to have been called
         * 
         * @public @function toHaveBeenCalled
         * @returns {void}
         */
        toHaveBeenCalled: function () {
            if (TestBench().$isSpy(this.value)) {
                this.name = this.value.getName();
                this._evaluateTest(
                    (this.value.haveBeenCalledTimes() > 0) === !this.isNot,
                    'to have been called'
                );
            } else {
                console.error('The specified value to check is not a TestBench.Spy!');
            }
        },

        /**
         * Evaluates if the value fits the expectation to be the expected
         * 
         * @public @function toBe
         * @param {TestBench.Expected<TestBench.ArrayLike<string>>} expected 
         * @returns {void}
         */
        toBe: function (expected) {
            this._evaluateTest(
                (this.value === expected) === !this.isNot,
                this._toBeTextWithValue('to be', expected)
            );
        },

        /**
         * Evaluates if the value fits the expectation to be close to a number
         * 
         * @public @function toBeCloseTo
         * @param {number} expected 
         * @param {any} precision 
         */
        toBeCloseTo: function (expected, precision) {
            const multiplier = 10 ** (precision || 2);
            this._evaluateTest(
                (Math.round(this.value * multiplier) / multiplier === Math.round(expected * multiplier) / multiplier) === !this.isNot,
                this._toBeTextWithValue('to be close to', expected)
            );
        },

        /**
         * Evaluates if the value fits the expectation not to be undefined
         * 
         * @public @function toBeDefined
         * @returns {void}
         */
        toBeDefined: function () {
            this._evaluateTest(
                (this.value !== undefined) === !this.isNot,
                'to be defined'
            );
        },

        /**
         * Evaluates if the value fits the expectation to be greater 
         * than another number
         * 
         * @public @function toBeGreaterThan
         * @param {number} expected 
         * @returns {void}
         */
        toBeGreaterThan: function (expected) {
            this._evaluateTest(
                (this.value > expected) === !this.isNot,
                this._toBeTextWithValue('to be greater than', expected)
            );
        },

        /**
         * Evaluates if the value fits the expectation to be greater than or 
         * equal another number
         * 
         * @public @function toBeGreaterThanOrEqual
         * @param {number} expected 
         * @returns {void}
         */
        toBeGreaterThanOrEqual: function (expected) {
            this._evaluateTest(
                (this.value >= expected) === !this.isNot,
                this._toBeTextWithValue('to be greater than or equal', expected)
            );
        },

        /**
         * Evaluates if the value fits the expectation to be less 
         * than another number
         * 
         * @public @function toBeLessThan
         * @param {number} expected 
         * @returns {void}
         */
        toBeLessThan: function (expected) {
            this._evaluateTest(
                (this.value < expected) === !this.isNot,
                this._toBeTextWithValue('to be less than', expected)
            );
        },

        /**
         * Evaluates if the value fits the expectation to be less than or equal 
         * another number
         * 
         * @public @function toBeLessThanOrEqual
         * @param {number} expected 
         * @returns {void}
         */
        toBeLessThanOrEqual: function (expected) {
            this._evaluateTest(
                (this.value <= expected) === !this.isNot,
                'to be less than or equal'
            );
        },

        /**
         * Evaluates if the value fits the expectation to be not a number
         * 
         * @public @function toBeNaN
         * @returns {void}
         */
        toBeNaN: function () {
            this._evaluateTest(
                (isNaN(this.value)) === !this.isNot,
                'to be NaN'
            );
        },

        /**
         * Expects that the checked element is -Infinity
         * 
         * @public @function toBeNegativeInfinity
         * @returns {void}
         */
        toBeNegativeInfinity: function () {
            this._evaluateTest(
                (this.value === -Infinity) === !this.isNot,
                'to be negative Infinity'
            );
        },

        /**
         * Expects that the checked element is Infinity
         * 
         * @public @function toBePositiveInfinity
         * @returns {void}
         */
        toBePositiveInfinity: function () {
            this._evaluateTest(
                (this.value === Infinity) === !this.isNot,
                'to be positive Infinity'
            );
        },

        /**
         * Checks that a certain element is contained in an iterable
         * 
         * @public @function toContain
         * @param {TestBench.Expected} expected 
         * @returns {void}
         */
        toContain: function (expected) {
            try {
                this._evaluateTest(
                    (this.value.indexOf(expected) >= 0) === !this.isNot,
                    this._toBeTextWithValue('to contain', expected)
                );
            } catch (e) {
                this._evaluateTest(
                    (Object.keys(this.value).indexOf(expected) >= 0) === !this.isNot,
                    this._toBeTextWithValue('to contain', expected)
                );
            }
        },

        /**
         * Checks that a spy has been called before another spy
         * 
         * @public @function toHaveBeenCalledBefore
         * @param {TestBench.Func} expected 
         * @returns {void}
         */
        toHaveBeenCalledBefore: function (expected) {
            if (TestBench().$isSpy(this.value) && TestBench().$isSpy(expected)) {
                this.name = this.value.getName();
                this._evaluateTest(
                    (this.value.firstCalled() < expected.firstCalled()) === !this.isNot,
                    this._toBeTextWithValue('to have been called before', expected)
                );
            } else {
                console.error('The specified value / expected to check is not a TestBench.Spy!');
            }
        },

        /**
         * Checks if an HTML-Element contains a defined class
         * 
         * @public @function toHaveClass
         * @param {string} expected
         * @returns {void}
         */
        toHaveClass: function (expected) {
            if (this.value instanceof Element) {
                this._evaluateTest(
                    (this.value.classList.value.indexOf(expected) >= 0) === !this.isNot,
                    this._toBeTextWithValue('to have class', expected)
                );
            } else {
                console.error('The specified value to check is not a DOM-Element');
            }
        },

        /**
         * Checks if the iterable has a matching size / length
         * 
         * @public @function toHaveSize
         * @param {number} expected 
         * @returns {void}
         */
        toHaveSize: function (expected) {
            this._evaluateTest(
                (Object.keys(this.value).length == expected) === !this.isNot,
                this._toBeTextWithValue('to have size', expected)
            );
        },

        /**
         * Checks if the value matches the RegEx / String
         * 
         * @public @function toMatch()
         * @param {string | RegExp} expected 
         * @returns {void}
         */
        toMatch: function (expected) {
            this._evaluateTest(
                ((expected instanceof RegExp) ? expected.test(this.value) : this.value.indexOf(expected) >= 0) === !this.isNot,
                this._toBeTextWithValue('to match', expected)
            );
        },

        /**
         * Expects to a specific ErrorType / ErrorName
         * 
         * @public @function toThrow
         * @param {any} expected 
         * @returns {void}
         */
        toThrow: function (expected) {
            expected = expected || null;

            try{
                this.value();
            }catch(e){
                this._evaluateTest(
                    (expected ? e.name === expected.name : true) === !this.isNot,
                    this._toBeTextWithValue('to throw', (expected ? expected : ''))
                );
            }
        },

        /**
         * Expects that the same Error is thrown
         * 
         * @public @function toThrowError
         * @param {any} expected
         * @param {string} message
         * @returns {void}
         */
        toThrowError: function (expected, message) {
            expected = expected || null;
            message = message || null;

            try{
                this.value();
            }catch(e){
                this._evaluateTest(
                    ((expected ? this._compareError(e, expected) : true)) === !this.isNot,
                    this._toBeTextWithValue('to throw error', (expected ? expected : ''))
                );
            }
        },

        /**
         * Checks based on a transfered function if the error is matching
         * 
         * @public @function toThrowMatching
         * @param {(thrown: any) => boolean} predicate
         * @returns {void}
         */
        toThrowMatching: function (predicate) {
            try{
                this.value();
            }catch(e){
                this._evaluateTest(
                    (predicate(e)) === !this.isNot,
                    this._toBeTextWithValue('to throw matching', (predicate ? predicate : ''))
                );
            }
        },

        /**
         * Evaluates the resukt of the test
         * 
         * @private @function _evaluateTest
         * @param {boolean} result
         * @param {string} expectationName
         * @returns {void};
         */
        _evaluateTest: function (result, expectationName) {
            (result) ? this._testPassed(expectationName) : this._testFailed(expectationName);
            this._setHtmlResultNumbers()
            if(this.context){
                const innerHtml = ['Context:', this.context].join(" ");
                console.log(['%c',innerHtml].join(''), 'font-style: italic; color: grey;');
                testBench.htmlService.createHtmlElement('div', innerHtml, document.querySelector('.TestBench .container'), {class:'context'});
            }
        },

        /**
         * Creates the string that is printed out when the tests ran
         * 
         * @private @function _getExpectationText
         * @param {string} ex 
         * @returns {string} expectationText
         */
        _getExpectationText(ex) {
            return ['Expect', ((this.name) ? this.name : this._valueInParenthesis()), (this.isNot ? 'not' : ''), ex].join(' ');
        },

        /**
         * Returns the value of the expectation in parenthesis
         * 
         * @private @function _valueInParenthesis
         * @returns {string} valueInParanthesis
         */
        _valueInParenthesis() {
            return ['"', this._getValueName(this.value) + '"'].join('');
        },

        /**
         * Returns based on the value type the name of the value
         * 
         * @private @function _getValueName
         * @param {any} value
         * @return {any} value
         */
        _getValueName(value) {
            if(TestBench().$isSpy(value)){
                return (value.getName() ? value.getName() : value.name);
            }else if(typeof value === 'function'){
                return value.name;
            }
            return value;
        },

        /**
         * Returns the expectation with the expected value
         * 
         * @private @function _toBeTextWithValue
         * @param {string} toBeText
         * @param {any} expected 
         * @returns {string}
         */
        _toBeTextWithValue(toBeText, expected) {
            return [toBeText, ['"', this._getValueName(expected)+'"'].join('')].join(' ');
        },

        /**
         * Runs when a test has passed
         * 
         * @private @function _testPassed
         * @param {string} expectationName 
         * @returns {void}
         */
        _testPassed(expectationName) {
            const resultText = [this._getExpectationText(expectationName), '(passed)'].join(' ');
            console.log(['%c', resultText].join(''), 'color: green;');
            TestBench().printResult(resultText, ResultType().SUCCESS);
        },

        /**
         * Runs when a test has failed
         * 
         * @private @function _testFailed
         * @param {string} expectationName 
         * @return {void}
         */
        _testFailed(expectationName) {
            const resultText = [this._getExpectationText(expectationName), '(failed)'].join(' ');
            console.log(['%c', resultText].join(''), 'color: red;');
            TestBench().printResult(resultText, ResultType().ERROR);
            testBench.failedExpectations += 1;
            document.querySelector('.header').style = 'background-color: rgba(85, 15, 15, 0.8);'
        },

        _setHtmlResultNumbers(){
            document.querySelector('#success').innerHTML = testBench.runnedExpectations - testBench.failedExpectations;
            document.querySelector('#all').innerHTML = testBench.runnedExpectations;
        },

        /**
         * Compares two errors and checks if they are equal
         * 
         * @private @function _compareError
         * @param {Error} error1
         * @param {Error} error2
         * @returns {boolean} equals
         */
        _compareError(error1, error2){
            return error1.name === error2.name &&
                   error1.message === error2.message
        }
    };
}

/**
 * Creates a Spy function and returns it
 * 
 * @class TestBench.Func
 * @returns {TestBench.Func}
 */
const Func = function () {
    return function (name = null, originalFn = null) {
        /**
         * How often was the spy called
         * @private @var {number} callCount
         */
        var callCount = 0;

        /**
         * Timestamp of the first time called
         * @private @var {number | null} firstCalled 
         */
        var firstCalled = null;

        /**
         * What should be returned when calling the spy
         * @private @var {any} returnValue
         */
        var returnValue = undefined;

        /**
         * @private @var {function | null} callFake
         */
        var callFake = null;

        /**
         * @private @var {string | null} spyName
         */
        var spyName = null;

        /**
         * @private @var {any[]}
         */
        var storedParams = [];

        /**
         * @function Spy
         * @returns {TestBench.Func.Spy}
         */
        function Spy() {
            // needed to later make sure who was called first
            const waitingTill = TestBench().$getBrowserTime() + 1;
            while(TestBench().$getBrowserTime() < waitingTill);

            callCount++;
            if(!firstCalled){
                firstCalled = waitingTill - 1;
            }

            if(originalFn){
                originalFn.apply(null, arguments);
            }

            if(name){
                spyName = name;
            }

            if(callFake){
                callFake.apply(null, arguments);
            }

            // stores the parameters
            storedParams = Array.prototype.slice.call(arguments);

            // returns the (if) set return-value
            return returnValue;
        }

        /**
         * Returns how often the function was called
         * 
         * @public @function haveBeenCalledTimes
         * @returns {number}
         */
        Spy.haveBeenCalledTimes = function(){
            return callCount;
        };

        /**
         * Returns the timestamp when spy was called first
         * 
         * @public @function haveBeenCalledTimes
         * @returns {number}
         */
        Spy.firstCalled = function(){
            return firstCalled;
        };

        /**
         * Returns the name of the spy
         * 
         * @public @function getName
         * @returns {string}
         */
        Spy.getName = function (){
            return spyName;
        };

        /**
         * Returns the parameters with which the spy was called
         * 
         * @public @function getStoredParams
         * @returns {any[]}
         */
        Spy.getStoredParams = function(){
            return storedParams;
        };

        /**
         * Additional functions
         */
        Spy.and = {
            /**
             * returns a value when spy is called
             * 
             * @public @function returnValue
             * @param {any} value 
             * @returns {TestBench.Func}
             */
            returnValue: function(value){
                returnValue = value;
                return Spy;
            },

            /**
             * Runs a function when spy is called
             * 
             * @public @function callFake
             * @param {function} fn 
             * @returns {TestBench.Func}
             */
            callFake: function(fn){
                callFake = fn;
                return Spy;
            }
        };

        return Spy;
    };
};

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

/**
 * Defines a new testing instance for a component
 * 
 * @global @function describe
 * @param {string} description 
 * @param {function} specDefinitions 
 * @returns {void}
 */
const describe = function (description, specDefinitions) {
    // creates the testBench object for the test
    testBench = TestBench();
    testBench.componentName = description;
    testBench.runnedExpectations = 0;

    // Creates the TestBench-Html-Node
    if(!document.querySelector('.TestBench')){
        testBench.htmlService.createHtmlElement('div', '', document.body, {class: 'TestBench'});
    }

    testBench.htmlService.createHtmlElement('div', '', document.querySelector('.TestBench'), {'class':'header'});
    testBench.htmlService.createHtmlElement('div', '', document.querySelector('.TestBench'), {'class':'container'});
    
    const nodeHeader = document.querySelector('.header')
    testBench.htmlService.createHtmlElement('h1', ['Tests for:', description].join(' '), nodeHeader);
    testBench.htmlService.createHtmlElement('h2', '<span id="success">0</span> / <span id="all">0</span> successful', nodeHeader);

    // print the test description
    console.log(["%c", "Test: ", description].join(""), "font-weight: 700; font-size: 1.25em;");

    // runs the definitions
    specDefinitions();

    // prints errors when no test case is found
    if (testBench.runnedAssertions <= 0) {
        console.error('No assertions found!');
    }

    // Prints how many Tests have failed / passed
    const passedExpectations = testBench.runnedExpectations - testBench.failedExpectations;
    console.log(
        '\n%c' + [passedExpectations, '/', testBench.runnedExpectations, "tests passed"].join(" "),
        'color: green; font-size: 1.25em;'
    );
    if(testBench.failedExpectations > 0){
        console.log(
            '%c' + [testBench.failedExpectations, '/', testBench.runnedExpectations, "tests failed"].join(" "),
            'color: red; font-size: 1.25em;'
        );
    }
};


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

/**
 * Defines a test case
 * 
 * @global @function it
 * @param {string} expectation 
 * @param {function} assertion 
 * @returns {void}
 */
const it = function (expectation, assertion) {
    if (this.testBench !== undefined) {
        // Saves the assertion-data
        testBench.runnedAssertions += 1;
        testBench.runnedAssertionName = expectation;
        testBench.runnedLocalExpectations = 0;

        // Show the expectation in HTML
        TestBench().htmlService.createHtmlElement('h3', ['Expectation:', 'It', expectation].join(' '), document.querySelector('.TestBench .container'));

        // runs the before each
        if(testBench.beforeEachAction){
            testBench.beforeEachAction();
        }

        // prints the assertion-name
        console.log(
            ['%c', expectation].join(''), 
            "font-weight: 700;"
        );

        // runs the test case itself
        assertion();

        if (testBench.runnedLocalExpectations <= 0) {
            console.log(
                "%cNo expectations for test case found!", 
                "color: red; font-style: italic;"
            );
        }
    } else {
        console.error('Tests must be runned inside describe function!');
    }
};

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

/**
 * Creates a fakeAsync function of a function
 * 
 * @global @function fakeAsync
 * @param {function} fn 
 * @returns {function<FakeAsync>}
 */
function fakeAsync(fn) {
    return function () {
        /**
         * contains the microtasks
         * @private @var {function[]}
         */
        const microtasks = [];

        /**
         * contains the macrotasks
         * @private @var {function[]}
         */
        const macrotasks = [];

        /**
         * flushes the microtasks
         * 
         * @private @function flushMicrotasks
         * @returns {void}
         */
        const flushMicrotasks = function() {
            while (microtasks.length > 0) {
                microtasks.shift()();
            }
        };

        /**
         *  A function for flushing the macrotasks
         * 
         * @private @function flushMacrotasks
         * @returns {void}
         */
        const flushMacrotasks = function() {
            while (macrotasks.length > 0) {
                macrotasks.shift()();
            }
        };

        /**
         * Creates a fakeAsyncCallback
         * @param {function} callback
         */
        const fakeAsyncCallback = function(callback) {
            return function() {
                const task = function() {
                    callback();
                    flushMicrotasks();
                    flushMacrotasks();
                };

                microtasks.push(task);
            };
        };

        // Replaces the global tick with local tick
        const globalTick = tick;
        tick = function(time = 0) {
            flushMicrotasks();
            flushMacrotasks();
            setTimeout(function() {}, time);
        };

        // Replace window setTimeout with local version
        const originalSetTimeout = window.setTimeout;
        window.setTimeout = function(callback, time) {
            const task = function() {
                callback();
                flushMicrotasks();
                flushMacrotasks();
            };

            macrotasks.push(task);
        };

        // Run the test function with tick and fakeAsyncCallback
        fn(tick, fakeAsyncCallback);

        // Restore the original setTimeout
        window.setTimeout = originalSetTimeout;

        // restore the original tick
        tick = globalTick;
    };
}

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