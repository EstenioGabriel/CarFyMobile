import React, { useState, useEffect, useMemo } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { MOCK_SERVICES, serviceTypeMap, AutoService } from '../data/services';
import { Navigation, Star, Phone, Clock, MapPin, X, Wrench, Truck, Droplets } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { projectId, publicAnonKey } from '../../../utils/supabase/info';

// Fix for default Leaflet marker icons in React
import iconUrl from 'leaflet/dist/images/marker-icon.png';
import iconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png';
import shadowUrl from 'leaflet/dist/images/marker-shadow.png';

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
});

const FORTALEZA_COORDS: [number, number] = [-3.7318616, -38.5266704];

const typeColors: Record<AutoService['type'], { bg: string, color: string }> = {
  mechanic: { bg: '#dbeafe', color: '#2563eb' },
  tire: { bg: '#e5e7eb', color: '#374151' },
  ev: { bg: '#dcfce3', color: '#16a34a' },
  gas: { bg: '#ffedd5', color: '#f97316' },
  carwash: { bg: '#cffafe', color: '#0891b2' },
  detailing: { bg: '#f3e8ff', color: '#9333ea' },
  towing: { bg: '#fee2e2', color: '#dc2626' },
};

const typeIcons: Record<AutoService['type'], string> = {
  mechanic: '<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />',
  tire: '<path d="M10.1 2.182a10 10 0 0 1 3.8 0"/><path d="M13.9 21.818a10 10 0 0 1-3.8 0"/><path d="M17.609 3.721a10 10 0 0 1 2.69 2.7"/><path d="M2.182 13.9a10 10 0 0 1 0-3.8"/><path d="M20.279 17.609a10 10 0 0 1-2.7 2.69"/><path d="M21.818 10.1a10 10 0 0 1 0 3.8"/><path d="M3.721 6.391a10 10 0 0 1 2.7-2.69"/><path d="M6.391 20.279a10 10 0 0 1-2.69-2.7"/>',
  ev: '<path d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"/>',
  gas: '<line x1="4" x2="14" y1="9" y2="9"/><path d="M14 22V4a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v18"/><path d="M14 13h2a2 2 0 0 1 2 2v2a2 2 0 0 0 2 2a2 2 0 0 0 2-2V9.83a2 2 0 0 0-.59-1.42L18 5"/>',
  carwash: '<path d="M7 16.3c2.2 0 4-1.83 4-4.05 0-1.16-.57-2.26-1.71-3.19S7.29 6.75 7 5.3c-.29 1.45-1.14 2.84-2.29 3.76S3 11.1 3 12.25c0 2.22 1.8 4.05 4 4.05z"/><path d="M12.56 6.6A10.97 10.97 0 0 0 14 3.02c.5 2.5 2 4.9 4 6.5s3 3.5 3 5.5a6.98 6.98 0 0 1-11.91 4.97"/>',
  detailing: '<path d="M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"/><path d="M20 3v4"/><path d="M22 5h-4"/><path d="M4 17v2"/><path d="M5 18H3"/>',
  towing: '<path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2"/><path d="M15 18H9"/><path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14"/><circle cx="17" cy="18" r="2"/><circle cx="7" cy="18" r="2"/>',
};

function createCustomIcon(type: AutoService['type']) {
  const colors = typeColors[type] || { bg: '#ffffff', color: '#000000' };
  const iconPaths = typeIcons[type] || '';
  
  // Create a customized HTML marker
  const svgString = `
    <div style="width: 32px; height: 32px; border-radius: 50%; background-color: ${colors.bg}; color: ${colors.color}; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06); border: 2px solid white;">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        ${iconPaths}
      </svg>
    </div>
  `;

  return L.divIcon({
    html: svgString,
    className: 'custom-leaflet-icon-container',
    iconSize: [32, 32],
    iconAnchor: [16, 16],
    popupAnchor: [0, -16]
  });
}

