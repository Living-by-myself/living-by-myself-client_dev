import {
  BADGE_VARIANTS,
  BUTTON_COLORS,
  BUTTON_SIZES,
  BUTTON_VARIANTS,
  LINK_SIZE,
  SNS_BUTTONS,
  TITLE_LEVELS,
  TYPOGRAPHY_VARIANTS
} from 'src/components/button/buttonConstants';
import { MODAL_SIDES } from 'src/components/modal/modalConstants';

export type ModalSides = (typeof MODAL_SIDES)[keyof typeof MODAL_SIDES];

export type ModalCommonProps = {
  onClose: () => void;
};

export type BadgeVariants = (typeof BADGE_VARIANTS)[keyof typeof BADGE_VARIANTS];

export type ButtonVariants = (typeof BUTTON_VARIANTS)[keyof typeof BUTTON_VARIANTS];

export type ButtonColors = (typeof BUTTON_COLORS)[keyof typeof BUTTON_COLORS];

export type ButtonSizes = (typeof BUTTON_SIZES)[keyof typeof BUTTON_SIZES];

export type ButtonFullWidth = boolean;

export type LinkSize = (typeof LINK_SIZE)[keyof typeof LINK_SIZE];
export type LinkBold = boolean;

export type SNS_Buttons = (typeof SNS_BUTTONS)[keyof typeof SNS_BUTTONS];

export type TitleLevels = (typeof TITLE_LEVELS)[keyof typeof TITLE_LEVELS];

export type TypographyVariants = (typeof TYPOGRAPHY_VARIANTS)[keyof typeof TYPOGRAPHY_VARIANTS];

export type TypographyBold = boolean;
