import 'styled-components';
import type { Theme } from './theme'; // ou onde estiver sua interface Theme

declare module 'styled-components' {
  // eslint-disable-next-line @typescript-eslint/no-empty-object-type
  export interface DefaultTheme extends Theme {}
}
