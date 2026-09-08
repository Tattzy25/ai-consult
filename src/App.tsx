import React, { useRef } from 'react';
import { Mic, MicOff, PhoneOff } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from './lib/utils';
import { PhoneCallIcon, type PhoneCallIconHandle } from './components/ui/phone-call';
import { CameraPreview } from './components/video/CameraPreview';
import { ConnectingOverlay } from './components/ui/ConnectingOverlay';
import { WreckShader } from './components/WreckShader';
import { useGeminiLive } from './hooks/useGeminiLive';
import { SYSTEM_MESSAGE_SETTINGS } from './lib/SystemMessage';

export default function App() {
  const stageRef = useRef<HTMLDivElement>(null);
  const phoneIconRef = useRef<PhoneCallIconHandle>(null);

  const {
    isConnected,
    isMuted,
    cameraFacing,
    isAudioPlaying,
    micVolume,
    isUserTalking,
    status,
    videoRef,
    canvasRef,
    startConnection,
    disconnect,
    toggleMute,
    flipCamera,
  } = useGeminiLive(SYSTEM_MESSAGE_SETTINGS);

  React.useEffect(() => {
    if (status === "connecting") {
      phoneIconRef.current?.startAnimation();
    } else {
      phoneIconRef.current?.stopAnimation();
    }
  }, [status]);

  const visualMode: 'idle' | 'listening' | 'speaking' = isAudioPlaying
    ? 'speaking'
    : isUserTalking
      ? 'listening'
      : 'idle';

  const audioLevel = isAudioPlaying
    ? 0.85
    : isUserTalking
      ? 0.12 + (micVolume * 0.4)
      : 0.12;

  return (
    <div className="min-h-[100svh] bg-zinc-950 text-zinc-100 flex flex-col overflow-y-auto selection:bg-brand-primary/30">
      <main className="flex-1 relative flex flex-col lg:flex-row overflow-hidden h-full">
        <div
          ref={stageRef}
          className="flex-1 relative bg-black flex roast-gradient min-h-[100svh]"
        >
          {/* Orb — always behind everything */}
          <div className="absolute inset-0 pointer-events-none z-0">
            <WreckShader audioLevel={audioLevel} visualMode={visualMode} />
          </div>

          <ConnectingOverlay show={status === "connecting"} />

          {/*
            CameraPreview is ALWAYS mounted so videoRef.current is non-null
            when startStreaming runs — this lets play() succeed immediately
            when the camera permission is granted (within the gesture context).
            It's invisible until the call is live.
          */}
          <div
            className="absolute inset-0 z-10 pointer-events-none"
            style={{ opacity: isConnected ? 1 : 0, transition: 'opacity 0.3s' }}
          >
            <CameraPreview
              videoRef={videoRef}
              cameraFacing={cameraFacing}
              stageRef={stageRef}
              onFlip={flipCamera}
            />
          </div>

          {/* Phone button (pre-call) / Dock (in-call) */}
          <AnimatePresence mode="wait">
            {!isConnected ? (
              <motion.div
                key="disconnected-screen"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 pointer-events-auto flex items-center justify-center w-64 h-11 rounded-full bg-black/80 backdrop-blur-xl border border-white shadow-[0_0_20px_rgba(0,0,0,0.8),inset_0_0_10px_rgba(255,255,255,0.1)]"
              >
                <button
                  type="button"
                  onClick={() => startConnection("Aoede")}
                  disabled={status === "connecting"}
                  className={cn(
                    "relative flex items-center justify-center p-0 text-green-400",
                    "active:scale-95 transition-all duration-300 touch-manipulation",
                    status === "connecting" ? "opacity-50 cursor-not-allowed" : "hover:scale-110 hover:text-green-300"
                  )}
                  style={{ WebkitTapHighlightColor: 'transparent' }}
                >
                  <div className="flex items-center justify-center leading-none">
                    <PhoneCallIcon
                      ref={phoneIconRef}
                      className="w-8 h-8 md:w-10 md:h-10 block"
                    />
                  </div>
                </button>
              </motion.div>
            ) : (
              <motion.div
                key="connected-screen"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 pointer-events-auto flex items-center justify-center gap-8 w-64 h-11 rounded-full bg-black/80 backdrop-blur-xl border border-white shadow-[0_0_20px_rgba(0,0,0,0.8),inset_0_0_10px_rgba(255,255,255,0.1)]"
              >
                <button
                  type="button"
                  onClick={toggleMute}
                  className="flex items-center justify-center text-white/80 hover:text-white active:scale-90 transition-all touch-manipulation"
                  style={{ WebkitTapHighlightColor: 'transparent' }}
                >
                  {isMuted ? <MicOff size={22} className="text-red-400" /> : <Mic size={22} />}
                </button>

                <button
                  type="button"
                  onClick={disconnect}
                  className="flex items-center justify-center active:scale-90 transition-all touch-manipulation"
                  style={{ WebkitTapHighlightColor: 'transparent' }}
                >
                  <PhoneOff size={28} className="text-red-500" />
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      <canvas ref={canvasRef} width={1280} height={720} style={{ display: 'none' }} />
    </div>
  );
}
