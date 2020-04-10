//https://material-ui.com/components/tooltips/

import React, { useState } from "react";
import Tooltip from "@material-ui/core/Tooltip";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";

function InputText(props) {
  const [open, setOpen] = useState(false);

  const handleTooltipClose = () => {
    setOpen(false);
  };

  const handleTooltipOpen = () => {
    setOpen(true);
  };

  return (
    <div>
      <ClickAwayListener onClickAway={handleTooltipClose}>
        <div>
          <Tooltip
            PopperProps={{
              disablePortal: true
            }}
            onClose={handleTooltipClose}
            open={open}
            disableFocusListener
            disableHoverListener
            disableTouchListener
            title="I am a tool tip"
            placement="top-end"
          >
            <label onClick={handleTooltipOpen}>
              {props.name} {props.starVal}
            </label>
          </Tooltip>
        </div>
      </ClickAwayListener>
      <input id={props.name} type="text" placeholder={props.placeholder} />
    </div>
  );
}

export default InputText;
