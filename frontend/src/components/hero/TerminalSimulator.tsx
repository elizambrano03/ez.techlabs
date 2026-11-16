import React, { useState } from 'react';
import { Terminal, Copy, Check, Play } from 'lucide-react';

export const TerminalSimulator: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'python' | 'order' | 'deploy'>('order');
  const [copied, setCopied] = useState(false);

  const pythonCode = `# ez_pipeline.py — Automatización EZ Techlabs
from ez_engine import Database, WhatsAppNotifier

db = Database.connect("postgresql://ez_zulia@cluster")
orders = db.query("SELECT * FROM pedidos WHERE estado = 'PENDIENTE'")

for order in orders:
    total = order.calculate_total(tax=0.16)
    WhatsAppNotifier.send_receipt(
        phone=order.client_phone,
        message=f"¡Hola! Tu orden #{order.id} fue confirmada por {total}$"
    )
    order.mark_as_processed()
print("✓ Pipeline ejecutado en 0.04s. 0 fallas.")`;

  const orderJson = `{
  "origen": "Catalogo_Digital_EZ",
  "cliente": "Inversiones Maracaibo C.A.",
  "contacto": "+58 414 604 0010",
  "ubicacion": "Maracaibo, Estado Zulia",
  "servicio": "Pack Perfil Pro ($15) + Web Landing",
  "compromiso": "50% Anticipo / 50% Contra Entrega",
  "estado": "CONFIRMADO_Y_EN_PRODUCCION",
  "entrega_estimada": "48 Horas",
  "soporte": "Monitoreo 24/7 Activo"
}`;

  const deployLog = `[EZ-BUILD] Python 3.12 + Django 5 + React 18
[00:01.02] Validando tipos TypeScript y esquemas SQL... OK
[00:01.18] Comprimiendo assets estáticos con Brotli / WhiteNoise... OK
[00:01.34] Verificando cabeceras de seguridad CSP & rate-limiting... OK
[00:01.40] Servidor desplegado en nodo regional Zulia - Latencia: 18ms
[SYS-READY] Status 200 OK • Rendimiento Lighthouse: 99/100`;

  const handleCopy = () => {
    const textToCopy = activeTab === 'python' ? pythonCode : activeTab === 'order' ? orderJson : deployLog;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full rounded-2xl overflow-hidden glass-panel border border-ez-border shadow-2xl relative">
      
      {/* Terminal Titlebar */}
      <div className="flex items-center justify-between px-4 py-3 bg-[#0f171a] border-b border-ez-border/80">
        <div className="flex items-center space-x-2">
          <div className="flex space-x-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
            <div className="w-3 h-3 rounded-full bg-ez-neon/80"></div>
          </div>
          <div className="flex items-center space-x-1.5 ml-3 px-2 py-0.5 rounded bg-black/40 text-[11px] font-mono text-ez-muted">
            <Terminal className="w-3 h-3 text-ez-neon" />
            <span>bash • ez-core-server</span>
          </div>
        </div>

        {/* Tab Switchers */}
        <div className="flex items-center space-x-1">
          <button
            onClick={() => setActiveTab('order')}
            className={`px-2.5 py-1 text-[11px] font-mono rounded transition-colors ${
              activeTab === 'order' 
                ? 'bg-ez-panel text-ez-neon font-bold border border-ez-neon/30' 
                : 'text-ez-muted hover:text-ez-text'
            }`}
          >
            pedido_whatsapp.json
          </button>
          <button
            onClick={() => setActiveTab('python')}
            className={`px-2.5 py-1 text-[11px] font-mono rounded transition-colors ${
              activeTab === 'python' 
                ? 'bg-ez-panel text-ez-neon font-bold border border-ez-neon/30' 
                : 'text-ez-muted hover:text-ez-text'
            }`}
          >
            automatizacion.py
          </button>
          <button
            onClick={() => setActiveTab('deploy')}
            className={`px-2.5 py-1 text-[11px] font-mono rounded transition-colors ${
              activeTab === 'deploy' 
                ? 'bg-ez-panel text-ez-neon font-bold border border-ez-neon/30' 
                : 'text-ez-muted hover:text-ez-text'
            }`}
          >
            deploy.log
          </button>
          <button
            onClick={handleCopy}
            className="p-1.5 text-ez-muted hover:text-ez-neon rounded hover:bg-white/5 transition-colors ml-1"
            title="Copiar código"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-ez-neon" /> : <Copy className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* Code Editor Body */}
      <div className="p-4 sm:p-5 font-mono text-xs sm:text-[13px] leading-relaxed bg-[#0a0f11]/90 overflow-x-auto min-h-[220px]">
        {activeTab === 'order' && (
          <pre className="text-ez-muted">
            <code>
              <span className="text-ez-text/60">{`// Estructura de pedido recibida en WhatsApp API`}</span>
              <br />
              <span className="text-ez-text">{orderJson.split('\n').map((line, idx) => {
                if (line.includes('"Pack Perfil Pro ($15)"')) {
                  return <span key={idx} className="text-ez-neon font-bold block">{line}</span>;
                }
                if (line.includes('"CONFIRMADO_Y_EN_PRODUCCION"') || line.includes('"Monitoreo 24/7 Activo"')) {
                  return <span key={idx} className="text-[#8cd90a] block">{line}</span>;
                }
                if (line.includes('"50% Anticipo')) {
                  return <span key={idx} className="text-amber-400 block">{line}</span>;
                }
                return <span key={idx} className="block">{line}</span>;
              })}</span>
            </code>
          </pre>
        )}

        {activeTab === 'python' && (
          <pre className="text-ez-muted">
            <code>
              {pythonCode.split('\n').map((line, idx) => {
                if (line.startsWith('#')) return <span key={idx} className="text-ez-text/40 block">{line}</span>;
                if (line.startsWith('from') || line.startsWith('import') || line.startsWith('for') || line.startsWith('print')) {
                  return <span key={idx} className="text-ez-neon block">{line}</span>;
                }
                return <span key={idx} className="block">{line}</span>;
              })}
            </code>
          </pre>
        )}

        {activeTab === 'deploy' && (
          <pre className="text-ez-muted font-mono">
            <code>
              {deployLog.split('\n').map((line, idx) => (
                <div key={idx} className="flex items-center space-x-2 py-0.5">
                  <Play className="w-2.5 h-2.5 text-ez-neon flex-shrink-0" />
                  <span className={line.includes('99/100') || line.includes('OK') ? 'text-ez-neon font-bold' : 'text-ez-text/80'}>
                    {line}
                  </span>
                </div>
              ))}
            </code>
          </pre>
        )}
      </div>

      {/* Terminal Footer Status Bar */}
      <div className="flex items-center justify-between px-4 py-2 bg-[#0d1417] border-t border-ez-border text-[11px] font-mono text-ez-muted">
        <div className="flex items-center space-x-3">
          <span className="flex items-center space-x-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-ez-neon"></span>
            <span>PY 3.12</span>
          </span>
          <span>UTF-8</span>
          <span className="hidden sm:inline">MARACAIBO - ZULIA [10.64° N, 71.61° W]</span>
        </div>
        <div className="text-ez-neon font-bold">
          LATENCIA: 18ms
        </div>
      </div>

    </div>
  );
};
