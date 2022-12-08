import React, { useState } from 'react';
import {
  Button, Dropdown, Modal,
} from 'semantic-ui-react';
import FieldInputs from './FieldInputs';
import fieldTypeData from '../Data/FieldTypeData';

function FieldFormModal({
  fieldIndex = null, onModalSubmit, injectedField = undefined, fieldList,
}) {

  const defaultField = {
        id: 0,
        title: '',
        type: '',
        sortOrder: 0,
        options: [],
        filter: {
            type: 'note', status: 'all', priorities: ['1', '2'], category: '', categories: ['health'], locations: [], categoryGroups: [], isShowCategoriesWithNoIssues: true,
        },
    }

  const [open, setOpen] = useState(false);
  const [field, setField] = useState(injectedField ?? defaultField);

  const id = fieldIndex !== null ? field.id : fieldList.length + 1;
  const sortOrder = fieldIndex !== null ? field.sortOrder : fieldList.length + 1;


  const handleFieldChange = (e, data) => {
    const { name, value } = data;

    setField((prevField) => (
      {
        ...prevField,
        [name]: value,
        id,
        sortOrder,
      }));
  };

  const handleFilterChange = (e, data) => {
    const { name, value } = data;

    setField((prevField) => {
      const updatedField = { ...prevField, filter: { ...prevField.filter, [name]: value } };
      if (updatedField.filter.type !== 'issue') {
        updatedField.filter.categories = [];
        updatedField.filter.locations = [];
        updatedField.filter.priorities = [];
      }

      return updatedField;
    });
  };

  const handleItemChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...field.options];
    list[index][name] = value;
    setField((prevField) => ({
      ...prevField,
      options: list,
    }));
  };

  const handleRemoveItemClick = (index) => {
    const list = [...field.options];
    list.splice(index, 1);
    setField((prevField) => ({
      ...prevField,
      options: list,
    }));

    // reset sort order!
  };

  const handleAddItemClick = () => {
    const list = [...field.options, { id: 0, title: '', sortOrder: 0 }];
    setField((prevField) => ({
      ...prevField,
      options: list,
    }));
  };

  return (
    <Modal
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      trigger={<Button>Save Field</Button>}
    >
      <Modal.Header>Save Field</Modal.Header>
      <Modal.Content>

        <Modal.Description>
          <p>
            This is a demo of component based app and its simplicity.
          </p>
          <h4>Field Type: </h4>
          <Dropdown
            placeholder="Select Field Type"
            fluid
            selection
            options={fieldTypeData}
            onChange={handleFieldChange}
            name="type"
            value={ field.type }
          />
          <br />
          {' '}
          {/* Handle this with the css */}

          <FieldInputs
            field={field}
            type={field.type}
            handleFieldChange={handleFieldChange}
            handleItemChange={handleItemChange}
            handleRemoveItemClick={handleRemoveItemClick}
            handleAddItemClick={handleAddItemClick}
            handleFilterChange={handleFilterChange}
          />

        </Modal.Description>
      </Modal.Content>
      <Modal.Actions>
        <Button color="black" onClick={() => setOpen(false)}>
          Cancel
        </Button>
        <Button
          content="Save"
          onClick={() => {
            setOpen(false);
            onModalSubmit(field, fieldIndex);
            setField(defaultField)
          }}
          positive
        />
      </Modal.Actions>
    </Modal>
  );
}

export default FieldFormModal;
