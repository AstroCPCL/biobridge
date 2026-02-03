import { useState } from 'react'
import { motion } from 'framer-motion'
import { Activity, Cpu, FlaskConical, ArrowRight, Zap, GitBranch, Layers, Radio, Microscope, TrendingUp, CheckCircle2, ExternalLink, AlertTriangle, Battery, Wifi, Gauge, Droplet, Shield, Box, Lightbulb, CircuitBoard, Waypoints, Code2, Monitor, Play, Server, Database, LogOut } from 'lucide-react'

const Landing = ({ onNavigateToDashboard, onLogout }) => {
  const [activeTab, setActiveTab] = useState('overview')

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 text-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-slate-900/80 backdrop-blur-lg border-b border-slate-800 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center">
              <Activity className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-xl font-bold">BioBridge</h1>
              <p className="text-xs text-slate-400">Strategic Decoupling Point</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={onNavigateToDashboard}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors flex items-center gap-2"
            >
              Dashboard
              <ArrowRight className="w-4 h-4" />
            </button>
            {onLogout && (
              <button
                onClick={onLogout}
                className="px-4 py-2 bg-red-600/20 hover:bg-red-600/30 text-red-400 rounded-lg transition-colors flex items-center gap-2"
              >
                <LogOut className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Content */}
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-cyan-500/10 border border-cyan-500/30 rounded-full text-cyan-400 text-sm mb-6">
                <Zap className="w-4 h-4" />
                <span>Biosensor POC Platform</span>
              </div>

              <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                El Puente Entre
                <span className="block bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                  Ciencia y Datos
                </span>
              </h1>

              <p className="text-xl text-slate-300 mb-8 leading-relaxed">
                BioBridge es el <strong className="text-cyan-400">punto cero de desacople estratégico</strong> que
                conecta el desarrollo científico de bioreceptores con la plataforma digital de análisis de datos,
                permitiendo avances paralelos y reducción de riesgos.
              </p>

              <div className="flex flex-wrap gap-4">
                <button
                  onClick={() => setActiveTab('architecture')}
                  className="px-6 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 rounded-lg font-medium transition-all flex items-center gap-2"
                >
                  Explorar Arquitectura
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  disabled
                  className="px-6 py-3 bg-slate-900/50 border border-slate-800 rounded-lg font-medium text-slate-600 cursor-not-allowed flex items-center gap-2 opacity-50"
                >
                  <ExternalLink className="w-4 h-4" />
                  Documentación POC
                </button>
              </div>
            </div>

            {/* Right: Visual Bridge */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 blur-3xl rounded-full"></div>

              <div className="relative bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-2xl p-8">
                {/* Bridge Diagram */}
                <div className="flex items-center justify-between gap-4">
                  {/* Left: Science */}
                  <div className="flex-1 bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/30 rounded-xl p-6">
                    <Microscope className="w-8 h-8 text-purple-400 mb-3" />
                    <h3 className="font-bold text-sm mb-1">Equipo Científico</h3>
                    <p className="text-xs text-slate-400">Bioreceptor</p>
                    <div className="mt-4 space-y-2">
                      <div className="h-1 bg-purple-500/30 rounded"></div>
                      <div className="h-1 bg-purple-500/30 rounded w-3/4"></div>
                      <div className="h-1 bg-purple-500/30 rounded w-1/2"></div>
                    </div>
                  </div>

                  {/* Center: BioBridge */}
                  <div className="flex flex-col items-center">
                    <div className="relative">
                      <div className="absolute inset-0 bg-cyan-500/30 blur-xl rounded-full"></div>
                      <div className="relative w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center rotate-45">
                        <Layers className="w-8 h-8 -rotate-45" />
                      </div>
                    </div>
                    <p className="text-xs font-bold mt-3 text-cyan-400">BioBridge</p>
                    <p className="text-xs text-slate-500">EmStat Pico</p>
                  </div>

                  {/* Right: IT */}
                  <div className="flex-1 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-500/30 rounded-xl p-6">
                    <Cpu className="w-8 h-8 text-cyan-400 mb-3" />
                    <h3 className="font-bold text-sm mb-1">Equipo TI/Datos</h3>
                    <p className="text-xs text-slate-400">Plataforma Digital</p>
                    <div className="mt-4 space-y-2">
                      <div className="h-1 bg-cyan-500/30 rounded"></div>
                      <div className="h-1 bg-cyan-500/30 rounded w-3/4"></div>
                      <div className="h-1 bg-cyan-500/30 rounded w-1/2"></div>
                    </div>
                  </div>
                </div>

                {/* Arrows */}
                <div className="mt-6 flex items-center justify-center gap-2 text-xs text-slate-500">
                  <span>Señal Bio</span>
                  <ArrowRight className="w-4 h-4" />
                  <span className="text-cyan-400 font-bold">BioBridge</span>
                  <ArrowRight className="w-4 h-4" />
                  <span>Datos Digitales</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tab Navigation */}
      <section className="px-6 pb-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex gap-2 overflow-x-auto pb-2">
            {[
              { id: 'overview', label: 'Visión General', icon: Activity },
              { id: 'architecture', label: 'Arquitectura', icon: GitBranch },
              { id: 'technology', label: 'Tecnología', icon: Cpu },
              { id: 'technical-model', label: 'Modelo Técnico', icon: Box },
              { id: 'application', label: 'Aplicación', icon: TrendingUp },
              { id: 'roadmap', label: 'Hitos', icon: CheckCircle2 },
              { id: 'challenges', label: 'Desafíos Futuros', icon: AlertTriangle }
            ].map(tab => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white'
                      : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </button>
              )
            })}
          </div>
        </div>
      </section>

      {/* Tab Content */}
      <section className="px-6 pb-20">
        <div className="max-w-7xl mx-auto">
          {activeTab === 'overview' && <OverviewTab />}
          {activeTab === 'architecture' && <ArchitectureTab />}
          {activeTab === 'technology' && <TechnologyTab />}
          {activeTab === 'technical-model' && <TechnicalModelTab />}
          {activeTab === 'application' && <ApplicationTab />}
          {activeTab === 'roadmap' && <RoadmapTab />}
          {activeTab === 'challenges' && <ChallengesTab />}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-800 px-6 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2 text-slate-400">
              <Activity className="w-5 h-5" />
              <span className="text-sm">Nuditech Biobridge - © 2026 - Biosensor Platform</span>
            </div>
            <div className="flex gap-4 text-sm text-slate-400">
              <a href="#" className="hover:text-cyan-400 transition-colors">Documentación</a>
              <a href="#" className="hover:text-cyan-400 transition-colors">API</a>
              <a href="#" className="hover:text-cyan-400 transition-colors">Contacto</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

// Overview Tab Component
const OverviewTab = () => (
  <div className="space-y-8">
    <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-2xl p-8">
      <h2 className="text-3xl font-bold mb-6">¿Qué es BioBridge?</h2>

      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <h3 className="text-xl font-bold text-cyan-400 mb-4">El Punto Cero</h3>
          <p className="text-slate-300 leading-relaxed mb-4">
            BioBridge es el componente central que actúa como pieza neutral o de "engranaje en punto muerto"
            entre las dos mitades del proyecto.
          </p>
          <p className="text-slate-300 leading-relaxed">
            Este enfoque modular refleja las mejores prácticas de ingeniería: desacoplar componentes
            reduce interdependencias, mejora la adaptabilidad y facilita que cada parte evolucione por su cuenta.
          </p>
        </div>

        <div className="space-y-4">
          <div className="bg-gradient-to-r from-purple-500/10 to-transparent border-l-4 border-purple-500 p-4 rounded">
            <h4 className="font-bold mb-2 flex items-center gap-2">
              <Microscope className="w-5 h-5 text-purple-400" />
              Equipo Científico
            </h4>
            <p className="text-sm text-slate-400">Desarrollo del bioreceptor para detectar compuestos en sudor</p>
          </div>

          <div className="bg-gradient-to-r from-cyan-500/10 to-transparent border-l-4 border-cyan-500 p-4 rounded">
            <h4 className="font-bold mb-2 flex items-center gap-2">
              <Radio className="w-5 h-5 text-cyan-400" />
              BioBridge (EmStat Pico)
            </h4>
            <p className="text-sm text-slate-400">Convierte señal biológica en datos digitales</p>
          </div>

          <div className="bg-gradient-to-r from-blue-500/10 to-transparent border-l-4 border-blue-500 p-4 rounded">
            <h4 className="font-bold mb-2 flex items-center gap-2">
              <Cpu className="w-5 h-5 text-blue-400" />
              Equipo TI/Datos
            </h4>
            <p className="text-sm text-slate-400">Plataforma de visualización y análisis en tiempo real</p>
          </div>
        </div>
      </div>
    </div>

    {/* Benefits */}
    <div className="grid md:grid-cols-3 gap-6">
      {[
        {
          icon: GitBranch,
          title: 'Avance Paralelo',
          description: 'Los equipos trabajan simultáneamente sin dependencias diarias, evitando cuellos de botella.'
        },
        {
          icon: Zap,
          title: 'Reducción de Riesgos',
          description: 'El componente comercial probado disminuye el riesgo tecnológico en el centro del sistema.'
        },
        {
          icon: Layers,
          title: 'Desacople Estratégico',
          description: 'Responsabilidades claras: ciencia en el bioreceptor, TI en la plataforma digital.'
        }
      ].map((benefit, i) => {
        const Icon = benefit.icon
        return (
          <div key={i} className="bg-slate-900/50 border border-slate-800 rounded-xl p-6 hover:border-cyan-500/50 transition-colors">
            <div className="w-12 h-12 bg-gradient-to-br from-cyan-500/20 to-blue-500/20 rounded-lg flex items-center justify-center mb-4">
              <Icon className="w-6 h-6 text-cyan-400" />
            </div>
            <h3 className="text-lg font-bold mb-2">{benefit.title}</h3>
            <p className="text-slate-400 text-sm">{benefit.description}</p>
          </div>
        )
      })}
    </div>
  </div>
)

