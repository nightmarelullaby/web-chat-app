"use client";
import {IconDots,} from '@tabler/icons-react';
import {Grid,GridItem,Box,HStack,Img,Text,Flex,Avatar} from "@/components/chakra-client/components"

export const ChatMessage = ({author,content,sender,date,images}) =>  {

  return <>{!sender && (<HStack alignItems="start">
          <Avatar size="sm" src="data:image/jpeg;base64,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" />

          <Flex gap="1" direction="column">
          <HStack alignItems="end">
            <Text as="span" fontSize="14px" fontWeight="500" fontFamily="system-ui">{author}</Text>
            <Text as="small" fontSize="12px" fontWeight="400"  color="gray.500" alignSelf="center" fontFamily="system-ui">{date}</Text>
          </HStack>
          <Box>
          <Grid templateColumns='repeat(2, 1fr)' gap={2}>
            {images.map(image => <Img h="100px" h="100px" objectFit="cover" src={image} /> )}
          </Grid>
          <Box bg="orange.100" display="flex" borderRadius="8" borderTopLeftRadius="0" p="2">
            <Text as="p" display="inline-block" fontFamily="system-ui" fontSize="14px" fontWeight="600">
              {content}
            </Text>
          </Box>
          </Box>
          
          </Flex>
          <Box alignSelf="center" cursor="pointer" bg="gray.200" _hover={{bg:"gray.300"}} borderRadius="100%" p="1" boxSizing="border-box">
          <IconDots 
            size={16} 
            marginLeft="0"
            stroke={2}
            strokeLinejoin="bevel"
          />
          </Box>
  </HStack>)}
  {sender && (<HStack alignItems="start" justifyContent="end">
                    <Box alignSelf="center" cursor="pointer" bg="gray.200" _hover={{bg:"gray.300"}} borderRadius="100%" p="1" boxSizing="border-box">
          <IconDots 
            size={16} 
            marginLeft="0"
            stroke={2}
            strokeLinejoin="bevel"
          />
          </Box>

          <Flex gap="1" direction="column">
          <HStack alignItems="end">
            <Text as="span" fontSize="14px" fontWeight="500" fontFamily="system-ui">{author}</Text>
            <Text as="small" fontSize="12px" fontWeight="400" color="gray.500" alignSelf="center" fontFamily="system-ui">{date}</Text>
          </HStack>
          <Box bg="orange.100" display="flex" justifyContent="end" borderRadius="8" borderTopRightRadius="0" p="2">
            <Text as="p" display="inline-block" fontFamily="system-ui" fontSize="14px" fontWeight="600">
              {content}
            </Text>
          </Box>
          
          </Flex>

          <Avatar size="sm" src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAJAAsQMBIgACEQEDEQH/xAAcAAABBQEBAQAAAAAAAAAAAAAGAAIDBAUBBwj/xAA/EAACAQMDAgQDBQQJAwUAAAABAgMABBEFEiEGMRMiQVEyYXEHFIGRsRWhwdEWFyNCVGLh8PFzk6InM0NTVv/EABkBAAIDAQAAAAAAAAAAAAAAAAABAgQFA//EACARAQEAAgICAwEBAAAAAAAAAAABAhEDIRIxBCJBURP/2gAMAwEAAhEDEQA/APQFFPUU1RUqiuzm6oqRaaBTwKA6K6SFUsT2pCulQykEdximGA3WmgKxB1ODIODlqfH1noEkiRpqELO7BVAPc0O9b9KaPYdPXd3a2aR3CjcJB3znmrPRfS2jXOhWF9NZq1xtD7z33e9B9CfVNd07SBGb+4WES/Dkd6pR9a9PO4X9pRAk454FDX2rRqzaSjDKGbafpxWhrPS3TKaLPIbeGEiLKurc5x++ga6GcUsc0ayRMGRuQQe9eeWXH2sXA9PCP6Cp+jrm703p1IZGIaQ7o8jJRT8qdPIqFpZZny+dxI8xqNykSmNGl1qdnbLukuE+gYVHFrVpJwhZjjPHNeZveWnjgpK5QejDIrStL2OWB/ujqwjOdqnkfLBqPnEvCx6Nb3UVwMocH2PBrP1zqTTtCeNdQlaMyZ24XOcUK2+pyox8XnjKsvt37UtYhtdf+7ffGMnhYMbA4yCQSD+lOWI6rU/rD6e/xLn6Rmt7SdVttXs1urNi0LEgEjHah25bpKyjBu7KCMYzkxcfWt2CWys9Ea60+ONLURGVAgwCMZzUiQa71Ppeh4W9uP7VgSI15asez+0XQrqYRyGaAE43OvH4+1YHQOkx9SXt5rOrjxyHwqNyM9/3DijbUuk9F1EJ41lGpQghoxtP0PuKA1o5EmjWSNgyMMhgcgisXqfqK16dtY57pGk8R9ionc8VtpGscaxxgBVAAUDAFeZa1EvV3XY04FvudkhEjL745/eQKCndW/609O/wVz+YpVkf1cXP/wB1KhLUejrUgqNakWhE9aeKYKeKZHAU6uLThQA19ogz0lf/ACT+NS9Ac9Kaf/062NS0+31OyktLtN0MnDD3FLTrK2020jtLRdsMYwi5zikf4Bftcj8VNMTON023P1qK26QtLK4WSS8mvFUDCSt5VajDqTTdPv7dJ9QhMotzvjBOMNWH4/jfBxGDhfnUc8tRPDHyuilRXPDFQOPLTXsIJPiB/OpkqUJliP41SyztaeHHJFVdLthgxxIGPfiq1zpR8XxYlCOPVODWyqAAU7GDnGaUyqVxjFFrJI6scKV7YptzayRxEwna6/CRWvKNp7VUkfJxUvOuf+UV9IuoNRkNtqMKSqo8ykDmjOOG2utLktLcBYvDMW3GNvFAv3dhdpJCQrbucDuPaijRrp0jdXyG9QatcWXlFDmx8aCekNX/AKHand6VrKvHE7ZD49e2foRRVqvX+iWSL92m+9yMwASIelX9V0fTtaUC/tUlK9mPDD8RVXTek9D02YTQWCmReVZ2LEfTNdXLa7rmsxWPT02pjO3w8orDBJPYYrzjprpnqG8tf2pp9+tobkkkkkM4z3r1HUdPsdXt1t9QgWWIHdsbtmrVpbQ2ttHb2yLHFGoVFHYCg5Xn39F+sf8A9D/5NSr0bPzeu0gyVoY6+6hvNA0+CeyVGaSXaQ9E4oC+10H9jWuO4nFMp7ch1rrqWNZI9LtyjjK+b0ol0q/1n+j9zdavAkF5HuKqORgdqFrHqLrFbSERaEroEG1t3cYouE13ddKST6hCIbl4G8SMH4T7UChLSOqesNXtzPYWNvLHuK7s4/Wibpq+6nuL8rrdnHDb7CVKHu2aBeh7/qa30t49FsY57YSE7mOOT3r0Dpe81268f9vWiW5GDHsPcUHb+KfWHVV3p9/BpWkW4nvpxkZ7KKoWeu9XWmoW9vqulJNFM4XfEeFz70/rTpjUrzU4NZ0WZVu4Bgoxxu+h/Os62631fSbuG26l03YjttEyfrQNC7X5bnfHAyr91kjy59d2RgfrWR8PPYewrW1q4SSOFk8y7Nw+eaxBIxbLkAegAqtzZaWvjY7XIuOSgqfeFGW9e/lrMXUrUOFMgEnbHzq6uoWpCqbmLd8mqrIupwwI8pX8alSQeUkr8xmolliLgbkbvnHPao4Zy0SAr5nyR6cU0/cSTuCc4GKpTsB6YzUswPcqBkZqrKX4Ct296V2V1o0MS3HcVtWUm+IuRiTswofjlKPyfiPvW/bbdrMv97BNWuBn/K9hbpTqvUdR6t1DTLho/u9uW2bVweDxzXoUcgYV470If/UHWfq/6ivWIGqzFXKaq7zT0cioweK7QSfxR70qr5pUaG0AoQ+0rSr3VtIgi0+AzSLMG2g44ovWpAKAr6XG8Wn28cg2usYBHsQKdqcby6bdRxqWd4yAB74qyKkWgPKenD1d09Zta2ujLKjOXBZsEZoo6e1XqW81HwtX0pLW32k+IrZOfai802g9hDqkdUW2pR3ujbLi1VcNb9ifnQtr8vUPUkMMWq6cunWcLhpJWOa9ZFZ3UMCz6RcIw3ADdj6c1HO6xtT49XOShuRmaPwUBAQADPt2rO1Lx4kbw03HHADYNW4rlRZyoCC64/0qRB4yEjHNUeTPerWjx8fjuQOfcZJoj+0L5LWNhziQD9arRaLpaSFrfWd7nnIk8pH1/lW7NotrcyF7qBnbbjJGRj1GPSq1t07plp4qWlpJufALNuz+BPb8K566dddrOm+NCzW8fhOQowyN6elc1rVW0t4Iipd2iChV5y2avxWqWEkMccYUkZOOSfrWZrKpNqkIKA+U+nb50nWTpQSLXZQfDfw1JJ8KZuD9DTZpdWto1E4VQPVct/CpNU0a8kQNY6l4LH4gU4PzGPUfjVbbrMREU7LdwY5kxh1+uO9S7kcbi14H+9RxuHXDexziiPSpC1oue54zQrpFt4Ma7zj1APH51o32ozabakwIWIAaNe2T7VY4spjPJU5cLnZjAHA3UGh9U6lqFho09wssjgFo22kZ7iiTSur+rJ7+3hn6fMUUkiq8mxvKCeTR1ZyG4s4ZnG1nQEjHbNWYsZq1j6UssvypVuLn70sQtSYif/dDjA49quU1Ph5p1MnKVcpUBFGOKkFRrxUooI8U8UwU8UGTU2umlQHar6gA1jcL7xt+lWBUMy5BB7GlfRy6uwLLBbxxO0RJc4Uk9xx2qTTpFWUIzYO3P1FRakPDmlVRsCtgj3x2qS1OIA6Yyay8uum5h9u/62VtUYbjxkckGpIYI4huiH1Y1SS9Kx7W7Ac1W1C+kWzaSFTjPlVBksPU1OXoTH8JpDNemRm4XgVlX6Fb+KVj5d2CQewq3p91HKfPmIEfC64NZ+s3VrDNl5die5NGnbqTTckt2mUPCy4I5Ujiq0lq4QqxCDthaj0XU1l2Ddz2NT6pdoowOfWo2oXD8VZCfFEcZxg+/pVdZxqOqiwKkCM7Q2fiHcmm2chadpXPOPyq5ocf3i98ZIgqjIDEcmp4d6xVeTWNyy/gqCqg2pwoGBToz5qZTo/irRjH3tfjOVp9MjGFp9CRUq5XaQQipFqIVKtMjxUgqMU8UGRpCuGkDQDhTH5p1NegBXqPTm/tLwEeGceID3z24rN0s5iKN3HH0os1KH7zY3EI7vGQPr6UI6Y/lkJHmUBv0qjz4SZbjT+JyXLDV/F5rZYcPMd5PIXHAqIPuk85XAq3eDfFmNQWZBgUN3Gk6qJN1lqChj3EkWR+ArnFudr+q2Fpf7d0ssZXs0bY4rBn6asxL4ks8tyxOV8bkCrJbqmzOGtbG4/zAlaqtqGtOjJNpSqfeOUH9RTvo4uWEGJikKgbO+Kt3kXiz7SeFXca705bTPKs0+P7UZKg9qk1uZIFlCAZAC5Hoc/6Vzyh+f8AWakiFmXOA3lzn8KKOn4BHaIffnNDlhpsd7ChnU5LhwQcHj/k0Z2kYiiAAxgYxV3h47O2T8nlmU8YlNSRfFUZqeD0qwprifDTq4valmgypU3NKg0SmpFNRLUimgkop4NRg04Gg3TSFcJpA0A+uNyKVI0BXbKnOcYoTuIEttblhVlKSLvCg8rnuD/CtPqjqWx0O0mkklVrhELCIckH0z7V5T0Prd1qWq6ndXJLyvIsrHPp2x9MVw559Vj4tsz6ej2rOiGJ+SvGflTm8JyMht44BBqvDeRy3QZSCrDPHvVmXgBsDAqm1YYZ3Tgg4HqQazrmUyk7nXwvZf71X5rlIxvckY/KqttGkjyTSDCr5hz6+1LKpzU7RQ6lBp6yMeHwQqepNYd9O0jBZMeJI24j2J9Pw4qed4lu5bqQrtVjjJqg0pZnu5B34jH8aJHLK79NHQtbhGtyaVMQrIE8I++RnB+dHa8AV4Bczb+rrlkYjnAI9CAP5V69071HFexx2924jucAAscCT/WtHju8Yx+WayoiNTwelQY5xVqFeKm5LI7Uia5nAppoN2lXK5QEamnqa83j+1bTG7Wdx+7+daGlfaRp+o6hb2UdtcK877FJAwKNnqjxTTxVdnCKW9gfxoWfr+xSJ5JLW4TBIUMMFyPagDI1Xury1s0Ml3cRwqPV2xXmGpdearetstCtpF6beWI+tD8tzLcSeJdSySnvlmyc0aD0rUuvtOt1Iso3un9CBtX99Cmo9Z6ze5AlW2iPG2AenzPehw4YbiCPxrsaeYsDkLyaZMzrC6aG3S1Ls0kp3SknJNaH2Y2pWS6lfjfGuB8smhXqSdpdTkBbOzAH60e/Zov3iwnl9kWP6baq/IvS38WfZryrLZ3TNyF+JG7j6YrsfVkaDbMAfZkbI/GteaMzWe5cMRgEYyQaGLLpG1vJ57q+twdzEBQ5GPyqruNGY3TQPUmlPk3cirF3Kg53Gqmq9ZWZtzHYKNuMZxgCuT9D6PE6FZ7iPcwAUPVden7eTU3ihDGKDAJc7jn50dHd+mbZGfUpleTd4Y57cVpaoTBDGQMKvn/AVufs6O2ClVyRgHHGfkKxdfMUdndz3MoRVTZ5j3z6D8qPdRv1jz+El+oHOSSZDk/rROzbCpDkEULaKDLqnibcnDOflRO/xR4Xk5rRwmox87ujLp/rEQosOqlnA+GUDzAfP3o503U7G/TdaXMcn+XOCPwNeMBWwu4AA+9PtZJB5ssrjsy+lTQe5mmmvL9M6v1SyISWQXMQ/uy4J/Mc0XaZ1hpd6VSZzayn0k7E/XtSAipVF9/sv8Zb/wDdFKg3yijshyDRR0eJYtYsNQuE2WkMod3Pcj5D1rC0yBbm7XxFzGnmYe/yohllLt2xkdh2HyFQxTtHPUPX010rW+lK0EJ4MjHzt9Pagx5WllEkjMzfM1XUEgZJOeTUtoT4+D2wfnU0FglcZz37U8fCSCAKUiR5yjYOMkd/+Kg8Rg22QFSewPINMJ97HIYYI/GnxMPh9DyR71EvmDbcgfOnxnlivJA4oAO1E+JeTk9y5o0+yjU/Av7jT3OFlQyL9R3oGvSTdSj/ADmpLG7msLqG6tnxJGc5H6GuHJPLp24svHKV72wQSEqCVdsMqnGKkMCJbLCmQWYszAnj6GsXpTqGw1oAwTbLlEy0D8N9R70STO0bK2CSx4PtVGzXtscd8p0gGnJIrZkkZgMjcc4qjJttby4IGWOAAo9ccn9BW7HNld7KMAdvShvqDUbDTUkmu54oA43AL8T49l9aNfwevawRsja9vXwqL8APCD515B1brp1i/fw8i2RzsA/vHtmpureq7jWnWCLfDYp/8W74z7t/KhsHcfL+XvVni49d1nc/P5fWehF0zABbzzk4J8oz7VrmXD4IAwc8VBpcJttNjGcbu5pwI5bIwe2atxSq5vyBlex9ajdirbcgc57VxmZto8o9qbcE702jBxjk/l/GmR/iemSDTDKVbmRu/bioy23cGwT8q42OzBCT60Bb8R/cf7/GlVHy/wCxSpB//9k=" />
  </HStack>)}
</>
}