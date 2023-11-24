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
    testBench.runnedExpectations = 0;

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
