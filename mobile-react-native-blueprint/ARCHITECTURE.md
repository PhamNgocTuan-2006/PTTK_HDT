# React Native blueprint

## Shared architecture
- `src/core/data` contains platform-neutral heritage content and translations.
- `src/core/context` can be replaced with React Navigation providers while keeping the same state contracts.
- `src/core/hooks` exposes storage and geolocation adapters; inject AsyncStorage and Expo Location on mobile.

## Mobile mapping
Use `@react-navigation/native`, `react-native-maps`, Expo AV, and AsyncStorage. Reuse site IDs, language keys, favorites and audio events. Keep presentation components platform-specific under `mobile/`, while domain logic remains in `src/core`.

## Delivery
The web CI build is the reference gate. Mobile builds should run on EAS with the same lint, type-check and data validation steps.