// Architecture Tab Component
const ArchitectureTab = () => (
  <div className="space-y-8">
    <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-2xl p-8">
      <h2 className="text-3xl font-bold mb-6">Arquitectura de Dos Frentes</h2>

      <p className="text-slate-300 leading-relaxed mb-8">
        La arquitectura de BioBridge está diseñada como dos frentes complementarios que convergen
        en un punto central neutral. Esta visualización representa el flujo de información desde
        el mundo biológico al mundo digital.
      </p>

      {/* Visual Architecture */}
      <div className="relative bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 border border-slate-800 rounded-xl p-12">
        {/* Background glow */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 via-cyan-500/10 to-blue-500/5 rounded-xl"></div>

        <div className="relative grid grid-cols-3 gap-8 items-center">
          {/* Left: Science Team */}
          <div className="space-y-4">
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl mb-3">
                <Microscope className="w-8 h-8" />
              </div>
              <h3 className="font-bold text-lg">Equipo Científico</h3>
              <p className="text-sm text-slate-400">Desarrollo del Bioreceptor</p>
            </div>

            <div className="space-y-3 bg-slate-900/50 border border-purple-500/30 rounded-lg p-4">
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle2 className="w-4 h-4 text-purple-400" />
                <span>Funcionalización SPE</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle2 className="w-4 h-4 text-purple-400" />
                <span>Protocolo Bioreceptor</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle2 className="w-4 h-4 text-purple-400" />
                <span>Validación Sensibilidad</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle2 className="w-4 h-4 text-purple-400" />
                <span>Pruebas con Sudor Real</span>
              </div>
            </div>

            <div className="text-center">
              <div className="inline-block bg-purple-500/20 border border-purple-500/30 rounded px-3 py-1 text-xs font-mono">
                Señal Biológica
              </div>
            </div>
          </div>

          {/* Center: BioBridge */}
          <div className="flex flex-col items-center">
            <div className="relative mb-4">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-600 blur-2xl opacity-50 rounded-full"></div>
              <div className="relative w-24 h-24 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-2xl flex items-center justify-center rotate-45 shadow-2xl">
                <div className="-rotate-45">
                  <Radio className="w-12 h-12" />
                </div>
              </div>
            </div>

            <h3 className="font-bold text-xl text-cyan-400 mb-2">BioBridge</h3>
            <p className="text-sm text-slate-400 mb-4 text-center">EmStat Pico + Raspberry Pi</p>

            <div className="bg-slate-900/80 border border-cyan-500/30 rounded-lg p-4 space-y-2">
              <div className="text-xs text-cyan-400 font-mono">• DPV/SWV Techniques</div>
              <div className="text-xs text-cyan-400 font-mono">• MethodSCRIPT</div>
              <div className="text-xs text-cyan-400 font-mono">• Serial Communication</div>
              <div className="text-xs text-cyan-400 font-mono">• Data Conversion</div>
            </div>

            {/* Arrows */}
            <div className="flex items-center gap-2 mt-4">
              <ArrowRight className="w-4 h-4 text-purple-400" />
              <span className="text-xs text-slate-500">Transducción</span>
              <ArrowRight className="w-4 h-4 text-blue-400" />
            </div>
          </div>

          {/* Right: IT Team */}
          <div className="space-y-4">
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl mb-3">
                <Cpu className="w-8 h-8" />
              </div>
              <h3 className="font-bold text-lg">Equipo TI/Datos</h3>
              <p className="text-sm text-slate-400">Plataforma de Datos & Visualización</p>
            </div>

            <div className="space-y-3 bg-slate-900/50 border border-cyan-500/30 rounded-lg p-4">
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                <span>API Backend (FastAPI)</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                <span>Database (PostgreSQL)</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                <span>Frontend (React)</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                <span>Real-time Dashboard</span>
              </div>
            </div>

            <div className="text-center">
              <div className="inline-block bg-cyan-500/20 border border-cyan-500/30 rounded px-3 py-1 text-xs font-mono">
                Datos Digitales
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    {/* Key Principles */}
    <div className="grid md:grid-cols-2 gap-6">
      <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6">
        <h3 className="text-xl font-bold mb-4">Principios de Diseño</h3>
        <ul className="space-y-3 text-slate-300">
          <li className="flex items-start gap-2">
            <CheckCircle2 className="w-5 h-5 text-cyan-400 mt-0.5 flex-shrink-0" />
            <span><strong>Modularidad:</strong> Componentes independientes que pueden evolucionar por separado</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="w-5 h-5 text-cyan-400 mt-0.5 flex-shrink-0" />
            <span><strong>Interfaz Definida:</strong> BioBridge como contrato claro entre ambos equipos</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="w-5 h-5 text-cyan-400 mt-0.5 flex-shrink-0" />
            <span><strong>Trabajo Paralelo:</strong> Sin dependencias bloqueantes entre frentes</span>
          </li>
        </ul>
      </div>

      <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6">
        <h3 className="text-xl font-bold mb-4">Ventajas del Desacople</h3>
        <ul className="space-y-3 text-slate-300">
          <li className="flex items-start gap-2">
            <Zap className="w-5 h-5 text-cyan-400 mt-0.5 flex-shrink-0" />
            <span>Reducción de riesgos de bloqueo cruzado</span>
          </li>
          <li className="flex items-start gap-2">
            <Zap className="w-5 h-5 text-cyan-400 mt-0.5 flex-shrink-0" />
            <span>Aceleración del desarrollo mediante paralelización</span>
          </li>
          <li className="flex items-start gap-2">
            <Zap className="w-5 h-5 text-cyan-400 mt-0.5 flex-shrink-0" />
            <span>Facilidad de integración final con interfaz validada</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
)

// Technology Tab Component
const TechnologyTab = () => (
  <div className="space-y-8">
    <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-2xl p-8">
      <h2 className="text-3xl font-bold mb-6">Stack Tecnológico</h2>

      <div className="grid md:grid-cols-2 gap-8 mb-12">
        {/* Hardware Stack */}
        <div>
          <h3 className="text-xl font-bold text-cyan-400 mb-4 flex items-center gap-2">
            <Cpu className="w-6 h-6" />
            Hardware
          </h3>

          <div className="space-y-4">
            <div className="bg-slate-900/80 border border-slate-700 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-bold">EmStat Pico</h4>
                <span className="text-xs bg-cyan-500/20 text-cyan-400 px-2 py-1 rounded">Core</span>
              </div>
              <p className="text-sm text-slate-400 mb-3">
                Potenciostato dual calibrado de PalmSens. Módulo OEM para mediciones electroquímicas.
              </p>
              <div className="space-y-1 text-xs text-slate-500">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3 h-3 text-cyan-400" />
                  <span>Técnicas: DPV, SWV, CV, EIS</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3 h-3 text-cyan-400" />
                  <span>MethodSCRIPT support</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3 h-3 text-cyan-400" />
                  <span>Bluetooth + Serial/USB</span>
                </div>
              </div>
            </div>

            <div className="bg-slate-900/80 border border-slate-700 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-bold">Raspberry Pi</h4>
                <span className="text-xs bg-purple-500/20 text-purple-400 px-2 py-1 rounded">Controller</span>
              </div>
              <p className="text-sm text-slate-400 mb-3">
                Microcontrolador principal para control, procesamiento y comunicación.
              </p>
              <div className="space-y-1 text-xs text-slate-500">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3 h-3 text-purple-400" />
                  <span>GPIO para sensores auxiliares</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3 h-3 text-purple-400" />
                  <span>Conectividad WiFi/Ethernet</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3 h-3 text-purple-400" />
                  <span>Fácil integración y prototipado</span>
                </div>
              </div>
            </div>

            <div className="bg-slate-900/80 border border-slate-700 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-bold">SPE (Screen-Printed Electrodes)</h4>
                <span className="text-xs bg-pink-500/20 text-pink-400 px-2 py-1 rounded">Sensor</span>
              </div>
              <p className="text-sm text-slate-400 mb-3">
                Electrodos serigrafiados funcionalizados con bioreceptor específico.
              </p>
              <div className="space-y-1 text-xs text-slate-500">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3 h-3 text-pink-400" />
                  <span>Bajo costo y descartables</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3 h-3 text-pink-400" />
                  <span>3 electrodos: WE, RE, CE</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3 h-3 text-pink-400" />
                  <span>Funcionalización personalizada</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Software Stack */}
        <div>
          <h3 className="text-xl font-bold text-blue-400 mb-4 flex items-center gap-2">
            <Layers className="w-6 h-6" />
            Software
          </h3>

          <div className="space-y-4">
            <div className="bg-slate-900/80 border border-slate-700 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-bold">PSTrace</h4>
                <span className="text-xs bg-blue-500/20 text-blue-400 px-2 py-1 rounded">Lab Tool</span>
              </div>
              <p className="text-sm text-slate-400 mb-3">
                Software de PalmSens para desarrollo y optimización de métodos en laboratorio.
              </p>
              <div className="space-y-1 text-xs text-slate-500">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3 h-3 text-blue-400" />
                  <span>GUI para ajuste de parámetros</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3 h-3 text-blue-400" />
                  <span>Exportación a MethodSCRIPT</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3 h-3 text-blue-400" />
                  <span>Visualización en tiempo real</span>
                </div>
              </div>
            </div>

            <div className="bg-slate-900/80 border border-slate-700 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-bold">Backend API</h4>
                <span className="text-xs bg-green-500/20 text-green-400 px-2 py-1 rounded">FastAPI</span>
              </div>
              <p className="text-sm text-slate-400 mb-3">
                API REST para recepción, almacenamiento y consulta de datos de sensores.
              </p>
              <div className="space-y-1 text-xs text-slate-500">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3 h-3 text-green-400" />
                  <span>Python + FastAPI</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3 h-3 text-green-400" />
                  <span>PostgreSQL database</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3 h-3 text-green-400" />
                  <span>Real-time data ingestion</span>
                </div>
              </div>
            </div>

            <div className="bg-slate-900/80 border border-slate-700 rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-bold">Frontend Dashboard</h4>
                <span className="text-xs bg-cyan-500/20 text-cyan-400 px-2 py-1 rounded">React</span>
              </div>
              <p className="text-sm text-slate-400 mb-3">
                Interfaz web para visualización y monitoreo de datos en tiempo real.
              </p>
              <div className="space-y-1 text-xs text-slate-500">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3 h-3 text-cyan-400" />
                  <span>React + Vite + Tailwind CSS</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3 h-3 text-cyan-400" />
                  <span>Recharts para visualización</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-3 h-3 text-cyan-400" />
                  <span>Auto-refresh cada 5 segundos</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Architecture Map */}
      <div className="bg-gradient-to-br from-slate-900/80 to-slate-950/80 border border-purple-500/30 rounded-xl p-8 mb-8">
        <h3 className="text-2xl font-bold mb-6 text-center flex items-center justify-center gap-3">
          <Layers className="w-7 h-7 text-purple-400" />
          Arquitectura del Sistema BioBridge
        </h3>

        <div className="space-y-8">
          {/* Layer 1: Hardware Sensors */}
          <div className="relative">
            <div className="text-center mb-3">
              <span className="text-xs font-bold text-pink-400 bg-pink-500/10 px-3 py-1 rounded-full border border-pink-500/30">
                Capa 1: Sensores & Hardware
              </span>
            </div>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-gradient-to-br from-pink-500/10 to-pink-600/5 border-2 border-pink-500/40 rounded-xl p-4 text-center">
                <div className="w-12 h-12 bg-pink-500/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <FlaskConical className="w-6 h-6 text-pink-400" />
                </div>
                <h4 className="font-bold text-pink-300 mb-1">SPE + Bioreceptor</h4>
                <p className="text-xs text-slate-400">Electrodo funcionalizado</p>
              </div>
              <div className="bg-gradient-to-br from-cyan-500/10 to-cyan-600/5 border-2 border-cyan-500/40 rounded-xl p-4 text-center">
                <div className="w-12 h-12 bg-cyan-500/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Activity className="w-6 h-6 text-cyan-400" />
                </div>
                <h4 className="font-bold text-cyan-300 mb-1">EmStat Pico</h4>
                <p className="text-xs text-slate-400">Potenciostato DPV/SWV</p>
              </div>
              <div className="bg-gradient-to-br from-purple-500/10 to-purple-600/5 border-2 border-purple-500/40 rounded-xl p-4 text-center">
                <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Cpu className="w-6 h-6 text-purple-400" />
                </div>
                <h4 className="font-bold text-purple-300 mb-1">Raspberry Pi</h4>
                <p className="text-xs text-slate-400">Controlador & Gateway</p>
              </div>
            </div>
            {/* Arrow down */}
            <div className="flex justify-center my-4">
              <div className="w-0.5 h-8 bg-gradient-to-b from-purple-500/50 to-blue-500/50"></div>
            </div>
          </div>

          {/* Layer 2: Communication Protocol */}
          <div className="relative">
            <div className="text-center mb-3">
              <span className="text-xs font-bold text-blue-400 bg-blue-500/10 px-3 py-1 rounded-full border border-blue-500/30">
                Capa 2: Protocolo de Comunicación
              </span>
            </div>
            <div className="bg-gradient-to-br from-blue-500/10 to-blue-600/5 border-2 border-blue-500/40 rounded-xl p-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <Code2 className="w-5 h-5 text-blue-400" />
                    <h4 className="font-bold text-blue-300">MethodSCRIPT</h4>
                  </div>
                  <p className="text-xs text-slate-400 mb-2">Scripts de medición exportados desde PSTrace</p>
                  <code className="text-xs bg-slate-950/50 text-green-400 p-2 rounded block">
                    e_begin → e_meas_loop → e_end
                  </code>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <Wifi className="w-5 h-5 text-blue-400" />
                    <h4 className="font-bold text-blue-300">Serial/Bluetooth</h4>
                  </div>
                  <p className="text-xs text-slate-400 mb-2">Comunicación EmStat Pico ↔ Raspberry Pi</p>
                  <code className="text-xs bg-slate-950/50 text-cyan-400 p-2 rounded block">
                    USB/UART @ 115200 baud
                  </code>
                </div>
              </div>
            </div>
            {/* Arrow down */}
            <div className="flex justify-center my-4">
              <div className="w-0.5 h-8 bg-gradient-to-b from-blue-500/50 to-green-500/50"></div>
            </div>
          </div>

          {/* Layer 3: Backend API */}
          <div className="relative">
            <div className="text-center mb-3">
              <span className="text-xs font-bold text-green-400 bg-green-500/10 px-3 py-1 rounded-full border border-green-500/30">
                Capa 3: Backend & Base de Datos
              </span>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-gradient-to-br from-green-500/10 to-green-600/5 border-2 border-green-500/40 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Server className="w-5 h-5 text-green-400" />
                  <h4 className="font-bold text-green-300">FastAPI Backend</h4>
                </div>
                <ul className="space-y-1 text-xs text-slate-400">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3 h-3 text-green-400" />
                    REST API endpoints
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3 h-3 text-green-400" />
                    SQLAlchemy ORM
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3 h-3 text-green-400" />
                    Async processing
                  </li>
                </ul>
              </div>
              <div className="bg-gradient-to-br from-emerald-500/10 to-emerald-600/5 border-2 border-emerald-500/40 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Database className="w-5 h-5 text-emerald-400" />
                  <h4 className="font-bold text-emerald-300">PostgreSQL</h4>
                </div>
                <ul className="space-y-1 text-xs text-slate-400">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                    Mediciones time-series
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                    Estado del sistema
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                    Logs & configuración
                  </li>
                </ul>
              </div>
            </div>
            {/* Arrow down */}
            <div className="flex justify-center my-4">
              <div className="w-0.5 h-8 bg-gradient-to-b from-green-500/50 to-cyan-500/50"></div>
            </div>
          </div>

          {/* Layer 4: Frontend */}
          <div className="relative">
            <div className="text-center mb-3">
              <span className="text-xs font-bold text-cyan-400 bg-cyan-500/10 px-3 py-1 rounded-full border border-cyan-500/30">
                Capa 4: Frontend & Visualización
              </span>
            </div>
            <div className="bg-gradient-to-br from-cyan-500/10 to-cyan-600/5 border-2 border-cyan-500/40 rounded-xl p-6">
              <div className="grid md:grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="w-12 h-12 bg-cyan-500/20 rounded-lg flex items-center justify-center mx-auto mb-2">
                    <Monitor className="w-6 h-6 text-cyan-400" />
                  </div>
                  <h4 className="font-bold text-cyan-300 text-sm mb-1">React Dashboard</h4>
                  <p className="text-xs text-slate-400">Visualización en tiempo real</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mx-auto mb-2">
                    <Activity className="w-6 h-6 text-blue-400" />
                  </div>
                  <h4 className="font-bold text-blue-300 text-sm mb-1">Recharts</h4>
                  <p className="text-xs text-slate-400">Gráficos interactivos</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center mx-auto mb-2">
                    <Zap className="w-6 h-6 text-purple-400" />
                  </div>
                  <h4 className="font-bold text-purple-300 text-sm mb-1">Auto-refresh</h4>
                  <p className="text-xs text-slate-400">Actualización cada 5s</p>
                </div>
              </div>
            </div>
          </div>

          {/* Data Flow Summary */}
          <div className="bg-gradient-to-r from-pink-500/5 via-purple-500/5 to-cyan-500/5 border border-slate-700 rounded-lg p-6 mt-6">
            <div className="text-center mb-4">
              <h4 className="text-lg font-bold bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent mb-2">
                De la Molécula al Bit: El Viaje de la Información Biológica
              </h4>
              <p className="text-xs text-slate-400 italic">
                Transformando señales bioquímicas en datos accionables, cruzando la frontera entre lo vivo y lo digital
              </p>
            </div>

            <div className="flex items-center justify-center gap-2 text-sm mb-4">
              <span className="text-pink-400 font-bold">SPE</span>
              <ArrowRight className="w-4 h-4 text-slate-500" />
              <span className="text-cyan-400 font-bold">EmStat</span>
              <ArrowRight className="w-4 h-4 text-slate-500" />
              <span className="text-purple-400 font-bold">RPi</span>
              <ArrowRight className="w-4 h-4 text-slate-500" />
              <span className="text-green-400 font-bold">API</span>
              <ArrowRight className="w-4 h-4 text-slate-500" />
              <span className="text-blue-400 font-bold">PostgreSQL</span>
              <ArrowRight className="w-4 h-4 text-slate-500" />
              <span className="text-cyan-400 font-bold">Dashboard</span>
            </div>

            <div className="border-t border-slate-700 pt-3 mt-3">
              <p className="text-xs text-center text-slate-500 italic">
                "La información es la resolución de la incertidumbre"
              </p>
              <p className="text-xs text-center text-slate-600 mt-1">
                — Claude Shannon, padre de la teoría de la información
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* POC Workflow */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-950 border border-cyan-500/30 rounded-xl p-6">
        <h3 className="text-xl font-bold mb-6 text-cyan-400">POC "Laboratorio Ágil" - Workflow</h3>

        <div className="grid md:grid-cols-4 gap-4">
          {[
            { step: '1', title: 'Preparación SPE', desc: 'Funcionalización del electrodo con bioreceptor', icon: FlaskConical },
            { step: '2', title: 'Ajuste en PSTrace', desc: 'Optimización DPV/SWV con muestras conocidas', icon: Activity },
            { step: '3', title: 'Export MethodSCRIPT', desc: 'Generación de script automático del método', icon: Layers },
            { step: '4', title: 'Implementación', desc: 'Integración en Raspberry Pi + visualización', icon: Cpu }
          ].map((step, i) => {
            const Icon = step.icon
            return (
              <div key={i} className="relative">
                {i < 3 && (
                  <div className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-gradient-to-r from-cyan-500/50 to-transparent"></div>
                )}
                <div className="relative bg-slate-900/50 border border-slate-700 rounded-lg p-4 hover:border-cyan-500/50 transition-colors">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="w-8 h-8 bg-cyan-500/20 rounded-lg flex items-center justify-center text-cyan-400 font-bold text-sm">
                      {step.step}
                    </div>
                    <Icon className="w-5 h-5 text-cyan-400" />
                  </div>
                  <h4 className="font-bold text-sm mb-1">{step.title}</h4>
                  <p className="text-xs text-slate-400">{step.desc}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  </div>
)

// Application Tab Component
const ApplicationTab = () => (
  <div className="space-y-8">
    <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-2xl p-8">
      <h2 className="text-3xl font-bold mb-6">Aplicación: Deportes de Alto Rendimiento</h2>

      <div className="grid md:grid-cols-2 gap-8 mb-8">
        <div>
          <p className="text-slate-300 leading-relaxed mb-6">
            El bioreceptor en desarrollo está diseñado para detectar <strong className="text-cyan-400">compuestos específicos en el sudor</strong> que
            permitan establecer una relación directa entre parámetros bioquímicos y condiciones de rendimiento deportivo.
          </p>

          <h3 className="text-xl font-bold mb-4 text-cyan-400">Hito Fundacional</h3>
          <p className="text-slate-300 leading-relaxed mb-4">
            Establecer una conexión <strong>"real"</strong> entre el dispositivo físico (bioreceptor + EmStat Pico)
            y la plataforma digital, trabajando en conjunto con el equipo científico para:
          </p>

          <ul className="space-y-2 text-slate-300">
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-5 h-5 text-cyan-400 mt-0.5 flex-shrink-0" />
              <span>Generar parámetros de datos validados</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-5 h-5 text-cyan-400 mt-0.5 flex-shrink-0" />
              <span>Desplegar datos en tiempo real</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-5 h-5 text-cyan-400 mt-0.5 flex-shrink-0" />
              <span>Correlacionar biomarcadores con rendimiento</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle2 className="w-5 h-5 text-cyan-400 mt-0.5 flex-shrink-0" />
              <span>Validar sensibilidad y selectividad del sensor</span>
            </li>
          </ul>
        </div>

        <div className="bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-500/30 rounded-xl p-6">
          <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
            <TrendingUp className="w-6 h-6 text-cyan-400" />
            Ejemplos de casos de uso
          </h3>

          <div className="space-y-4">
            <div>
              <h4 className="font-bold text-sm mb-2 text-cyan-400">Monitoreo en Entrenamiento</h4>
              <p className="text-sm text-slate-400">
                Medición continua de biomarcadores durante sesiones de entrenamiento para optimizar carga y recuperación.
              </p>
            </div>

            <div>
              <h4 className="font-bold text-sm mb-2 text-cyan-400">Detección de Fatiga</h4>
              <p className="text-sm text-slate-400">
                Identificación temprana de marcadores de fatiga para prevenir sobreentrenamiento.
              </p>
            </div>

            <div>
              <h4 className="font-bold text-sm mb-2 text-cyan-400">Análisis Post-Competencia</h4>
              <p className="text-sm text-slate-400">
                Evaluación de respuestas fisiológicas para ajustar estrategias de recuperación.
              </p>
            </div>

            <div>
              <h4 className="font-bold text-sm mb-2 text-cyan-400">Personalización</h4>
              <p className="text-sm text-slate-400">
                Establecimiento de perfiles individuales para cada atleta basados en sus biomarcadores.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Metrics of Interest */}
      <div className="bg-slate-900/80 border border-slate-700 rounded-xl p-6">
        <h3 className="text-xl font-bold mb-2">Ejemplos de biomarcadores comunes</h3>
        <p className="text-sm text-slate-400 mb-4">
          <em>Nota: Los parámetros específicos a medir serán definidos por el equipo científico.
          BioBridge está diseñado para adaptarse a diversos biomarcadores.</em>
        </p>

        <div className="grid md:grid-cols-4 gap-4">
          {[
            { name: 'Lactato', unit: 'mmol/L', desc: 'Indicador de intensidad de ejercicio', color: 'from-red-500 to-orange-500' },
            { name: 'Glucosa', unit: 'mg/dL', desc: 'Nivel de energía disponible', color: 'from-yellow-500 to-amber-500' },
            { name: 'Cortisol', unit: 'ng/mL', desc: 'Marcador de estrés fisiológico', color: 'from-purple-500 to-pink-500' },
            { name: 'Electrolitos', unit: 'mEq/L', desc: 'Balance de hidratación', color: 'from-cyan-500 to-blue-500' }
          ].map((marker, i) => (
            <div key={i} className="bg-slate-900/50 border border-slate-700 rounded-lg p-4 hover:border-cyan-500/50 transition-colors">
              <div className={`w-12 h-12 bg-gradient-to-br ${marker.color} rounded-lg flex items-center justify-center mb-3 opacity-80`}>
                <FlaskConical className="w-6 h-6 text-white" />
              </div>
              <h4 className="font-bold mb-1">{marker.name}</h4>
              <p className="text-xs text-cyan-400 mb-2">{marker.unit}</p>
              <p className="text-xs text-slate-400">{marker.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>

    {/* Value Proposition */}
    <div className="grid md:grid-cols-3 gap-6">
      <div className="bg-gradient-to-br from-cyan-500/10 to-transparent border border-cyan-500/30 rounded-xl p-6">
        <Zap className="w-8 h-8 text-cyan-400 mb-4" />
        <h3 className="font-bold mb-2">Tiempo Real</h3>
        <p className="text-sm text-slate-400">
          Datos instantáneos durante el ejercicio, sin necesidad de laboratorio.
        </p>
      </div>

      <div className="bg-gradient-to-br from-purple-500/10 to-transparent border border-purple-500/30 rounded-xl p-6">
        <Microscope className="w-8 h-8 text-purple-400 mb-4" />
        <h3 className="font-bold mb-2">No Invasivo</h3>
        <p className="text-sm text-slate-400">
          Medición a través de sudor, evitando extracciones de sangre.
        </p>
      </div>

      <div className="bg-gradient-to-br from-blue-500/10 to-transparent border border-blue-500/30 rounded-xl p-6">
        <TrendingUp className="w-8 h-8 text-blue-400 mb-4" />
        <h3 className="font-bold mb-2">Insights Accionables</h3>
        <p className="text-sm text-slate-400">
          Datos correlacionados con rendimiento para toma de decisiones.
        </p>
      </div>
    </div>
  </div>
)

// Roadmap Tab Component
const RoadmapTab = () => (
  <div className="space-y-8">
    <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-2xl p-8">
      <h2 className="text-3xl font-bold mb-6">Hitos del Proyecto</h2>

      <p className="text-slate-300 leading-relaxed mb-8">
        Los hitos están organizados en <strong className="text-cyan-400">"conversaciones"</strong> sincronizadas
        entre ambos equipos, mostrando cómo avanzan hacia el punto central común a través de BioBridge.
      </p>

      {/* Timeline */}
      <div className="space-y-6">
        {[
          {
            phase: 'Hito 1',
            science: {
              title: 'Requerimientos del Bioreceptor Definidos',
              desc: 'El equipo científico lista características de la señal (tipo, rango, sensibilidad).',
              status: 'in_progress',
              progress: 50
            },
            it: {
              title: 'Arquitectura del Sistema de Datos Definida',
              desc: 'El equipo TI define cómo capturar y procesar datos según requerimientos.',
              status: 'in_progress',
              progress: 50
            },
            conversation: 'BioBridge sirve como contrato de interfaz: ambos acuerdan señal y formato.'
          },
          {
            phase: 'Hito 2',
            science: {
              title: 'Prototipo Inicial del Bioreceptor',
              desc: 'Bioreceptor produce señal medible en entorno controlado.',
              status: 'pending',
              progress: 0
            },
            it: {
              title: 'Módulo de Adquisición Desarrollado',
              desc: 'Sistema lee entradas y las envía a base de datos, probado con datos simulados.',
              status: 'pending',
              progress: 0
            },
            conversation: 'El equipo TI puede probar con datos simulados mientras el bioreceptor se refina.'
          },
          {
            phase: 'Hito 3',
            science: {
              title: 'Bioreceptor Refinado para Pruebas',
              desc: 'Listo para conectarse al sensor comercial (EmStat Pico).',
              status: 'pending',
              progress: 0
            },
            it: {
              title: 'Integración del Sensor con Software',
              desc: 'EmStat Pico integrado con plataforma, visualización básica funcionando.',
              status: 'pending',
              progress: 0
            },
            conversation: 'Primer ensamblaje: bioreceptor → BioBridge → plataforma. Validación de interfaz.'
          },
          {
            phase: 'Hito 4',
            science: {
              title: 'Validación en Diferentes Condiciones',
              desc: 'Stress-testing del receptor con distintas muestras, generando datos reales.',
              status: 'pending',
              progress: 0
            },
            it: {
              title: 'Lógica de Negocio y Visualización Avanzada',
              desc: 'Dashboard completo con algoritmos, alertas y procesamiento de datos reales.',
              status: 'pending',
              progress: 0
            },
            conversation: 'Retroalimentación continua: ajustes de calibración y optimización de algoritmos.'
          }
        ].map((milestone, i) => (
          <div key={i} className="relative">
            {/* Timeline line */}
            {i < 3 && (
              <div className="hidden md:block absolute left-1/2 top-full h-6 w-0.5 bg-gradient-to-b from-cyan-500/50 to-transparent -ml-px"></div>
            )}

            <div className="grid md:grid-cols-3 gap-6 items-center">
              {/* Science Side */}
              <div className="relative">
                <div className={`bg-gradient-to-br from-purple-500/10 to-transparent border rounded-xl p-6 ${
                  milestone.science.status === 'completed' ? 'border-purple-500/50' :
                  milestone.science.status === 'in_progress' ? 'border-purple-500/80 animate-pulse' :
                  'border-purple-500/20'
                }`}>
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-bold text-sm text-purple-400">{milestone.science.title}</h4>
                    {milestone.science.status === 'completed' && (
                      <CheckCircle2 className="w-5 h-5 text-purple-400" />
                    )}
                    {milestone.science.status === 'in_progress' && (
                      <Activity className="w-5 h-5 text-purple-400 animate-pulse" />
                    )}
                  </div>
                  <p className="text-xs text-slate-400 mb-3">{milestone.science.desc}</p>

                  {/* Progress Bar */}
                  <div className="mt-3">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-purple-400 font-bold">Progreso</span>
                      <span className="text-xs text-purple-400 font-bold">{milestone.science.progress}%</span>
                    </div>
                    <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${
                          milestone.science.status === 'completed' ? 'bg-purple-500' :
                          milestone.science.status === 'in_progress' ? 'bg-purple-500 animate-pulse' :
                          'bg-purple-500/30'
                        }`}
                        style={{ width: `${milestone.science.progress}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Center: Phase */}
              <div className="flex flex-col items-center">
                <div className={`w-20 h-20 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center ${
                  milestone.science.status === 'in_progress' || milestone.it.status === 'in_progress' ? 'animate-pulse' : ''
                }`}>
                  <span className="text-2xl font-bold">{milestone.phase.split(' ')[1]}</span>
                </div>
                <p className="text-sm font-bold mt-3 text-cyan-400">{milestone.phase}</p>
                <p className="text-xs text-slate-500 text-center mt-2 max-w-[200px]">{milestone.conversation}</p>
              </div>

              {/* IT Side */}
              <div className="relative">
                <div className={`bg-gradient-to-br from-cyan-500/10 to-transparent border rounded-xl p-6 ${
                  milestone.it.status === 'completed' ? 'border-cyan-500/50' :
                  milestone.it.status === 'in_progress' ? 'border-cyan-500/80 animate-pulse' :
                  'border-cyan-500/20'
                }`}>
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-bold text-sm text-cyan-400">{milestone.it.title}</h4>
                    {milestone.it.status === 'completed' && (
                      <CheckCircle2 className="w-5 h-5 text-cyan-400" />
                    )}
                    {milestone.it.status === 'in_progress' && (
                      <Activity className="w-5 h-5 text-cyan-400 animate-pulse" />
                    )}
                  </div>
                  <p className="text-xs text-slate-400 mb-3">{milestone.it.desc}</p>

                  {/* Progress Bar */}
                  <div className="mt-3">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-cyan-400 font-bold">Progreso</span>
                      <span className="text-xs text-cyan-400 font-bold">{milestone.it.progress}%</span>
                    </div>
                    <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${
                          milestone.it.status === 'completed' ? 'bg-cyan-500' :
                          milestone.it.status === 'in_progress' ? 'bg-cyan-500 animate-pulse' :
                          'bg-cyan-500/30'
                        }`}
                        style={{ width: `${milestone.it.progress}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>

    {/* Current Status */}
    <div className="grid md:grid-cols-2 gap-6">
      {/* Science Team Status */}
      <div className="bg-gradient-to-br from-purple-500/10 to-transparent border border-purple-500/30 rounded-xl p-6">
        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
          <Microscope className="w-6 h-6 text-purple-400" />
          Equipo Científico
        </h3>
        <p className="text-slate-300 mb-4">
          <strong className="text-purple-400">Hito 1 en progreso (50%)</strong>: Definiendo requerimientos del bioreceptor
          y características de la señal.
        </p>
        <div className="space-y-3">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-bold text-purple-400">Hito 1: En Progreso (50%)</span>
              <Activity className="w-5 h-5 text-purple-400 animate-pulse" />
            </div>
            <div className="w-full bg-slate-800 rounded-full h-2">
              <div className="w-[50%] h-full bg-purple-500 rounded-full animate-pulse"></div>
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-bold text-purple-400">Hito 2: Pendiente (0%)</span>
              <div className="w-5 h-5 text-purple-400/30"></div>
            </div>
            <div className="w-full bg-slate-800 rounded-full h-2">
              <div className="w-[0%] h-full bg-purple-500 rounded-full"></div>
            </div>
          </div>
        </div>
        <div className="mt-4 pt-4 border-t border-purple-500/20">
          <p className="text-xs text-slate-400">
            El equipo científico está trabajando en la estructura y metodología del bioreceptor.
          </p>
        </div>
      </div>

      {/* IT Team Status */}
      <div className="bg-gradient-to-br from-cyan-500/10 to-transparent border border-cyan-500/30 rounded-xl p-6">
        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
          <Cpu className="w-6 h-6 text-cyan-400" />
          Equipo TI/Datos
        </h3>
        <p className="text-slate-300 mb-4">
          <strong className="text-cyan-400">Hito 1 en progreso (50%)</strong>: Definiendo arquitectura del sistema de datos
          y estrategia de captura según requerimientos.
        </p>
        <div className="space-y-3">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-bold text-cyan-400">Hito 1: En Progreso (50%)</span>
              <Activity className="w-5 h-5 text-cyan-400 animate-pulse" />
            </div>
            <div className="w-full bg-slate-800 rounded-full h-2">
              <div className="w-[50%] h-full bg-cyan-500 rounded-full animate-pulse"></div>
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-bold text-slate-500">Hito 2: Pendiente</span>
              <span className="text-xs bg-slate-700 text-slate-400 px-2 py-1 rounded">0%</span>
            </div>
            <div className="w-full bg-slate-800 rounded-full h-2">
              <div className="w-0 h-full bg-cyan-500/30 rounded-full"></div>
            </div>
          </div>
        </div>
        <div className="mt-4 pt-4 border-t border-cyan-500/20">
          <p className="text-xs text-slate-400">
            Trabajando en la arquitectura del sistema y estructura del proyecto. El equipo TI está preparando la base técnica para la captura de datos.
          </p>
        </div>
      </div>

      <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6">
        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
          <ArrowRight className="w-6 h-6 text-blue-400" />
          Próximos Pasos
        </h3>

        <div className="space-y-4">
          {/* Science Team Next Steps */}
          <div>
            <h4 className="text-sm font-bold text-purple-400 mb-2 flex items-center gap-2">
              <Microscope className="w-4 h-4" />
              Equipo Científico
            </h4>
            <ul className="space-y-2 text-sm text-slate-300 ml-6">
              <li className="flex items-start gap-2">
                <span className="text-purple-400 font-bold">•</span>
                <span>Completar Hito 2: Prototipo inicial generando señal medible estable</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-400 font-bold">•</span>
                <span>Validación del método electroquímico con PSTrace</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-purple-400 font-bold">•</span>
                <span>Pruebas iniciales con sudor sintético</span>
              </li>
            </ul>
          </div>

          {/* IT Team Next Steps */}
          <div>
            <h4 className="text-sm font-bold text-cyan-400 mb-2 flex items-center gap-2">
              <Cpu className="w-4 h-4" />
              Equipo TI/Datos
            </h4>
            <ul className="space-y-2 text-sm text-slate-300 ml-6">
              <li className="flex items-start gap-2">
                <span className="text-cyan-400 font-bold">•</span>
                <span>Completar Hito 1: Finalizar arquitectura y documentación técnica</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-cyan-400 font-bold">•</span>
                <span>Iniciar Hito 2: Integración Raspberry Pi + EmStat Pico</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-cyan-400 font-bold">•</span>
                <span>Implementar módulo de adquisición con comunicación serial</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-cyan-400 font-bold">•</span>
                <span>Pruebas con datos simulados en el dashboard</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-slate-700">
          <p className="text-xs text-slate-500">
            <strong className="text-blue-400">Punto de Convergencia:</strong> Cuando ambos equipos completen sus Hitos 2,
            podremos realizar la primera integración completa en el Hito 3.
          </p>
        </div>
      </div>
    </div>
  </div>
)

// Challenges Tab Component
const ChallengesTab = () => (
  <div className="space-y-8">
    <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-2xl p-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center">
          <AlertTriangle className="w-6 h-6" />
        </div>
        <div>
          <h2 className="text-3xl font-bold">Desafíos Técnicos Futuros</h2>
          <p className="text-slate-400 text-sm">Retos y líneas de investigación para las próximas fases</p>
        </div>
      </div>

      <p className="text-slate-300 leading-relaxed mb-8">
        La transición del POC de laboratorio a un dispositivo wearable de campo presenta desafíos significativos
        en <strong className="text-orange-400">miniaturización, autonomía energética, comunicación inalámbrica y estabilidad del bioreceptor</strong>.
        A continuación se detallan los principales retos técnicos identificados y las estrategias de investigación propuestas.
      </p>

      {/* Main Challenges Grid */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        {/* Challenge 1: Measurement Frequency */}
        <div className="bg-gradient-to-br from-orange-500/10 to-transparent border border-orange-500/30 rounded-xl p-6 hover:border-orange-500/50 transition-colors">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-orange-500/20 rounded-lg flex items-center justify-center">
                <Gauge className="w-5 h-5 text-orange-400" />
              </div>
              <h3 className="text-lg font-bold text-orange-400">Frecuencia de Medición</h3>
            </div>
            <span className="text-xs bg-red-500/20 text-red-400 px-2 py-1 rounded">Alta Prioridad</span>
          </div>

          <div className="space-y-4">
            <div>
              <h4 className="font-bold text-sm mb-2 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-orange-400" />
                Problema
              </h4>
              <p className="text-sm text-slate-400">
                Las técnicas DPV/SWV requieren <strong className="text-orange-400">10-60 segundos</strong> por medición.
                Para deportes de alta velocidad (ciclismo, carreras) se necesitan datos más frecuentes y de menor latencia
                para capturar cambios metabólicos rápidos.
              </p>
            </div>

            <div>
              <h4 className="font-bold text-sm mb-2 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                Líneas de Investigación
              </h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li className="flex items-start gap-2">
                  <span className="text-cyan-400 mt-0.5">•</span>
                  <span><strong>Cronoamperometría:</strong> Técnica más rápida (1-5 seg) manteniendo sensibilidad adecuada</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cyan-400 mt-0.5">•</span>
                  <span><strong>Muestreo estratégico:</strong> Mediciones intensivas en momentos críticos (umbrales de esfuerzo)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cyan-400 mt-0.5">•</span>
                  <span><strong>Dual-mode sensing:</strong> Alternar entre mediciones rápidas (screening) y precisas (calibración)</span>
                </li>
              </ul>
            </div>

            <div className="pt-3 border-t border-slate-700">
              <a
                href="https://advanced.onlinelibrary.wiley.com/doi/10.1002/advs.202411433"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
              >
                <ExternalLink className="w-3 h-3" />
                Wearable Electrochemical Biosensors (2025)
              </a>
            </div>
          </div>
        </div>

        {/* Challenge 2: Wireless Communication */}
        <div className="bg-gradient-to-br from-blue-500/10 to-transparent border border-blue-500/30 rounded-xl p-6 hover:border-blue-500/50 transition-colors">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                <Wifi className="w-5 h-5 text-blue-400" />
              </div>
              <h3 className="text-lg font-bold text-blue-400">Comunicación Inalámbrica</h3>
            </div>
            <span className="text-xs bg-red-500/20 text-red-400 px-2 py-1 rounded">Alta Prioridad</span>
          </div>

          <div className="space-y-4">
            <div>
              <h4 className="font-bold text-sm mb-2 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-orange-400" />
                Problema
              </h4>
              <p className="text-sm text-slate-400">
                Bluetooth Low Energy (BLE) tiene limitaciones de <strong className="text-blue-400">alcance (~10m)</strong> y
                latencia variable. Problemas de <strong className="text-blue-400">sincronización, packet loss</strong> y
                degradación en movimiento afectan la calidad de datos en deportes de velocidad.
              </p>
            </div>

            <div>
              <h4 className="font-bold text-sm mb-2 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                Líneas de Investigación
              </h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li className="flex items-start gap-2">
                  <span className="text-cyan-400 mt-0.5">•</span>
                  <span><strong>Fog computing:</strong> Procesamiento local en edge para minimizar latencia crítica</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cyan-400 mt-0.5">•</span>
                  <span><strong>WiFi 6/6E:</strong> Mayor ancho de banda y menor latencia, trade-off con consumo energético</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cyan-400 mt-0.5">•</span>
                  <span><strong>Buffer inteligente:</strong> Almacenamiento local con sincronización diferida post-ejercicio</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cyan-400 mt-0.5">•</span>
                  <span><strong>Multi-hop networking:</strong> Para ciclismo en grupo o equipos deportivos</span>
                </li>
              </ul>
            </div>

            <div className="pt-3 border-t border-slate-700">
              <a
                href="https://www.frontiersin.org/journals/physiology/articles/10.3389/fphys.2024.1376801/full"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
              >
                <ExternalLink className="w-3 h-3" />
                Sweat Lactate Monitoring in Sports (2024)
              </a>
            </div>
          </div>
        </div>

        {/* Challenge 3: Miniaturization & Portability */}
        <div className="bg-gradient-to-br from-purple-500/10 to-transparent border border-purple-500/30 rounded-xl p-6 hover:border-purple-500/50 transition-colors">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
                <Layers className="w-5 h-5 text-purple-400" />
              </div>
              <h3 className="text-lg font-bold text-purple-400">Miniaturización v1.0</h3>
            </div>
            <span className="text-xs bg-yellow-500/20 text-yellow-400 px-2 py-1 rounded">Media Prioridad</span>
          </div>

          <div className="space-y-4">
            <div>
              <h4 className="font-bold text-sm mb-2 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-orange-400" />
                Problema
              </h4>
              <p className="text-sm text-slate-400">
                Raspberry Pi (~85x56mm) es demasiado grande para wearable. EmStat Pico es compacto pero
                necesita placa adicional. Objetivo: dispositivo <strong className="text-purple-400">≤ tamaño de smartwatch</strong> (~50x40mm).
              </p>
            </div>

            <div>
              <h4 className="font-bold text-sm mb-2 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                Líneas de Investigación
              </h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li className="flex items-start gap-2">
                  <span className="text-cyan-400 mt-0.5">•</span>
                  <span><strong>Microcontroladores compactos:</strong> ESP32-C3 (21x18mm), nRF52840, Arduino MKR</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cyan-400 mt-0.5">•</span>
                  <span><strong>Potentiostats miniaturizados:</strong> Diseño PCB custom integrando EmStat Pico (27x20mm footprint)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cyan-400 mt-0.5">•</span>
                  <span><strong>Componentes SMD:</strong> Reducción de huella mediante montaje superficial</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cyan-400 mt-0.5">•</span>
                  <span><strong>Diseño modular:</strong> Separar sensing head, procesamiento y batería en brazalete flexible</span>
                </li>
              </ul>
            </div>

            <div className="pt-3 border-t border-slate-700">
              <a
                href="https://arxiv.org/abs/2410.02142"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
              >
                <ExternalLink className="w-3 h-3" />
                Miniature Potentiostat for Wearables (2024)
              </a>
            </div>
          </div>
        </div>

        {/* Challenge 4: Battery & Power */}
        <div className="bg-gradient-to-br from-green-500/10 to-transparent border border-green-500/30 rounded-xl p-6 hover:border-green-500/50 transition-colors">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
                <Battery className="w-5 h-5 text-green-400" />
              </div>
              <h3 className="text-lg font-bold text-green-400">Autonomía Energética</h3>
            </div>
            <span className="text-xs bg-red-500/20 text-red-400 px-2 py-1 rounded">Alta Prioridad</span>
          </div>

          <div className="space-y-4">
            <div>
              <h4 className="font-bold text-sm mb-2 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-orange-400" />
                Problema
              </h4>
              <p className="text-sm text-slate-400">
                Baterías Li-ion wearables típicas: <strong className="text-green-400">10-20 mAh</strong>.
                Raspberry Pi consume ~500-700mA, EmStat Pico ~15mA en operación. Objetivo:
                <strong className="text-green-400"> autonomía ≥ 8 horas</strong> de entrenamiento continuo.
              </p>
            </div>

            <div>
              <h4 className="font-bold text-sm mb-2 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                Líneas de Investigación
              </h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li className="flex items-start gap-2">
                  <span className="text-cyan-400 mt-0.5">•</span>
                  <span><strong>Low-power MCUs:</strong> ESP32-C3 (μA en deep sleep), nRF52 (~260μA en operación)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cyan-400 mt-0.5">•</span>
                  <span><strong>PWM-DAC:</strong> Reducción de consumo vs DACs discretos en potenciostato</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cyan-400 mt-0.5">•</span>
                  <span><strong>Duty cycling:</strong> Mediciones intermitentes (e.g. cada 2-5 min) con sleep profundo entre mediciones</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cyan-400 mt-0.5">•</span>
                  <span><strong>Energy harvesting:</strong> Células solares flexibles o piezoeléctricos (movimiento corporal)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cyan-400 mt-0.5">•</span>
                  <span><strong>Baterías de mayor densidad:</strong> LiPo 100-200 mAh en form factor wearable</span>
                </li>
              </ul>
            </div>

            <div className="pt-3 border-t border-slate-700">
              <a
                href="https://www.sciencedirect.com/science/article/pii/S2468067223000482"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
              >
                <ExternalLink className="w-3 h-3" />
                We-VoltamoStat: Wearable Low-Power Potentiostat
              </a>
            </div>
          </div>
        </div>

        {/* Challenge 5: Bioreceptor Stability */}
        <div className="bg-gradient-to-br from-pink-500/10 to-transparent border border-pink-500/30 rounded-xl p-6 hover:border-pink-500/50 transition-colors">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-pink-500/20 rounded-lg flex items-center justify-center">
                <Shield className="w-5 h-5 text-pink-400" />
              </div>
              <h3 className="text-lg font-bold text-pink-400">Estabilidad del Bioreceptor</h3>
            </div>
            <span className="text-xs bg-yellow-500/20 text-yellow-400 px-2 py-1 rounded">Media Prioridad</span>
          </div>

          <div className="space-y-4">
            <div>
              <h4 className="font-bold text-sm mb-2 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-orange-400" />
                Problema
              </h4>
              <p className="text-sm text-slate-400">
                <strong className="text-pink-400">Biofouling</strong> (adsorción de proteínas/sales),
                degradación enzimática y deriva de señal reducen vida útil del SPE funcionalizado.
                Objetivo: <strong className="text-pink-400">estabilidad ≥ 24 horas</strong> de uso continuo.
              </p>
            </div>

            <div>
              <h4 className="font-bold text-sm mb-2 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                Líneas de Investigación
              </h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li className="flex items-start gap-2">
                  <span className="text-cyan-400 mt-0.5">•</span>
                  <span><strong>Membranas anti-fouling:</strong> Nafion, PEG, hidrogeles que repelen proteínas</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cyan-400 mt-0.5">•</span>
                  <span><strong>Calibración automática:</strong> Algoritmos de auto-ajuste con soluciones de referencia internas</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cyan-400 mt-0.5">•</span>
                  <span><strong>Electrodos intercambiables:</strong> Cartuchos SPE desechables para reemplazos rápidos</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cyan-400 mt-0.5">•</span>
                  <span><strong>Nanomateriales:</strong> Grafeno, nanotubos de carbono para mayor robustez y área superficial</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cyan-400 mt-0.5">•</span>
                  <span><strong>Temperature compensation:</strong> Corrección por variaciones térmicas durante ejercicio</span>
                </li>
              </ul>
            </div>

            <div className="pt-3 border-t border-slate-700">
              <a
                href="https://pubs.acs.org/doi/10.1021/acs.analchem.3c03942"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
              >
                <ExternalLink className="w-3 h-3" />
                Hydrogel-Based Wearable Biosensors (2024)
              </a>
            </div>
          </div>
        </div>

        {/* Challenge 6: Sweat Collection */}
        <div className="bg-gradient-to-br from-cyan-500/10 to-transparent border border-cyan-500/30 rounded-xl p-6 hover:border-cyan-500/50 transition-colors">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-cyan-500/20 rounded-lg flex items-center justify-center">
                <Droplet className="w-5 h-5 text-cyan-400" />
              </div>
              <h3 className="text-lg font-bold text-cyan-400">Recolección de Sudor</h3>
            </div>
            <span className="text-xs bg-yellow-500/20 text-yellow-400 px-2 py-1 rounded">Media Prioridad</span>
          </div>

          <div className="space-y-4">
            <div>
              <h4 className="font-bold text-sm mb-2 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-orange-400" />
                Problema
              </h4>
              <p className="text-sm text-slate-400">
                Tasa de sudoración variable (0.5-2.0 L/h según intensidad). Necesidad de
                <strong className="text-cyan-400"> flujo continuo</strong> sobre el electrodo sin acumulación
                (contaminación cruzada) ni evaporación que altere concentraciones.
              </p>
            </div>

            <div>
              <h4 className="font-bold text-sm mb-2 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                Líneas de Investigación
              </h4>
              <ul className="space-y-2 text-sm text-slate-400">
                <li className="flex items-start gap-2">
                  <span className="text-cyan-400 mt-0.5">•</span>
                  <span><strong>Microfluídica:</strong> Canales capilares para dirigir flujo constante sobre sensor</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cyan-400 mt-0.5">•</span>
                  <span><strong>Válvulas de flujo:</strong> Control activo para renovación de muestra fresca</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cyan-400 mt-0.5">•</span>
                  <span><strong>Materiales absorbentes:</strong> Hidrogeles que retienen sudor sin evaporación</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cyan-400 mt-0.5">•</span>
                  <span><strong>Diseño ergonómico:</strong> Posicionamiento en zonas de alta sudoración (frente, muñeca, pecho)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cyan-400 mt-0.5">•</span>
                  <span><strong>Sensores de volumen:</strong> Detectar cuando hay suficiente muestra para medición confiable</span>
                </li>
              </ul>
            </div>

            <div className="pt-3 border-t border-slate-700">
              <a
                href="https://pmc.ncbi.nlm.nih.gov/articles/PMC9108092/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
              >
                <ExternalLink className="w-3 h-3" />
                State of Sweat: Wearable Sweat Sensing (2022)
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Research Roadmap */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-950 border border-orange-500/30 rounded-xl p-6">
        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
          <TrendingUp className="w-6 h-6 text-orange-400" />
          Roadmap de Investigación
        </h3>

        <div className="space-y-4">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-24 pt-1">
              <span className="inline-block bg-orange-500/20 text-orange-400 px-3 py-1 rounded text-xs font-bold">Fase 2</span>
            </div>
            <div className="flex-1">
              <h4 className="font-bold mb-2">Optimización del POC Actual</h4>
              <p className="text-sm text-slate-400 mb-2">
                Refinamiento de frecuencia de medición, implementación de fog computing y mejora de estabilidad del bioreceptor.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="text-xs bg-orange-500/10 border border-orange-500/30 px-2 py-1 rounded">Cronoamperometría</span>
                <span className="text-xs bg-blue-500/10 border border-blue-500/30 px-2 py-1 rounded">Edge Processing</span>
                <span className="text-xs bg-pink-500/10 border border-pink-500/30 px-2 py-1 rounded">Anti-fouling</span>
              </div>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-24 pt-1">
              <span className="inline-block bg-cyan-500/20 text-cyan-400 px-3 py-1 rounded text-xs font-bold">Fase 3</span>
            </div>
            <div className="flex-1">
              <h4 className="font-bold mb-2">Miniaturización v1.0</h4>
              <p className="text-sm text-slate-400 mb-2">
                Migración a microcontrolador compacto (ESP32/nRF52), diseño PCB custom, optimización energética con duty cycling.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="text-xs bg-purple-500/10 border border-purple-500/30 px-2 py-1 rounded">ESP32-C3</span>
                <span className="text-xs bg-green-500/10 border border-green-500/30 px-2 py-1 rounded">PWM-DAC</span>
                <span className="text-xs bg-cyan-500/10 border border-cyan-500/30 px-2 py-1 rounded">Microfluídica</span>
              </div>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-24 pt-1">
              <span className="inline-block bg-purple-500/20 text-purple-400 px-3 py-1 rounded text-xs font-bold">Fase 4</span>
            </div>
            <div className="flex-1">
              <h4 className="font-bold mb-2">Validación en Campo</h4>
              <p className="text-sm text-slate-400 mb-2">
                Pruebas con atletas en condiciones reales, correlación con análisis de laboratorio, estudios de usabilidad y confiabilidad.
              </p>
              <div className="flex flex-wrap gap-2">
                <span className="text-xs bg-blue-500/10 border border-blue-500/30 px-2 py-1 rounded">Field Testing</span>
                <span className="text-xs bg-green-500/10 border border-green-500/30 px-2 py-1 rounded">Clinical Validation</span>
                <span className="text-xs bg-orange-500/10 border border-orange-500/30 px-2 py-1 rounded">UX Research</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    {/* Summary Cards */}
    <div className="grid md:grid-cols-3 gap-6">
      <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-red-500/20 rounded-lg flex items-center justify-center">
            <AlertTriangle className="w-5 h-5 text-red-400" />
          </div>
          <h3 className="font-bold">Prioridad Alta</h3>
        </div>
        <ul className="space-y-2 text-sm text-slate-400">
          <li className="flex items-center gap-2">
            <Gauge className="w-4 h-4 text-orange-400" />
            <span>Frecuencia de medición</span>
          </li>
          <li className="flex items-center gap-2">
            <Wifi className="w-4 h-4 text-blue-400" />
            <span>Comunicación inalámbrica</span>
          </li>
          <li className="flex items-center gap-2">
            <Battery className="w-4 h-4 text-green-400" />
            <span>Autonomía energética</span>
          </li>
        </ul>
      </div>

      <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-yellow-500/20 rounded-lg flex items-center justify-center">
            <Activity className="w-5 h-5 text-yellow-400" />
          </div>
          <h3 className="font-bold">Prioridad Media</h3>
        </div>
        <ul className="space-y-2 text-sm text-slate-400">
          <li className="flex items-center gap-2">
            <Layers className="w-4 h-4 text-purple-400" />
            <span>Miniaturización</span>
          </li>
          <li className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-pink-400" />
            <span>Estabilidad bioreceptor</span>
          </li>
          <li className="flex items-center gap-2">
            <Droplet className="w-4 h-4 text-cyan-400" />
            <span>Recolección de sudor</span>
          </li>
        </ul>
      </div>

      <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-cyan-500/20 rounded-lg flex items-center justify-center">
            <TrendingUp className="w-5 h-5 text-cyan-400" />
          </div>
          <h3 className="font-bold">Colaboraciones</h3>
        </div>
        <p className="text-sm text-slate-400 mb-3">
          Áreas donde colaboraciones externas acelerarían el desarrollo:
        </p>
        <ul className="space-y-1 text-xs text-slate-400">
          <li>• Fabricación de PCBs miniaturizados</li>
          <li>• Diseño de microfluídica</li>
          <li>• Validación clínica con deportistas</li>
          <li>• Desarrollo de algoritmos ML para calibración</li>
        </ul>
      </div>
    </div>
  </div>
)

// Technical Model Tab Component
const TechnicalModelTab = () => {
  const [selectedEmStatPart, setSelectedEmStatPart] = useState(null)
  const [selectedRPiPin, setSelectedRPiPin] = useState(null)
  const [selectedElectrode, setSelectedElectrode] = useState(null)
  const [activeWorkflowStep, setActiveWorkflowStep] = useState(0)

  // EmStat Pico components
  const emstatParts = [
    { id: 'potentiostat', name: 'Potenciostato Dual', desc: 'Circuito de control de potencial para mediciones electroquímicas precisas', color: 'cyan' },
    { id: 'adc', name: 'ADC 16-bit', desc: 'Convertidor analógico-digital de alta resolución para captura de señales', color: 'blue' },
    { id: 'bluetooth', name: 'Módulo Bluetooth', desc: 'Conectividad inalámbrica BLE 5.0 para comunicación', color: 'purple' },
    { id: 'usb', name: 'Puerto USB-C', desc: 'Interfaz serial para comunicación con Raspberry Pi y alimentación', color: 'green' },
    { id: 'electrodes', name: 'Conectores SPE', desc: 'Pines para conexión del Screen Printed Electrode (WE, RE, CE)', color: 'orange' }
  ]

  // Raspberry Pi GPIO pins (simplified key pins)
  const rpiPins = [
    { pin: 1, name: '3.3V', type: 'power', color: 'yellow' },
    { pin: 2, name: '5V', type: 'power', color: 'red' },
    { pin: 3, name: 'GPIO2 (SDA)', type: 'i2c', color: 'cyan' },
    { pin: 5, name: 'GPIO3 (SCL)', type: 'i2c', color: 'cyan' },
    { pin: 6, name: 'GND', type: 'ground', color: 'slate' },
    { pin: 8, name: 'GPIO14 (TXD)', type: 'uart', color: 'green' },
    { pin: 10, name: 'GPIO15 (RXD)', type: 'uart', color: 'green' }
  ]

  // SPE Electrodes
  const electrodes = [
    { id: 'WE', name: 'Working Electrode', fullName: 'Electrodo de Trabajo', desc: 'Electrodo principal donde ocurre la reacción electroquímica de interés. Aquí se aplica el potencial y se mide la corriente resultante de la oxidación/reducción del analito.', color: 'cyan', icon: Zap },
    { id: 'RE', name: 'Reference Electrode', fullName: 'Electrodo de Referencia', desc: 'Proporciona un potencial estable y conocido como punto de referencia. Permite medir el potencial del WE de manera precisa sin pasar corriente significativa.', color: 'purple', icon: Radio },
    { id: 'CE', name: 'Counter Electrode', fullName: 'Electrodo Auxiliar', desc: 'Completa el circuito eléctrico permitiendo el flujo de corriente sin afectar el potencial del WE. Compensa la corriente que fluye en el WE.', color: 'blue', icon: CircuitBoard }
  ]

  // Workflow steps
  const workflowSteps = [
    { step: 1, title: 'Conexión PSTrace', desc: 'Conectar computador al EmStat Pico vía USB', icon: Monitor },
    { step: 2, title: 'Configuración Parámetros', desc: 'Definir parámetros de técnica electroquímica (potencial, amplitud, frecuencia, step, equilibración, etc.)', icon: Gauge },
    { step: 3, title: 'Pruebas y Ajuste', desc: 'Ejecutar técnicas DPV/SWV y optimizar parámetros', icon: Play },
    { step: 4, title: 'Exportar MethodScript', desc: 'Extraer script de configuración validado', icon: Code2 },
    { step: 5, title: 'Codificación RPi', desc: 'Integrar MethodScript en código de Raspberry Pi', icon: Cpu },
    { step: 6, title: 'Comunicación GPIO', desc: 'Raspberry Pi controla EmStat Pico vía GPIO/UART', icon: Waypoints },
    { step: 7, title: 'Captura de Datos', desc: 'Obtención y procesamiento de mediciones en tiempo real', icon: Activity }
  ]

  return (
    <div className="space-y-12">
      {/* Hero Introduction */}
      <div className="bg-gradient-to-br from-slate-900 via-blue-950/30 to-slate-900 border border-cyan-500/30 rounded-2xl p-8">
        <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
          Modelo Técnico de Componentes
        </h2>
        <p className="text-lg text-slate-300 leading-relaxed">
          Exploración detallada de los componentes electrónicos, conexiones, y procesos que conforman el sistema BioBridge.
          Esta sección proporciona una visión técnica completa del hardware, sensores, y flujo de trabajo del laboratorio ágil.
        </p>
      </div>

      {/* 1. EmStat Pico Interactive Component */}
      <div className="space-y-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center">
            <Box className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-2xl font-bold">EmStat Pico - Potenciostato</h3>
            <p className="text-sm text-slate-400">Explorar componentes internos y conectores</p>
          </div>
        </div>

        {/* Real Hardware Photo */}
        <div className="bg-slate-900/50 border border-cyan-500/30 rounded-xl p-6 overflow-hidden">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse"></div>
            <span className="text-sm font-bold text-cyan-400">Hardware Real</span>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="relative group">
              <div className="relative w-full h-64 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-xl border-2 border-cyan-500/40 overflow-hidden shadow-2xl">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-cyan-500/10 via-transparent to-transparent"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-blue-500/5"></div>
                <img
                  src="/images/hardware/emstat-pico.jpg"
                  alt="EmStat Pico Module"
                  className="relative w-full h-full object-contain p-8 drop-shadow-2xl transition-transform duration-300 group-hover:scale-105"
                  style={{ filter: 'drop-shadow(0 0 30px rgba(6, 182, 212, 0.4))' }}
                />
              </div>
              <div className="mt-3 text-sm text-center font-bold text-cyan-400">EmStat Pico Development Kit</div>
              <div className="text-xs text-center text-slate-500">Potenciostato Dual Calibrado</div>
            </div>
            <div className="flex flex-col justify-center space-y-3 text-sm text-slate-300">
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 mt-0.5 flex-shrink-0" />
                <span>Módulo OEM compacto (35mm x 40mm)</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 mt-0.5 flex-shrink-0" />
                <span>Conectores para SPE de 3 electrodos</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 mt-0.5 flex-shrink-0" />
                <span>Puerto USB-C para alimentación y datos</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-cyan-400 mt-0.5 flex-shrink-0" />
                <span>LED de estado y calibración integrados</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Visual representation */}
          <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-8">
            <div className="relative aspect-video bg-gradient-to-br from-slate-800 to-slate-900 rounded-lg border-2 border-cyan-500/30 flex items-center justify-center overflow-hidden">
              {/* EmStat Pico visual representation */}
              <div className="relative w-full h-full p-6">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-blue-500/5"></div>

                {/* Main board */}
                <div className="relative h-full border-2 border-cyan-500/50 rounded-lg bg-gradient-to-br from-slate-700 to-slate-800 p-4">
                  <div className="text-center text-xs text-cyan-400 font-bold mb-4">EmStat Pico Module</div>

                  {/* Interactive parts */}
                  <div className="grid grid-cols-2 gap-2.5">
                    {emstatParts.map((part, idx) => (
                      <motion.div
                        key={part.id}
                        className={`relative cursor-pointer rounded-lg p-2.5 border-2 transition-all ${
                          selectedEmStatPart === part.id
                            ? `border-${part.color}-500 bg-${part.color}-500/20`
                            : 'border-slate-600 bg-slate-800/50 hover:border-slate-500'
                        }`}
                        onClick={() => setSelectedEmStatPart(part.id)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <div className={`text-xs font-bold text-${part.color}-400`}>{part.name}</div>
                        {selectedEmStatPart === part.id && (
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="absolute inset-0 border-2 border-cyan-400 rounded-lg animate-pulse"
                          />
                        )}
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <p className="text-xs text-slate-500 text-center mt-3">Haz clic en cada componente para ver detalles</p>
          </div>

          {/* Description panel */}
          <div className="space-y-4">
            <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6">
              <h4 className="font-bold mb-3 flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-cyan-400" />
                Componente Seleccionado
              </h4>
              {selectedEmStatPart ? (
                <div className="space-y-3">
                  {emstatParts.filter(p => p.id === selectedEmStatPart).map(part => (
                    <div key={part.id}>
                      <h5 className={`font-bold text-${part.color}-400 text-lg mb-2`}>{part.name}</h5>
                      <p className="text-sm text-slate-300">{part.desc}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-slate-400 italic">Selecciona un componente para ver su descripción detallada</p>
              )}
            </div>

            <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/30 rounded-xl p-4">
              <h4 className="font-bold text-sm mb-2 text-cyan-400">Especificaciones Técnicas</h4>
              <ul className="space-y-1 text-xs text-slate-300">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3 h-3 text-cyan-400" />
                  Rango de potencial: -5V a +5V
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3 h-3 text-cyan-400" />
                  Resolución de corriente: 1 pA a 10 mA
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3 h-3 text-cyan-400" />
                  Técnicas: DPV, SWV, CV, EIS, Amperometría
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3 h-3 text-cyan-400" />
                  Comunicación: USB, Bluetooth 5.0, UART
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Raspberry Pi GPIO Component */}
      <div className="space-y-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center">
            <Cpu className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-2xl font-bold">Raspberry Pi - Controlador Principal</h3>
            <p className="text-sm text-slate-400">Pines GPIO y funciones de comunicación</p>
          </div>
        </div>

        {/* "You Are Here" message */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="relative bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-purple-500/20 border-2 border-purple-500 rounded-xl p-6 overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 animate-pulse"></div>
          <div className="relative flex items-start gap-4">
            <div className="flex-shrink-0">
              <motion.div
                animate={{ rotate: [0, 360] }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center"
              >
                <Cpu className="w-8 h-8" />
              </motion.div>
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-2 h-2 rounded-full bg-purple-500 animate-pulse"></div>
                <span className="text-xs font-bold text-purple-400 uppercase tracking-wider">USTED ESTÁ AQUÍ</span>
                <div className="w-2 h-2 rounded-full bg-purple-500 animate-pulse"></div>
              </div>
              <h4 className="text-xl font-bold mb-2 text-white">
                Este Dashboard y Landing Page se están ejecutando en este preciso momento dentro de esta placa
              </h4>
              <p className="text-sm text-slate-300">
                La aplicación que estás visualizando ahora mismo está corriendo dentro de la <strong className="text-purple-400">Raspberry Pi</strong>.
                Cada interacción, cada gráfico, cada dato que ves está siendo procesado por este microcontrolador de 64 bits.
                Este es el cerebro del sistema BioBridge, orquestando la captura de datos del EmStat Pico,
                procesando mediciones en tiempo real, sirviendo la API backend, y renderizando esta interfaz web.
                Todo desde este pequeño pero poderoso componente del tamaño de una tarjeta de crédito.
              </p>
              <div className="mt-3 flex items-center gap-2 text-xs text-purple-300">
                <Activity className="w-4 h-4 animate-pulse" />
                <span>Sistema activo | Procesando en tiempo real</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Real Hardware Photo - Raspberry Pi */}
        <div className="bg-slate-900/50 border border-purple-500/30 rounded-xl p-6 overflow-hidden">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-2 h-2 rounded-full bg-purple-500 animate-pulse"></div>
            <span className="text-sm font-bold text-purple-400">Hardware Real</span>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="relative group">
              <div className="relative w-full h-64 bg-gradient-to-br from-slate-900 via-purple-950/30 to-slate-900 rounded-xl border-2 border-purple-500/40 overflow-hidden shadow-2xl">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-500/10 via-transparent to-transparent"></div>
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5"></div>
                <img
                  src="/images/hardware/raspberry-pi-4.jpg"
                  alt="Raspberry Pi 4 Model B"
                  className="relative w-full h-full object-contain p-6 drop-shadow-2xl transition-transform duration-300 group-hover:scale-105"
                  style={{ filter: 'drop-shadow(0 0 30px rgba(168, 85, 247, 0.4))' }}
                />
              </div>
              <div className="mt-3 text-sm text-center font-bold text-purple-400">Raspberry Pi 4 Model B</div>
              <div className="text-xs text-center text-slate-500">Procesador ARM Cortex-A72 de 64 bits</div>
            </div>
            <div className="flex flex-col justify-center space-y-3 text-sm text-slate-300">
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-purple-400 mt-0.5 flex-shrink-0" />
                <span>40 pines GPIO para I/O digital</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-purple-400 mt-0.5 flex-shrink-0" />
                <span>Interfaces I2C, SPI, UART integradas</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-purple-400 mt-0.5 flex-shrink-0" />
                <span>Procesador ARM Cortex-A72 de 64 bits</span>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-purple-400 mt-0.5 flex-shrink-0" />
                <span>4GB RAM para procesamiento en tiempo real</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* GPIO Pin Layout */}
          <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6">
            <h4 className="font-bold mb-4 text-center">GPIO Header (40 pines)</h4>
            <div className="grid grid-cols-2 gap-2">
              {rpiPins.map((pin) => (
                <motion.div
                  key={pin.pin}
                  className={`cursor-pointer rounded-lg p-3 border-2 transition-all ${
                    selectedRPiPin === pin.pin
                      ? `border-${pin.color}-500 bg-${pin.color}-500/20`
                      : 'border-slate-700 bg-slate-800/50 hover:border-slate-600'
                  }`}
                  onClick={() => setSelectedRPiPin(pin.pin)}
                  whileHover={{ scale: 1.03 }}
                >
                  <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full bg-${pin.color}-500`}></div>
                    <div>
                      <div className="text-xs font-bold">Pin {pin.pin}</div>
                      <div className="text-xs text-slate-400">{pin.name}</div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            <p className="text-xs text-slate-500 text-center mt-4">
              Pines clave mostrados (de 40 totales)
            </p>
          </div>

          {/* Pin Details */}
          <div className="space-y-4">
            <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6">
              <h4 className="font-bold mb-3">Funciones GPIO</h4>
              <div className="space-y-3 text-sm">
                <div className="flex items-start gap-3">
                  <div className="w-3 h-3 rounded-full bg-cyan-500 mt-1"></div>
                  <div>
                    <div className="font-bold text-cyan-400">I2C (SDA/SCL)</div>
                    <div className="text-xs text-slate-400">Interfaz para sensores auxiliares complementarios (ejemplos: temp, humedad, pH)</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-3 h-3 rounded-full bg-green-500 mt-1"></div>
                  <div>
                    <div className="font-bold text-green-400">UART (TXD/RXD)</div>
                    <div className="text-xs text-slate-400">Comunicación serial con EmStat Pico para control y datos</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-3 h-3 rounded-full bg-yellow-500 mt-1"></div>
                  <div>
                    <div className="font-bold text-yellow-400">Power (3.3V/5V)</div>
                    <div className="text-xs text-slate-400">Alimentación para sensores externos y módulos</div>
                  </div>
                </div>
              </div>
            </div>

            {selectedRPiPin && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/30 rounded-xl p-4"
              >
                <h4 className="font-bold text-sm mb-2 text-purple-400">
                  Pin {selectedRPiPin} Seleccionado
                </h4>
                <p className="text-xs text-slate-300">
                  {rpiPins.find(p => p.pin === selectedRPiPin)?.name}
                </p>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* 3. GPIO Connection Diagram */}
      <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
            <Waypoints className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-2xl font-bold">Mapa de Conexión GPIO</h3>
            <p className="text-sm text-slate-400">Raspberry Pi ↔ EmStat Pico</p>
          </div>
        </div>

        <div className="relative bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 border border-slate-700 rounded-xl p-8">
          <div className="grid grid-cols-3 gap-8 items-center">
            {/* Raspberry Pi side */}
            <div className="space-y-3">
              <div className="text-center font-bold text-purple-400 mb-4">Raspberry Pi</div>
              <div className="space-y-2">
                {[
                  { pin: 'GPIO14 (TX)', color: 'green', label: 'UART TX' },
                  { pin: 'GPIO15 (RX)', color: 'green', label: 'UART RX' },
                  { pin: '5V Power', color: 'red', label: 'Alimentación' },
                  { pin: 'GND', color: 'slate', label: 'Tierra' }
                ].map((conn, idx) => (
                  <motion.div
                    key={idx}
                    className={`bg-${conn.color}-500/10 border border-${conn.color}-500/30 rounded-lg p-3`}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-bold">{conn.pin}</span>
                      <div className={`w-2 h-2 rounded-full bg-${conn.color}-500`}></div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Connection lines */}
            <div className="flex flex-col items-center gap-4">
              <ArrowRight className="w-6 h-6 text-cyan-400" />
              <div className="flex flex-col gap-2">
                {[...Array(4)].map((_, idx) => (
                  <motion.div
                    key={idx}
                    className="h-0.5 w-full bg-gradient-to-r from-purple-500 via-cyan-500 to-blue-500"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: idx * 0.15 + 0.3, duration: 0.5 }}
                  />
                ))}
              </div>
              <ArrowRight className="w-6 h-6 text-cyan-400" />
            </div>

            {/* EmStat Pico side */}
            <div className="space-y-3">
              <div className="text-center font-bold text-cyan-400 mb-4">EmStat Pico</div>
              <div className="space-y-2">
                {[
                  { pin: 'UART RX', color: 'green', label: 'Recepción' },
                  { pin: 'UART TX', color: 'green', label: 'Transmisión' },
                  { pin: 'VCC (+5V)', color: 'red', label: 'Power In' },
                  { pin: 'GND', color: 'slate', label: 'Ground' }
                ].map((conn, idx) => (
                  <motion.div
                    key={idx}
                    className={`bg-${conn.color}-500/10 border border-${conn.color}-500/30 rounded-lg p-3`}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                  >
                    <div className="flex items-center justify-between">
                      <div className={`w-2 h-2 rounded-full bg-${conn.color}-500`}></div>
                      <span className="text-sm font-bold">{conn.pin}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-slate-700">
            <div className="grid grid-cols-2 gap-4 text-xs">
              <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-3">
                <div className="font-bold text-green-400 mb-1">Protocolo: UART Serial</div>
                <div className="text-slate-400">Baud rate: 115200 bps</div>
              </div>
              <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-lg p-3">
                <div className="font-bold text-cyan-400 mb-1">Formato: MethodSCRIPT</div>
                <div className="text-slate-400">Comandos de texto ASCII</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Flipper Zero Section - Critical Testing Phase */}
      <div className="bg-gradient-to-br from-purple-900/30 via-slate-900 to-slate-900 border border-purple-500/30 rounded-xl p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center">
            <Radio className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-2xl font-bold">Simulación de Señal Electrónica - Validación GPIO</h3>
            <p className="text-sm text-slate-400">Paso intermedio recomendado del proceso de pruebas</p>
          </div>
        </div>

        {/* Process Context */}
        <div className="bg-blue-500/10 border-l-4 border-blue-500 rounded-lg p-5 mb-6">
          <div className="flex items-start gap-3">
            <Lightbulb className="w-6 h-6 text-blue-400 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold text-blue-400 mb-2">Proceso Intermedio Recomendado</h4>
              <p className="text-sm text-slate-300 mb-3">
                Antes de conectar el EmStat Pico al sistema, se <strong>recomienda</strong> realizar una simulación
                de carga eléctrica en los puertos GPIO utilizando un equipo como el Flipper Zero para validar la integridad
                de las conexiones. Este paso intermedio se ejecuta después de tener el módulo Python generando datos simulados y
                <strong className="text-blue-400"> antes de integrar hardware real</strong>.
              </p>
              <div className="flex items-center gap-2 text-xs text-blue-300">
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <span>Simulador Python</span>
                </div>
                <ArrowRight className="w-4 h-4" />
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded-full bg-purple-500 animate-pulse"></div>
                  <span className="font-bold">Validación GPIO (Flipper Zero)</span>
                </div>
                <ArrowRight className="w-4 h-4" />
                <div className="flex items-center gap-1">
                  <div className="w-3 h-3 rounded-full bg-cyan-500"></div>
                  <span>EmStat Pico Real</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Flipper Zero Hardware Image */}
          <div className="space-y-4">
            <div className="bg-slate-900/50 border border-purple-500/30 rounded-xl p-6 overflow-hidden">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-2 h-2 rounded-full bg-purple-500 animate-pulse"></div>
                <span className="text-sm font-bold text-purple-400">Simulación de Carga - GPIO Pins</span>
              </div>
              <div className="relative group mb-6">
                <div className="relative w-full h-72 bg-gradient-to-br from-slate-900 via-purple-950/30 to-slate-900 rounded-xl border-2 border-purple-500/40 overflow-hidden shadow-2xl">
                  <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-500/10 via-transparent to-transparent"></div>
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5"></div>
                  <img
                    src="/images/hardware/flipper-zero.jpg"
                    alt="Flipper Zero"
                    className="relative w-full h-full object-cover p-8 drop-shadow-2xl transition-transform duration-300 group-hover:scale-105"
                    style={{
                      filter: 'drop-shadow(0 0 30px rgba(168, 85, 247, 0.4))',
                      objectPosition: 'left center',
                      transform: 'scale(1.2)'
                    }}
                  />
                </div>
                <div className="mt-3 text-sm text-center font-bold text-purple-400">Flipper Zero</div>
                <div className="text-xs text-center text-slate-500 mb-4">Simulación de señal en módulo GPIO</div>
              </div>

              <div className="bg-slate-800 border border-slate-700 rounded-lg p-4">
                <h5 className="font-bold text-sm mb-3 text-purple-400">Pines Clave para Validación</h5>
                <div className="space-y-2 text-xs text-slate-300">
                  <div className="flex justify-between">
                    <span className="text-slate-400">TX (Pin 13):</span>
                    <span className="font-mono">Transmisión UART</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">RX (Pin 14):</span>
                    <span className="font-mono">Recepción UART</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">GND (Pin 8, 11, 18):</span>
                    <span className="font-mono">Tierra común</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">3.3V (Pin 9):</span>
                    <span className="font-mono">Alimentación</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Testing Process */}
          <div className="space-y-4">
            <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6">
              <h4 className="font-bold mb-3 flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-purple-400" />
                Objetivos de la Validación
              </h4>
              <p className="text-sm text-slate-300 mb-4">
                El Flipper Zero simula cargas eléctricas controladas en los puertos GPIO de la Raspberry Pi,
                permitiendo validar la integridad del sistema antes de conectar el potenciostato.
              </p>
              <ul className="space-y-2 text-sm text-slate-300">
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-purple-400 mt-0.5" />
                  <span>Verificar continuidad de conexiones UART (TX/RX)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-purple-400 mt-0.5" />
                  <span>Validar niveles de voltaje compatibles (3.3V)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-purple-400 mt-0.5" />
                  <span>Simular comunicación serial bidireccional</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-purple-400 mt-0.5" />
                  <span>Detectar errores de cableado para proteger el potenciostato</span>
                </li>
              </ul>
            </div>

            <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6">
              <h4 className="font-bold mb-3">Proceso de Validación</h4>
              <div className="space-y-3 text-sm">
                <div>
                  <div className="font-bold text-purple-400 mb-1">Paso 1: Conexión Física</div>
                  <div className="text-xs text-slate-400">Conectar pines GPIO del Flipper Zero a los pines correspondientes de la Raspberry Pi (TX→RX, RX→TX, GND→GND)</div>
                </div>
                <div>
                  <div className="font-bold text-cyan-400 mb-1">Paso 2: Modo UART Bridge</div>
                  <div className="text-xs text-slate-400">Configurar Flipper en modo puente UART @ 115200 baud (mismo baud rate que EmStat Pico)</div>
                </div>
                <div>
                  <div className="font-bold text-green-400 mb-1">Paso 3: Test de Loopback</div>
                  <div className="text-xs text-slate-400">Enviar comandos de prueba y verificar recepción correcta sin pérdida de datos</div>
                </div>
                <div>
                  <div className="font-bold text-orange-400 mb-1">Paso 4: Validación de Integridad</div>
                  <div className="text-xs text-slate-400">Confirmar que no hay cortocircuitos, voltajes incorrectos o conexiones sueltas</div>
                </div>
              </div>
            </div>

            <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4">
              <div className="flex items-start gap-2">
                <Shield className="w-5 h-5 text-blue-400 mt-0.5" />
                <div className="text-xs text-slate-300">
                  <strong className="text-blue-400">Recomendación:</strong> Este paso intermedio ayuda a validar
                  las conexiones GPIO antes de integrar el EmStat Pico, reduciendo el riesgo de errores de cableado.
                  Asegurar que los niveles de voltaje sean compatibles (3.3V para RPi GPIO).
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 5. SPE Detailed Explanation - CONTINUED IN NEXT PART */}
      <div className="space-y-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center">
            <CircuitBoard className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-2xl font-bold">SPE - Screen Printed Electrode</h3>
            <p className="text-sm text-slate-400">Sistema de tres electrodos para electroquímica</p>
          </div>
        </div>

        <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-8">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* SPE Visual */}
            <div>
              <div className="bg-gradient-to-br from-slate-800 to-slate-900 border-2 border-orange-500/30 rounded-xl p-6 aspect-square flex items-center justify-center">
                <div className="relative w-full h-full">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-sm text-slate-500 mb-4">SPE (vista superior)</div>
                      {/* Three electrodes visualization */}
                      <div className="relative w-72 h-72 mx-auto">
                        {electrodes.map((electrode, idx) => {
                          const angle = (idx * 120) * (Math.PI / 180)
                          const radius = 90
                          const x = Math.cos(angle) * radius
                          const y = Math.sin(angle) * radius

                          return (
                            <motion.div
                              key={electrode.id}
                              className={`absolute cursor-pointer`}
                              style={{
                                left: `calc(50% + ${x}px)`,
                                top: `calc(50% + ${y}px)`,
                                transform: 'translate(-50%, -50%)'
                              }}
                              onClick={() => setSelectedElectrode(electrode.id)}
                            >
                              <div className={`w-20 h-20 rounded-full bg-${electrode.color}-500/20 border-3 border-${electrode.color}-500 flex items-center justify-center transition-all duration-200 hover:brightness-125 ${
                                selectedElectrode === electrode.id ? 'ring-4 ring-cyan-400' : ''
                              }`}>
                                <div className="text-center">
                                  <div className={`font-bold text-${electrode.color}-400 text-base`}>{electrode.id}</div>
                                </div>
                              </div>
                            </motion.div>
                          )
                        })}

                        {/* Center sample area */}
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-slate-700 border-2 border-slate-600 flex items-center justify-center">
                          <Droplet className="w-6 h-6 text-slate-500" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <p className="text-xs text-slate-500 text-center mt-3">Haz clic en cada electrodo para detalles</p>
            </div>

            {/* Electrode Details */}
            <div className="space-y-4">
              {selectedElectrode ? (
                electrodes.filter(e => e.id === selectedElectrode).map(electrode => {
                  const Icon = electrode.icon
                  return (
                    <motion.div
                      key={electrode.id}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className={`bg-${electrode.color}-500/10 border border-${electrode.color}-500/30 rounded-xl p-6`}
                    >
                      <div className="flex items-start gap-3 mb-4">
                        <div className={`w-10 h-10 bg-${electrode.color}-500/20 rounded-lg flex items-center justify-center flex-shrink-0`}>
                          <Icon className={`w-5 h-5 text-${electrode.color}-400`} />
                        </div>
                        <div>
                          <div className={`font-bold text-${electrode.color}-400 text-lg`}>{electrode.id}</div>
                          <div className="text-sm text-slate-400">{electrode.name}</div>
                        </div>
                      </div>
                      <h4 className="font-bold mb-2">{electrode.fullName}</h4>
                      <p className="text-sm text-slate-300">{electrode.desc}</p>
                    </motion.div>
                  )
                })
              ) : (
                <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 h-full flex items-center justify-center">
                  <p className="text-sm text-slate-400 italic text-center">
                    Selecciona un electrodo (WE, RE, o CE) para ver su explicación detallada
                  </p>
                </div>
              )}

              <div className="bg-gradient-to-r from-orange-500/10 to-red-500/10 border border-orange-500/30 rounded-xl p-4">
                <h4 className="font-bold text-sm mb-2 text-orange-400">¿Por qué 3 electrodos?</h4>
                <p className="text-xs text-slate-300">
                  El sistema de tres electrodos permite realizar mediciones electroquímicas precisas manteniendo
                  el control del potencial en el WE mientras se mide la corriente, sin que el flujo de corriente
                  afecte el potencial de referencia. El CE soporta toda la corriente del circuito, permitiendo
                  que el RE mantenga un potencial estable para mediciones precisas.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 6. DPV and SWV Techniques */}
      <div className="space-y-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center">
            <Activity className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-2xl font-bold">Técnicas Electroquímicas - Laboratorio Ágil</h3>
            <p className="text-sm text-slate-400">DPV y SWV para detección de analitos</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* DPV - Differential Pulse Voltammetry */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-gradient-to-br from-cyan-500/10 to-transparent border border-cyan-500/30 rounded-xl p-6 hover:border-cyan-500/50 transition-colors"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-cyan-500/20 rounded-lg flex items-center justify-center">
                <Zap className="w-5 h-5 text-cyan-400" />
              </div>
              <div>
                <h4 className="text-xl font-bold text-cyan-400">DPV</h4>
                <p className="text-xs text-slate-400">Differential Pulse Voltammetry</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h5 className="font-bold text-sm mb-2">Principio</h5>
                <p className="text-sm text-slate-300">
                  Aplica pulsos de potencial pequeños superpuestos a una rampa lineal, midiendo la corriente
                  antes y después de cada pulso. La diferencia de corriente se grafica vs. potencial.
                </p>
              </div>

              <div className="bg-slate-900/50 border border-slate-700 rounded-lg p-4">
                <h5 className="font-bold text-sm mb-2 text-cyan-400">Parámetros Clave</h5>
                <div className="space-y-2 text-xs text-slate-300">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Amplitud de pulso:</span>
                    <span className="font-mono">25-100 mV</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Ancho de pulso:</span>
                    <span className="font-mono">50-200 ms</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Velocidad de barrido:</span>
                    <span className="font-mono">5-10 mV/s</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Rango típico:</span>
                    <span className="font-mono">-0.5 a +0.8 V</span>
                  </div>
                </div>
              </div>

              <div className="bg-cyan-500/10 border border-cyan-500/30 rounded-lg p-3">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-cyan-400 mt-0.5" />
                  <div className="text-xs text-slate-300">
                    <strong className="text-cyan-400">Ventaja:</strong> Alta sensibilidad y buena resolución de picos,
                    ideal para detectar bajas concentraciones de analitos.
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* SWV - Square Wave Voltammetry */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-gradient-to-br from-blue-500/10 to-transparent border border-blue-500/30 rounded-xl p-6 hover:border-blue-500/50 transition-colors"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                <Activity className="w-5 h-5 text-blue-400" />
              </div>
              <div>
                <h4 className="text-xl font-bold text-blue-400">SWV</h4>
                <p className="text-xs text-slate-400">Square Wave Voltammetry</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h5 className="font-bold text-sm mb-2">Principio</h5>
                <p className="text-sm text-slate-300">
                  Aplica una onda cuadrada simétrica superpuesta a una rampa escalera. Mide corriente en los
                  pulsos forward y reverse, graficando la diferencia neta vs. potencial.
                </p>
              </div>

              <div className="bg-slate-900/50 border border-slate-700 rounded-lg p-4">
                <h5 className="font-bold text-sm mb-2 text-blue-400">Parámetros Clave</h5>
                <div className="space-y-2 text-xs text-slate-300">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Amplitud:</span>
                    <span className="font-mono">10-50 mV</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Frecuencia:</span>
                    <span className="font-mono">10-100 Hz</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Step potential:</span>
                    <span className="font-mono">2-10 mV</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Rango típico:</span>
                    <span className="font-mono">-0.5 a +0.8 V</span>
                  </div>
                </div>
              </div>

              <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-3">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue-400 mt-0.5" />
                  <div className="text-xs text-slate-300">
                    <strong className="text-blue-400">Ventaja:</strong> Más rápida que DPV, excelente relación señal/ruido,
                    permite mediciones en tiempo real durante ejercicio.
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Comparison */}
        <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6">
          <h4 className="font-bold mb-4 text-center">¿Cuándo usar cada técnica?</h4>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-3 h-3 rounded-full bg-cyan-500"></div>
                <span className="font-bold text-cyan-400">DPV</span>
              </div>
              <ul className="space-y-2 text-sm text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="text-cyan-400 mt-1">→</span>
                  <span>Calibración inicial y caracterización del bioreceptor</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cyan-400 mt-1">→</span>
                  <span>Mediciones de alta precisión en laboratorio</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-cyan-400 mt-1">→</span>
                  <span>Cuando se requiere máxima sensibilidad</span>
                </li>
              </ul>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                <span className="font-bold text-blue-400">SWV</span>
              </div>
              <ul className="space-y-2 text-sm text-slate-300">
                <li className="flex items-start gap-2">
                  <span className="text-blue-400 mt-1">→</span>
                  <span>Monitoreo continuo durante ejercicio físico</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-400 mt-1">→</span>
                  <span>Mediciones rápidas con buena relación señal/ruido</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-400 mt-1">→</span>
                  <span>Aplicaciones en tiempo real del POC</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* 7. PSTrace Workflow and MethodScript */}
      <div className="space-y-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
            <Code2 className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-2xl font-bold">Workflow de Fine Tuning con PSTrace</h3>
            <p className="text-sm text-slate-400">Del laboratorio al código embebido en Raspberry Pi</p>
          </div>
        </div>

        {/* Workflow Steps */}
        <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-8">
          <div className="space-y-6">
            {workflowSteps.map((step, idx) => {
              const Icon = step.icon
              const isActive = activeWorkflowStep === idx

              return (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  className="relative"
                >
                  <div
                    className={`flex items-start gap-4 cursor-pointer ${
                      isActive ? 'scale-105' : ''
                    }`}
                    onClick={() => setActiveWorkflowStep(idx)}
                  >
                    {/* Step number and icon */}
                    <div className="flex-shrink-0">
                      <motion.div
                        className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold transition-all ${
                          isActive
                            ? 'bg-gradient-to-br from-cyan-500 to-blue-600 text-white scale-110'
                            : 'bg-slate-800 text-slate-400'
                        }`}
                        whileHover={{ scale: 1.1 }}
                      >
                        {step.step}
                      </motion.div>
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <Icon className={`w-5 h-5 ${isActive ? 'text-cyan-400' : 'text-slate-500'}`} />
                        <h4 className={`font-bold ${isActive ? 'text-cyan-400' : 'text-slate-300'}`}>
                          {step.title}
                        </h4>
                      </div>
                      <p className="text-sm text-slate-400">{step.desc}</p>

                      {/* Visual indicators for specific steps */}
                      {isActive && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          className="mt-3"
                        >
                          {step.step === 2 && (
                            <div className="bg-slate-800 border border-slate-700 rounded-lg p-3 text-xs font-mono text-slate-300">
                              <div className="text-cyan-400 mb-1"># Parámetros PSTrace</div>
                              <div>E_begin = -0.5 V</div>
                              <div>E_end = 0.8 V</div>
                              <div>E_step = 0.005 V</div>
                              <div>E_pulse = 0.050 V</div>
                              <div>t_pulse = 0.100 s</div>
                            </div>
                          )}
                          {step.step === 4 && (
                            <div className="bg-slate-800 border border-slate-700 rounded-lg p-3 text-xs font-mono text-slate-300">
                              <div className="text-green-400 mb-1"># MethodScript Exportado</div>
                              <div className="text-slate-400">e</div>
                              <div>var c</div>
                              <div>var p</div>
                              <div>set_pgstat_chan 1</div>
                              <div>set_pgstat_mode 0</div>
                              <div>set_max_bandwidth 200</div>
                              <div className="text-blue-400">meas_loop_dpv p c -0.5 0.8 0.005 0.05 0.1</div>
                              <div className="text-slate-400">endloop</div>
                            </div>
                          )}
                          {step.step === 5 && (
                            <div className="bg-slate-800 border border-slate-700 rounded-lg p-3 text-xs font-mono text-slate-300">
                              <div className="text-purple-400 mb-1"># Código Python en RPi</div>
                              <div><span className="text-orange-400">import</span> serial</div>
                              <div><span className="text-orange-400">import</span> time</div>
                              <div className="mt-2">
                                <div><span className="text-blue-400">def</span> <span className="text-yellow-400">run_dpv_measurement</span>():</div>
                                <div className="ml-4">ser = serial.Serial(<span className="text-green-400">'/dev/ttyUSB0'</span>, <span className="text-cyan-400">115200</span>)</div>
                                <div className="ml-4">methodscript = load_script(<span className="text-green-400">'dpv_config.mscr'</span>)</div>
                                <div className="ml-4">ser.write(methodscript.encode())</div>
                                <div className="ml-4"><span className="text-blue-400">return</span> parse_response(ser.read())</div>
                              </div>
                            </div>
                          )}
                        </motion.div>
                      )}
                    </div>
                  </div>

                  {/* Connecting line */}
                  {idx < workflowSteps.length - 1 && (
                    <div className="absolute left-6 top-12 w-0.5 h-10 bg-gradient-to-b from-cyan-500/50 to-transparent"></div>
                  )}
                </motion.div>
              )
            })}
          </div>
        </div>

        {/* Key Concept: MethodScript Integration */}
        <div className="bg-gradient-to-r from-green-500/10 via-cyan-500/10 to-blue-500/10 border border-cyan-500/30 rounded-xl p-6">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-12 h-12 bg-cyan-500/20 rounded-xl flex items-center justify-center">
              <Lightbulb className="w-6 h-6 text-cyan-400" />
            </div>
            <div>
              <h4 className="font-bold text-lg mb-3 text-cyan-400">Concepto Clave: De PSTrace a Producción</h4>
              <p className="text-sm text-slate-300 mb-4">
                El proceso de fine tuning con PSTrace permite optimizar los parámetros electroquímicos en un
                entorno controlado de laboratorio. Una vez validados, estos parámetros se exportan como
                <span className="font-mono text-cyan-400 mx-1">MethodScript</span> - un lenguaje de scripting
                propietario de PalmSens que encapsula toda la configuración de la técnica electroquímica.
              </p>
              <p className="text-sm text-slate-300 mb-4">
                Este script se integra directamente en el código Python de la Raspberry Pi, que lo transmite
                vía UART al EmStat Pico. El potenciostato interpreta el MethodScript y ejecuta las mediciones
                configuradas, retornando los datos crudos (potencial vs. corriente) que son procesados,
                almacenados y visualizados en tiempo real por el sistema BioBridge.
              </p>
              <div className="flex items-center gap-2 text-xs text-cyan-300">
                <ArrowRight className="w-4 h-4" />
                <span className="font-bold">Resultado:</span>
                <span>Transición fluida del laboratorio a la implementación en campo sin reconfiguración manual</span>
              </div>
            </div>
          </div>
        </div>

        {/* Visual Flow Diagram */}
        <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6">
          <h4 className="font-bold mb-6 text-center">Flujo de Datos: Fine Tuning → Captura en Tiempo Real</h4>
          <div className="flex items-center justify-between gap-2">
            {[
              { icon: Monitor, label: 'PC + PSTrace', color: 'blue' },
              { icon: ArrowRight, label: '', color: 'cyan' },
              { icon: Code2, label: 'MethodScript', color: 'green' },
              { icon: ArrowRight, label: '', color: 'cyan' },
              { icon: Cpu, label: 'Raspberry Pi', color: 'purple' },
              { icon: ArrowRight, label: '', color: 'cyan' },
              { icon: Radio, label: 'EmStat Pico', color: 'cyan' },
              { icon: ArrowRight, label: '', color: 'cyan' },
              { icon: Activity, label: 'Datos Real-Time', color: 'orange' }
            ].map((item, idx) => {
              const Icon = item.icon
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: idx * 0.1 }}
                  className="flex flex-col items-center"
                >
                  {item.label ? (
                    <>
                      <div className={`w-12 h-12 bg-${item.color}-500/20 border border-${item.color}-500/50 rounded-lg flex items-center justify-center mb-2`}>
                        <Icon className={`w-6 h-6 text-${item.color}-400`} />
                      </div>
                      <span className="text-xs text-slate-400 text-center">{item.label}</span>
                    </>
                  ) : (
                    <Icon className={`w-5 h-5 text-${item.color}-400 mb-6`} />
                  )}
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>

      {/* 8. Software Architecture */}
      <div className="space-y-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center">
            <Layers className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-2xl font-bold">Arquitectura de Software</h3>
            <p className="text-sm text-slate-400">Capas, componentes y estructura del proyecto</p>
          </div>
        </div>

        {/* Architecture Layers Diagram */}
        <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-8">
          <h4 className="font-bold mb-6 text-center text-lg">Arquitectura en Capas</h4>

          <div className="space-y-4">
            {/* Layer 1: Frontend */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border-l-4 border-cyan-500 rounded-lg p-6"
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-cyan-500/20 rounded-lg flex items-center justify-center">
                  <Monitor className="w-6 h-6 text-cyan-400" />
                </div>
                <div className="flex-1">
                  <h5 className="font-bold text-lg text-cyan-400 mb-2">Capa de Presentación - Frontend</h5>
                  <p className="text-sm text-slate-300 mb-3">
                    Interfaz de usuario reactiva construida con React + Vite para visualización en tiempo real
                  </p>
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
                    {[
                      { name: 'React 18', desc: 'UI Library', color: 'cyan' },
                      { name: 'Vite', desc: 'Build Tool', color: 'blue' },
                      { name: 'Tailwind CSS', desc: 'Styling', color: 'purple' },
                      { name: 'Recharts', desc: 'Data Viz', color: 'green' },
                      { name: 'Framer Motion', desc: 'Animations', color: 'pink' },
                      { name: 'Lucide Icons', desc: 'Icons', color: 'orange' }
                    ].map((tech, idx) => (
                      <div key={idx} className={`bg-slate-800 border border-${tech.color}-500/30 rounded p-2`}>
                        <div className={`text-xs font-bold text-${tech.color}-400`}>{tech.name}</div>
                        <div className="text-xs text-slate-500">{tech.desc}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Layer 2: Backend API */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-gradient-to-r from-green-500/10 to-emerald-500/10 border-l-4 border-green-500 rounded-lg p-6"
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center">
                  <Activity className="w-6 h-6 text-green-400" />
                </div>
                <div className="flex-1">
                  <h5 className="font-bold text-lg text-green-400 mb-2">Capa de Aplicación - Backend API</h5>
                  <p className="text-sm text-slate-300 mb-3">
                    API REST asíncrona con FastAPI para procesamiento y orquestación de datos
                  </p>
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
                    {[
                      { name: 'FastAPI', desc: 'Web Framework', color: 'green' },
                      { name: 'Uvicorn', desc: 'ASGI Server', color: 'emerald' },
                      { name: 'Pydantic', desc: 'Data Validation', color: 'teal' },
                      { name: 'SQLAlchemy', desc: 'ORM', color: 'cyan' },
                      { name: 'AsyncPG', desc: 'Async DB Driver', color: 'blue' },
                      { name: 'Alembic', desc: 'Migrations', color: 'purple' }
                    ].map((tech, idx) => (
                      <div key={idx} className={`bg-slate-800 border border-${tech.color}-500/30 rounded p-2`}>
                        <div className={`text-xs font-bold text-${tech.color}-400`}>{tech.name}</div>
                        <div className="text-xs text-slate-500">{tech.desc}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Layer 3: Database */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border-l-4 border-purple-500 rounded-lg p-6"
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center">
                  <Activity className="w-6 h-6 text-purple-400" />
                </div>
                <div className="flex-1">
                  <h5 className="font-bold text-lg text-purple-400 mb-2">Capa de Persistencia - Database</h5>
                  <p className="text-sm text-slate-300 mb-3">
                    Base de datos relacional PostgreSQL para almacenamiento de series temporales
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    <div className="bg-slate-800 border border-purple-500/30 rounded p-3">
                      <div className="text-xs font-bold text-purple-400 mb-1">PostgreSQL 16</div>
                      <div className="text-xs text-slate-400">
                        • Tablas: measurements, sources, sessions<br/>
                        • Índices optimizados para queries temporales<br/>
                        • JSON support para metadata flexible
                      </div>
                    </div>
                    <div className="bg-slate-800 border border-pink-500/30 rounded p-3">
                      <div className="text-xs font-bold text-pink-400 mb-1">Schema Design</div>
                      <div className="text-xs text-slate-400">
                        • Measurements: timestamp, metric, value<br/>
                        • Sources: configuración de sensores<br/>
                        • Sessions: metadata de experimentos
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Layer 4: Hardware/GPIO */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-gradient-to-r from-orange-500/10 to-red-500/10 border-l-4 border-orange-500 rounded-lg p-6"
            >
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 bg-orange-500/20 rounded-lg flex items-center justify-center">
                  <Cpu className="w-6 h-6 text-orange-400" />
                </div>
                <div className="flex-1">
                  <h5 className="font-bold text-lg text-orange-400 mb-2">Capa de Adquisición - Hardware Interface</h5>
                  <p className="text-sm text-slate-300 mb-3">
                    Librerías de comunicación GPIO/Serial para control de hardware
                  </p>
                  <div className="grid grid-cols-2 lg:grid-cols-3 gap-2">
                    {[
                      { name: 'RPi.GPIO', desc: 'GPIO Control', color: 'orange' },
                      { name: 'smbus2', desc: 'I2C Protocol', color: 'red' },
                      { name: 'spidev', desc: 'SPI Protocol', color: 'pink' },
                      { name: 'pyserial', desc: 'UART/Serial', color: 'yellow' },
                      { name: 'MethodScript', desc: 'EmStat Commands', color: 'cyan' }
                    ].map((tech, idx) => (
                      <div key={idx} className={`bg-slate-800 border border-${tech.color}-500/30 rounded p-2`}>
                        <div className={`text-xs font-bold text-${tech.color}-400`}>{tech.name}</div>
                        <div className="text-xs text-slate-500">{tech.desc}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Data Flow Arrows */}
          <div className="mt-6 flex items-center justify-center gap-3 text-xs text-slate-400">
            <span>Hardware</span>
            <ArrowRight className="w-4 h-4 text-orange-400" />
            <span>Backend</span>
            <ArrowRight className="w-4 h-4 text-green-400" />
            <span>Database</span>
            <ArrowRight className="w-4 h-4 text-purple-400" />
            <span>API</span>
            <ArrowRight className="w-4 h-4 text-cyan-400" />
            <span>Frontend</span>
          </div>
        </div>

        {/* Directory Structure */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Project Tree */}
          <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6">
            <h4 className="font-bold mb-4 flex items-center gap-2">
              <Code2 className="w-5 h-5 text-cyan-400" />
              Estructura del Proyecto
            </h4>
            <div className="bg-slate-950 border border-slate-800 rounded-lg p-4 font-mono text-xs text-slate-300 overflow-x-auto">
              <div className="space-y-1">
                <div className="text-cyan-400">biobridge/</div>
                <div className="ml-3">├── <span className="text-blue-400">frontend/</span> <span className="text-slate-500">← React + Vite UI</span></div>
                <div className="ml-6">├── src/</div>
                <div className="ml-9">├── App.jsx <span className="text-slate-500">← Dashboard principal</span></div>
                <div className="ml-9">└── Landing.jsx <span className="text-slate-500">← Landing page</span></div>
                <div className="ml-6">├── package.json</div>
                <div className="ml-6">└── vite.config.js</div>

                <div className="ml-3 mt-2">├── <span className="text-green-400">backend/</span> <span className="text-slate-500">← FastAPI Server</span></div>
                <div className="ml-6">├── app/</div>
                <div className="ml-9">├── main.py <span className="text-slate-500">← Entry point</span></div>
                <div className="ml-9">├── api/v1/ <span className="text-slate-500">← REST endpoints</span></div>
                <div className="ml-9">├── db/ <span className="text-slate-500">← Database models</span></div>
                <div className="ml-9">├── schemas/ <span className="text-slate-500">← Pydantic schemas</span></div>
                <div className="ml-9">└── services/</div>
                <div className="ml-12">└── acquisition/</div>
                <div className="ml-15 text-orange-400">└── sources/ <span className="text-slate-500">← GPIO/Simulator</span></div>
                <div className="ml-6">└── requirements.txt</div>

                <div className="ml-3 mt-2">├── <span className="text-purple-400">infra/</span> <span className="text-slate-500">← Infrastructure</span></div>
                <div className="ml-6">├── compose/</div>
                <div className="ml-9">└── docker-compose.yml</div>
                <div className="ml-6">└── docker/</div>
                <div className="ml-9">├── Dockerfile.backend</div>
                <div className="ml-9">└── Dockerfile.frontend</div>

                <div className="ml-3 mt-2">├── <span className="text-yellow-400">scripts/</span> <span className="text-slate-500">← Deployment scripts</span></div>
                <div className="ml-6">├── methodscripts/ <span className="text-red-400">← ⚠ Propiedad intelectual</span></div>
                <div className="ml-9">├── dpv_config.mscr</div>
                <div className="ml-9">└── swv_config.mscr</div>
                <div className="ml-6">└── deploy_pi.sh</div>

                <div className="ml-3 mt-2">├── <span className="text-cyan-400">docs/</span> <span className="text-slate-500">← Documentation</span></div>
                <div className="ml-6">├── raspberry-pi-setup.md</div>
                <div className="ml-6">├── gpio.md</div>
                <div className="ml-6">└── runbook.md</div>

                <div className="ml-3 mt-2">├── .env <span className="text-slate-500">← Environment config</span></div>
                <div className="ml-3">├── README.md</div>
                <div className="ml-3">└── .gitignore</div>
              </div>
            </div>
          </div>

          {/* Component Explanations */}
          <div className="space-y-4">
            <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6">
              <h4 className="font-bold mb-4 flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-cyan-400" />
                Componentes Clave
              </h4>
              <div className="space-y-3 text-sm">
                <div>
                  <div className="font-bold text-cyan-400 mb-1">Frontend (React + Vite)</div>
                  <div className="text-xs text-slate-400">
                    Aplicación SPA (Single Page Application) que consume la API REST del backend.
                    Visualiza datos en tiempo real usando WebSocket o polling. Gráficos con Recharts.
                  </div>
                </div>
                <div>
                  <div className="font-bold text-green-400 mb-1">Backend (FastAPI)</div>
                  <div className="text-xs text-slate-400">
                    API asíncrona que orquesta la adquisición de datos desde GPIO o simulador,
                    procesa mediciones, y las almacena en PostgreSQL. Expone endpoints REST.
                  </div>
                </div>
                <div>
                  <div className="font-bold text-purple-400 mb-1">Database (PostgreSQL)</div>
                  <div className="text-xs text-slate-400">
                    Almacena series temporales de mediciones (timestamp, metric_name, value),
                    configuración de sources, y metadata de sesiones experimentales.
                  </div>
                </div>
                <div>
                  <div className="font-bold text-orange-400 mb-1">Acquisition Sources</div>
                  <div className="text-xs text-slate-400">
                    Abstracción que permite modo "simulator" (datos sintéticos) o "gpio" (hardware real).
                    En modo GPIO, usa librerías RPi.GPIO, smbus2, spidev para comunicación.
                  </div>
                </div>
              </div>
            </div>

            {/* MethodScript Security Note */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-gradient-to-r from-red-500/10 via-orange-500/10 to-yellow-500/10 border-2 border-red-500/50 rounded-xl p-5"
            >
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0">
                  <AlertTriangle className="w-6 h-6 text-red-400" />
                </div>
                <div>
                  <h5 className="font-bold text-red-400 mb-2 flex items-center gap-2">
                    Propiedad Intelectual - MethodScripts
                  </h5>
                  <p className="text-sm text-slate-300 mb-3">
                    Los archivos <span className="font-mono text-orange-400">*.mscr</span> en{' '}
                    <span className="font-mono text-cyan-400">scripts/methodscripts/</span> contienen
                    configuraciones calibradas de técnicas electroquímicas optimizadas para el bioreceptor.
                  </p>
                  <div className="bg-slate-900/50 border border-orange-500/30 rounded-lg p-3 mb-3">
                    <div className="text-xs font-bold text-orange-400 mb-2">Estado Actual (POC):</div>
                    <ul className="text-xs text-slate-300 space-y-1">
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-3 h-3 text-green-400" />
                        Scripts almacenados como texto plano en repositorio
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-3 h-3 text-green-400" />
                        Control de acceso mediante permisos Git
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-3 h-3 text-green-400" />
                        Suficiente para fase de desarrollo interno
                      </li>
                    </ul>
                  </div>
                  <div className="bg-slate-900/50 border border-red-500/30 rounded-lg p-3">
                    <div className="text-xs font-bold text-red-400 mb-2">Futuro (Producción):</div>
                    <ul className="text-xs text-slate-300 space-y-1">
                      <li className="flex items-center gap-2">
                        <AlertTriangle className="w-3 h-3 text-yellow-400" />
                        <strong>Encriptación AES-256</strong> de archivos .mscr antes de distribución
                      </li>
                      <li className="flex items-center gap-2">
                        <AlertTriangle className="w-3 h-3 text-yellow-400" />
                        <strong>Obfuscación</strong> del código Python que carga los scripts
                      </li>
                      <li className="flex items-center gap-2">
                        <AlertTriangle className="w-3 h-3 text-yellow-400" />
                        <strong>Hardware Security Module (HSM)</strong> para almacenar claves
                      </li>
                      <li className="flex items-center gap-2">
                        <AlertTriangle className="w-3 h-3 text-yellow-400" />
                        <strong>Licenciamiento por dispositivo</strong> con validación online
                      </li>
                    </ul>
                  </div>
                  <div className="mt-3 pt-3 border-t border-red-500/30">
                    <p className="text-xs text-slate-400">
                      <strong className="text-red-400">Rationale:</strong> Los MethodScripts representan
                      meses de optimización experimental y son el núcleo diferenciador del producto.
                      Protegerlos es crítico para mantener ventaja competitiva en un eventual
                      escenario de comercialización o licenciamiento a terceros.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Integration Flow */}
        <div className="bg-slate-900/50 border border-slate-800 rounded-xl p-6">
          <h4 className="font-bold mb-6 text-center">Flujo de Integración Completo</h4>
          <div className="relative">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              {[
                { icon: Cpu, title: 'EmStat Pico', desc: 'Ejecuta MethodScript', color: 'orange' },
                { icon: Waypoints, title: 'UART/GPIO', desc: 'Serial @ 115200 baud', color: 'green' },
                { icon: Code2, title: 'Backend Python', desc: 'Procesa datos crudos', color: 'cyan' },
                { icon: Activity, title: 'PostgreSQL', desc: 'Persiste mediciones', color: 'purple' },
                { icon: Monitor, title: 'React UI', desc: 'Visualiza en tiempo real', color: 'blue' }
              ].map((step, idx) => {
                const Icon = step.icon
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="relative"
                  >
                    <div className={`bg-${step.color}-500/10 border border-${step.color}-500/30 rounded-xl p-4 text-center`}>
                      <div className={`w-12 h-12 bg-${step.color}-500/20 rounded-lg flex items-center justify-center mx-auto mb-3`}>
                        <Icon className={`w-6 h-6 text-${step.color}-400`} />
                      </div>
                      <div className={`font-bold text-sm text-${step.color}-400 mb-1`}>{step.title}</div>
                      <div className="text-xs text-slate-400">{step.desc}</div>
                    </div>
                    {idx < 4 && (
                      <div className="hidden md:block absolute top-1/2 -right-2 transform -translate-y-1/2">
                        <ArrowRight className="w-4 h-4 text-cyan-400" />
                      </div>
                    )}
                  </motion.div>
                )
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Final Summary */}
      <div className="bg-gradient-to-br from-cyan-500/10 via-blue-500/10 to-purple-500/10 border border-cyan-500/30 rounded-2xl p-8">
        <h3 className="text-2xl font-bold mb-4 text-center">Integración Completa del Sistema</h3>
        <p className="text-slate-300 text-center max-w-3xl mx-auto mb-6">
          Este modelo técnico representa la convergencia de hardware especializado, protocolos de comunicación estandarizados,
          y software embebido que trabajan en armonía para convertir señales electroquímicas de bioreceptores en datos
          digitales procesables en tiempo real. Cada componente cumple un rol crítico en la cadena de valor desde la
          detección molecular hasta la visualización de insights para el usuario final.
        </p>
        <div className="grid md:grid-cols-3 gap-4">
          {[
            { icon: Box, title: 'Hardware Validado', desc: 'EmStat Pico comercial reduce riesgo técnico' },
            { icon: Waypoints, title: 'Protocolos Estándar', desc: 'UART, I2C, MethodScript garantizan interoperabilidad' },
            { icon: Cpu, title: 'Control Embebido', desc: 'Raspberry Pi orquesta todo el flujo de datos' }
          ].map((item, idx) => {
            const Icon = item.icon
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="bg-slate-900/50 border border-slate-800 rounded-xl p-4 text-center"
              >
                <div className="w-10 h-10 bg-cyan-500/20 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Icon className="w-5 h-5 text-cyan-400" />
                </div>
                <h4 className="font-bold text-sm mb-2">{item.title}</h4>
                <p className="text-xs text-slate-400">{item.desc}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default Landing
