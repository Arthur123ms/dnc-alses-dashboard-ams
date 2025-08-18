/* eslint-disable @typescript-eslint/no-empty-object-type */
import 'styled-components';
import { Theme } from '@/types'

declare module 'styled-components' {
  
  export interface DefaultTheme extends Theme {}
}
