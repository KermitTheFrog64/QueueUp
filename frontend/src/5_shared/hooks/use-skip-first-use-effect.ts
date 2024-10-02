import { useEffect, useRef } from "react"

const useSkipFirstEffect = (cb: () => void, dep: any[]) => {

    const isFirst = useRef<boolean>(true)

    useEffect(() => {
        if (!isFirst.current) {
            return cb()
        }
        else {
            isFirst.current = false
        }
    }, dep)

}

export default useSkipFirstEffect