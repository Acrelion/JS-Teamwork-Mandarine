var validator = (function () {

    var validator = {
        validateIfUndefined: function (val, name) {
            name = name || 'Value';
            if (val === undefined) {
                throw new Error(name + ' cannot be undefined');
            }
        },
        validateIfObject: function (val, name) {
            name = name || 'Value';
            if (typeof val !== 'object') {
                throw new Error(name + ' must be an object');
            }
        },
        validateIfNumber: function (val, name) {
            name = name || 'Value';
            if (typeof val !== 'number') {
                throw new Error(name + ' must be a number');
            }
        },
        validateString: function (val, minLength, maxLength, regExIllegalCharacters, name) {
            name = name || 'Value';
            this.validateIfUndefined(val, name);

            if (typeof val !== 'string') {
                throw new Error(name + ' must be a string');
            }

            if (val.length < minLength || maxLength < val.length) {
                throw new Error(name + ' must be between ' + minLength + ' and ' + maxLength + ' symbols');
            }

            if (regExIllegalCharacters) {
                if (regExIllegalCharacters.test(val)) {
                    throw new Error(name + ' contains some characters that are not allowed');
                }
            }
        },
        validatePositiveNumber: function (val, name) {
            name = name || 'Value';
            this.validateIfUndefined(val, name);
            this.validateIfNumber(val, name);

            if (val <= 0) {
                throw new Error(name + ' must be positive number');
            }
        },
        validateIfArray:function(val, name){
            name = name || 'Value';
            this.validateIfUndefined(val, name);
            this.validateIfObject(val, name);
            
            if(!Array.isArray(val)){
                throw new Error(name + ' must be array');
            }
        },

        validateIfWithinPropertyRange: function(val, rangeBottom, rangeTop, name) {
            name = name || 'Value';

            if (rangeBottom > val || val > rangeTop) {
                throw new Error(name + ' must be between: ' + rangeBottom + ' and ' + rangeTop);
            }
        }
    };

    return validator;
}());