export type IconPosition = 'left' | 'right';
export type IconType = 'fluent' | 'custom' | 'none';
export type ExternalLinkIconPosition = 'right' | 'inline';
export type ShadowIntensity = 'none' | 'light' | 'medium' | 'strong';
export type FontWeight = 'normal' | 'semibold' | 'bold';

export interface IClickableBubbleProps {
  text: string;
  linkUrl: string;
  openInNewTab: boolean;
  isClickable: boolean;
  showIcon: boolean;
  iconPosition: IconPosition;
  iconType: IconType;
  fluentIconName: string;
  customIconUrl: string;
  iconSize: number;
  iconColor: string;
  showExternalLinkIcon: boolean;
  externalLinkIconPosition: ExternalLinkIconPosition;
  backgroundColor: string;
  textColor: string;
  borderColor: string;
  borderWidth: number;
  borderRadius: number;
  hoverBackgroundColor: string;
  hoverTextColor: string;
  hoverBorderColor: string;
  paddingVertical: number;
  paddingHorizontal: number;
  fontSize: number;
  fontWeight: FontWeight;
  showShadow: boolean;
  shadowIntensity: ShadowIntensity;
  allowFreePositioning: boolean;
  positionX: number;
  positionY: number;
}
