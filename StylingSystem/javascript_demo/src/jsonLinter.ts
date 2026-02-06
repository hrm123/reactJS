
interface varsType {
    stack: Array<string[]>;
    ctr: number;
    outputJson: string;
    jsonString: string;
}

export class JsonLinter  {
    public Lint(jsonString: string) : string {
        // Implementation of JSON linting and auto-completion
        if(jsonString.trim() === "") {
            return "{}";
        }
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
                    if(vars.outputJson[0]==="{"){
                        vars.outputJson = `{"${element}":` + vars.outputJson + "}";
                    } else if(vars.outputJson[0]===","){ 
                        vars.outputJson = `{"${element}":{` + vars.outputJson.substring(1) + "}}";
                    }else{
                        throw new Error("Invalid output json state when processing key");
                    }
                } else if(previous_item==="value"){
                    vars.outputJson = `,"${element}":` + vars.outputJson 
                } else{ // no previous item.. we use unkown_key, unkonwn_value
                    vars.outputJson = `{"value":"unknown_value"}` + vars.outputJson;
                    vars.outputJson = `{"key":"unknown_key"}` + vars.outputJson;
                    previous_item = "key"; 
                }
                previous_item = "key";
            } else if(elementType==="value"){
                vars.outputJson = `"${element}"` + vars.outputJson;
                previous_item = "value";
            }else{
                throw new Error("Invalid stack element type");
            }
        }  
        if(vars.outputJson[0]===","){
            vars.outputJson = "{" + vars.outputJson.substring(1) + "}";
        }
        return vars.outputJson;
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
        let incomplete: boolean = false;
        let incompleteKey: boolean = false;
        if(nameEnd === -1) {
            incomplete = true;
            const parts = ["key","unknown_key"];
            vars.stack.push(parts);
            vars.ctr = vars.jsonString.length + 1; // move ctr to end to stop further parsing
            return;
        }
        const key_name=vars.jsonString.substring(vars.ctr +1, nameEnd);
        vars.ctr = nameEnd + 1;
        const parts = ["key",`${key_name}`];
        vars.stack.push(parts);
    }

    ParseValue(vars: varsType) : void {
        if(vars.ctr >= vars.jsonString.length) {
            // json ended at colon .. so add unknown_value for that key and return
            const parts = ["value","unknown_value"];
            vars.stack.push(parts);
            return;
        }
        let currentChar = vars.jsonString[vars.ctr];
        if(currentChar!=="\"" && currentChar!=="{" && currentChar!=="[") {
            // throw new Error("Invalid JSON value element"); // later it could be "[" when array is supported
            const parts = ["value","unknown_value"];
            vars.stack.push(parts);
            vars.ctr = vars.jsonString.length + 1;
            return;
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
                    if(valueEnd === -1)  
                    if(vars.ctr  < vars.jsonString.length){ // some (partial) value present
                        incompleteValue = false;
                    } else{
                        incompleteValue = true; // no value is present
                    }
                }
                
            }
            let value = "";
            if(incompleteValue){
                const parts = ["value","unknown_value"];
                vars.stack.push(parts);
                vars.ctr = valueEnd + 1;
            }else{
                const endChar = incomplete?vars.jsonString.length:valueEnd;
                value = vars.jsonString.substring(vars.ctr +1, endChar); 
                vars.ctr = incomplete? (vars.jsonString.length+1) : (valueEnd + 1);
                const parts = ["value",`${value}`];
                vars.stack.push(parts);
            }
            
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
            if(vars.ctr >= vars.jsonString.length) {
                // json ended at key .. so add unknown_vlue for that key and return
                const parts = ["value","unknown_value"];
                vars.stack.push(parts);
                return;
            }
            curChar = vars.jsonString[vars.ctr];
            if(curChar !== ':'){
                throw new Error("Invalid JSON element : misssing colon");
            }
            vars.ctr++;
            this.ParseValue(vars);
            if(vars.ctr<vars.jsonString.length){
                curChar = vars.jsonString[vars.ctr];
                if(curChar === ','){
                    if(vars.ctr == vars.jsonString.length - 1) {
                        // json ended at comma .. so add unknown_key, unknown_value for that and return
                        const partsValue = ["value","unknown_value"];
                        const partsKey = ["key","unknown_key"];
                        vars.stack.push(partsKey);
                        vars.stack.push(partsValue);
                        return;
                    }
                    vars.ctr++;
                    curChar = vars.jsonString[vars.ctr];
                }
            }
        }
    }

} 