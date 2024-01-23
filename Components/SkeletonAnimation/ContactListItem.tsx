import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

export type ContactInfo = {
  name: string;
  email: string;
};

type ContactListItemProp = {
  contact: ContactInfo;
};

export const ContactListItem: React.FC<ContactListItemProp> = ({contact}) => {
  return (
    <View style={styles.listItem}>
      <View style={styles.circleContainer}>
        <Text style={styles.circleText}>{contact?.name?.[0]}</Text>
      </View>
      <View>
        <Text style={{fontSize: 19}}>{contact.name}</Text>
        <View style={{height: 4}} />
        <Text style={{fontSize: 16}}>{contact.email}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  listItem: {
    width: '100%',
    height: 90,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  circleContainer: {
    height: 70,
    aspectRatio: 1,
    backgroundColor: 'red',
    borderRadius: 35,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  circleText: {
    fontSize: 19,
    color: '#fff',
  },
});
