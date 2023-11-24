/**
 * @Test TestBench
 */
describe('TestBench-Testingservice', () => {
    let beforeEachTest;
    let spy;

    beforeEach(() => {
        beforeEachTest = true;
        spy = testBench.createSpy();
    });

    it('should handle booleans correctly', () => {
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

    it('should handle strings correctly', () => {
        // given
        let string;
        
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
    });

    it('should handle undefined correctly', () => {
        // then
        expect(undefined).not.toBeTruthy();
        expect(undefined).toBeFalsy();
        expect(undefined).not.toEqual("Hello");
        expect(undefined).toBeUndefined();
        expect(undefined).not.toBeNull();
        expect(undefined).toBeNaN();
    });

    it('should handle null correctly', () => {
        // then
        expect(null).not.toBeTruthy();
        expect(null).toBeFalsy();
        expect(null).not.toEqual("Hello");
        expect(null).not.toBeUndefined();
        expect(null).toBeNull();
        expect(null).not.toBeNaN();
        expect(null).toBeDefined();
    });

    it('should handle NaN correctly', () => {
        // then
        expect(NaN).not.toBeTruthy();
        expect(NaN).toBeFalsy();
        expect(NaN).not.toEqual("Hello");
        expect(NaN).not.toBeUndefined();
        expect(NaN).not.toBeNull();
        expect(NaN).toBeNaN();
    });

    it('should handle numbers correctly', () => {
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
    });

    it('should handle functions correctly', () => {
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

    it('should handle array corretctly', () => {
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

    it('should handle objects corretctly', () => {
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

    it('should handle HTML nodes correctly', () => {
        const testNode = document.querySelector('.TestBench');

        expect(testNode).not.toBeUndefined();
        expect(testNode).not.toBeNull();
        expect(testNode).toHaveClass('TestBench');
        expect(testNode).not.toHaveClass('House');
    });

    it('should handle spies correctly', () => {
        //given
        let spy2 = testBench.createSpy();

        // when
        spy();
        spy2();

        // then
        expect(spy).toHaveBeenCalledBefore(spy2);
        expect(spy).toHaveBeenCalled();
        expect(spy).toHaveBeenCalledWith();
        expect(spy).toHaveBeenCalledOnceWith();
        expect(spy).toHaveBeenCalledTimes(1);
    });

    it('should handle asynchronous code', fakeAsync(() => {
        // given
        let flag = false;
    
        // when
        // Simulates an asynchronous operation with setTimeout
        setTimeout(() => {
          flag = true;
        }, 1000);
    
        // Moves the virtual (local) clock forward by 1000 milliseconds
        tick(1000);
    
        // then
        expect(flag).toBeTrue();

        expect(beforeEachTest).toBeTrue();
    }));
});