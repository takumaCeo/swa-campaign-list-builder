import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { AlertCircle, Filter, Users } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

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
    <div className="w-full max-w-3xl mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Campaign Member Filter
          </CardTitle>
          <CardDescription>
            Select criteria to filter campaign members
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Member Type Selection */}
          <div className="space-y-2">
            <Label>Member Type</Label>
            <Select value={memberType} onValueChange={setMemberType}>
              <SelectTrigger>
                <SelectValue placeholder="Select member type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="programming">Programming</SelectItem>
                <SelectItem value="donor">Donor</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Suppression List */}
          <div className="space-y-2">
            <Label>Suppression List</Label>
            <div className="border rounded-md p-4 space-y-2">
              {suppressionCampaigns.map(campaign => (
                <div key={campaign.id} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id={`campaign-${campaign.id}`}
                    className="rounded border-gray-300"
                    onChange={(e) => {
                      if (e.target.checked) {
                        setSelectedCampaigns([...selectedCampaigns, campaign.id]);
                      } else {
                        setSelectedCampaigns(selectedCampaigns.filter(id => id !== campaign.id));
                      }
                    }}
                  />
                  <label htmlFor={`campaign-${campaign.id}`}>{campaign.name}</label>
                </div>
              ))}
            </div>
          </div>

          {/* Timeframe Selection */}
          <div className="space-y-2">
            <Label>Response Timeframe (months)</Label>
            <Input 
              type="number" 
              min="1"
              max="24"
              value={timeframe}
              onChange={(e) => setTimeframe(e.target.value)}
              placeholder="Enter number of months"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-2 pt-4">
            <Button variant="outline" onClick={() => {
              setMemberType("");
              setTimeframe("");
              setSelectedCampaigns([]);
              setShowResults(false);
            }}>
              Reset
            </Button>
            <Button onClick={handleApplyFilters}>
              Apply Filters
            </Button>
          </div>

          {/* Results Preview */}
          {showResults && (
            <Alert className="mt-4">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                <span>1,234 members match your filter criteria</span>
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default CampaignMemberFilter;