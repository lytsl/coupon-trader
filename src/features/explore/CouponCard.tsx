import {
  Card,
  Image,
  Text,
  Group,
  createStyles,
  rem,
  Box,
  Flex,
  Space,
} from '@mantine/core'

const useStyles = createStyles((theme) => ({
  card: {
    backgroundColor:
      theme.colorScheme === 'dark'
        ? theme.colors.dark[6]
        : theme.colors.blue[6],
  },

  companyName: {
    writingMode: 'sideways-lr',
    fontFamily: 'Righteous, Helvetica',
  },

  title: {
    display: '-webkit-box',
    WebkitBoxOrient: 'vertical',
    WebkitLineClamp: 2,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },

  circle1: {
    background:
      theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.white,
    width: rem(24),
    height: rem(24),
    borderRadius: '50%',
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    left: rem(-12),
  },
  circle2: {
    background:
      theme.colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.white,
    width: rem(24),
    height: rem(24),
    borderRadius: '50%',
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
    right: rem(-8),
  },
}))

const mockdata = []

export function CouponCard() {
  const { classes } = useStyles()

  return (
    <Box>
      {/* <CustomFonts /> */}
      <Card radius="md" className={classes.card} p={0}>
        <Flex
          justify="flex-start"
          align="stretch"
          direction="row"
          wrap="nowrap"
        >
          <Box
            className={classes.companyName}
            bg="violet"
            pl={rem(12)}
            pr={rem(4)}
            py={rem(16)}
          >
            <Text
              fz="sm"
              className={classes.companyName}
              align="center"
              lts={rem(2)}
            >
              PAYTM
            </Text>
          </Box>
          <Box mr={rem(12)} py={rem(16)} px={rem(16)} sx={{ flex: '1 1 0' }}>
            <Flex
              gap="md"
              justify="flex-start"
              align="flex-start"
              direction="row"
              wrap="nowrap"
            >
              <Image
                mah={50}
                maw={50}
                fit="contain"
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKAAAACgCAYAAACLz2ctAAAUd0lEQVR4Xu1da3RVxRXeN4ABhRhcy1IF2mBrK6ACldZHa0lUoNalpmp9tCqJqw3aHxAUsK0KAa2tgjVgHxqtxEqLDxTQvgQxaX2/MLQCil2SLhBr21VCQoXwuLezT3Ju5p4755x9zp3zuPfuWesuQs4+e2a++bJnZu89cxOguaRSqXKhcnzvZ1zvv/i7Cs1VsbpgEWgX6vHTIT5/Fp+2RCLRqrvKhA6FvaSrFLpmSoTToZp1xAsBJCOScI0gY7OOpuVEwF7iIenqxQetHJfiQQCtI5JxgSAj/uyr+CIgE88X1oX8UoPo3EN+iOiZgIJ81aKyZWzxCplPvvqGVhCtoaepmUzAXqs3v3e69dVCfqkoEGjsJSKuF10LiYCCfBVC02rxwV0tF0bADQG0hlWUKdmVgL3kaxEKkYRcGAEqAiQSOhKQyUfFmuVsEHAloS0BmXxMKk0IOJJQScDeDcdbPO1qGgJW09a7JszamNgR8G7xAjqXuTACuhBoFJuSWVZlWQQU1q9GCKGfjwsjoBuBbwgSojclXTIIyOs+3XizPgsCuB6cIEiYnoqtBERHcwPDxggEiABGS9IcSxOw1/ptC7BiVs0IIAJo/UaZVlAmYLN4MI0xYgRCQCBtBWUCovWrCKFyroIRSFtBg4C882VGRICAsSM2CYhb4wsjaARXWbwItAoCVpkE3CVw4Izm4iVDFD3vmYbF9FspfsBsFy6MQNgIVCEBMeSGoTcuISPQcTAFHQfFzm+ga1ZcyC0LrbpZSEBe/4WGd19FC7Z1Q8O2/YJ8JbDtjCMiaEEsqmxGAuL0i9Mwl5AQaP7wANRu2WfUVuQEbEMCsv8vJOJhNe37UlC14WPxb5IJKOBAAqZCxL+oq7KSjy0gQGQE7OzcB397dyeZkCd9/lgoKxvoKO+m88ghA+HEE4511PH2Ozthd1fP9GiWTx07FEYOH5rxO7u6vvzF49JyuMlo60oa1m7Nfw7C6n+LHYel4BS8bHRfvyqH9ktLtO1JQseBbPtgyiCh1widWE95/wSMG1wC8vumotaOQ7BRtMOUu/Do/rHZ+ERGwIlTfgzbd6L7kV4uq54Ic66bnEUG1LC7ay+gzk4LeVTazz1rLMz+3uQsMv7xuU1QM+OhrFeOHDIItr68IOP3du1vXno1nHvWiYbs0L/sMQbdS2k8fiDMHDnAeA/fV5VVJw2CJdv3AxJLReiGUaUw7Zj+BuFnvdednu5l2ZpjBsB8IRf1DjwyAg47ca6XcUnLjhTWqHnptCzybP9gF0yc+mNPOpGEc8THLI+sfgNm3vyYUsdHb9+Z8Xu79i/50aVw+YUTDdnEc12e2oPCSJ75ow4zSDPqpf95ft98obK8n5KgskK0vi1fODxSEuYdARFAJOFzK2dlTMl+CIi6Vi27Fs7onTYLiYBU5iIJ3/rS4cYUHkXJSwIiULfeeAHUXfWVNGZ+CYjkQxJiKUYCylaXCegBAVwPLr3t0pwJiAree2mhYU2LlYA4XeNUHEXJWwsoWy4TuJqZD8HbW9Q7a6cNz/qV9caaUjcB/WxCmkcPMjYQua4BvZAJp99dXx3s5RVtsrEjIFo2cxGPvZw2o1m5s1UR0AkVux2uvA7UTUAz1ot1oLuk/r1M947Z3m1n9A2+uSt1ImD10QOE66bUWLc1bj8gdrpqvfImQ+WDlPFKnTVEG6m8KIodAa070xliV/qo2J1ai1cCvvT6+/CN2nuV2JgbEd0ElCuTw2/WRqgG34mALRMOz/D34W7ZjKzIuquFvw9dNmZZIGLPDSIGrSpMwF5UciXgi4JofxL+vO0f/NfwDZoFHcx2PsJCJSD6+mQnNxNQ+tOz86P5JSASb+ZNj3p2blOn4DfW/sBw/5iF4geM2gIyAR0WA1QC4sbij+s3OU7BSL6LbKZXynqEYgFlf6FTfbIjOiwCVr31MbTuyo6KMAF9EBA3IZf1RhI6xRR6y0+eUlo1eQ3oJ6wnN41CQAqRUYYJSEWqRy52mxBq800CPrJGhM9uUofPqLpMAm5650M465LcksOZgFTU85yAmFCAMeFb7ngKmh5+wVuvLdLy9Hr86fNICQ12FTIBvQ1F3lrApSLoj1O1nZsGYbj1xvOFg3m4gQhaSpU7R96E4M/3L38BbhbTvt/CBPSGXF4SEHejuCvFYkdAWQblnGLFsgVE2cW/WAeLxMdPYQJ6Qy3vCIjEQsKYCaJBEBAhfFRYzEU/X+fZrcMELFAClols5ulXnQl1V56ZkYYVFAFNGDGCgk5tubz4xvu20zkTMM8JWIckk9KszO7ITmC5i0ET0A5Ou80KEzDPCWiNhLh1x46AmEaPWS7mVN308PNix/y0Up11DYjnPR5Z83rW2RDzZcyssdvQMAHdRizzeezWgLoI6AUGKwGdMmfc9MpnQmTZIJMROBLiNiqK59RQnJtqJ8vm9q753EpAp6wYN51vPCNixpYTdPgOE1CNXN5bQC+n4ezIo4uATiliTMACJSB2K1fnsQ4C4i4dD0qprB9bQPt5I+8toNk1v85j1Qk7r1Ow3VFRXgO6LVgiTEawO7+hOvPr3o0eCYx2NIlQWs/tBnuhs7MvIVWlY+zoY+G2uRdkWS30/c1wyS1E0o0cfhTgTQhW36SqLjxEjnfCWIvd5USYzl+1YW/WwXZMw1918qCMs7yYlo8H1a3l7uNLAbOizYI3LdRu3pelE29TkBNXqXjrkIvMAupoPOvIfwSYgPk/hnndAyagpuHr7OyELZs3w+gxY0SosEyT1sJXwwTMYYyRcMseXAavvfIK7Nixw9BUe801cNO8W3LQWlyvMgFzGG+0ehd8/bw0+UxVT//h94Yl5OKOABPQHSNHiVeF9fv25VdkyJx62mnwm0dW5Ki5OF5nAmoY59sW3grNDz6YoenepiY4Z0rf1W8aqilIFUxADcOqmopHjBgBT4mpmDckzgAzATUQEFXghuRbYiruEutCs8yor4cZ9TM11VCYapiANuNqulW8DPuWzVvgtoUL06+g9ftl033p/w8XVhEtI5c+BJiANmxQretyJc6dixfBRZdckquagno/MgLa3QAfNrrjh5Qor6fFnS3ucHWW1heeV1pA8zZ9nXV51aW6Xd+rDj/ykRHQLovXTyf8vmN3MaO5qVDpxWf4MQtOs/JGw+45yuCmRFWcbq3y2zev7xXd9WxxIGBleX9xNW3f/XmUQbNaRvT3od/PLNbn94o14DlTpjiqjgMWTEDK6GuWqR95GGDKkpcy4eRxGTvdDX/dmLaAaP2+IJ7LRX5uV4+fq3y9tJkiywSkoKRZZrW4PRS/NYharFGPMSLcJk+rbs9V9eBaeMJr/r8PhNp2NzkmoBtCATzHu5m9fFMQRjtwd2yWGpF4cLOUeGDdOVufq7qAd0dX/805cTaArmepZAKGgbJUh9vN8DidLm1cApNFOM1c47mt79yeq7qIX6XVqMhmDhkOKDoCfrPuIXj5zX+EjXO6vtNP+TQ83jRNWT9OpTfOnmNkuaDjuOaaWvHzB1nxXrRwuLs1ndZWtw1l/Rc1DiYAO96cF8lYROaGiRr466dPguvrJmWBvm7tOriuri7nwbCuD+0UjjilL3KSc6U5KGAC5gCen1cfb7oaTj+lIutVtGaTvnJmxk7Xj37K+m/T1n/C1Cua/KjX/g4TUDukzgo3t94IZUPULhjrZgM1TRa+vFNPO9UIpT27dq2RCY0JCFjMaViukeL/e2DFq9Cw+JmQe66ujgkY4jCM/dwweGbFdMcaK4UVNNPsUdApvcqv/29Wwxp4/OmNIfbcviomYIjDMLXy8/Cruy5zrFGV6Wx33sOP/w8rn/qtJtj07j9D7DkTMI0Arn8o324exOiMOKZcfOlMuatqVUKCKqEA3TVLGxvT+ijrPxR++c121zaEJaBaD4dRd2S74DA6l2sd1PMefvx/ubatUN5nArqMpCov0JqA8NmKURla7NKuCoU0OvvBBHRBU+WWkVPt/a7/dA5iPutiAhJGD9d3uM7DkBye8ZDTr6zrv4uFm+YOkfnMhYYAE5CAkxlqk4lHeI1FCAgwAQkgsUhwCDABg8OWNRMQYAISQGKR4BBgAgaHLWsmIMAEJIDEIsEhEDsCYgLAkyufyOrxRZdcrP1WAcxmwfw/a5Gv00A/36uvvBrcCNhoLisbYpyms96k8Kxo71qRjSMXzMaRjwbgs9SuHZAYmnkLQ3vnR1BRNiz0vjhVGDsCIvnmzp6dBTBmF+sumPX8xMqVGWqtV6tdVzddkDRzwHW3w04fkg+jKnJRtQdTxeQrQFB+3wNXQOmV90FiYM9trUi+2j8tgpZLF4fVfFI9sSMgFWBS71yErClXKH7zvHlGCr5ZrMcwddTrRYc1rV/VHuuVH2j9Pl50Jhx2dj0MOLvncqTmTWvTBKwcmXl01Et7dMvGjoAUgHWAsFlMv3i7qbXIt5uqkhF01E3VYbWAdu2xxp4PbngCulfONqzfoLnPG/+i9UMSIvniZAVjRUAqwNQBdJJTZT1bB9waZtNRrxcd1rCeKjFCdfake/l0OLi5Z9lgWsFR919pTMNYkIBxsYKxIiAVYC+DaCeryvXLHvCFIu1+i47qXHWoLkKypvWr2qzKPfx44ThI7eu5vwat39baZpjw2Nx0G+JkBWNFQCrArqPpIqBKocdXKOc4cq1b9b6d5ZfXf+gdwDWrtVhTw5LbXoG992feWf3bYWOg7mDmNynFxQrGhoBUgHUQgDLgOuqh6qDsxu2Oi/69fVtGNQfWL4H96/uys/Hh7kQJjCmvgN0lJbGzgrEhIBVg6qA6yVEGXEc9VB3ni82QecLOfMd6vS+1zeh+OfR+9r2Gtw86Cm4//KiMJsXBCsaGgFSAqYPqJEcZcB31UHRQLT/FZYTrPlz/qUpcrWBsCEgBmDKgbjLUAXfTo+s5xfFOcRlhew5uWQfdD9vf6hBHKxgLAlIB1jHolAFXhbt01K3SIX/Nl/ncGtmguIzw3f0r58CBDZmRHbnOOFrBWBCQCrAOElAiLUHcD+2l7dbIBsVlhPr3iuhHUkRBnErcrGAsCEgF2Msg2slSIi3WU2466vWiwxrZULXH6jJKfrgZ9t6THdmx1hs3Kxg5AcP0yVEiLVGH39xuXTUJlRV+e/FB6P593+WZdoRfXloG1w7+RMbj+WdcDQ2nX+Xlb0SbbOQEDNMnR4m0BPH9INTRwlDgcnHpuZyCpWqP6ssQ7dwvct2q6XfZ1+ZAzVjnS9Sp7fcjFzkBo3a/WENZKhcNWqUTAv761REjhossnJ4LL+Wiao8q/Pa/H2YejreSIY7kwzZGTsCwfHIU9wtFxs9fud93qO1Rhd+cLF956WBovWwxjDv6M36bpu29SAlIBVhHb1XuF9Qrh7IoLhodbaHqoLZnv1j7HRBrQFWxWr44kS9yC0gFmDpgTnKUqZ7iotHRFqoOanv2/uw8SO7suSxTLtcOHgbLS4ekf1VR9klYXd0QC8tnNipSC0gFmDpgTnKUSAvFRaOjLVQdlPaY2c8U8rWIaZfPhEhIUQCmDpaTHCXSQnHR6GgLVQe1PWb2c9qiiPy/748YD/fs2plh+eJIvkinYDuArV/+Rx0wJznrFwiiLCX7WXUoSEd7KDpU2diq9sjZz0YK/ndXwHG/uz2d/YzTblzJFykBo/S3Ycet2c9hRmMoBKS2x8x+LhFHMAeKU3Ab+5fChF9fa1Qx/ujPwiqx5ovbtCv3P7I1YNTxVjmUFWY0hkI+antM94tBvu+sMM4BL9nwJNS3/NIgH1q+8tIjKFVGJhMZAaOOt8rp7nbJsJRvOgpi5KjtwezngyL7xSQftqXqsRvEqXQQlm9h7MkX6RQcpQX0m20cBNlUOikuI3wP06/w3K95A0JH9x7D+jWL8Fq+lMgsIAKENw50dXaFitVwEfKyXjSJG6IPxHfByWX0mNEwOuDwm13HcdfeJX0rO8oNF3Fi6zUd1us3kIDoaM6nEikB8wkobmswCDABg8GVtRIRYAISgWKxYBBgAgaDK2slIsAEJALFYsEgwAQMBlfWSkSACUgEisWCQYAJGAyurJWIABOQCBSLBYMAEzAYXFkrEQEmIBEoFgsGASZgMLiyViICTEAiUCwWDAJMwGBwZa1EBJiARKBYLBgEErC2U+TPcmEEokGACRgN7lxrLwJIQLxmvYIRYQQiQKBdEHDPWwDJ8RFUzlUWOwKJkla0gM0Ch2nFjgX3PwIEUrAmAet318OhxN0RVM9VFjsCydSsBKzrqoRUqqXYseD+R4BAIlGVgJZd5XCo3zZIQnkETeAqixWBBHTA5LKhCaP/6/a0QCpZWaxYcL8jQECs/2BqWXUPAZ/trBYWcFUEzeAqixWBfiW1cPbg5h4C8jRcrDSIpt8paBfWz7hVvYeAWJ7Z3QCJxPxoWsS1FhkCzTClrDaTgGwFi4wDEXb30KFRcO7Q9kwCshWMcESKqOpUagFMPbLB7HHfFIy/qWwoh486RGiOY8NFRIkwu9oOpQOroO0nhvXLtoD4m9E3VAMc4h1xmMNSLHWViJ3vpp82y93NtIDmk7GzGiGZmlksuHA/Q0CgJLEENt1db61JTUCciv/VIZzTwFkyIYxNEVQhpt7yCdDW0EEjIEqN/34FdO/DGHFFEQDEXQwOgax1n/sUbEowCYMbluLQ7Eg+9SbECgyTsDioor+XruSjEZCnY/1DU+gaU4mNMLC0Wna32HVZvQlRSePG5N8iXMe740KnT279w93uAOFoVmw4VIrpBEy7aK6vgWQSY8a8OcltqArt7XaRVzoLtt612kvHvBPQnJL3768ROYScvOAF7UKULRGJpamSJXBYWSPV6tF3wW6AGRuU7gbx3VCT2CK6gVVgz3MknomGPwuownKsmJpTyQtFglclp/cXGNnM7iDpktAG0G8JlA5p9WPxrMjoI6Cs+cTZ4qCTOGucSk4S0RQ8a4LrRV4z5hcv24Ux6RAfQbiSjZAoaYP+g9t0kE6G4f9ltSNo3Oc4gwAAAABJRU5ErkJggg=="
                alt="COMPANY NAME logo"
              />

              <Text fz="lg" fw={600} className={classes.title}>
                Flat Rs 400 Off on orders above Rs 999
              </Text>
            </Flex>
            <Flex
              justify={'space-between'}
              align="center"
              mt={rem(16)}
              wrap="nowrap"
            >
              <Box>
                <Text fz="sm" c="dimmed" fw={500} sx={{ lineHeight: 1 }}>
                  Expires On
                </Text>
                <Text fz="md" fw={600} sx={{ lineHeight: 1 }} mt={rem(4)}>
                  30 Apr 2023
                </Text>
              </Box>

              <Text fz="xl" fw={700} sx={{ lineHeight: 1 }}>
                ₹50
              </Text>
            </Flex>
          </Box>
        </Flex>
        <Box className={classes.circle1} />
        <Box className={classes.circle2} />
      </Card>
    </Box>
  )
}
