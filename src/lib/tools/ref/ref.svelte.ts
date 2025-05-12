export interface Ref<T> {
    __isRef: true,  //  Simple type guard.
    get current(): T,
    set current(value: T)
}

export function isRef<T>(v: unknown): v is Ref<T> {
    return !!v && typeof v === "object" && Object.hasOwn(v, '__isRef');
}

export function ref<T>(value: T): Ref<T> {
    let state = $state(value);
    return {
        __isRef: true,
        get current(){ return state; },
        set current(value: T){ state = value }
    }
}