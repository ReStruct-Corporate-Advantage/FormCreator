import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {createPropsSelector} from 'reselect-immutable-helpers';
import {CSSTransition} from 'react-transition-group';
import {dispatchAttributes} from '../../pages/Createattribute/actions';
import {getAttributes} from '../../pages/Createattribute/selectors';
import {AttributeTile} from '../'
import './AttributesAside.component.scss';

const AttributesAside = props => {

  const {attributesInfo, dispatchAttributes} = props
  const [attributes, setAttributes] = useState({})
  let attrArray = []
  let attributeRenders = []

  useEffect(() => {
    fetch('http://localhost:3001/attributes')
    .then(res => res.json())
    .then(data => dispatchAttributes({attributesInfo: JSON.parse(data)}))
    if (attributesInfo) {
      setAttributes(attributesInfo.attributes);
    }
  }, [attributesInfo])

  const toggleSelected = (displayName) => {
    // const currentAttribute = attributes && Object.keys(attributes).filter(key => key === displayName)[0];
    // const currentAttributeTile = attributes[currentAttribute];
    // currentAttributeTile.selected = !currentAttributeTile.selected;
    // setAttributes(attributes)
  }

  if (attributesInfo && attributesInfo.attributes) {
    for (let obj in attributesInfo.attributes) {
      attrArray.push(attributesInfo.attributes[obj])
    }
    attributeRenders = attrArray.sort((attr1, attr2) => attr2.order - attr1.order). map((attribute, key) => {
      return <CSSTransition in={true} key={key}  timeout={200 * (key + 1)} classNames="my-node">
        <AttributeTile index={key} attribute={attribute} toggleSelectedHandler={toggleSelected} /></CSSTransition>
    })
  }

  return (
    <div className='c-AttributesAside'>
      {attributeRenders}
    </div>
  );
};

AttributesAside.propTypes = {
  attributesInfo: PropTypes.object,
  dispatchAttributes: PropTypes.func
};

const mapStateToProps = createPropsSelector({
  attributesInfo: getAttributes
})

const mapDispatchToProps = {
  dispatchAttributes
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AttributesAside);