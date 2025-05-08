type WatchOptions = {
    lazy?: boolean,
    pre?: boolean
}

export default function watch<T>(
    src: () => T,
    cb: (newValue: T, oldValue: T|undefined) => void,
    options?: WatchOptions
){

    let isPaused = $state(false);
    let oldValue: T|undefined;
    let isLazyPass: boolean = false;

    function run(newValue: T){
        if(isPaused) return;

        //  Run once and change the flag.
        if(options?.lazy && !isLazyPass){
            isLazyPass = true;
            return;
        }

        cb(newValue, oldValue);
        oldValue = newValue;
    }

    $effect.root(() => {

        if(options?.pre){
            //  Pre - before DOM modifications.
            $effect.pre(() => {
                run(src());
            });
        } else {
            //  After DOM modifications.
            $effect(() => {
                run(src());
            });
        }

    });

    return {
        pause: () => isPaused = true,
        resume: () => isPaused = false,
        isPaused: {
            get current(){ return isPaused },
            set current(v){ isPaused = v },
        },
    }

}