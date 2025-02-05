import React from 'react';
import { Form, Stack, Row, Col } from 'react-bootstrap';
import Select from 'react-select';
import {
  SearchAdditionalForms,
  SearchFormButtonAdd,
  SearchFormButtonDel,
} from './';
import { useApp } from 'context';
import setsAndPrecons from 'assets/data/setsAndPrecons.json';

const SearchFormSet = ({ value, searchForm, onChange, onChangeOptions }) => {
  const { playtest, isMobile, isXWide } = useApp();
  const maxMenuHeight = isXWide ? 500 : 350;
  const name = 'set';
  const preOptions = Object.keys(setsAndPrecons)
    .filter((i) => playtest || i !== 'PLAYTEST')
    .map((i) => {
      return {
        set: i,
        name: setsAndPrecons[i].name,
        year: setsAndPrecons[i].date.slice(2, 4),
      };
    });

  const options = [
    {
      value: 'any',
      name: name,
      label: (
        <div className="d-flex align-items-center">
          <div className="d-flex w-40px" />
          ANY
        </div>
      ),
    },
    {
      value: 'bcp',
      name: name,
      label: <>Any BCP (incl. Promo)</>,
    },
  ];

  preOptions.map((i) => {
    options.push({
      value: i.set,
      name: name,
      label: (
        <div className="d-flex justify-content-between align-items-center">
          <div className="pe-2">{i.name}</div>
          {i.year && <div className="ps-2 small">{`'${i.year}`}</div>}
        </div>
      ),
    });
  });

  const ageFormOptions = [
    {
      value: 'or-newer',
      label: 'Or Newer',
      title: 'Printed in selected set or any newer (can be in older sets too)',
    },
    {
      value: 'or-older',
      label: 'Or Older',
      title: 'Printed in selected set or any older (can be in newer sets too)',
    },
    {
      value: 'not-newer',
      label: 'Not Newer',
      title: 'Not printed in newer set',
    },
    {
      value: 'not-older',
      label: 'Not Older',
      title: 'Not printed in older set',
    },
  ];

  const ageForm = ageFormOptions.map((i) => {
    return (
      <Form.Check
        key={i.value}
        name="set"
        value={i.value}
        type="checkbox"
        className="small pe-1"
        id={`set-${i.value}`}
        label={i.label}
        title={i.title}
        disabled={
          value.value.length > 1 ||
          value.value[0] === 'bcp' ||
          value.value[0] === 'Promo' ||
          value.value[0] === 'POD'
        }
        checked={value['age'] === i.value}
        onChange={(e) => onChangeOptions(e)}
      />
    );
  });

  const printFormOptions = [
    {
      value: 'only',
      label: 'Only In',
      title: 'Printed only in selected Set',
    },
    {
      value: 'first',
      label: 'First Print',
      title: 'Printed first in selected Set',
    },
    {
      value: 'reprint',
      label: 'Reprint',
      title: 'Reprinted in selected Set',
    },
  ];

  const printForm = printFormOptions.map((i) => {
    return (
      <Form.Check
        key={i.value}
        name={name}
        value={i.value}
        type="checkbox"
        className="small"
        id={`set-${i.value}`}
        label={i.label}
        title={i.title}
        disabled={
          (value.value[0] === 'bcp' ||
            value.value[0] === 'Promo' ||
            value.value[0] === 'POD') &&
          i.value === 'reprint'
        }
        checked={value['print'] === i.value}
        onChange={(e) => onChangeOptions(e)}
      />
    );
  });

  const filterOption = ({ label, value }, string) => {
    let name = undefined;
    if (value == 'any' || value == 'bcp') {
      name = label.props.children[1];
    } else {
      name = label.props.children[0].props.children;
    }
    if (name) {
      return name.toLowerCase().includes(string);
    } else {
      return true;
    }
  };

  return (
    <>
      <Row className="py-1 ps-1 mx-0 align-items-center">
        <Col
          xs={3}
          className="d-flex justify-content-between align-items-center px-0"
        >
          <div className="bold blue">Set:</div>
          {value.value[0] !== 'any' && (
            <div className="d-flex justify-content-end pe-1">
              {value.value.length == 1 ? (
                <SearchFormButtonAdd searchForm={searchForm} name={name} />
              ) : (
                <SearchFormButtonDel
                  searchForm={searchForm}
                  i={0}
                  name={name}
                />
              )}
            </div>
          )}
        </Col>
        <Col xs={9} className="d-inline px-0">
          <Select
            classNamePrefix="react-select"
            options={options}
            isSearchable={!isMobile}
            menuPlacement="top"
            filterOption={filterOption}
            name={0}
            maxMenuHeight={maxMenuHeight}
            value={options.find((obj) => obj.value === value.value[0])}
            onChange={onChange}
          />
        </Col>
      </Row>
      <SearchAdditionalForms
        value={value}
        name={name}
        searchForm={searchForm}
        menuPlacement={isMobile ? 'top' : 'bottom'}
        options={options}
        onChange={onChange}
        maxMenuHeight={maxMenuHeight}
      />
      <Row className="pb-1 ps-1 mx-0 align-items-center">
        <Col className="d-flex justify-content-end px-0">
          <Stack direction="horizontal" gap={2}>
            {ageForm}
          </Stack>
        </Col>
      </Row>
      <Row className="pb-1 ps-1 mx-0 align-items-center">
        <Col className="d-flex justify-content-end px-0">
          <Stack direction="horizontal" gap={3}>
            {printForm}
          </Stack>
        </Col>
      </Row>
    </>
  );
};

export default SearchFormSet;
