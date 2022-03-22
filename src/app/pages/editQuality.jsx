import React, {useEffect, useState} from "react";
import QualityForm from "../components/ui/qualityForm";
import {useParams} from "react-router-dom";
import qualityService from "../services/quality.service";
import {toast} from "react-toastify";

const EditQualityPage = () => {
    const [quality, setQuality] = useState(null)
    // const [errors, setErrors] = useState(null)
    const id = useParams().id

    const updateQuality = async (content) => {
        try {
            const data = await qualityService.update(id, content)
            return data.content
        } catch (error) {
            const {message} = error.response.data
            // setErrors({message, code})
            toast.error(message)
        }
    }
    const getQuality = async (id) => {
        try {
            const data = await qualityService.get(id)
            return data.content
        } catch (error) {
            const {message} = error.response.data
            toast.error(message)
        }
    }
    const handleSubmit = (data) => {
        updateQuality(data)
    }

    useEffect(() => {
        getQuality(id).then((data) => {
            setQuality(data)
        })
    }, [])

    return (
        <>
            <h1>Edit Quality Page</h1>
            {quality !== null ? <QualityForm
                data={quality}
                onSubmit={handleSubmit}
            /> : "Loading ..."
            }

        </>
    );
};

export default EditQualityPage;
