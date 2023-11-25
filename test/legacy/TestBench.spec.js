/**
 * @Test TestBench
 */
describe('TestBench-Testingservice', function() {
    // variables that can be accessed in the whole test
    var beforeEachTest;
    var spy;

    beforeEach(function() {
        // Before each actions
        beforeEachTest = true;
        spy = testBench.createSpy();
    });

    it('should handle booleans correctly', function() {
        // given
        const boolean = true;

        // then
        expect(boolean).toBeTrue();
        expect(boolean).not.toBeFalse();
        expect(boolean).toEqual(true);
        expect(boolean).not.toBeUndefined();
        expect(boolean).not.toBeNull();
        expect(boolean).not.toBeNaN();

        expect(beforeEachTest).toBeTrue();

    });

    it('should handle strings correctly', function() {
        // given
        var string;
        
        // when
        string = "Hallo Welt";

        // then
        expect(string).toEqual("Hallo Welt");
        expect(string).toBeTruthy();
        expect(string).not.toBeFalsy();
        expect(string).not.toEqual("Hello World");
        expect(string).toMatch(/al/);
        expect(string).not.toMatch(/orl/);
        expect(string).not.toBeUndefined();
        expect(string).not.toBeNull();
        expect(string).toBeNaN();
        expect(string).toBeDefined();
        expect(string).toBeInstanceOf("string");
        expect(string).not.toBeInstanceOf("number");
    });

    it('should handle undefined correctly', function() {
        // then
        expect(undefined).not.toBeTruthy();
        expect(undefined).toBeFalsy();
        expect(undefined).not.toEqual("Hello");
        expect(undefined).toBeUndefined();
        expect(undefined).not.toBeNull();
        expect(undefined).toBeNaN();
    });

    it('should handle null correctly', function() {
        // then
        expect(null).not.toBeTruthy();
        expect(null).toBeFalsy();
        expect(null).not.toEqual("Hello");
        expect(null).not.toBeUndefined();
        expect(null).toBeNull();
        expect(null).not.toBeNaN();
        expect(null).toBeDefined();
    });

    it('should handle NaN correctly', function() {
        // then
        expect(NaN).not.toBeTruthy();
        expect(NaN).toBeFalsy();
        expect(NaN).not.toEqual("Hello");
        expect(NaN).not.toBeUndefined();
        expect(NaN).not.toBeNull();
        expect(NaN).toBeNaN();
    });

    it('should handle numbers correctly', function() {
        // given
        const number = 12;

        // then
        expect(number).toBeTruthy();
        expect(number).not.toBeFalsy();
        expect(number).toEqual(12);
        expect(number).toBeGreaterThan(10);
        expect(number).toBeLessThan(14);
        expect(number).toBeLessThanOrEqual(12);
        expect(number).not.toBeLessThanOrEqual(11);
        expect(number).toBeGreaterThanOrEqual(12);
        expect(number).toBeGreaterThanOrEqual(-23);
        expect(number).not.toBeGreaterThanOrEqual(13);
        expect(number).not.toEqual("12");
        expect(number).not.toBeUndefined();
        expect(number).not.toBeNull();
        expect(number).not.toBeNaN();
        expect(0.335).toBeCloseTo(0.336);
        expect(0.335).not.toBeCloseTo(0.356);
        expect(number).toBeDefined();
        expect(number).toBeInstanceOf("number");
    });

    it('should handle functions correctly', function() {
        // given
        function testFunc(){
            throw new Error("error");
        }

        // then
        expect(testFunc).toThrow();
        expect(testFunc).toThrow(Error("error"));
        expect(testFunc).toThrow(Error("success"));
        expect(testFunc).not.toThrow(/*CustomError*/{name: "NullPointerError", message: "Test Message", stack: null});
        expect(testFunc).toThrowMatching((e) => {return e.message === "error"});
        expect(testFunc).not.toThrowMatching((e) => {return e.message === "success"});

    });

    it('should handle array corretctly', function() {
        const a = [1,2,3];

        expect(a).toHaveSize(3);
        expect(a).not.toBeFalsy();
        expect(a).not.toBeUndefined();
        expect(a).not.toBeNull();
        expect(a).toBeNaN();
        expect(a).toBeTruthy();
        expect(a).toEqual([1,2,3]);
        expect(a).toContain(1);
    });

    it('should handle objects corretctly', function() {
        const a = {a: 1, b: 2, c: 3};

        expect(a).toHaveSize(3);
        expect(a).not.toBeFalsy();
        expect(a).not.toBeUndefined();
        expect(a).not.toBeNull();
        expect(a).toBeNaN();
        expect(a).toBeTruthy();
        expect(a).toEqual({a: 1,b: 2, c: 3});
        expect(a).toContain("a");
    });

    it('should handle HTML nodes correctly', function() {
        const testNode = document.querySelector('.TestBench');

        expect(testNode).not.toBeUndefined();
        expect(testNode).not.toBeNull();
        expect(testNode).toHaveClass('TestBench');
        expect(testNode).not.toHaveClass('House');
    });

    it('should show context', function() {
        expect(true).withContext('Test Context').toBeTrue();
        expect(true).not.withContext('Test Context').toBeNull();
        expect(true).withContext('Test Context').not.toBeNull();
    });

    it('should handle spies correctly', function() {
        //given
        const testFunc = function() {
            console.log("Fake function called!");
        }
        const spy2 = TestBench().createSpy().and.callFake(testFunc);

        const originalFunc = function(){
            console.log('Called original function')
        }
        const spy3 = TestBench('spy3').createSpy('Spy3', originalFunc);

        const spy4 = TestBench().createSpy().and.returnValue(true);

        const testString = "haus";
        const testBoolean = true;

        // when
        spy();
        spy3();
        spy2(testString, testBoolean);
        spy3();
        spy3();


        // then
        expect(spy).toHaveBeenCalledBefore(spy2);
        expect(spy2).not.toHaveBeenCalledBefore(spy);
        expect(spy3).toHaveBeenCalledBefore(spy2);

        expect(spy).toHaveBeenCalled();
        expect(spy).toHaveBeenCalledWith();
        expect(spy).toHaveBeenCalledOnceWith();
        expect(spy2).toHaveBeenCalledOnceWith(testString, testBoolean);
        expect(spy).toHaveBeenCalledTimes(1);
        expect(spy3).toHaveBeenCalledTimes(3);
        expect(spy4()).toBeTrue();
        expect(spy4()).not.toBeFalse();
    });

    it('should handle asynchronous code', fakeAsync(function() {
        // given
        var flag = false;
    
        // when
        // Simulates an asynchronous operation with setTimeout
        setTimeout(function() {
          flag = true;
        }, 1000);
    
        // Moves the virtual (local) clock forward by 1000 milliseconds
        tick(1000);
    
        // then
        expect(flag).toBeTrue();

        expect(beforeEachTest).toBeTrue();
    }));
});