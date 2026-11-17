import React, { useState } from 'react';
import { Terminal, Copy, Check } from 'lucide-react';

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
        message=f"¡Hola! Tu orden #{order.id} fue confirmada exitosamente"
    )
    order.mark_as_processed()
print("[OK] Pipeline ejecutado en 0.04s. Cero fallas.")`;

  const orderJson = `{
  "origen": "Catalogo_Digital_EZ",
  "cliente": "Inversiones Maracaibo C.A.",
  "contacto": "+58 414 604 0010",
  "ubicacion": "Maracaibo, Estado Zulia",
  "servicio": "Sitio Web Corporativo + Catálogo WhatsApp",
  "compromiso": "50% Anticipo / 50% Contra Entrega",
  "estado": "CONFIRMADO_Y_EN_PRODUCCION",
  "entrega_estimada": "5 Días Hábiles",
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
      <div className="flex items-center justify-between px-3 sm:px-4 py-2.5 sm:py-3 bg-[#0f171a] border-b border-ez-border/80">
        <div className="flex items-center space-x-2">
          <div className="flex space-x-1.5">
            <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-red-500/80"></div>
            <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-yellow-500/80"></div>
            <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-ez-neon/80"></div>
          </div>
          <div className="hidden xs:flex items-center space-x-1.5 ml-2 sm:ml-3 px-2 py-0.5 rounded bg-black/40 text-[10px] sm:text-[11px] font-mono text-ez-muted">
            <Terminal className="w-3 h-3 text-ez-neon" />
            <span>bash • ez-server</span>
          </div>
        </div>

        {/* Tab Switchers - Horizontal scroll on mobile */}
        <div className="flex items-center space-x-1 overflow-x-auto no-scrollbar max-w-[200px] xs:max-w-none">
          <button
            onClick={() => setActiveTab('order')}
            className={`px-2 sm:px-2.5 py-1 text-[10px] sm:text-[11px] font-mono rounded whitespace-nowrap transition-colors ${
              activeTab === 'order' 
                ? 'bg-ez-panel text-ez-neon font-bold border border-ez-neon/30' 
                : 'text-ez-muted hover:text-ez-text'
            }`}
          >
            pedido.json
          </button>
          <button
            onClick={() => setActiveTab('python')}
            className={`px-2 sm:px-2.5 py-1 text-[10px] sm:text-[11px] font-mono rounded whitespace-nowrap transition-colors ${
              activeTab === 'python' 
                ? 'bg-ez-panel text-ez-neon font-bold border border-ez-neon/30' 
                : 'text-ez-muted hover:text-ez-text'
            }`}
          >
            automatizacion.py
          </button>
          <button
            onClick={() => setActiveTab('deploy')}
            className={`px-2 sm:px-2.5 py-1 text-[10px] sm:text-[11px] font-mono rounded whitespace-nowrap transition-colors ${
              activeTab === 'deploy' 
                ? 'bg-ez-panel text-ez-neon font-bold border border-ez-neon/30' 
                : 'text-ez-muted hover:text-ez-text'
            }`}
          >
            deploy.log
          </button>
          <button
            onClick={handleCopy}
            className="p-1 sm:p-1.5 text-ez-muted hover:text-ez-neon rounded hover:bg-white/5 transition-colors ml-1 flex-shrink-0"
            title="Copiar contenido"
            aria-label="Copiar código al portapapeles"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-ez-neon" /> : <Copy className="w-3.5 h-3.5" />}
          </button>
        </div>
      </div>

      {/* Terminal Body */}
      <div className="p-3.5 sm:p-5 font-mono text-[11px] sm:text-xs md:text-sm bg-[#080d0e]/95 overflow-x-auto max-h-[280px] sm:max-h-[340px] leading-relaxed">
        {activeTab === 'python' && (
          <pre className="text-ez-text/90">
            <code>
              <span className="text-ez-muted">{pythonCode.split('\n')[0]}</span>{'\n'}
              <span className="text-purple-400">from</span> ez_engine <span className="text-purple-400">import</span> Database, WhatsAppNotifier{'\n\n'}
              db = Database.connect(<span className="text-green-400">"postgresql://ez_zulia@cluster"</span>){'\n'}
              orders = db.query(<span className="text-green-400">"SELECT * FROM pedidos WHERE estado = 'PENDIENTE'"</span>){'\n\n'}
              <span className="text-purple-400">for</span> order <span className="text-purple-400">in</span> orders:{'\n'}
              {'    '}total = order.calculate_total(tax=<span className="text-amber-400">0.16</span>){'\n'}
              {'    '}WhatsAppNotifier.send_receipt({'\n'}
              {'        '}phone=order.client_phone,{'\n'}
              {'        '}message=<span className="text-green-400">f"¡Hola! Tu orden #{'{'}order.id{'}'} fue confirmada exitosamente"</span>{'\n'}
              {'    '}){'\n'}
              {'    '}order.mark_as_processed(){'\n'}
              <span className="text-ez-neon font-bold">print(<span className="text-green-400">"[OK] Pipeline ejecutado en 0.04s. Cero fallas."</span>)</span>
            </code>
          </pre>
        )}

        {activeTab === 'order' && (
          <pre className="text-ez-text/90">
            <code>
              {orderJson}
            </code>
          </pre>
        )}

        {activeTab === 'deploy' && (
          <pre className="text-ez-text/90">
            <code>
              <span className="text-ez-neon font-bold">[EZ-BUILD] Python 3.12 + Django 5 + React 18</span>{'\n'}
              <span className="text-ez-muted">[00:01.02] Validando tipos TypeScript y esquemas SQL...</span> <span className="text-ez-neon">OK</span>{'\n'}
              <span className="text-ez-muted">[00:01.18] Comprimiendo assets con WhiteNoise / Brotli...</span> <span className="text-ez-neon">OK</span>{'\n'}
              <span className="text-ez-muted">[00:01.34] Verificando cabeceras CSP & rate-limiting...</span> <span className="text-ez-neon">OK</span>{'\n'}
              <span className="text-ez-muted">[00:01.40] Servidor desplegado en nodo regional Zulia - Latencia: 18ms</span>{'\n'}
              <span className="text-ez-neon font-bold">[SYS-READY] Status 200 OK • Rendimiento Lighthouse: 99/100</span>
            </code>
          </pre>
        )}
      </div>

      {/* Terminal Status Bar */}
      <div className="px-3 sm:px-4 py-2 bg-[#0c1316] border-t border-ez-border/60 flex items-center justify-between text-[10px] sm:text-[11px] font-mono text-ez-muted">
        <div className="flex items-center space-x-2">
          <span className="w-1.5 h-1.5 rounded-full bg-ez-neon animate-pulse"></span>
          <span>POSTGRESQL 16 • ONLINE</span>
        </div>
        <div className="flex items-center space-x-3">
          <span>UTF-8</span>
          <span className="text-ez-neon">MARACAIBO_NODE</span>
        </div>
      </div>

    </div>
  );
};
