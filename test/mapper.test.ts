import { Mapper } from 'src/mapper.ts';

describe('Mapper', () => {
    let factory: ReturnType<typeof Mapper>;

    beforeEach(() => {
        factory = Mapper();
    });

    it('should convert XML to Invoice', () => {
        const xml = '<xml>...</xml>'; 
        const expectedJson = {};

        expect(factory.ingestInvoice(xml)).toEqual(expectedJson);
    });

    it('is the Factory returning the correct output'), () =>{

    }

    it('how does the mapper handle errors'), () =>{

    }
});