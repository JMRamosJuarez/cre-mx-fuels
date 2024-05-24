import React from 'react';

import { styles } from '@fuels/presentation/pages/Error/styles';
import { useUpdateDatasourceStatusAction } from '@fuels/presentation/redux/actions';
import { useAppTheme } from '@theme/index';
import { useTranslation } from 'react-i18next';
import { Text, TouchableOpacity, View } from 'react-native';

const DatasourceError: React.FC = () => {
  const { t } = useTranslation();
  const errors = useTranslation('errors');

  const { colors } = useAppTheme();

  const updateDatasource = useUpdateDatasourceStatusAction();

  return (
    <View style={styles.container}>
      <Text style={styles.message}>{errors.t('unexpected_error')}</Text>
      <TouchableOpacity
        activeOpacity={0.7}
        style={[styles.button, { backgroundColor: colors.blue['700'] }]}
        onPress={() => updateDatasource({ type: 'not-available' })}>
        <Text style={[styles.buttonLabel, { color: colors.primary['50'] }]}>
          {t('reload')}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default DatasourceError;
