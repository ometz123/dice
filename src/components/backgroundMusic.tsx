import {useRef} from 'react';
import YouTube, {YouTubePlayer} from 'react-youtube';

type Props = {
    videoId: string;
};

export const YouTubeAudioController = ({videoId}: Props) => {
    const playerRef = useRef<YouTubePlayer | null>(null);

    const handleReady = (event: { target: YouTubePlayer }) => {
        playerRef.current = event.target;
        playerRef.current.mute();
        playerRef.current.playVideo();
        playerRef.current.unMute();
    };

    return (
        <div style={{textAlign: 'center'}}>
            {/* YouTube Player with Controls */}
            <YouTube
                videoId={videoId}
                opts={{
                    height: 'auto',
                    width: 'auto',
                    playerVars: {
                        autoplay: 1,
                        controls: 1,
                        showinfo: 0,
                        modestbranding: 1,
                        rel: 0,
                    },
                }}
                onReady={handleReady}
            />
        </div>
    );
};
