import {Image} from 'react-native';

export const ImageView = ({imageStyle, roundImage, source}) => {
  return (
    <Image
      style={{
        ...imageStyle,
        borderRadius: roundImage ? 200 : 0,
        objectFit:"cover"
      }}
      source={source}
      resizeMode='center'
    />
  );
};
