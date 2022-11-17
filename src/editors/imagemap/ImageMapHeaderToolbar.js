import React, { Component } from "react";
import PropTypes from "prop-types";

import { Flex } from "../../components/flex";
import ImageMapList from "./ImageMapList";
import { CommonButton } from "../../components/common";
import Icon from "../../components/icon/Icon";

class ImageMapHeaderToolbar extends Component {
  static propTypes = {
    canvasRef: PropTypes.any,
    selectedItem: PropTypes.object,
  };

  render() {
    const { canvasRef, selectedItem } = this.props;
    const isCropping = canvasRef
      ? canvasRef.handler?.interactionMode === "crop"
      : false;
    return (
      <Flex className="rde-editor-header-toolbar-container" flex="1">
        <Flex.Item className="rde-canvas-toolbar rde-canvas-toolbar-list">
          <CommonButton
            className="rde-action-btn"
            shape="circle"
            icon="layer-group"
            tooltipTitle="Canvas list"
          />
          <div className="rde-canvas-list">
            <ImageMapList canvasRef={canvasRef} selectedItem={selectedItem} />
          </div>
        </Flex.Item>
        <Flex.Item className="rde-canvas-toolbar rde-canvas-toolbar-alignment">
          <CommonButton
            className="rde-action-btn"
            shape="circle"
            disabled={isCropping}
            onClick={() => canvasRef.handler?.bringForward()}
            icon="angle-up"
            tooltipTitle="Bring forward"
          />
          <CommonButton
            className="rde-action-btn"
            shape="circle"
            disabled={isCropping}
            onClick={() => canvasRef.handler?.sendBackwards()}
            icon="angle-down"
            tooltipTitle="Send backwards"
          />
          <CommonButton
            className="rde-action-btn"
            shape="circle"
            disabled={isCropping}
            onClick={() => canvasRef.handler?.bringToFront()}
            icon="angle-double-up"
            tooltipTitle="Bring to front"
          />
          <CommonButton
            className="rde-action-btn"
            shape="circle"
            disabled={isCropping}
            onClick={() => canvasRef.handler?.sendToBack()}
            icon="angle-double-down"
            tooltipTitle="Send to back"
          />
        </Flex.Item>
        <Flex.Item className="rde-canvas-toolbar rde-canvas-toolbar-alignment">
          <CommonButton
            className="rde-action-btn"
            shape="circle"
            disabled={isCropping}
            onClick={() => canvasRef.handler?.alignmentHandler.left()}
            icon="align-left"
            tooltipTitle="Align left"
          />
          <CommonButton
            className="rde-action-btn"
            shape="circle"
            disabled={isCropping}
            onClick={() => canvasRef.handler?.alignmentHandler.center()}
            icon="align-center"
            tooltipTitle="Align center"
          />
          <CommonButton
            className="rde-action-btn"
            shape="circle"
            disabled={isCropping}
            onClick={() => canvasRef.handler?.alignmentHandler.right()}
            icon="align-right"
            tooltipTitle="Align right"
          />
        </Flex.Item>
        <Flex.Item className="rde-canvas-toolbar rde-canvas-toolbar-group">
          <CommonButton
            className="rde-action-btn"
            shape="circle"
            disabled={isCropping}
            onClick={() => canvasRef.handler?.toGroup()}
            icon="object-group"
            tooltipTitle="Group"
          />
          <CommonButton
            className="rde-action-btn"
            shape="circle"
            disabled={isCropping}
            onClick={() => canvasRef.handler?.toActiveSelection()}
            icon="object-ungroup"
            tooltipTitle="Ungroup"
          />
        </Flex.Item>
        <Flex.Item className="rde-canvas-toolbar rde-canvas-toolbar-crop">
          <CommonButton
            className="rde-action-btn"
            shape="circle"
            disabled={
              canvasRef ? !canvasRef.handler?.cropHandler.validType() : true
            }
            onClick={() => canvasRef.handler?.cropHandler.start()}
            icon="crop"
            tooltipTitle="Crop image"
          />
          <CommonButton
            className="rde-action-btn"
            shape="circle"
            disabled={
              canvasRef ? !canvasRef.handler?.cropHandler.cropRect : true
            }
            onClick={() => canvasRef.handler?.cropHandler.finish()}
            icon="check"
            tooltipTitle="Save crop image"
          />
          <CommonButton
            className="rde-action-btn"
            shape="circle"
            disabled={
              canvasRef ? !canvasRef.handler?.cropHandler.cropRect : true
            }
            onClick={() => canvasRef.handler?.cropHandler.cancel()}
            icon="times"
            tooltipTitle="Cancel crop image"
          />
        </Flex.Item>
        <Flex.Item className="rde-canvas-toolbar rde-canvas-toolbar-operation">
          <CommonButton
            className="rde-action-btn"
            shape="circle"
            disabled={isCropping}
            onClick={() => canvasRef.handler?.saveImage()}
            icon="image"
            tooltipTitle="Save Image"
          />
          <CommonButton
            className="rde-action-btn"
            shape="circle"
            disabled={isCropping}
            onClick={() => canvasRef.handler?.duplicate()}
            icon="clone"
            tooltipTitle="Clone"
          />
          <CommonButton
            className="rde-action-btn"
            shape="circle"
            disabled={isCropping}
            onClick={() => canvasRef.handler?.remove()}
            icon="trash"
            tooltipTitle="All delete"
          />
        </Flex.Item>
        <Flex.Item className="rde-canvas-toolbar rde-canvas-toolbar-history">
          <CommonButton
            className="rde-action-btn"
            disabled={
              isCropping ||
              (canvasRef && !canvasRef.handler?.transactionHandler.undos.length)
            }
            onClick={() => canvasRef.handler?.transactionHandler.undo()}
          >
            <Icon name="undo-alt" style={{ marginRight: 8 }} />
            Undo
          </CommonButton>
          <CommonButton
            className="rde-action-btn"
            disabled={
              isCropping ||
              (canvasRef && !canvasRef.handler?.transactionHandler.redos.length)
            }
            onClick={() => canvasRef.handler?.transactionHandler.redo()}
          >
            Redo
            <Icon name="redo-alt" style={{ marginLeft: 8 }} />
          </CommonButton>
        </Flex.Item>
      </Flex>
    );
  }
}

export default ImageMapHeaderToolbar;
