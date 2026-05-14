import React, { useState, useEffect } from 'react';
import { User, Bell, Shield, CircleHelp, LogOut, Store, UserCog, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router';

export function OptionsView() {
  const navigate = useNavigate();
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);

  useEffect(() => {
    const checkAdminAuth = () => {
      const authStatus = localStorage.getItem('admin_authenticated');
      setIsAdminLoggedIn(authStatus === 'true');
    };

    checkAdminAuth();

    // Listen for storage changes
    window.addEventListener('storage', checkAdminAuth);
    return () => window.removeEventListener('storage', checkAdminAuth);
  }, []);

  return (
    <div className="h-full bg-gray-50 flex flex-col">
      <div className="p-6 bg-white border-b border-gray-200">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
            <User size={32} />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">Motorista</h2>
            <p className="text-sm text-gray-500">Editar perfil</p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        {/* Banner Cadastro Parceiro */}
        <button 
          onClick={() => navigate('/cadastro-prestador')}
          className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-5 mb-6 text-left relative overflow-hidden shadow-md hover:shadow-lg transition-shadow"
        >
          <div className="relative z-10">
            <h3 className="text-white font-bold text-lg mb-1">É prestador de serviço?</h3>
            <p className="text-blue-100 text-sm mb-3">Cadastre sua oficina ou reboque e atraia mais clientes.</p>
            <div className="inline-flex items-center gap-2 bg-white/20 px-3 py-1.5 rounded-lg text-white text-sm font-medium backdrop-blur-sm">
              <Store size={16} />
              Cadastrar agora
            </div>
          </div>
          <Store size={80} className="absolute -right-4 -bottom-4 text-white/10" />
        </button>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-4">
          <button
            onClick={() => navigate('/admin')}
            className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-0"
          >
            <div className="flex items-center gap-3 text-gray-700">
              <UserCog size={20} className="text-blue-600" />
              <span className="font-medium">Painel do Administrador</span>
            </div>
            {isAdminLoggedIn && (
              <div className="flex items-center gap-1 bg-green-100 text-green-700 px-2 py-1 rounded-lg text-xs font-medium">
                <CheckCircle size={12} />
                <span>Logado</span>
              </div>
            )}
          </button>
          <button className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-0">
            <div className="flex items-center gap-3 text-gray-700">
              <Bell size={20} className="text-gray-400" />
              <span className="font-medium">Notificações</span>
            </div>
          </button>
          <button className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-0">
            <div className="flex items-center gap-3 text-gray-700">
              <Shield size={20} className="text-gray-400" />
              <span className="font-medium">Privacidade e Segurança</span>
            </div>
          </button>
          <button className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-0">
            <div className="flex items-center gap-3 text-gray-700">
              <CircleHelp size={20} className="text-gray-400" />
              <span className="font-medium">Ajuda e Suporte</span>
            </div>
          </button>
        </div>

        <button className="w-full bg-red-50 text-red-600 font-medium py-4 rounded-2xl flex items-center justify-center gap-2 mt-6">
          <LogOut size={20} />
          <span>Sair da conta</span>
        </button>
      </div>
    </div>
  );
}
