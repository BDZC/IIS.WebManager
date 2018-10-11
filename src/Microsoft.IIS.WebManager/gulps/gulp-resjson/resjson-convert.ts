export interface Options {
    // enable to produce xxxx.d.ts file.
    // { null, 'module' }
    definition: string;

    // enable to produce xxxx.ts file.
    //  { null, 'module', 'interface' }
    typescript: string;

    // enable to produce xxxx.json file.
    json: boolean;

    // if set a space characters, it adds formating of JSON.
    // it set null, space will be eliminated.
    jsonSpace: string | number;
}

interface NameValuePair {
    name: string;
    value: any;
}

export class ResJsonConverter {
    private static openContent =
`/* tslint:disable */
/**
 * @file Source code generated by gulp-resjson.
 * @version 1.0
 */
`;
    private static closeContent =
`}
`;
    public outputJson: any;
    private outputDefinition: string[];
    private outputTypescript: string[];
    private outputInterface: string[];
    private jsonCurrent: any;

    constructor(private options: Options) {
    }
    
    public get contentDefinition(): string {
        return this.outputDefinition.join('');
    }

    public get contentTypescript(): string {
        return this.outputTypescript.join('');
    }

    public get contentInterface(): string {
        return this.outputInterface.join('');
    }

    public contentReset(): void {
        this.outputDefinition = [];
        this.outputTypescript = [];
        this.outputInterface = [];
        this.outputJson = {};
        this.jsonCurrent = this.outputJson;
    }

    public convert(content: string) {
        let root = {};
        // Remove comments, /* multilinecomment*/ and // one line comment and "//": "JSON element comment"
        content = content.replace(/(\/\*([^*]|[\n]|(\*+([^*/]|[\n])))*\*\/+)|( +\/\/.*)|(  +\"\/\/\".*)/g, '');
        let data: any = JSON.parse(content);
        let itemKeys = Object.keys(data);

        // build a data tree.
        for (let itemKey of itemKeys) {
            // remove localization comments
            if (itemKey.startsWith('//') || (itemKey.startsWith('_') && itemKey.endsWith('.comment'))) {
                continue;
            }

            let current = root;
            let itemValue = data[itemKey];
            const keys = itemKey.split('_');
            let count = keys.length;
            for (let key of keys) {
                count--;
                if (count > 0) {
                    if (!current.hasOwnProperty(key)) {
                        current[key] = {};
                    }

                    current = current[key];

                    if (typeof current !== 'object') {
                        throw new Error('Resource key already exists: ' + itemKey);
                    }
                } else {
                    current[key] = itemValue;
                }
            }
        }

        this.contentReset();
        this.traverse([{ name: 'Strings', value: root }], 0);
    }

    private jsonNewValue(name: string): any {
        let old = this.jsonCurrent;
        let json = {};
        this.jsonCurrent[name] = json;
        this.jsonCurrent = json;

        return old;
    }

    private jsonAddValue(name: string, value: any): void {
        this.jsonCurrent[name] = value;
    }

    private scan(node: any): { keyItems: NameValuePair[], dataItems: NameValuePair[] } {
        let current = node;
        let keyItems: NameValuePair[] = [];
        let dataItems: NameValuePair[] = [];
        for (let itemKey in current) {
            if (current.hasOwnProperty(itemKey)) {
                let itemValue: any = current[itemKey];
                if (typeof itemValue === 'object') {
                    keyItems.push({ name: itemKey, value: itemValue });
                } else if (typeof itemValue === 'string') {
                    dataItems.push({ name: itemKey, value: itemValue });
                }
            }
        }

        return {
            keyItems: keyItems,
            dataItems: dataItems
        };
    }

    private traverse(keyItems: NameValuePair[], indent: number): void {
        const indentSpace = '    ';
        let indentName = '';
        for (let i = 0; i < indent; i++) {
            indentName += indentSpace;
        }

        let indentValue: string = indentName + indentSpace;
        if (keyItems.length > 0) {
            for (let item of keyItems) {
                if (indent === 0) {
                    this.outputDefinition.push(ResJsonConverter.openContent);
                    this.outputTypescript.push(ResJsonConverter.openContent);
                    this.outputInterface.push(ResJsonConverter.openContent);
                    this.outputDefinition.push('export declare module ' + item.name + ' {\r\n');
                    this.outputTypescript.push('export module ' + item.name + ' {\r\n    \'use strict\';\r\n');
                    this.outputInterface.push('export interface ' + item.name + ' {\r\n');
                } else {
                    this.outputDefinition.push(indentName + 'module ' + item.name + ' {\r\n');
                    this.outputTypescript.push(indentName + 'export module ' + item.name + ' {\r\n');
                    this.outputInterface.push(indentName + item.name + ': {\r\n');
                }

                let jsonOld = this.jsonNewValue(item.name);
                let results = this.scan(item.value);
                for (let item2 of results.dataItems) {
                    this.outputDefinition.push(indentValue + 'const ' + item2.name + ': string;\r\n');
                    this.outputTypescript.push(indentValue + 'export const ' + item2.name + ' = \'' + item2.value + '\';\r\n');
                    this.outputInterface.push(indentValue + item2.name + ': string;\r\n');
                    this.jsonAddValue(item2.name, item2.value);
                }

                this.traverse(results.keyItems, ++indent);
                this.jsonCurrent = jsonOld;

                this.outputDefinition.push(indentName + '}\r\n');
                this.outputTypescript.push(indentName + '}\r\n');
                this.outputInterface.push(indentName + '};\r\n');
            }
        }
    }
}
