/**
 * @Test TestBench
 */
describe('TestBench-Testingservice', () => {
    beforeEach(() => {
        console.log("run before each");
    });

    it('should handle booleans correctly', () => {
        // given
        var boolean = true;

        // then
        expect(boolean).toBeTrue();
        expect(boolean).not().toBeFalse();
        expect(boolean).toEqual(true);
        expect(boolean).not().toBeUndefined();
        expect(boolean).not().toBeNull();
        expect(boolean).not().toBeNaN();

    });

    it('should handle asynchronous code', fakeAsync(() => {
        // given
        var flag = false;
    
        // when
        // Simulates an asynchronous operation with setTimeout
        setTimeout(() => {
          flag = true;
        }, 1000);
    
        // Moves the virtual (local) clock forward by 1000 milliseconds
        tick(1000);
    
        // then
        expect(flag).toBeTrue();
    }))
});