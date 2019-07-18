import init from "jooks";
import Hector from './editProfileNameHook'

describe('Testing updating first name hook', () => {
    const jooks = init(() => Hector());

    // Test #1 
    it('Should give the correct updated first name', () => {
        let { newFirst, setFirst} = jooks.run()

        expect(newFirst).toBe('Hector');

        setFirst(newFirst + ' Jooks');
 
        ({newFirst} = jooks.run());
        expect(newFirst).toBe('Hector Jooks')
    }),

    // Test #2
    it('Should give the correct updated last name', () => {
        let {newLast, setLast} = jooks.run();

        expect(newLast).toBe('Silva');

        setLast('Jooks');

        ({newLast} = jooks.run());
        expect(newLast).toBe('Jooks')
    })
})


