module.exports = {
    purge: [
        './**/**.vue',
        './**.php',
        './**/**.php',
        './**/**.svg'
    ],
    theme: {
        extend: {
            animation: {
                'spin-slow-2': 'spin 1500ms linear 2',
                'spin-slow': 'spin 1500ms linear infinite',
            },
            colors: {
                transparent: 'transparent',
                current: 'currentColor',

                black: '#000',
                white: '#fff',

                link: '#DA127D',
                linkHover: '#A30664',
                primeHover: '#620042',
                primary: {
                    '50': '#fdf9f9',
                    '100': '#fdeef5',
                    '200': '#fbcceb',
                    '300': '#fba0db',
                    '400': '#fc65be',
                    '500': '#da127d',
                    '600': '#f82275',
                    '700': '#e01a5b',
                    '800': '#b51744',
                    '900': '#8f1335',
                },
                neutral: {
                    '50': '#F5F7FA',
                    '100': '#E4E7EB',
                    '200': '#CBD2D9',
                    '300': '#9AA5B1',
                    '400': '#7B8794',
                    '500': '#616E7C',
                    '600': '#52606D',
                    '700': '#3E4C59',
                    '800': '#323F4B',
                    '900': '#1F2933',
                },
                support1: {
                    '50': '#f5f4fa',
                    '100': '#eee5fa',
                    '200': '#e0c6f9',
                    '300': '#d3a6f8',
                    '400': '#c979f8',
                    '500': '#c04df8',
                    '600': '#a732f5',
                    '700': '#8228e3',
                    '800': '#690cb0',
                    '900': '#511e97',
                },
                support2: {
                    '50': '#f5f9fc',
                    '100': '#e8f4fc',
                    '200': '#cbe0fb',
                    '300': '#aac6fa',
                    '400': '#7e9afa',
                    '500': '#526cf9',
                    '600': '#3a4af5',
                    '700': '#303ae0',
                    '800': '#272eb2',
                    '900': '#1f268b',
                },
                support3: {
                    '50': '#f2f9fb',
                    '100': '#def7f9',
                    '200': '#b6edf3',
                    '300': '#82deee',
                    '400': '#3ec2e7',
                    '500': '#189fdc',
                    '600': '#137dc7',
                    '700': '#1663a2',
                    '800': '#164c77',
                    '900': '#143d5c',
                },
                support4: {
                    '50': '#fcf8f6',
                    '100': '#fcf0ed',
                    '200': '#fad8d7',
                    '300': '#f9b5b3',
                    '400': '#f9827b',
                    '500': '#f9564d',
                    '600': '#f13632',
                    '700': '#d1292e',
                    '800': '#a5212a',
                    '900': '#821c24',
                },
                support5: {
                    '50': '#fbf8f2',
                    '100': '#fbf4dc',
                    '200': '#f7e7ad',
                    '300': '#f2d16c',
                    '400': '#ebad2d',
                    '500': '#e58712',
                    '600': '#ce610b',
                    '700': '#a4490f',
                    '800': '#7d3814',
                    '900': '#612d14',
                },
                supportDark: {
                    lightest: '#39404f',
                    lighter: '#2f3645',
                    light: '#252c3b',
                    DEFAULT: '#1b2231',
                    darker: '#111827'
                }
            }
        }
    },

    variants: {
        extend: {
            opacity: ['responsive', 'hover', 'focus', 'disabled'],
            borderWidth: ['last'],
            ringWidth: ['hover'],
            backgroundOpacity: ['dark']
        }
    },

    plugins: [],
}