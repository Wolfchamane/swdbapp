import scapeSingleQuotes from "./scape-single-quotes.mjs";

const NULL_VALUE = 'NULL';

export default (value) => {
    if (value === null) {
        return NULL_VALUE;
    }

    switch (typeof value) {
        case 'string':
            return !!value ? `'${scapeSingleQuotes(value)}'` : NULL_VALUE;
        case 'number':
            return !isNaN(value) && Number.isFinite(value) ? value : NULL_VALUE;
        default:
            return NULL_VALUE;
    }
};