function ServiceDetailsSheet({ service, onClose }: { service: AutoService, onClose: () => void }) {
  const config = serviceTypeMap[service.type];
  const Icon = config.icon;

  const handleRouteMaps = () => {
    window.open(`https://www.google.com/maps/dir/?api=1&destination=${service.lat},${service.lng}`, '_blank');
  };

  const handleRouteWaze = () => {
    window.open(`https://waze.com/ul?ll=${service.lat},${service.lng}&navigate=yes`, '_blank');
  };

  const handleWhatsApp = () => {
    if (service.whatsapp) {
      window.open(`https://wa.me/${service.whatsapp}`, '_blank');
    }
  };

  return (
    <motion.div 
      initial={{ y: "100%" }}
      animate={{ y: 0 }}
      exit={{ y: "100%" }}
      transition={{ type: "spring", bounce: 0, duration: 0.4 }}
      className="absolute bottom-0 left-0 right-0 bg-white rounded-t-3xl shadow-[0_-10px_40px_rgba(0,0,0,0.15)] flex flex-col z-[1000] max-h-[85vh]"
    >
      <div className="w-full flex justify-center pt-3 pb-1 shrink-0">
        <div className="w-12 h-1.5 bg-gray-300 rounded-full"></div>
      </div>

      <button 
        onClick={onClose}
        className="absolute top-4 right-4 p-2 bg-gray-100 rounded-full text-gray-500 hover:bg-gray-200 z-10"
      >
        <X size={20} />
      </button>

      <div className="flex-1 overflow-y-auto px-5 pb-5 pt-2 custom-scrollbar">
        <div className="flex items-center gap-4 mb-5">
          <div className={`w-14 h-14 rounded-2xl ${config.bg} ${config.color} flex items-center justify-center shrink-0`}>
            <Icon size={28} />
          </div>
          <div>
            <h3 className="font-bold text-xl text-gray-900 leading-tight mb-1">{service.name}</h3>
            <div className="flex items-center gap-2 text-sm">
              <span className="text-gray-500">{config.label}</span>
              <span className="text-gray-300">•</span>
              <div className="flex items-center gap-1">
                <Star size={14} className="text-yellow-500 fill-yellow-500" />
                <span className="font-medium text-gray-700">{service.rating}</span>
              </div>
            </div>
          </div>
        </div>

        {service.description && (
          <div className="mb-6">
            <p className="text-gray-600 text-sm leading-relaxed">{service.description}</p>
          </div>
        )}

        <div className="space-y-3 mb-6 bg-gray-50 rounded-2xl p-4 border border-gray-100">
          <div className="flex items-start gap-3 text-sm text-gray-700">
            <MapPin size={18} className="text-gray-400 mt-0.5 shrink-0" />
            <span className="leading-snug">{service.address}</span>
          </div>
          {service.hours && (
            <div className="flex items-start gap-3 text-sm text-gray-700">
              <Clock size={18} className="text-gray-400 mt-0.5 shrink-0" />
              <div className="flex flex-col">
                <span className="leading-snug">{service.hours}</span>
                <span className={`text-xs mt-1 font-medium ${service.openNow ? "text-green-600" : "text-red-500"}`}>
                  {service.openNow ? 'Aberto agora' : 'Fechado no momento'}
                </span>
              </div>
            </div>
          )}
          <div className="flex items-center gap-3 text-sm text-gray-700">
            <Phone size={18} className="text-gray-400 shrink-0" />
            <span>{service.phone}</span>
          </div>
        </div>

        <div className="flex gap-3 mb-6">
          <button 
            onClick={handleRouteMaps}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-2 rounded-xl flex items-center justify-center gap-2 text-sm transition-colors"
          >
            <Navigation size={18} />
            <span>Maps</span>
          </button>
          <button 
            onClick={handleRouteWaze}
            className="flex-1 bg-[#33ccff] hover:bg-[#2eb8e6] text-white font-semibold py-3 px-2 rounded-xl flex items-center justify-center gap-2 text-sm transition-colors shadow-sm"
          >
            <Navigation size={18} />
            <span>Waze</span>
          </button>
          {service.whatsapp && (
            <button 
              onClick={handleWhatsApp}
              className="flex-1 bg-[#25D366] hover:bg-[#1ebe5b] text-white font-semibold py-3 px-2 rounded-xl flex items-center justify-center gap-2 text-sm transition-colors shadow-sm"
            >
              <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-message-circle">
                <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
              </svg>
              <span>Whats</span>
            </button>
          )}
        </div>

        <div className="border-t border-gray-100 pt-5 mb-2">
          <h4 className="font-bold text-gray-900 mb-4 flex items-center justify-between">
            Comentários
            <span className="text-sm font-normal text-blue-600 bg-blue-50 px-2 py-1 rounded-md">
              {service.comments?.length || 0} avaliações
            </span>
          </h4>
          
          {service.comments && service.comments.length > 0 ? (
            <div className="space-y-4">
              {service.comments.map(comment => (
                <div key={comment.id} className="bg-white border border-gray-100 p-4 rounded-xl shadow-sm">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-gray-900 text-sm">{comment.author}</span>
                    <span className="text-xs text-gray-400">{new Date(comment.date).toLocaleDateString('pt-BR')}</span>
                  </div>
                  <div className="flex mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={12} className={i < comment.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-200"} />
                    ))}
                  </div>
                  <p className="text-gray-600 text-sm">{comment.text}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-500 text-center py-6 bg-gray-50 rounded-xl border border-gray-100">
              Nenhuma avaliação ainda. Seja o primeiro a avaliar!
            </p>
          )}
        </div>
      </div>
    </motion.div>
  );
}

