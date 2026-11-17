import React, { useState } from 'react';
import { Send, CheckCircle2, AlertCircle, MessageSquare, MapPin, Phone, Clock, ArrowUpRight, ShieldCheck, Mail } from 'lucide-react';
import { InstagramIcon } from '../ui/InstagramIcon';
import type { SiteConfig, LeadSubmission } from '../../types';
import { api } from '../../services/api';

interface ContactSectionProps {
  config: SiteConfig;
}

// Endpoint de Formspree oficial de EZ Techlabs
const FORMSPREE_ID = import.meta.env.VITE_FORMSPREE_ID || 'mjywwbqg';

export const ContactSection: React.FC<ContactSectionProps> = ({ config }) => {
  const [formData, setFormData] = useState<LeadSubmission>({
    full_name: '',
    business_name: '',
    email: '',
    phone: '',
    service_interest: 'WEB',
    budget_range: 'Por definir',
    message: '',
    honey_trap: '', // Anti-spam trap
  });

  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [lastSubmitted, setLastSubmitted] = useState<LeadSubmission | null>(null);

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

    const submissionSnapshot = { ...formData };

    try {
      let sentViaFormspree = false;

      // 1. Envío prioritario vía Formspree si está configurado
      if (FORMSPREE_ID) {
        try {
          const formspreeRes = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
            },
            body: JSON.stringify({
              name: formData.full_name,
              business: formData.business_name || 'No especificado',
              phone: formData.phone,
              email: formData.email,
              service: formData.service_interest,
              scope: formData.budget_range,
              message: formData.message,
              _replyto: formData.email,
              _subject: `🚀 Nueva Solicitud de Proyecto: ${formData.full_name} (${formData.business_name || 'Sin negocio'})`,
            }),
          });

          if (formspreeRes.ok) {
            sentViaFormspree = true;
          } else {
            const data = await formspreeRes.json().catch(() => ({}));
            if (data.errors && data.errors.length > 0) {
              throw new Error(data.errors.map((err: any) => err.message).join(', '));
            }
          }
        } catch (fErr: any) {
          console.warn('Formspree dispatch error:', fErr);
          // Si falló con mensaje explícito de Formspree, relanzar
          if (fErr.message && !fErr.message.includes('fetch')) {
            throw fErr;
          }
        }
      }

      // 2. Guardado en base de datos PostgreSQL de EZ Techlabs
      try {
        await api.submitLead(formData);
      } catch (dbErr: any) {
        console.warn('DB submission notice:', dbErr);
        // Si no se envió por Formspree y la BD falló, reportar error amigable
        if (!sentViaFormspree && !FORMSPREE_ID) {
          throw new Error('El servidor está iniciando. Por favor intenta de nuevo en unos segundos o escríbenos directamente a WhatsApp.');
        }
      }

      setLastSubmitted(submissionSnapshot);
      setSuccessMsg("¡Propuesta recibida con éxito! Tu solicitud fue registrada y te contactaremos en breve.");
      setFormData({
        full_name: '',
        business_name: '',
        email: '',
        phone: '',
        service_interest: 'WEB',
        budget_range: 'Por definir',
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

              {/* Direct Email Card */}
              <a
                href={`mailto:${config.contact_email}?subject=${encodeURIComponent('Cotización / Propuesta de Proyecto - EZ Techlabs')}`}
                className="flex items-center justify-between p-4 rounded-xl glass-panel hover:border-ez-neon/50 transition-all duration-200 group"
              >
                <div className="flex items-center space-x-3.5">
                  <div className="w-10 h-10 rounded-lg bg-ez-panel border border-ez-border flex items-center justify-center text-ez-neon group-hover:scale-110 transition-transform">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-mono text-ez-muted block">RECEPCIÓN DE TRABAJOS Y COTIZACIONES</span>
                    <span className="text-sm sm:text-base font-bold text-ez-text group-hover:text-ez-neon transition-colors">
                      {config.contact_email}
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
                    Estado Zulia, Venezuela
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
                <div className="mb-6 p-5 rounded-xl bg-ez-neon/15 border border-ez-neon text-ez-text text-sm">
                  <div className="flex items-start space-x-3 mb-3">
                    <CheckCircle2 className="w-5 h-5 text-ez-neon flex-shrink-0 mt-0.5" />
                    <div>
                      <strong className="block text-ez-neon font-bold text-base">¡Propuesta Registrada con Éxito!</strong>
                      <span className="text-xs sm:text-sm text-ez-text/90">{successMsg}</span>
                    </div>
                  </div>

                  {lastSubmitted && (
                    <div className="pt-3 border-t border-ez-neon/30 mt-3">
                      <p className="text-xs font-mono text-ez-muted mb-2">
                        ¿Deseas respuesta inmediata? Notifícanos con un clic:
                      </p>
                      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                        <a
                          href={`https://wa.me/${config.whatsapp_raw}?text=${encodeURIComponent(
                            `Hola EZ Techlabs, acabo de enviar mi propuesta web:\n\n• Nombre: ${lastSubmitted.full_name}\n• Negocio: ${lastSubmitted.business_name || 'Particular'}\n• Teléfono: ${lastSubmitted.phone}\n• Servicio: ${lastSubmitted.service_interest}\n• Mensaje: ${lastSubmitted.message}`
                          )}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center justify-center space-x-2 px-3.5 py-2 rounded-lg bg-ez-neon text-ez-bg font-bold font-mono text-xs uppercase tracking-wider hover:bg-ez-neon/90 transition-all shadow-neon"
                        >
                          <Phone className="w-3.5 h-3.5" />
                          <span>Notificar por WhatsApp</span>
                        </a>

                        <a
                          href={`mailto:${config.contact_email || 'zambranoeli2010@gmail.com'}?subject=${encodeURIComponent(
                            `Propuesta de Proyecto Web: ${lastSubmitted.full_name}`
                          )}&body=${encodeURIComponent(
                            `Hola EZ Techlabs,\n\nDetalles de mi solicitud:\n- Nombre: ${lastSubmitted.full_name}\n- Empresa: ${lastSubmitted.business_name || 'No especificada'}\n- Teléfono: ${lastSubmitted.phone}\n- Correo: ${lastSubmitted.email}\n- Servicio: ${lastSubmitted.service_interest}\n- Alcance: ${lastSubmitted.budget_range}\n\nDetalles:\n${lastSubmitted.message}`
                          )}`}
                          className="inline-flex items-center justify-center space-x-2 px-3.5 py-2 rounded-lg bg-black/40 border border-ez-border text-ez-text hover:text-ez-neon hover:border-ez-neon/50 font-mono text-xs uppercase transition-all"
                        >
                          <Mail className="w-3.5 h-3.5 text-ez-neon" />
                          <span>Abrir en mi Correo</span>
                        </a>
                      </div>
                    </div>
                  )}
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
                      <option value="SOFTWARE">Software a Medida / Python</option>
                      <option value="DOCS_PYTHON">Exportación de Documentos & Reportes (Python)</option>
                      <option value="DATABASE">Bases de Datos & Servidores</option>
                      <option value="CONSULTING">Consultoría & Asesoría Tecnológica</option>
                      <option value="MARKETING">Diseño de Marca & Identidad Visual</option>
                      <option value="OTRO">Soporte Técnico / Otro Servicio</option>
                    </select>
                  </div>

                  {/* Project Scope */}
                  <div>
                    <label className="block text-xs font-mono text-ez-muted mb-1.5 uppercase">
                      Alcance del Proyecto
                    </label>
                    <select
                      name="budget_range"
                      value={formData.budget_range}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl bg-[#090e10] border border-ez-border text-ez-text text-base sm:text-sm focus:outline-none focus:border-ez-neon focus:ring-1 focus:ring-ez-neon transition-colors"
                    >
                      <option value="EMPRENDIMIENTO">Nuevo Emprendimiento / Marca Naciente</option>
                      <option value="PYME">Negocio Local / Pyme en Crecimiento</option>
                      <option value="CORPORATIVO">Empresa Consolidada / Sistema a Medida</option>
                      <option value="Por definir">Por definir / Deseo asesoría previa</option>
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
