import { ErrorExitNihilo } from "@util/misc";
import MainTranslations from "static/lang/fr.json";

type TranslationsExitNihilo = Record<string, TranslationDictionaryValue> & typeof MainTranslations;

export class LocalizeExitNihilo {
    static ready = false;

    private static _translations: TranslationsExitNihilo;

    static get translations(): TranslationsExitNihilo {
        if (!this.ready) {
            throw ErrorExitNihilo("LocalizeExitNihilo instantiated too early");
        }
        if (this._translations === undefined) {
            this._translations = mergeObject(game.i18n._fallback, game.i18n.translations, {
                enforceTypes: true,
            }) as TranslationsExitNihilo;
        }
        return this._translations;
    }
}
