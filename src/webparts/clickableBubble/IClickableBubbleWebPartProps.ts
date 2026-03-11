import type { IClickableBubbleProps } from './components/IClickableBubbleProps';

export type PresetStyle = 'none' | 'pill' | 'compact' | 'label' | 'cta';

export interface IClickableBubbleWebPartProps extends IClickableBubbleProps {
  preset: PresetStyle;
}
