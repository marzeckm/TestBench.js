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