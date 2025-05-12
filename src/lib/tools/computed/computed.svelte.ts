export interface Computed<T> {
    get current(): T
}

export function computed<T>(cb: () => T): Computed<T>{
    let derived = $derived.by(cb);
    return {
        get current(){ return derived }
    }
}