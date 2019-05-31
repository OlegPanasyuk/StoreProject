import React from 'react';
import PropTypes from 'prop-types';
import { Breadcrumb } from 'react-bootstrap';

const BreadCrumbs = ({ obj, handleClick }) => {
  const breadcrumbItems = obj.map((element, i) => (
    <Breadcrumb.Item
      href="#" onClick={() => handleClick(element.id)} key={element.id}
      active={i === (obj.length - 1)}
    >
      {element.name}
    </Breadcrumb.Item>
  ));

  return (
    <Breadcrumb variant="secondary">
      {breadcrumbItems}
    </Breadcrumb>
  );
};

BreadCrumbs.propTypes = {
  obj: PropTypes.array,
  handleClick: PropTypes.func,
};

BreadCrumbs.defaultProps = {
  obj: [],
  handleClick: () => null,
};

export default BreadCrumbs;