export function MapView() {
  const [selectedService, setSelectedService] = useState<AutoService | null>(null);
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);
  const [approvedServices, setApprovedServices] = useState<AutoService[]>([]);
  const [allServices, setAllServices] = useState<AutoService[]>(MOCK_SERVICES);

  // Fetch approved services from backend
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
          setApprovedServices(services);
          setAllServices([...MOCK_SERVICES, ...services]);
        }
      } catch (error) {
        console.error('Error fetching approved services:', error);
      }
    };

    fetchApprovedServices();
  }, []);

  // Try to get user location
  useEffect(() => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation([position.coords.latitude, position.coords.longitude]);
        },
        () => {
          console.log("Could not get location");
        }
      );
    }
  }, []);

  const icons = useMemo(() => {
    const map: Record<string, L.DivIcon> = {};
    allServices.forEach(s => {
      map[s.id] = createCustomIcon(s.type);
    });
    return map;
  }, [allServices]);

  return (
    <div className="relative w-full h-full">
      <MapContainer 
        center={FORTALEZA_COORDS} 
        zoom={13} 
        className="w-full h-full"
        zoomControl={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
        />
        
        {userLocation && (
          <Marker 
            position={userLocation}
            icon={L.divIcon({
              html: '<div class="w-4 h-4 bg-blue-600 border-2 border-white rounded-full shadow-md animate-pulse"></div>',
              className: 'user-location-icon',
              iconSize: [16, 16],
            })}
          />
        )}

        {allServices.map(service => (
          <Marker
            key={service.id}
            position={[service.lat, service.lng]}
            icon={icons[service.id]}
            eventHandlers={{
              click: () => {
                setSelectedService(service);
              }
            }}
          />
        ))}
      </MapContainer>

      {/* Top filter chips overlay */}
      <div className="absolute top-4 left-0 right-0 z-[1000] px-4 overflow-x-auto no-scrollbar">
        <div className="flex gap-2 w-max">
          <button className="bg-white text-gray-800 px-4 py-2 rounded-full shadow-md text-sm font-medium border border-gray-100 whitespace-nowrap">
            Todos
          </button>
          <button className="bg-white text-gray-800 px-4 py-2 rounded-full shadow-md text-sm font-medium border border-gray-100 whitespace-nowrap flex items-center gap-1">
            <Wrench size={14} className="text-blue-600" /> Oficinas
          </button>
          <button className="bg-white text-gray-800 px-4 py-2 rounded-full shadow-md text-sm font-medium border border-gray-100 whitespace-nowrap flex items-center gap-1">
            <Truck size={14} className="text-red-600" /> Reboques
          </button>
          <button className="bg-white text-gray-800 px-4 py-2 rounded-full shadow-md text-sm font-medium border border-gray-100 whitespace-nowrap flex items-center gap-1">
            <Droplets size={14} className="text-cyan-600" /> Lava Jatos
          </button>
        </div>
      </div>

      <AnimatePresence>
        {selectedService && (
          <ServiceDetailsSheet 
            service={selectedService} 
            onClose={() => setSelectedService(null)} 
          />
        )}
      </AnimatePresence>
    </div>
  );
}
