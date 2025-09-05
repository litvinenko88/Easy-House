import { useState, useEffect, useRef } from 'react'
import styles from './VideoReviews.module.css'

export default function VideoReviews({ showAllVideos = false, showViewAllButton = false }) {
  const [isVisible, setIsVisible] = useState(false)
  const [playingVideo, setPlayingVideo] = useState(null)
  const [isPlaying, setIsPlaying] = useState({})
  const [currentTime, setCurrentTime] = useState({})
  const [duration, setDuration] = useState({})
  const videoRefs = useRef([])
  const audioRefs = useRef([])

  const baseVideos = [
    { video: '/videos/1.mp4', audio: '/audio/1.1.mp4', title: 'Обзор дома 1' },
    { video: '/videos/2.mp4', audio: '/audio/2.1.mp4', title: 'Обзор дома 2' },
    { video: '/videos/3.mp4', audio: '/audio/3.1.mp4', title: 'Обзор дома 3' },
    { video: '/videos/4.mp4', audio: '/audio/4.1.mp4', title: 'Обзор дома 4' }
  ]

  const additionalVideos = [
    { video: '/videos/5.mp4', audio: '/audio/5.1.mp4', title: 'Обзор дома 5' },
    { video: '/videos/6.mp4', audio: '/audio/6.1.mp4', title: 'Обзор дома 6' },
    { video: '/videos/7.mp4', audio: '/audio/7.1.mp4', title: 'Обзор дома 7' },
    { video: '/videos/8.mp4', title: 'Обзор дома 8' },
    { video: '/videos/9.mp4', audio: '/audio/9.1.mp4', title: 'Обзор дома 9' },
    { video: '/videos/10.mp4', audio: '/audio/10.1.mp4', title: 'Обзор дома 10' },
    { video: '/videos/11.mp4', title: 'Обзор дома 11' },
    { video: '/videos/12.mp4', title: 'Обзор дома 12' },
    { video: '/videos/13.mp4', title: 'Обзор дома 13' },
    { video: '/videos/14.mp4', title: 'Обзор дома 14' },
    { video: '/videos/15.mp4', title: 'Обзор дома 15' },
    { video: '/videos/16.mp4', title: 'Обзор дома 16' }
  ]

  const videos = showAllVideos ? [...baseVideos, ...additionalVideos] : baseVideos

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsVisible(true)
          }
        },
        { threshold: 0.3 }
      )

      const element = document.querySelector(`.${styles.videoReviews}`)
      if (element) {
        observer.observe(element)
      }

      return () => observer.disconnect()
    }
  }, [])

  const togglePlay = (index) => {
    const video = videoRefs.current[index]
    const audio = audioRefs.current[index]
    
    if (isPlaying[index]) {
      video?.pause()
      audio?.pause()
    } else {
      Object.keys(isPlaying).forEach(key => {
        if (key !== String(index) && isPlaying[key]) {
          videoRefs.current[key]?.pause()
          audioRefs.current[key]?.pause()
        }
      })
      
      video?.play().catch(error => {
        console.error('Video playback failed:', error);
      })
      if (audio && videos[index].audio) {
        audio.currentTime = video.currentTime
        audio?.play().catch(error => {
          console.error('Audio playback failed:', error);
        })
      }
    }
  }

  const handleVideoPlay = (index) => {
    setIsPlaying(prev => ({ ...prev, [index]: true }))
    setPlayingVideo(index)
  }

  const handleVideoPause = (index) => {
    setIsPlaying(prev => ({ ...prev, [index]: false }))
    if (playingVideo === index) setPlayingVideo(null)
  }

  const handleTimeUpdate = (index) => {
    const video = videoRefs.current[index]
    if (video) {
      setCurrentTime(prev => ({ ...prev, [index]: video.currentTime }))
    }
  }

  const handleLoadedMetadata = (index) => {
    const video = videoRefs.current[index]
    if (video && video.duration) {
      setDuration(prev => ({ ...prev, [index]: video.duration }))
    }
  }

  const handleProgressClick = (index, e) => {
    const video = videoRefs.current[index]
    if (!video) return
    
    const progressBar = e.currentTarget
    const rect = progressBar.getBoundingClientRect()
    const clickX = e.clientX - rect.left
    const width = rect.width
    const videoDuration = video.duration || 0
    
    if (videoDuration > 0) {
      const newTime = Math.max(0, Math.min((clickX / width) * videoDuration, videoDuration))
      video.currentTime = newTime
      const audio = audioRefs.current[index]
      if (audio && videos[index].audio) {
        audio.currentTime = newTime
      }
      setCurrentTime(prev => ({ ...prev, [index]: newTime }))
    }
  }

  const formatTime = (time) => {
    if (!time) return '0:00'
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  return (
    <section className={styles.videoReviews} aria-labelledby="video-reviews-title">
      <div className={styles.animatedBackground}>
        <div className={styles.particle}></div>
        <div className={styles.particle}></div>
        <div className={styles.particle}></div>
        <div className={styles.particle}></div>
        <div className={styles.wave}></div>
        <div className={styles.wave}></div>
        <div className={styles.star}></div>
        <div className={styles.star}></div>
        <div className={styles.star}></div>
        <div className={styles.pulseRing}></div>
      </div>
      
      <div className="container">
        <div className={`${styles.content} ${isVisible ? styles.visible : ''}`}>
          <h2 id="video-reviews-title">
            Видеообзоры наших домов
          </h2>
          
          <p className={styles.description}>
            Убедитесь в качестве и продуманности каждой детали
          </p>
          
          <div className={styles.videoGrid}>
            {videos.map((item, index) => (
              <div key={index} className={styles.videoItem}>
                <div className={styles.videoContainer}>
                  <video
                    ref={el => videoRefs.current[index] = el}
                    src={item.video}
                    muted
                    preload="metadata"
                    onPlay={() => handleVideoPlay(index)}
                    onPause={() => handleVideoPause(index)}
                    onTimeUpdate={() => handleTimeUpdate(index)}
                    onLoadedMetadata={() => handleLoadedMetadata(index)}
                    className={styles.video}
                    aria-label={`Видеообзор модульного дома ${index + 1}`}
                    title={item.title}
                  />
                  {item.audio && (
                    <audio
                      ref={el => audioRefs.current[index] = el}
                      src={item.audio}
                      preload="metadata"
                    />
                  )}
                  
                  {!isPlaying[index] && (
                    <div className={styles.centerPlayButton}>
                      <button 
                        className={styles.centerPlay}
                        onClick={() => togglePlay(index)}
                      >
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                          <polygon points="8,5 19,12 8,19" fill="currentColor"/>
                        </svg>
                      </button>
                    </div>
                  )}
                  
                  <div className={styles.customControls}>
                    <button 
                      className={styles.playButton}
                      onClick={() => togglePlay(index)}
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                        {isPlaying[index] ? (
                          <>
                            <rect x="6" y="4" width="4" height="16" fill="currentColor"/>
                            <rect x="14" y="4" width="4" height="16" fill="currentColor"/>
                          </>
                        ) : (
                          <polygon points="5,3 19,12 5,21" fill="currentColor"/>
                        )}
                      </svg>
                    </button>
                    
                    <div className={styles.progressContainer}>
                      <div 
                        className={styles.progressTrack}
                        onClick={(e) => handleProgressClick(index, e)}
                      >
                        <div 
                          className={styles.progressFill}
                          style={{ 
                            width: `${(() => {
                              const video = videoRefs.current[index];
                              return video?.duration ? ((currentTime[index] || 0) / video.duration) * 100 : 0;
                            })()}%` 
                          }}
                        />
                        <div 
                          className={styles.progressThumb}
                          style={{ 
                            left: `${(() => {
                              const video = videoRefs.current[index];
                              return video?.duration ? ((currentTime[index] || 0) / video.duration) * 100 : 0;
                            })()}%` 
                          }}
                        />
                      </div>
                    </div>
                    
                    <div className={styles.timeDisplay}>
                      {formatTime(currentTime[index])} / {formatTime(videoRefs.current[index]?.duration)}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {showViewAllButton && (
            <div className={styles.buttonContainer}>
              <a href="/otzyvy" className={styles.viewAllButton}>
                Смотреть все обзоры
              </a>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}