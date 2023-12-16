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
    if(!testBench){
        testBench = TestBench();
        testBench.componentName = description;
        testBench.runnedExpectations = 0;    
    }

    // Setup the services
    consoleService = ConsoleService();
    htmlService = HtmlService();

    // Creates the TestBench-Html-Node
    if(!document.querySelector('.TestBench')){
        htmlService.createHtmlElement('div', '', document.body, {class: 'TestBench'});
    }

    if(!document.querySelector('div.header')){
        htmlService.createHtmlElement('div', '', document.querySelector('.TestBench'), {'class':'header'});
        htmlService.createHtmlElement('div', '', document.querySelector('.TestBench'), {'class':'container'});
        
        const nodeHeader = document.querySelector('.header')
        htmlService.createHtmlElement('h1', ['Tests for:', description].join(' '), nodeHeader);
        htmlService.createHtmlElement('h2', '<span id="success">0</span> / <span id="all">0</span> successful', nodeHeader);
    }

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
    consoleService.success([passedExpectations, '/', testBench.runnedExpectations, "tests passed"].join(" "), true);
    if(testBench.failedExpectations > 0){
        consoleService.error([testBench.failedExpectations, '/', testBench.runnedExpectations, "tests failed"].join(" "), true);
    }
};
