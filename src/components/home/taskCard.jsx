import {TaskSquare} from 'iconsax-react-native';
import moment from 'moment';
import React from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';
import {setCategory} from '../../utils/functions';
import {useNavigation} from '@react-navigation/native';
import {TASKDETAIL} from '../../utils/routes';
import {taskValues} from '../../utils/constants';

const TaskCard = ({item}) => {
  const navigation = useNavigation();
  const itemStyle = {
    backgroundColor: taskValues.find(task => task.status === item?.status)
      ?.color,
    padding: 3,
    borderRadius: 5,
  };
  return (
    <Pressable
      onPress={() => navigation.navigate(TASKDETAIL, {item: item})}
      style={styles.container}>
      <View style={itemStyle}>
        {taskValues.find(task => task.status === item?.status)?.icon}
      </View>

      <View style={styles.meeting}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>

        <View>
          <Text style={styles.moment}>
            {moment(item.startDate).format('MM/DD/YYYY')}-
            {moment(item.endDate).format('MM/DD/YYYY')}
          </Text>
        </View>
      </View>
      <View style={styles.marginLeft}>
        <Text style={styles.moment}>{setCategory(item.category)}</Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    padding: 10,
    margin: 5,
    borderRadius: 5,
    flexDirection: 'row',
  },
  taskValues: {},
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: 'black',
  },
  description: {
    fontSize: 14,
    fontWeight: '400',
    color: 'gray',
  },
  date: {
    flexDirection: 'row',
  },
  dateView: {
    flex: 1,
  },
  meeting: {
    flex: 1,
    marginLeft: 10,
  },
  moment: {
    fontSize: 14,
    fontWeight: '300',
    color: 'gray',
  },
  marginLeft: {
    marginLeft: 10,
  },
});

export default TaskCard;
