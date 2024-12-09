import { useEffect } from 'react';

function useOutsideClick(refs: React.RefObject<(HTMLElement | null)[]>, callback: (index: number) => void) {
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const clickedOutside = refs.current?.every((ref) => ref && !ref.contains(event.target as Node));
            if (clickedOutside) {

                refs.current?.forEach((ref, index) => {
                    if (ref && !ref.contains(event.target as Node)) {
                        callback(index);
                    }
                });
            }
        };

        document.addEventListener('mousedown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [refs, callback]);
}

export default useOutsideClick;
