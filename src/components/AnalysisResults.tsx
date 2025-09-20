import React from 'react';
import { AlertCircle, CheckCircle, Eye, Ruler, Zap, MapPin, Activity, TrendingUp } from 'lucide-react';

interface AnalysisResultsProps {
  image: string | null;
  analysisData: any;
  patientData: any;
}

const AnalysisResults: React.FC<AnalysisResultsProps> = ({ image, analysisData, patientData }) => {
  if (!image || !analysisData) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-8 text-center">
        <Activity className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <h2 className="text-xl font-semibold text-gray-900 mb-2">No Analysis Available</h2>
        <p className="text-gray-600">Capture an image first to see analysis results</p>
      </div>
    );
  }

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 90) return 'text-green-600 bg-green-50';
    if (confidence >= 70) return 'text-yellow-600 bg-yellow-50';
    return 'text-red-600 bg-red-50';
  };

  const getSeverityLevel = (size: number) => {
    if (size < 4) return { level: 'Small', color: 'text-green-600 bg-green-50', icon: CheckCircle };
    if (size < 7) return { level: 'Medium', color: 'text-yellow-600 bg-yellow-50', icon: AlertCircle };
    return { level: 'Large', color: 'text-red-600 bg-red-50', icon: AlertCircle };
  };

  const severity = getSeverityLevel(parseFloat(analysisData.size.length));
  const SeverityIcon = severity.icon;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Analysis Results</h2>
            <p className="text-gray-600 mt-1">
              {patientData.name && `Patient: ${patientData.name} • `}
              Analysis completed at {new Date().toLocaleTimeString()}
            </p>
          </div>
          <div className={`px-4 py-2 rounded-full ${getConfidenceColor(parseFloat(analysisData.confidence))}`}>
            <span className="font-medium">{analysisData.confidence}% Confidence</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        {/* Image Display */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Captured Image</h3>
          <div className="aspect-square bg-gray-900 rounded-lg overflow-hidden relative">
            <img
              src={image}
              alt="Analysis sample"
              className="w-full h-full object-cover"
            />
            {analysisData.detected && (
              <div className="absolute top-4 right-4">
                <div className="bg-red-600 text-white px-3 py-1 rounded-full text-sm flex items-center space-x-1">
                  <Eye className="w-4 h-4" />
                  <span>Stone Detected</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Detection Summary */}
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Detection Summary</h3>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  {analysisData.detected ? (
                    <CheckCircle className="w-6 h-6 text-green-600" />
                  ) : (
                    <AlertCircle className="w-6 h-6 text-gray-400" />
                  )}
                  <span className="font-medium">Kidney Stone</span>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  analysisData.detected ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-600'
                }`}>
                  {analysisData.detected ? 'Detected' : 'Not Detected'}
                </span>
              </div>

              {analysisData.detected && (
                <>
                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <SeverityIcon className="w-6 h-6" />
                      <span className="font-medium">Severity</span>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${severity.color}`}>
                      {severity.level}
                    </span>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <TrendingUp className="w-6 h-6 text-blue-600" />
                      <span className="font-medium">Type</span>
                    </div>
                    <span className="text-gray-700 font-medium">{analysisData.type}</span>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <MapPin className="w-6 h-6 text-purple-600" />
                      <span className="font-medium">Location</span>
                    </div>
                    <span className="text-gray-700 font-medium">{analysisData.location}</span>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Detailed Measurements */}
      {analysisData.detected && (
        <div className="grid grid-cols-3 gap-6">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center space-x-3 mb-4">
              <Ruler className="w-6 h-6 text-blue-600" />
              <h3 className="text-lg font-medium text-gray-900">Dimensions</h3>
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Length:</span>
                <span className="font-medium">{analysisData.size.length} mm</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Width:</span>
                <span className="font-medium">{analysisData.size.width} mm</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Est. Volume:</span>
                <span className="font-medium">{analysisData.size.estimated_volume} mm³</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center space-x-3 mb-4">
              <Zap className="w-6 h-6 text-yellow-600" />
              <h3 className="text-lg font-medium text-gray-900">Properties</h3>
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Density:</span>
                <span className="font-medium">{analysisData.density} HU</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Composition:</span>
                <span className="font-medium">{analysisData.type}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Shape:</span>
                <span className="font-medium">Irregular</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center space-x-3 mb-4">
              <Activity className="w-6 h-6 text-green-600" />
              <h3 className="text-lg font-medium text-gray-900">Analysis</h3>
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Confidence:</span>
                <span className="font-medium">{analysisData.confidence}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Processing:</span>
                <span className="font-medium">2.3s</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Model:</span>
                <span className="font-medium">KS-AI v3.2</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Recommendations */}
      {analysisData.detected && (
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Medical Recommendations</h3>
          
          <div className="bg-blue-50 border-l-4 border-blue-600 p-4 rounded">
            <p className="text-blue-900 font-medium mb-2">Treatment Recommendation:</p>
            <p className="text-blue-800">{analysisData.recommendation}</p>
          </div>

          <div className="grid grid-cols-2 gap-4 mt-6">
            <div className="bg-yellow-50 p-4 rounded-lg">
              <h4 className="font-medium text-yellow-900 mb-2">Immediate Actions</h4>
              <ul className="text-yellow-800 text-sm space-y-1">
                <li>• Monitor patient symptoms</li>
                <li>• Increase fluid intake</li>
                <li>• Consider pain management</li>
                <li>• Schedule follow-up imaging</li>
              </ul>
            </div>
            
            <div className="bg-green-50 p-4 rounded-lg">
              <h4 className="font-medium text-green-900 mb-2">Treatment Options</h4>
              <ul className="text-green-800 text-sm space-y-1">
                <li>• Shock wave lithotripsy (SWL)</li>
                <li>• Ureteroscopy</li>
                <li>• Conservative management</li>
                <li>• Percutaneous nephrolithotomy</li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AnalysisResults;