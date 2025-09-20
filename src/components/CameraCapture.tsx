import React, { useRef, useState, useCallback } from 'react';
import { Camera, Upload, RefreshCw, Check } from 'lucide-react';

interface CameraCaptureProps {
  onImageCapture: (imageData: string) => void;
}

const CameraCapture: React.FC<CameraCaptureProps> = ({ onImageCapture }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isStreaming, setIsStreaming] = useState(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const startCamera = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: 1920 },
          height: { ideal: 1080 },
          facingMode: 'environment'
        }
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
        setIsStreaming(true);
      }
    } catch (error) {
      console.error('Error accessing camera:', error);
      alert('Unable to access camera. Please check permissions.');
    }
  }, []);

  const stopCamera = useCallback(() => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
      videoRef.current.srcObject = null;
      setIsStreaming(false);
    }
  }, []);

  const captureImage = useCallback(() => {
    if (videoRef.current && canvasRef.current) {
      const canvas = canvasRef.current;
      const video = videoRef.current;
      
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(video, 0, 0);
        const imageData = canvas.toDataURL('image/jpeg', 0.9);
        setCapturedImage(imageData);
        stopCamera();
      }
    }
  }, [stopCamera]);

  const processImage = useCallback(() => {
    if (capturedImage) {
      setIsProcessing(true);
      // Simulate processing delay
      setTimeout(() => {
        onImageCapture(capturedImage);
        setIsProcessing(false);
      }, 1000);
    }
  }, [capturedImage, onImageCapture]);

  const handleFileUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageData = e.target?.result as string;
        setCapturedImage(imageData);
      };
      reader.readAsDataURL(file);
    }
  }, []);

  const retakeImage = useCallback(() => {
    setCapturedImage(null);
    startCamera();
  }, [startCamera]);

  return (
    <div className="bg-white rounded-lg shadow-sm">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-900">Image Capture</h2>
        <p className="text-gray-600 mt-1">Capture or upload kidney stone images for analysis</p>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-2 gap-6">
          {/* Camera/Image Display */}
          <div className="space-y-4">
            <div className="aspect-video bg-gray-900 rounded-lg overflow-hidden relative">
              {!capturedImage ? (
                <video
                  ref={videoRef}
                  className="w-full h-full object-cover"
                  autoPlay
                  playsInline
                  muted
                />
              ) : (
                <img
                  src={capturedImage}
                  alt="Captured"
                  className="w-full h-full object-cover"
                />
              )}
              
              {!isStreaming && !capturedImage && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-white">
                    <Camera className="w-16 h-16 mx-auto mb-4 opacity-50" />
                    <p className="text-lg">Camera Preview</p>
                    <p className="text-sm opacity-75">Start camera to begin</p>
                  </div>
                </div>
              )}

              {isStreaming && (
                <div className="absolute top-4 right-4">
                  <div className="bg-red-600 text-white px-2 py-1 rounded-full text-xs flex items-center space-x-1">
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                    <span>LIVE</span>
                  </div>
                </div>
              )}
            </div>

            <canvas ref={canvasRef} className="hidden" />

            {/* Camera Controls */}
            <div className="flex justify-center space-x-4">
              {!isStreaming && !capturedImage && (
                <>
                  <button
                    onClick={startCamera}
                    className="flex items-center space-x-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <Camera className="w-5 h-5" />
                    <span>Start Camera</span>
                  </button>

                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="flex items-center space-x-2 px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                  >
                    <Upload className="w-5 h-5" />
                    <span>Upload Image</span>
                  </button>
                </>
              )}

              {isStreaming && (
                <>
                  <button
                    onClick={captureImage}
                    className="flex items-center space-x-2 px-8 py-4 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-lg font-medium"
                  >
                    <Camera className="w-6 h-6" />
                    <span>Capture</span>
                  </button>

                  <button
                    onClick={stopCamera}
                    className="flex items-center space-x-2 px-6 py-4 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                  >
                    <span>Stop</span>
                  </button>
                </>
              )}

              {capturedImage && (
                <>
                  <button
                    onClick={processImage}
                    disabled={isProcessing}
                    className="flex items-center space-x-2 px-8 py-4 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isProcessing ? (
                      <>
                        <RefreshCw className="w-6 h-6 animate-spin" />
                        <span>Processing...</span>
                      </>
                    ) : (
                      <>
                        <Check className="w-6 h-6" />
                        <span>Analyze Image</span>
                      </>
                    )}
                  </button>

                  <button
                    onClick={retakeImage}
                    className="flex items-center space-x-2 px-6 py-4 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                  >
                    <RefreshCw className="w-5 h-5" />
                    <span>Retake</span>
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Instructions & Guidelines */}
          <div className="space-y-6">
            <div className="bg-blue-50 rounded-lg p-6">
              <h3 className="text-lg font-medium text-blue-900 mb-3">Capture Guidelines</h3>
              <ul className="space-y-2 text-blue-800">
                <li className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Ensure adequate lighting for clear visibility</span>
                </li>
                <li className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Hold camera steady to avoid motion blur</span>
                </li>
                <li className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Position stone in center of frame</span>
                </li>
                <li className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Include ruler or reference object for scale</span>
                </li>
                <li className="flex items-start space-x-2">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Capture multiple angles if possible</span>
                </li>
              </ul>
            </div>

            <div className="bg-yellow-50 rounded-lg p-6">
              <h3 className="text-lg font-medium text-yellow-900 mb-3">Image Quality Tips</h3>
              <ul className="space-y-2 text-yellow-800">
                <li>• Use high resolution (1920x1080 minimum)</li>
                <li>• Avoid shadows and reflections</li>
                <li>• Clean the specimen surface</li>
                <li>• Use contrasting background</li>
                <li>• Focus should be sharp and clear</li>
              </ul>
            </div>

            <div className="bg-green-50 rounded-lg p-6">
              <h3 className="text-lg font-medium text-green-900 mb-3">Supported Formats</h3>
              <div className="text-green-800">
                <p className="mb-2"><strong>Camera:</strong> Real-time capture</p>
                <p className="mb-2"><strong>Upload:</strong> JPG, PNG, WEBP</p>
                <p><strong>Max Size:</strong> 10MB per image</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CameraCapture;