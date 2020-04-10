import React from "react";
import PropTypes from 'prop-types';
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Attribute from "../attribute/Attribute";
// import SectionAttributeMap from "../../SectionAttributeMap";
// import { v4 as uuidv4 } from "uuid";
import './Section.component.scss'

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%"
  },
  heading: {
    fontSize: theme.typography.pxToRem(20),
    flexBasis: "33.33%",
    flexShrink: 0
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary
  }
}));

function Section({formErrors, formValues, section, updateFormErrors, updateFormValues}) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const handleChange = panel => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  // const SectionDetails = SectionAttributeMap[props.sectionName];
  const ClassifictionName = section.ClassificationName;
  const ClassifictionDesc = section.ClassificationDesc;
  const Attributes = section.attributes;


  function createAttributes(attrName, key) {
    const attributeInfo = Attributes[attrName]
    const opts = {attributeInfo, formErrors, formValues, index: key, key, updateFormErrors, updateFormValues}
    return <Attribute {...opts} />;
  }

  const attributeRenders = Attributes && Object.keys(Attributes).length > 0 && Object.keys(Attributes).map(createAttributes)

  return (
    <div className="c-Section">
      <ExpansionPanel
        expanded={expanded === ClassifictionName}
        onChange={handleChange(ClassifictionName)}
      >
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls={ClassifictionName + " -content"}
          id={ClassifictionName + " -header"}
        >
          <Typography className={classes.heading}>
            {ClassifictionName}
          </Typography>
          <Typography className={classes.secondaryHeading}>
            {ClassifictionDesc}
          </Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails className="row">
          {attributeRenders}
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </div>
  );
}

Section.propTypes = {
  dispatchSections: PropTypes.func,
  formErrors: PropTypes.object,
  formValues: PropTypes.object,
  sections: PropTypes.object,
  updateFormValues: PropTypes.func,
  updateFormErrors: PropTypes.func
};

export default Section;
