export function registerHandlebarsHelpers(): void {
    Handlebars.registerHelper("isTrue", function (arg1: string) {
        return (arg1.toLocaleLowerCase() === 'true') ? "Checked" : "";
    });

    Handlebars.registerHelper("isFalse", function (arg1: string) {
        return (arg1.toLocaleLowerCase() === 'false') ? "Checked" : "";
    });

    Handlebars.registerHelper("developMode", function (this: unknown, body: Handlebars.HelperOptions) {
        if (BUILD_MODE === "development") {
            return body.fn(this);
        }

        return "";
    });

    Handlebars.registerHelper("pad", (value, length, character): string => {
        return `${value}`.padStart(length, character);
    });

    Handlebars.registerHelper("add", (a, b) => {
        return a + b;
    });

    Handlebars.registerHelper("if_all", (...args) => {
        const opts = args.pop();

        let { fn } = opts;
        for (let i = 0; i < args.length; ++i) {
            if (args[i]) continue;
            fn = opts.inverse;
            break;
        }

        return fn();
    });

    Handlebars.registerHelper("nor", (...args: unknown[]): boolean => {
        return !args.slice(0, -1).some((a) => !!a);
    });

    Handlebars.registerHelper("any", (...args) => {
        const opts = args.pop();
        return args.some((v) => !!v) ? opts : opts.inverse;
    });

    Handlebars.registerHelper("disabled", (condition: unknown) => {
        return condition ? "disabled" : "";
    });

    /** Return the first argument that is neither undefined nor null */
    Handlebars.registerHelper("coalesce", (...args: unknown[]) => {
        return args.find((arg) => arg !== undefined && arg !== null) ?? null;
    });

    Handlebars.registerHelper("lower", (str) => {
        return String.prototype.toLowerCase.call(str ?? "");
    });

    Handlebars.registerHelper("multiply", (a, b) => {
        return a * b;
    });

    Handlebars.registerHelper("percentage", (value, max) => {
        return (value * 100) / max;
    });

    Handlebars.registerHelper("json", (html) => {
        return JSON.stringify(html);
    });

    // From https://github.com/leapfrogtechnology/just-handlebars-helpers/
    Handlebars.registerHelper("concat", function (...params): string {
        return params.slice(0, -1).join("");
    });

    Handlebars.registerHelper("times", function (count, block) {
        const results = new Array<string>();
        for (let i = 0; i < count; i++) {
            results.push(block.fn(i));
        }
        return results.join("");
    });

    Handlebars.registerHelper("isNullish", function (value: unknown) {
        return value === null || value === undefined;
    });

    Handlebars.registerHelper("contains", function (arr: object[], element: object) {
        return Array.isArray(arr) && arr.includes(element);
    });
}
