import { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

interface CompanyData {
  companyName: string;
  ruc: string;
  industry: string;
  employees: string;
  yearsOperation: string;
  monthlyRevenue: string;
  socialMediaLinks: string;
  description: string;
}

export const CompanyDataForm = () => {
  const [formData, setFormData] = useState<CompanyData>({
    companyName: '',
    ruc: '',
    industry: '',
    employees: '',
    yearsOperation: '',
    monthlyRevenue: '',
    socialMediaLinks: '',
    description: ''
  });

  const { toast } = useToast();

  const handleInputChange = (field: keyof CompanyData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    toast({
      title: "Company data saved",
      description: "Your company information has been updated successfully.",
    });
  };

  return (
    <Card className="p-6 shadow-card">
      <div className="space-y-6">
        <h3 className="text-lg font-semibold text-foreground">Company Information</h3>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="companyName">Company Name</Label>
              <Input
                id="companyName"
                value={formData.companyName}
                onChange={(e) => handleInputChange('companyName', e.target.value)}
                placeholder="Enter company name"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="ruc">RUC Number</Label>
              <Input
                id="ruc"
                value={formData.ruc}
                onChange={(e) => handleInputChange('ruc', e.target.value)}
                placeholder="Enter RUC number"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="industry">Industry</Label>
              <Select onValueChange={(value) => handleInputChange('industry', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select industry" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="retail">Retail</SelectItem>
                  <SelectItem value="manufacturing">Manufacturing</SelectItem>
                  <SelectItem value="services">Services</SelectItem>
                  <SelectItem value="technology">Technology</SelectItem>
                  <SelectItem value="agriculture">Agriculture</SelectItem>
                  <SelectItem value="construction">Construction</SelectItem>
                  <SelectItem value="hospitality">Hospitality</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="employees">Number of Employees</Label>
              <Select onValueChange={(value) => handleInputChange('employees', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1-10">1-10</SelectItem>
                  <SelectItem value="11-50">11-50</SelectItem>
                  <SelectItem value="51-200">51-200</SelectItem>
                  <SelectItem value="201-500">201-500</SelectItem>
                  <SelectItem value="500+">500+</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="yearsOperation">Years in Operation</Label>
              <Input
                id="yearsOperation"
                type="number"
                value={formData.yearsOperation}
                onChange={(e) => handleInputChange('yearsOperation', e.target.value)}
                placeholder="Enter years"
                min="0"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="monthlyRevenue">Monthly Revenue (USD)</Label>
            <Input
              id="monthlyRevenue"
              type="number"
              value={formData.monthlyRevenue}
              onChange={(e) => handleInputChange('monthlyRevenue', e.target.value)}
              placeholder="Enter monthly revenue"
              min="0"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="socialMediaLinks">Social Media Links</Label>
            <Textarea
              id="socialMediaLinks"
              value={formData.socialMediaLinks}
              onChange={(e) => handleInputChange('socialMediaLinks', e.target.value)}
              placeholder="Enter social media URLs (Facebook, Instagram, LinkedIn, etc.)"
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Business Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              placeholder="Describe your business activities and services"
              rows={4}
            />
          </div>

          <Button type="submit" className="w-full bg-gradient-primary text-white">
            Save Company Information
          </Button>
        </form>
      </div>
    </Card>
  );
};