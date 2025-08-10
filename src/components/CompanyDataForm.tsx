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
      title: "Datos de la empresa guardados",
      description: "La información de su empresa ha sido actualizada correctamente.",
    });
  };

  return (
    <Card className="p-6 shadow-card">
      <div className="space-y-6">
        <h3 className="text-lg font-semibold text-foreground">Información de la Empresa</h3>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="companyName">Nombre de la Empresa</Label>
              <Input
                id="companyName"
                value={formData.companyName}
                onChange={(e) => handleInputChange('companyName', e.target.value)}
                placeholder="Ingrese el nombre de la empresa"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="ruc">Número de RUC</Label>
              <Input
                id="ruc"
                value={formData.ruc}
                onChange={(e) => handleInputChange('ruc', e.target.value)}
                placeholder="Ingrese el número de RUC"
              />
                            <Button type="button" className="mt-2 w-full bg-gradient-primary text-white">
                Buscar
              </Button>
            </div>
            
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="industry">Industria</Label>
              <Select onValueChange={(value) => handleInputChange('industry', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Seleccione industria" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="retail">Comercio Minorista</SelectItem>
                  <SelectItem value="manufacturing">Manufactura</SelectItem>
                  <SelectItem value="services">Servicios</SelectItem>
                  <SelectItem value="technology">Tecnología</SelectItem>
                  <SelectItem value="agriculture">Agricultura</SelectItem>
                  <SelectItem value="construction">Construcción</SelectItem>
                  <SelectItem value="hospitality">Hospitalidad</SelectItem>
                  <SelectItem value="other">Otra</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="employees">Número de Empleados</Label>
              <Select onValueChange={(value) => handleInputChange('employees', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Seleccione rango" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1-10">1-10</SelectItem>
                  <SelectItem value="11-50">11-50</SelectItem>
                  <SelectItem value="51-200">51-200</SelectItem>
                  <SelectItem value="201-500">201-500</SelectItem>
                  <SelectItem value="500+">Más de 500</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="yearsOperation">Años en Operación</Label>
              <Input
                id="yearsOperation"
                type="number"
                value={formData.yearsOperation}
                onChange={(e) => handleInputChange('yearsOperation', e.target.value)}
                placeholder="Ingrese años"
                min="0"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="monthlyRevenue">Ingresos Mensuales (USD)</Label>
            <Input
              id="monthlyRevenue"
              type="number"
              value={formData.monthlyRevenue}
              onChange={(e) => handleInputChange('monthlyRevenue', e.target.value)}
              placeholder="Ingrese ingresos mensuales"
              min="0"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="socialMediaLinks">Enlaces de Redes Sociales</Label>
            <Textarea
              id="socialMediaLinks"
              value={formData.socialMediaLinks}
              onChange={(e) => handleInputChange('socialMediaLinks', e.target.value)}
              placeholder="Ingrese URLs de redes sociales (Facebook, Instagram, LinkedIn, etc.)"
              rows={3}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Descripción del Negocio</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              placeholder="Describa las actividades y servicios de su negocio"
              rows={4}
            />
          </div>

          <Button type="submit" className="w-full bg-gradient-primary text-white">
            Guardar Información de la Empresa
          </Button>
        </form>
      </div>
    </Card>
  );
};
