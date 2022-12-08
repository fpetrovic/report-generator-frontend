import { useState } from 'react';
import { Button } from 'semantic-ui-react';
import FieldList from './FieldList';

function SectionList(props) {
  const sectionElementsList = props.sections.map((section, index) => (
    <div key={index} style={{ border: '1px solid grey' }}>
      <h4>
        Title:
        {section.name}
      </h4>

      <FieldList
        key={index}
        sectionIndex={index}
        sectionFields={section.reportFields}
        handleRemoveFieldFromSectionClick={props.handleRemoveFieldFromSectionClick}
        handleSaveFieldToSectionFieldsList={props.handleSaveFieldToSectionFieldsList}
        isTemplate={props.isTemplate}
      />
      {props.isTemplate && <Button onClick={() => props.handleRemoveSectionClick(index)}>Remove Section</Button>}
    </div>
  ));

  return (
    <div>
      <div className="SectionList">
        {sectionElementsList}
      </div>

      <br />
    </div>
  );
}

export default SectionList;
