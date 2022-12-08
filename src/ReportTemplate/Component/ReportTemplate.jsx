import React from 'react';
import { useState } from 'react';
import {Button, Input} from 'semantic-ui-react';
import { useLoaderData } from 'react-router-dom';
import SectionList from '../../Report/Component/SectionList';
import reportTemplateApi from '../../api/reportTemplate';

export async function loader({ params }) {
  return await params.reportTemplateId ? reportTemplateApi().get(params.reportTemplateId) : reportTemplateApi().create();
}
function ReportTemplate() {
    const loadedReportTemplate = useLoaderData();
    const [reportTemplate, setReportTemplate] = useState(loadedReportTemplate);

    const handleAddSectionClick = () => {
        const defaultSection = {};
        defaultSection.id = reportTemplate.sections.length + 1;
        defaultSection.sortOrder = reportTemplate.sections.length + 1;
        defaultSection.name = `Section ${reportTemplate.sections.length + 1}`;
        defaultSection.reportFields = [];

        setReportTemplate((prevObject) => {
            const updatedObject = {...prevObject};
            updatedObject.sections = [...prevObject.sections, defaultSection];

            return updatedObject;
        });
    };
    const handleRemoveSectionClick = (index) => {
        setReportTemplate((prevObject) => {
            const updatedObject = {...prevObject};
            updatedObject.sections.splice(index, 1);

            return updatedObject;
        });
    };

    function handleSaveFieldToSectionFieldsList(sectionIndex, field, fieldIndex = null) {
        setReportTemplate((prevObject) => {
            const updatedObject = {...prevObject};
            const list = [...prevObject.sections];

            if (fieldIndex !== null) {
                list[sectionIndex].reportFields[fieldIndex] = {...field};
            } else {
                list[sectionIndex].reportFields = [...list[sectionIndex].reportFields, {...field}];
            }

            updatedObject.sections = list;
            return updatedObject;
        });
    }

    const handleRemoveFieldFromSectionClick = (sectionIndex, fieldIndex) => {
        setReportTemplate((prevObject) => {
            const updatedObject = {...prevObject};

            const list = [...prevObject.sections];
            list[sectionIndex].reportFields.splice(fieldIndex, 1);

            updatedObject.sections = list;
            return updatedObject;
        });
    };

    return (
        <div>
            <div className="ReportTemplate" style={{padding: '20px'}}>
                <h2>Report Template Overview</h2>
                <p>This section will not be included when a report is generated</p>
                <div>
                    <Input value={reportTemplate.name} placeholder="Please, enter the report template name"
                           name="name"/>
                    <br/>
                    <Input value={reportTemplate.description}
                           placeholder="Please, enter the report template description" name="description"/>
                </div>

                <h2>Report Details</h2>
                <p>Report overview details</p>
                <div style={{margin: '10px'}}>
                    <Input disabled placeholder="Autofilled by user at report creation"/>
                    <br/>
                    <Input disabled placeholder="Autofilled by user at report creation"/>
                    <br/>
                    <Input disabled placeholder="Autofilled by user at report creation"/>
                    <br/>
                    <Input value={reportTemplate.supportingText} placeholder="Optional Text Field for Guidance"
                           name="supportingText"/>
                </div>
                {reportTemplate.sections && (
                    <SectionList
                        sections={reportTemplate.sections}
                        handleRemoveFieldFromSectionClick={handleRemoveFieldFromSectionClick}
                        handleSaveFieldToSectionFieldsList={handleSaveFieldToSectionFieldsList}
                        handleAddSectionClick={handleAddSectionClick}
                        handleRemoveSectionClick={handleRemoveSectionClick}
                        isTemplate
                    />
                )}

                {<Button onClick={handleAddSectionClick}>Add Section</Button>}
            </div>
        </div>
    );
}

export default ReportTemplate;
