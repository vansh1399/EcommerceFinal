//vertical scroll and horizontal scroll animation// useScrollViewOffset

var __rest =
  (this && this.__rest) ||
  function (s, e) {
    var t = {};
    for (var p in s)
      if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === 'function')
      for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
        if (
          e.indexOf(p[i]) < 0 &&
          Object.prototype.propertyIsEnumerable.call(s, p[i])
        )
          t[p[i]] = s[p[i]];
      }
    return t;
  };
import React from 'react';
import { View, Text, StyleSheet, TextInput, Button } from 'react-native';
import Animated, {
  useAnimatedProps,
  useAnimatedRef,
  useDerivedValue,
  useScrollViewOffset,
} from 'react-native-reanimated';

export default function App() {
  const animatedRef = useAnimatedRef();
  const offset = useScrollViewOffset(animatedRef);
  const text = useDerivedValue(
    () => `Scroll offset: ${offset.value.toFixed(1)}`
  );
  const [isScrollHorizontal, setIsScrollHorizontal] = React.useState(false);

  return (
    <View style={styles.container}>
      <AnimatedText text={text} />

      <Animated.ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.scrollContent}
        ref={animatedRef}
        horizontal={isScrollHorizontal}>
        {Array.from({ length: 10 }).map((_, i) => (
          <View key={i} style={styles.box}>
            <Text style={styles.center}>{i}</Text>
          </View>
        ))}
      </Animated.ScrollView>

      <Button
        title={`Toggle scroll to ${
          isScrollHorizontal ? 'vertical' : 'horizontal'
        }`}
        onPress={() => setIsScrollHorizontal(!isScrollHorizontal)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex:1,
    alignItems: 'center',
    // justifyContent:'center'
  },
  scroll: {
    // borderWidth: 1,
    // borderColor: 'gray',
    height: 250,
    width: 250,
    margin: 20,
  },
  scrollContent: {
    alignItems: 'center',
  },
  box: {
    width: 100,
    height: 100,
    margin: 10,
    borderRadius: 15,
    backgroundColor: '#b58df1',
    alignItems: 'center',
    justifyContent: 'center',
  },
  center: {
    textAlign: 'center',
  },
});

const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);
Animated.addWhitelistedNativeProps({ text: true });

function AnimatedText(_a) {
  var { text } = _a,
    props = __rest(_a, ['text']);
  const animatedProps = useAnimatedProps(() => ({
    text: text.value,
    defaultValue: text.value,
  }));
  return (
    <AnimatedTextInput
      editable={false}
      {...props}
      value={text.value}
      animatedProps={animatedProps}
    />
  );
}