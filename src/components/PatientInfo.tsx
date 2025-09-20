import React from 'react';
import { User, Calendar, Hash, Phone, Mail, MapPin } from 'lucide-react';

interface PatientInfoProps {
  patientData: any;
  setPatientData: (data: any) => void;
}

const PatientInfo: React.FC<PatientInfoProps> = ({ patientData, setPatientData }) => {
  const handleInputChange = (field: string, value: string) => {
    setPatientData((prev: any) => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="bg-white rounded-lg shadow-sm">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-900">Patient Information</h2>
        <p className="text-gray-600 mt-1">Enter patient details for comprehensive analysis</p>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-2 gap-6">
          {/* Basic Information */}
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <User className="w-4 h-4 inline mr-2" />
                Full Name
              </label>
              <input
                type="text"
                value={patientData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter patient's full name"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Calendar className="w-4 h-4 inline mr-2" />
                  Age
                </label>
                <input
                  type="number"
                  value={patientData.age}
                  onChange={(e) => handleInputChange('age', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Age"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
                <select
                  value={patientData.gender}
                  onChange={(e) => handleInputChange('gender', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Hash className="w-4 h-4 inline mr-2" />
                Patient ID
              </label>
              <input
                type="text"
                value={patientData.patientId}
                onChange={(e) => handleInputChange('patientId', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Patient ID or Medical Record Number"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Calendar className="w-4 h-4 inline mr-2" />
                Date of Analysis
              </label>
              <input
                type="date"
                value={patientData.date}
                onChange={(e) => handleInputChange('date', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Contact & Additional Information */}
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Phone className="w-4 h-4 inline mr-2" />
                Phone Number
              </label>
              <input
                type="tel"
                value={patientData.phone || ''}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Patient's phone number"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Mail className="w-4 h-4 inline mr-2" />
                Email Address
              </label>
              <input
                type="email"
                value={patientData.email || ''}
                onChange={(e) => handleInputChange('email', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Patient's email address"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <MapPin className="w-4 h-4 inline mr-2" />
                Address
              </label>
              <textarea
                value={patientData.address || ''}
                onChange={(e) => handleInputChange('address', e.target.value)}
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Patient's address"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Medical History</label>
              <textarea
                value={patientData.medicalHistory || ''}
                onChange={(e) => handleInputChange('medicalHistory', e.target.value)}
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Relevant medical history, previous kidney stones, medications, allergies..."
              />
            </div>
          </div>
        </div>

        {/* Current Symptoms */}
        <div className="mt-8">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Current Symptoms</h3>
          <div className="grid grid-cols-3 gap-4">
            {[
              'Severe pain',
              'Blood in urine',
              'Nausea/Vomiting',
              'Frequent urination',
              'Burning sensation',
              'Cloudy urine',
              'Fever',
              'Back pain',
              'Abdominal pain'
            ].map((symptom) => (
              <label key={symptom} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  checked={patientData.symptoms?.includes(symptom) || false}
                  onChange={(e) => {
                    const currentSymptoms = patientData.symptoms || [];
                    if (e.target.checked) {
                      handleInputChange('symptoms', [...currentSymptoms, symptom]);
                    } else {
                      handleInputChange('symptoms', currentSymptoms.filter((s: string) => s !== symptom));
                    }
                  }}
                />
                <span className="text-sm text-gray-700">{symptom}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Pain Scale */}
        <div className="mt-8">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Pain Scale (0-10)</h3>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-600">No Pain</span>
            <input
              type="range"
              min="0"
              max="10"
              value={patientData.painScale || 0}
              onChange={(e) => handleInputChange('painScale', e.target.value)}
              className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
            />
            <span className="text-sm text-gray-600">Severe Pain</span>
            <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-medium">
              {patientData.painScale || 0}
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex justify-end space-x-4">
          <button className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
            Clear Form
          </button>
          <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
            Save Patient Info
          </button>
        </div>
      </div>
    </div>
  );
};

export default PatientInfo;