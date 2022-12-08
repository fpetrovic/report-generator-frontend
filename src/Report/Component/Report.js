import { useState } from 'react';
import { Input } from 'semantic-ui-react';
import { useLoaderData } from 'react-router-dom';
import SectionList from './SectionList';
import reportApi from '../../api/report';

export async function loader({ params }) {
  return params.reportId ? await reportApi().get(params.reportId) : await reportApi().create();
}
function ReportTemplate() {
  const loadedReport = useLoaderData();
  const [report, setReport] = useState(loadedReport);

  return (
    <div>
      <div className="Report" style={{ padding: '20px' }}>
        <h2>Report Details</h2>
        <p>Report overview details</p>
        <div>
          <Input value={report.name} placeholder="Please, enter the report name" name="name" />
          <br />
          <Input value={report.author} name="author" />
          <Input value={report.createdAt} name="createdAt" />
        </div>

        <SectionList
          sections={report.sections}
          isTemplate={false}
        />
      </div>
    </div>
  );
}

export default ReportTemplate;
