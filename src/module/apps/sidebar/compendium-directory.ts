/** Extend CompendiumDirectory to support a search bar */
export class CompendiumDirectoryExitNihilo extends CompendiumDirectory {

    constructor(options?: ApplicationOptions) {
        super(options);
    }

    /** Include ability to search and drag document search results */
    static override get defaultOptions(): ApplicationOptions {
        const options = super.defaultOptions;
        options.dragDrop.push({ dragSelector: "ol.document-matches > li.match" });

        return {
            ...options,
            filters: [{ inputSelector: "input[type=search]", contentSelector: "ol.directory-list" }],
            template: "systems/exit-nihilo/templates/sidebar/compendium-directory.hbs",
        };
    }

    override async getData(options?: Partial<ApplicationOptions>): Promise<CompendiumDirectoryDataExitNihilo> {
        return {
            ...(await super.getData(options)),
        };
    }

}

interface CompendiumDirectoryDataExitNihilo extends CompendiumDirectoryData {
}
