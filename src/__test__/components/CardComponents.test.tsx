import { CardComponents } from '@/components';
import {render} from '@testing-library/react';
import { type Theme } from '@/types';
import { ThemeProvider } from 'styled-components';
import { themeList } from '@/resources/themesList';

describe('Card Component', () => {
  const renderComponent = (theme: Theme, className?: string) =>
    render(
      <ThemeProvider theme={theme}>
        <CardComponents className={className} />
      </ThemeProvider>
    )

  themeList.forEach(({ name, theme }) => {
    describe(`${name}`, () => {
      it('should match the snapshot without any class ', () => {
        const { asFragment } = renderComponent(theme)
        expect(asFragment()).toMatchSnapshot()
      })

        it('should match the snapshot without alert class ', () => {
            const { asFragment } = renderComponent(theme, 'alert')
            expect(asFragment()).toMatchSnapshot()
        })

        it('should match the snapshot without sucess class ', () => {
        const { asFragment } = renderComponent(theme, 'sucess')
        expect(asFragment()).toMatchSnapshot()
      })

        it('should match the snapshot without warning class ', () => {
        const { asFragment } = renderComponent(theme, 'warning')
        expect(asFragment()).toMatchSnapshot()
      })
    })
  })
})