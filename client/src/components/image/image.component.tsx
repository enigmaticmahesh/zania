import { Spin } from 'antd';
import { FC, useState } from 'react';

type ImageProps = {
  imgUrl: string;
};

const ImageComponent: FC<ImageProps> = ({ imgUrl }) => {
  const [isLoading, setIsLoading] = useState(true);
  const imageLoaded = () => {
    setIsLoading(false);
  };

  const spinner = isLoading && <Spin />;

  return (
    <>
      {spinner}
      <img
        src={imgUrl}
        alt=""
        onLoad={imageLoaded}
        style={{ display: isLoading ? 'none' : 'block' }}
      />
    </>
  );
};

export default ImageComponent;
