// app/fonts.ts
import localFont from 'next/font/local'

export const AritaDotum = localFont({
  src: [
    {
      path: '../../public/fonts/AritaDotumKR-Bold.ttf',
      weight: '700',
    },
    {
      path: '../../public/fonts/AritaDotumKR-Light.ttf',
      weight: '300',
    },
    {
      path: '../../public/fonts/AritaDotumKR-Medium.ttf',
      weight: '500',
    },
    {
      path: '../../public/fonts/AritaDotumKR-SemiBold.ttf',
      weight: '600',
    },
    {
      path: '../../public/fonts/AritaDotumKR-Thin.ttf',
      weight: '100',
    },
  ],
})
