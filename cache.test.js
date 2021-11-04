const Cache = require('./cache');
describe('cache insert and get', () => {
    const cache = new Cache(2);
    test('insert items', () => {
        cache.put('1', 1);
        cache.put('2', 2);
        expect(cache.storage).toMatchObject({ '1': { '1': 1 }, '2': { '2': 2 } });
    });

    test('insert items when cache is full', () => {
        cache.get('1', 1);
        cache.put('3', 3);
        expect(cache.storage).toMatchObject({ '1': { '1': 1 }, '2': { '3': 3 } });
    });
})

describe('cache insert items', () => {
    const cache = new Cache(2);
    test('insert items', () => {
        cache.put('1', 1);
        cache.put('2', 2);
        console.log('cache.storage**', cache.storage);
        expect(cache.storage).toMatchObject({ '1': { '1': 1 }, '2': { '2': 2 } });
    });

    test('insert items when cache is full', () => {
        cache.put('3', 3);
        console.log('cache.storage**', cache.storage);
        expect(cache.storage).toMatchObject({ '1': { '2':2 }, '3': { '3': 3 } });
    });
})

