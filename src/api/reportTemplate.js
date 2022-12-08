import _ from 'lodash';
import axios from 'axios';

const reportTemplateApi = () => ({
  async create(id, payload = {}) {
    const { data } = await axios.post('/api/report_templates', payload);
    return data;
  },
  async get(id) {
    const { data } = await axios.get(`/api/report_templates/${id}`);
    return data;
  },
  async getAll() {
    const { data } = await axios.get('/api/report_templates');
    return data;
  },
  async update(reportTemplate) {
    const { data } = await axios.put(
      `/api/report_templates/${reportTemplate.id}`,
      _.pick(reportTemplate, ['name']),
    );
    return data;
  },
  async delete(reportTemplate) {
    await axios.delete(`/api/report_templates/${reportTemplate.id}`);
  },
});

export default reportTemplateApi;
