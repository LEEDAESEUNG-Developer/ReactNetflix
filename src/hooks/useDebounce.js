// eslint-disable-next-line no-unused-vars
import React, {useEffect, useState} from 'react';

export default function useDebounce(value, delay) {
    // State and setters for debounced value
    const [debouncedValue, setDebouncedValue] = useState(value);

    useEffect(() => {
        //Update debounced value after delay
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay) // delay 지난 후에 setDebouncedValue 값을 설정함, 초기화 된 상태면 delay추가함

        return () => { // delay가 있는데 값을 수정할 경우 초기화가 됨
            clearTimeout(handler);
        }
    }, [value, delay] );
    return debouncedValue;
}
