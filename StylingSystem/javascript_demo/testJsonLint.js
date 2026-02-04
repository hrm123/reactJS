"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jsonLint_1 = require("./jsonCompleter");
var completer = new jsonLint_1.JsonCompleter();
console.log("Starting JsonCompleter Tests...\n");
var testCases = [
    // 1. Basic incomplete value
    {
        name: "Incomplete value (key-value pair)",
        input: '{"key1":{"key2":"value2',
        expected: '{"key1":{"key2":"value2"}}'
    },
    // 2. Partial key (unquoted end)
    {
        name: "Partial key (unquoted)",
        input: '{"key1":{"key2',
        expected: '{"key1":{"unknown_key":"unknown_value"}}'
    },
    // 3. Key without value (colon missing)
    {
        name: "Key without value (no colon)",
        input: '{"key1"',
        expected: '{"unknown_key":"unknown_value"}'
    },
    // 4. Key without value (colon present)
    {
        name: "Key without value (colon present)",
        input: '{"key1":',
        expected: '{"key1":"unknown_value"}'
    },
    // 5. Partial key (quoted end? tricky case)
    // If input is `{"key1":{"key2"` -> The parser reads "key2" as a string.
    // Use case: abrupt end at key. logic replaces it.
    {
        name: "Partial key (quoted end)",
        input: '{"key1":{"key2"',
        expected: '{"key1":{"unknown_key":"unknown_value"}}'
    },
    // 6. Valid JSON
    {
        name: "Valid JSON (Unchanged)",
        input: '{"a":"b"}',
        expected: '{"a":"b"}'
    },
    // 7. Empty Input
    {
        name: "Empty Input",
        input: '',
        expected: '{}'
    },
    // 8. Nested structure
    {
        name: "Deep nesting incomplete",
        input: '{"a":{"b":{"c":',
        expected: '{"a":{"b":{"c":"unknown_value"}}}'
    },
    // 9. Multiple keys
    {
        name: "Multiple keys (EOS after comma)",
        input: '{"a":"b",',
        expected: '{"a":"b","unknown_key":"unknown_value"}'
    },
    // 10. Partial primitive
    {
        name: "Partial Primitive (true -> tru)",
        // Parser logic for primitives: if not done, what happens? 
        // Currently my logic doesn't replace primitives, it just closes object.
        // `tru` -> treated as primitive value.
        // Output: `{"a":tru}` -> invalid JSON but valid completion of structure?
        // Wait, requirements said: "If it abruptly ends at a value then add that value a 'unknown_value'"
        // If "tru" is the value, is it "abruptly ending"? Yes.
        // But my code currently might leave it as `tru`. 
        // Let's check this behavior. If it fails, I might need to adjust.
        // For now, let's assume the requirement "add that value a 'unknown_value'" implies REPLACING the partial value?
        // Or appending?
        // Let's set expectation to standard structure close for now, and see.
        // Actually, if I type `{"a":tru`, 
        // State: IN_VALUE_PRIMITIVE.
        // EOS Switch: IN_VALUE_PRIMITIVE -> break.
        // Result: `{"a":tru}`.
        // This is invalid JSON.
        // If the goal is "complete" ... maybe it should be valid JSON?
        // Requirement: "complete' an incomplete JSON object".
        // Usually implies valid JSON.
        // If I strictly follow: "If it abruptly ends at a value then add that value a 'unknown_value'"
        // This implies REPLACEMENT.
        // I will add a test case for this. If it fails, I will fix code.
        input: '{"a":tru',
        expected: '{"a":"unknown_value"}'
    }
];
var checksPassed = 0;
var checksFailed = 0;
testCases.forEach(function (test, i) {
    var result = "";
    try {
        result = completer.complete(test.input);
    }
    catch (e) {
        result = "ERROR: ".concat(e);
    }
    if (result === test.expected) {
        console.log("[PASS] Test ".concat(i + 1, ": ").concat(test.name));
        checksPassed++;
    }
    else {
        console.log("[FAIL] Test ".concat(i + 1, ": ").concat(test.name));
        console.log("   Input:    ".concat(test.input));
        console.log("   Expected: ".concat(test.expected));
        console.log("   Actual:   ".concat(result));
        // Partial primitive hack: if we didn't implement replacement yet, it might return {"a":tru}
        checksFailed++;
    }
});
console.log("\nSummary: ".concat(checksPassed, " passed, ").concat(checksFailed, " failed."));
if (checksFailed > 0) {
    throw new Error("Tests Failed");
}
