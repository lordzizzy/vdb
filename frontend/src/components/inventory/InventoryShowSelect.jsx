import React from 'react';
import { Form } from 'react-bootstrap';

function InventoryShowSelect(props) {
  return (
    <Form className="my-0">
      <Form.Check
        className="px-2"
        type="radio"
        id="all"
        label={
          <div className="blue">
            <b>Show All</b>
          </div>
        }
        checked={props.category == 'all'}
        onChange={(e) => props.setCategory(e.target.id)}
      />
      <Form.Check
        className="px-2"
        type="radio"
        id="ok"
        label={
          <div className="blue">
            <b>Only Owned</b>
          </div>
        }
        checked={props.category == 'ok'}
        onChange={(e) => props.setCategory(e.target.id)}
      />
      <Form.Check
        className="px-2"
        type="radio"
        id="nok"
        label={
          <div className="blue">
            <b>Only Problems</b>
          </div>
        }
        checked={props.category == 'nok'}
        onChange={(e) => props.setCategory(e.target.id)}
      />
    </Form>
  );
}

export default InventoryShowSelect;
