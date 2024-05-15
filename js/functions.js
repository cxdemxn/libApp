const horizont = (value = '') => {
    return log(`-------------------------         ${value}      ----------------------`);
}

const keys = (obj) => {
    console.log(Object.keys(obj));
};

const log = (toLog) => {
    console.log(toLog);
};

const table = (toTabulate) => {
    console.table(toTabulate);
}

function removeCyclicReferences(obj, seen = new Set()) {
    if (typeof obj !== 'object' || obj === null) {
        return obj; // Base case: return primitive values and null
    }

    if (seen.has(obj)) {
        return '[Circular]'; // return placeholder for cyclic references
    }

    seen.add(obj); //add object to set to track cyclic references

    // iterate over object properties
    for (const key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
            obj[key] = removeCyclicReferences(obj[key], seen); // recursively remove cyclic references
        }
    }

    return obj;
}

function printStatusMsg(statusMsgRef, message, color, delay = 2000) {
    statusMsgRef.style.color = color;
    statusMsgRef.textContent = message;
    setTimeout(() => {
    this.patronStatusMsg.textContent = '';
    }, delay);
}

function containsNumbers(value) {
    return /\d/.test(value);
}
function containsOnlyNumber(value) {
    return /^\d+$/.test(value);
}

function buildLib(libKey) {
    if (localStorage.getItem(libKey)) {
        const lib = new Library();
        lib._books = JSON.parse(localStorage.getItem('library2'))._books;
        lib._patrons = JSON.parse(localStorage.getItem('library2'))._patrons;
        return lib;
    }

    return new Library();
}