import appBar from 'components/AppBar/AppBar';
import Button from 'components/Button';
import CustomTextInput from 'components/TextInput';
import hoc from 'components/hoc';
import React, {FC, useEffect, useState} from 'react';
import {FONT_SIZE_12, FONT_SIZE_20} from 'utils/typography';
import {h1, h2, h3} from 'utils/styles';
import {ic_main_icon2} from 'assets/icons';
import {iconCustomSize} from 'utils/mixins';
import {theme} from 'utils';
import {useNavigation} from '@react-navigation/native';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useAuthStore } from 'store/actions/authStore';

interface IErrorMessage {
  error_email: string;
  error_password: string;
}

const LoginScreen: FC = () => {
  const navigation = useNavigation();
  const login = useAuthStore((state: any) => state.login);
  const [form, setForm] = useState<any>({
    email: 'ferrytest@gmail.com',
    password: 'password1',
  });
  const [formError, setFormError] = useState<IErrorMessage>({
    error_email: '',
    error_password: '',
  });

  useEffect(() => {
    navigation.setOptions(
      appBar({
        // title: 'Home'
        trailing: (
          <View style={{marginRight: 20, marginTop: 20}}>
            <Image
              source={ic_main_icon2}
              style={iconCustomSize(100)}
              resizeMode="contain"
            />
          </View>
        ),
        leading: <View />,
      }),
    );
  }, [navigation]);

  const methods = {
    handleLogin: async () => {
      try {
        await login(form?.email, form?.password);
        // navigation.navigate('MainTab');
        // Keyboard.dismiss();
        // const _errorMessage: any = {};
        // let status = true;
        // Object.keys(form).map((x, i) => {
        //   if (!form[x as keyof IParamLogin]) {
        //     status = false;
        //     _errorMessage[`error_${x}`] = `${x} tidak boleh kosong`;
        //   }
        // });
        // setFormError(_errorMessage);
        // if (status) {
        //   dispatch(toggleLoader(true));
        //   setTimeout(async () => {
        //     await dispatch(authLogin(form));
        //     dispatch(toggleLoader(false));
        //   }, 1500);
        // }
      } catch (error) {
        // showToast({
        //   message: t('global.alert.error_occurred'),
        //   title: t('global.alert.warning'),
        //   type: 'error',
        // });
      }
    },
  };

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      keyboardDismissMode="interactive">
      <Text style={[h1, styles.textHeader]}>Masuk</Text>
      <Text style={[h3, styles.textDesc]}>
        Masukan Email untuk login ke Get & Ride
      </Text>
      <View style={styles.inputWrapper}>
        <CustomTextInput
          placeholder={'Masukkan Email'}
          title="Email"
          onChangeText={v => {
            setForm({...form, email: v});
            setFormError({...formError, [`error_email`]: ''});
          }}
          value={form.email}
          errorMessage={formError.error_email}
          keyboardType="email-address"
        />

        <View style={{marginTop: 18}} />

        <CustomTextInput
          placeholder={'Masukan Password anda'}
          title={'Password'}
          secureTextEntry
          onChangeText={v => {
            setForm({...form, password: v});
            setFormError({...formError, [`error_password`]: ''});
          }}
          value={form.password}
          errorMessage={formError.error_password}
        />
        <TouchableOpacity
          onPress={() => {
            // navigation.navigate('ForgotPassword')
          }}>
          <Text style={[h2, styles.textFPass]}>{'Lupa Password?'}?</Text>
        </TouchableOpacity>
      </View>
      <Button
        _theme="navy"
        title={'Login'}
        styleWrapper={{marginTop: 40}}
        onPress={methods.handleLogin}
      />
    </ScrollView>
  );
};

export default hoc(LoginScreen);

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
    flexGrow: 1,
  },
  textHeader: {
    fontSize: FONT_SIZE_20,
    color: theme.colors.navy,
    marginTop: 100,
  },
  textDesc: {
    fontSize: FONT_SIZE_12,
    color: theme.colors.grey5,
    marginTop: 12,
  },
  inputWrapper: {
    marginTop: 26,
  },
  textFPass: {
    fontSize: FONT_SIZE_12,
    color: theme.colors.blue,
    alignSelf: 'flex-end',
    marginTop: 10,
  },
  textOpsiLogin: {
    alignSelf: 'center',
    marginTop: 37,
  },
  iconWrapper: {
    alignSelf: 'center',
    marginTop: 20,
    width: '30%',
    justifyContent: 'space-between',
  },
  textRegister: {
    fontSize: FONT_SIZE_12,
    alignSelf: 'center',
    marginTop: 20,
  },
  textRegister2: {
    color: theme.colors.blue,
  },
});
