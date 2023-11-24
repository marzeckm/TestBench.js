/**
 * 
 * @param {any} value? 
 * @param {boolean} isNot? 
 * @param {string | null} context? 
 * @param {string} name?
 * @returns 
 */
const ArrayLikeMatchers = function (value, isNot, context, name) {
    // Standardvalues for function (ie11 fallback)
    isNot = isNot || false;
    context = context || null;
    name = name || "";

    return {
        value: value,
        isNot: isNot,
        context: context,
        name: name,

        /**
         * Returns the negative version of the expectations
         * 
         * @returns {TestBench.ArrayLikeMatchers<String>}
         */
        not: (!isNot) ? ArrayLikeMatchers(value, true, context, name) : undefined,

        /**
         * @param {boolean} result
         * @param {string} expectationName
         * @returns {void};
         */
        evaluateTest: function (result, expectationName) {
            (result) ? this._testPassed(expectationName) : this._testFailed(expectationName);
            if(this.context){
                console.log(['%cContext:', this.context].join(), 'font-style: italic; color: grey;');
            }
        },

        /**
         * Evaluates if the value fits the expectation to be truthy
         * 
         * @returns {void}
         */
        toBeTruthy: function () {
            this.evaluateTest(!!this.value === !this.isNot, 'to be truthy');
        },

        /**
         * @param {TestBench.Expected<TestBench.ArrayLike<String>>} expected
         * @returns {void}
         */
        toEqual: function (expected) {
            this.evaluateTest(
                (JSON.stringify(this.value) === JSON.stringify(expected)) === !this.isNot,
                'to Equal'
            );
        },

        /**
         * @returns {void}
         */
        toBeNull: function () {
            this.evaluateTest((this.value === null) === !this.isNot, 'to be null');
        },

        /**
         * 
         * @param {TestBench.Constructor} expected 
         * @returns {void}
         */
        toBeInstanceOf: function (expected) {
            this.evaluateTest(
                (typeof this.value === expected) === !this.isNot,
                'to be instance of'
            );
        },

        /**
         * Checks that expectation matches not to be true
         * 
         * @returns {void}
         */
        toBeTrue: function () {
            this.evaluateTest(
                this.value === !this.isNot,
                'to be true'
            );
        },

        /**
         * Checks that expectation matches to be undefined
         * 
         * @returns {void}
         */
        toBeUndefined: function () {
            this.evaluateTest(
                (this.value === undefined) === !this.isNot,
                'to be undefined'
            );
        },

        /**
         * 
         * 
         * @param {number} expected 
         * @returns {void}
         */
        toHaveBeenCalledTimes: function (expected) {
            if (TestBench().$_isSpy(this.value)) {
                this.name = this.value.getName();
                this.evaluateTest(
                    (this.value.haveBeenCalledTimes() === expected) === !this.isNot,
                    'to have been called before'
                );
            } else {
                console.error('The specified value to check is not a TestBench.Spy!');
            }
        },

        /**
         * 
         * @param  {any[]} params 
         * @returns {void}
         */
        toHaveBeenCalledOnceWith: function () {
            const params = Array.prototype.slice.call(arguments);

            if (TestBench().$_isSpy(this.value)) {
                this.name = this.value.getName();
                this.evaluateTest(
                    (this.value.haveBeenCalledTimes() === 1 && JSON.stringify(this.value.getStoredParams()) === JSON.stringify(arguments)) === !this.isNot,
                    'to have been called once with'
                );
            } else {
                console.error('The specified value to check is not a TestBench.Spy!');
            }
        },

        /**
         * @returns {void}
         */
        toBeFalse: function () {
            this.evaluateTest(
                (this.value === false) === !this.isNot,
                'to be false'
            );
        },

        /**
         * @returns {void}
         */
        toBeFalsy: function () {
            this.evaluateTest(
                !this.value === !this.isNot,
                'to be falsy'
            );
        },

        /**
         * 
         * @param  {...any} params
         * @returns {void}
         */
        toHaveBeenCalledWith: function () {
            const params = Array.prototype.slice.call(arguments);
            if (TestBench().$_isSpy(this.value)) {
                this.name = this.value.getName();
                this.evaluateTest(
                    (JSON.stringify(this.value.getStoredParams) === JSON.stringify(params)) === !this.isNot,
                    'to have been called with'
                );
            } else {
                console.error('The specified value to check is not a TestBench.Spy!');
            }
        },

        /**
         * @returns {void}
         */
        toHaveBeenCalled: function () {
            if (TestBench().$_isSpy(this.value)) {
                this.name = this.value.getName();
                this.evaluateTest(
                    (this.value.haveBeenCalledTimes > 0) === !this.isNot,
                    'to have been called'
                );
            } else {
                console.error('The specified value to check is not a TestBench.Spy!');
            }
        },

        /**
         * 
         * @param {TestBench.Expected<TestBench.ArrayLike<string>>} expected 
         * @returns {void}
         */
        toBe: function (expected) {
            this.evaluateTest(
                (this.value === expected) === !this.isNot,
                'to be'
            );
        },

        /**
         * 
         * @param {number} expected 
         * @param {any} precision 
         */
        toBeCloseTo: function (expected, precision) {
            const multiplier = 10 ** (precision || 2);
            this.evaluateTest(
                (Math.round(this.value * multiplier) / multiplier === Math.round(expected * multiplier) / multiplier) === !this.isNot,
                ['to be close to', expected].join(' ')
            );
        },

        /**
         * @returns {void}
         */
        toBeDefined: function () {
            this.evaluateTest(
                (this.value !== undefined) === !this.isNot,
                'to be defined'
            );
        },

        /**
         * 
         * @param {number} expected 
         * @returns {void}
         */
        toBeGreaterThan: function (expected) {
            this.evaluateTest(
                (this.value > expected) === !this.isNot,
                ['to be greater than', this.value+''].join(' ')
            );
        },

        /**
         * 
         * @param {number} expected 
         * @returns {void}
         */
        toBeGreaterThanOrEqual: function (expected) {
            this.evaluateTest(
                (this.value >= expected) === !this.isNot,
                ['to be greater than or equal', this.value+''].join(' ')
            );
        },

        /**
         * 
         * @param {number} expected 
         * @returns {void}
         */
        toBeLessThan: function (expected) {
            this.evaluateTest(
                (this.value < expected) === !this.isNot,
                ['to be less than', this.value+''].join(' ')
            );
        },

        /**
         * 
         * @param {number} expected 
         * @returns {void}
         */
        toBeLessThanOrEqual: function (expected) {
            this.evaluateTest(
                (this.value <= expected) === !this.isNot,
                'to be less than or equal'
            );
        },

        /**
         * @returns {void}
         */
        toBeNaN: function () {
            this.evaluateTest(
                (isNaN(this.value)) === !this.isNot,
                'to be NaN'
            );
        },

        /**
         * @returns {void}
         */
        toBeNegativeInfinity: function () {
            this.evaluateTest(
                (this.value === -Infinity) === !this.isNot,
                'to be negative Infinity'
            );
        },

        /**
         * @returns {void}
         */
        toBePositiveInfinity: function () {
            this.evaluateTest(
                (this.value === Infinity) === !this.isNot,
                'to be positive Infinity'
            );
        },

        /**
         * 
         * @param {TestBench.Expected} expected 
         */
        toContain: function (expected) {
            try {
                this.evaluateTest(
                    (this.value.indexOf(expected) >= 0) === !this.isNot,
                    'to contain'
                );
            } catch (e) {
                this.evaluateTest(
                    (Object.keys(this.value).indexOf(expected) >= 0) === !this.isNot,
                    'to contain'
                );
            }
        },

        /**
         * 
         * @param {TestBench.Func} expected 
         * @returns {void}
         */
        toHaveBeenCalledBefore: function (expected) {
            if (TestBench().$_isSpy(this.value) && TestBench().$_isSpy(expected)) {
                this.name = this.value.getName();
                this.evaluateTest(
                    (this.value.firstCalled() < expected.firstCalled()) === !this.isNot,
                    'to have been called before'
                );
            } else {
                console.error('The specified value / expected to check is not a TestBench.Spy!');
            }
        },

        /**
         * @param {string} expected
         * @returns {void}
         */
        toHaveClass: function (expected) {
            if (this.value instanceof Element) {
                this.evaluateTest(
                    (this.value.classList.value.indexOf(expected) >= 0) === !this.isNot,
                    'to have class'
                );
            } else {
                console.error('The specified value to check is not a DOM-Element');
            }
        },

        /**
         * 
         * @param {number} expected 
         * @returns {void}
         */
        toHaveSize: function (expected) {
            this.evaluateTest(
                (Object.keys(this.value).length == expected) === !this.isNot,
                'to have size'
            );
        },

        /**
         * 
         * @param {string | RegExp} expected 
         * @returns {void}
         */
        toMatch: function (expected) {
            this.evaluateTest(
                ((expected instanceof RegExp) ? expected.test(this.value) : this.value.indexOf(expected) >= 0) === !this.isNot,
                ['to match', '"'+this.value+'"'].join(' ')
            );
        },

        /**
         * 
         * @param {any} expected 
         * @returns {void}
         */
        toThrow: function (expected=null) {
            try{
                this.value();
            }catch(e){
                this.evaluateTest(
                    (expected ? e.name === expected.name : true) === !this.isNot,
                    'to throw'
                );
            }
        },

        /**
         * 
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
                this.evaluateTest(
                    ((expected ? this._compareError(e, message) : true)) === !this.isNot,
                    'to throw error'
                );
            }
        },

        /**
         * 
         * @param {(thrown: any) => boolean} predicate
         * @returns {void}
         */
        toThrowMatching: function (predicate) {
            try{
                this.value();
            }catch(e){
                this.evaluateTest(
                    (predicate(e)) === !this.isNot,
                    'to throw matching'
                );
            }
        },

        /**
         * Creates a context for the test case
         * 
         * @param {string} message 
         * @returns {TestBench.ArrayLikeMatchers<string>}
         */
        withContext: function (message) {
            this.context = message;
            return this;
        },

        /**
         * Creates the string that is printed out when the tests ran
         * 
         * @param {string} ex 
         * @returns {string} expectationText
         */
        _getExpectationText(ex) {
            return ['Expect', ((this.name) ? this.name : this._valueInParenthesis()), (this.isNot ? 'not' : ''), ex].join(' ');
        },

        /**
         * Returns the value of the expectation in parenthesis
         * 
         * @returns {string} valueInParanthesis
         */
        _valueInParenthesis() {
            return ['"', this.value + '', '"'].join('');
        },

        /**
         * Runs when a test has passed
         * 
         * @param {string} expectationName 
         */
        _testPassed(expectationName) {
            console.log(
                ['%c', this._getExpectationText(expectationName), ' (passed)'].join(''),
                'color: green;'
            );
        },

        /**
         * Runs when a test has failed
         * 
         * @param {string} expectationName 
         */
        _testFailed(expectationName) {
            console.log(
                ['%c', this._getExpectationText(expectationName), ' (failed)'].join(''),
                'color: red;'
            );
            testBench.failedExpectations += 1;
        },

        /**
         * @private @function _compareError
         * @param {Error} error1
         * @param {Error} error2
         */
        _compareError(error1, error2){
            return error1.name === error2.name &&
                   error1.message === error2.message
        }
    };
}