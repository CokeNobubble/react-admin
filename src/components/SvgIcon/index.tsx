interface Props {
  prefix?: string;
  iconClass?: string;
  color?: string;
  size?: string;
}

import { FC, ReactElement, useMemo } from 'react';
import mySvg from './index.module.css'

const SvgIcon: FC<Props> = ({
                              color,
                              size = '1em',
                              prefix = 'icon',
                              iconClass
                            }): ReactElement => {
  const symbolId = useMemo(() => `#${ prefix }-${ iconClass }`, [prefix, iconClass]);

  return (
      <svg
          aria-hidden="true"
          className={ mySvg.icon }
          style={ { width: size, height: size } }
      >
        <use xlinkHref={ symbolId } fill={ color }/>
      </svg>
  );
};

export default SvgIcon
