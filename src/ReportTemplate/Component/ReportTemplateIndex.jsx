import React from 'react';
import { Table } from 'semantic-ui-react';
import { Link, useLoaderData } from 'react-router-dom';
import reportTemplateApi from '../../api/reportTemplate';

export async function loader() {
  const results = await reportTemplateApi().getAll();
  return results['hydra:member'];
}
function ReportTemplateIndex() {
  const reportTemplates = useLoaderData();

  const reportTemplateTableRowElements = reportTemplates.map((reportTemplate, index) => (
    <Table.Row key={index} style={{ border: '1px solid grey', margin: '20px' }}>
      <Table.HeaderCell><a href={`/reportTemplates/${reportTemplate.id}`}>{reportTemplate.name}</a></Table.HeaderCell>
      <Table.HeaderCell>{reportTemplate.createdAt}</Table.HeaderCell>
      <Table.HeaderCell>Does not work</Table.HeaderCell>
      <Table.HeaderCell>Does not work</Table.HeaderCell>
      <Table.HeaderCell>Action</Table.HeaderCell>
    </Table.Row>
  ));

  return (
    <div>
      <h1>Report Templates</h1>
      <Link to="/reportTemplates/new" style={{ margin: '0px', 'margin-left': '10px' }}>Add New Report Template</Link>
      <Table celled>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Name</Table.HeaderCell>
            <Table.HeaderCell>Created</Table.HeaderCell>
            <Table.HeaderCell>Last Updated</Table.HeaderCell>
            <Table.HeaderCell>Last Updated By</Table.HeaderCell>
            <Table.HeaderCell>Action</Table.HeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {reportTemplateTableRowElements}
        </Table.Body>

        <Table.Footer>
          <Table.Row>
            <Table.HeaderCell colSpan="5">
              {/* <Menu pagination> */}
              {/*    <Menu.Item as='a' icon> */}
              {/*        <Icon name='chevron left' /> */}
              {/*    </Menu.Item> */}
              {/*    <Menu.Item as='a'>1</Menu.Item> */}
              {/*    <Menu.Item as='a'>2</Menu.Item> */}
              {/*    <Menu.Item as='a'>3</Menu.Item> */}
              {/*    <Menu.Item as='a'>4</Menu.Item> */}
              {/*    <Menu.Item as='a' icon> */}
              {/*        <Icon name='chevron right' /> */}
              {/*    </Menu.Item> */}
              {/* </Menu> */}
              {/* <section style={{'float':'right'}}> */}
              {/*    <Input style={{'margin':'0px','margin-left':'10px',}} name="limitPerPage" label="Limit Per Page" placeholder="10"></Input> */}
              {/*    <Button style={{'margin':'0px','margin-left':'10px'}}>Confirm</Button> */}
              {/* </section> */}
            </Table.HeaderCell>
          </Table.Row>
        </Table.Footer>
      </Table>
    </div>
  );
}

export default ReportTemplateIndex;
