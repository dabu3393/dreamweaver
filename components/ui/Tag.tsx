// components/ui/Tag.tsx
// Spring scale press · Selected aurora glow · Interest tile mode · Removable

import {
  Animated,
  Pressable,
  StyleSheet,
  Text,
  View,
  type ViewStyle,
} from 'react-native';
import { useRef } from 'react';
import { colors, fonts, fontSizes, fontWeights, spacing, radii } from '@/constants/theme';

type TagVariant = 'default' | 'gold' | 'aurora' | 'mint' | 'rose' | 'coral';
type TagSize    = 'xs' | 'sm' | 'md' | 'lg';

interface TagProps {
  label:      string;
  variant?:   TagVariant;
  size?:      TagSize;
  emoji?:     string;        // enables interest tile mode
  selected?:  boolean;       // for interest tiles
  onPress?:   () => void;
  onRemove?:  () => void;
  style?:     ViewStyle;
}

export function Tag({
  label,
  variant  = 'default',
  size     = 'md',
  emoji,
  selected = false,
  onPress,
  onRemove,
  style,
}: TagProps) {
  const scale = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    if (!onPress && !onRemove) return;
    Animated.spring(scale, { toValue: 0.93, useNativeDriver: true, tension: 400, friction: 10 }).start();
  };

  const handlePressOut = () => {
    if (!onPress && !onRemove) return;
    Animated.spring(scale, { toValue: 1, useNativeDriver: true, tension: 300, friction: 8 }).start();
  };

  // Interest tile mode (has emoji prop)
  if (emoji !== undefined) {
    const tileGlow: ViewStyle = selected ? {
      shadowColor: colors.aurora,
      shadowOffset: { width: 0, height: 0 },
      shadowRadius: 12,
      shadowOpacity: 0.35,
      elevation: 6,
    } : {};

    return (
      <Pressable onPress={onPress} onPressIn={handlePressIn} onPressOut={handlePressOut}>
        <Animated.View
          style={[
            styles.tile,
            selected ? styles.tileSelected : styles.tileDefault,
            tileGlow,
            { transform: [{ scale }] },
            style,
          ]}
        >
          <Text style={styles.tileEmoji}>{emoji}</Text>
          <Text style={[styles.tileLabel, selected && styles.tileLabelSelected]}>{label}</Text>
        </Animated.View>
      </Pressable>
    );
  }

  // Standard pill tag
  const tagContent = (
    <Animated.View
      style={[
        styles.pill,
        sizeStyles[size],
        variantStyles[variant],
        selected && styles.selectedOverride,
        { transform: [{ scale }] },
        style,
      ]}
    >
      <Text style={[styles.pillLabel, labelSizeStyles[size], labelVariantStyles[variant]]}>
        {label}
      </Text>
      {onRemove ? (
        <Pressable onPress={onRemove} hitSlop={8}>
          <Text style={[styles.removeBtn, labelVariantStyles[variant]]}>×</Text>
        </Pressable>
      ) : null}
    </Animated.View>
  );

  if (!onPress) return tagContent;

  return (
    <Pressable onPress={onPress} onPressIn={handlePressIn} onPressOut={handlePressOut}>
      {tagContent}
    </Pressable>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  // ── Pill
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: radii.full,
    borderWidth: 1,
    gap: spacing[1],
  },
  pillLabel: {
    fontFamily: fonts.body,
    fontWeight: fontWeights.semibold,
    letterSpacing: 0.4,
  },
  removeBtn: {
    fontSize: 14,
    lineHeight: 16,
    opacity: 0.7,
    paddingLeft: 2,
  },
  selectedOverride: {
    borderColor: colors.aurora,
    backgroundColor: 'rgba(155,127,255,0.15)',
  },

  // ── Interest tile
  tile: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: radii.md,
    borderWidth: 1,
    paddingVertical: spacing[3],
    paddingHorizontal: spacing[4],
    minWidth: 72,
    gap: spacing[1],
  },
  tileDefault: {
    backgroundColor: colors.twilight,
    borderColor: colors.moonmist,
  },
  tileSelected: {
    backgroundColor: 'rgba(155,127,255,0.12)',
    borderColor: colors.aurora,
  },
  tileEmoji: {
    fontSize: 22,
    lineHeight: 28,
  },
  tileLabel: {
    fontFamily: fonts.body,
    fontSize: fontSizes.sm,
    fontWeight: fontWeights.medium,
    color: colors.silver,
  },
  tileLabelSelected: {
    color: colors.aurora,
    fontWeight: fontWeights.semibold,
  },
});

const sizeStyles = StyleSheet.create({
  xs: { paddingVertical: 2,  paddingHorizontal: spacing[2] },
  sm: { paddingVertical: 3,  paddingHorizontal: spacing[3] },
  md: { paddingVertical: 5,  paddingHorizontal: spacing[3] },
  lg: { paddingVertical: 7,  paddingHorizontal: spacing[4] },
});

const variantStyles = StyleSheet.create({
  default: { backgroundColor: 'rgba(255,255,255,0.06)', borderColor: colors.moonmist },
  gold:    { backgroundColor: 'rgba(245,200,66,0.12)',  borderColor: 'rgba(245,200,66,0.3)' },
  aurora:  { backgroundColor: 'rgba(155,127,255,0.1)', borderColor: 'rgba(155,127,255,0.3)' },
  mint:    { backgroundColor: 'rgba(111,218,184,0.1)', borderColor: 'rgba(111,218,184,0.3)' },
  rose:    { backgroundColor: 'rgba(255,143,171,0.1)', borderColor: 'rgba(255,143,171,0.3)' },
  coral:   { backgroundColor: 'rgba(255,107,107,0.1)', borderColor: 'rgba(255,107,107,0.25)' },
});

const labelVariantStyles = StyleSheet.create({
  default: { color: colors.silver },
  gold:    { color: colors.gold },
  aurora:  { color: colors.aurora },
  mint:    { color: colors.mint },
  rose:    { color: colors.rose },
  coral:   { color: colors.coral },
});

const labelSizeStyles = StyleSheet.create({
  xs: { fontSize: fontSizes.xs - 2 },
  sm: { fontSize: fontSizes.xs },
  md: { fontSize: fontSizes.sm },
  lg: { fontSize: fontSizes.base },
});
