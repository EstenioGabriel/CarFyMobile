import React, { useState, useEffect } from 'react';
import { MOCK_SERVICES, serviceTypeMap, AutoService } from '../data/services';
import { Star, MapPin, Navigation, Search, Filter } from 'lucide-react';
import { projectId, publicAnonKey } from '../../../utils/supabase/info';

export function ListView() {
  const [searchTerm, setSearchTerm] = useState('');
  const [allServices, setAllServices] = useState<AutoService[]>(MOCK_SERVICES);

  useEffect(() => {
    const fetchApprovedServices = async () => {
      try {
        const response = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-c824edb8/providers/approved`, {
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`
          }
        });

        if (response.ok) {
          const data = await response.json();
          const services = (data.providers || []).map((p: any) => ({
            id: p.id,
            name: p.name,
            type: p.type,
            lat: p.lat,
            lng: p.lng,
            address: p.address,
            rating: 0,
            phone: p.whatsapp || '',
            whatsapp: p.whatsapp,
            openNow: true,
            hours: p.hours,
            description: p.description,
            comments: []
          }));
          setAllServices([...MOCK_SERVICES, ...services]);
        }
      } catch (error) {
        console.error('Error fetching approved services:', error);
      }
    };

    fetchApprovedServices();
  }, []);

  const filteredServices = allServices.filter(service =>
    service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    serviceTypeMap[service.type].label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleRouteMaps = (lat: number, lng: number) => {
    window.open(`https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`, '_blank');
  };

  const handleRouteWaze = (lat: number, lng: number) => {
    window.open(`https://waze.com/ul?ll=${lat},${lng}&navigate=yes`, '_blank');
  };

  return (
    <div className="h-full flex flex-col bg-gray-50">
      {/* Search Bar */}
      <div className="p-4 bg-white border-b border-gray-200 shrink-0">
        <div className="relative flex items-center">
          <Search className="absolute left-3 text-gray-400" size={20} />
          <input 
            type="text" 
            placeholder="Buscar serviços..." 
            className="w-full bg-gray-100 rounded-xl py-3 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="ml-3 p-3 bg-gray-100 rounded-xl text-gray-600">
            <Filter size={20} />
          </button>
        </div>
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {filteredServices.length === 0 ? (
          <div className="text-center text-gray-500 mt-10">
            Nenhum serviço encontrado.
          </div>
        ) : (
          filteredServices.map(service => {
            const config = serviceTypeMap[service.type];
            const Icon = config.icon;
            
            return (
              <div key={service.id} className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100">
                <div className="flex items-start gap-4 mb-3">
                  <div className={`w-12 h-12 rounded-xl ${config.bg} ${config.color} flex items-center justify-center shrink-0`}>
                    <Icon size={24} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-gray-900 truncate">{service.name}</h3>
                    <p className="text-sm text-gray-500 mb-1">{config.label}</p>
                    <div className="flex items-center gap-1 text-xs text-gray-600">
                      <Star size={14} className="text-yellow-500 fill-yellow-500" />
                      <span className="font-medium">{service.rating}</span>
                      <span className="mx-1">•</span>
                      <span className={service.openNow ? "text-green-600" : "text-red-500"}>
                        {service.openNow ? 'Aberto' : 'Fechado'}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-sm text-gray-600 mb-4 px-1">
                  <MapPin size={16} className="text-gray-400 shrink-0" />
                  <span className="truncate">{service.address}</span>
                </div>

                <div className="flex gap-2">
                  <button 
                    onClick={() => handleRouteMaps(service.lat, service.lng)}
                    className="flex-1 bg-blue-50 hover:bg-blue-100 text-blue-700 font-medium py-2 px-2 rounded-lg flex items-center justify-center gap-1.5 text-sm transition-colors"
                  >
                    <Navigation size={16} />
                    <span>Maps</span>
                  </button>
                  <button 
                    onClick={() => handleRouteWaze(service.lat, service.lng)}
                    className="flex-1 bg-cyan-50 hover:bg-cyan-100 text-cyan-700 font-medium py-2 px-2 rounded-lg flex items-center justify-center gap-1.5 text-sm transition-colors"
                  >
                    <Navigation size={16} />
                    <span>Waze</span>
                  </button>
                  {service.whatsapp && (
                    <button 
                      onClick={() => window.open(`https://wa.me/${service.whatsapp}`, '_blank')}
                      className="flex-1 bg-green-50 hover:bg-green-100 text-green-700 font-medium py-2 px-2 rounded-lg flex items-center justify-center gap-1.5 text-sm transition-colors"
                    >
                      <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-message-circle">
                        <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
                      </svg>
                      <span>Whats</span>
                    </button>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
