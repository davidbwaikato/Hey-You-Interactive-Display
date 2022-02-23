const fs = require('fs');

class ShortNames
{
    #freeNames;
    #usedNames = [];


    constructor (fileName) {
        fs.readFile(fileName, 'utf8', (err, data) => {
            if (err){
                console.error(err);
                return;
            }
    
            // Check the line endings
            var temp = data.indexOf('\n');
            var lineEnding = '\n'
            if (data[temp - 1] === '\r')
                lineEnding = '\r\n'
    
            // Need to remove any spaces from name
    
            this.#freeNames = data.split(lineEnding);              
        });
    }

    // Get the nextFree name. Will return undefined if there are no more free names
    nextFree(){
        let fn = this.#freeNames.shift(); // Get first item of freeNames

        if (fn != undefined)
            this.#usedNames.push(fn);
        return fn
    }

    release(shortName){
        // Mark name as unused
        let xName = (element) => element === shortName
        let index = this.#usedNames.findIndex(xName)
        
        if (index != -1){
            this.#usedNames.splice(index,1);
            this.#freeNames.push(shortName);
        } else {
            return "shortName not in use"
        }

        // Return result i.e. success or failure/abort reasoning
    }
}

module.exports = ShortNames;