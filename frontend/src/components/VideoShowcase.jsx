import React, { useState, useEffect, useRef } from 'react';
import api from '../lib/axios';

const VideoCard = ({ video, onOpenModal }) => {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleMouseEnter = () => {
    if (videoRef.current) {
      videoRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(err => console.log('Autoplay blocked:', err.message));
    }
  };

  const handleMouseLeave = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
      setIsPlaying(false);
    }
  };

  return (
    <div
      onClick={() => onOpenModal(video)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="group relative w-[180px] xs:w-[200px] sm:w-[220px] aspect-[9/16] rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] flex-shrink-0 bg-black cursor-pointer"
    >
      {/* Video element */}
      <video
        ref={videoRef}
        src={video.video_url}
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-300"
      />

      {/* Play Icon Overlay (shows when not playing) */}
      {!isPlaying && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/10 z-10">
          <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white border border-white/40 shadow-lg transform group-hover:scale-110 transition-transform duration-300">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="ml-0.5">
              <polygon points="5 3 19 12 5 21" />
            </svg>
          </div>
        </div>
      )}

      {/* Title/Label Overlay */}
      {video.title && (
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-10">
          <span className="font-sans text-[11px] sm:text-xs font-semibold text-white tracking-wide block truncate">
            {video.title}
          </span>
        </div>
      )}
    </div>
  );
};

const VideoShowcase = () => {
  const [videos, setVideos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const modalVideoRef = useRef(null);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const response = await api.get('/videos');
        if (response.data?.success) {
          setVideos(response.data.data.videos);
        }
      } catch (error) {
        console.error('Failed to fetch showcase videos:', error.message);
      } finally {
        setIsLoading(false);
      }
    };
    fetchVideos();
  }, []);

  if (isLoading) {
    return (
      <section className="bg-white py-12 px-6">
        <div className="max-w-[1400px] mx-auto flex gap-6 overflow-hidden">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="w-[180px] xs:w-[200px] sm:w-[220px] aspect-[9/16] rounded-2xl bg-gray-100 animate-pulse flex-shrink-0" />
          ))}
        </div>
      </section>
    );
  }

  if (videos.length === 0) return null;

  return (
    <section className="bg-white py-12 px-6 overflow-hidden">
      <div className="max-w-[1400px] mx-auto">
        
        {/* Horizontal Scrolling Video Container */}
        <div className="flex gap-5 sm:gap-6 overflow-x-auto pb-6 scrollbar-hide px-2 snap-x">
          {videos.map((video) => (
            <div key={video.id} className="snap-start">
              <VideoCard video={video} onOpenModal={(v) => setSelectedVideo(v)} />
            </div>
          ))}
        </div>

      </div>

      {/* ━━━ VIDEO MODAL OVERLAY ━━━ */}
      {selectedVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-md">
          {/* Close button */}
          <button
            onClick={() => setSelectedVideo(null)}
            className="absolute top-4 right-4 z-55 text-white hover:text-[#C8A24A] bg-white/10 hover:bg-white/20 p-2.5 rounded-full transition-all cursor-pointer"
            aria-label="Close video player"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>

          {/* Modal Content */}
          <div className="relative w-full max-w-[360px] sm:max-w-[420px] aspect-[9/16] rounded-2xl overflow-hidden shadow-2xl bg-black border border-white/10">
            <video
              ref={modalVideoRef}
              src={selectedVideo.video_url}
              controls
              autoPlay
              playsInline
              className="w-full h-full object-cover"
            />
            {selectedVideo.title && (
              <div className="absolute top-4 left-4 z-10 bg-black/50 backdrop-blur-sm px-3 py-1.5 rounded-lg text-white font-sans text-xs sm:text-sm font-semibold tracking-wide border border-white/5">
                {selectedVideo.title}
              </div>
            )}
          </div>
        </div>
      )}

    </section>
  );
};

export default VideoShowcase;
