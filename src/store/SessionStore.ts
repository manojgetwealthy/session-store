import BaseSessionStore from "./base/BaseSessionStore";

class SessionStore<T> extends BaseSessionStore<T> {
    isStoreReady: boolean;
    private _deps: Array<SessionStore<any>>;
    constructor(name: string, ...deps: Array<SessionStore<any>>) {
        super(name, sessionStorage);
        this.isStoreReady = false;
        this._deps = deps;
    }
    protected setStoreType(storeType: Storage) {
        this._storeType = storeType;
    }
    async init() {
        super.init();
        if (this.isStoreReady) return;
        if (this._deps) {
            for (let i =0; i < this._deps.length; i++) {
                await this._deps[i].init();
            }
        }
    }

    destroy() {
        super.destroy();
        if (this._deps) {
            for (let i = 0; i < this._deps.length; i++) {
                this._deps[i].destroy();
            }
        }
        this.isStoreReady = false;
    }
}

export default SessionStore;