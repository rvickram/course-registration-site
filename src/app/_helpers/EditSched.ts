export class EditSched {
    constructor(private editing: boolean = false) {}

    public set(editing: boolean):void {
        this.editing = editing;
    }

    public edit(): boolean {
        return this.editing;
    }
}