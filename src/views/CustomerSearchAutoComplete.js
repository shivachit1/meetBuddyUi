import React, {useState, useEffect, useCallback} from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import debounce from 'lodash.debounce';
import {searchUser} from '../service/UserService';
import {appStyle} from '../styles/theme';
import {ImageView} from '../components/ImageView';
import AvatarPng from '../../assets/avatar.png';
import ClosePng from '../../assets/close.png';
import {TextView} from '../components/TextView';
import RadioButton from '../components/RadioButton';
import { useSelector } from 'react-redux';

export const CustomerSearchAutoComplete = ({
  title,
  existingUsers,
  handleDoneSelection,
}) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const {loggedInUser} = useSelector(state => state.userReducer);

  const [selectedUsers, setSelectedUsers] = useState(existingUsers);

  // Debounced search function
  const debouncedSearch = useCallback(
    debounce(async searchTerm => {
      if (searchTerm.length > 0) {
        setLoading(true);
        try {
          const data = await searchUser(loggedInUser.jwtToken, searchTerm);
          console.log(data)
          setResults(data);
        } catch (error) {
          console.error(error);
        } finally {
          setLoading(false);
        }
      } else {
        setResults([]);
      }
    }, 500),
    [],
  );

  useEffect(() => {
    debouncedSearch(query);
  }, [query]);

  useEffect(() => {
    handleDoneSelection(selectedUsers);
  }, [selectedUsers]);

  const selectUser = user => {
    const existsAlready = selectedUsers.find(
      userItem => userItem.id == user.id,
    );

    if (!existsAlready) {
      setSelectedUsers(prev => {
        return prev.concat(user);
      });
    } else {
      unSelectUser(user);
    }
  };

  const unSelectUser = user => {
    const existsAlready = selectedUsers.find(
      userItem => userItem.id == user.id,
    );

    if (existsAlready) {
      setSelectedUsers(prev => {
        return prev.filter(userItem => userItem.id != user.id);
      });
    }
  };

  const UserItem = ({user}) => {
    const selectedAlready = selectedUsers.find(
      userItem => userItem.id == user.id,
    );
    return (
      <TouchableOpacity
        activeOpacity={0.6}
        style={styles.item}
        onPress={() => selectUser(user)}>
        <View style={styles.userInfo}>
          <ImageView
            imageStyle={styles.imageStyle}
            roundImage={true}
            source={user.imageUrl ? {uri: user.imageUrl} : AvatarPng}
          />
          <TextView
            textStyle={{
              color: appStyle.blackColor.pureDark,
              alignSelf: 'center',
              marginLeft: 16,
              fontSize: 12,
            }}
            text={user.name}
            fontWeight="bold"
          />
        </View>

        <RadioButton
          selected={selectedAlready}
          onPress={() => selectUser(user)}></RadioButton>
      </TouchableOpacity>
    );
  };

  const SelectedUserItem = ({user}) => {
    return (
      <TouchableOpacity
        activeOpacity={0.6}
        style={styles.selectedItem}
        onPress={() => unSelectUser(user)}>
        <View style={styles.closeIconContainer}>
          <ImageView
            imageStyle={styles.closeIconStyle}
            roundImage={true}
            source={ClosePng}
          />
        </View>

        <View
          style={{
            ...styles.userInfo,
            flexDirection: 'column',
            alignItems: 'center',
          }}>
          <ImageView
            imageStyle={styles.imageStyle}
            roundImage={true}
            source={user.imageUrl ? {uri: user.imageUrl} : AvatarPng}
          />
          <TextView
            textStyle={{
              color: appStyle.blackColor.pureDark,
              alignSelf: 'center',
              fontSize: 9,
            }}
            text={user.name}
            fontWeight="bold"
          />
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <TextView
        style={{fontSize: 18, marginTop: 20}}
        text={title}
        fontWeight="bold"
      />
      <View>
        <TextInput
          style={styles.textInputStyle}
          value={query}
          placeholderTextColor="rgba(3, 6, 10, 0.2)"
          onChangeText={setQuery}
          placeholder="Search by name"
        />
        {loading && <Text>Loading...</Text>}

        <View style={{flexDirection: 'row', flexWrap: 'nowrap', paddingTop: 8}}>
          {selectedUsers.map((user, index) => (
            <SelectedUserItem key={user.id} user={user} />
          ))}
        </View>

        {results.length > 0 && (
          <TextView text="Search results" fontWeight="bold" />
        )}

        <View>
          {results.map((user, index) => (
            <UserItem key={user.id} user={user} />
          ))}
        </View>

      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    flex: 1,
    padding: 10,
    backgroundColor: appStyle.pageColor,
    zIndex: 4,
    alignSelf: 'center',
  },
  textInputStyle: {
    marginTop: 6,
    paddingTop: 2,
    paddingLeft: 4,
    paddingBottom: 2,
    fontSize: 12,
    fontWeight: 'bold',
    borderRadius: 6,
    color: appStyle.blackColor.pureDark,
    backgroundColor: appStyle.blackColor.lightDark,
    justifyContent: 'center',
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 4,
    paddingLeft: 6,
    paddingRight: 12,
    marginTop: 2,
    marginBottom: 2,
  },
  selectedItem: {
    alignItems: 'center',
    margin: 4,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  imageStyle: {
    width: 35,
    height: 35,
    objectFit: 'cover',
  },
  closeIconContainer: {
    position: 'absolute',
    right: 6,
    top: -1,
    zIndex: 1,
    padding: 2,
    backgroundColor: appStyle.pageColor,
    borderRadius: 8,
  },
  closeIconStyle: {
    width: 9,
    height: 9,
    objectFit: 'cover',
  },
});
