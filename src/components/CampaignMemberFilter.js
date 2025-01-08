import React, { useState } from 'react';

const CampaignMemberFilter = () => {
  const [memberType, setMemberType] = useState("");
  const [timeframe, setTimeframe] = useState("");
  const [selectedCampaigns, setSelectedCampaigns] = useState([]);
  const [showResults, setShowResults] = useState(false);

  // Mock campaign data
  const suppressionCampaigns = [
    { id: 1, name: "Spring 2024 Programming" },
    { id: 2, name: "Year-End Giving 2023" },
    { id: 3, name: "Monthly Donor Campaign" },
    { id: 4, name: "Member Appreciation" }
  ];

  const handleApplyFilters = () => {
    setShowResults(true);
  };

  return (
    <div className="max-w-3xl mx-auto p-4">
      <div className="bg-white rounded-lg shadow-md p-6">
        {/* Header */}
        <div className="mb-6">
          <h2 className="text-xl font-bold mb-2">Campaign List Builder</h2>
          <p className="text-gray-600">Select criteria to build a custom list of campaign members</p>
        </div>

        {/* Member Type Selection */}
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">
            Member Type
          </label>
          <select
            value={memberType}
            onChange={(e) => setMemberType(e.target.value)}
            className="w-full p-2 border rounded-md"
          >
            <option value="">Select member types to include</option>
            <option value="programming">Programming</option>
            <option value="donor">Donor</option>
          </select>
        </div>

        {/* Timeframe Selection */}
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">
            Response Timeframe (months) <span className="text-gray-500">(optional)</span>
          </label>
          <input
            type="number"
            min="1"
            max="24"
            value={timeframe}
            onChange={(e) => setTimeframe(e.target.value)}
            placeholder="Enter number of months"
            className="w-full p-2 border rounded-md"
          />
          <p className="text-gray-500 text-sm mt-1">Optionally include only members who have responded within this timeframe.</p>
        </div>

        {/* Suppression List */}
        <div className="mb-6">
          <label className="block text-sm font-medium mb-2">
            Suppression List
          </label>
          <div className="border rounded-md p-4 space-y-2">
            {suppressionCampaigns.map(campaign => (
              <div key={campaign.id} className="flex items-center">
                <input
                  type="checkbox"
                  id={`campaign-${campaign.id}`}
                  className="mr-2"
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedCampaigns([...selectedCampaigns, campaign.id]);
                    } else {
                      setSelectedCampaigns(selectedCampaigns.filter(id => id !== campaign.id));
                    }
                  }}
                />
                <label htmlFor={`campaign-${campaign.id}`} className="text-sm">
                  {campaign.name}
                </label>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end space-x-2">
          <button
            onClick={() => {
              setMemberType("");
              setTimeframe("");
              setSelectedCampaigns([]);
              setShowResults(false);
            }}
            className="px-4 py-2 border rounded-md hover:bg-gray-50"
          >
            Reset
          </button>
          <button
            onClick={handleApplyFilters}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Apply Filters
          </button>
        </div>

        {/* Results Preview */}
        {showResults && (
          <div className="mt-4 p-4 bg-blue-50 text-blue-700 rounded-md">
            1,234 members match your filter criteria
          </div>
        )}
      </div>
    </div>
  );
};

export default CampaignMemberFilter;