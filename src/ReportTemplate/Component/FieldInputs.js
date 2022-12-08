import React from 'react';
import { Input } from 'semantic-ui-react';
import FieldSelectableInput from './FieldSelectableInput';
import FieldFilterableInput from './FieldFilterableInput';
import FieldDashboardInput from './FieldDashboardInput';

const fieldTypeComponents = {
  select: FieldSelectableInput,
  checkbox: FieldSelectableInput,
  'record-import': FieldFilterableInput,
  dashboard: FieldDashboardInput,
};

function FieldInputs({
  field, handleFieldChange, handleItemChange, handleRemoveItemClick, handleAddItemClick, handleFilterChange,
}) {
  const FieldSpecificInput = fieldTypeComponents[field.type];

  return (
    <div>
      <h4>Field Title</h4>
      <Input value={field.title} onChange={handleFieldChange} placeholder="Please, enter the field title" name="title" />
      <br />
      <br />
      {FieldSpecificInput && (
      <FieldSpecificInput
        field={field}
        handleItemChange={handleItemChange}
        handleRemoveItemClick={handleRemoveItemClick}
        handleAddItemClick={handleAddItemClick}
        handleFilterChange={handleFilterChange}
      />
      )}
      <br />
    </div>
  );
}

export default FieldInputs;
