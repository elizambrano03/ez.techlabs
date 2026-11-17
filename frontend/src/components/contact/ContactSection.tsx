import React, { useState } from 'react';
import { Send, CheckCircle2, AlertCircle, MessageSquare, MapPin, Phone, Clock, ArrowUpRight, ShieldCheck } from 'lucide-react';
import { InstagramIcon } from '../ui/InstagramIcon';
import type { SiteConfig, LeadSubmission } from '../../types';
import { api } from '../../services/api';

interface ContactSectionProps {
  config: SiteConfig;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ config }) => {
  const [formData, setFormData] = useState<LeadSubmission>({
    full_name: '',
    business_name: '',
    email: '',
    phone: '',
    service_interest: 'WEB',
    budget_range: '$100 - $300',
    message: '',
    honey_trap: '', // Anti-spam trap
  });

  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errorMsg) setErrorMsg(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMsg(null);
    setErrorMsg(null);

    try {
      const res = await api.submitLead(formData);
      setSuccessMsg(res.message || "¡Mensaje recibido con éxito! Te contactaremos a la brevedad.");
      setFormData({
        full_name: '',
        business_name: '',
        email: '',
        phone: '',
        service_interest: 'PACK_PRO',
        budget_range: '$15 - $200',
        message: '',
        honey_trap: '',
      });
    } catch (err: any) {
      setErrorMsg(err.message || "No pudimos enviar tu mensaje. Por favor intenta de nuevo o escríbenos directamente a WhatsApp.");
    } finally {
      setLoading(false);
    }
  };

  const whatsappDirectUrl = `https://wa.me/${config.whatsapp_raw}?text=${encodeURIComponent(
    `Hola EZ Techlabs, quiero cotizar un proyecto. Mi nombre es ${formData.full_name || 'un cliente interesado'}.`
  )}`;

  return (
    <section id="contacto" className="py-16 sm:py-24 bg-ez-bg relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Direct Contact Details & Info (5 cols) */}
          <div className="lg:col-span-5">
            <div className="flex items-center space-x-2 text-xs font-mono text-ez-neon uppercase tracking-wider mb-3">
              <span className="w-2 h-2 rounded-full bg-ez-neon"></span>
              <span>CANALES OFICIALES & COTIZACIÓN</span>
            </div>
            
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-extrabold text-ez-text tracking-tight mb-6">
              Hablemos de tu <span className="text-ez-neon">proyecto</span>.
            </h2>

            <p className="text-ez-muted text-sm sm:text-base leading-relaxed mb-8">
              Cuéntanos qué necesitas y te responderemos con una propuesta técnica detallada, presupuesto cerrado y fecha estimada de entrega.
            </p>

            {/* Direct Cards */}
            <div className="space-y-4 mb-8">
              
              {/* WhatsApp Card */}
              <a
                href={`https://wa.me/${config.whatsapp_raw}?text=${encodeURIComponent(config.whatsapp_welcome_message)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-4 rounded-xl glass-panel hover:border-ez-neon/50 transition-all duration-200 group"
              >
                <div className="flex items-center space-x-3.5">
                  <div className="w-10 h-10 rounded-lg bg-ez-neon/10 border border-ez-neon/30 flex items-center justify-center text-ez-neon group-hover:scale-110 transition-transform">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-mono text-ez-muted block">WHATSAPP OFICIAL (VENTAS & SOPORTE)</span>
                    <span className="text-sm sm:text-base font-bold text-ez-text group-hover:text-ez-neon transition-colors">
                      {config.whatsapp_number}
                    </span>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-ez-muted group-hover:text-ez-neon transition-colors" />
              </a>

              {/* Instagram Card */}
              <a
                href={config.instagram_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-4 rounded-xl glass-panel hover:border-ez-neon/50 transition-all duration-200 group"
              >
                <div className="flex items-center space-x-3.5">
                  <div className="w-10 h-10 rounded-lg bg-ez-panel border border-ez-border flex items-center justify-center text-ez-text group-hover:scale-110 transition-transform">
                    <InstagramIcon className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-mono text-ez-muted block">INSTAGRAM OFICIAL</span>
                    <span className="text-sm sm:text-base font-bold text-ez-text group-hover:text-ez-neon transition-colors">
                      {config.instagram_handle}
                    </span>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-ez-muted group-hover:text-ez-neon transition-colors" />
              </a>

              {/* Location Card */}
              <div className="flex items-center space-x-3.5 p-4 rounded-xl glass-panel">
                <div className="w-10 h-10 rounded-lg bg-ez-panel border border-ez-border flex items-center justify-center text-ez-neon flex-shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-mono text-ez-muted block">SEDE Y ATENCIÓN PRESENCIAL</span>
                  <span className="text-xs sm:text-sm font-semibold text-ez-text block">
                    Maracaibo, Estado Zulia, Venezuela
                  </span>
                  <span className="text-[11px] font-mono text-ez-muted">
                    Atención remota activa para cualquier país
                  </span>
                </div>
              </div>

              {/* Hours Card */}
              <div className="flex items-center space-x-3.5 p-4 rounded-xl glass-panel">
                <div className="w-10 h-10 rounded-lg bg-ez-panel border border-ez-border flex items-center justify-center text-ez-neon flex-shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-mono text-ez-muted block">HORARIO DE RESPUESTA</span>
                  <span className="text-xs sm:text-sm font-semibold text-ez-text block">
                    Monitoreo y soporte técnico continuo 24/7
                  </span>
                </div>
              </div>

            </div>

          </div>

          {/* Right Column: Web Form (7 cols) */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl glass-panel-glow p-6 sm:p-9 border border-ez-border relative">
              
              <div className="mb-6">
                <h3 className="text-2xl font-display font-bold text-ez-text">
                  Envíanos un mensaje
                </h3>
                <p className="text-xs sm:text-sm text-ez-muted mt-1">
                  Guardado seguro en base de datos. Sin intermediarios.
                </p>
              </div>

              {/* Success Notification */}
              {successMsg && (
                <div className="mb-6 p-4 rounded-xl bg-ez-neon/15 border border-ez-neon text-ez-text text-sm flex items-start space-x-3">
                  <CheckCircle2 className="w-5 h-5 text-ez-neon flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-ez-neon font-bold">¡Mensaje Enviado!</strong>
                    <span>{successMsg}</span>
                  </div>
                </div>
              )}

              {/* Error Notification */}
              {errorMsg && (
                <div className="mb-6 p-4 rounded-xl bg-red-500/15 border border-red-500 text-ez-text text-sm flex items-start space-x-3">
                  <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-red-400 font-bold">Error al enviar</strong>
                    <span>{errorMsg}</span>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                
                {/* Honeypot field (hidden from genuine users, traps bots) */}
                <input
                  type="text"
                  name="honey_trap"
                  value={formData.honey_trap}
                  onChange={handleChange}
                  tabIndex={-1}
                  autoComplete="off"
                  className="hidden"
                  aria-hidden="true"
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Full Name */}
                  <div>
                    <label className="block text-xs font-mono text-ez-muted mb-1.5 uppercase">
                      Nombre y Apellido *
                    </label>
                    <input
                      type="text"
                      name="full_name"
                      required
                      value={formData.full_name}
                      onChange={handleChange}
                      placeholder="Ej: Carlos Mendoza"
                      className="w-full px-4 py-3 rounded-xl bg-[#090e10] border border-ez-border text-ez-text placeholder-ez-muted/40 text-base sm:text-sm focus:outline-none focus:border-ez-neon focus:ring-1 focus:ring-ez-neon transition-colors"
                    />
                  </div>

                  {/* Business Name */}
                  <div>
                    <label className="block text-xs font-mono text-ez-muted mb-1.5 uppercase">
                      Nombre del Negocio / Empresa
                    </label>
                    <input
                      type="text"
                      name="business_name"
                      value={formData.business_name}
                      onChange={handleChange}
                      placeholder="Ej: Inversiones El Lago"
                      className="w-full px-4 py-3 rounded-xl bg-[#090e10] border border-ez-border text-ez-text placeholder-ez-muted/40 text-base sm:text-sm focus:outline-none focus:border-ez-neon focus:ring-1 focus:ring-ez-neon transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Email */}
                  <div>
                    <label className="block text-xs font-mono text-ez-muted mb-1.5 uppercase">
                      Correo Electrónico *
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="carlos@gmail.com"
                      className="w-full px-4 py-3 rounded-xl bg-[#090e10] border border-ez-border text-ez-text placeholder-ez-muted/40 text-base sm:text-sm focus:outline-none focus:border-ez-neon focus:ring-1 focus:ring-ez-neon transition-colors"
                    />
                  </div>

                  {/* Phone / WhatsApp */}
                  <div>
                    <label className="block text-xs font-mono text-ez-muted mb-1.5 uppercase">
                      Teléfono / WhatsApp *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+58 414 123 4567"
                      className="w-full px-4 py-3 rounded-xl bg-[#090e10] border border-ez-border text-ez-text placeholder-ez-muted/40 text-base sm:text-sm focus:outline-none focus:border-ez-neon focus:ring-1 focus:ring-ez-neon transition-colors"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Service Interest */}
                  <div>
                    <label className="block text-xs font-mono text-ez-muted mb-1.5 uppercase">
                      Servicio de Interés
                    </label>
                    <select
                      name="service_interest"
                      value={formData.service_interest}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl bg-[#090e10] border border-ez-border text-ez-text text-base sm:text-sm focus:outline-none focus:border-ez-neon focus:ring-1 focus:ring-ez-neon transition-colors"
                    >
                      <option value="WEB">Página Web o Landing Page</option>
                      <option value="CATALOG">Catálogo Digital con WhatsApp</option>
                      <option value="PACK_PRO">Pack Perfil Pro ($15)</option>
                      <option value="SOFTWARE">Software a Medida / Python</option>
                      <option value="DATABASE">Bases de Datos & Automatización</option>
                      <option value="MARKETING">Marketing & Identidad Visual</option>
                      <option value="OTRO">Soporte Técnico / Otro Servicio</option>
                    </select>
                  </div>

                  {/* Budget */}
                  <div>
                    <label className="block text-xs font-mono text-ez-muted mb-1.5 uppercase">
                      Rango Estimado
                    </label>
                    <select
                      name="budget_range"
                      value={formData.budget_range}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl bg-[#090e10] border border-ez-border text-ez-text text-base sm:text-sm focus:outline-none focus:border-ez-neon focus:ring-1 focus:ring-ez-neon transition-colors"
                    >
                      <option value="$100 - $300">$100 - $300 (Web / Catálogo)</option>
                      <option value="15$">15$ (Pack Perfil Pro)</option>
                      <option value="$300 - $800">$300 - $800 (Sistema a Medida)</option>
                      <option value="+$800">+$800 (Plataforma Completa)</option>
                      <option value="Por definir">Por definir / Asesoría previa</option>
                    </select>
                  </div>
                </div>

                {/* Message */}
                <div>
                  <label className="block text-xs font-mono text-ez-muted mb-1.5 uppercase">
                    Detalles de lo que necesitas *
                  </label>
                  <textarea
                    name="message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Cuéntanos brevemente sobre tu negocio, qué productos o servicios ofreces y qué objetivo quieres lograr..."
                    className="w-full px-4 py-3 rounded-xl bg-[#090e10] border border-ez-border text-ez-text placeholder-ez-muted/40 text-base sm:text-sm focus:outline-none focus:border-ez-neon focus:ring-1 focus:ring-ez-neon transition-colors"
                  ></textarea>
                </div>

                {/* Action Buttons */}
                <div className="pt-2 flex flex-col sm:flex-row gap-3">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full sm:flex-1 py-3.5 px-6 rounded-xl bg-ez-neon text-ez-bg font-display font-bold text-xs uppercase tracking-wider hover:bg-ez-neon/90 shadow-neon transition-all flex items-center justify-center space-x-2 disabled:opacity-50"
                  >
                    <Send className="w-4 h-4" />
                    <span>{loading ? 'Enviando mensaje...' : 'Enviar Solicitud'}</span>
                  </button>

                  <a
                    href={whatsappDirectUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto py-3.5 px-5 rounded-xl glass-panel hover:bg-white/5 text-ez-text font-mono text-xs uppercase tracking-wider border border-ez-border flex items-center justify-center space-x-2 transition-colors"
                  >
                    <MessageSquare className="w-4 h-4 text-ez-neon" />
                    <span>WhatsApp Inmediato</span>
                  </a>
                </div>

                <div className="text-[11px] font-mono text-ez-muted text-center pt-2 flex items-center justify-center space-x-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-ez-neon flex-shrink-0" />
                  <span>Tus datos están protegidos bajo estricta confidencialidad. Cero spam.</span>
                </div>

              </form>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
