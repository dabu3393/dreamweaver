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

  const inner = (
    <Animated.View
      style={[
        styles.base,
        border,
        shadow,
        paddingStyles[padding],
        variant === 'gold' && styles.goldBg,
        variant === 'elevated' && styles.elevatedBg,
        { transform: [{ scale }, { translateY }] },
        style,
      ]}
    >
      {/* Gold ✦ corner accent */}
      {variant === 'gold' && (
        <Text style={styles.goldAccent}>✦</Text>
      )}

      {/* Aurora glow edge (elevated card) */}
      {variant === 'elevated' && (
        <View style={styles.auroraGlow} pointerEvents="none" />
      )}

      {/* Top inner highlight */}
      {(variant === 'default' || variant === 'story') && (
        <View style={styles.topHighlight} pointerEvents="none" />
      )}

      {children}
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
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 4,
    shadowOpacity: 0.4,
    elevation: 2,
  },
  story: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 16,
    shadowOpacity: 0.55,
    elevation: 6,
  },
  elevated: {
    shadowColor: colors.aurora,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 20,
    shadowOpacity: 0.18,
    elevation: 8,
  },
  gold: {
    shadowColor: colors.gold,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 24,
    shadowOpacity: 0.25,
    elevation: 8,
  },
};

const paddingStyles = StyleSheet.create({
  none: { padding: 0 },
  sm:   { padding: spacing[4] },
  md:   { padding: spacing[6] },
  lg:   { padding: spacing[8] },
});

const styles = StyleSheet.create({
  base: {
    backgroundColor: colors.dusk,
    borderRadius: radii.lg,
    overflow: 'hidden',
    position: 'relative',
  },
  goldBg: {
    backgroundColor: '#1A1506',
  },
  elevatedBg: {
    backgroundColor: colors.twilight,
  },

  // Decorative overlays
  topHighlight: {
    position: 'absolute',
    top: 0, left: 0, right: 0,
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.05)',
    zIndex: 1,
  },
  auroraGlow: {
    position: 'absolute',
    top: -20, left: -20, right: -20,
    height: 60,
    backgroundColor: 'rgba(155,127,255,0.06)',
    borderRadius: 40,
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
