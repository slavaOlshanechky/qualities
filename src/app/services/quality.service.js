import httpService from "./http.service";

const qualityEndpoint = "quality/"

// const updateQuality = async (content) => {
//     try {
//         const {data} = await httpService.put(qualityEndpoint, content)
//         return data
//     } catch (error) {
//         console.log("Expected error")
//     }
// }
//
// const getQuality = async (id) => {
//     try {
//         const {data} = await httpService.get(qualityEndpoint)
//         return data
//     } catch (error) {
//         console.log("Expected error")
//     }
// }

const qualityService = {
    update: async (id, content) => {
        const {data} = await httpService.put(
            qualityEndpoint + id,
            content
        )
        return data
    },
    get: async (id) => {
        const {data} = await httpService.get(qualityEndpoint + id)
        return data
    },
    fetchAll:async () => {
        const {data} = await httpService.get(qualityEndpoint)
        return data
    },
}
export default qualityService