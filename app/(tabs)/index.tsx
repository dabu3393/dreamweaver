// app/(tabs)/index.tsx
// Temporary design system showcase — replace this with the real home screen in Week 3

import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Tag } from '@/components/ui/Tag';
import { colors, fonts, fontSizes, fontWeights, spacing } from '@/constants/theme';
import { useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

export default function ShowcaseScreen() {
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGeneratePress = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 2500);
  };

  return (
    <ScrollView
      style={styles.root}
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >

      {/* ── Header ── */}
      <View style={styles.header}>
        <Text style={styles.kicker}>✦ Design System v1.0</Text>
        <Text style={styles.title}>DreamWeaver{'\n'}<Text style={styles.titleAccent}>UI Kit</Text></Text>
        <Text style={styles.subtitle}>Components are working if you can read this.</Text>
      </View>

      {/* ── BUTTONS ── */}
      <Section label="01" title="Button">
        <Row>
          <Button label="✦ Generate Story" variant="primary"   size="md" onPress={() => {}} />
          <Button label="View Library"      variant="secondary" size="md" onPress={() => {}} />
        </Row>
        <Row>
          <Button label="Skip for now"  variant="ghost"  size="md" onPress={() => {}} />
          <Button label="Delete story"  variant="danger" size="md" onPress={() => {}} />
        </Row>
        <Row>
          <Button label="Small"  variant="primary" size="sm" onPress={() => {}} />
          <Button label="Medium" variant="primary" size="md" onPress={() => {}} />
          <Button label="Large"  variant="primary" size="lg" onPress={() => {}} />
        </Row>
        <Button
          label={loading ? 'Generating your story…' : '✦ Generate Tonight\'s Story'}
          variant="primary"
          size="lg"
          fullWidth
          loading={loading}
          onPress={handleGeneratePress}
        />
        <Text style={styles.hint}>☝️ Tap the button above to test the loading state</Text>
      </Section>

      {/* ── CARDS ── */}
      <Section label="02" title="Card">
        <Text style={styles.demoLabel}>Story tile (library grid)</Text>
        <View style={styles.cardRow}>
          <Card variant="story" padding="none" onPress={() => {}} style={{ flex: 1 }}>
            <Card.Cover placeholder="🌙" />
            <Card.Body
              eyebrow="For Lily · Age 4"
              title="The Dragon Who Lost His Roar"
            >
              <Card.Footer
                left={<Text style={styles.meta}>🕐 3 min</Text>}
                right={<Tag label="★ Saved" variant="gold" size="xs" />}
              />
            </Card.Body>
          </Card>

          <Card variant="story" padding="none" onPress={() => {}} style={{ flex: 1 }}>
            <Card.Cover placeholder="🌊" />
            <Card.Body
              eyebrow="For Lily · Age 4"
              title="The Mermaid's Silver Key"
            >
              <Card.Footer
                left={<Text style={styles.meta}>🕐 4 min</Text>}
                right={<Tag label="New" variant="mint" size="xs" />}
              />
            </Card.Body>
          </Card>
        </View>

        <Text style={styles.demoLabel}>Pricing cards (paywall)</Text>
        <View style={styles.cardRow}>
          <Card variant="elevated" padding="md" style={{ flex: 1 }}>
            <Card.Body eyebrow="Basic Plan" title="$9.99/mo" desc="1 story/day · Device narration" />
            <Button label="Choose Basic" variant="secondary" size="sm" fullWidth onPress={() => {}} />
          </Card>

          <Card variant="gold" padding="md" style={{ flex: 1 }}>
            <Card.Body eyebrow="Family Plan" title="$14.99/mo" desc="3 stories/day · ElevenLabs narration" />
            <Button label="Choose Family" variant="primary" size="sm" fullWidth onPress={() => {}} />
          </Card>
        </View>
      </Section>

      {/* ── INPUTS ── */}
      <Section label="03" title="Input">
        <Input
          label="Child's name"
          required
          placeholder="e.g. Lily"
          value={name}
          onChangeText={setName}
          iconLeft="👶"
          hint="This is how the story addresses your child"
        />
        <Input
          label="Email (for story keepsakes)"
          placeholder="parent@example.com"
          value=""
          onChangeText={() => {}}
          iconLeft="✉"
          state="success"
        />
        <Input
          label="Promo code"
          placeholder="ENTER CODE"
          value="BADCODE99"
          onChangeText={() => {}}
          state="error"
          errorMessage="This code has expired"
        />
        <Input
          label="Special instructions (optional)"
          placeholder="e.g. Lily is afraid of loud noises — keep it calm…"
          value=""
          onChangeText={() => {}}
          multiline
          numberOfLines={3}
          hint="Anything extra to personalise the story"
        />
      </Section>

      {/* ── TAGS ── */}
      <Section label="04" title="Tag">
        <Text style={styles.demoLabel}>Status badges</Text>
        <Row>
          <Tag label="Default"       variant="default" size="md" />
          <Tag label="✦ Premium"     variant="gold"    size="md" />
          <Tag label="New"           variant="aurora"  size="md" />
          <Tag label="✓ Active"      variant="mint"    size="md" />
          <Tag label="Limit reached" variant="coral"   size="md" />
        </Row>

        <Text style={styles.demoLabel}>Removable tags</Text>
        <Row>
          <Tag label="🐉 Dragons" variant="aurora" size="md" onRemove={() => {}} />
          <Tag label="🌊 Ocean"   variant="aurora" size="md" onRemove={() => {}} />
          <Tag label="🚀 Space"   variant="aurora" size="md" onRemove={() => {}} />
        </Row>

        <Text style={styles.demoLabel}>Interest tiles — tap to select (max 3)</Text>
        <InterestPicker />
      </Section>

      <View style={{ height: spacing[16] }} />
    </ScrollView>
  );
}

