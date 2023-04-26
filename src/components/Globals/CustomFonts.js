import { Global } from '@mantine/core';
import italic from '../../../fonts/ChakraPetch/ChakraPetch-Italic.woff2';
import light from '../../../fonts/ChakraPetch/ChakraPetch-Light.woff2';
import lightItalic from '../../../fonts/ChakraPetch/ChakraPetch-LightItalic.woff2';
import medium from '../../../fonts/ChakraPetch/ChakraPetch-Medium.woff2';
import mediumItalic from '../../../fonts/ChakraPetch/ChakraPetch-MediumItalic.woff2';
import regular from '../../../fonts/ChakraPetch/ChakraPetch-Regular.woff2';
import semiBold from '../../../fonts/ChakraPetch/ChakraPetch-SemiBold.woff2';
import semiBoldItalic from '../../../fonts/ChakraPetch/ChakraPetch-SemiBoldItalic.woff2';

const CustomFonts = () => {
    return (
        <Global
            styles={[
                {
                    '@font-face': {
                        fontFamily: 'Chakra Petch',
                        src: `url('${italic}') format('woff2')`,
                        fontWeight: 400,
                        fontStyle: 'italic',
                    }
                },
                {
                    '@font-face': {
                        fontFamily: 'Chakra Petch',
                        src: `url('${light}') format('woff2')`,
                        fontWeight: 300,
                        fontStyle: 'normal',
                    }
                },
                {
                    '@font-face': {
                        fontFamily: 'Chakra Petch',
                        src: `url('${lightItalic}') format('woff2')`,
                        fontWeight: 300,
                        fontStyle: 'italic',
                    }
                },
                {
                    '@font-face': {
                        fontFamily: 'Chakra Petch',
                        src: `url('${medium}') format('woff2')`,
                        fontWeight: 500,
                        fontStyle: 'normal',
                    }
                },
                {
                    '@font-face': {
                        fontFamily: 'Chakra Petch',
                        src: `url('${mediumItalic}') format('woff2')`,
                        fontWeight: 500,
                        fontStyle: 'italic',
                    }
                },
                {
                    '@font-face': {
                        fontFamily: 'Chakra Petch',
                        src: `url('${regular}') format('woff2')`,
                        fontWeight: 400,
                        fontStyle: 'normal',
                    }
                },
                {
                    '@font-face': {
                        fontFamily: 'Chakra Petch',
                        src: `url('${semiBold}') format('woff2')`,
                        fontWeight: 600,
                        fontStyle: 'normal',
                    }
                },
                {
                    '@font-face': {
                        fontFamily: 'Chakra Petch',
                        src: `url('${semiBoldItalic}') format('woff2')`,
                        fontWeight: 600,
                        fontStyle: 'italic',
                    }
                },
            ]}
        />
    );
}

export default CustomFonts;