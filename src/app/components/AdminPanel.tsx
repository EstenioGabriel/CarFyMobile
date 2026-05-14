import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { ArrowLeft, CheckCircle, XCircle, Loader2, MapPin, Clock, Phone, AlertCircle, LogOut, Shield } from 'lucide-react';
import { projectId, publicAnonKey } from '../../../utils/supabase/info';
import { serviceTypeMap } from '../data/services';
import { AdminLogin } from './AdminLogin';

interface PendingProvider {
  id: string;
  name: string;
  type: string;
  whatsapp: string;
  address: string;
  hours: string;
  description: string;
  lat: number;
  lng: number;
  status: string;
  createdAt: string;
}

export function AdminPanel() {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [providers, setProviders] = useState<PendingProvider[]>([]);
  const [approvedCount, setApprovedCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [processingId, setProcessingId] = useState<string | null>(null);

  const fetchPendingProviders = async () => {
    setLoading(true);
    setError('');
    try {
      const [pendingResponse, approvedResponse] = await Promise.all([
        fetch(`https://${projectId}.supabase.co/functions/v1/make-server-c824edb8/providers/pending`, {
          headers: { 'Authorization': `Bearer ${publicAnonKey}` }
        }),
        fetch(`https://${projectId}.supabase.co/functions/v1/make-server-c824edb8/providers/approved`, {
          headers: { 'Authorization': `Bearer ${publicAnonKey}` }
        })
      ]);

      if (!pendingResponse.ok) {
        throw new Error('Falha ao carregar solicitações pendentes');
      }

      const pendingData = await pendingResponse.json();
      setProviders(pendingData.providers || []);

      if (approvedResponse.ok) {
        const approvedData = await approvedResponse.json();
        setApprovedCount((approvedData.providers || []).length);
      }
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : 'Erro desconhecido');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const authStatus = localStorage.getItem('admin_authenticated');
    if (authStatus === 'true') {
      setIsAuthenticated(true);
      fetchPendingProviders();
    } else {
      setLoading(false);
    }
  }, []);

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
    fetchPendingProviders();
  };

  const handleLogout = () => {
    localStorage.removeItem('admin_authenticated');
    localStorage.removeItem('admin_login_time');
    setIsAuthenticated(false);
    navigate('/');
  };

  if (!isAuthenticated) {
    return <AdminLogin onLoginSuccess={handleLoginSuccess} />;
  }

  const handleApprove = async (id: string) => {
    setProcessingId(id);
    try {
      const response = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-c824edb8/providers/${id}/approve`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`
        }
      });

      if (!response.ok) {
        throw new Error('Falha ao aprovar o serviço');
      }

      setProviders(prev => prev.filter(p => p.id !== id));
    } catch (err) {
      console.error(err);
      alert(err instanceof Error ? err.message : 'Erro ao aprovar');
    } finally {
      setProcessingId(null);
    }
  };

  const handleReject = async (id: string) => {
    if (!window.confirm('Tem certeza que deseja rejeitar este cadastro?')) {
      return;
    }

    setProcessingId(id);
    try {
      const response = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-c824edb8/providers/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`
        }
      });

      if (!response.ok) {
        throw new Error('Falha ao rejeitar o serviço');
      }

      setProviders(prev => prev.filter(p => p.id !== id));
    } catch (err) {
      console.error(err);
      alert(err instanceof Error ? err.message : 'Erro ao rejeitar');
    } finally {
      setProcessingId(null);
    }
  };

  return (
    <div className="h-full flex flex-col bg-gray-50 absolute inset-0 z-50">
      <header className="bg-white shadow-sm z-10 px-4 py-3 pt-[calc(0.75rem+env(safe-area-inset-top))] flex items-center justify-between shrink-0">
        <div className="flex items-center">
          <button
            onClick={() => navigate(-1)}
            className="p-2 -ml-2 text-gray-600 hover:bg-gray-100 rounded-full transition-colors mr-2"
          >
            <ArrowLeft size={24} />
          </button>
          <div className="flex items-center gap-2">
            <Shield size={20} className="text-blue-600" />
            <h1 className="font-bold text-lg text-gray-800">Painel do Administrador</h1>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="p-2 text-red-600 hover:bg-red-50 rounded-full transition-colors"
          title="Sair"
        >
          <LogOut size={20} />
        </button>
      </header>

      <div className="flex-1 overflow-y-auto p-4">
        <div className="max-w-4xl mx-auto">
          {/* Admin Info Banner */}
          <div className="mb-6 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-4 text-white shadow-lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                  <Shield size={24} />
                </div>
                <div>
                  <p className="font-bold text-lg">Bem-vindo, Administrador</p>
                  <p className="text-blue-100 text-sm">Sessão ativa • Acesso total ao sistema</p>
                </div>
              </div>
              <div className="hidden sm:block text-right">
                <p className="text-xs text-blue-100">Logado como</p>
                <p className="font-semibold">admin</p>
              </div>
            </div>
          </div>

          {/* Statistics Cards */}
          {!loading && !error && (
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-white rounded-2xl p-5 border border-gray-200 shadow-sm">
                <div className="flex items-center justify-between mb-2">
                  <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center">
                    <Clock size={20} className="text-orange-600" />
                  </div>
                </div>
                <p className="text-gray-600 text-sm mb-1">Pendentes</p>
                <p className="text-3xl font-bold text-gray-900">{providers.length}</p>
              </div>

              <div className="bg-white rounded-2xl p-5 border border-gray-200 shadow-sm">
                <div className="flex items-center justify-between mb-2">
                  <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                    <CheckCircle size={20} className="text-green-600" />
                  </div>
                </div>
                <p className="text-gray-600 text-sm mb-1">Aprovados</p>
                <p className="text-3xl font-bold text-gray-900">{approvedCount}</p>
              </div>
            </div>
          )}

          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Solicitações Pendentes</h2>
            <p className="text-gray-600 text-sm">
              Analise e aprove novos prestadores de serviço para aparecerem no mapa.
            </p>
          </div>

          {loading ? (
            <div className="flex flex-col items-center justify-center py-12">
              <Loader2 size={40} className="text-blue-600 animate-spin mb-4" />
              <p className="text-gray-600">Carregando solicitações...</p>
            </div>
          ) : error ? (
            <div className="bg-red-50 border border-red-200 rounded-2xl p-6 flex items-start gap-3">
              <AlertCircle size={24} className="text-red-600 shrink-0 mt-0.5" />
              <div>
                <h3 className="font-bold text-red-900 mb-1">Erro ao carregar</h3>
                <p className="text-red-700 text-sm">{error}</p>
                <button
                  onClick={fetchPendingProviders}
                  className="mt-3 text-sm text-red-600 font-medium hover:underline"
                >
                  Tentar novamente
                </button>
              </div>
            </div>
          ) : providers.length === 0 ? (
            <div className="bg-white border border-gray-200 rounded-2xl p-12 text-center">
              <CheckCircle size={48} className="text-green-500 mx-auto mb-4" />
              <h3 className="font-bold text-gray-900 mb-2 text-lg">Tudo em dia!</h3>
              <p className="text-gray-600 text-sm">
                Não há solicitações pendentes no momento.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {providers.map(provider => {
                const config = serviceTypeMap[provider.type as keyof typeof serviceTypeMap];
                const Icon = config?.icon;
                const isProcessing = processingId === provider.id;

                return (
                  <div key={provider.id} className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
                    <div className="flex items-start gap-4 mb-4">
                      {Icon && (
                        <div className={`w-12 h-12 rounded-xl ${config.bg} ${config.color} flex items-center justify-center shrink-0`}>
                          <Icon size={24} />
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-lg text-gray-900 mb-1">{provider.name}</h3>
                        <p className="text-sm text-gray-600 mb-2">{config?.label || provider.type}</p>
                        <p className="text-xs text-gray-500">
                          Cadastrado em {new Date(provider.createdAt).toLocaleDateString('pt-BR')} às {new Date(provider.createdAt).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
                        </p>
                      </div>
                    </div>

                    {provider.description && (
                      <p className="text-sm text-gray-700 mb-4 leading-relaxed">{provider.description}</p>
                    )}

                    <div className="space-y-2 mb-4 bg-gray-50 rounded-xl p-3 border border-gray-100">
                      <div className="flex items-start gap-2 text-sm">
                        <MapPin size={16} className="text-gray-400 shrink-0 mt-0.5" />
                        <span className="text-gray-700">{provider.address}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Clock size={16} className="text-gray-400 shrink-0" />
                        <span className="text-gray-700">{provider.hours}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Phone size={16} className="text-gray-400 shrink-0" />
                        <span className="text-gray-700">{provider.whatsapp}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <MapPin size={16} className="text-gray-400 shrink-0" />
                        <span className="text-gray-700 font-mono text-xs">
                          {provider.lat.toFixed(6)}, {provider.lng.toFixed(6)}
                        </span>
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <button
                        onClick={() => handleApprove(provider.id)}
                        disabled={isProcessing}
                        className="flex-1 bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white font-semibold py-3 rounded-xl transition-colors flex items-center justify-center gap-2"
                      >
                        {isProcessing ? (
                          <Loader2 size={18} className="animate-spin" />
                        ) : (
                          <CheckCircle size={18} />
                        )}
                        <span>Aprovar</span>
                      </button>
                      <button
                        onClick={() => handleReject(provider.id)}
                        disabled={isProcessing}
                        className="flex-1 bg-red-600 hover:bg-red-700 disabled:bg-red-400 text-white font-semibold py-3 rounded-xl transition-colors flex items-center justify-center gap-2"
                      >
                        <XCircle size={18} />
                        <span>Rejeitar</span>
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
