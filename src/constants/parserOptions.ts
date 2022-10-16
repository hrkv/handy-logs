import {EBrackets} from "../types/EBrackets";
import {IParseOptions} from "../types/IParserOptions";

export const NGINX_PARSER_OPTIONS: IParseOptions = {
    groupBy: {
        [EBrackets.Brackets]: true,
        [EBrackets.Quote]: true,
    },
}
