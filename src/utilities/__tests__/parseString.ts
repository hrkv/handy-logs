import {parseString} from "../parseString";
import {EBrackets} from "../../types/EBrackets";
import {NGINX_PARSER_OPTIONS} from "../../constants/parserOptions";

describe('parseString', function () {
    it('returns an empty array', () => {
        expect(parseString('')).toEqual([]);
    });

    it('returns single element', () => {
        expect(parseString('hello')).toEqual(['hello']);
    });

    it('returns parsed string', () => {
        expect(parseString('hello, [we are] (going to) <do some> {magic !}')).toEqual([
            'hello,',
            '[we',
            'are]',
            '(going',
            'to)',
            '<do',
            'some>',
            '{magic',
            '!}',
        ]);

        expect(parseString('hello, (world !')).toEqual([
            'hello,',
            '(world',
            '!',
        ]);

        expect(parseString('hello, (world !', {
            groupBy: {
                [EBrackets.Parentheses]: true
            }
        })).toEqual([
            'hello,',
            '(world !',
        ]);
    });

    it('returns parsed nginx string', () => {
        expect(parseString(
            '81.222.186.164 - - [15/Oct/2022:07:21:41 +0000] "GET / HTTP/1.1" 200 324 "-" "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/106.0.0.0 Safari/537.36"',
            NGINX_PARSER_OPTIONS
        )).toEqual([
            '81.222.186.164',
            '-',
            '-',
            '[15/Oct/2022:07:21:41 +0000]',
            'GET / HTTP/1.1',
            '200',
            '324',
            '-',
            'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/106.0.0.0 Safari/537.36'
        ]);
    });
});
