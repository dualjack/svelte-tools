type ComputedOptions = {
    debounceDelay?: number,
}

export interface Computed<T> {
    get current(): T
}

export function computed<T>(cb: () => T, options?: ComputedOptions): Computed<T>{

    const {
        debounceDelay = 0,
    } = options ?? {};

    //  TODO - debounce logic.

    let derived = $derived.by(cb);
    return {
        get current(){ return derived }
    }
}