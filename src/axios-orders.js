import axios from "axios";

const instance= axios.create({
    baseURL: 'https://react-my-burger-69c0d.firebaseio.com/'
});

export default instance;