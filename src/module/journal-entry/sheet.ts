import type * as TinyMCE from "tinymce";

class JournalSheetExitNihilo<TJournalEntry extends JournalEntry = JournalEntry> extends JournalSheet<TJournalEntry> {
    static get theme(): string | null {
        return null;
    }

    /** Use the system-themed styling only if the setting is enabled (on by default) */
    static override get defaultOptions(): DocumentSheetOptions {
        const options = super.defaultOptions;
        const { theme } = this;
        if (theme) {
            options.classes.push(theme);
        }
        return options;
    }
}

class JournalTextTinyMCESheetExitNihilo extends JournalTextTinyMCESheet {
    override async activateEditor(
        name: string,
        options: Partial<TinyMCE.EditorOptions> = {},
        initialContent = ""
    ): Promise<TinyMCE.Editor> {
        const editor = await super.activateEditor(name, options, initialContent);

        const parentSheet = this.object.parent?.sheet.constructor as { theme?: string } | undefined;
        const theme = parentSheet?.theme;
        editor.contentDocument.documentElement.classList.add("journal-entry-page", "text");
        editor.contentDocument.body.classList.add("journal-page-content");
        if (theme) {
            editor.contentDocument.documentElement.classList.add(theme);
        }

        return editor;
    }
}

export { JournalSheetExitNihilo, JournalTextTinyMCESheetExitNihilo };
