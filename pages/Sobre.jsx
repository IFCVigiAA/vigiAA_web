
import React, { useEffect, useState } from 'react';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'; // Removed useMap
import 'leaflet/dist/leaflet.css';
import './Sobre.css';
import L from 'leaflet';
import markerIconPng from 'leaflet/dist/images/marker-icon.png';
import markerShadowPng from 'leaflet/dist/images/marker-shadow.png';
import SimpleMap from '../components/SimpleMap'; // Ensure this path is correct

// Configuração global dos ícones do Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIconPng,
  iconUrl: markerIconPng,
  shadowUrl: markerShadowPng,
});

// REMOVED MapResize component definition

const Sobre = () => {
  const position = [-26.9905, -48.6295]; // Coordenadas de Camboriú, SC
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isClient, setIsClient] = useState(false);

  // Effect to ensure code runs only on the client-side
  useEffect(() => {
    setIsClient(true);
  }, []);

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
    // When toggling fullscreen, Leaflet might need a manual size invalidation
    // if the container size changes abruptly. However, react-leaflet often handles this.
    // If issues persist after fullscreen toggle, might need to get map ref and call invalidateSize.
  };

  return (
    <div className="page-container">
      <NavBar />
      <div className="sobre-container">
        <div className="sobre-header">
          <h1>Sobre o Projeto <span>VigiAA</span></h1>
          <p>Vigilância do Aedes Aegypti</p>
        </div>

        {/* Content Sections */}
        <div className="sobre-section">
          <h2>O que é o VigiAA?</h2>
          <p>
            O <strong>VigiAA</strong> é uma plataforma georreferenciada de monitoramento do mosquito
            <em>Aedes aegypti</em>, vetor da dengue. A plataforma visa disponibilizar dados claros e acessíveis à
            população, pesquisadores e gestores públicos.
          </p>
        </div>
        <div className="sobre-section">
          <h2>Objetivos</h2>
          <ul>
            <li>Mapear e visualizar focos do mosquito em tempo real.</li>
            <li>Exibir dados de casos positivos com localização geográfica.</li>
            <li>Oferecer informação acessível à sociedade.</li>
          </ul>
        </div>
        <div className="sobre-section">
          <h2>Tecnologias Utilizadas</h2>
          <p>A plataforma foi desenvolvida com tecnologias como:</p>
          <ul className="tech-list">
            <li><strong>QGIS</strong> – para análise, criação de mapas e exportação de dados geográficos</li>
            <li><strong>React</strong> – para construção da interface web</li>
            <li><strong>Leaflet</strong> – para visualização interativa de mapas</li>
            <li><strong>PostgreSQL</strong> – para armazenamento de dados</li>
          </ul>
        </div>
        <div className="sobre-section">
          <h2>Qual a importância do projeto?</h2>
          <p>
            O VigiAA reúne informações geográficas sobre as áreas de risco e acompanha a evolução dos
            focos de infestação do mosquito Aedes Aegypti em Camboriú, incentivando a conscientização e ações preventivas.
          </p>
        </div>

        {/* Map Section */}
        <div className="sobre-section">
          <h2>Localização do Projeto</h2>
          <p>Nosso projeto está baseado em Camboriú, Santa Catarina, onde monitoramos os focos do Aedes aegypti.</p>

          {/* Render SimpleMap component only on client */}
          {isClient && <SimpleMap />}

          {/* Render main MapContainer only on client */}
          {isClient && (
            <div className={`map-wrapper ${isFullscreen ? 'fullscreen-active' : ''}`}>
              <MapContainer
                center={position}
                zoom={13}
                className="sobre-mapa" // Apply specific class for styling
                // Ensure CSS for .sobre-mapa defines height/width
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                <Marker position={position}>
                  <Popup>Base do Projeto VigiAA - Camboriú, SC</Popup>
                </Marker>
                {/* REMOVED <MapResize /> component usage */}
              </MapContainer>
              <button
                className={`fullscreen-toggle-btn ${isFullscreen ? 'exit-mode' : ''}`}
                onClick={toggleFullscreen}
              >
                {isFullscreen ? 'Sair da Tela Cheia' : 'Tela Cheia'}
              </button>
            </div>
          )}
          {/* Fallback if not client-side yet */}
          {!isClient && <p>Carregando mapas...</p>}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Sobre;

