import { Button } from 'semantic-ui-react';
import FieldFormModal from '../../ReportTemplate/Component/FieldFormModal';
import FieldListItemFactory from './FieldListItemFactory';

function FieldList({
  sectionFields, sectionIndex, handleRemoveFieldFromSectionClick, handleSaveFieldToSectionFieldsList, isTemplate,
}) {
  const fieldElementsList = sectionFields.map((field, fieldIndex) => {
    const fieldElement = FieldListItemFactory(field, isTemplate);

    return (
      <div key={fieldIndex} style={{ border: '1px solid grey', margin: '20px' }}>

        <h4>
          Title:
          {field.title}
        </h4>
        <h4>
          Type:
          {field.type}
        </h4>
        {fieldElement}

        {isTemplate && (
        <FieldFormModal
          fieldIndex={fieldIndex}
          onModalSubmit={(field, fieldIndex) => handleSaveFieldToSectionFieldsList(sectionIndex, field, fieldIndex)}
          fieldList={sectionFields}
          injectedField={field}
        />
        )}
        {isTemplate && <Button onClick={() => handleRemoveFieldFromSectionClick(sectionIndex, fieldIndex)}>Remove Field</Button>}
      </div>
    );
  });

  return (
    <div>
      <div className="FieldList">
        {fieldElementsList}
      </div>

      {isTemplate && (
      <FieldFormModal
        onModalSubmit={(field) => handleSaveFieldToSectionFieldsList(sectionIndex, field)}
        fieldList={sectionFields}
      />
      )}
    </div>
  );
}

export default FieldList;
