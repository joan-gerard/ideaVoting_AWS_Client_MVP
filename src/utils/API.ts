import { Auth } from "aws-amplify"
import Axios from 'axios';

const baseURL = process.env.REACT_APP_API_URL
// const request = async ({path, method, data}) => {
//     const user = await Auth.currentSession()

//     const axiosRes = await Axios.request({
//         header: {
//             Authorization: `Bearer ${user.getIdToken().getJwtToken()}`,
//         },
//         method,
//         data,
//         url: `${baseURL}/${path}`
//     })
// }