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

    // Setup the services
    consoleService = ConsoleService();

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
    consoleService.header(['Test:', description].join(' '));

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
