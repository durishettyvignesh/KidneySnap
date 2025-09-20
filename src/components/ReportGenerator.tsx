import React, { useState } from 'react';
import { FileText, Download, Send, Printer, Calendar, User, Activity, Ruler } from 'lucide-react';

interface ReportGeneratorProps {
  image: string | null;
  analysisData: any;
  patientData: any;
}

const ReportGenerator: React.FC<ReportGeneratorProps> = ({ image, analysisData, patientData }) => {
  const [reportType, setReportType] = useState('detailed');
  const [includeImage, setIncludeImage] = useState(true);
  const [additionalNotes, setAdditionalNotes] = useState('');

  const generateReportContent = () => {
    const currentDate = new Date().toLocaleDateString();
    const currentTime = new Date().toLocaleTimeString();
    
    return {
      header: {
        title: 'Kidney Stone Analysis Report',
        date: currentDate,
        time: currentTime,
        reportId: `KS-${Date.now().toString().slice(-6)}`
      },
      patient: {
        name: patientData.name || 'Patient Name',
        age: patientData.age || 'N/A',
        gender: patientData.gender || 'N/A',
        patientId: patientData.patientId || 'N/A',
        phone: patientData.phone || 'N/A',
        analysisDate: patientData.date || currentDate
      },
      analysis: analysisData ? {
        detected: analysisData.detected,
        confidence: analysisData.confidence,
        stoneType: analysisData.type,
        location: analysisData.location,
        size: analysisData.size,
        density: analysisData.density,
        recommendation: analysisData.recommendation
      } : null,
      symptoms: patientData.symptoms || [],
      painScale: patientData.painScale || 0,
      medicalHistory: patientData.medicalHistory || '',
      additionalNotes
    };
  };

  const reportData = generateReportContent();

  const handleDownloadPDF = () => {
    // In a real application, this would generate a proper PDF
    alert('PDF download functionality would be implemented here using libraries like jsPDF or similar');
  };

  const handlePrint = () => {
    window.print();
  };

  const handleEmailReport = () => {
    alert('Email functionality would be implemented here with backend support');
  };

  if (!analysisData) {
    return (
      <div className="bg-white rounded-lg shadow-sm p-8 text-center">
        <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <h2 className="text-xl font-semibold text-gray-900 mb-2">No Analysis Data</h2>
        <p className="text-gray-600">Complete an analysis first to generate reports</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Report Configuration */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Report Configuration</h2>
        
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Report Type</label>
            <select
              value={reportType}
              onChange={(e) => setReportType(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="detailed">Detailed Analysis Report</option>
              <option value="summary">Summary Report</option>
              <option value="referral">Referral Letter</option>
            </select>
          </div>

          <div className="flex items-center space-x-4">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={includeImage}
                onChange={(e) => setIncludeImage(e.target.checked)}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700">Include captured image</span>
            </label>
          </div>
        </div>

        <div className="mt-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Additional Notes</label>
          <textarea
            value={additionalNotes}
            onChange={(e) => setAdditionalNotes(e.target.value)}
            rows={3}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Add any additional observations or notes..."
          />
        </div>

        <div className="mt-6 flex justify-end space-x-4">
          <button
            onClick={handlePrint}
            className="flex items-center space-x-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Printer className="w-4 h-4" />
            <span>Print</span>
          </button>
          
          <button
            onClick={handleEmailReport}
            className="flex items-center space-x-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Send className="w-4 h-4" />
            <span>Email</span>
          </button>
          
          <button
            onClick={handleDownloadPDF}
            className="flex items-center space-x-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Download className="w-4 h-4" />
            <span>Download PDF</span>
          </button>
        </div>
      </div>

      {/* Report Preview */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden print:shadow-none print:rounded-none">
        <div className="p-8 print:p-4" style={{ fontFamily: 'serif' }}>
          {/* Report Header */}
          <div className="border-b-2 border-blue-600 pb-6 mb-6">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-2xl font-bold text-gray-900 mb-2">{reportData.header.title}</h1>
                <div className="text-sm text-gray-600">
                  <p>Report ID: {reportData.header.reportId}</p>
                  <p>Generated: {reportData.header.date} at {reportData.header.time}</p>
                </div>
              </div>
              
              <div className="text-right">
                <div className="text-lg font-semibold text-blue-600">KidneyStone AI</div>
                <div className="text-sm text-gray-600">Medical Analysis Platform</div>
              </div>
            </div>
          </div>

          {/* Patient Information */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <User className="w-5 h-5 mr-2 text-blue-600" />
              Patient Information
            </h2>
            
            <div className="grid grid-cols-2 gap-6 bg-gray-50 p-4 rounded-lg">
              <div className="space-y-2">
                <div><strong>Name:</strong> {reportData.patient.name}</div>
                <div><strong>Patient ID:</strong> {reportData.patient.patientId}</div>
                <div><strong>Age:</strong> {reportData.patient.age}</div>
              </div>
              
              <div className="space-y-2">
                <div><strong>Gender:</strong> {reportData.patient.gender}</div>
                <div><strong>Phone:</strong> {reportData.patient.phone}</div>
                <div><strong>Analysis Date:</strong> {reportData.patient.analysisDate}</div>
              </div>
            </div>
          </div>

          {/* Analysis Results */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
              <Activity className="w-5 h-5 mr-2 text-green-600" />
              Analysis Results
            </h2>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="font-medium text-blue-900 mb-2">Detection Status</h3>
                  <div className="text-2xl font-bold text-blue-600">
                    {reportData.analysis.detected ? 'POSITIVE' : 'NEGATIVE'}
                  </div>
                  <div className="text-sm text-blue-800">
                    Confidence: {reportData.analysis.confidence}%
                  </div>
                </div>

                {reportData.analysis.detected && (
                  <div className="bg-orange-50 p-4 rounded-lg">
                    <h3 className="font-medium text-orange-900 mb-2">Stone Type</h3>
                    <div className="text-lg font-semibold text-orange-600">
                      {reportData.analysis.stoneType}
                    </div>
                    <div className="text-sm text-orange-800">
                      Location: {reportData.analysis.location}
                    </div>
                  </div>
                )}
              </div>

              {reportData.analysis.detected && (
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-medium text-gray-900 mb-3 flex items-center">
                    <Ruler className="w-4 h-4 mr-2" />
                    Measurements
                  </h3>
                  
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <div className="text-gray-600">Length</div>
                      <div className="font-medium">{reportData.analysis.size.length} mm</div>
                    </div>
                    <div>
                      <div className="text-gray-600">Width</div>
                      <div className="font-medium">{reportData.analysis.size.width} mm</div>
                    </div>
                    <div>
                      <div className="text-gray-600">Est. Volume</div>
                      <div className="font-medium">{reportData.analysis.size.estimated_volume} mm³</div>
                    </div>
                    <div>
                      <div className="text-gray-600">Density</div>
                      <div className="font-medium">{reportData.analysis.density} HU</div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Clinical Information */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Clinical Information</h2>
            
            <div className="space-y-4">
              {reportData.symptoms.length > 0 && (
                <div>
                  <h3 className="font-medium text-gray-900 mb-2">Presenting Symptoms</h3>
                  <div className="bg-red-50 p-3 rounded border-l-4 border-red-400">
                    {reportData.symptoms.join(', ')}
                  </div>
                </div>
              )}

              {reportData.painScale > 0 && (
                <div>
                  <h3 className="font-medium text-gray-900 mb-2">Pain Scale</h3>
                  <div className="bg-yellow-50 p-3 rounded">
                    <strong>{reportData.painScale}/10</strong> - 
                    {reportData.painScale <= 3 && ' Mild pain'}
                    {reportData.painScale > 3 && reportData.painScale <= 7 && ' Moderate pain'}
                    {reportData.painScale > 7 && ' Severe pain'}
                  </div>
                </div>
              )}

              {reportData.medicalHistory && (
                <div>
                  <h3 className="font-medium text-gray-900 mb-2">Medical History</h3>
                  <div className="bg-gray-50 p-3 rounded">
                    {reportData.medicalHistory}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Image Section */}
          {includeImage && image && (
            <div className="mb-8">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Captured Image</h2>
              <div className="border rounded-lg p-4 text-center">
                <img
                  src={image}
                  alt="Kidney stone analysis"
                  className="max-w-full h-64 object-contain mx-auto rounded"
                />
                <p className="text-sm text-gray-600 mt-2">Original captured image used for analysis</p>
              </div>
            </div>
          )}

          {/* Recommendations */}
          {reportData.analysis.detected && (
            <div className="mb-8">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Medical Recommendations</h2>
              <div className="bg-green-50 border-l-4 border-green-400 p-4 rounded">
                <p className="text-green-900">{reportData.analysis.recommendation}</p>
              </div>
            </div>
          )}

          {/* Additional Notes */}
          {additionalNotes && (
            <div className="mb-8">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Additional Notes</h2>
              <div className="bg-blue-50 p-4 rounded border-l-4 border-blue-400">
                <p className="text-blue-900">{additionalNotes}</p>
              </div>
            </div>
          )}

          {/* Footer */}
          <div className="border-t pt-6 mt-8 text-sm text-gray-600">
            <div className="flex justify-between">
              <div>
                <p><strong>Generated by:</strong> KidneyStone AI Companion v2.1</p>
                <p><strong>Analysis Model:</strong> KS-AI Deep Learning v3.2</p>
              </div>
              
              <div className="text-right">
                <p><strong>Reviewed by:</strong> Dr. ________________</p>
                <p><strong>Date:</strong> ________________</p>
                <p><strong>Signature:</strong> ________________</p>
              </div>
            </div>
            
            <div className="mt-4 pt-4 border-t text-center">
              <p className="text-xs">
                This report is generated by AI assistance and should be reviewed by a qualified medical professional.
                Results should be interpreted in conjunction with clinical findings and patient history.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportGenerator;