import React from 'react';
import { PxToRemWidget } from './PxToRemWidget';

export const WIDGET_MAP: Record<string, React.ComponentType> = {
  'px-to-rem': PxToRemWidget,
  // Aquí se registrarán futuros widgets fácilmente
  // 'color-palette': ColorPaletteWidget,
  // 'json-formatter': JsonFormatterWidget,
  // 'base64-encoder': Base64EncoderWidget,
};
