
interface varsType {
    stack: Array<string[]>;
    ctr: number;
    outputJson: string;
    jsonString: string;
}

export class JsonLinter  {
    public Lint(jsonString: string) : string {
        // Implementation of JSON linting and auto-completion
        let stack: Array<string[]> = [];
        let ctr: number = 0;
        let outputJson: string = "";
        let vars : varsType  = {
            stack,
            ctr,
            outputJson,
            jsonString
        };
        this.ParseElement(vars);

        let previous_item = "";
        //rebuild json from stack
        while(vars.stack.length>0) {
            let parts = vars.stack.pop();
            //const parts = item?.split(':');
            if(!parts || parts.length<2) {
                throw new Error("Invalid stack element");
            }
            const elementType = parts[0];
            const element = parts[1];
            if(elementType==="key"){
                if(previous_item==="key"){
                    vars.outputJson = `{"${element}":` + vars.outputJson + "}";
                } else{
                    vars.outputJson = `,"${element}":` + vars.outputJson 
                }
                previous_item = "key";
            } else if(elementType==="value"){
                vars.outputJson = `"${element}"` + vars.outputJson;
                previous_item = "value";
            }else{
                throw new Error("Invalid stack element type");
            }
        }  

        return "{" + vars.outputJson.substring(1, vars.outputJson.length ) + "}"; // Return the output JSON instead of the input string
    }

    ParseKey(vars: varsType) : void {
        let currentChar = vars.jsonString[vars.ctr];
        let nextChar = vars.jsonString[vars.ctr + 1];
        if(currentChar!=="\"") {
            throw new Error("Invalid JSON key element");
        }

        if(nextChar==="\{") {
            // TODO Nested object
            vars.ctr += 2;
        }
        const nameEnd:number = vars.jsonString.indexOf("\"", vars.ctr + 1);
        if(nameEnd === -1) {
            throw new Error("Invalid JSON key element");
        }
        const key_name=vars.jsonString.substring(vars.ctr +1, nameEnd);
        vars.ctr = nameEnd + 1;
        const parts = ["key",`${key_name}`];
        vars.stack.push(parts);
    }

    ParseValue(vars: varsType) : void {
        let currentChar = vars.jsonString[vars.ctr];
        if(currentChar!=="\"" && currentChar!=="{" && currentChar!=="[") {
            throw new Error("Invalid JSON value element"); // later it could be "[" when array is supported
        }
        if(currentChar==="["){
            throw new Error("Not handling arrays yet");
        }
        if(currentChar==="{") {
            // Nested object
            this.ParseElement(vars);
        }
        else {
            // Primitive or string value
            let valueEnd:number = vars.jsonString.indexOf("\"", vars.ctr + 1);
            let incomplete: boolean = false;
            let incompleteValue: boolean = false;
            if(valueEnd === -1) {
                incomplete = true;
                // incomplete json - the are few cases - (1) there is a ',' => value is complete (2) there is a '}' => value is complete (3) end of string => incomplete value
                valueEnd = vars.jsonString.indexOf(",", vars.ctr + 1);
                if(valueEnd === -1) {
                    valueEnd = vars.jsonString.indexOf("}", vars.ctr + 1);
                    if(valueEnd === -1) {
                        incompleteValue = true;
                    }
                }
                
            }
            let value = "";
            if(incompleteValue){
                const parts = ["value","unknown_value"];
                vars.stack.push(parts);
                valueEnd = vars.jsonString.length;
            }else{
                vars.jsonString.substring(vars.ctr +1, incomplete?valueEnd:vars.jsonString.length);
            }
            vars.ctr = valueEnd + 1;
            const parts = ["value",`${value}`];
            vars.stack.push(parts);
        }
        
    }


    ParseElement(vars: varsType) : void {
        // Implementation of JSON element parsing
        let curChar = vars.jsonString[vars.ctr];
        if(curChar!=="{" && curChar!=="[") {
            throw new Error("Invalid JSON element");
        }
        if(curChar==="["){
            throw new Error("Not handling arrays yet");
        }
        vars.ctr++;
        curChar = vars.jsonString[vars.ctr];
        while(curChar != "}" && vars.ctr < vars.jsonString.length) {
            this.ParseKey(vars);
            curChar = vars.jsonString[vars.ctr];
            if(curChar !== ':'){
                throw new Error("Invalid JSON element : misssing colon");
            }
            vars.ctr++;
            this.ParseValue(vars);
            curChar = vars.jsonString[vars.ctr];
            if(curChar === ','){
                vars.ctr++;
                curChar = vars.jsonString[vars.ctr];
            }
        }
    }

} 