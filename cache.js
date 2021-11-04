module.exports = Cache = class Cache {
    constructor(size) {
        this.size = size;
        this.storage = new Set();
        this.indices = new Map();
    }

    /**
     * return the element or undefined if not found
     * @param key
     * @returns {*}
     */
    get(key) {
        // get the element and bump it..
        let element = this.indices.get(key);
        if (element) {
            this.storage.delete(key);
            this.storage.add(key);
        }

        return element;
    }

    // add key
    // key already exists? -> if so update
    put(key, value) {
        // check if already exists and update it, if the user send the same value the update is not used I did not address it
        // but we should always update the storage
        let keyExists = this.storage.has(key);
        if (keyExists) {
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
            // add a new element
            this.storage.add(key);
            this.indices.set(key, value);
            return;
        }

        this.storage.add(key);
        this.indices.set(key, value);
    }

    print() {
        for (const [key, value] of this.indices) {
            console.log(key + ' = ' + value)
        }
    }
}

