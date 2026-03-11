import * as React from 'react';
import { Icon } from '@fluentui/react';
import styles from './ClickableBubble.module.scss';
import type { IClickableBubbleProps, ShadowIntensity } from './IClickableBubbleProps';

const getShadowValue = (intensity: ShadowIntensity): string => {
  switch (intensity) {
    case 'light':
      return '0 1px 3px rgba(0, 0, 0, 0.08)';
    case 'medium':
      return '0 2px 6px rgba(0, 0, 0, 0.12)';
    case 'strong':
      return '0 4px 12px rgba(0, 0, 0, 0.18)';
    default:
      return 'none';
  }
};

const ClickableBubble: React.FC<IClickableBubbleProps> = React.memo((props) => {
  const {
    text,
    linkUrl,
    openInNewTab,
    isClickable,
    showIcon,
    iconPosition,
    iconType,
    fluentIconName,
    customIconUrl,
    iconSize,
    iconColor,
    backgroundColor,
    textColor,
    borderColor,
    borderWidth,
    borderRadius,
    paddingVertical,
    paddingHorizontal,
    fontSize,
    fontWeight,
    hoverBackgroundColor,
    hoverTextColor,
    hoverBorderColor,
    showShadow,
    shadowIntensity,
    allowFreePositioning,
    positionX,
    positionY,
    showExternalLinkIcon,
    externalLinkIconPosition
  } = props;

  const [isHovered, setIsHovered] = React.useState(false);

  const baseStyle = React.useMemo<React.CSSProperties>(() => ({
    display: 'inline-flex',
    alignItems: 'center',
    gap: '8px',
    backgroundColor,
    color: textColor,
    border: `${borderWidth}px solid ${borderColor}`,
    borderRadius: `${borderRadius}px`,
    padding: `${paddingVertical}px ${paddingHorizontal}px`,
    fontSize: `${fontSize}px`,
    fontWeight,
    cursor: isClickable ? 'pointer' : 'default',
    transition: 'all 0.2s ease',
    textDecoration: 'none',
    boxShadow: showShadow ? getShadowValue(shadowIntensity) : 'none',
    position: 'relative',
    left: allowFreePositioning ? `${positionX}%` : 'auto',
    top: allowFreePositioning ? `${positionY}%` : 'auto',
    whiteSpace: 'nowrap',
    userSelect: 'none'
  }), [
    allowFreePositioning,
    backgroundColor,
    borderColor,
    borderRadius,
    borderWidth,
    fontSize,
    fontWeight,
    isClickable,
    paddingHorizontal,
    paddingVertical,
    positionX,
    positionY,
    showShadow,
    shadowIntensity,
    textColor
  ]);

  const bubbleStyle = React.useMemo<React.CSSProperties>(() => {
    if (!isHovered || !isClickable) {
      return baseStyle;
    }

    return {
      ...baseStyle,
      backgroundColor: hoverBackgroundColor,
      color: hoverTextColor,
      borderColor: hoverBorderColor
    };
  }, [
    baseStyle,
    hoverBackgroundColor,
    hoverBorderColor,
    hoverTextColor,
    isClickable,
    isHovered
  ]);

  const handleClick = (event: React.MouseEvent): void => {
    if (!isClickable || !linkUrl) {
      event.preventDefault();
      return;
    }

    if (openInNewTab) {
      event.preventDefault();
      window.open(linkUrl, '_blank', 'noopener,noreferrer');
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent): void => {
    if (!isClickable || !linkUrl) {
      return;
    }

    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      if (openInNewTab) {
        window.open(linkUrl, '_blank', 'noopener,noreferrer');
        return;
      }
      window.location.href = linkUrl;
    }
  };

  const canShowIcon = showIcon && iconType !== 'none';
  const renderIcon = (): React.ReactElement | null => {
    if (!canShowIcon) {
      return null;
    }

    if (iconType === 'custom' && customIconUrl) {
      return (
        <img
          src={customIconUrl}
          alt=""
          style={{ width: iconSize, height: iconSize, objectFit: 'contain' }}
        />
      );
    }

    if (iconType === 'fluent' && fluentIconName) {
      return (
        <Icon
          iconName={fluentIconName}
          style={{ fontSize: iconSize, color: iconColor }}
        />
      );
    }

    return null;
  };

  const externalIcon = showExternalLinkIcon && isClickable ? (
    <Icon
      iconName="NavigateExternalInline"
      style={{ fontSize: 12, color: iconColor, opacity: 0.7 }}
    />
  ) : null;

  const textWithInlineIcon = (
    <span className={styles.textWithInlineIcon}>
      {text}
      {externalLinkIconPosition === 'inline' ? externalIcon : null}
    </span>
  );

  const leftIcon = iconPosition === 'left' ? renderIcon() : null;
  const rightIcon = iconPosition === 'right' ? renderIcon() : null;

  const opensInNewTab = openInNewTab && isClickable && !!linkUrl;
  const ariaLabel = `${text}${opensInNewTab ? ' (opens in new tab)' : ''}`;

  return (
    <div className={`${styles.bubbleContainer} ${allowFreePositioning ? styles.freePositioning : ''}`}>
      <a
        href={isClickable && linkUrl ? linkUrl : undefined}
        style={bubbleStyle}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className={styles.clickableBubble}
        data-clickable={isClickable}
        role={isClickable ? 'link' : 'text'}
        tabIndex={isClickable ? 0 : -1}
        aria-label={ariaLabel}
        target={opensInNewTab ? '_blank' : undefined}
        rel={opensInNewTab ? 'noopener noreferrer' : undefined}
      >
        {leftIcon}
        {textWithInlineIcon}
        {rightIcon}
        {externalLinkIconPosition === 'right' ? externalIcon : null}
      </a>
    </div>
  );
});

export default ClickableBubble;
