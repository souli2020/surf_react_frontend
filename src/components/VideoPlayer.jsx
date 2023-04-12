import React, { useState } from 'react';
import defaultImage from '../assets/images/default-profile.jpg';

const VideoPlayer = ({ src, width, height }) => {
    const [isLoaded, setIsLoaded] = useState(false);

    return (
        <div style={{ position: 'relative', width, height }}>
            {!isLoaded && (
                <img
                    src={defaultImage}
                    alt="video placeholder"
                    style={{ position: 'absolute', top: 0, left: 0, width, height }}
                />
            )}
            <video
                src={src}
                controls
                width={width}
                height={height}
                onLoadedData={() => setIsLoaded(true)}
                style={{ display: isLoaded ? 'block' : 'none' }}
            ></video>
        </div>
    );
};
export default VideoPlayer;