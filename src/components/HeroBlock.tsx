import { Heading, Box, AspectRatio, Grid, GridItem,
  Container, Button, Wrap, WrapItem  } from '@chakra-ui/react'
import Link from 'next/link'
import Picture from './Picture'
import { MediaImage } from '../interface/media' 


export interface HeroProps {
  title: string;
  detail?: string;
  theme: 'light' | 'dark';
  imgOverlayPer?: number;
  backgroundImage: {
    src: MediaImage;
    alt: string;
  };
  horPos: 'left' | 'right' | 'center';
  verPos: 'top' | 'middle' | 'bottom';
  position?: number;
  textPos?: 'start' | 'center' | 'end';
  cta?: CTABtn[]
}

export interface CTABtn {
  label: string;
  link: string;
  external: boolean;
}

enum AlignItems {
  start = 'flex-start',
  center = 'center',
  end = 'flex-end'
}

enum VerPos {
  top = 1,
  middle = 2,
  bottom = 3
}

enum Theme {
  dark = -1,
  light = 1
}

const posPropMd = { 
  left: {
    col: 1,
    span: 8,
  },
  right: {
    col: 4,
    span: 8
  },
  center: {
    col: 3,
    span: 8
  }
}

const posPropLG = { 
  left: {
    col: 1,
    span: 6,
  },
  right: {
    col: 6,
    span: 6
  },
  center: {
    col: 4,
    span: 6
  }
}

const posProMobile = {
  col: 1,
  span: 12
}

const imgSizes: { size: string, bp: number}[] = [
  { size: 'xlarge', bp: 1440 },
  { size: 'large', bp: 1023 },
  { size: 'medium', bp: 768 },
  { size: 'small', bp: 480 },
  { size: 'xsmall3x4', bp: 0 }
]

const HeroBlock = ({
  title, detail, theme, imgOverlayPer = 0,
  textPos = "start", cta,
  backgroundImage, horPos = 'center', verPos = 'middle', position = 0 }: HeroProps) => {
  const decOverlay = imgOverlayPer / 100;

  return (
    <AspectRatio w="100%" maxW="container.xl" mr="auto" ml="auto" ratio={[3 / 4, 7 / 4, 7 / 4, 7 / 3]} >
      <Box>
        <Box position="absolute" bg="black" w="100%" h="100%" top="0"
            zIndex="-1"
            filter={`brightness(${theme && imgOverlayPer ? 1 + (Theme[theme] * decOverlay) : 1})`}
            >
            {<Picture src={backgroundImage?.src?.url} alt={backgroundImage?.alt}
                sources={imgSizes.map(v => {
                  const media = v.bp !== 0 ? `(min-width: ${v.bp}px)` : null;
                  return {
                    media,
                    srcset: backgroundImage?.src.formats[v.size]?.url
                  }
                })} />}
        </Box>
        <Container h="100%" paddingBottom="4" paddingTop="4" maxW="100%">
          <Grid
            h="100%"
            templateRows="repeat(3, 1fr)"
            templateColumns="repeat(12, 1fr)">
            {(title || detail) && <GridItem rowStart={VerPos[verPos]}
                alignSelf="center"
                textAlign={textPos}
                d="flex"
                flexDirection="column"
                alignItems={AlignItems[textPos]}
                color={theme === 'dark' ? 'white' : 'black'}
                colStart={[posProMobile?.col, posProMobile?.col, posPropMd[horPos]?.col, posPropLG[horPos]?.col]}
                colSpan={[posProMobile?.span, posProMobile?.span, posPropMd[horPos]?.span, posPropLG[horPos]?.span]}>
                {title && (
                  <Heading as={position > 0 ? 'h2' : 'h1'}>
                    {title}
                  </Heading>)
                }
                {detail && <Box maxW="lg">{detail}</Box>}
                {(cta?.length > 0) && (
                    <Wrap justify={AlignItems[textPos]} spacing={2} py={2}>
                      {cta && cta.map(({label, link, external}, i) => (
                        <WrapItem key={label + i}>
                            <Link href={link} passHref>
                              <Button as="a"
                                  href=""
                                  target={external ? "_blank" : undefined}
                                  rel={external ? "noopener noreferrer" : undefined}
                                  cursor="pointer"
                                  colorScheme="purple" size="md">
                                {label}
                              </Button>     
                            </Link>
                        </WrapItem>)).slice(0, 4)}
                    </Wrap>)}
              </GridItem>}
          </Grid>
        </Container>
      </Box>
    </AspectRatio>
  )
}

export default HeroBlock