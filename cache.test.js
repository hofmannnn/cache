const Cache = require('./cache');

describe('cache insert 2 elements when size is 2', () => {
    const cache = new Cache(2);
    cache.put('nir', 'bla');
    cache.put('nadav', 'bla');
    cache.put('yaron', 'bla-bla-bla');

    test('size of stored elements should be 2', () => {
        expect(cache.indices.size).toBe(2);
    });

    test('nadav should exists in storage', () => {
        expect(cache.indices.get('nadav')).toBe('bla');
    });

    test('yaron should exists in storage', () => {
        expect(cache.indices.get('yaron')).toBe('bla-bla-bla');
    });

    test('nir should exists in storage', () => {
        expect(cache.indices.get('nir')).toBe(undefined);
    });
})

describe('getting an item that was first inserted should bump it', () => {
    const cache = new Cache(2);
    cache.put('nir', 'bla');
    cache.put('nadav', 'bla');
    cache.get('nir', 'bla');
    cache.put('yaron', 'bla');

    test('nadav should NOT exists in storage', () => {
        expect(cache.indices.get('nadav')).toBe(undefined);
    });

    test('nir should exists in storage', () => {
        expect(cache.indices.get('nir')).toBe('bla');
    });

    test('yaron should exists in storage', () => {
        expect(cache.indices.get('yaron')).toBe('bla');
    });

})

