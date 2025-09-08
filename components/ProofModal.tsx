import React, { useState, useEffect, useRef } from 'react';
import type { Quest } from '../data/Quests';
import type { Proof } from '../App';
import { CameraIcon, UploadIcon, LocationMarkerIcon } from './icons';

interface ProofModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (proofData: Omit<Proof, 'id' | 'userId' | 'status' | 'mediaHash' | 'questId'> & {media: File}) => void;
  quest: Quest;
}

const ProofModal: React.FC<ProofModalProps> = ({ isOpen, onClose, onSubmit, quest }) => {
  const [mediaFile, setMediaFile] = useState<File | null>(null);
  const [mediaPreview, setMediaPreview] = useState<string | null>(null);
  const [notes, setNotes] = useState('');
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [locationStatus, setLocationStatus] = useState('Acquiring location...');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isCameraOpen, setIsCameraOpen] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (isOpen) {
      // Reset state on open
      setMediaFile(null);
      setMediaPreview(null);
      setNotes('');
      setLocation(null);
      setIsSubmitting(false);
      setIsCameraOpen(false);

      setLocationStatus('Acquiring location...');
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
          setLocationStatus(`Location acquired.`);
        },
        (error) => {
          console.error("Geolocation error:", error);
          let errorMessage: string;
          switch (error.code) {
            case 1: // PERMISSION_DENIED
              errorMessage = "Permission denied. Please enable location services in your browser settings.";
              break;
            case 2: // POSITION_UNAVAILABLE
              errorMessage = "Location is currently unavailable. Please try again later.";
              break;
            case 3: // TIMEOUT
              errorMessage = "The request for your location timed out.";
              break;
            default:
              errorMessage = "An unexpected error occurred.";
              break;
          }
          setLocationStatus(`Error: ${errorMessage}`);
        },
        { enableHighAccuracy: true }
      );
    } else {
        // Cleanup camera stream when modal is closed
        if (videoRef.current?.srcObject) {
            const stream = videoRef.current.srcObject as MediaStream;
            stream.getTracks().forEach(track => track.stop());
        }
    }
  }, [isOpen]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setMediaFile(file);
      setMediaPreview(URL.createObjectURL(file));
      setIsCameraOpen(false);
    }
  };
  
  const handleCameraOpen = async () => {
    if (isCameraOpen) {
        setIsCameraOpen(false);
        if (videoRef.current?.srcObject) {
            const stream = videoRef.current.srcObject as MediaStream;
            stream.getTracks().forEach(track => track.stop());
        }
        return;
    }

    try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
        setIsCameraOpen(true);
        if (videoRef.current) {
            videoRef.current.srcObject = stream;
        }
    } catch (err) {
        console.error("Camera access denied:", err);
        alert("Camera access was denied. Please allow camera permissions in your browser settings.");
    }
  };
  
  const handleCapture = () => {
      if (!videoRef.current) return;
      const canvas = document.createElement('canvas');
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      const ctx = canvas.getContext('2d');
      ctx?.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
      canvas.toBlob((blob) => {
          if (blob) {
              const file = new File([blob], `capture-${Date.now()}.jpg`, { type: 'image/jpeg' });
              setMediaFile(file);
              setMediaPreview(URL.createObjectURL(file));
              handleCameraOpen(); // This will close the camera
          }
      }, 'image/jpeg');
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!mediaFile || !location) return;
    setIsSubmitting(true);
    try {
        await onSubmit({
            media: mediaFile,
            location,
            timestamp: new Date(),
            notes,
        });
    } catch(err) {
        console.error("Submission failed", err);
    } finally {
        setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50 animate-fade-in" onClick={onClose} role="dialog" aria-modal="true">
      <div className="bg-brand-secondary rounded-xl shadow-2xl w-full max-w-lg border border-green-800/50 max-h-[90vh] flex flex-col" onClick={e => e.stopPropagation()}>
        <header className="p-4 border-b border-green-900/50 flex justify-between items-center">
          <h2 className="text-xl font-bold font-serif text-brand-text">Submit Proof: {quest.title}</h2>
          <button onClick={onClose} className="text-brand-text-secondary hover:text-white">&times;</button>
        </header>

        <form onSubmit={handleSubmit} className="p-6 flex-grow overflow-y-auto">
          {/* Media Input */}
          <div className="mb-4">
            <label className="block text-sm font-semibold text-brand-text-secondary mb-2">Proof Media</label>
            <div className="bg-brand-primary p-4 rounded-lg border-2 border-dashed border-green-800/70 text-center">
              {mediaPreview ? (
                <div className="relative">
                  {mediaFile?.type.startsWith('video/') ? (
                    <video src={mediaPreview} controls className="max-h-60 w-full rounded-lg" />
                  ) : (
                    <img src={mediaPreview} alt="Media preview" className="max-h-60 w-full object-contain rounded-lg" />
                  )}
                  <button type="button" onClick={() => { setMediaFile(null); setMediaPreview(null); }} className="absolute top-2 right-2 bg-black/50 text-white rounded-full w-6 h-6">&times;</button>
                </div>
              ) : isCameraOpen ? (
                <div className="relative">
                    <video ref={videoRef} autoPlay playsInline className="w-full rounded-lg" />
                    <button type="button" onClick={handleCapture} className="mt-2 w-full bg-brand-accent text-brand-primary font-bold py-2 px-4 rounded-lg hover:bg-brand-accent-hover transition-colors">Capture Photo</button>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center gap-4">
                  <UploadIcon className="w-10 h-10 text-brand-text-secondary" />
                  <p className="text-brand-text-secondary">Upload a photo/video or use your camera.</p>
                  <div className="flex gap-4">
                    <button type="button" onClick={() => fileInputRef.current?.click()} className="bg-brand-accent text-brand-primary font-bold py-2 px-4 rounded-lg hover:bg-brand-accent-hover transition-colors">
                      Upload File
                    </button>
                    <button type="button" onClick={handleCameraOpen} className="bg-brand-primary border border-green-800 text-brand-text-secondary font-bold py-2 px-4 rounded-lg hover:bg-green-900/60 transition-colors">
                      <CameraIcon className="w-5 h-5 inline-block mr-2" /> Use Camera
                    </button>
                  </div>
                </div>
              )}
              <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*,video/*" className="hidden" />
            </div>
          </div>

          {/* Notes */}
          <div className="mb-4">
            <label htmlFor="notes" className="block text-sm font-semibold text-brand-text-secondary mb-2">Notes (Optional)</label>
            <textarea
              id="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full p-2 bg-brand-primary border border-green-800 rounded-lg text-brand-text-secondary focus:ring-2 focus:ring-brand-accent focus:border-brand-accent transition-colors"
              rows={3}
              placeholder="Add any relevant details..."
            />
          </div>
          
          {/* Geolocation */}
          <div className="mb-4 text-sm bg-brand-primary p-3 rounded-lg flex items-center gap-3">
             <LocationMarkerIcon className={`w-5 h-5 flex-shrink-0 ${location ? 'text-brand-accent' : 'text-yellow-400 animate-pulse'}`} />
             <span className="text-brand-text-secondary">{locationStatus}</span>
          </div>
        </form>

        <footer className="p-4 border-t border-green-900/50 bg-brand-secondary/50">
          <button
            type="submit"
            onClick={handleSubmit}
            disabled={!mediaFile || !location || isSubmitting}
            className="w-full bg-brand-accent text-brand-primary font-bold py-3 px-5 rounded-lg transition-all duration-300 hover:bg-brand-accent-hover focus:outline-none focus:ring-2 focus:ring-brand-accent focus:ring-offset-2 focus:ring-offset-brand-secondary disabled:bg-slate-600 disabled:cursor-not-allowed"
          >
            {isSubmitting ? 'Submitting...' : 'Submit Proof'}
          </button>
        </footer>
      </div>
    </div>
  );
};

export default ProofModal;
