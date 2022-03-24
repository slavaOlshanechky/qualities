import React from "react";
import {useHistory} from "react-router-dom";
import QualitiesTable from "../components/ui/qualitiesTable";
import {useQualities} from "../hooks/useQualities";

const QualitiesListPage = () => {
    const history = useHistory();
    // useEffect(async () => {
    //     qualityService.fetchAll().then(data => setQualities(data.content))
    //     const {data} = await axios
    //         .get("http://localhost:4000/api/v1/quality")
    //     setQualities(data.content)
    // }, []);

    const {qualities,deleteQuality} = useQualities()
    const handleEdit = (param) => {
        console.log(param);
        history.push(`/edit/${param}`);
    };
    const handleDelete = (id) => {
        deleteQuality(id)
    };
    return (
        <>
            <h1>Qualitites List Page</h1>
            <QualitiesTable
                onDelete={handleDelete}
                onEdit={handleEdit}
                data={qualities}
            />
        </>
    );
};

export default QualitiesListPage;
