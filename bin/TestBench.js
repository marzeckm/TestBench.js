/**
 * Object for a TestBench instance to run and storage
 * @global @var {TestBench | undefined} testBench
 */
var testBench;

const ArrayLikeMatchers = function () {
    const matchers = {
        value: null,
        isNot: false,
        context: null,
        name: "",

        /**
         * Returns the negative version of the expectations
         * 
         * @returns {TestBench.ArrayLikeMatchers<String>}
         */
        not: function () {
            this.isNot = !this.isNot;
            return this;
        },

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
                this.value === expected,
                'to be'
            );
        },

        /**
         * 
         * @param {number} expected 
         * @param {any} precision 
         */
        toBeCloseTo: function (expected, precision = null) {

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
                'to be greater than'
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
                'to be greater than or equal'
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
                'to be less than'
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
                (this.value === NaN) === !this.isNot,
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
                    (this.value.classList.indexOf(expected) >= 0) === !this.isNot,
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
                'to have size'
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
                    (expected ? e === expected : !!e) === !this.isNot,
                    'to throw'
                );
            }
        },

        /**
         * 
         * @param {any} expected
         * @returns {void}
         */
        toThrowError: function (expected = null, message = null) {
            try{
                this.value();
            }catch(e){
                this.evaluateTest(
                    ((expected ? e === expected : true) && (e.message ? e.message === message : true)) === !this.isNot,
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
            testBench.failedAssertions += 1;
        },
    };

    return matchers;
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
            callCount++;
            if(!firstCalled){
                firstCalled = new Date().getTime();
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
            storedParams.push(Array.from(arguments));

            // returns the (if) set return-value
            return returnValue;
        }

        /**
         * Returns how often the function was called
         * @public @function haveBeenCalledTimes
         * @returns {number}
         */
        Spy.haveBeenCalledTimes = function(){
            return callCount;
        };

        /**
         * Returns the timestamp when spy was called first
         * @public @function haveBeenCalledTimes
         * @returns {number}
         */
        Spy.firstCalled = function(){
            return firstCalled;
        };

        /**
         * Returns the name of the spy
         * 
         * @returns {string}
         */
        Spy.getName = function (){
            return spyName;
        };

        /**
         * Returns the parameters with which the spy was called
         * 
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

/**
 * Defines a new testing instance for a component
 * 
 * @global @function describe
 * @param {string} description 
 * @param {function} specDefinitions 
 */
const describe = function (description, specDefinitions) {
    // creates the testBench object for the test
    testBench = TestBench();
    testBench.componentName = description;

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
    if(testBench.failedExpectations > 0){
        console.log(
            '\n%c' + [passedExpectations, '/', testBench.runnedExpectations, "tests passed"].join(" "),
            'color: red; font-size: 1.25em;'
        );
        console.log(
            '%c' + [testbench.failedExpectations, '/', testBench.runnedExpectations, "tests failed"].join(" "),
            'color: red; font-size: 1.25em;'
        );
    }else{
        console.log(
            '\n%c' + [passedExpectations, '/', testBench.runnedExpectations, "tests passed"].join(" "),
            'color: green; font-size: 1.25em;'
        );
    }
};


/**
 * Defines what happens before each test
 * 
 * @global @function beforeEach
 * @param {function} action 
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
 */
const it = function (expectation, assertion) {
    if (this.testBench !== undefined) {
        // Saves the assertion-data
        testBench.runnedAssertions += 1;
        testBench.runnedAssertionName = expectation;
        testBench.runnedExpectations = 0;

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

        if (testBench.runnedExpectations <= 0) {
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
    const matchers = testBench.ArrayLikeMatchers();
    matchers.value = actual;

    // Increments the runned expectations by one
    testBench.runnedExpectations += 1;

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

        // creates a function for flushing the microtasks
        const flushMicrotasks = function() {
            while (microtasks.length > 0) {
                microtasks.shift()();
            }
        };

        // Creates a function for flushing the macrotasks
        const flushMacrotasks = function() {
            while (macrotasks.length > 0) {
                macrotasks.shift()();
            }
        };

        // Replaces the global tick with local tick
        const globalTick = tick;
        tick = function(time = 0) {
            flushMicrotasks();
            flushMacrotasks();
            setTimeout(function() {}, time);
        };

        // Creates a fakeAsyncCallback
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