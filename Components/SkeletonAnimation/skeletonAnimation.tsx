import {FlatList, StyleSheet, Text, View} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {ContactInfo, ContactListItem} from './ContactListItem';

export const SkeletonAnimation = () => {
  const [contacts, setContacts] = useState<ContactInfo[] | undefined>();

  const fetchContacts = useCallback(async () => {
    const response = await fetch('http://jsonplaceholder.typicode.com/users');
    const data = await response.json();
    console.log(data);
    setContacts(data);
  }, []);

  useEffect(() => {
    fetchContacts();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={contacts}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        renderItem={({item}) => {
          return <ContactListItem contact={item} />;
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  separator: {
    height: 1,
    width: '100%',
    backgroundColor: '#ccc',
  },
});
