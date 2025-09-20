import React, { useState } from 'react';
import { Book, Search, Filter, ChevronDown, ChevronUp } from 'lucide-react';

const KidneyStoneInfo = () => {
  const [expandedSection, setExpandedSection] = useState<string | null>('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const stoneTypes = [
    {
      name: 'Calcium Oxalate',
      prevalence: '80%',
      color: 'text-orange-600',
      description: 'Most common type, often caused by high calcium or oxalate intake',
      treatment: 'Dietary modifications, increased water intake, sometimes medication',
      causes: ['High oxalate foods', 'Low calcium diet', 'Dehydration', 'Genetics']
    },
    {
      name: 'Calcium Phosphate',
      prevalence: '10%',
      color: 'text-blue-600',
      description: 'Forms in alkaline urine, often associated with metabolic conditions',
      treatment: 'Address underlying metabolic issues, dietary changes',
      causes: ['High urine pH', 'Hyperparathyroidism', 'Renal tubular acidosis']
    },
    {
      name: 'Uric Acid',
      prevalence: '5-10%',
      color: 'text-red-600',
      description: 'Forms in acidic urine, often in patients with gout or high protein diet',
      treatment: 'Alkalinize urine, dietary modifications, allopurinol',
      causes: ['Acidic urine', 'High purine diet', 'Gout', 'Diabetes']
    },
    {
      name: 'Struvite',
      prevalence: '2-3%',
      color: 'text-green-600',
      description: 'Infection stones, form due to urease-producing bacteria',
      treatment: 'Antibiotic therapy, complete stone removal essential',
      causes: ['Urinary tract infections', 'Urease-producing bacteria', 'Alkaline urine']
    }
  ];

  const treatmentOptions = [
    {
      name: 'Shock Wave Lithotripsy (SWL)',
      suitability: 'Stones < 2cm in kidney or upper ureter',
      procedure: 'Non-invasive, uses sound waves to break stones',
      recovery: '1-2 days',
      success: '70-90%'
    },
    {
      name: 'Ureteroscopy',
      suitability: 'Stones in ureter or kidney < 2cm',
      procedure: 'Minimally invasive, scope through urethra',
      recovery: '1-3 days',
      success: '85-95%'
    },
    {
      name: 'Percutaneous Nephrolithotomy',
      suitability: 'Large stones > 2cm or complex stones',
      procedure: 'Surgical removal through small incision',
      recovery: '3-5 days',
      success: '90-95%'
    }
  ];

  const sections = [
    { id: 'overview', title: 'Overview', icon: Book },
    { id: 'types', title: 'Stone Types', icon: Filter },
    { id: 'treatments', title: 'Treatments', icon: Search }
  ];

  const toggleSection = (sectionId: string) => {
    setExpandedSection(expandedSection === sectionId ? null : sectionId);
  };

  const filteredContent = (content: any[]) => {
    return content.filter(item => 
      (selectedCategory === 'all' || item.category === selectedCategory) &&
      (searchTerm === '' || 
       item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
       item.description.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Kidney Stone Knowledge Base</h2>
        
        {/* Search and Filter */}
        <div className="flex space-x-4">
          <div className="flex-1 relative">
            <Search className="w-5 h-5 absolute left-3 top-3.5 text-gray-400" />
            <input
              type="text"
              placeholder="Search kidney stone information..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="all">All Categories</option>
            <option value="calcium">Calcium Stones</option>
            <option value="non-calcium">Non-Calcium Stones</option>
            <option value="treatment">Treatment Options</option>
          </select>
        </div>
      </div>

      {/* Navigation */}
      <div className="bg-white rounded-lg shadow-sm">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {sections.map((section) => {
              const Icon = section.icon;
              return (
                <button
                  key={section.id}
                  onClick={() => toggleSection(section.id)}
                  className={`flex items-center space-x-2 py-4 border-b-2 transition-colors ${
                    expandedSection === section.id
                      ? 'border-blue-600 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium">{section.title}</span>
                  {expandedSection === section.id ? (
                    <ChevronUp className="w-4 h-4" />
                  ) : (
                    <ChevronDown className="w-4 h-4" />
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Content Sections */}
        <div className="p-6">
          {/* Overview Section */}
          {expandedSection === 'overview' && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-blue-50 rounded-lg p-6">
                  <h3 className="text-lg font-medium text-blue-900 mb-3">What are Kidney Stones?</h3>
                  <p className="text-blue-800 mb-4">
                    Kidney stones are hard deposits made of minerals and salts that form inside your kidneys. 
                    They can affect any part of your urinary tract and vary in size from tiny crystals to 
                    golf ball-sized masses.
                  </p>
                  <ul className="text-blue-800 space-y-1">
                    <li>• Affect about 10% of the population</li>
                    <li>• More common in men than women</li>
                    <li>• Peak incidence between ages 30-50</li>
                    <li>• High recurrence rate (50% within 10 years)</li>
                  </ul>
                </div>

                <div className="bg-red-50 rounded-lg p-6">
                  <h3 className="text-lg font-medium text-red-900 mb-3">Common Symptoms</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      'Severe back/side pain',
                      'Blood in urine',
                      'Nausea and vomiting',
                      'Frequent urination',
                      'Burning during urination',
                      'Cloudy/smelly urine',
                      'Fever (if infection)',
                      'Unable to sit still'
                    ].map((symptom, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-red-600 rounded-full"></div>
                        <span className="text-red-800 text-sm">{symptom}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="bg-green-50 rounded-lg p-6">
                <h3 className="text-lg font-medium text-green-900 mb-3">Prevention Strategies</h3>
                <div className="grid grid-cols-3 gap-6">
                  <div>
                    <h4 className="font-medium text-green-800 mb-2">Hydration</h4>
                    <ul className="text-green-700 text-sm space-y-1">
                      <li>• Drink 8-12 glasses of water daily</li>
                      <li>• Monitor urine color (pale yellow)</li>
                      <li>• Increase intake during hot weather</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-green-800 mb-2">Diet Modifications</h4>
                    <ul className="text-green-700 text-sm space-y-1">
                      <li>• Limit sodium intake</li>
                      <li>• Reduce animal protein</li>
                      <li>• Consume adequate calcium</li>
                      <li>• Limit oxalate-rich foods</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-green-800 mb-2">Lifestyle</h4>
                    <ul className="text-green-700 text-sm space-y-1">
                      <li>• Maintain healthy weight</li>
                      <li>• Regular physical activity</li>
                      <li>• Manage underlying conditions</li>
                      <li>• Follow medical advice</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Stone Types Section */}
          {expandedSection === 'types' && (
            <div className="space-y-6">
              <h3 className="text-lg font-medium text-gray-900">Types of Kidney Stones</h3>
              
              <div className="grid gap-4">
                {stoneTypes.map((stone, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h4 className={`text-xl font-medium ${stone.color} mb-2`}>{stone.name}</h4>
                        <p className="text-gray-600 mb-3">{stone.description}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-gray-900">{stone.prevalence}</div>
                        <div className="text-sm text-gray-500">of all stones</div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-6">
                      <div>
                        <h5 className="font-medium text-gray-900 mb-2">Common Causes</h5>
                        <ul className="space-y-1">
                          {stone.causes.map((cause, idx) => (
                            <li key={idx} className="text-gray-600 text-sm flex items-center space-x-2">
                              <div className="w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
                              <span>{cause}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                      
                      <div>
                        <h5 className="font-medium text-gray-900 mb-2">Treatment Approach</h5>
                        <p className="text-gray-600 text-sm">{stone.treatment}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Treatment Options Section */}
          {expandedSection === 'treatments' && (
            <div className="space-y-6">
              <h3 className="text-lg font-medium text-gray-900">Treatment Options</h3>
              
              <div className="grid gap-6">
                {treatmentOptions.map((treatment, index) => (
                  <div key={index} className="bg-gray-50 rounded-lg p-6">
                    <h4 className="text-xl font-medium text-gray-900 mb-3">{treatment.name}</h4>
                    
                    <div className="grid grid-cols-4 gap-6">
                      <div>
                        <h5 className="font-medium text-gray-700 mb-2">Best For</h5>
                        <p className="text-gray-600 text-sm">{treatment.suitability}</p>
                      </div>
                      
                      <div>
                        <h5 className="font-medium text-gray-700 mb-2">Procedure</h5>
                        <p className="text-gray-600 text-sm">{treatment.procedure}</p>
                      </div>
                      
                      <div>
                        <h5 className="font-medium text-gray-700 mb-2">Recovery</h5>
                        <p className="text-gray-600 text-sm">{treatment.recovery}</p>
                      </div>
                      
                      <div>
                        <h5 className="font-medium text-gray-700 mb-2">Success Rate</h5>
                        <p className="text-green-600 text-sm font-medium">{treatment.success}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
                <h4 className="text-lg font-medium text-yellow-900 mb-3">Conservative Management</h4>
                <p className="text-yellow-800 mb-4">
                  For stones smaller than 4mm, conservative management may be appropriate:
                </p>
                
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <h5 className="font-medium text-yellow-900 mb-2">Pain Management</h5>
                    <ul className="text-yellow-800 text-sm space-y-1">
                      <li>• NSAIDs for pain control</li>
                      <li>• Antispasmodics for ureter spasm</li>
                      <li>• Adequate hydration</li>
                      <li>• Heat therapy</li>
                    </ul>
                  </div>
                  
                  <div>
                    <h5 className="font-medium text-yellow-900 mb-2">Medical Therapy</h5>
                    <ul className="text-yellow-800 text-sm space-y-1">
                      <li>• Alpha-blockers (tamsulosin)</li>
                      <li>• Increased fluid intake</li>
                      <li>• Strain urine to catch stone</li>
                      <li>• Follow-up imaging</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default KidneyStoneInfo;