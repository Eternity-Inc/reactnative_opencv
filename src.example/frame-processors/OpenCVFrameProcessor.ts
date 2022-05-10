import type { Frame } from 'react-native-vision-camera'

/**
 * Scans QR codes.
 */
export function BrownFrog(frame: Frame): string[] {
  'worklet'
  return __BrownFrog(frame)
}

export function Nitrogen(frame: Frame): string[] {
  'worklet'
  return __Nitrogen(frame)
}