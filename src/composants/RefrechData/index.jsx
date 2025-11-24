import { useCallback, useEffect, useState } from "react";
import { useFetch } from "../../utils/hooks/FetchData";

export const DataRefrech = ({ link, param, body, methode, data, setUpdate, update, setDone, doneValue, done }) => {

    const [update02, setUpdate02] = useState(false)
    const dataRefrech = useFetch(link, methode, body, param, update02);
    const [count, setCount] = useState(0);

    const makeRefrech = useCallback(() => {
        if (!dataRefrech.isLoading && !dataRefrech.error && navigator.onLine) {
            if (!dataRefrech.error && dataRefrech.data !== null && (JSON.stringify(dataRefrech.data) !== JSON.stringify(data))) {
                if (setDone) {
                    setDone(doneValue)
                }
                setUpdate(!update);

            }
        }
    }, [dataRefrech, data, setDone, doneValue, update, setUpdate]);

    const incrementCounter = useCallback(() => {
        //console.log("==Mise a jour de l'update==", update02)
        makeRefrech()
        setUpdate02(!update02)
        setCount(count + 1);
    }, [count, update02, makeRefrech]);

    useEffect(() => {

        const interval = setInterval(() => {
            incrementCounter();
        }, 2000);
        return () => clearInterval(interval);
    }, [incrementCounter]);

}