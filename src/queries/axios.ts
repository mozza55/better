import axios from 'axios';

/**
 * ClientComponent에서 사용
 */
const clientApi = axios.create({ baseURL: '/api' });

export { clientApi };
