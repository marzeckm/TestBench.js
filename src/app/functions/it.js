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
        htmlService.createHtmlElement('h3', ['Expectation:', 'It', expectation].join(' '), document.querySelector('.TestBench .container'));

        // runs the before each
        if(testBench.beforeEachAction){
            testBench.beforeEachAction();
        }

        // prints the assertion-name
        consoleService.bold(expectation);

        // runs the test case itself
        assertion();

        if (testBench.runnedLocalExpectations <= 0) {
            consoleService.error('No expectations for test case found!');
        }
    } else {
        console.error('Tests have to run inside a describe function!');
    }
};