import React, { useState } from 'react';
import { Input, Button } from 'semantic-ui-react';

function FieldSelectableInput({
  field, handleItemChange, handleRemoveItemClick, handleAddItemClick,
}) {
  return (
    <div>
      <h4>Please Add Options:</h4>
      { field.options.map((x, i) => (
        <div className="box">
          <Input
            name="title"
            placeholder="Enter the option value"
            value={x.title}
            onChange={(e) => handleItemChange(e, i)}
          />
          <div className="btn-box">
            <Button
              className="mr10"
              onClick={() => handleRemoveItemClick(i)}
            >
              Remove
            </Button>
          </div>

          <br />
        </div>
      ))}

      <Button onClick={handleAddItemClick}>Add Option</Button>
    </div>
  );
}

export default FieldSelectableInput;
