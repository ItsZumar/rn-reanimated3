import React, {useCallback, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import ListItem from './listItem';

const TITLES = [
  'Record the dismissible tutorial 🎥',
  'Leave 👍🏼 to the video',
  'Check YouTube comments',
  'Subscribe to the channel 🚀',
  'Leave a ⭐️ on the GitHub Repo',
];
export interface TaskInterface {
  title: string;
  index: number;
}
const TASKS: TaskInterface[] = TITLES.map((title, index) => ({title, index}));
const BACKGROUND_COLOR = '#FAFBFF';

export const SwipeToDelete = () => {
  const [tasks, setTasks] = useState(TASKS);

  const onDismiss = useCallback((task: TaskInterface) => {
    setTasks(tasks => tasks.filter(item => item.index !== task.index));
  }, []);

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <SafeAreaView style={styles.container}>
        <StatusBar />
        <Text style={styles.title}>Tasks</Text>
        <ScrollView style={{flex: 1}}>
          {tasks.map(task => (
            <ListItem key={task.index} task={task} onDismiss={onDismiss} />
          ))}
        </ScrollView>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BACKGROUND_COLOR,
  },
  title: {
    fontSize: 60,
    marginVertical: 20,
    paddingLeft: '5%',
  },
});
