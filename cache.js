module.exports = Cache = class Cache {
    constructor(size) {
        this.size = size;
        this.storage = new Set();
        // key => ref
        this.indices = new Map();
    }

    /**
     * return the element or undefined if not found
     * @param key
     * @returns {*}
     */
    get(key) {
        // get the element and bump it..
        if (this.indices.get(key)) {
            this.storage.delete(key);
            this.storage.add(key);
        }

        return this.indices.get(key);
    }

    // add key
    // key already exists? -> if so update
    put(key, value) {
        // check if already exists
        let hasKeyExists = this.storage.has(key);
        if (hasKeyExists) {
            // update the value in indices
            this.indices.set(key, value);
            // bump it on the set
            this.storage.delete(key);
            this.storage.add(key);
            return;
        }

        // check size
        if (this.storage.size === this.size) {
            // remove the first inserted element
            let firstInserted = this.storage.values().next();
            this.storage.delete(firstInserted.value);

            this.indices.delete(firstInserted.value);
            // add the new element
            this.storage.add(key);
            this.indices.set(key, value);
            return;
        }

        this.storage.add(key);
        this.indices.set(key, value);
    }

    print(){
        for (const [key, value] of this.indices) {
            console.log(key + ' = ' + value)
        }
    }
}

const cache = new Cache(2);
cache.put('nir', 'bla');
cache.put('nadav', 'bla');
cache.put('yaron', 'bla');
// expected: nadav, yaron
//
cache.print();
// console.log('cache**', JSON.stringify(cache, null, 2));

//
// cache.put('nir', 'bla');
// cache.put('nadav', 'bla');
// cache.get('nir', 'bla');
// cache.put('yaron', 'bla');
// // expected: nir, yaron
//
// cache.print();