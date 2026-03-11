import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version } from '@microsoft/sp-core-library';
import {
  type IPropertyPaneConfiguration,
  PropertyPaneDropdown,
  PropertyPaneSlider,
  PropertyPaneTextField,
  PropertyPaneToggle
} from '@microsoft/sp-property-pane';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';

import * as strings from 'ClickableBubbleWebPartStrings';
import ClickableBubble from './components/ClickableBubble';
import type { IClickableBubbleWebPartProps, PresetStyle } from './IClickableBubbleWebPartProps';

export default class ClickableBubbleWebPart extends BaseClientSideWebPart<IClickableBubbleWebPartProps> {
  public render(): void {
    this.domElement.style.display = 'inline-block';
    this.domElement.style.width = 'fit-content';
    this.domElement.style.height = 'auto';
    this.domElement.style.minWidth = '0';
    this.domElement.style.minHeight = '0';

    const element = React.createElement(ClickableBubble, {
      ...this.properties
    });

    ReactDom.render(element, this.domElement);
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected onPropertyPaneFieldChanged(propertyPath: string, oldValue: unknown, newValue: unknown): void {
    super.onPropertyPaneFieldChanged(propertyPath, oldValue, newValue);

    if (propertyPath === 'preset' && newValue && newValue !== 'none') {
      this.applyPreset(newValue as PresetStyle);
    }
  }

  private applyPreset(preset: PresetStyle): void {
    switch (preset) {
      case 'pill':
        this.properties.borderRadius = 20;
        this.properties.paddingVertical = 8;
        this.properties.paddingHorizontal = 20;
        this.properties.backgroundColor = '#f3f2f1';
        this.properties.borderWidth = 1;
        this.properties.showShadow = false;
        this.properties.isClickable = true;
        break;
      case 'compact':
        this.properties.borderRadius = 4;
        this.properties.paddingVertical = 10;
        this.properties.paddingHorizontal = 16;
        this.properties.showExternalLinkIcon = true;
        this.properties.borderWidth = 1;
        this.properties.isClickable = true;
        break;
      case 'label':
        this.properties.backgroundColor = 'transparent';
        this.properties.borderWidth = 0;
        this.properties.isClickable = false;
        this.properties.textColor = '#605e5c';
        this.properties.showExternalLinkIcon = false;
        break;
      case 'cta':
        this.properties.backgroundColor = '#0078d4';
        this.properties.textColor = '#ffffff';
        this.properties.borderRadius = 4;
        this.properties.showShadow = true;
        this.properties.shadowIntensity = 'medium';
        this.properties.fontWeight = 'semibold';
        this.properties.isClickable = true;
        break;
      default:
        break;
    }

    this.context.propertyPane.refresh();
    this.render();
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: 'Preset',
              groupFields: [
                PropertyPaneDropdown('preset', {
                  label: 'Apply Preset Style',
                  options: [
                    { key: 'none', text: 'Custom' },
                    { key: 'pill', text: 'Pill Button' },
                    { key: 'compact', text: 'Compact Button' },
                    { key: 'label', text: 'Label (Non-clickable)' },
                    { key: 'cta', text: 'Call to Action' }
                  ]
                })
              ]
            },
            {
              groupName: 'Content Settings',
              groupFields: [
                PropertyPaneTextField('text', {
                  label: 'Button Text',
                  placeholder: 'Enter text'
                }),
                PropertyPaneTextField('linkUrl', {
                  label: 'Link URL',
                  placeholder: 'https://... or /sites/...'
                }),
                PropertyPaneToggle('openInNewTab', {
                  label: 'Open in New Tab',
                  onText: 'Yes',
                  offText: 'No'
                }),
                PropertyPaneToggle('isClickable', {
                  label: 'Make Clickable',
                  onText: 'Clickable',
                  offText: 'Label Only'
                })
              ]
            },
            {
              groupName: 'Icon Configuration',
              groupFields: [
                PropertyPaneToggle('showIcon', {
                  label: 'Show Icon',
                  onText: 'Visible',
                  offText: 'Hidden'
                }),
                PropertyPaneDropdown('iconPosition', {
                  label: 'Icon Position',
                  options: [
                    { key: 'left', text: 'Left' },
                    { key: 'right', text: 'Right' }
                  ]
                }),
                PropertyPaneDropdown('iconType', {
                  label: 'Icon Type',
                  options: [
                    { key: 'fluent', text: 'Fluent' },
                    { key: 'custom', text: 'Custom' },
                    { key: 'none', text: 'None' }
                  ]
                }),
                PropertyPaneTextField('fluentIconName', {
                  label: 'Fluent Icon Name',
                  placeholder: 'e.g., Mail, Teams, Link',
                  description: 'Visit https://aka.ms/fluentui-icons',
                  disabled: !this.properties.showIcon || this.properties.iconType !== 'fluent'
                }),
                PropertyPaneTextField('customIconUrl', {
                  label: 'Custom Icon URL',
                  placeholder: 'https://...',
                  disabled: !this.properties.showIcon || this.properties.iconType !== 'custom'
                }),
                PropertyPaneSlider('iconSize', {
                  label: 'Icon Size',
                  min: 12,
                  max: 24,
                  step: 1,
                  showValue: true,
                  disabled: !this.properties.showIcon || this.properties.iconType === 'none'
                }),
                PropertyPaneTextField('iconColor', {
                  label: 'Icon Color (hex)',
                  placeholder: '#605e5c',
                  disabled: !this.properties.showIcon || this.properties.iconType !== 'fluent'
                }),
                PropertyPaneToggle('showExternalLinkIcon', {
                  label: 'Show External Link Icon',
                  onText: 'Yes',
                  offText: 'No'
                }),
                PropertyPaneDropdown('externalLinkIconPosition', {
                  label: 'External Link Icon Position',
                  options: [
                    { key: 'right', text: 'Right' },
                    { key: 'inline', text: 'Inline' }
                  ],
                  disabled: !this.properties.showExternalLinkIcon
                })
              ]
            },
            {
              groupName: 'Appearance Settings',
              groupFields: [
                PropertyPaneTextField('backgroundColor', {
                  label: 'Background Color (hex)',
                  placeholder: '#ffffff'
                }),
                PropertyPaneTextField('textColor', {
                  label: 'Text Color (hex)',
                  placeholder: '#323130'
                }),
                PropertyPaneTextField('borderColor', {
                  label: 'Border Color (hex)',
                  placeholder: '#edebe9'
                }),
                PropertyPaneSlider('borderWidth', {
                  label: 'Border Width',
                  min: 0,
                  max: 4,
                  step: 1,
                  showValue: true
                }),
                PropertyPaneSlider('borderRadius', {
                  label: 'Border Radius (Roundness)',
                  min: 0,
                  max: 50,
                  step: 2,
                  showValue: true
                }),
                PropertyPaneToggle('showShadow', {
                  label: 'Show Shadow',
                  onText: 'Yes',
                  offText: 'No'
                }),
                PropertyPaneDropdown('shadowIntensity', {
                  label: 'Shadow Intensity',
                  options: [
                    { key: 'none', text: 'None' },
                    { key: 'light', text: 'Light' },
                    { key: 'medium', text: 'Medium' },
                    { key: 'strong', text: 'Strong' }
                  ],
                  disabled: !this.properties.showShadow
                })
              ]
            },
            {
              groupName: 'Hover Effects',
              groupFields: [
                PropertyPaneTextField('hoverBackgroundColor', {
                  label: 'Hover Background Color (hex)',
                  placeholder: '#f3f2f1'
                }),
                PropertyPaneTextField('hoverTextColor', {
                  label: 'Hover Text Color (hex)',
                  placeholder: '#201f1e'
                }),
                PropertyPaneTextField('hoverBorderColor', {
                  label: 'Hover Border Color (hex)',
                  placeholder: '#0078d4'
                })
              ]
            },
            {
              groupName: 'Size & Spacing',
              groupFields: [
                PropertyPaneSlider('paddingVertical', {
                  label: 'Vertical Padding',
                  min: 4,
                  max: 20,
                  step: 2,
                  showValue: true
                }),
                PropertyPaneSlider('paddingHorizontal', {
                  label: 'Horizontal Padding',
                  min: 8,
                  max: 40,
                  step: 2,
                  showValue: true
                }),
                PropertyPaneSlider('fontSize', {
                  label: 'Font Size',
                  min: 10,
                  max: 20,
                  step: 1,
                  showValue: true
                }),
                PropertyPaneDropdown('fontWeight', {
                  label: 'Font Weight',
                  options: [
                    { key: 'normal', text: 'Normal' },
                    { key: 'semibold', text: 'Semi-bold' },
                    { key: 'bold', text: 'Bold' }
                  ]
                })
              ]
            },
            {
              groupName: 'Positioning (Advanced)',
              groupFields: [
                PropertyPaneToggle('allowFreePositioning', {
                  label: 'Enable Free Positioning',
                  onText: 'Enabled',
                  offText: 'Disabled',
                }),
                PropertyPaneSlider('positionX', {
                  label: 'Horizontal Position (%)',
                  min: 0,
                  max: 100,
                  step: 1,
                  showValue: true,
                  disabled: !this.properties.allowFreePositioning
                }),
                PropertyPaneSlider('positionY', {
                  label: 'Vertical Position (%)',
                  min: 0,
                  max: 100,
                  step: 1,
                  showValue: true,
                  disabled: !this.properties.allowFreePositioning
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
