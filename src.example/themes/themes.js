import {Dimensions} from 'react-native'

const {width, height} = Dimensions.get('window')

export const metrics = {
  screenWidth: width < height ? width : height,
  screenHeight: width < height ? height : width
}

export const fonts = {
  size:{
    font10: metrics.screenWidth * (10 / 365),
    font12: metrics.screenWidth * (12 / 365),
    font14: metrics.screenWidth * (14 / 365),
    font15: metrics.screenWidth * (15 / 365),
    font16: metrics.screenWidth * (16 / 365),
    font18: metrics.screenWidth * (18 / 365),
    font19: metrics.screenWidth * (19 / 365),
    font21: metrics.screenWidth * (21 / 365),
    font24: metrics.screenWidth * (24 / 365),
    font27: metrics.screenWidth * (27 / 365),
    font34: metrics.screenWidth * (34 / 365),
    iconSmall: metrics.screenWidth * (19 / 365),
    iconUnderNormal: metrics.screenWidth * (24 / 365),
    iconNormal: metrics.screenWidth * (35 / 365),
    iconQuerter: metrics.screenWidth * ( (width/4) / 365)
  },
  weight: {
    full: '900',
    normal: 'normal'
  }
}

export const colors = { 
  primary: 'rgb(243,11,61)',
  secondary: 'rgb(0,53,84)',
  third: 'rgb(243,20,74)',
  fourth: 'rgb(121,86,99)',
  fifth: 'rgb(215, 217, 219)',
  sixth: 'rgb(176, 212, 235)',
  seventh: 'rgb(9, 9, 121)',
  eightth: 'rgb(0, 212, 255)',
  nineth: 'rgb(142, 18, 170)',
  backgroudColor: 'rgb(247,247,255)',
  white: '#FFFFFF',
  black: '#000000',
};



