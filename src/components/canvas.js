import React from 'react';
import { fabric } from 'fabric';

const useFabric = (canvas) => {
    const fabricRef = React.useCallback((element) => {
        if (!element) return canvas.current?.dispose();

        canvas.current = new fabric.Canvas(element, {backgroundColor: '#eee'});
        canvas.current.add(new fabric.Rect(
            {top: 100, left: 100, width: 100, height: 100, fill: 'red'}
        ));
    }, []);
    return fabricRef;
};

function Canvas(props) {
    const { canvas } = props;
    const fabricRef = useFabric(canvas);
    return (
        <canvas ref={fabricRef} width={640} height={360} />
    );
}

export default Canvas;
