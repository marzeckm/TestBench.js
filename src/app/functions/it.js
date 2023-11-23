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