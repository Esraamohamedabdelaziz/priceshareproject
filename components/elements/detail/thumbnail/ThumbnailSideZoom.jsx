import React, { useEffect, useState } from 'react';

const ThumbnailSideZoom = ({ image }) => {
    console.log(image, 'imagedds');
    const [previewBackgroundSize, setPreviewBackgroundSize] = useState('');
    const [previewBackgroundImage, setPreviewBackgroundImage] = useState('');
    const [previewBackgroundPosition, setPreviewBackgroundPosition] =
        useState('');

    return (
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
            }}
        >
            <div class="main" style={{ display: 'flex' }}>
                <img
                    style={{ cursor: 'zoom-in' }}
                    src={image}
                    id="gfg-img"
                    height="100%"
                    width="100%"
                    onMouseOut={(e) => {
                        setPreviewBackgroundImage('none');
                    }}
                    onMouseMove={(e) => {
                        var preview = document.querySelector('.zoom-preview');
                        var x = preview.offsetWidth / 100;
                        var y = preview.offsetHeight / 100;
                        var posX = e.nativeEvent.offsetX;
                        var posY = e.nativeEvent.offsetY;
                        var img = document.getElementById('gfg-img');
                        setPreviewBackgroundImage(`url(${image})`);
                        setPreviewBackgroundSize(
                            img.width * x + 'px ' + img.height * y + 'px'
                        );
                        setPreviewBackgroundPosition(
                            '-' + posX * x + 'px -' + posY * y + 'px'
                        );
                    }}
                />
                <div
                    style={{
                        height: '100%',
                        // position: "absolute",
                        // width: "100%",
                        // border: "1px solid #000",
                        // marginLeft: "20px",
                        // backgroundRepeat: "no-repeat", backgroundImage: previewBackgroundImage, backgroundSize: previewBackgroundSize,backgroundPosition: previewBackgroundPosition
                    }}
                    class="zoom-preview"
                ></div>
            </div>
        </div>
    );
};

export default ThumbnailSideZoom;
