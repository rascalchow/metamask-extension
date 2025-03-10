import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import InfoIconInverted from '../icon/info-icon-inverted.component';
import { SEVERITIES, Color } from '../../../helpers/constants/design-system';
import { MILLISECOND } from '../../../../shared/constants/time';
import Typography from '../typography';
import { ButtonIcon, ICON_NAMES, ICON_SIZES } from '../../component-library';

export default function Callout({
  severity,
  children,
  dismiss,
  isFirst,
  isLast,
  isMultiple,
}) {
  const [removed, setRemoved] = useState(false);
  const calloutClassName = classnames('callout', `callout--${severity}`, {
    'callout--dismissed': removed === true,
    'callout--multiple': isMultiple === true,
    'callout--dismissible': Boolean(dismiss),
    'callout--first': isFirst === true || isMultiple !== true,
    'callout--last': isLast === true || isMultiple !== true,
  });
  // Clicking the close button will set removed state, which will trigger this
  // effect to refire due to changing dependencies. When that happens, after a
  // half of a second we fire the dismiss method from the parent. The
  // consuming component is responsible for modifying state and then removing
  // the element from the DOM.
  useEffect(() => {
    if (removed) {
      setTimeout(() => {
        dismiss();
      }, MILLISECOND * 500);
    }
  }, [removed, dismiss]);
  return (
    <div className={calloutClassName}>
      <InfoIconInverted severity={severity} />
      <Typography color={Color.textDefault} className="callout__content">
        {children}
      </Typography>
      {dismiss && (
        <ButtonIcon
          iconName={ICON_NAMES.CLOSE}
          size={ICON_SIZES.SM}
          className="callout__close-button"
          onClick={() => {
            setRemoved(true);
          }}
          onKeyUp={(event) => {
            if (event.key === 'Enter') {
              setRemoved(true);
            }
          }}
        />
      )}
    </div>
  );
}

Callout.propTypes = {
  severity: PropTypes.oneOf(Object.values(SEVERITIES)).isRequired,
  children: PropTypes.node.isRequired,
  dismiss: PropTypes.func,
  isFirst: PropTypes.bool,
  isLast: PropTypes.bool,
  isMultiple: PropTypes.bool,
};
