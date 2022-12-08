import _ from 'lodash';
import axios from 'axios';

const reportApi = () => ({
  async create(id, payload = {}) {
    const { data } = await axios.post('/api/reports', payload);
    return data;
  },
  async get(id) {
    const { data } = await axios.get(`/api/reports/${id}`);
    return data;
  },
  async getAll() {
    const { data } = await axios.get('/api/reports');
    return data;
  },
  async update(report) {
    const { data } = await axios.put(
      `/api/reports/${report.id}`,
      _.pick(report, ['name']),
    );
    return data;
  },
  async delete(report) {
    await axios.delete(`/api/reports/${report.id}`);
  },
});

export default reportApi;
