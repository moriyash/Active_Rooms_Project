import React, { useState } from 'react';
import './BuildingButton.css';

const BuildingButton = ({ building, status, onClick, position }) => {
  const [isHovered, setIsHovered] = useState(false);

 

  const getStatusText = () => {
    switch (status) {
      case 'active':
        return 'פעיל';
      case 'alert':
        return 'התראה';
      case 'inactive':
        return 'לא פעיל';
      default:
        return 'לא ידוע';
    }
  };

  const getBuildingIcon = () => {
    const name = building.name.toLowerCase();
    if (name.includes('מחשב') || name.includes('טכנולוגיה')) return '';
    if (name.includes('הנדסה')) return '';
    if (name.includes('ספריה')) return '';
    if (name.includes('מנהלה') || name.includes('משרד')) return '';
    if (name.includes('מעבדה')) return '';
    if (name.includes('אולם') || name.includes('כיתה')) return '';
    return '';
  };

  const handleClick = (e) => {
    e.stopPropagation();
    onClick(building.id);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div 
      className={`building-button ${status} ${isHovered ? 'hovered' : ''}`}
      style={{
        left: `${position.x}%`,
        top: `${position.y}%`
      }}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      title={`${building.name} - ${getStatusText()}`}
    >
      {/* Main Building Icon */}
      <div className="building-icon">
        <div className="building-symbol">{getBuildingIcon()}</div>
        <div className="status-indicator">
          {getStatusIcon()}
        </div>
      </div>

      {/* Building Info Tooltip */}
      <div className={`building-info ${isHovered ? 'visible' : ''}`}>
        <div className="building-info-header">
          <h4 className="building-name">{building.name}</h4>
          <span className={`status-badge ${status}`}>
            {getStatusText()}
          </span>
        </div>
        
        {building.description && (
          <p className="building-description">
            {building.description.length > 60 
              ? building.description.substring(0, 60) + '...' 
              : building.description}
          </p>
        )}
        
        <div className="building-details">
          <div className="detail-item">
            <span className="detail-icon"></span>
            <span className="detail-text">{building.floorCount || 0} קומות</span>
          </div>
          <div className="detail-item">
            <span className="detail-icon"></span>
            <span className="detail-text">{building.sensorCount || 0} סנסורים</span>
          </div>
        </div>

        <div className="building-action">
          <span className="action-text">לחץ לצפייה</span>
          <span className="action-arrow">→</span>
        </div>

        {/* Tooltip Arrow */}
        <div className="tooltip-arrow"></div>
      </div>

      {/* Pulse Animation for Active/Alert */}
      {(status === 'active' || status === 'alert') && (
        <div className={`building-pulse ${status}`}></div>
      )}

      {/* Alert Badge */}
      {status === 'alert' && (
        <div className="alert-badge">
          <span>!</span>
        </div>
      )}
    </div>
  );
};

export default BuildingButton;