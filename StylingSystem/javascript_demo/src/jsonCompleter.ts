
export class JsonCompleter {
    complete(json: string): string {
        if (!json) return "{}";

        let stackDepth = 0;

        /*

        enum State {
            EXPECT_KEY,
            IN_KEY_QUOTED,
            IN_KEY_UNQUOTED,
            EXPECT_COLON,
            EXPECT_VALUE,
            IN_VALUE_QUOTED,
            IN_VALUE_PRIMITIVE, // numbers, true, false, null
            AFTER_VALUE // Expect comma or close brace
        }
            */

        const State = { EXPECT_KEY: 0, IN_KEY_QUOTED: 1, IN_KEY_UNQUOTED: 2, EXPECT_COLON: 3, EXPECT_VALUE: 4, IN_VALUE_QUOTED: 5, IN_VALUE_PRIMITIVE: 6, AFTER_VALUE: 7 } as const;
        type State = typeof State[keyof typeof State];

        let state: State = State.EXPECT_VALUE;
        let tokenStart = -1;
        let isEscaped = false;

        const len = json.length;

        for (let i = 0; i < len; i++) {
            const char = json[i]??"";

            // If we are in a string, we ignore most chars
            if (state === State.IN_KEY_QUOTED || state === State.IN_VALUE_QUOTED) {
                if (isEscaped) {
                    isEscaped = false;
                } else {
                    if (char === '\\') {
                        isEscaped = true;
                    } else if (char === '"') {
                        // End of string
                        if (state === State.IN_KEY_QUOTED) {
                            state = State.EXPECT_COLON;
                        } else {
                            state = State.AFTER_VALUE;
                        }
                    }
                }
                continue;
            }

            // Whitespace handling (unless in unquoted token)
            if (/\s/.test(char)) {
                if (state !== State.IN_KEY_UNQUOTED && state !== State.IN_VALUE_PRIMITIVE) {
                    continue;
                }
                // If in primitive/unquoted key, space ends it
                if (state === State.IN_KEY_UNQUOTED) {
                    state = State.EXPECT_COLON;
                } else if (state === State.IN_VALUE_PRIMITIVE) {
                    state = State.AFTER_VALUE;
                }
                continue;
            }

            switch (state) {
                case State.EXPECT_VALUE:
                    if (char === '{') {
                        stackDepth++;
                        state = State.EXPECT_KEY;
                    } else if (char === '"') {
                        state = State.IN_VALUE_QUOTED;
                        tokenStart = i;
                    } else {
                        // Primitive/value start
                        state = State.IN_VALUE_PRIMITIVE;
                        tokenStart = i;
                    }
                    break;

                case State.EXPECT_KEY:
                    if (char === '}') {
                        stackDepth--;
                        state = State.AFTER_VALUE;
                    } else if (char === '"') {
                        state = State.IN_KEY_QUOTED;
                        tokenStart = i;
                    } else {
                        state = State.IN_KEY_UNQUOTED;
                        tokenStart = i;
                    }
                    break;

                case State.EXPECT_COLON:
                    if (char === ':') {
                        state = State.EXPECT_VALUE;
                    }
                    break;

                case State.AFTER_VALUE:
                    if (char === ',') {
                        if (stackDepth > 0) {
                            state = State.EXPECT_KEY;
                        } else {
                            state = State.EXPECT_VALUE;
                        }
                    } else if (char === '}') {
                        stackDepth--;
                    }
                    break;

                case State.IN_KEY_UNQUOTED:
                    if (char === ':') {
                        state = State.EXPECT_VALUE;
                    } else if (char === '}') {
                        stackDepth--;
                        state = State.AFTER_VALUE;
                    }
                    break;

                case State.IN_VALUE_PRIMITIVE:
                    if (char === ',' || char === '}') {
                        state = State.AFTER_VALUE;
                        if (char === '}') stackDepth--;
                        else if (stackDepth > 0 && char === ',') state = State.EXPECT_KEY;
                    }
                    break;
            }
        }

        // Post-processing at EOS
        let result = json;

        switch (state) {
            case State.IN_KEY_QUOTED:
            case State.IN_KEY_UNQUOTED:
                // Replace partial key.
                result = result.substring(0, tokenStart);
                result += '"unknown_key":"unknown_value"';
                break;

            case State.EXPECT_COLON:
                // We have a full key, waiting for colon.
                // Rule: "ends abruptly at key".
                // We consider "key without colon" as abruptly ending at key.
                // Replace with unknown_key.
                result = result.substring(0, tokenStart);
                result += '"unknown_key":"unknown_value"';
                break;

            case State.EXPECT_KEY:
                // Just waiting for key.
                result += '"unknown_key":"unknown_value"';
                break;

            case State.EXPECT_VALUE:
                // Waiting for value (after dot/colon).
                result += '"unknown_value"';
                break;

            case State.IN_VALUE_QUOTED:
                // Close the quote.
                result += '"';
                break;

            case State.IN_VALUE_PRIMITIVE:
                // Rule: "If it ends abruptly at a value then add that value a 'unknown_value'"
                // This implies replacing the partial value "tru" -> "unknown_value"
                result = result.substring(0, tokenStart);
                result += '"unknown_value"';
                break;

            case State.AFTER_VALUE:
                // Just close braces.
                break;
        }

        for (let i = 0; i < stackDepth; i++) {
            result += '}';
        }

        return result;
    }
}

