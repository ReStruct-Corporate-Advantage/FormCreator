import React, {useEffect} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {createPropsSelector} from 'reselect-immutable-helpers';
import {makeStyles} from '@material-ui/core/styles';
import {Tabs, Tab} from '@material-ui/core';
import TabPanel from './../../components/TabPanel'
import {dispatchDeviceType, dispatchStepperState} from './actions';
import {isMobile, getStepperState} from './selectors';
import {Header, AttributesAside, WorkflowStepper} from './../../components/'
import {Displayform, Createattribute, Createsection, Createform} from './../';
import * as $ from 'jquery';
import './TabbedRoot.module.scss';

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

const TabbedRoot = props => {
  const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      // backgroundColor: theme.palette.background.paper,
      display: 'flex',
      height: '100%',
      width: '100%',
      flexDirection: props.isMobile ? 'column' : 'row',
      position: 'fixed'
    },
    tabs: {
      paddingLeft: '3rem',
      paddingRight: '3rem',
      borderRight: `1px solid ${theme.palette.divider}`,
      backgroundColor: '#333',
      width: '15%'
    }
  }));
  const classes = useStyles();
  const {dispatchDeviceType, dispatchStepperState, stepperState} = props
  const [value, setValue] = React.useState(0);
  const labels = ['Create Attribute', 'Create Section', 'Create Form', 'Display Forms']
  // const tabStepMapping = {1: 4, 2: 5}
  const tabStepMapping = {}

  const handleChange = (event, newValue) => {
    setValue(newValue);
    if (newValue in Object.keys(tabStepMapping)) {
      dispatchStepperState({...stepperState, activeStep: tabStepMapping[newValue]})
    }
  };

  useEffect(() => {
    dispatchDeviceType({isMobile: isMobile()})
  }, [dispatchDeviceType])

  /* eslint no-useless-escape: 0 */
  const isMobile = (() => {
    var check = false;
    (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
    return check;
  });

  const tabItemRenders = labels.map((label, key) => <Tab label={label} key={key} {...a11yProps(key)} style={{textAlign: '-webkit-right'}} />)

  return (
    <React.Fragment>
      <Header />
      <div className={`c-TabbedRoot ${classes.root}`}>
        <Tabs
          orientation={props.isMobile ? 'horizontal' : 'vertical'}
          variant="standard"
          value={value}
          onChange={handleChange}
          aria-label="Vertical tabs example"
          className={classes.tabs}
        >
          {tabItemRenders}
        </Tabs>
        <div className="panel-container">
          <WorkflowStepper />
          <TabPanel value={value} index={0}>
            <Createattribute handleChange={handleChange} />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <Createsection />
          </TabPanel>
          <TabPanel value={value} index={2}>
            <Createform />
          </TabPanel>
          <TabPanel value={value} index={3}>
            <Displayform />
          </TabPanel>
          {/* <StepperButtonPanel /> */}
        </div>
        <AttributesAside />
      </div>
    </React.Fragment>
  );
};

TabbedRoot.propTypes = {
  isMobile: PropTypes.bool,
  dispatchDeviceType: PropTypes.func,
  dispatchStepperState: PropTypes.func,
  stepperState: PropTypes.object
}

const mapStateToProps = createPropsSelector({
  isMobile: isMobile,
  stepperState: getStepperState
})

const mapDispatchToProps = {
  dispatchDeviceType,
  dispatchStepperState
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TabbedRoot);
