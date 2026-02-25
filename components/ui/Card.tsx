// components/ui/Card.tsx
// Press lift animation · Deep shadows · Gold gradient · Aurora glow border

import {
  Animated,
  Pressable,
  StyleSheet,
  Text,
  View,
  type ViewStyle,
  type ReactNode,
  type PressableProps,
} from 'react-native';
import { useRef } from 'react';
import { colors, fonts, fontSizes, fontWeights, spacing, radii } from '@/constants/theme';

type Variant = 'default' | 'story' | 'elevated' | 'gold';
type Padding  = 'none' | 'sm' | 'md' | 'lg';

interface CardProps {
  variant?:   Variant;
  padding?:   Padding;
  onPress?:   () => void;
  children:   ReactNode;
  style?:     ViewStyle;
}

// ─── Main Card ────────────────────────────────────────────────────────────────

export function Card({ variant = 'default', padding = 'md', onPress, children, style }: CardProps) {
  const scale      = useRef(new Animated.Value(1)).current;
  const translateY = useRef(new Animated.Value(0)).current;

  const handlePressIn = () => {
    if (!onPress) return;
    Animated.parallel([
      Animated.spring(scale,      { toValue: 0.98, useNativeDriver: true, tension: 300, friction: 10 }),
      Animated.spring(translateY, { toValue: 2,    useNativeDriver: true, tension: 300, friction: 10 }),
    ]).start();
  };

  const handlePressOut = () => {
    if (!onPress) return;
    Animated.parallel([
      Animated.spring(scale,      { toValue: 1, useNativeDriver: true, tension: 200, friction: 8 }),
      Animated.spring(translateY, { toValue: 0, useNativeDriver: true, tension: 200, friction: 8 }),
    ]).start();
  };

  const shadow = shadowByVariant[variant];
  const border = borderByVariant[variant];

  // On iOS, overflow:hidden clips shadows. So we use two layers:
  // - Outer Animated.View: carries the shadow + border radius, no overflow clip
  // - Inner View: clips content with overflow:hidden
  const inner = (
    <Animated.View
      style={[
        styles.shadowWrapper,
        styles[`bg_${variant}`],
        border,
        shadow,
        { transform: [{ scale }, { translateY }] },
        style,
      ]}
    >
      <View style={[styles.clipWrapper, paddingStyles[padding]]}>
        {/* Gold ✦ corner accent */}
        {variant === 'gold' && (
          <Text style={styles.goldAccent}>✦</Text>
        )}

        {children}
      </View>
    </Animated.View>
  );

  if (!onPress) return inner;

  return (
    <Pressable onPress={onPress} onPressIn={handlePressIn} onPressOut={handlePressOut}>
      {inner}
    </Pressable>
  );
}

// ─── Sub-components ───────────────────────────────────────────────────────────

Card.Cover = function CardCover({
  placeholder,
  aspectRatio = 1,
}: {
  placeholder?: string;
  aspectRatio?: number;
}) {
  return (
    <View style={[styles.cover, { aspectRatio }]}>
      {placeholder ? (
        <Text style={styles.coverEmoji}>{placeholder}</Text>
      ) : null}
    </View>
  );
};

Card.Body = function CardBody({
  eyebrow,
  title,
  desc,
  children,
}: {
  eyebrow?: string;
  title:    string;
  desc?:    string;
  children?: ReactNode;
}) {
  return (
    <View style={styles.body}>
      {eyebrow ? <Text style={styles.eyebrow}>{eyebrow}</Text> : null}
      <Text style={styles.title}>{title}</Text>
      {desc ? <Text style={styles.desc}>{desc}</Text> : null}
      {children}
    </View>
  );
};

Card.Footer = function CardFooter({
  left,
  right,
}: {
  left?:  ReactNode;
  right?: ReactNode;
}) {
  return (
    <View style={styles.footer}>
      <View>{left}</View>
      <View>{right}</View>
    </View>
  );
};

// ─── Styles ───────────────────────────────────────────────────────────────────

const borderByVariant: Record<Variant, ViewStyle> = {
  default:  { borderWidth: 1, borderColor: colors.moonmist },
  story:    { borderWidth: 1, borderColor: colors.moonmist },
  elevated: { borderWidth: 1, borderColor: 'rgba(155,127,255,0.25)' },
  gold:     { borderWidth: 1, borderColor: 'rgba(245,200,66,0.35)' },
};

const shadowByVariant: Record<Variant, ViewStyle> = {
  default: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    shadowOpacity: 0.5,
    elevation: 3,
  },
  story: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 20,
    shadowOpacity: 0.6,
    elevation: 8,
  },
  elevated: {
    shadowColor: 'transparent',
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 0,
    shadowOpacity: 0,
    elevation: 0,
  },
  gold: {
    shadowColor: colors.gold,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 14,
    shadowOpacity: 0.35,
    elevation: 10,
  },
};

const paddingStyles = StyleSheet.create({
  none: { padding: 0 },
  sm:   { padding: spacing[4] },
  md:   { padding: spacing[6] },
  lg:   { padding: spacing[8] },
});

const styles = StyleSheet.create({
  // Outer wrapper — holds shadow, NO overflow clip
  shadowWrapper: {
    borderRadius: radii.lg,
  },
  // Inner wrapper — clips content, overflow hidden
  clipWrapper: {
    borderRadius: radii.lg,
    overflow: 'hidden',
    position: 'relative',
  },

  // Background per variant (must be on shadowWrapper so shadow color shows)
  bg_default:  { backgroundColor: colors.dusk },
  bg_story:    { backgroundColor: colors.dusk },
  bg_elevated: { backgroundColor: colors.twilight },
  bg_gold:     { backgroundColor: '#1A1506' },

  // Decorative overlays
  auroraGlow: {
    position: 'absolute',
    bottom: -10,
    left: 0,
    right: 0,
    height: 50,
    backgroundColor: 'rgba(245,200,66,0.07)',
    zIndex: 0,
  },
  goldAccent: {
    position: 'absolute',
    top: spacing[4],
    right: spacing[4],
    fontSize: 10,
    color: colors.gold,
    opacity: 0.8,
    zIndex: 2,
  },

  // Cover
  cover: {
    width: '100%',
    backgroundColor: colors.twilight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  coverEmoji: {
    fontSize: 48,
  },

  // Body
  body: {
    padding: spacing[5],
  },
  eyebrow: {
    fontFamily: fonts.mono,
    fontSize: fontSizes.xs,
    letterSpacing: 1.4,
    textTransform: 'uppercase',
    color: colors.nebula,
    marginBottom: spacing[2],
  },
  title: {
    fontFamily: fonts.display,
    fontSize: fontSizes.xl,
    fontWeight: fontWeights.semibold,
    lineHeight: fontSizes.xl * 1.25,
    color: colors.pearl,
    marginBottom: spacing[2],
  },
  desc: {
    fontFamily: fonts.body,
    fontSize: fontSizes.sm,
    color: colors.nebula,
    lineHeight: fontSizes.sm * 1.6,
  },

  // Footer
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: spacing[4],
    marginTop: spacing[4],
    borderTopWidth: 1,
    borderTopColor: colors.moonmist,
  },
});
