import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { I18nContext } from '../../../contexts/i18n';
import Box from '../box';
import Tooltip from '../tooltip';
import Typography from '../typography';
import {
  ButtonLink,
  Icon,
  ICON_NAMES,
  ICON_SIZES,
} from '../../component-library';
import {
  AlignItems,
  DISPLAY,
  FLEX_DIRECTION,
  FONT_WEIGHT,
  TypographyVariant,
  TEXT_ALIGN,
  Size,
  BackgroundColor,
  TextColor,
  IconColor,
} from '../../../helpers/constants/design-system';
import { Numeric } from '../../../../shared/modules/Numeric';

export default function ReviewSpendingCap({
  tokenName,
  currentTokenBalance,
  tokenValue,
  onEdit,
}) {
  const t = useContext(I18nContext);
  const valueIsGreaterThanBalance = new Numeric(
    Number(tokenValue),
    10,
  ).greaterThan(Number(currentTokenBalance), 10);

  return (
    <Box
      className="review-spending-cap"
      borderRadius={Size.SM}
      paddingTop={4}
      paddingRight={4}
      paddingLeft={4}
      display={DISPLAY.FLEX}
      alignItems={AlignItems.flexStart}
      flexDirection={FLEX_DIRECTION.COLUMN}
      backgroundColor={BackgroundColor.backgroundAlternative}
      gap={1}
    >
      <Box
        flexDirection={FLEX_DIRECTION.ROW}
        display={DISPLAY.FLEX}
        alignItems={AlignItems.center}
        className="review-spending-cap__heading"
      >
        <Box
          flexDirection={FLEX_DIRECTION.ROW}
          className="review-spending-cap__heading-title"
        >
          <Typography
            as={TypographyVariant.H6}
            fontWeight={FONT_WEIGHT.BOLD}
            variant={TypographyVariant.H6}
            boxProps={{ display: DISPLAY.INLINE_BLOCK }}
          >
            {t('customSpendingCap')}
          </Typography>
          <Box marginLeft={2} display={DISPLAY.INLINE_BLOCK}>
            <Tooltip
              interactive
              position="top"
              html={
                <Typography
                  variant={TypographyVariant.H7}
                  color={TextColor.textAlternative}
                  className="review-spending-cap__heading-title__tooltip"
                >
                  {valueIsGreaterThanBalance &&
                    t('warningTooltipText', [
                      <Typography
                        key="tooltip-text"
                        variant={TypographyVariant.H7}
                        fontWeight={FONT_WEIGHT.BOLD}
                        color={TextColor.errorDefault}
                      >
                        <Icon
                          name={ICON_NAMES.WARNING}
                          style={{ verticalAlign: 'middle' }}
                        />
                        {t('beCareful')}
                      </Typography>,
                    ])}
                  {Number(tokenValue) === 0 &&
                    t('revokeSpendingCapTooltipText')}
                </Typography>
              }
            >
              {valueIsGreaterThanBalance && (
                <Icon
                  className="review-spending-cap__heading-title__tooltip__warning-icon"
                  name={ICON_NAMES.DANGER}
                  color={IconColor.errorDefault}
                  size={ICON_SIZES.SM}
                  style={{ 'vertical-align': 'middle' }}
                />
              )}
              {Number(tokenValue) === 0 && (
                <Icon
                  className="review-spending-cap__heading-title__tooltip__question-icon"
                  name={ICON_NAMES.QUESTION}
                  color={IconColor.iconDefault}
                />
              )}
            </Tooltip>
          </Box>
        </Box>
        <Box
          className="review-spending-cap__heading-detail"
          textAlign={TEXT_ALIGN.END}
        >
          <ButtonLink
            size={Size.auto}
            onClick={(e) => {
              e.preventDefault();
              onEdit();
            }}
          >
            {t('edit')}
          </ButtonLink>
        </Box>
      </Box>
      <Box className="review-spending-cap__value">
        <Typography
          as={TypographyVariant.H6}
          color={
            valueIsGreaterThanBalance
              ? TextColor.errorDefault
              : TextColor.textDefault
          }
          variant={TypographyVariant.H6}
          marginBottom={3}
        >
          {tokenValue} {tokenName}
        </Typography>
      </Box>
    </Box>
  );
}

ReviewSpendingCap.propTypes = {
  tokenName: PropTypes.string,
  currentTokenBalance: PropTypes.string,
  tokenValue: PropTypes.string,
  onEdit: PropTypes.func,
};
