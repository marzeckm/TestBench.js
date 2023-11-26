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
            const multiplier = Math.pow(10, (precision || 2));
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
                    (Array.prototype.slice.call(this.value.classList).indexOf(expected) >= 0) === !this.isNot,
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
                consoleService.comment(innerHtml);
                htmlService.createHtmlElement('div', innerHtml, document.querySelector('.TestBench .container'), {class:'context'});
            }
        },

        /**
         * Creates the string that is printed out when the tests ran
         * 
         * @private @function _getExpectationText
         * @param {string} ex 
         * @returns {string} expectationText
         */
        _getExpectationText: function(ex) {
            return ['Expect', ((this.name) ? this.name : this._valueInParenthesis()), (this.isNot ? 'not' : ''), ex].join(' ');
        },

        /**
         * Returns the value of the expectation in parenthesis
         * 
         * @private @function _valueInParenthesis
         * @returns {string} valueInParanthesis
         */
        _valueInParenthesis: function() {
            return ['"', this._getValueName(this.value) + '"'].join('');
        },

        /**
         * Returns based on the value type the name of the value
         * 
         * @private @function _getValueName
         * @param {any} value
         * @return {any} value
         */
        _getValueName: function(value) {
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
        _toBeTextWithValue: function(toBeText, expected) {
            return [toBeText, ['"', this._getValueName(expected)+'"'].join('')].join(' ');
        },

        /**
         * Runs when a test has passed
         * 
         * @private @function _testPassed
         * @param {string} expectationName 
         * @returns {void}
         */
        _testPassed: function(expectationName) {
            const resultText = [this._getExpectationText(expectationName), '(passed)'].join(' ');
            consoleService.success(resultText);
            TestBench().printResult(resultText, ResultType.SUCCESS);
        },

        /**
         * Runs when a test has failed
         * 
         * @private @function _testFailed
         * @param {string} expectationName 
         * @return {void}
         */
        _testFailed: function(expectationName) {
            const resultText = [this._getExpectationText(expectationName), '(failed)'].join(' ');
            consoleService.error(resultText);
            TestBench().printResult(resultText, ResultType.ERROR);
            testBench.failedExpectations += 1;
            document.querySelector('.header').style.backgroundColor = 'rgba(85, 15, 15, 0.8)'
        },

        _setHtmlResultNumbers: function(){
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
        _compareError: function(error1, error2){
            return error1.name === error2.name &&
                   error1.message === error2.message
        }
    };
}