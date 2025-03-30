import Settings from "./settings.js";

class Cloud {
    private id: number
    private name: string
    private settings: Settings

    public constructor(id: number, name: string, settings: Settings) {
        this.id = id;
        this.name = name;
        this.settings = settings;
    }
}

export default Cloud;