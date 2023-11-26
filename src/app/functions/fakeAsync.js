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
        tick = function(time) {
            // standard (ie11 fallback)
            time = time | 0;

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
