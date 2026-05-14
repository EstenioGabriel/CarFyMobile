import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { ArrowLeft, Upload, CheckCircle2, Loader2, MapPin } from 'lucide-react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { projectId, publicAnonKey } from '../../../utils/supabase/info';

// Fix for default Leaflet marker icons
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

function LocationPicker({ position, setPosition }: { position: [number, number], setPosition: (pos: [number, number]) => void }) {
  useMapEvents({
    click(e) {
      setPosition([e.latlng.lat, e.latlng.lng]);
    },
  });

  return position ? <Marker position={position} /> : null;
}

export function ProviderRegistration() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    type: '',
    whatsapp: '',
    address: '',
    hours: '',
    description: '',
    lat: FORTALEZA_COORDS[0],
    lng: FORTALEZA_COORDS[1]
  });

  const [mapPosition, setMapPosition] = useState<[number, number]>(FORTALEZA_COORDS);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleLocationChange = (position: [number, number]) => {
    setMapPosition(position);
    setFormData(prev => ({ ...prev, lat: position[0], lng: position[1] }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-c824edb8/providers`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${publicAnonKey}`
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error('Falha ao enviar os dados. Tente novamente mais tarde.');
      }

      setStep(2);
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : 'Ocorreu um erro desconhecido.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-full flex flex-col bg-gray-50 absolute inset-0 z-50">
      <header className="bg-white shadow-sm z-10 px-4 py-3 pt-[calc(0.75rem+env(safe-area-inset-top))] flex items-center shrink-0">
        <button 
          onClick={() => navigate(-1)}
          className="p-2 -ml-2 text-gray-600 hover:bg-gray-100 rounded-full transition-colors mr-2"
        >
          <ArrowLeft size={24} />
        </button>
        <h1 className="font-bold text-lg text-gray-800">Seja um Parceiro</h1>
      </header>

      <div className="flex-1 overflow-y-auto p-4">
        {step === 1 ? (
          <div className="max-w-md mx-auto">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Cadastre seu serviço</h2>
              <p className="text-gray-600 text-sm">
                Aumente sua clientela! Adicione sua oficina, reboque ou lava-jato ao nosso mapa.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm space-y-4">
                {error && (
                  <div className="p-3 bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl">
                    {error}
                  </div>
                )}
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nome do Estabelecimento</label>
                  <input name="name" value={formData.name} onChange={handleChange} type="text" required placeholder="Ex: Oficina São João" className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Tipo de Serviço</label>
                  <select name="type" value={formData.type} onChange={handleChange} required className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white">
                    <option value="">Selecione uma categoria...</option>
                    <option value="mechanic">Oficina Mecânica</option>
                    <option value="tire">Borracharia</option>
                    <option value="towing">Reboque 24h</option>
                    <option value="carwash">Lava Jato</option>
                    <option value="gas">Posto de Combustível</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">WhatsApp para Contato</label>
                  <input name="whatsapp" value={formData.whatsapp} onChange={handleChange} type="tel" required placeholder="(00) 00000-0000" className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Endereço Completo</label>
                  <input name="address" value={formData.address} onChange={handleChange} type="text" required placeholder="Rua, Número, Bairro" className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Horário de Funcionamento</label>
                  <input name="hours" value={formData.hours} onChange={handleChange} type="text" required placeholder="Ex: Seg a Sex: 08h - 18h" className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Descrição</label>
                  <textarea name="description" value={formData.description} onChange={handleChange} rows={3} placeholder="Descreva os serviços que você oferece..." className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none"></textarea>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center gap-1">
                    <MapPin size={16} />
                    Localização no Mapa
                  </label>
                  <p className="text-xs text-gray-500 mb-2">Toque no mapa para marcar a localização exata do seu estabelecimento</p>
                  <div className="border border-gray-300 rounded-xl overflow-hidden h-64">
                    <MapContainer
                      center={mapPosition}
                      zoom={14}
                      className="w-full h-full"
                      zoomControl={true}
                    >
                      <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                        url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
                      />
                      <LocationPicker position={mapPosition} setPosition={handleLocationChange} />
                    </MapContainer>
                  </div>
                  <p className="text-xs text-gray-600 mt-2">
                    Localização atual: {mapPosition[0].toFixed(6)}, {mapPosition[1].toFixed(6)}
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Foto do Local</label>
                  <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 flex flex-col items-center justify-center text-gray-500 bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer">
                    <Upload size={24} className="mb-2 text-gray-400" />
                    <span className="text-sm font-medium">Toque para enviar uma foto</span>
                    <span className="text-xs text-gray-400 mt-1">JPG ou PNG</span>
                  </div>
                </div>
              </div>

              <button disabled={loading} type="submit" className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-bold py-4 px-4 rounded-xl transition-colors shadow-md flex items-center justify-center gap-2">
                {loading && <Loader2 size={20} className="animate-spin" />}
                {loading ? 'Enviando...' : 'Enviar Cadastro'}
              </button>
            </form>
          </div>
        ) : (
          <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center text-green-500 mb-2">
              <CheckCircle2 size={40} />
            </div>
            <h2 className="text-2xl font-bold text-gray-900">Cadastro Enviado!</h2>
            <p className="text-gray-600 max-w-[280px]">
              Seus dados foram recebidos com sucesso. Nossa equipe fará a validação em breve para que seu serviço apareça no mapa.
            </p>
            <button 
              onClick={() => navigate('/')}
              className="mt-8 bg-gray-900 hover:bg-gray-800 text-white font-bold py-3 px-8 rounded-xl transition-colors"
            >
              Voltar ao Mapa
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
