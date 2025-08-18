import { StyledButton } from '@/components';
import {render} from '@testing-library/react';
import { type Theme } from '@/types';
import { ThemeProvider } from 'styled-components';
import { themeList } from '@/resources/themesList';

describe('Styled Button Component', () => {
  const renderComponent = (theme: Theme, className?: string, props = {}) =>
    render(
      <ThemeProvider theme={theme}>
        <StyledButton className={className} {...props}/>
      </ThemeProvider>
    )

  themeList.forEach(({ name, theme }) => {
    describe(`${name}`, () => {
        it('should match the snapshot without alert class ', () => {
            const { asFragment } = renderComponent(theme, 'alert')
            expect(asFragment()).toMatchSnapshot()
        })

        it('should match the snapshot without primary class ', () => {
        const { asFragment } = renderComponent(theme, 'primary')
        expect(asFragment()).toMatchSnapshot()
      })

        it('should match the snapshot without borderless-alert class ', () => {
        const { asFragment } = renderComponent(theme, 'borderless-alert')
        expect(asFragment()).toMatchSnapshot()
      })

      
        it('should match the snapshot without disabled status ', () => {
        const { asFragment } = renderComponent(theme, 'primary', {disabled: true})
        expect(asFragment()).toMatchSnapshot()
      })
    })
  })
})