import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Play,
    Pause,
    Volume2,
    VolumeX,
    Maximize,
    Minimize,
    RotateCcw
} from 'lucide-react';

interface VideoPlayerProps {
    src: string;
    poster?: string;
    autoPlay?: boolean;
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({ src, poster, autoPlay = false }) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [progress, setProgress] = useState(0);
    const [volume, setVolume] = useState(1);
    const [isMuted, setIsMuted] = useState(false);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [duration, setDuration] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);
    const [showControls, setShowControls] = useState(true);
    const headerHideTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    useEffect(() => {
        if (autoPlay && videoRef.current) {
            videoRef.current.play().catch(() => {
                // Autoplay might be blocked
                setIsPlaying(false);
            });
        }
    }, [autoPlay]);

    const formatTime = (time: number) => {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    };

    const togglePlay = () => {
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.pause();
            } else {
                videoRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    const handleTimeUpdate = () => {
        if (videoRef.current) {
            const current = videoRef.current.currentTime;
            const dur = videoRef.current.duration;
            setCurrentTime(current);
            setDuration(dur);
            setProgress((current / dur) * 100);
        }
    };

    const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseFloat(e.target.value);
        if (videoRef.current) {
            const time = (value / 100) * videoRef.current.duration;
            videoRef.current.currentTime = time;
            setProgress(value);
        }
    };

    const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseFloat(e.target.value);
        setVolume(value);
        if (videoRef.current) {
            videoRef.current.volume = value;
            setIsMuted(value === 0);
        }
    };

    const toggleMute = () => {
        if (videoRef.current) {
            const newMuted = !isMuted;
            setIsMuted(newMuted);
            videoRef.current.muted = newMuted;
            if (newMuted) {
                setVolume(0);
            } else {
                setVolume(1);
                videoRef.current.volume = 1;
            }
        }
    };

    const toggleFullscreen = () => {
        if (!document.fullscreenElement) {
            containerRef.current?.requestFullscreen();
            setIsFullscreen(true);
        } else {
            document.exitFullscreen();
            setIsFullscreen(false);
        }
    };

    const handleMouseMove = () => {
        setShowControls(true);
        if (headerHideTimerRef.current) {
            clearTimeout(headerHideTimerRef.current);
        }
        if (isPlaying) {
            headerHideTimerRef.current = setTimeout(() => {
                setShowControls(false);
            }, 2000);
        }
    };

    const handleVideoEnd = () => {
        setIsPlaying(false);
        setShowControls(true);
    };

    return (
        <div
            ref={containerRef}
            className="relative w-full h-full bg-black group overflow-hidden rounded-lg"
            onMouseMove={handleMouseMove}
            onMouseLeave={() => isPlaying && setShowControls(false)}
        >
            <video
                ref={videoRef}
                src={src}
                poster={poster}
                className="w-full h-full object-contain"
                onTimeUpdate={handleTimeUpdate}
                onEnded={handleVideoEnd}
                onClick={togglePlay}
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
            />

            {/* Main Play Overlay */}
            <AnimatePresence>
                {!isPlaying && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.5 }}
                        className="absolute inset-0 flex items-center justify-center bg-black/30 backdrop-blur-[2px]"
                        onClick={togglePlay}
                    >
                        <button className="p-6 rounded-full bg-purple-600/90 text-white hover:bg-purple-500 hover:scale-110 transition-all shadow-lg shadow-purple-500/20 group-hover:shadow-purple-500/40 border border-white/10">
                            <Play className="w-8 h-8 fill-current translate-x-1" />
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Controls Bar */}
            <AnimatePresence>
                {showControls && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/90 via-black/60 to-transparent"
                    >
                        {/* Progress Bar */}
                        <div className="group/progress relative h-1 hover:h-2 bg-white/20 rounded-full mb-4 cursor-pointer transition-all duration-300">
                            <div
                                className="absolute left-0 top-0 bottom-0 bg-purple-500 rounded-full"
                                style={{ width: `${progress}%` }}
                            >
                                <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full opacity-0 group-hover/progress:opacity-100 shadow-lg shadow-purple-500/50 scale-0 group-hover/progress:scale-100 transition-all" />
                            </div>
                            <input
                                type="range"
                                min="0"
                                max="100"
                                value={progress}
                                onChange={handleSeek}
                                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                            />
                        </div>

                        <div className="flex items-center justify-between gap-4">
                            <div className="flex items-center gap-4">
                                <button
                                    onClick={togglePlay}
                                    className="p-2 text-white hover:text-purple-400 hover:bg-white/10 rounded-full transition-colors"
                                >
                                    {isPlaying ? (
                                        <Pause className="w-5 h-5 fill-current" />
                                    ) : (
                                        <Play className="w-5 h-5 fill-current" />
                                    )}
                                </button>

                                <div className="flex items-center gap-2 group/volume">
                                    <button
                                        onClick={toggleMute}
                                        className="p-2 text-white hover:text-purple-400 hover:bg-white/10 rounded-full transition-colors"
                                    >
                                        {isMuted ? (
                                            <VolumeX className="w-5 h-5" />
                                        ) : (
                                            <Volume2 className="w-5 h-5" />
                                        )}
                                    </button>
                                    <div className="w-0 overflow-hidden group-hover/volume:w-20 transition-all duration-300">
                                        <input
                                            type="range"
                                            min="0"
                                            max="1"
                                            step="0.1"
                                            value={isMuted ? 0 : volume}
                                            onChange={handleVolumeChange}
                                            className="w-20 h-1 bg-white/20 rounded-full appearance-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:bg-purple-400 [&::-webkit-slider-thumb]:rounded-full cursor-pointer"
                                        />
                                    </div>
                                </div>

                                <div className="text-xs font-medium text-white/70 font-mono">
                                    {formatTime(currentTime)} / {formatTime(duration)}
                                </div>
                            </div>

                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => {
                                        if (videoRef.current) {
                                            videoRef.current.currentTime = 0;
                                            videoRef.current.play();
                                        }
                                    }}
                                    className="p-2 text-white hover:text-purple-400 hover:bg-white/10 rounded-full transition-colors"
                                    title="Replay"
                                >
                                    <RotateCcw className="w-4 h-4" />
                                </button>
                                <button
                                    onClick={toggleFullscreen}
                                    className="p-2 text-white hover:text-purple-400 hover:bg-white/10 rounded-full transition-colors"
                                    title="Fullscreen"
                                >
                                    {isFullscreen ? (
                                        <Minimize className="w-5 h-5" />
                                    ) : (
                                        <Maximize className="w-5 h-5" />
                                    )}
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};
