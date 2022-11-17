import React, { Component } from "react";
import PropTypes from "prop-types";
import { Button, Switch, Tooltip } from "antd";

import CommonButton from "../../components/common/CommonButton";
import { code } from "../../canvas/constants";

class ImageMapFooterToolbar extends Component {
  static propTypes = {
    canvasRef: PropTypes.any,
    preview: PropTypes.bool,
    onChangePreview: PropTypes.func,
    zoomRatio: PropTypes.number,
  };

  state = {
    interactionMode: "selection",
  };

  componentDidMount() {
    const { canvasRef } = this.props;
    this.waitForCanvasRender(canvasRef);
  }

  componentWillUnmount() {
    const { canvasRef } = this.props;
    this.detachEventListener(canvasRef);
  }

  waitForCanvasRender = (canvas) => {
    setTimeout(() => {
      if (canvas) {
        this.attachEventListener(canvas);
        return;
      }
      const { canvasRef } = this.props;
      this.waitForCanvasRender(canvasRef);
    }, 5);
  };

  attachEventListener = (canvasRef) => {
    canvasRef.canvas.wrapperEl.addEventListener(
      "keydown",
      this.events.keydown,
      false
    );
  };

  detachEventListener = (canvasRef) => {
    canvasRef.canvas.wrapperEl.removeEventListener(
      "keydown",
      this.events.keydown
    );
  };

  /* eslint-disable react/sort-comp, react/prop-types */
  handlers = {
    selection: () => {
      if (this.props.canvasRef.handler.interactionHandler.isDrawingMode()) {
        return;
      }
      this.forceUpdate();
      this.props.canvasRef.handler.interactionHandler.selection();
      this.setState({ interactionMode: "selection" });
    },
    grab: () => {
      if (this.props.canvasRef.handler.interactionHandler.isDrawingMode()) {
        return;
      }
      this.forceUpdate();
      this.props.canvasRef.handler.interactionHandler.grab();
      this.setState({ interactionMode: "grab" });
    },
  };

  events = {
    keydown: (e) => {
      if (this.props.canvasRef.canvas.wrapperEl !== document.activeElement) {
        return false;
      }
      if (e.code === code.KEY_Q) {
        this.handlers.selection();
      } else if (e.code === code.KEY_W) {
        this.handlers.grab();
      }
    },
  };

  render() {
    const { canvasRef, preview, zoomRatio, onChangePreview } = this.props;
    const { interactionMode } = this.state;
    const { selection, grab } = this.handlers;
    if (!canvasRef) {
      return null;
    }
    const zoomValue = parseInt((zoomRatio * 100).toFixed(2), 10);
    return (
      <React.Fragment>
        <div className="rde-editor-footer-toolbar-interaction">
          <Button.Group>
            <CommonButton
              type={interactionMode === "selection" ? "primary" : "default"}
              style={{
                borderBottomLeftRadius: "8px",
                borderTopLeftRadius: "8px",
              }}
              onClick={() => {
                selection();
              }}
              icon="mouse-pointer"
              tooltipTitle="Selection mode(Q)"
            />
            <CommonButton
              type={interactionMode === "grab" ? "primary" : "default"}
              style={{
                borderBottomRightRadius: "8px",
                borderTopRightRadius: "8px",
              }}
              onClick={() => {
                grab();
              }}
              tooltipTitle="Grab mode(W or Alt + Drag)"
              icon="hand-rock"
            />
          </Button.Group>
        </div>
        <div className="rde-editor-footer-toolbar-zoom">
          <Button.Group>
            <CommonButton
              style={{
                borderBottomLeftRadius: "8px",
                borderTopLeftRadius: "8px",
              }}
              onClick={() => {
                canvasRef.handler.zoomHandler.zoomOut();
              }}
              icon="search-minus"
              tooltipTitle="Zoom out"
            />
            <CommonButton
              onClick={() => {
                canvasRef.handler.zoomHandler.zoomOneToOne();
              }}
              tooltipTitle="1:1"
            >
              {`${zoomValue}%`}
            </CommonButton>
            <CommonButton
              onClick={() => {
                canvasRef.handler.zoomHandler.zoomToFit();
              }}
              tooltipTitle="Scale to fit"
              icon="expand"
            />
            <CommonButton
              style={{
                borderBottomRightRadius: "8px",
                borderTopRightRadius: "8px",
              }}
              onClick={() => {
                canvasRef.handler.zoomHandler.zoomIn();
              }}
              icon="search-plus"
              tooltipTitle="Zoom in"
            />
          </Button.Group>
        </div>
        <div className="rde-editor-footer-toolbar-preview">
          <Tooltip title="Preview">
            <Switch checked={preview} onChange={onChangePreview} />
          </Tooltip>
        </div>
      </React.Fragment>
    );
  }
}

export default ImageMapFooterToolbar;
