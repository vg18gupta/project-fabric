import React from 'react';
import { fabric } from 'fabric';


function textItem(props) {
    const { canvas } = props;

    function onAdd() {
        let text = new fabric.IText(
            'Left Aligned: Lorem ipsum.'
        );
        canvas.current.add(text).setActiveObject(text);
    }

    return {
        onAdd,
    };
}

export default textItem;
