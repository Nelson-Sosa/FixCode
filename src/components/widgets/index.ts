import React from 'react';
import { PxToRemWidget } from './PxToRemWidget';
import { DockerComposeWidget } from './DockerComposeWidget';
import { JwtDecoderWidget } from './JwtDecoderWidget';
import { ChmodCalculatorWidget } from './ChmodCalculatorWidget';

export const WIDGET_MAP: Record<string, React.ComponentType> = {
  'px-to-rem': PxToRemWidget,
  'docker-compose-generator': DockerComposeWidget,
  'jwt-decoder': JwtDecoderWidget,
  'chmod-calculator': ChmodCalculatorWidget,
  // Aquí se registrarán futuros widgets fácilmente
  // 'color-palette': ColorPaletteWidget,
  // 'json-formatter': JsonFormatterWidget,
  // 'base64-encoder': Base64EncoderWidget,
};
