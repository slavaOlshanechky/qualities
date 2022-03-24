import React, {useContext, useEffect, useRef, useState} from "react";
import qualityService from "../services/quality.service";

const QualitiesContext = React.createContext()

export const useQualities = () => {
    return useContext(QualitiesContext)
}

export const QualitiesProvider = ({children}) => {
    const [qualities, setQualities] = useState([])
    const [error, setError] = useState(null)
    const [isLoading, setLoading] = useState(true)
    const prevState = useRef()

    useEffect(() => {
        const getQualities = async () => {
            try {
                const {content} = await qualityService.fetchAll()
                setQualities(content)
                setLoading(false)
            } catch (e) {
                const {message} = error.response.data
                setError(message)
            }
        }
        getQualities()
    }, [])

    const getQuality = (id) => {
        return qualities.find((q) => q._id === id)
    }
    const updateQuality = async ({_id: id, ...data}) => {
        try {
            const {content} = await qualityService.update(id, data)
            setQualities((prevState) => prevState.map((item) => {
                if (item._id === content._id) {
                    return content
                }
                return item
            }))
            return content
        } catch (error) {
            const {message} = error.response.data
            setError(message)
        }
    }

    const addQuality = async (data) => {
        try {
            const {content} = await qualityService.create(data)
            setQualities((prevState) => [...prevState, content])
            return content
        } catch (error) {
            const {message} = error.response.data
            setError(message)
        }
    }
    const deleteQuality = async (id) => {
        prevState.current = qualities
        setQualities((prevState) => {
            return prevState.filter(item => item._id !== id)
        })
        try {
            await qualityService.delete(id)

        } catch (error) {
            const {message} = error.response.data
            console.log(message)
            setError(message)
            setQualities(prevState.current)
        }
    }

    return (
        <QualitiesContext.Provider value={{qualities, getQuality, updateQuality, addQuality,deleteQuality}}>
            {!isLoading ? children : <h1>Qualities Loading...</h1>}
        </QualitiesContext.Provider>
    )
}