// ── Interest picker with live state ──────────────────────────────────────────

const ALL_INTERESTS = [
  { id: 'dragons',  emoji: '🐉', label: 'Dragons'  },
  { id: 'ocean',    emoji: '🌊', label: 'Ocean'    },
  { id: 'space',    emoji: '🚀', label: 'Space'    },
  { id: 'unicorns', emoji: '🦄', label: 'Unicorns' },
  { id: 'forest',   emoji: '🌲', label: 'Forest'   },
  { id: 'magic',    emoji: '🧙', label: 'Magic'    },
  { id: 'animals',  emoji: '🦁', label: 'Animals'  },
  { id: 'castles',  emoji: '🏰', label: 'Castles'  },
];

function InterestPicker() {
  const [selected, setSelected] = useState<string[]>(['dragons', 'ocean']);

  const toggle = (id: string) => {
    setSelected(prev =>
      prev.includes(id)
        ? prev.filter(i => i !== id)
        : prev.length < 3 ? [...prev, id] : prev
    );
  };

  return (
    <View style={styles.interestGrid}>
      {ALL_INTERESTS.map(i => (
        <Tag
          key={i.id}
          label={i.label}
          emoji={i.emoji}
          selected={selected.includes(i.id)}
          onPress={() => toggle(i.id)}
        />
      ))}
    </View>
  );
}

// ── Small layout helpers ──────────────────────────────────────────────────────

function Section({ label, title, children }: { label: string; title: string; children: React.ReactNode }) {
  return (
    <View style={styles.section}>
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionNum}>{label}</Text>
        <Text style={styles.sectionTitle}>{title}</Text>
      </View>
      <View style={styles.sectionBody}>{children}</View>
    </View>
  );
}

function Row({ children }: { children: React.ReactNode }) {
  return <View style={styles.row}>{children}</View>;
}

// ── Styles ────────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.midnight,
  },
  content: {
    padding: spacing[5],
    paddingTop: spacing[12],
  },

  // ── Header ──
  header: {
    marginBottom: spacing[10],
  },
  kicker: {
    fontFamily: fonts.mono,
    fontSize: fontSizes.xs,
    color: colors.gold,
    letterSpacing: 2,
    textTransform: 'uppercase',
    marginBottom: spacing[3],
  },
  title: {
    fontFamily: fonts.display,
    fontSize: fontSizes['3xl'],
    fontWeight: fontWeights.semibold,
    color: colors.pearl,
    lineHeight: fontSizes['3xl'] * 1.1,
    letterSpacing: -0.5,
    marginBottom: spacing[3],
  },
  titleAccent: {
    color: colors.gold,
    fontStyle: 'italic',
  },
  subtitle: {
    fontFamily: fonts.body,
    fontSize: fontSizes.base,
    color: colors.nebula,
    fontWeight: fontWeights.light,
  },

  // ── Sections ──
  section: {
    marginBottom: spacing[10],
    paddingBottom: spacing[10],
    borderBottomWidth: 1,
    borderBottomColor: colors.moonmist,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: spacing[3],
    marginBottom: spacing[5],
  },
  sectionNum: {
    fontFamily: fonts.mono,
    fontSize: fontSizes.xs,
    color: colors.stardust,
    letterSpacing: 1,
  },
  sectionTitle: {
    fontFamily: fonts.display,
    fontSize: fontSizes['2xl'],
    fontWeight: fontWeights.semibold,
    color: colors.pearl,
    letterSpacing: -0.3,
  },
  sectionBody: {
    gap: spacing[4],
  },

  // ── Demo helpers ──
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing[3],
    alignItems: 'center',
  },
  cardRow: {
    flexDirection: 'row',
    gap: spacing[3],
  },
  demoLabel: {
    fontFamily: fonts.mono,
    fontSize: fontSizes.xs,
    color: colors.stardust,
    textTransform: 'uppercase',
    letterSpacing: 1.2,
    marginTop: spacing[2],
  },
  hint: {
    fontFamily: fonts.body,
    fontSize: fontSizes.xs,
    color: colors.stardust,
    textAlign: 'center',
    marginTop: -spacing[2],
  },
  meta: {
    fontFamily: fonts.body,
    fontSize: fontSizes.xs,
    color: colors.stardust,
  },

  // ── Interest grid ──
  interestGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing[3],
  },
});
