import {EBrackets} from "../types/EBrackets";
import {IParseOptions} from "../types/IParserOptions";

const OPENING_BRACKETS = {
    '(': EBrackets.Parentheses,
    '[': EBrackets.Brackets,
    '{': EBrackets.Braces,
    '<': EBrackets.Chevrons,
}

const CLOSING_BRACKETS = {
    [EBrackets.Parentheses]: ')',
    [EBrackets.Brackets]: ']',
    [EBrackets.Braces]: '}',
    [EBrackets.Chevrons]: '>',
}

export function parseString(
    target: string,
    options?: IParseOptions,
): string[] {
    let result = [];
    let temp = '';
    let i = 0;

    while (i < target.length) {
        const char = target[i];

        switch (char) {
            case ' ':
                result.push(temp);
                temp = '';

                break;

            case '(':
            case '[':
            case '{':
            case '<':
                const bracketsType = OPENING_BRACKETS[char];

                if (options?.groupBy?.[bracketsType]) {
                    // @ts-ignore
                    const closingBracket = CLOSING_BRACKETS[bracketsType];

                    while ((target[i] !== closingBracket) && (i < target.length)) {
                        temp += target[i];
                        i++;
                    }

                    if (i < target.length) {
                        temp += target[i];
                    }
                } else {
                    temp += char;
                }

                break;

            case '"':
                if (options?.groupBy?.[EBrackets.Quote]) {
                    let localTemp = '';
                    i++;

                    while ((target[i] !== '"') && (i < target.length)) {
                        localTemp += target[i];
                        i++;
                    }

                    if (i < target.length) {
                        temp += localTemp;
                    } else {
                        temp += `"${localTemp}`;
                    }
                } else {
                    temp += char;
                }

                break;

            default:
                temp += char;
        }

        i++;
    }

    if (temp) {
        result.push(temp);
    }

    return result;
}
