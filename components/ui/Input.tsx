// components/ui/Input.tsx
// Animated aurora focus ring · Border color transition · Icon support · Error/success states

import {
  Animated,
  StyleSheet,
  Text,
  TextInput,
  View,
  type TextInputProps,
  type ViewStyle,
} from 'react-native';
import { useRef, useState } from 'react';
import { colors, fonts, fontSizes, fontWeights, spacing, radii } from '@/constants/theme';

type InputState = 'default' | 'error' | 'success';
type InputSize  = 'sm' | 'md' | 'lg';

interface InputProps extends Omit<TextInputProps, 'style'> {
  label?:        string;
  required?:     boolean;
  hint?:         string;
  errorMessage?: string;
  state?:        InputState;
  size?:         InputSize;
  iconLeft?:     string;
  iconRight?:    string;
  style?:        ViewStyle;
}

export function Input({
  label,
  required     = false,
  hint,
  errorMessage,
  state        = 'default',
  size         = 'md',
  iconLeft,
  iconRight,
  multiline,
  style,
  ...rest
}: InputProps) {
  const [isFocused, setIsFocused] = useState(false);

  // Animated border color + shadow on focus
  const focusAnim = useRef(new Animated.Value(0)).current;

  const handleFocus = () => {
    setIsFocused(true);
    Animated.timing(focusAnim, {
      toValue: 1,
      duration: 200,
      useNativeDriver: false, // border color can't use native driver
    }).start();
    rest.onFocus?.({} as any);
  };

  const handleBlur = () => {
    setIsFocused(false);
    Animated.timing(focusAnim, {
      toValue: 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
    rest.onBlur?.({} as any);
  };

  // Border color based on state + focus
  const borderColor = focusAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [
      state === 'error'   ? colors.coral  :
      state === 'success' ? colors.mint   :
      colors.moonmist,

      state === 'error'   ? colors.coral  :
      state === 'success' ? colors.mint   :
      colors.aurora,
    ],
  });

  // Focus ring shadow opacity
  const shadowOpacity = focusAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 0.18],
  });

  const shadowColor =
    state === 'error'   ? colors.coral  :
    state === 'success' ? colors.mint   :
    colors.aurora;

  return (
    <View style={[styles.wrap, style]}>

      {/* Label */}
      {label ? (
        <Text style={styles.label}>
          {label}
          {required ? <Text style={styles.required}> *</Text> : null}
        </Text>
      ) : null}

      {/* Input container with animated border */}
      <Animated.View
        style={[
          styles.fieldWrap,
          sizeStyles[size],
          {
            borderColor,
            shadowColor,
            shadowOffset: { width: 0, height: 0 },
            shadowRadius: 10,
            shadowOpacity,
            elevation: isFocused ? 4 : 0,
          },
          multiline && styles.multiline,
        ]}
      >
        {iconLeft ? (
          <Text style={[styles.icon, styles.iconLeft, isFocused && styles.iconFocused]}>
            {iconLeft}
          </Text>
        ) : null}

        <TextInput
          {...rest}
          onFocus={handleFocus}
          onBlur={handleBlur}
          multiline={multiline}
          placeholderTextColor={colors.stardust}
          style={[
            styles.input,
            sizeTextStyles[size],
            iconLeft  && styles.hasIconLeft,
            iconRight && styles.hasIconRight,
            multiline && styles.inputMultiline,
          ]}
        />

        {iconRight ? (
          <Text style={[
            styles.icon,
            styles.iconRight,
            state === 'success' && styles.iconSuccess,
            state === 'error'   && styles.iconError,
          ]}>
            {iconRight}
          </Text>
        ) : null}

        {/* Auto right icon for states */}
        {!iconRight && state === 'success' ? (
          <Text style={[styles.icon, styles.iconRight, styles.iconSuccess]}>✓</Text>
        ) : null}
      </Animated.View>

      {/* Hint or error */}
      {errorMessage && state === 'error' ? (
        <Text style={styles.errorText}>⚠ {errorMessage}</Text>
      ) : hint ? (
        <Text style={styles.hintText}>{hint}</Text>
      ) : null}
    </View>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  wrap: {
    gap: spacing[2],
  },
  label: {
    fontFamily: fonts.body,
    fontSize: fontSizes.sm,
    fontWeight: fontWeights.semibold,
    color: colors.silver,
    letterSpacing: 0.1,
  },
  required: {
    color: colors.gold,
  },
  fieldWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.twilight,
    borderWidth: 1.5,
    borderRadius: radii.md,
    position: 'relative',
  },
  multiline: {
    alignItems: 'flex-start',
  },
  input: {
    flex: 1,
    fontFamily: fonts.body,
    color: colors.pearl,
    paddingVertical: 11,
    paddingHorizontal: spacing[4],
  },
  inputMultiline: {
    paddingTop: spacing[3],
    paddingBottom: spacing[3],
    minHeight: 90,
    textAlignVertical: 'top',
  },
  hasIconLeft:  { paddingLeft: spacing[2] },
  hasIconRight: { paddingRight: spacing[2] },

  icon: {
    fontSize: 16,
    paddingHorizontal: spacing[3],
    color: colors.stardust,
  },
  iconLeft:    {},
  iconRight:   {},
  iconFocused: { color: colors.aurora },
  iconSuccess: { color: colors.mint },
  iconError:   { color: colors.coral },

  hintText: {
    fontFamily: fonts.body,
    fontSize: fontSizes.xs,
    color: colors.stardust,
  },
  errorText: {
    fontFamily: fonts.body,
    fontSize: fontSizes.xs,
    color: colors.coral,
  },
});

const sizeStyles = StyleSheet.create({
  sm: { borderRadius: radii.sm },
  md: {},
  lg: { borderRadius: radii.lg },
});

const sizeTextStyles = StyleSheet.create({
  sm: { fontSize: fontSizes.sm, paddingVertical: 7 },
  md: { fontSize: fontSizes.base },
  lg: { fontSize: fontSizes.md, paddingVertical: 14 },
});
