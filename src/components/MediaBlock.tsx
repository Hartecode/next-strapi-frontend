import { Box, AspectRatio, IconButton, Icon,
  Container, useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton } from '@chakra-ui/react'
import { BiPlay } from "react-icons/bi";
import YouTube, { Options } from "react-youtube";
import Picture from "./Picture";
import { MediaImage } from '../interface/media'

export interface VideoType {
  src: string;
  type: string;
}

export interface MediaBlockProps {
  position?: number;
  bgType: 'video' | 'image';
  blockSize?: 'md' | 'lg' | 'xl' | 'full';
  bgImg?: {
    src: MediaImage;
    alt: string;
  },
  bgVid?: {
    video: VideoType[];
    poster: string;
  },
  overlayOpacity: number;
  youTubeVideo?: {
    key: string;
    label: string;
  }
}

const opts: Options = {
  height: '100%',
  width: '100%',
  playerVars: {
    // https://developers.google.com/youtube/player_parameters
    autoplay: 1
  }
};

const imgSizes: { size: string, bp: number}[] = [
  { size: 'xlarge', bp: 1440 },
  { size: 'large', bp: 1023 },
  { size: 'medium', bp: 768 },
  { size: 'small', bp: 480 },
  { size: 'xsmall3x4', bp: 0 }
]


const MediaBlock = ({
    bgType,
    bgImg,
    bgVid,
    overlayOpacity = 0,
    youTubeVideo,
    blockSize = 'lg'
  }: MediaBlockProps) => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <Container 
        p={blockSize === 'full' && '0'}
        maxW={`container.${blockSize === 'full' ? 'xl' : blockSize}`}>
        <AspectRatio bgColor="black" ratio={16/9}>
          <Box >
            {(bgType === 'image' && bgImg?.src) && (
                <Picture src={bgImg?.src?.url} alt={bgImg?.alt}
                sources={imgSizes.map(v => {
                  const media = v.bp !== 0 ? `(min-width: ${v.bp}px)` : null;
                  return {
                    media,
                    srcset: bgImg?.src.formats[v.size]?.url
                  }
                })} />
            )}
            {(bgType === 'video' && bgVid) && (
              <Box as="video" 
                objectFit="cover"
                objectPosition="center"
                height="100%"
                width="100%"
                autoPlay
                playsInline
                loop muted poster={bgVid?.poster}>
                {(bgVid?.video || []).map((val, i) => <source 
                    key={val.type + i} src={val.src}
                      type={`video/${val.type}`} />)
                }
                {"Sorry, your browser doesn't support embedded videos."}
              </Box>
            )}
            <Box position="absolute" 
                d="flex"
                justifyContent="center"
                alignItems="center"
                  bgColor={`rgba(0, 0, 0, ${overlayOpacity / 100})`} 
                  h="100%" w="100%" zIndex="1">
              {youTubeVideo && <IconButton
                onClick={onOpen}
                isRound
                variant="outline"
                fontSize="9xl"
                h="32"
                w="32" 
                overflow="hidden"
                color="white"
                colorScheme="whiteAlpha"
                aria-label="Play Video" 
                icon={<Icon paddingLeft="4" as={BiPlay} />} />
              
              }
            </Box>
          </Box>
        </AspectRatio>
      </Container>
      {youTubeVideo?.key && <Modal onClose={onClose} size="5xl" isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent 
          sx={{
            "@media only screen and (orientation : landscape) and (min-width: calc(100vh * 1.8)) ": {
              maxWidth: "calc(100vh * 1.8)",
            }
          }}
          color="white"
          backgroundColor="blackAlpha.300">
          <ModalCloseButton />
          <ModalBody pl="12" pr="12"> 
            <AspectRatio bgColor="black" ratio={16/9}>
              <YouTube
                videoId={youTubeVideo?.key || ''}
                opts={opts}
              />
            </AspectRatio>  
          </ModalBody>
        </ModalContent>
      </Modal>
      }
      
    </>
  )
}

export default MediaBlock