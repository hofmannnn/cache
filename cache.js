/**
 * we should find item by index - fast..
 * keep the cache size limit
 */

module.exports = Cache = class Cache {
    constructor(size) {
        this.size = size;
        this.storage = {};
        // key => ref
        this.indices = {};
        this.lastItemIndex = 0;
    }

    get(key) {
        return this.indices[key];
    }

    put(key, value) {
        this.setNext();
        this.storage[this.lastItemIndex] = { [key]: value };
        this.indices[key] = this.storage[this.lastItemIndex];
    }

    /**
     * Return next available index;
     */
    setNext() {
        if (this.lastItemIndex < this.size)
            return this.lastItemIndex++;

        // clean occupied index
        delete this.indices[Object.keys(this.storage[this.lastItemIndex])];
        return this.lastItemIndex;
    }
}
