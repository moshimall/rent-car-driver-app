import React from 'react';
import theme from 'utils/theme';
import {Image, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {
  ic_check_tab,
  ic_check_tab_active,
  ic_document_active,
  ic_document_inactive,
  ic_home_active,
  ic_home_inactive,
  ic_message_active,
  ic_message_inactive,
  ic_profile,
  ic_profile_active,
  ic_profile_inactive,
} from 'assets/icons';
import {iconCustomSize} from 'utils/mixins';

type TabItemProps = {
  title: string;
  active: boolean;
  onPress: () => void;
  onLongPress: () => void;
};

const TabItem: React.FC<TabItemProps> = ({
  title,
  active,
  onPress,
  onLongPress,
}) => {
  const Icon = () => {
    if (title === 'Tugas') {
      return active ? (
        <Image
          source={ic_document_active}
          style={iconCustomSize(25)}
          resizeMode="contain"
        />
      ) : (
        <Image source={ic_document_inactive} style={iconCustomSize(25)} />
      );
    }
    
    if (title === 'Selesai') {
      return active ? (
        <Image
          source={ic_check_tab_active}
          style={iconCustomSize(25)}
          resizeMode="contain"
        />
      ) : (
        <Image source={ic_check_tab} style={iconCustomSize(25)} />
      );
    }

    if (title === 'Akun Saya') {
      return active ? (
        <Image
          source={ic_profile}
          style={iconCustomSize(25)}
          resizeMode="contain"
        />
      ) : (
        <Image source={ic_profile_inactive} style={iconCustomSize(25)} />
      );
    }

    return active ? (
      <Image source={ic_home_active} style={iconCustomSize(25)} />
    ) : (
      <Image source={ic_home_inactive} style={iconCustomSize(25)} />
    );
  };

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      onLongPress={onLongPress}>
      <Icon />
      <Text
        style={[
          styles.text,
          {color: active ? theme.colors.navy : theme.colors.text.secondary},
        ]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default TabItem;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    height: 35,
    flex: 1,
  },
  text: {
    fontSize: 10,
    marginTop: 4,
  },
});
