module.exports = Cache = class Cache {
    constructor(size) {
        this.size = size;
        this.storage = new Set();
        // key => ref
        this.indices = {};
    }

    /**
     * return the element or undefined if not found
     * @param key
     * @returns {*}
     */
    get(key) {
        // get the element and bump it..
        if (this.indices[key]) {
            this.storage.delete(key);
            this.storage.add(key);
            return this.indices[key];
        }

        return this.indices[key];
    }

    // add key
    // key already exists? -> if so update
    put(key, value) {
        console.log('key**', key);
        // check if already exists
        let hasKeyExists = this.storage.has(key);
        if (hasKeyExists) {
            console.log('hasKeyExists**', hasKeyExists, 'key ', key);
            // update the value in indices
            this.indices[key] = { [key]: value };
            // bump it on the set
            console.log('key**', key);
            this.storage.delete(key);
            this.storage.add(key);
            return;
        }

        // check size
        if (this.storage.size === this.size) {
            console.log('size..')
            // remove the first inserted element
            let firstInserted = this.storage.values().next();
            console.log('firstInserted**', firstInserted);
            console.log('size before delete**', this.storage.size);
            this.storage.delete(firstInserted.value);

            delete this.indices[firstInserted.value];
            console.log('size after delete**', this.storage.size);
            // add the new element
            this.storage.add(key);
            this.indices[key] = { [key]: value };
            return;
        }

        this.storage.add(key);
        this.indices[key] = { [key]: value };
    }
}

const cache = new Cache(2);
// cache.put('nir', 'bla');
// cache.put('nadav', 'bla');
// cache.put('yaron', 'bla');
// // expected: nadav, yaron
//
// console.log('cache**', JSON.stringify(cache, null, 2));


cache.put('nir', 'bla');
cache.put('nadav', 'bla');
cache.get('nir', 'bla');
cache.put('yaron', 'bla');
// expected: nir, yaron

console.log('cache**', JSON.stringify(cache, null, 2));