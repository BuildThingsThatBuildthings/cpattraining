import React, { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';

interface TherapeuticTooltipProps {
  children: React.ReactNode;
  content: string | React.ReactNode;
  placement?: 'top' | 'bottom' | 'left' | 'right' | 'auto';
  variant?: 'default' | 'sage' | 'champagne' | 'pearl' | 'clinical';
  size?: 'small' | 'medium' | 'large';
  delay?: number;
  disabled?: boolean;
  interactive?: boolean;
  className?: string;
  maxWidth?: number;
  showArrow?: boolean;
  trigger?: 'hover' | 'click' | 'focus';
  onShow?: () => void;
  onHide?: () => void;
}

const TherapeuticTooltip: React.FC<TherapeuticTooltipProps> = ({
  children,
  content,
  placement = 'auto',
  variant = 'default',
  size = 'medium',
  delay = 200,
  disabled = false,
  interactive = false,
  className = '',
  maxWidth = 300,
  showArrow = true,
  trigger = 'hover',
  onShow,
  onHide
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [actualPlacement, setActualPlacement] = useState(placement);
  const [isReady, setIsReady] = useState(false);
  
  const triggerRef = useRef<HTMLDivElement>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isMouseInTooltip = useRef(false);
  const isMouseInTrigger = useRef(false);

  const variantStyles = {
    default: {
      background: 'rgba(15, 23, 42, 0.95)',
      border: '1px solid rgba(148, 163, 184, 0.2)',
      color: '#f8fafc',
      shadow: '0 10px 25px -5px rgba(0, 0, 0, 0.3)',
      backdropFilter: undefined
    },
    sage: {
      background: 'linear-gradient(135deg, #8FA68E, #A8C09A)',
      border: '1px solid #6B7D6A',
      color: 'white',
      shadow: '0 10px 25px -5px rgba(143, 166, 142, 0.4)',
      backdropFilter: undefined
    },
    champagne: {
      background: 'linear-gradient(135deg, #D4AF37, #F7E98E)',
      border: '1px solid #C8856A',
      color: '#1e293b',
      shadow: '0 10px 25px -5px rgba(212, 175, 55, 0.4)',
      backdropFilter: undefined
    },
    pearl: {
      background: 'rgba(247, 245, 243, 0.95)',
      border: '1px solid rgba(247, 245, 243, 0.3)',
      color: '#374151',
      shadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)',
      backdropFilter: 'blur(10px)'
    },
    clinical: {
      background: 'rgba(255, 255, 255, 0.98)',
      border: '1px solid rgba(0, 0, 0, 0.1)',
      color: '#374151',
      shadow: '0 4px 12px -2px rgba(0, 0, 0, 0.1)',
      backdropFilter: undefined
    }
  };

  const sizeStyles = {
    small: {
      padding: '6px 8px',
      fontSize: '12px',
      borderRadius: '6px',
      arrowSize: 4
    },
    medium: {
      padding: '8px 12px',
      fontSize: '14px',
      borderRadius: '8px',
      arrowSize: 5
    },
    large: {
      padding: '12px 16px',
      fontSize: '16px',
      borderRadius: '12px',
      arrowSize: 6
    }
  };

  const currentVariant = variantStyles[variant];
  const currentSize = sizeStyles[size];

  const calculatePosition = () => {
    if (!triggerRef.current || !tooltipRef.current) return;

    const triggerRect = triggerRef.current.getBoundingClientRect();
    const tooltipRect = tooltipRef.current.getBoundingClientRect();
    const viewport = {
      width: window.innerWidth,
      height: window.innerHeight
    };

    let x = 0;
    let y = 0;
    let finalPlacement = placement;

    // Auto placement logic
    if (placement === 'auto') {
      const spaceTop = triggerRect.top;
      const spaceBottom = viewport.height - triggerRect.bottom;
      const spaceLeft = triggerRect.left;
      const spaceRight = viewport.width - triggerRect.right;

      const maxSpace = Math.max(spaceTop, spaceBottom, spaceLeft, spaceRight);
      
      if (maxSpace === spaceTop && spaceTop >= tooltipRect.height + 10) {
        finalPlacement = 'top';
      } else if (maxSpace === spaceBottom && spaceBottom >= tooltipRect.height + 10) {
        finalPlacement = 'bottom';
      } else if (maxSpace === spaceLeft && spaceLeft >= tooltipRect.width + 10) {
        finalPlacement = 'left';
      } else {
        finalPlacement = 'right';
      }
    }

    // Position calculation based on final placement
    switch (finalPlacement) {
      case 'top':
        x = triggerRect.left + (triggerRect.width - tooltipRect.width) / 2;
        y = triggerRect.top - tooltipRect.height - 8;
        break;
      case 'bottom':
        x = triggerRect.left + (triggerRect.width - tooltipRect.width) / 2;
        y = triggerRect.bottom + 8;
        break;
      case 'left':
        x = triggerRect.left - tooltipRect.width - 8;
        y = triggerRect.top + (triggerRect.height - tooltipRect.height) / 2;
        break;
      case 'right':
        x = triggerRect.right + 8;
        y = triggerRect.top + (triggerRect.height - tooltipRect.height) / 2;
        break;
    }

    // Viewport boundary checks
    x = Math.max(8, Math.min(x, viewport.width - tooltipRect.width - 8));
    y = Math.max(8, Math.min(y, viewport.height - tooltipRect.height - 8));

    setPosition({ x, y });
    setActualPlacement(finalPlacement);
    setIsReady(true);
  };

  const showTooltip = () => {
    if (disabled) return;
    
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    
    timeoutRef.current = setTimeout(() => {
      setIsVisible(true);
      onShow?.();
    }, delay);
  };

  const hideTooltip = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    
    timeoutRef.current = setTimeout(() => {
      if (!interactive || (!isMouseInTooltip.current && !isMouseInTrigger.current)) {
        setIsVisible(false);
        setIsReady(false);
        onHide?.();
      }
    }, interactive ? 100 : 0);
  };

  const handleMouseEnter = () => {
    if (trigger === 'hover') {
      isMouseInTrigger.current = true;
      showTooltip();
    }
  };

  const handleMouseLeave = () => {
    if (trigger === 'hover') {
      isMouseInTrigger.current = false;
      hideTooltip();
    }
  };

  const handleClick = () => {
    if (trigger === 'click') {
      if (isVisible) {
        hideTooltip();
      } else {
        showTooltip();
      }
    }
  };

  const handleFocus = () => {
    if (trigger === 'focus') {
      showTooltip();
    }
  };

  const handleBlur = () => {
    if (trigger === 'focus') {
      hideTooltip();
    }
  };

  const handleTooltipMouseEnter = () => {
    if (interactive) {
      isMouseInTooltip.current = true;
    }
  };

  const handleTooltipMouseLeave = () => {
    if (interactive) {
      isMouseInTooltip.current = false;
      hideTooltip();
    }
  };

  useEffect(() => {
    if (isVisible && tooltipRef.current) {
      calculatePosition();
    }
  }, [isVisible, content]);

  useEffect(() => {
    if (isVisible) {
      const handleResize = () => calculatePosition();
      const handleScroll = () => calculatePosition();
      
      window.addEventListener('resize', handleResize);
      window.addEventListener('scroll', handleScroll);
      
      return () => {
        window.removeEventListener('resize', handleResize);
        window.removeEventListener('scroll', handleScroll);
      };
    }
  }, [isVisible]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const getArrowStyles = () => {
    const arrowSize = currentSize.arrowSize;
    const arrowStyles: React.CSSProperties = {
      position: 'absolute',
      width: 0,
      height: 0,
      borderStyle: 'solid'
    };

    const borderColor = currentVariant.border.includes('rgba') 
      ? currentVariant.border.match(/rgba\([^)]+\)/)?.[0] || currentVariant.border
      : currentVariant.border;

    switch (actualPlacement) {
      case 'top':
        return {
          ...arrowStyles,
          bottom: `-${arrowSize}px`,
          left: '50%',
          transform: 'translateX(-50%)',
          borderWidth: `${arrowSize}px ${arrowSize}px 0 ${arrowSize}px`,
          borderColor: `${borderColor} transparent transparent transparent`
        };
      case 'bottom':
        return {
          ...arrowStyles,
          top: `-${arrowSize}px`,
          left: '50%',
          transform: 'translateX(-50%)',
          borderWidth: `0 ${arrowSize}px ${arrowSize}px ${arrowSize}px`,
          borderColor: `transparent transparent ${borderColor} transparent`
        };
      case 'left':
        return {
          ...arrowStyles,
          right: `-${arrowSize}px`,
          top: '50%',
          transform: 'translateY(-50%)',
          borderWidth: `${arrowSize}px 0 ${arrowSize}px ${arrowSize}px`,
          borderColor: `transparent transparent transparent ${borderColor}`
        };
      case 'right':
        return {
          ...arrowStyles,
          left: `-${arrowSize}px`,
          top: '50%',
          transform: 'translateY(-50%)',
          borderWidth: `${arrowSize}px ${arrowSize}px ${arrowSize}px 0`,
          borderColor: `transparent ${borderColor} transparent transparent`
        };
      default:
        return arrowStyles;
    }
  };

  const tooltip = isVisible && createPortal(
    <div
      ref={tooltipRef}
      className={`
        fixed z-50 pointer-events-none transition-all duration-200 ease-out
        ${isReady ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}
        ${interactive ? 'pointer-events-auto' : ''}
        ${className}
      `}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        maxWidth: `${maxWidth}px`,
        ...currentVariant,
        padding: currentSize.padding,
        fontSize: currentSize.fontSize,
        borderRadius: currentSize.borderRadius,
        boxShadow: currentVariant.shadow,
        backdropFilter: currentVariant.backdropFilter || 'none',
        WebkitBackdropFilter: currentVariant.backdropFilter || 'none'
      }}
      onMouseEnter={handleTooltipMouseEnter}
      onMouseLeave={handleTooltipMouseLeave}
      role="tooltip"
    >
      {typeof content === 'string' ? (
        <div className="break-words">{content}</div>
      ) : (
        content
      )}
      
      {showArrow && (
        <div style={getArrowStyles()} />
      )}
    </div>,
    document.body
  );

  return (
    <>
      <div
        ref={triggerRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
        onFocus={handleFocus}
        onBlur={handleBlur}
        className="inline-block"
      >
        {children}
      </div>
      {tooltip}
    </>
  );
};

export default TherapeuticTooltip;