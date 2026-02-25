// components/ui/Button.tsx
// Spring press · Gold shadow glow · Shimmer sweep · Top highlight

import {
  Animated,
  Pressable,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  type PressableProps,
  type ViewStyle,
} from 'react-native';
import { useRef, useEffect } from 'react';
import { colors, fonts, fontSizes, fontWeights, spacing, radii } from '@/constants/theme';

type Variant = 'primary' | 'secondary' | 'ghost' | 'danger';
type Size    = 'sm' | 'md' | 'lg';

interface ButtonProps extends Omit<PressableProps, 'style'> {
  label:      string;
  variant?:   Variant;
  size?:      Size;
  loading?:   boolean;
  fullWidth?: boolean;
  style?:     ViewStyle;
}

export function Button({
  label,
  variant   = 'primary',
  size      = 'md',
  loading   = false,
  fullWidth = false,
  disabled,
  onPress,
  style,
  ...rest
}: ButtonProps) {
  const scale      = useRef(new Animated.Value(1)).current;
  const translateY = useRef(new Animated.Value(0)).current;
  const shimmerX   = useRef(new Animated.Value(-120)).current;

  // Shimmer loop on primary buttons
  useEffect(() => {
    if (variant !== 'primary') return;
    Animated.loop(
      Animated.sequence([
        Animated.delay(2500),
        Animated.timing(shimmerX, {
          toValue: 320,
          duration: 650,
          useNativeDriver: true,
        }),
        Animated.timing(shimmerX, { toValue: -120, duration: 0, useNativeDriver: true }),
      ])
    ).start();
  }, [variant]);

  const handlePressIn = () => {
    Animated.parallel([
      Animated.spring(scale,      { toValue: 0.97, useNativeDriver: true, tension: 300, friction: 10 }),
      Animated.spring(translateY, { toValue: 1,    useNativeDriver: true, tension: 300, friction: 10 }),
    ]).start();
  };

  const handlePressOut = () => {
    Animated.parallel([
      Animated.spring(scale,      { toValue: 1, useNativeDriver: true, tension: 200, friction: 8 }),
      Animated.spring(translateY, { toValue: 0, useNativeDriver: true, tension: 200, friction: 8 }),
    ]).start();
  };

  const shadowStyle = {
    primary:   { shadowColor: colors.gold,    shadowOffset: { width: 0, height: 6 }, shadowRadius: 24, shadowOpacity: 0.4,  elevation: 10 },
    secondary: { shadowColor: '#000',         shadowOffset: { width: 0, height: 2 }, shadowRadius: 8,  shadowOpacity: 0.3,  elevation: 3  },
    ghost:     {},
    danger:    { shadowColor: colors.coral,   shadowOffset: { width: 0, height: 2 }, shadowRadius: 8,  shadowOpacity: 0.2,  elevation: 3  },
  }[variant];

  const isDisabled = disabled || loading;

  return (
    <Pressable
      onPress={onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      disabled={isDisabled}
      style={fullWidth ? { width: '100%' } : undefined}
      {...rest}
    >
      <Animated.View
        style={[
          styles.base,
          sizeStyles[size],
          variantStyles[variant],
          shadowStyle,
          fullWidth && { width: '100%' },
          isDisabled && styles.disabled,
          { transform: [{ scale }, { translateY }] },
          style,
        ]}
      >
        {/* Shimmer sweep */}
        {variant === 'primary' && (
          <Animated.View
            pointerEvents="none"
            style={[styles.shimmer, { transform: [{ translateX: shimmerX }, { skewX: '-20deg' }] }]}
          />
        )}

        {/* Top highlight line */}
        {variant === 'primary' && (
          <View style={styles.topHighlight} pointerEvents="none" />
        )}

        {loading
          ? <ActivityIndicator size="small" color={variant === 'primary' ? '#1A1400' : colors.pearl} />
          : <Text style={[styles.label, labelVariantStyles[variant], labelSizeStyles[size]]}>{label}</Text>
        }
      </Animated.View>
    </Pressable>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: radii.md,
    overflow: 'hidden',
    position: 'relative',
  },
  disabled: { opacity: 0.35 },
  shimmer: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 60,
    height: '100%',
    backgroundColor: 'rgba(255,255,255,0.22)',
  },
  topHighlight: {
    position: 'absolute',
    top: 0, left: 0, right: 0,
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
  label: {
    fontFamily: fonts.body,
    fontWeight: fontWeights.semibold,
  },
});

const sizeStyles = StyleSheet.create({
  sm: { paddingVertical: spacing[2],  paddingHorizontal: spacing[4],  borderRadius: radii.sm },
  md: { paddingVertical: 11,          paddingHorizontal: spacing[6]  },
  lg: { paddingVertical: 14,          paddingHorizontal: spacing[8],  borderRadius: radii.lg },
});

const variantStyles = StyleSheet.create({
  primary:   { backgroundColor: colors.gold },
  secondary: { backgroundColor: 'transparent', borderWidth: 1.5, borderColor: colors.moonmist },
  ghost:     { backgroundColor: 'transparent' },
  danger:    { backgroundColor: 'rgba(255,107,107,0.12)', borderWidth: 1.5, borderColor: 'rgba(255,107,107,0.25)' },
});

const labelVariantStyles = StyleSheet.create({
  primary:   { color: '#1A1400' },
  secondary: { color: colors.pearl },
  ghost:     { color: colors.nebula },
  danger:    { color: colors.coral },
});

const labelSizeStyles = StyleSheet.create({
  sm: { fontSize: fontSizes.sm },
  md: { fontSize: fontSizes.base },
  lg: { fontSize: fontSizes.md },
});
